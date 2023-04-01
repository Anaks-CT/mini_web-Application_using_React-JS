import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addProfileImage } from "../../store/slices/users";
import Swal from "sweetalert2";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  const [file, setFile] = useState();
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  /////////////////////////////// adding the data to cloudinary//////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "amarnath123");
    data.append("cloud_name", "dxnisjppy");

    /////////////////////////////// fetching the data from cloudinary /////////////////////

    await fetch("https://api.cloudinary.com/v1_1/dxnisjppy/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(addProfileImage(data.secure_url));

        ////////////////////// setttin the data of image in the local storage/////////////////

        localStorage.setItem("userProfileUrl", JSON.stringify(data.secure_url));
        
        ////////////////////// adding image to the backend with jwt token intact ///////////

        axios
          .post(
            "http://127.0.0.1:8000/user/profile/addImage",
            {
              url: data.secure_url,
              email: user.email,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          .catch((err) =>
            Swal.fire({
              icon: "error",
              text: "image not added",
              showConfirmButton: false,
              timer: 1200,
              width: "300px",
            })
          );
      })
      .catch((err) =>
        Swal.fire({
          icon: "error",
          text: "image not fetched",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        })
      );
  };

  
  return (
    <div>
      <NavBar />
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
        <div className="col-5  p-5 shadow border">
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <h2 className="mb-3">Profile</h2>
            <div className="p-0 col-6 border shadow">
              <img
                src={user.image}
                alt=""
                style={{
                  objectFit: "contain",
                  width: "-webkit-fill-available",
                }}
              />
            </div>
            {user.image ? (
              ""
            ) : (
              <>
                <label htmlFor="addPic">
                  <input
                    required
                    name="addPic"
                    type="file"
                    className="form-control my-2"
                    placeholder="Password"
                    alt=""
                    accept=".jpg"
                    onChange={handleChange}
                  />
                </label>

                <Button rounded primary>
                  Add Profile Pic
                </Button>
              </>
            )}
          </form>
          <div className="mt-5">
            <h5>Name : {user.name}</h5>
            <h5>Email : {user.email} </h5>
            <h5>Password : {user.password} </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
