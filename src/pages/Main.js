import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";

import "./Main.css";
import api from "../services/api";

const Main = ({ match }) => {
  const [users, setUsers] = React.useState([]);
  const { id } = match.params;

  React.useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: {
          user: id,
        },
      });
      setUsers(response.data);
      console.log(response.data);
    }

    loadUsers();
  }, [id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id },
    });
    setUsers(users.filter((user) => user._id !== id));
  }
  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    });
    setUsers(users.filter((user) => user._id !== id));
  }
  if (users) {
    return (
      <div className="main-container">
        <Link to="/">
          <img src={logo} alt="Tindev" />
        </Link>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button
                  type="button"
                  onClick={() => {
                    handleDislike(user._id);
                  }}
                >
                  <img src={dislike} alt="dislike" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleLike(user._id);
                  }}
                >
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Main;
