import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { axiosInstance } from "../lib/Axios";
import { formatToIndonesianTime } from "../lib/FormatTime";
import { formatRupiah } from "../lib/FormatRupiah";

function Transaction() {
  const [history, setHistory] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const fetchHistory = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/transaction/history?offset=${offset}&limit=${limit}`
      );
      const responseData = res.data;

      if (responseData.status === 0 && responseData.data.records.length > 0) {
        setHistory((prevHistory) => [
          ...prevHistory,
          ...responseData.data.records,
        ]);
        setOffset((prevOffset) => prevOffset + limit);
        if (responseData.data.records.length < limit) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleShowMore = () => {
    fetchHistory();
  };

  return (
    <>
      <Navbar />
      <Hero />
      <div className="flex flex-col mt-10 w-6xl mx-auto">
      <h1 className="text-2xl font-bold my-2">Semua Transaksi</h1>
        {history.map((item, index) => (
          <div key={index} className="flex justify-between items-center border border-gray-300 rounded-md mt-2 p-4">
            <div>
              {item.transaction_type === "PAYMENT" ? (
                <p className="text-red-600 my-2 font-bold text-xl">{"-" + formatRupiah(item.total_amount)}</p>
              ) : (
                <p className="text-green-600 my-2 font-bold text-xl">{"+" + formatRupiah(item.total_amount)}</p>
              )}
              
              <p className="my-2">{formatToIndonesianTime(item.created_on)}</p>
            </div>
            <div>
              <p className="my-2">{item.description}</p>
            </div>
          </div>
        ))}
        {loading && <p>Memuat lebih banyak data...</p>}
        {hasMore && <button onClick={handleShowMore}>Show More</button>}
        {!hasMore && history.length > 0 && (
          <p className="flex justify-center my-5">Tidak ada lagi riwayat transaksi.</p>
        )}
        {history.length === 0 && !loading && <p className="flex justify-center">Riwayat transaksi kosong.</p>}
      </div>
    </>
  );
}

export default Transaction;
