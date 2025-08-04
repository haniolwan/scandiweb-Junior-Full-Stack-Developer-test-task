import { useNavigate } from "react-router";
import LogoIcon from "../../icons/logo";
import { useProductFilters } from "../../../context/productFilters/useProductFilters";

const Logo = () => {
  const navigate = useNavigate();
  const { updatedFilters } = useProductFilters();

  return (
    <div
      className="cursor-pointer absolute left-1/2 transform -translate-x-1/2"
      onClick={() => {
        updatedFilters("all");
        navigate("/");
      }}
    >
      <div>
        <span className="sr-only">Logo</span>
        <LogoIcon className="h-8 w-auto" width="33" height="31" />
      </div>
    </div>
  );
};
export default Logo;
