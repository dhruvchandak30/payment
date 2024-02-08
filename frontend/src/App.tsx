import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "../src/components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Pay from "./components/Pay/Pay";
import AddMoney from "./components/AddMoney/AddMoney";

function App() {
  return (
    <div className="bg-[#E3E2DF]">
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/add" element={<AddMoney />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
