import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const endRef = useRef(null);
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  // 스크롤 세팅(최근 대화)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId,
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setText("");
      setImg({
        file: null,
        url: "",
      });
    }
  };

  return (
    <div className="w-1/2 border-x border-[#dddddd35] h-full flex flex-col">
      {/* header */}
      <div className="p-5 flex items-center justify-between border-b border-[#dddddd35]">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || "./avatar.png"}
            alt="avatar"
            className="size-14 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <span className="">{user?.username}</span>
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
      {/* center */}
      <div className="p-5 flex-1 overflow-y-scroll flex flex-col gap-5">
        {chat?.messages?.map((msg) => (
          <div
            className={`message max-w-[70%] flex gap-5 ${
              msg.senderId === currentUser?.id ? "self-end" : ""
            }`}
            key={msg?.createdAt}
          >
            {msg.senderId !== currentUser?.id && (
              <img
                src="./avatar.png"
                alt="avatar"
                className="size-8 rounded-full object-cover"
              />
            )}
            <div className="texts flex-1 flex flex-col gap-0.5">
              {msg.img && <img src={msg.img} alt="" />}
              <p className="p-2.5 bg-[#ce3c3cb7] rounded-lg">{msg.text}</p>
              {/* <span className="text-xs">{format()}</span> */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message max-w-[70%] flex gap-5 self-end">
            <div className="texts flex-1 flex flex-col gap-0.5">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      {/* bottom */}
      <div className="p-5 flex items-center justify-between border-t border-[#dddddd35] gap-5 mt-auto">
        <div className="flex gap-5">
          <label htmlFor="file">
            <img
              src="./img.png"
              alt="image"
              className="size-5 cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
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
          className="flex-1 p-3 rounded-lg text-sm border-none outline-none text-white bg-[#ce3c3cb7] placeholder:text-slate-300"
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
        <button
          className="bg-[#841a27] opacity-90 text-white py-2.5 px-5 rounded-lg hover:opacity-100 transition-all text-sm disabled:bg-[#584648] disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
