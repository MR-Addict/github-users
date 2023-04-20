import classNames from "classnames";
import style from "./Tooltip.module.css";

interface Props {
  title: string;
  position?: string;
  children: React.ReactNode;
}

export default function Tooltip({ title, children, position = "top" }: Props) {
  if (position === "top")
    return (
      <div className={classNames(style.tip, style.top)} tip-data={title}>
        {children}
      </div>
    );
  else if (position === "bottom")
    return (
      <div className={classNames(style.tip, style.bottom)} tip-data={title}>
        {children}
      </div>
    );
  else if (position === "right")
    return (
      <div className={classNames(style.tip, style.right)} tip-data={title}>
        {children}
      </div>
    );
  return (
    <div className={classNames(style.tip, style.left)} tip-data={title}>
      {children}
    </div>
  );
}
