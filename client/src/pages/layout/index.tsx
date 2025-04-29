import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};
const Layout = ({ className, children }: Props) => {
  return (
    <div
      className={classNames(
        className,
        "mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex gap-20"
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
