import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    // Cancel our request if our Component unmounts
    const controller = new AbortController();
    const getUsers = async () =>{
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal // cancel the request if we need to
        });
        const userNames = response.data.map(user => user.username);
        console.log(response.data);
        isMounted && setUsers(userNames);
      } catch(err) {
        console.error(err);
        // when the user refreshToken expires -> ask them to login and relocate to where they were
        navigate('/login', {state: {from: location}, replace: true})
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) => <li key={i}>{user}</li>)}
          </ul>
        ) 
        : <p>No users to display</p>
      }
    </article>
  )
}

export default Users;