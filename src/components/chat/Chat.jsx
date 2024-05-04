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
      <div className="p-5 flex-1 overflow-y-scroll flex flex-col gap-5">
        <div className="message max-w-[70%] flex gap-5">
          <img
            src="./avatar.png"
            alt="avatar"
            className="size-8 rounded-full object-cover"
          />
          <div className="texts flex-1 flex flex-col gap-0.5">
            <p className="p-2.5 bg-[#ce3c3cb7] rounded-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In
              eligendi, incidunt tenetur, sapiente porro non quo odit aperiam
              delectus itaque quod. Dolorum, quam. Ea hic beatae iusto officia
              rerum voluptas.
            </p>
            <span className="text-xs">11 min ago</span>
          </div>
        </div>
        <div className="message max-w-[70%] flex gap-5 own self-end">
          <div className="texts flex-1 flex flex-col gap-0.5">
            <img
              src="https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%A1%E1%84%89%E1%85%A1%E1%86%BC+%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%E1%84%85%E1%85%B5-1.png"
              alt=""
              className="w-full h-[300px] rounded-lg object-cover"
            />
            <p className="p-2.5 bg-[#841a27] rounded-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In
              eligendi, incidunt tenetur, sapiente porro non quo odit aperiam
              delectus itaque quod. Dolorum, quam. Ea hic beatae iusto officia
              rerum voluptas.
            </p>
            <span className="text-xs">1 min ago</span>
          </div>
        </div>
      </div>
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
          <div className="absolute bottom-12 left-0 z-10">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="bg-[#841a27] opacity-90 text-white py-2.5 px-5 rounded-lg hover:opacity-100 transition-all">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
