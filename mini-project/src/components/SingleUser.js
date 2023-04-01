import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Swal from "sweetalert2";

function SingleUser({ item, refreshUsers }) {
  const [name, setName] = useState(item.name);
  const [editButtonClick, setEdit] = useState(false);
  const inputElm = useRef();

  ////////////////////// checks the listener if its clicked outside the div////////////////////

  useEffect(() => {
    const handleOuterClick = (e) => {
      if (!inputElm.current.contains(e.target)) {
        setEdit(false);
        setName(item.name);
      }
    };
    document.addEventListener("click", handleOuterClick, true);
    return () => {
      document.removeEventListener("click", handleOuterClick);
    };
  }, []);

  ///////////////////////////////// toggling the edit button click event ////////////////////

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!editButtonClick);
    setName(item.name);
  };

  /////////////////////////////////// delete User /////////////////////////////
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8000/admin/deleteuser/${item._id}`)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "User Deleted Successfully",
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
          text: "User not deleted",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        })
      );
  };

  //////////////////////////////// controlled prop ////////////////////
  const handleChange = (e) => {
    setName(e.target.value);
  };

  ///////////////////////////edit user/ /////////////////////

  const handleConfirm = (e) => {
    setEdit(!editButtonClick);
    const data = {
      name,
      id: item._id,
    };
    axios
      .post(`http://localhost:8000/admin/edituser`, data)
      .then((res) => {
        refreshUsers();
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          text: "User not Edited",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        })
      );
  };

  
  return (
    <tr ref={inputElm}>
      <td>
        {editButtonClick ? (
          <input
            className="form-control"
            value={name}
            onChange={handleChange}
          />
        ) : (
          <span className="mx-3">{item.name}</span>
        )}
      </td>
      <td>
        <span className="mx-3">{item.email}</span>
      </td>
      <td>
        {editButtonClick ? (
          <div className="d-flex">
            <button onClick={handleConfirm}>Confirm</button>
            <Button onClick={handleEdit} className="mx-3" primary>
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={handleEdit} className="mx-3" primary>
            EDIT
          </Button>
        )}
      </td>
      <td>
        <Button onClick={handleDelete} className="mx-3" danger>
          DELETE
        </Button>
      </td>
    </tr>
  );
}

export default SingleUser;
