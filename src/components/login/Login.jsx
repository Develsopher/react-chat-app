import { useState } from "react";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <div className="w-full h-full flex items-center gap-[100px]">
      {/* left */}
      <div className="flex-1 flex flex-col items-center gap-5">
        <h2>Welcome back,</h2>
        <form
          onSubmit={() => {}}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-2.5 border-none outline-none bg-[#ce3c3cb7] text-white rounded-lg placeholder:text-slate-300"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-2.5 border-none outline-none bg-[#ce3c3cb7] text-white rounded-lg placeholder:text-slate-300"
          />
          <button
            disabled={loading}
            className="w-full bg-[#841a27] opacity-90 text-white py-2.5 px-5 rounded-lg hover:opacity-100 transition-all text-sm"
          >
            {loading ? "Loading" : "Sign In"}
          </button>
        </form>
      </div>
      <div className="separator h-[80%] w-[2px] bg-[#dddddd35]"></div>
      {/* right */}
      <div className="flex-1 flex flex-col items-center gap-5">
        <h2>Create an Account</h2>
        <form
          onSubmit={() => {}}
          className="flex flex-col items-center justify-center gap-5"
        >
          <label
            htmlFor="file"
            className="w-full flex items-center justify-between cursor-pointer underline"
          >
            <img
              src={avatar.url || "./avatar.png"}
              alt=""
              className="size-12 rounded-lg object-cover opacity-60"
            />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="p-2.5 border-none outline-none bg-[#ce3c3cb7] text-white rounded-lg placeholder:text-slate-300"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-2.5 border-none outline-none bg-[#ce3c3cb7] text-white rounded-lg placeholder:text-slate-300"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-2.5 border-none outline-none bg-[#ce3c3cb7] text-white rounded-lg placeholder:text-slate-300"
          />
          <button
            disabled={loading}
            className="w-full bg-[#841a27] opacity-90 text-white py-2.5 px-5 rounded-lg hover:opacity-100 transition-all text-sm"
          >
            {loading ? "Loading" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
