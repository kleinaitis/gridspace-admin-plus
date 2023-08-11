import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from './services/fetch-data';
import UserTable from './components/UserTable';
import ControlButtons from './components/ControlButtons';

function App() {
  const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const fetchedUsers = await fetchAllUsers();
            setUsers(fetchedUsers);
        }

        getUsers();
    }, []);

  return (
      <div>
        <ControlButtons />
        <UserTable users={users} />
      </div>
  );
}

export default App;