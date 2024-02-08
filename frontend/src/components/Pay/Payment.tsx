import { useState } from "react";

interface UserCardProps {
  firstName: string;
  lastName: string;
  id: string;
}

const Payment: React.FC<UserCardProps> = ({ firstName, lastName, id }) => {
  const [amount, setAmout] = useState(0);
  console.log(lastName, id);

  return (
    <div>
      <div>Payment Postal</div>
      <div>
        <label>Enter the Amount to pay to {firstName} </label>
        <input type="number"></input>
      </div>
    </div>
  );
};

export default Payment;
