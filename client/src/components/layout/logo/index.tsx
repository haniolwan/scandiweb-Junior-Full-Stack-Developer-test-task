import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import LogoIcon from "../../icons/logo";

const Logo = () => {
  return (
    <Router>
      <MyComponent />
    </Router>
  );
};

const MyComponent = () => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer absolute left-1/2 transform -translate-x-1/2"
      onClick={() => navigate("/")}
    >
      <div>
        <span className="sr-only">Logo</span>
        <LogoIcon className="h-8 w-auto" width="33" height="31" />
      </div>
    </div>
  );
};
export default Logo;
