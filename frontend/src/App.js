import React, { useEffect, useState } from "react";
import Socket from "./Socket.config";
import Login from "./Login";
import Notifications from "./Notifications";

function App() {
  const [logedInUser, setLogedInUser] = useState();

  useEffect(() => {
    if (Socket.socket) {
      Socket.socket.on("initiate", (data) => {
        console.log(data);
      });
    }
    return () => {
      if (Socket.socket) {
        Socket.socket.off("initiate");
      }
    };
  }, [Socket.socket]);

  return (
    <div>
      {logedInUser ? (
        <>
          <h1>
            HOME [User ID: {logedInUser}]{" "}
            <button
              onClick={() => {
                Socket.disconnect();
                setLogedInUser(undefined);
              }}
            >
              Logout
            </button>
          </h1>
          <Notifications />
        </>
      ) : (
        <Login setUser={setLogedInUser} />
      )}
    </div>
  );
}

export default App;
