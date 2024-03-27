import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SetStateAction, useState } from "react";

const PasswordInput = ({
  setIsValid,
  isValid,
  label,
}: {
  isValid: boolean;
  label: string;
  setIsValid: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [showPass, setShowPass] = useState(false);
  const passVisibility = () => {
    setShowPass(!showPass);
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const passText = e.target.value;
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,+><_])[A-Za-z\d@$!%*?&,+><_]{8,}$/;
    setIsValid(passRegex.test(passText));
  };

  return (
    <div className="flex w-fit flex-col">
      <label
        htmlFor="password"
        className="font-roboto text-base font-normal text-gray-800"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          name="password"
          className={`h-[36px] w-[275px] rounded-[5px] border bg-white py-[1px] pl-[4px] pr-0 ${!isValid ? "border-red-500" : " border-gray-500"} font-roboto text-base font-normal text-gray-800 outline-none placeholder:text-gray-400  focus:border-[2px] focus:border-blue-400 md:w-[350px] md:text-lg`}
          id="password"
          placeholder="Password"
          onBlur={onBlur}
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

export default PasswordInput;
