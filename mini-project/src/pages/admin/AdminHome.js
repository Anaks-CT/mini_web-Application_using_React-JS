import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import SingleUser from "../../components/SingleUser";
import Swal from "sweetalert2";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addUserButtonClick, setButton] = useState(false);

  ////////////////////////////// state for controlled input component /////////////

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  ////////////////////////////// fetching the value from backend at initial render ///////////////////////

  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/userDetails")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          text: "fetching data failed",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        })
      );
  }, []);

  //////////////////////////// onchange search term ///////////////////////////

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  ////////////////////////// refreshing with newly fetched data from the backend after crud operation///////////////////

  function refreshUsers() {
    axios
      .get("http://localhost:8000/admin/userDetails")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          text: "fetching user failed in the backend",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        })
      );
  }

  ////////////////////////////// filtering the user in search box /////////////////////////////

  const filteredUsers = users.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const renderedUsers = filteredUsers.map((item) => {
    return (
      <SingleUser key={item._id} item={item} refreshUsers={refreshUsers} />
    );
  });

  ////////////////////////////// toggle for add user button //////////////////////////////

  const handleClick = () => {
    setButton(!addUserButtonClick);
  };

  ////////////////////////////////// controlled onchange for input element in the form

  const handleNameChange = (e) => {
    if (e.target.name === "name") {
      setNewUser((prevdata) => {
        return {
          ...prevdata,
          name: e.target.value,
        };
      });
    } else if (e.target.name === "email") {
      setNewUser((prevdata) => {
        return {
          ...prevdata,
          email: e.target.value,
        };
      });
    } else if (e.target.name === "password") {
      setNewUser((prevdata) => {
        return {
          ...prevdata,
          password: e.target.value,
        };
      });
    }
  };

  /////////////////////////////// adding new user in the admin side ////////////////////////

  const handleAddUser = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/admin/addUser", newUser)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "User Added Successfully",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        });
      })
      .then(() => {
        refreshUsers();
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          text: "User not Added",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        })
      );
    ///////////////////// setting the controlled state back after the submission ////////////////////
    setNewUser({
      name: "",
      email: "",
      password: "",
    });
    setButton(!addUserButtonClick);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5 m-0">
      <h1 className="text-center mt-3">USERS</h1>
      <div className="col-4">
        <input
          type="text"
          className="form-control mb-5"
          onChange={handleChange}
          value={searchTerm}
          placeholder="Search User"
        />
      </div>
      {addUserButtonClick ? (
        <div className="col-4 shadow rounded p-5 mb-3 ">
          <form
            className="d-flex flex-column align-items-center justify-content-center"
            onSubmit={handleAddUser}
          >
            <input
              placeholder="Name"
              name="name"
              value={newUser.name}
              className="form-control mb-3"
              onChange={handleNameChange}
            />
            <input
              placeholder="Email"
              name="email"
              value={newUser.email}
              className="form-control mb-3"
              onChange={handleNameChange}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={newUser.password}
              className="form-control mb-3"
              onChange={handleNameChange}
            />
            <div className="d-flex">
              <Button className="mx-5" primary>
                Add User
              </Button>
              <Button className="mx-5" danger onClick={handleClick}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="d-flex justify-content-center mb-2">
          <Button onClick={handleClick} secondary>
            Add User
          </Button>
        </div>
      )}
      <div className="shadow p-5 rounded">
        <table>
          <tbody>{users.length>0 ? renderedUsers : <h1>No Users</h1>}</tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
