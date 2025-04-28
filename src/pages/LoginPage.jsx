import React, { useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FiEye, FiEyeOff  } from "react-icons/fi";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn, checkAuth } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
    checkAuth()
  };

  return (
    <>
      <div className="h-screen flex ">
        {/* Kiri bagian form */}
        <div className="w-1/2 flex flex-col justify-center items-center max-w-md mx-auto">
          <div className="flex justify-center items-center">
            <img src="/src/assets/Logo.png" alt="logo" className="mx-2" />
            <h1 className="text-2xl font-bold">SIMS PPBO</h1>
          </div>
          <div>
            <h2 className="flex justify-center items-center text-3xl p-4">
              Masuk atau buat akun untuk memulai
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
                <div className="relative flex items-center border border-gray-400 rounded-lg h-12 px-4">
                  <MdLockOutline className="text-gray-400 mr-2 mt-1" />
                  <input
                    className="outline-none w-full"
                    type={showPassword ? "text" : "password"}
                    placeholder="masukan password anda"
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
              </div>

              <button
              type="submit"
              disabled={isLoggingIn} 
              className="flex justify-center w-xl bg-red-600 my-5 rounded-md p-2 mt-10 text-white">
                Masuk
              </button>
            </form>
            <div className="flex justify-center items-center">
              <p className="text-gray-500">
                belum punya akun? registrasi{" "}
                <Link to={"/registration"} className="text-red-600">
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

export default LoginPage;
