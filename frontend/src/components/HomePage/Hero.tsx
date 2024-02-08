import Navbar from "../Navbar/Navbar";
import HamburgerNavbar from "../Navbar/HamburgerNavbar";
import { useState, useEffect } from "react";
import Landing from "./Landing";

const Hero = () => {
  const wid = window.innerWidth;
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (wid < 1020) setStatus(true);
    else setStatus(false);
  }, [wid]);
  return <div>{status ? <HamburgerNavbar /> : <Navbar />}
  <Landing />
  </div>;
};

export default Hero;
