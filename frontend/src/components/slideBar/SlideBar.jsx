import { useEffect, useState } from "react";
import "./Slidebar.css";
import { CiUser } from "react-icons/ci";
import { TiUserAdd } from "react-icons/ti";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosMoon } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import Conversation from "./Conversation";
import { useNavigate } from "react-router-dom";
import { IoSunnySharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../context/themeSlice";
import axios from "axios";
// import useSearchUsers from '../../hooks/useSearchUsers';

// import { toast } from "react-hot-toast";
import useSearchUsers from "../../hooks/useSearchUsers";
import Conversation3 from "./Conversation3";
function SlideBar() {
  const userData = JSON.parse(localStorage.getItem("UserInfo"));
  const user = userData.users;
  // const idea=  user._id; 
  // console.log(idea.username)

  const navigate = useNavigate();
  const theme = useSelector((state) => state.themeKey.value);
  const dispatch = useDispatch();

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        };
        const response = await axios.get("/api/chats",config);
        setConversations(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);
  // console.log(conversations);

  const { search,setSearch, searchUser, setSearchInput, loading, searchDetails } =
    useSearchUsers();

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    searchUser();
  };

  const accessChat = async (userId) => {
    console.log(userId);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const data = { userId };
      const response = await axios.post("/api/chats", data, config );
      console.log(response);
      setTimeout(() => {
        setSearch(false);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`sidebar-container ${theme ? "" : "dark"}`}>
      <div className={`header-container ${theme ? "" : "dark"}`}>
        <div className="header-left-container">
          <CiUser />
        </div>
        <div className="header-right-container">
          <TiUserAdd
            onClick={() => {
              navigate("/app/available");
            }}
            style={{ cursor: "pointer" }}
          />
          <AiOutlineUsergroupAdd
            onClick={() => {
              navigate("/app/usergroups");
            }}
            style={{ cursor: "pointer" }}
          />
          <MdAddCircleOutline
            onClick={() => {
              navigate("/app/creategroups");
            }}
            style={{ cursor: "pointer" }}
          />
          {theme ? (
            <IoIosMoon
              onClick={() => dispatch(toggleTheme())}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <IoSunnySharp
              onClick={() => dispatch(toggleTheme())}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </div>
      <div className={`search-container ${theme ? "" : "dark"}`}>
        <form onSubmit={handleSearchUsers}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-transparent"
          />
          <button>
            <IoSearchOutline style={{ cursor: "pointer" }} />
          </button>
        </form>
      </div>
      <div className={`users-container ${theme ? "" : "dark"}`}>
        {search ? (
          loading ? (
            <div className="text-[20px]">loading...</div>
          ) : (
            <>
              {searchDetails.length === 0 ? (
                <p className="px-4 text-lg">😎No user found😂</p>
              ) : (
                searchDetails.map((details) => (
                  <Conversation
                    key={details._id}
                    data={details}
                    onClick={() => {
                      accessChat(details._id);
                      navigate('/app/chat')
                    }}
                  />
                ))
              )}
            </>
          )
        ) : (
          <div>
            {conversations.map((conversation, idx) => {
              return (
                <Conversation3 key={idx}   data={conversation}  />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SlideBar;
