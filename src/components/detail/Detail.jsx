import { auth } from "../../lib/firebase";

const Detail = () => {
  return (
    <div className="w-1/4">
      <div className="py-7 px-5 flex flex-col items-center gap-3 border-b border-[#dddddd35]">
        <img
          src="./avatar.png"
          alt="avatar"
          className="w-[100px] h-[100px] rounded-full"
        />
        <h2 className="text-lg font-bold">Jane Doe</h2>
        <p className="text-sm font-light text-[#d4d2d2]">
          Lorem ipsum dolor sti amet.
        </p>
      </div>
      <div className="p-5 flex flex-col gap-5">
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Chat Settings</span>
            <img
              src="./arrowUp.png"
              alt="arrow-up"
              className="size-7 bg-[#ce3c3cb7] p-1.5 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Privacy & Help</span>
            <img
              src="./arrowUp.png"
              alt="arrow-up"
              className="size-7 bg-[#ce3c3cb7] p-1.5 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Shared photos</span>
            <img
              src="./arrowDown.png"
              alt="arrow-down"
              className="size-7 bg-[#ce3c3cb7] p-1.5 rounded-full cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <img
                  src="https://develsopher-nextjs.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%A1%E1%84%89%E1%85%A1%E1%86%BC+%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%E1%84%85%E1%85%B5-1.png"
                  alt=""
                  className="rounded-[5px] object-cover size-10"
                />
                <span className="text-xs text-[#d2d2d2] font-light">photo</span>
              </div>
              <img
                src="./download.png"
                alt="download"
                className="size-7 bg-[#ce3c3cb7] p-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span>Shared Files</span>
            <img
              src="./arrowUp.png"
              alt="arrow-up"
              className="size-7 bg-[#ce3c3cb7] p-1.5 rounded-full cursor-pointer"
            />
          </div>
        </div>
        <button className="px-2 bg-[#841a27] py-2 rounded-lg opacity-90 hover:opacity-100 transition-all text-sm">
          Block User
        </button>
        <button
          className="px-2 bg-[#584648] py-2 rounded-lg opacity-90 hover:opacity-100 transition-all text-sm"
          onClick={() => auth.signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
