import { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoContainer = ({
  info,
  setInfo,
}: {
  info:
    | Record<string, never>
    | {
        type: string;
        message: string;
      };
  setInfo: React.Dispatch<
    React.SetStateAction<
      | Record<string, never>
      | {
          type: string;
          message: string;
        }
    >
  >;
}) => {
  return <div></div>;
};

export default InfoContainer;
