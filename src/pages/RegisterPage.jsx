import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (formData.password <= 0)
      return toast.error("Paramater password tidak boleh kosong");
    if (konfirmasiPassword <= 0)
      return toast.error("Paramater konfirmasi tidak boleh kosong");
    if (formData.password !== konfirmasiPassword)
      return toast.error("Password harus sama");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signup(formData);
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
      });
      setKonfirmasiPassword("");
    }
  };

  return (
    <>
      <div className="h-screen flex ">
        {/* Kiri bagian form */}
        <div className="w-1/2 flex flex-col justify-center items-center mx-auto">
          <div className="flex justify-center items-center">
            <img src="/src/assets/Logo.png" alt="logo" className="mx-2" />
            <h1 className="text-2xl font-bold">SIMS PPBO</h1>
          </div>
          <div>
            <h2 className="flex justify-center items-center text-3xl p-4">
              Lengkapi data untuk membuat akun
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center border border-gray-400 rounded-lg h-12 px-4">
                  <MdOutlineAlternateEmail className="text-gray-400 mr-2 mt-1" />
                  <input
                    className="outline-none w-full"
                    type="email"
                    placeholder="masukan email anda"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center border border-gray-400 rounded-lg h-12 px-4">
                  <MdOutlinePerson className="text-gray-400 mr-2 mt-1" />
                  <input
                    className="outline-none w-full"
                    type="text"
                    placeholder="nama depan"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center border border-gray-400 rounded-lg h-12 px-4">
                  <MdOutlinePerson className="text-gray-400 mr-2 mt-1" />
                  <input
                    className="outline-none w-full"
                    type="text"
                    placeholder="nama belakang"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                  />
                </div>
                <div className="relative flex items-center border border-gray-400 rounded-lg h-12 px-4">
                  <MdLockOutline className="text-gray-400 mr-2 mt-1" />
                  <input
                    className="outline-none w-full"
                    type={showPassword ? "text" : "password"}
                    placeholder="buat password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <FiEye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
                <div className="relative flex items-center border border-gray-400 rounded-lg h-12 px-4">
                  <MdLockOutline className="text-gray-400 mr-2 mt-1" />
                  <input
                    className="outline-none w-full"
                    type={showKonfirmasi ? "text" : "password"}
                    placeholder="konfirmasi password"
                    value={formData.konfirmasiPassword}
                    onChange={(e) => setKonfirmasiPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                  >
                    {showKonfirmasi ? (
                      <FiEyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <FiEye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className="flex justify-center w-xl bg-red-600 my-5 rounded-md p-2 mt-10 text-white"
              >
                Registrasi
              </button>
            </form>
            <div className="flex justify-center items-center">
              <p className="text-gray-500">
                sudah punya akun? login{" "}
                <Link to={"/login"} className="text-red-600">
                  di sini
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Kanan bagian gambar */}
        <div className="w-1/2">
          <img src="/src/assets/Illustrasi Login.png" alt="konten" />
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
