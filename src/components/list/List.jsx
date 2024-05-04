import ChatList from "./ChatList";
import UserInfo from "./UserInfo";

const List = () => {
  return (
    <div className="w-1/4 flex flex-col">
      <UserInfo />
      <ChatList />
    </div>
  );
};

export default List;
