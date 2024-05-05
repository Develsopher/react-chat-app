import { useUserStore } from "../../lib/userStore";

const UserInfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          src={currentUser.avatar || "./avatar.png"}
          alt="avatar"
          className="size-12 rounded-full object-cover"
        />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="flex gap-5">
        <img src="./more.png" alt="more" className="size-5 cursor-pointer" />
        <img src="./video.png" alt="video" className="size-5 cursor-pointer" />
        <img src="./edit.png" alt="edit" className="size-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default UserInfo;
