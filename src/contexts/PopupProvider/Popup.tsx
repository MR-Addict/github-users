"use client";

import classNames from "classnames";
import { BsCheckCircle } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";

import style from "./Popup.module.css";

interface Props {
  isPopup: boolean;
  popupData: { status: boolean; message: string };
}

export default function Popup({ popupData, isPopup }: Props) {
  return (
    <section aria-label="popup window" className={classNames(style.popupwindow, isPopup ? style.active : "")}>
      <div className={classNames(style.popupbody, popupData.status ? style.active : "")}>
        <div>{popupData.status ? <BsCheckCircle size={30} /> : <MdErrorOutline size={30} />}</div>
        <div className="flex flex-col">
          <p className="font-bold">{popupData.status ? "Success" : "Error"}</p>
          <p>{popupData.message}</p>
        </div>
      </div>
    </section>
  );
}
