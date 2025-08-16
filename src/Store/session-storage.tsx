import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./index";

interface user {
  id: string;
  firstName: string;
  lastName: string;
}
const userSession: React.FC = () => {
  const users = useSelector((state: RootState) => state.user.userData);
  console.log(users);
  const [userData, setUserData] = useState<user>({
    id: "",
    firstName: "",
    lastName: "",
  });
  return <></>;
};
export default userSession;
