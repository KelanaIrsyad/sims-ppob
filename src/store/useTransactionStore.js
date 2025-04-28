import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";

export const useTransactionStore = create((set, get) => ({
  balance: 0,

  saldo: async () => {
    try {
      const res = await axiosInstance.get("/balance");
      set({ balance: res.data.data });
      console.log(res.data.data);
    } catch (error) {
      console.error("Error ketika ambil saldo", error);
    }
  },

  topUp: async (amount) => {
    try {
      await axiosInstance.post("/topup", { top_up_amount: amount });
      set((state) => ({
        balance: state.balance + amount,
      }));
    } catch (error) {
      console.error("Error saat melakukan top up", error);
    }
  },

  pay: async (selectedService) => {
    const { balance } = get();
    const amount = selectedService.service_tariff;

    if (balance < amount) {
      console.error("Saldo tidak cukup untuk melakukan pembayaran.");
      return { message: "Saldo tidak mencukupi." };
    }

    try {
      const invoiceNumber = `INV-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;

      const payload = {
        invoice_number: invoiceNumber,
        service_code: selectedService.service_code,
        service_name: selectedService.service_name,
        transaction_type: "PAYMENT",
        total_amount: amount,
      };

      const res = await axiosInstance.post("/transaction", payload);

      if (res.data.message === "Transaksi berhasil") {
        set((state) => ({
          balance: state.balance - amount,
        }));

        console.log("Transaksi berhasil", res.data);
        return { data: res.data };
      } else {
        console.error("Transaksi gagal", res.data.message);
        return { message: res.data.message };
      }
    } catch (error) {
      console.error("Error saat transaksi pembayaran", error);
      return { message: "Terjadi kesalahan server." };
    }
  },
  
}));
