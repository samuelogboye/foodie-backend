import React, { useState, useEffect } from "react";
import user from "./assets/user.svg";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import baseUrl from "./base";

function Profile() {
  const { handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState({});
  // Retrieve userData from local storage
  const accessToken = localStorage.getItem("accessToken");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and confirm new password match
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setErrorMessage("New password and confirm password do not match");
      return;
    }

    // If passwords match, proceed with API call
    try {
      const response = await fetch(baseUrl + "/auth/change-password", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setErrorMessage("Password changed successfully");
        console.log("Password changed successfully");
        // Triger logout
        handleLogout();
      } else {
        // Handle API error responses
        const responseData = await response.json();
        setErrorMessage(responseData.message || "Password change failed");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      // Handle other potential errors here
      setErrorMessage("Password change failed");
    }
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update state based on the input field's name
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "houseAddress":
        setHouseAddress(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("house_address", houseAddress);
    formData.append("phone_number", phoneNumber);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      const response = await fetch(
        baseUrl + "/auth/profile",
        //"http://0.0.0.0:5000/api/v1/auth/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        toast.success("Profile updated successfully");
        // Handle success, update UI or show a success message
        setErrorMessage("Profile updated successfully");
        console.log("Profile updated successfully:", updatedUserData);
      } else {
        setErrorMessage("error", response.error);
        // Handle error response
        console.log(response);
        console.error("Failed to update profile:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(baseUrl + "/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setUserData(responseData);
          setFirstName(responseData.first_name);
          setLastName(responseData.last_name);
          setHouseAddress(responseData.house_address);
          setPhoneNumber(responseData.phone_number);
        } else {
          // Handle failed response here
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle other potential errors here
      }
    };

    fetchProfileData(); // Fetch user data when the component mounts
  }, [accessToken]);

  function openTab(tabName) {
    setActiveTab(tabName);
  }

  return (
    <div className="container h-screen mx-auto mt-8 flex flex-col font-mono">
      <h1 className="text-brandColor text-2xl mb-8 ml-5">Profile</h1>
      <div className="flex gap-5">
        <div className="flex flex-col justify-center items-center rounded-xl w-1/3 border-2 max-h-60">
          <img src={userData.profile_picture} alt="user" width={120} />
          <p className="mt-4 mb-4">
            {userData.first_name} {userData.last_name}
          </p>
        </div>
        <div className="w-2/3 border-2 rounded-xl">
          <div className="flex justify-around p-3 items-center border-b-2 w-11/12 mx-auto">
            <div
              className={`tab-button p-3 hover:bg-brandColor cursor-pointer hover:text-white ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => openTab("overview")}
            >
              Overview
            </div>
            <div
              className={`tab-button p-3 hover:bg-brandColor cursor-pointer hover:text-white ${
                activeTab === "editProfile" ? "active" : ""
              }`}
              onClick={() => openTab("editProfile")}
            >
              Edit Profile
            </div>
            <div
              className={`tab-button p-3 hover:bg-brandColor cursor-pointer hover:text-white ${
                activeTab === "changePassword" ? "active" : ""
              }`}
              onClick={() => openTab("changePassword")}
            >
              Change Password
            </div>
          </div>
          {activeTab === "overview" && (
            <div
              id="overview"
              className={`tab-content ${
                activeTab === "overview" ? "active" : ""
              } w-11/12 mx-auto`}
            >
              {/* Content for Overview tab */}
              <h3 className="mt-6 mb-6 font-bold">Profile Details</h3>
              <div className="flex gap-12">
                <div className="flex flex-col">
                  <div className="text-brandColor font-bold mb-4">
                    Full Name
                  </div>
                  <div className="text-brandColor font-bold mb-4">
                    Phone Number
                  </div>
                  <div className="text-brandColor font-bold mb-4">
                    Email Address
                  </div>
                  <div className="text-brandColor font-bold mb-4">
                    Registration Date
                  </div>
                  <div className="text-brandColor font-bold mb-4">
                    Number Of Order
                  </div>
                  <div className="text-brandColor font-bold mb-4">
                    Last Login
                  </div>
                  <div className="text-brandColor font-bold mb-4">Address</div>
                </div>
                <div className="flex flex-col">
                  <div className="mb-4">
                    {userData.first_name} {userData.last_name}
                  </div>
                  <div className="mb-4">{userData.phone_number}</div>
                  <div className="mb-4">{userData.email}</div>
                  <div className="mb-4">{userData.createdAt}</div>
                  <div className="mb-4">{userData.order_count}</div>
                  <div className="mb-4">{userData.last_login}</div>
                  <div className="mb-4">{userData.house_address}</div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "editProfile" && (
            <div
              id="editProfile"
              className={`tab-content ${
                activeTab === "editProfile" ? "active" : ""
              } w-11/12 mx-auto`}
            >
              {/* Content for Edit Profile tab */}
              <h3 className="mt-6 mb-6 font-bold">Edit Profile</h3>
              <div className="flex gap-12">
                <div className="flex flex-col">
                  <div className="text-brandColor font-bold mb-4">
                    First Name
                  </div>
                  <div className="text-brandColor font-bold mb-4">
                    Last Name
                  </div>
                  <div className="text-brandColor font-bold mb-4">
                    House Address
                  </div>
                  <div className="text-brandColor font-bold mb-4">
                    Phone Number
                  </div>
                  <div className="text-brandColor font-bold mb-4">
                    Profile Picture
                  </div>
                </div>
                <div className="flex flex-col">
                  <form onSubmit={handleProfileUpdate}>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="House Address"
                        name="houseAddress"
                        value={houseAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    {errorMessage && (
                      <p className="text-red-500">{errorMessage}</p>
                    )}
                    <button
                      type="submit"
                      className="bg-brandColor text-white px-4 py-2 rounded-md hover:bg-opacity-80"
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          {activeTab === "changePassword" && (
            <div
              id="changePassword"
              className={`tab-content ${
                activeTab === "changePassword" ? "active" : ""
              } w-11/12 mx-auto`}
            >
              {/* Content for Change Password tab */}
              <h3 className="mt-6 mb-6 font-bold">Change Password</h3>
              <div className="flex gap-12">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 flex flex-row gap-12 items-center">
                    <label
                      htmlFor="currentPassword"
                      className="text-brandColor font-bold"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="mb-4 flex flex-row gap-20 items-center">
                    <label
                      htmlFor="newPassword"
                      className="text-brandColor font-bold"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="mb-4 flex flex-row gap-3 items-center">
                    <label
                      htmlFor="confirmNewPassword"
                      className="text-brandColor font-bold"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={passwordData.confirmNewPassword}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded-md p-2"
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  <button
                    type="submit"
                    className="bg-brandColor text-white px-4 py-2 rounded-md hover:bg-opacity-80"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
