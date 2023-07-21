import { useSelector } from "react-redux";

const useAuth = () => {
  const context = useSelector((state) => state);
  return context;
};

export default useAuth;
