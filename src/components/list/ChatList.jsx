import { useState } from "react";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  return (
    <div className="flex-1 overflow-y-scroll">
      {/* search */}
      <div className="flex items-center gap-2.5 p-3">
        <div className="bg-[#ce3c3cb7] flex items-center gap-2.5 rounded-lg p-2">
          <img src="./search.png" alt="search" className="size-5" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-white"
          />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="Plus"
          className="size-10 bg-[#ce3c3cb7] p-2 rounded-lg cursor-pointer"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {/* list */}
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt="avatar"
          className="size-12 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1.5">
          <span className="font-light">Jane Doe</span>
          <p className="text-xs font-light">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt="avatar"
          className="size-12 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1.5">
          <span className="font-light">Jane Doe</span>
          <p className="text-xs font-light">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt="avatar"
          className="size-12 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1.5">
          <span className="font-light">Jane Doe</span>
          <p className="text-xs font-light">Hello</p>
        </div>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt="avatar"
          className="size-12 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1.5">
          <span className="font-light">Jane Doe</span>
          <p className="text-xs font-light">Hello</p>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
