import { useState } from "react";
import logo from "../../assets/logo.svg";
import hambuger from "../../assets/Hamberger.svg";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";

const HamburgerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-black">
      <div className="flex items-center justify-between px-4 md:px-16 py-8 ">
        <div>
          <img src={logo} alt="" width="100%" height="100%" />
        </div>
        <div>
          <img
            src={hambuger}
            alt=""
            className="cursor-pointer z-[100]"
            onClick={handleMenuToggle}
          />
        </div>
        {menuOpen ? (
          <div className=" bg-[#000000b5]  w-[90%] sm:w-[75%] left-1/2 -translate-x-1/2 absolute top-20 pt-24 pb-16 z-[50] px-4">
            <RxCross2
              className="text-white absolute right-4 top-4 cursor-pointer"
              size={28}
              onClick={() => setMenuOpen(false)}
            />
            <div className="flex flex-col gap-y-4 justify-center items-center">
              <li
                className={`text-center sm:w-[50%] w-[90%] bg-black py-2 px-6 list-none`}
                onClick={() => setMenuOpen(false)}
              >
                <h5 className="text-[#FFFFFF] heading cursor-pointer w-full">
                  <Link to="/">Home</Link>
                </h5>
              </li>
              <li
                className={`text-center sm:w-[50%] w-[90%]  bg-black py-2 px-6 list-none`}
                onClick={() => setMenuOpen(false)}
              >
                <h5 className="text-[#FFFFFF] heading cursor-pointer">
                  <Link to="aboutUs">About Us</Link>
                </h5>
              </li>
              {isLogin && (
                <Link to="/add">
                  <li
                    className={`text-center px-6  h-[30px]
                    }`}
                  >
                    <h5 className="text-[#EE4C7C] heading cursor-pointer">
                      Add Money
                    </h5>
                  </li>
                </Link>
              )}
              {isLogin && (
                <Link to="/pay">
                  <li
                    className={`text-center px-6  h-[30px] 
                    }`}
                  >
                    <h5 className="text-[#EE4C7C] heading cursor-pointer">
                      Pay
                    </h5>
                  </li>
                </Link>
              )}
              {isLogin && (
                <li
                  className={`text-center px-6  h-[30px]  `}
                  onClick={LogOutHandler}
                >
                  <h5 className="text-[#EE4C7C] heading cursor-pointer">
                    Logout
                  </h5>
                </li>
              )}
              {!isLogin && (
                <li className={`text-center px-6  h-[30px]  `}>
                  <h5 className="text-[#EE4C7C] heading cursor-pointer">
                    <Link to="/login">Login</Link>
                  </h5>
                </li>
              )}
              {!isLogin && (
                <li
                  className={`text-center w-fit px-4 ps-6 h-[30px] 
              }`}
                >
                  <h5 className="text-[#EE4C7C] heading cursor-pointer">
                    <Link to="/signup">SignUp</Link>
                  </h5>
                </li>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HamburgerNavbar;
