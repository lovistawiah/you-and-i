import { ChangeEvent, useState } from "react";
import { faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InfoContainer from "./InfoContainer";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { useEffect } from "react";

const UpdateProfile = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const { windowWidth, handleUserInfo, info, setInfo, navigate, personInfo } = useUpdateProfile();

  const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.target.value);
  };
  useEffect(() => {
    const handleLogout = () => {
      localStorage.clear();
    };
    handleLogout();
  }, []);

  const goBack = () => {
    navigate("/register");
  };

  const inputRegex = /^[a-zA-Z0-9.@_]*$/;
  return (
    <div>
      <section className="w-screen">
        <InfoContainer info={info} setInfo={setInfo} />
        <section className="mt-2 flex w-full justify-between md:block">
          {
            //show back arrow on mobile device
            windowWidth < 640 && (
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="ml-2 cursor-pointer p-2 hover:rounded-full hover:bg-gray-100"
                onClick={goBack}
              />
            )
          }
          <section className="w-full p-1 text-center font-roboto text-xl font-medium">
            User Profile
          </section>
        </section>
        {/* profile pic */}
        <section className="m-auto mt-[70px] flex w-[200px] items-center justify-center">
          <section className="relative h-[100px] w-[100px] ">
            <img
              src={personInfo?.avatarUrl}
              alt=""
              className="h-full w-full rounded-full border-[2px] border-blue-200 object-cover"
            />
          </section>
        </section>

        {/* user information */}
        <section className="m-auto w-fit pt-4 text-center font-roboto text-lg font-medium">
          {personInfo?.username}
        </section>
        <section className="m-auto w-fit text-center font-roboto text-sm font-light text-gray-500">
          {personInfo?.bio}
        </section>

        <form
          className="mt-[35px] flex h-fit w-full flex-col items-center gap-4"
          onSubmit={handleUserInfo}
        >
          <input
            type="text"
            name="username"
            className={`h-[36px] w-[275px] border-b border-zinc-500 bg-white py-[1px] pl-[4px] pr-0 text-base font-normal text-neutral-700 outline-none active:border-zinc-800 md:w-[400px] ${!inputRegex.test(usernameInput) ? "bg-red-500 text-red-500" : ""}`}
            id="username"
            placeholder={personInfo?.username}
            required
            onChange={handleUsernameInput}
          />

          <button
            className={`flex h-[33px] w-[100px] items-center justify-center  rounded-[5px] border bg-blue-500 px-3.5 py-[7px] font-roboto text-base font-normal text-white outline-none hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-red-500 md:w-[250px] md:text-lg ${usernameInput == "" ? "cursor-not-allowed bg-gray-400 hover:bg-gray-600" : ""}`}
            disabled={!inputRegex.test(usernameInput)}
          >
            Next <FontAwesomeIcon icon={faArrowRight} className="pl-1" />
          </button>
        </form>
      </section>
    </div>
  );
};

export default UpdateProfile;
