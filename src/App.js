import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

const defaultUserInfo = {
  title: "",
  firsName: "",
  lastName: "",
  email: "",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log("rendering");
    setLoading(true);
    axios.get("https://randomuser.me/api").then((response) => {
      const {
        data: {
          results: [
            {
              name: { first, last, title },
              email,
            },
          ],
        },
      } = response;

      const resUserInfo = {
        title,
        firsName: first,
        lastName: last,
        email,
      };

      setUserInfo(resUserInfo);

      if (window) localStorage.setItem("userInfo", JSON.stringify(resUserInfo));

      setLoading(false);
    });
  };

  return (
    <div className="App">
      <h1>User Details</h1>
      {!loading ? (
        <>
          <div className="user-details--container">
            <div className="name">
              <strong>Name:</strong>{" "}
              <span>
                {userInfo.title}. {userInfo.firsName} {userInfo.lastName}
              </span>
            </div>
            <div className="email">
              <strong>Email:</strong> <span>{userInfo.email}</span>
            </div>
          </div>
          <button className="refresh-btn" onClick={fetchData}>
            Refresh
          </button>
        </>
      ) : (
        <div>Fetching data</div>
      )}
    </div>
  );
}

export default App;
