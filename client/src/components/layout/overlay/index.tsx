import classNames from "classnames";
type Props = {
  open: boolean;
};
const Overlay = ({ open }: Props) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 z-30 bg-black/25 transition-opacity duration-300 ease-in-out",
        { "opacity-100": open, "opacity-0 pointer-events-none": !open }
      )}
      aria-hidden="true"
    />
  );
};

export default Overlay;
