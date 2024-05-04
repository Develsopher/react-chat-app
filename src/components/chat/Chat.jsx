import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="w-1/2 border-x border-[#dddddd35] h-full flex flex-col">
      <div className="p-5 flex items-center justify-between border-b border-[#dddddd35]">
        <div className="flex items-center gap-5">
          <img
            src="./avatar.png"
            alt="avatar"
            className="size-14 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <span className="">Jane Doe</span>
            <p className="text-sm font-light text-[#d4d2d2]">
              Lorem ipsum dolor sit amet
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <img src="./phone.png" alt="phone" className="size-5" />
          <img src="./video.png" alt="video" className="size-5" />
          <img src="./info.png" alt="info" className="size-5" />
        </div>
      </div>
      <div className="p-5 flex-1">hello, center</div>
      <div className="p-5 flex items-center justify-between border-t border-[#dddddd35] gap-5 mt-auto">
        <div className="flex gap-5">
          <img src="./img.png" alt="image" className="size-5 cursor-pointer" />
          <img
            src="./camera.png"
            alt="camera"
            className="size-5 cursor-pointer"
          />
          <img src="./mic.png" alt="mic" className="size-5 cursor-pointer" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-lg text-sm border-none outline-none text-white bg-[#ce3c3cb7]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="relative">
          <img
            src="./emoji.png"
            alt="emoji"
            className="size-5 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="absolute bottom-12 left-0">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="bg-[#841a27] text-white py-2.5 px-5 rounded-lg hover:opacity-90 transition-all">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
