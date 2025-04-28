import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/Axios";
import { useTransactionStore } from "../store/useTransactionStore";
import Swal from "sweetalert2";

function Service() {
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceClick, setServiceClick] = useState(false);

  const { pay, saldo } = useTransactionStore();

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await axiosInstance.get("/services");
        const data = response.data.data;
        setService(data);
      } catch (error) {
        console.error("Gagal fetch service", error);
      }
    }
    fetchService();
  }, []);

  const handleServiceClick = (item) => {
    setSelectedService(item);
    setServiceClick(true);
  };

  const handleButtonClick = async () => {
    if (selectedService) {
      const result = await Swal.fire({
        title: "Apakah kamu yakin?",
        text: `Beli ${
          selectedService.service_name
        } senilai Rp${selectedService.service_tariff.toLocaleString()}`,
        imageUrl: "src/assets/logo.png", // Pastikan path ke logo sudah benar
        imageWidth: 100,
        imageHeight: 100,
        showCancelButton: true,
        confirmButtonText: "Bayar!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        try {
          if (selectedService.service_tariff <= saldo) {
            await pay(selectedService);
            setSelectedService(null);
            setServiceClick(false);
            await saldo();
            Swal.fire({
              title: "Sukses!",
              text: `Pembayaran ${selectedService.service_name} sebesar Rp${selectedService.service_tariff.toLocaleString()} berhasil!`,
              icon: "success",
              confirmButtonText: "Kembali Ke Beranda",
            });
          } else {
            Swal.fire({
              title: "Gagal!",
              text: "Saldo tidak cukup untuk melakukan pembayaran.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        } catch (error) {
          console.error(error)
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

  return (
    <div className="w-6xl mx-auto">
      {!selectedService && !serviceClick ? (
        <div className="flex justify-center w-6xl mx-auto items-center gap-6 mt-10">
          {service.map((item) => (
            <div
              key={item.service_code}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleServiceClick(item)}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gray-100">
                <img
                  src={item.service_icon}
                  alt={item.service_name}
                  className="w-8 h-8"
                />
              </div>
              <span className="text-center text-xs mt-2">
                {item.service_name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        selectedService &&
        serviceClick && (
          <div className="flex items-center justify-start mt-10 w-full">
            <div className="flex flex-col justify-start w-full">
              <h1>PemBayaran</h1>
              <div className="flex items-center gap-4 mb-10 mt-3">
                <img
                  src={selectedService.service_icon}
                  alt={selectedService.service_name}
                  className="w-8 h-8"
                />
                <h1 className="text-xl">{selectedService.service_name}</h1>
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-blue-500"
                  value={selectedService.service_tariff}
                  readOnly
                />
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleButtonClick}
                >
                  Bayar
                </button>
                <button
                  className="mt-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setSelectedService(null);
                    setServiceClick(false);
                  }}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Service;
