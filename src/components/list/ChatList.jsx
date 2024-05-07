import { useEffect, useState } from "react";
import AddUser from "./addUser";
import { useUserStore } from "../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promises);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      },
    );

    return () => {
      unsub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId,
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex-1 overflow-y-scroll">
      {/* search */}
      <div className="flex items-center gap-2.5 p-3">
        <div className="bg-[#ce3c3cb7] flex items-center gap-2.5 rounded-lg p-2">
          <img src="./search.png" alt="search" className="size-5" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-white placeholder:text-slate-300"
          />
        </div>
      </div>
      {/* list */}
      {chats.map((chat) => (
        <div
          className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#dddddd35]"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#ce3c3cb7",
          }}
        >
          <img
            src={chat.user.avatar || "./avatar.png"}
            alt="avatar"
            className="size-12 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1.5">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p className="text-xs font-light">{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      <div className="flex justify-center items-center mt-4">
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="Plus"
          className="size-10 bg-[#ce3c3cb7] p-2 rounded-lg cursor-pointer"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
