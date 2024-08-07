import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "../../index.css";
import { useNavigate } from "react-router";

const AddMoney = () => {
  const [amount, setAmount] = useState(0);
  const [warning, setWarning] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("id");
    if (!data) {
      navigate("/");
    }
  },[navigate]);

  const getBalance = async () => {
    const apiUrl =
      "https://payment-backend-omyg.onrender.com/api/v1/account/getBalance";
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
        setWarning("User Does not exists/Error Logging in");
        console.log("Error during login:", error);
      });
  };
  useEffect(() => {
    getBalance();
  }, []);

  const AddMoneyHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const amountInput = form.elements.namedItem("AddMoney") as HTMLInputElement;
    const amountVal = Number(amountInput.value);
    setAmount(amountVal);
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
    const apiUrl =
      "https://payment-backend-omyg.onrender.com/api/v1/account/addMoney";
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
        console.log(error);
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

      <div className="flex justify-center items-center my-4">
        {balance >= 0 && (
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
          className="border-2 border-black text-xl rounded-md my-4 p-2 bg-[#cc407c]"
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
