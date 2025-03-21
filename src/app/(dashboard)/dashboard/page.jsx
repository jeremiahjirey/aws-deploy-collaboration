"use client"; // Jika menggunakan App Router

import { Logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Dashboard() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Logout();

    if (result.success) {
      router.push("/");
      router.refresh();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleSubmit}
        className="group flex items-center transition-all gap-3 border-[1.5px] border-[#3b893e] rounded-full px-6 py-2 bg-[#3b893e] hover:bg-white hover:scale-105"
      >
        <p className="text-white group-hover:text-[#3b893e]">Logout</p>
      </button>

      {/* Menampilkan error jika ada */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Dashboard;
