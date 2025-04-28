import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { MdOutlineMoney } from "react-icons/md";
import { useTransactionStore } from "../store/useTransactionStore";
import Swal from "sweetalert2";

function TopUpPage() {
  const { saldo, topUp } = useTransactionStore();
  const [amount, setAmount] = useState();

  useEffect(() => {
    saldo();
  }, [saldo]);

  const handleTopup = async () => {
    if (amount >= 10000 && amount <= 1000000) {
      const result = await Swal.fire({
        title: "Apakah kamu yakin?",
        text: `Kamu akan melakukan top-up sebesar Rp${amount.toLocaleString()}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, lanjutkan Top Up!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        try {
          await topUp(amount);
          await saldo();
          setAmount("");

          // Menampilkan alert sukses
          Swal.fire({
            title: "Sukses!",
            text: `Top-up sebesar Rp${amount.toLocaleString()} berhasil dilakukan.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.log(error)
          Swal.fire({
            title: "Gagal!",
            text: "Terjadi kesalahan, coba lagi nanti.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } 
    }
  };

  const handleQuickSelect = (value) => {
    setAmount(value);
  };

  return (
    <>
      <Navbar />
      <Hero />

      <div className="container mt-5 w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* kiri */}
          <div className="w-full">
            <h1>Silahkan masukan</h1>
            <h1>Nominal Top Up</h1>
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center border border-gray-400 rounded-lg h-10 px-4">
                  <MdOutlineMoney className="text-gray-400 mr-2 mt-1" />
                  <input
                    className="outline-none w-full"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Masukkan jumlah topup"
                  />
                </div>
                <button
                  onClick={handleTopup}
                  disabled={amount < 0}
                  className={`w-full bg-blue-600 rounded-md p-2 mt-3 ${
                    amount < 9999
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  Topup
                </button>
              </div>

              {/* Kanan */}
              <div className="w-2/4 grid grid-cols-3 gap-2 ml-4">
                {[10000, 20000, 50000, 100000, 250000, 500000].map(
                  (nominal) => (
                    <button
                      key={nominal}
                      onClick={() => handleQuickSelect(nominal)}
                      className="border border-gray-300 rounded-md p-2 hover:bg-gray-100"
                    >
                      Rp{nominal.toLocaleString("id-ID")}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopUpPage;
