import { useEffect, useState } from "react";
import "./App.css";
import { TRegistrationInput, TUser } from "./types/user";
import { getUsers, postUser } from "./services/api";
import RegistrationForm from "./components/RegistrationForm";
import { transformInputToUser } from "./utils/transform";
import UsersList from "./components/UsersList";
import { errorHandler } from "./utils/errorHandler";

const App = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  const loadUsers = async () => {
    const { data } = await getUsers();
    setUsers(data);
  };

  const handleNewUser = async (user: TRegistrationInput) => {
    const newUser = transformInputToUser(user, users);

    // Optimistic Update
    setUsers((prevUsers) => [...prevUsers, newUser]);

    try {
      const response = await postUser(user);
      if (response?.status.toString().startsWith("2")) {
        // Update the user with the id from the response
        const previousUsers = users.filter(({ id }) => id !== newUser.id);
        setUsers([...previousUsers, newUser]);
      } else {
        // Rollback
        setUsers((prevUsers) =>
          prevUsers.filter(({ id }) => id !== newUser.id)
        );
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="App">
      <UsersList users={users} />
      <RegistrationForm onNewUser={handleNewUser} />
    </div>
  );
};

export default App;
