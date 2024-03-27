import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";

const PassWithRegex = ({
  setIsValid,
  isValid,
}: {
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState("");
  const passVisibility = () => {
    setShowPass(!showPass);
  };
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,+><_])[A-Za-z\d@$!%*?&,+><_]{8,}$/;

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const passText = e.target.value;
    setIsValid(passRegex.test(passText));
  };
  useEffect(() => {
    if (pass.length > 4) {
      setIsValid(passRegex.test(pass));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass]);
  useEffect(() => {
    if (pass.length < 1) {
      setIsValid(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass]);

  return (
    <div className="flex w-fit flex-col">
      <label htmlFor="password" className="font-roboto text-base font-normal  text-gray-800">
        Password
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
          onChange={(e) => setPass(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPass ? faEyeSlash : faEye}
          className="absolute right-2 top-[10px] text-gray-600"
          onClick={passVisibility}
        />
      </div>
    </div>
  );
};

export default PassWithRegex;
