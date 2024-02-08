import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

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
  const [amount, setAmount] = useState<number | "">(0); // Initialize with an empty string

  const getUserHandler = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/getUsers"
      );
      if (response.ok) {
        const data = (await response.json()) as { userData: UserInterface[] };
        setUserData(data.userData);
      } else {
        console.log("Error in Fetching Users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const setAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value === "" ? "" : Number(e.target.value));
  };

  const makePaymentHandler = () => {
    console.log(selectedUser);
    console.log(amount);
    console.log(localStorage.getItem("id"));
  };
  return (
    <div className="text-black">
      <p className="text-black text-3xl">Pay</p>
      <button
        className="text-xl border-2 border-black"
        onClick={getUserHandler}
      >
        See All Users
      </button>
      <p>Click any User to pay them</p>
      {userData.length > 0 &&
        userData.map((item: UserInterface) => (
          <div>
          <UserCard
            key={item._id}
            firstName={item.firstName}
            lastName={item.lastName}
            id={item._id}
            onUserClick={() => setSelectedUser(item)}
          />
          </div>
        ))}
      {selectedUser && (
        <form className="flex flex-col">
          <label>Enter the Amount to pay to {selectedUser.firstName} </label>
          <input
            className="w-16"
            type="number"
            placeholder="Rs"
            value={amount}
            onChange={setAmountHandler}
          ></input>
        </form>
      )}
      {selectedUser && amount && amount > 0 && (
        <div>
          <div>
            You want to pay {selectedUser?.firstName} Rs {amount}
          </div>
          <button
            className="border-2 my-6 border-black"
            onClick={makePaymentHandler}
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Pay;
