import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { MdOutlineAlternateEmail, MdOutlinePerson } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { useAuthStore } from "../store/useAuthStore";
import DefaultProfile from "../assets/Profile Photo.png";

function ProfilePage() {
  const {
    authUser,checkAuth,updateProfile,updateIMGProfile,isUpdatingProfile,logout,setSelectedImage,selectedImage,} = useAuthStore();
  const fileInputRef = useRef(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    if (authUser?.data) {
      setFormData({
        email: authUser.data.email || "",
        first_name: authUser.data.first_name || "",
        last_name: authUser.data.last_name || "",
      });
      setPreviewImage(
        authUser.data.profile_image === "https://minio.nutech-integrasi.com/take-home-test/null"
          ? DefaultProfile
          : authUser.data.profile_image || DefaultProfile
      );
      setSelectedImage(null);
    }
  }, [authUser, setSelectedImage]);

  useEffect(() => {
    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
    } else if (authUser?.data?.profile_image && authUser.data.profile_image !== "https://minio.nutech-integrasi.com/take-home-test/null") {
      setPreviewImage(authUser.data.profile_image);
    } else {
      setPreviewImage(DefaultProfile);
    }
  }, [selectedImage, authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //untuk ambil file dari lokal
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const profileData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
      };
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        const response = await updateIMGProfile(imageFormData);
        if (response?.data?.profile_image && response.data.profile_image !== "https://minio.nutech-integrasi.com/take-home-test/null") {
          setPreviewImage(response.data.profile_image);
        }
        setSelectedImage(null);
        checkAuth();
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    } else {
      console.warn("Tidak ada gambar yang dipilih untuk diunggah.");
    }
  };

  const handleSaveProfile = async () => {
    await Promise.all([
      selectedImage && handleImageUpload(),
      handleUpdateProfile(),
    ]);
  };

  return (
    <>
      <Navbar />
      <div className="container flex flex-col w-6xl mx-auto justify-center items-center mt-5">
        <div className="relative">
          <img
            src={previewImage}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DefaultProfile;
            }}
          />
          <label
            className={
              isEditing
                ? "absolute bottom-0 right-0 p-1 border rounded-xl cursor-pointer bg-gray-200"
                : "hidden"
            }
          >
            <HiPencil />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUpdatingProfile}
              ref={fileInputRef}
            />
          </label>
        </div>
        <h1 className="text-2xl font-bold mt-2">
          {authUser?.data?.first_name + " " + authUser?.data?.last_name}
        </h1>

        <div className="w-xl mt-4">
          <form>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <div className="flex items-center border border-gray-400 rounded-lg h-10 px-4 bg-gray-100">
                <MdOutlineAlternateEmail className="text-gray-400 mr-2 mt-1" />
                <input
                  className="outline-none bg-transparent w-full"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <label>Nama Depan</label>
              <div className="flex items-center border border-gray-400 rounded-lg h-10 px-4">
                <MdOutlinePerson className="text-gray-400 mr-2 mt-1" />
                <input
                  className="outline-none w-full"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
              <label>Nama Belakang</label>
              <div className="flex items-center border border-gray-400 rounded-lg h-10 px-4">
                <MdOutlinePerson className="text-gray-400 mr-2 mt-1" />
                <input
                  className="outline-none w-full"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {isEditing ? (
              <button
                type="button"
                onClick={handleSaveProfile}
                className="bg-red-600 w-xl my-4 p-2 text-white rounded-md disabled:bg-red-400"
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile ? "Menyimpan..." : "Simpan"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-red-600 w-xl my-4 p-2 text-white rounded-md"
              >
                Edit Profil
              </button>
            )}
          </form>
          {isEditing ? (
            <button
            onClick={() => setIsEditing(false)}
            className="border border-red-600 w-xl my-2 p-2 text-red-600 rounded-md"
          >
            Batalkan
          </button>
          ) : (
            <button
            onClick={() => logout()}
            className="border border-red-600 w-xl my-2 p-2 text-red-600 rounded-md"
          >
            Logout
          </button>
          )
        }
          
        </div>
      </div>
    </>
  );
}

export default ProfilePage;