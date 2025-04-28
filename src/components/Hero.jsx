import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useTransactionStore } from "../store/useTransactionStore";
import DefaultProfile from "../assets/Profile Photo.png";

function Hero() {
  //checkAuth dulu biar authUser bisa diakses
  const { authUser, checkAuth } = useAuthStore();
  const { balance, saldo } = useTransactionStore()
  const [showBalance, setShowBalance] = useState(false)

  useEffect(() => {
    checkAuth();
    saldo();
  }, [saldo]);

  const fullname = authUser.data.first_name + " " + authUser.data.last_name;

  return (
    <>
      <div className="container flex w-6xl mx-auto mt-6">
        {/* Profil */}
        <div className="w-1/2">
          <div className="flex flex-col items-start gap-1.5">
            <img src={authUser.data.profile_image === "https://minio.nutech-integrasi.com/take-home-test/null"
                      ? DefaultProfile
                      : authUser.data.profile_image || DefaultProfile} alt="" />
            <p>Selamat datang,</p>
            <h1 className="text-4xl">{fullname}</h1>
          </div>
        </div>
        {/* Saldo */}
        <div className="relative w-1/2 flex flex-col justify-center items-center mx-auto max-w-2xl">
          <img
            src="src/assets/Background Saldo.png"
            alt=""
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex justify-start items-start text-white">
            <div className="flex flex-col justify-start items-start gap-2 text-center p-5">
              <h1>Saldo anda</h1>
              
              { showBalance ? 
              (<h1 className="text-3xl">Rp {balance.balance}</h1>)
              :
              (<h1 className="text-3xl">Rp •••••••</h1>) }

              {showBalance ? (
                <button onClick={() => setShowBalance(false)} className="text-xs mt-2 mr-2">Tutup Saldo</button>
              )
              : (
                <button onClick={() => setShowBalance(true)} className="text-xs mt-2 mr-2">Lihat Saldo</button>
              )
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
