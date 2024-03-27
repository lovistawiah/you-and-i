import { faCameraAlt } from "@fortawesome/free-solid-svg-icons";
import PageHeader from "./PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PasswordInput from "./PasswordInput";
import SettingsPassword from "./SettingsPassword";
import useSetting from "../hooks/useSetting";

const Settings = () => {
  const {
    handleLogout,
    handleSubmit,
    handleUsernameInput,
    inputRegex,
    isPassValid,
    setIsPassValid,
    userInfo,
    usernameInput,
  } = useSetting();

  if (!userInfo) return;

  return (
    <section className={`relative order-2 w-full md:w-[55%] md:border-r`}>
      <PageHeader pageName={"Settings"} />
      <section className="absolute bottom-[60px] top-[60px] m-auto flex w-full flex-col items-start overflow-y-auto pb-[40px]">
        {/* profile pic */}

        <button
          className="mr-8 cursor-pointer self-end rounded border bg-red-50 p-1 font-roboto text-red-700 hover:bg-red-200"
          onClick={handleLogout}
        >
          Log out
        </button>

        <section className="flex w-[200px] items-center justify-center self-center font-roboto">
          <section className="relative h-[80px] w-[80px] ">
            <img
              src={userInfo.avatarUrl}
              alt=""
              className="h-full w-full rounded-full border-[3px] border-blue-200 object-contain"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control  */}
            <label htmlFor="fileInput" className="absolute bottom-0 right-0">
              <span className="relative hidden">
                <FontAwesomeIcon
                  icon={faCameraAlt}
                  className="rounded-full bg-blue-400 p-[8px] text-lg text-white "
                />
                <input
                  type="file"
                  name=""
                  id="fileInput"
                  className="invisible w-0"
                />
              </span>
            </label>
          </section>
        </section>

        {/* user information */}
        <section className="text-l w-fit self-center pt-2 font-roboto font-medium">
          {userInfo.username}{" "}
        </section>
        <section className="w-fit self-center font-roboto text-sm font-light text-gray-500">
          {userInfo.bio}{" "}
        </section>

        <form
          className="mt-[20px] flex w-full flex-col items-center gap-4 font-roboto"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            className={`h-[36px] min-w-[250px] max-w-[300px] border-b border-zinc-500 bg-white py-[1px] pl-[4px] pr-0 text-base font-normal text-neutral-700 outline-none active:border-zinc-800 ${!inputRegex.test(usernameInput) ? "bg-red-500 text-red-500" : ""}`}
            id="username"
            placeholder="Change username"
            onChange={handleUsernameInput}
          />

          <input
            type="text"
            name="bio"
            className="h-[36px] min-w-[250px] max-w-[300px] border-b border-zinc-500 bg-white py-[1px] pl-[4px] pr-0 text-base font-normal text-neutral-700 outline-none active:border-zinc-800"
            id="bio"
            placeholder="Bio"
          />

          {/* passwords */}
          <section className="mt-3 flex flex-col gap-3">
            <section className="my-1 text-xl">Passwords</section>
            <PasswordInput
              isValid={isPassValid}
              setIsValid={setIsPassValid}
              label={"Current Password"}
              key={"current-password"}
            />

            <SettingsPassword
              label={"New Password"}
              name={"new-password"}
              placeholder={"New password"}
              key={"new-password"}
            />

            <SettingsPassword
              label={"Confirm Password"}
              name={"confirm-password"}
              placeholder={"Confirm password"}
            />
          </section>
          <button className="flex h-[33px] w-[128px] items-center justify-center  rounded-[5px] border border-neutral-500 bg-blue-600 px-3.5 py-[7px] font-roboto text-base font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-800  ">
            Update
          </button>
        </form>
      </section>
    </section>
  );
};
export default Settings;
