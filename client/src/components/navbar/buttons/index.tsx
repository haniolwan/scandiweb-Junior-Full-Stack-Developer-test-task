import { Dispatch, SetStateAction } from "react";
import { OpenMenuIcon } from "../../icons";
type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export const OpenMenuButton = ({ setOpen }: Props) => {
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
    >
      <span className="absolute -inset-0.5"></span>
      <span className="sr-only">Open menu</span>
      <OpenMenuIcon className="size-6" />
    </button>
  );
};
