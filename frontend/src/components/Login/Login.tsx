import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import "../../index.css";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();
  const handleShowClick = () => setShowPassword(!showPassword);
  const [warning, setWarning] = useState("");
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }
    setIsEmailValid(true);
    loginHandler(email, password);
  };
  const loginHandler = (email: string, password: string) => {
    setLoading(true);
    const apiUrl =
      "https://payment-backend-omyg.onrender.com/api/v1/user/signin";
      // "http://localhost:3000/api/v1/user/signin";
    const postData = {
      username: email,
      password: password,
    };

    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };

    fetch(apiUrl, fetchOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((data) => {
        console.log("Login successful:", data);

        localStorage.setItem("id", data.data._id);
        setLocalStorage();
        navigate("/");
      })
      .catch((error) => {
        setWarning("User Does not exists/Error Logging in");
        console.error("Error during login:", error);
      });
    setLoading(false);
  };

  const setLocalStorage = () => {
    localStorage.setItem("login", "true");
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="#E3E2DF"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="#EE4C7C" />
        <Heading color="#9A1750">Login</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="#EE4C7C" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!isEmailValid}
                  />
                </InputGroup>
                {!isEmailValid && (
                  <FormHelperText color="red.500">
                    Please enter a valid email address.
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="#EE4C7C"
                    children={<CFaLock color="#EE4C7C" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="pink"
                color="#E3E2DF"
                bg="#9A1750"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      {warning && <div>{warning}</div>}
      <Box>
        New to us?{" "}
        <Link color="#9A1750" href="/signup">
          Sign Up
        </Link>
      </Box>
      <div className=" flex justify-center items-center">
        {isLoading && <div className="IsLoader"></div>}
      </div>

      <div className="border-2 border-black text-xl m-4 px-3 py-2 text-center">
        <div className="font-bold ">Test Credentials</div>
        <div>
          <span>admin@gmail.com</span>
        </div>
        <div>
          <span>admin</span>
        </div>
      </div>
    </Flex>
  );
};

export default Login;
