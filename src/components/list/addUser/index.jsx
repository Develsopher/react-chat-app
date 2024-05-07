import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-max h-max p-7 bg-[rgba(17,25,40,0.8)] rounded-lg absolute inset-0 m-auto">
      <form className="flex gap-5" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="p-2.5 rounded-lg border-none outline-none text-black"
        />
        <button className="p-2.5 border-none outline-none bg-[#ce3c3cb7] text-white rounded-lg placeholder:text-slate-300 text-xs">
          Search
        </button>
      </form>
      {user && (
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-5 text-sm">
            <img
              src={user.avatar || "./avatar.png"}
              alt="avatar"
              className="size-12 rounded-full object-cover"
            />
            <span>{user.username}</span>
          </div>
          <button
            className="p-2.5 border-none outline-none bg-[#ce3c3cb7] text-white rounded-lg placeholder:text-slate-300 text-xs"
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
