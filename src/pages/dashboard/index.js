import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandlers } from "../../redux/actions/authActions";

const Dashboard = () => {
  // Hooks
  const { user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  // Handlers
  const onLogout = () => dispatch(logoutHandlers());

  return (
    <div>
      <p>Hey, {user?.name || "Hacker"}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
