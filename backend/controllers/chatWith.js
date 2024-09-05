const User = require('../models/userModels');
const Conversation = require('../models/chatModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// Access or initiate a one-on-one chat
const accessChat = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return next(new ErrorHandler('User Id not provided with request', 400));
    }

    let isChat = await Conversation.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate('users', '-password').populate('latestMessage');

    isChat = await User.populate(isChat, {
        path: 'latestMessage.senderId',
        select: 'name email'
    });

    if (isChat.length > 0) {
        res.status(200).json(isChat[0]);
    } else {
        const chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId]
        };

        try {
            const createdChat = await Conversation.create(chatData);
            const fullChat = await Conversation.findOne({ _id: createdChat._id })
                .populate('users', '-password');
            res.status(201).json(fullChat);
        } catch (error) {
            return next(new ErrorHandler('Failed to create chat', 400));
        }
    }
});

// Fetch all chats for the logged-in user
const fetchChats = catchAsyncErrors(async (req, res, next) => {
    try {
        const results = await Conversation.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });

        const populatedResults = await User.populate(results, {
            path: 'latestMessage.senderId',
            select: 'name email'
        });

        res.status(200).json(populatedResults);
    } catch (error) {
        return next(new ErrorHandler('Failed to fetch chats', 400));
    }
});

// Fetch all group chats
const fetchGroups = catchAsyncErrors(async (req, res, next) => {
    try {
        const allGroups = await Conversation.find({ isGroupChat: true })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');
        res.status(200).json(allGroups);
    } catch (error) {
        return next(new ErrorHandler('Failed to fetch groups', 400));
    }
});

// Create a new group chat
const createGroup = catchAsyncErrors(async (req, res, next) => {
    if (!req.body.users || !req.body.name) {
        return next(new ErrorHandler('Insufficient data', 400));
    }

    const users = JSON.parse(req.body.users);
    users.push(req.user._id);

    try {
        const groupChat = await Conversation.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user._id
        });

        const fullGroupChat = await Conversation.findOne({ _id: groupChat._id })
            .populate('users', '-password')
            .populate('groupAdmin', '-password');

        res.status(201).json(fullGroupChat);
    } catch (error) {
        return next(new ErrorHandler('Failed to create group', 400));
    }
});

// Exit from a group chat
const groupExit = catchAsyncErrors(async (req, res, next) => {
    const { chatId, userId } = req.body;

    try {
        const removed = await Conversation.findByIdAndUpdate(
            chatId,
            { $pull: { users: userId } },
            { new: true }
        ).populate('users', '-password').populate('groupAdmin', '-password');

        if (!removed) {
            return next(new ErrorHandler('Chat not found', 404));
        }

        res.status(200).json(removed);
    } catch (error) {
        return next(new ErrorHandler('Failed to exit group', 400));
    }
});

// Add a user to a group chat
const addSelfToGroup = catchAsyncErrors(async (req, res, next) => {
    const { chatId, userId } = req.body;

    try {
        const added = await Conversation.findByIdAndUpdate(
            chatId,
            { $push: { users: userId } },
            { new: true }
        ).populate('users', '-password').populate('groupAdmin', '-password');

        if (!added) {
            return next(new ErrorHandler('Chat not found', 404));
        }

        res.status(200).json(added);
    } catch (error) {
        return next(new ErrorHandler('Failed to add self to group', 400));
    }
});

module.exports = {
    accessChat,
    fetchChats,
    fetchGroups,
    createGroup,
    groupExit,
    addSelfToGroup
};
