import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "../../index.css";

const AddMoney = () => {
  const [amount, setAmount] = useState(0);
  const [warning, setWarning] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const apiUrl = "http://localhost:3000/api/v1/account/getBalance";
    const data = {
      userId: localStorage.getItem("id"),
    };
    console.log(data.userId);
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

  const AddMoneyHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setAmount(Number(e.target.elements.AddMoney.value));
    console.log("Amount:", amount);
    if (Number(amount) < 0) {
      setWarning("Please enter valid Amount");
      setLoading(false);
      return;
    }
    if (Number(amount) == 0) {
      setWarning("Some Error occured Try Again");
      setLoading(false);
      return;
    }
    const apiUrl = "http://localhost:3000/api/v1/account/addMoney";
    const data = {
      amount: amount,
      to: localStorage.getItem("id"),
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
        setWarning("Error in Making payment");
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="font-bold text-3xl text-center">
        Add Money to your Wallet
      </div>
      {!balance && (
        <div onClick={getBalance} className="cursor-pointer flex items-center justify-center  text-xl border-1 border-black">
          Check your Available Balance
        </div>
      )}
      <div className="flex justify-center items-center my-4">
        {balance > 0 && (
          <p className="text-2xl">Available Balance is Rs {balance}</p>
        )}
      </div>
      <form
        onSubmit={AddMoneyHandler}
        className="flex flex-col justify-center items-center"
      >
        <label>Enter The amount</label>
        <input
          type="number"
          placeholder="Rs"
          name="AddMoney"
          className="p-2 border-2 border-black"
        ></input>
        <button
          type="submit"
          className="border-2 border-black p-1 rounded-md my-4 bg-[#d030b0]"
        >
          Add Money
        </button>
      </form>
      <div className=" flex justify-center items-center">
        {isLoading && <div className="IsLoader"></div>}
      </div>
      <div className="flex justify-center items-center">
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
  );
};

export default AddMoney;
