import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../Store/user-slice";
import Header from "./header";
import "./users.css";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { RootState } from "../Store";

interface User {
  id: number;
  firstName: string;
  age: number;
  image: string;
}

interface Comment {
  id: string;
  userId: number;
  comment: string;
}

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.userData);
  const likedUsers = useSelector((state: RootState) => state.user.likedUsers);
  const [loading, setLoading] = useState<boolean>(true);

  const likeBtnHandler = (id: number) => {
    dispatch(userAction.toggleLike(id));
    console.log(id + " liked");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      dispatch(userAction.setUsers(data.users));
      setLoading(false); // Hide the loader after data fetch
    };

    setTimeout(() => {
      fetchData();
    }, 50);
  }, [dispatch]);

  const handleUserClick = (user: User) => {
    localStorage.setItem("user-copy", JSON.stringify(user));
  };

  const userComments = useSelector((state: RootState) => state.user.comment);
  console.log(userComments);

  if (loading) {
    return (
      <>
        <Header />
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      {users.map((user: User, index: number) => {
        const userCommentsForUser = userComments.filter(
          (comment) => comment.userId === user.id
        );

        return (
          <div className="card" key={index}>
            <Link
              className="link"
              to={`/Users/${user.id}`}
              onClick={() => handleUserClick(user)}
            >
              <div className="card-left">
                <div className="card-img">
                  <img src={user.image} alt="not found" />
                </div>
                <div className="card-names">
                  <p>
                    {user.firstName} <br />
                    <sub>Age : {user.age}</sub>
                    <br />
                    <sub>Comments : {userCommentsForUser.length}</sub>
                  </p>
                </div>
              </div>
            </Link>
            <div className="card-right">
              <div className="card-btn">
                <i
                  className={`bi bi-heart-fill likebtn ${likedUsers[user.id]
                      ? "bi bi-heart-fill liked bump"
                      : "bi bi-heart"
                    }`}
                  onClick={() => likeBtnHandler(user.id)}
                ></i>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Users;
