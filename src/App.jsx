import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";

const App = () => {
  return (
    <div className="w-[90vw] h-[90vh] bg-[#d17373b7] backdrop-blur-sm rounded-lg border border-[rgba(255,255,255,0.125)] flex">
      <List />
      <Chat />
      <Detail />
    </div>
  );
};

export default App;
