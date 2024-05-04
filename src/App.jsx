import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";

const App = () => {
  const user = false;

  return (
    <div className="w-[80vw] h-[90vh] bg-[#d17373b7] backdrop-blur-sm rounded-lg border border-[rgba(255,255,255,0.125)] flex">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
