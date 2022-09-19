import React from "react";
import { useState, useEffect } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Here is user lists: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState([true]);
  const [searchValue, setSearchValue] = useState("");
  const [success, setSucces] = useState(false);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id)); // if finds this id in our array(invites), then it deletes it
    } else {
      setInvites((prev) => [...prev, id]); // otherwise we add it to our array(invites)
    }
  };

  const onCLickSendInvites = () => {
    setSucces(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite} // we send our onClickInvite function through a prop called onClickInvite
          onCLickSendInvites={onCLickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
