import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const SettingsPassword = ({
  label,
  placeholder,
  name,
}: {
  label: string;
  placeholder: string;
  name: string;
}) => {
  const [showPass, setShowPass] = useState(false);

  const passVisibility = () => {
    setShowPass(!showPass);
  };
  return (
    <div className="flex w-fit flex-col">
      <label htmlFor="password" className="font-roboto text-base font-normal text-gray-800">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          name={name}
          className="h-[36px] min-w-[270px] max-w-[320px] rounded border border-gray-500 bg-white py-[1px] pl-[4px] pr-0 font-roboto text-base font-normal text-neutral-700 outline-none focus:border-[2px] focus:border-blue-400 active:border-zinc-800 "
          id="password"
          placeholder={placeholder}
          required
        />
        {
          <FontAwesomeIcon
            icon={showPass ? faEyeSlash : faEye}
            className="absolute right-2 top-[10px] text-gray-600"
            onClick={passVisibility}
          />
        }
      </div>
    </div>
  );
};

export default SettingsPassword;
