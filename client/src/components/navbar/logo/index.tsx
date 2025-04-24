import LogoIcon from "../../icons/logo";

const Logo = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <a href="#">
        <span className="sr-only">Logo</span>
        <LogoIcon className="h-8 w-auto" width="33" height="31" />
      </a>
    </div>
  );
};
export default Logo;
