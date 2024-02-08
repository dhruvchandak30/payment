import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import "../../index.css";
import Navbar from "../Navbar/Navbar";
interface UserInterface {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const Pay: React.FC = () => {
  const [userData, setUserData] = useState<UserInterface[]>([]); // Initialize with an empty array
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
  const [amount, setAmount] = useState<number>(); // Initialize with an empty string
  const [balance, setBalance] = useState(0);
  const [warning, setWarning] = useState("");
  const [isLoading, setLoading] = useState(false);
  const getUserHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/getUsers"
      );
      if (response.ok) {
        const data = (await response.json()) as { userData: UserInterface[] };
        setUserData(data.userData);
      } else {
        setWarning("Error in Fetching Users");
      }
      setLoading(false);
    } catch (error) {
      setWarning("Error Fetching Users");
    }
  };

  const setAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value === "" ? 0 : Number(e.target.value));
    setWarning("");
  };

  const makePaymentHandler = async () => {
    setLoading(true);
    if (amount && amount > balance) {
      setWarning("You don't have enough Amount");
      return;
    }
    const apiUrl = "http://localhost:3000/api/v1/account/transfer";
    const data = {
      amount: amount,
      to: selectedUser?._id,
      from: localStorage.getItem("id"),
    };
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, fetchOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setWarning("Could Not Make Payment");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((data) => {
        console.log(data);
        setWarning("Transaction Successfull");
        setLoading(false);
        getBalance();
      })
      .catch((error) => {
        console.log(error);
        setWarning("Error in Making payment");
      });
  };

  const getBalance = async () => {
    const apiUrl = "http://localhost:3000/api/v1/account/getBalance";
    const data = {
      userId: localStorage.getItem("id"),
    };
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
        setBalance(data.balance);
      })
      .catch((error) => {
        // setWarning("User Does not exists/Error Logging in");
        console.log("Error during login:", error);
      });
  };
  useEffect(() => {
    getBalance();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="text-black flex  flex-col justify-center items-center">
        <p className="text-[#932243] text-4xl font-bold">Payment Portal</p>
        {balance > 0 && (
          <p className="text-2xl">Available Balance is Rs {balance}</p>
        )}
        <button
          className="text-xl text-black my-4 rounded-md p-2 bg-[#cc407c] border-2 border-black"
          onClick={getUserHandler}
        >
          See Users to pay
        </button>

        {userData.length > 0 && (
          <p className="text-2xl mb-3">Select any User to pay them</p>
        )}
        {userData.length > 0 &&
          userData.map((item: UserInterface) => (
            <div key={item._id} className="w-64">
              <hr></hr>
              <UserCard
                firstName={item.firstName}
                lastName={item.lastName}
                id={item._id}
                onUserClick={() => setSelectedUser(item)}
              />
              <hr></hr>
            </div>
          ))}
        {selectedUser && (
          <form className="flex flex-col my-8">
            <label className="text-xl">
              Enter the Amount you want<br></br> to pay to{" "}
              {selectedUser.firstName}{" "}
            </label>
            <input
              className="w-64 p-2"
              type="number"
              placeholder="Rs"
              value={amount}
              onChange={setAmountHandler}
            ></input>
          </form>
        )}
        {selectedUser && amount && amount > 0 && (
          <div className="flex flex-col justify-center">
            <div className="text-xl">
              You want to pay {selectedUser?.firstName} Rs {amount}
            </div>
            <button
              className=" flex justify-center  items-center border-2 my-6 bg-pink-500 p-2 font-bold border-black"
              onClick={makePaymentHandler}
            >
              Proceed to Pay
            </button>
          </div>
        )}
        {isLoading && <div className="IsLoader"></div>}
        <div>
          {warning && (
            <p
              className={
                warning === "Transaction Successfull"
                  ? "text-green-700 text-xl"
                  : "text-red-700 text-xl"
              }
            >
              {warning}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pay;
