import { faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const {
    windowWidth,
    handleUserInfo,
    personInfo,
    goBack,
    handleUsernameInput,
    inputRegex,
    usernameInput,
  } = useUpdateProfile();
  if (!personInfo) return;
  return (
    <div>
      <section className="w-screen">
        <section className="mt-2 flex w-full justify-between md:block">
          {windowWidth < 640 && (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="ml-2 h-[16px] w-[16px]  cursor-pointer rounded-full p-2 transition duration-300 ease-in-out hover:bg-gray-200"
              onClick={goBack}
            />
          )}
          <section className="w-full p-1 text-center font-roboto text-xl font-medium">
            Update User Profile
          </section>
        </section>
        {/* profile pic */}
        <section className="m-auto mt-[70px] flex w-[200px] items-center justify-center">
          <section className="relative h-[100px] w-[100px] ">
            <img
              src={personInfo.avatarUrl}
              alt=""
              className="h-full w-full rounded-full border-[2px] border-blue-200 object-cover"
            />
          </section>
        </section>

        {/* user information */}
        <section className="m-auto w-fit pt-4 text-center font-roboto text-lg font-medium">
          {personInfo.username}
        </section>
        <section className="m-auto w-fit text-center font-roboto text-sm font-light text-gray-500">
          {personInfo.bio}
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
            placeholder={personInfo.username}
            required
            onChange={handleUsernameInput}
          />
          <div className="flex w-[270px] items-center justify-end ">
            {usernameInput.length < 1 ? (
              <Link
                to="/"
                className="w-[60px] rounded-full border border-blue-500 px-2 py-1 text-center font-roboto text-base transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
              >
                Skip
              </Link>
            ) : (
              <button
                className={`flex h-[33px] w-[100px] items-center justify-center  rounded-[5px] border bg-blue-500 px-3.5 py-[7px] font-roboto text-base font-normal text-white outline-none transition duration-300 ease-in-out hover:bg-blue-600 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-red-500 md:w-[250px] md:text-lg`}
                disabled={!inputRegex.test(usernameInput)}
              >
                Next <FontAwesomeIcon icon={faArrowRight} className="pl-1" />
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateProfile;
