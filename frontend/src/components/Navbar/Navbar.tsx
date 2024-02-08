import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.jpg";

const Navbar = () => {
  const [bg, setBg] = useState([false, false, false, false]);

  const hoverHandler = (e: number) => {
    const temp = [false, false, false, false];
    temp[e] = true;
    setBg(temp);
  };

  const hoverOut = () => {
    setBg([false, false, false, false]);
  };
  const [isLogin, setLogin] = useState(false);

  const LogOutHandler = () => {
    setLogin(false);
    localStorage.removeItem("login");
    localStorage.removeItem("id");
  };
  useEffect(() => {
    const items = localStorage.getItem("login");
    if (items === "true") {
      setLogin(true);
    }
  }, [isLogin]);

  return (
    <div>
      <div className="text-white bg-black flex items-center justify-between px-16 py-8 ">
        <div>
          <img
            alt=""
            className="rounded-full"
            src={Logo}
            width="30%"
            height="30%"
          />
        </div>
        <ul className="flex gap-x-6 ">
          <li
            className={`text-center w-fit px-8 h-[30px]  ${
              bg[0] ? "back" : ""
            }`}
            onMouseEnter={() => hoverHandler(0)}
            onMouseLeave={hoverOut}
          >
            <h5 className="text-[#EE4C7C] heading cursor-pointer w-full">
              <Link to="/">Home</Link>
            </h5>
          </li>
          <li
            className={`text-center px-6 h-[30px]  ${bg[1] ? "back" : ""}`}
            onMouseEnter={() => hoverHandler(1)}
            onMouseLeave={hoverOut}
          >
            <h5 className="text-[#EE4C7C] heading cursor-pointer">About Us</h5>
          </li>
          {isLogin && (
            <li
              className={`text-center px-6  h-[30px]  ${bg[2] ? "back" : ""}`}
              onMouseEnter={() => hoverHandler(2)}
              onMouseLeave={hoverOut}
              onClick={LogOutHandler}
            >
              <h5 className="text-[#EE4C7C] heading cursor-pointer">Logout</h5>
            </li>
          )}
          {!isLogin && (
            <li
              className={`text-center px-6  h-[30px]  ${bg[2] ? "back" : ""}`}
              onMouseEnter={() => hoverHandler(2)}
              onMouseLeave={hoverOut}
            >
              <h5 className="text-[#EE4C7C] heading cursor-pointer">
                <Link to="/login">Login</Link>
              </h5>
            </li>
          )}
          {!isLogin && (
            <li
              className={`text-center w-fit px-4 ps-6 h-[30px] ${
                bg[3] ? "back" : ""
              }`}
              onMouseEnter={() => hoverHandler(3)}
              onMouseLeave={hoverOut}
            >
              <h5 className="text-[#EE4C7C] heading cursor-pointer">
                <Link to="/signup">SignUp</Link>
              </h5>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
