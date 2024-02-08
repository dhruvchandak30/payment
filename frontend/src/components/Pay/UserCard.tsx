import React from "react";

interface UserCardProps {
  firstName: string;
  lastName: string;
  id: string;
  onUserClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  firstName,
  lastName,
  onUserClick,
}) => {
  return (
    <div className="cursor-pointer" onClick={onUserClick}>
      <p className="text-black text-xl">
        {firstName} {lastName}
      </p>
    </div>
  );
};

export default UserCard;
