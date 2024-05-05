import { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("회원가입에 성공하였습니다!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center gap-[100px]">
      {/* left */}
      <div className="flex-1 flex flex-col items-center gap-5">
        <h2>Welcome back,</h2>
        <form
          onSubmit={handleLogin}
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
            className="w-full bg-[#841a27] opacity-90 text-white py-2.5 px-5 rounded-lg hover:opacity-100 transition-all text-sm disabled:cursor-not-allowed disabled:bg-[#584648]"
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
          onSubmit={handleRegister}
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
            className="w-full bg-[#841a27] opacity-90 text-white py-2.5 px-5 rounded-lg hover:opacity-100 transition-all text-sm disabled:cursor-not-allowed disabled:bg-[#584648]"
          >
            {loading ? "Loading" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
