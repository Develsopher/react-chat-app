const AddUser = () => {
  return (
    <div className="w-max h-max p-7 bg-[rgba(17,25,40,0.8)] rounded-lg absolute inset-0 m-auto">
      <form className="flex gap-5">
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
      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-5 text-sm">
          <img
            src="./avatar.png"
            alt="avatar"
            className="size-12 rounded-full object-cover"
          />
          <span>Develsoph1111er</span>
        </div>
        <button className="p-2.5 border-none outline-none bg-[#ce3c3cb7] text-white rounded-lg placeholder:text-slate-300 text-xs">
          Add User11
        </button>
      </div>
    </div>
  );
};

export default AddUser;
