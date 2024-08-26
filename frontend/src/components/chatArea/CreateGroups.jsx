import React from 'react'

function CreateGroups() {
  return (
    <div className='createGroup-container '>
      <h1 className='font-bold text-xl mb-5'>Create Group</h1>
      <form action="" className='flex flex-col'>
        <input type="text" placeholder='Group Name' className='outline-none border px-4 py-2 w-[30vw] rounded-md' />
        <button className='btn mt-3 text-white font-bold text-lg hover:bg-green-300 hover:text-black '>CREATE</button>
      </form>
    </div>
  )
}

export default CreateGroups
