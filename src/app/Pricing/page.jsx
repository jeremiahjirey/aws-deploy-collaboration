import Link from "next/link";
import React from "react";

function Pricing() {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl sm:text-4xl font-bold">This Is Pricing Page</h2>
      <div className="flex-col md:flex-row flex gap-3 mt-3">
        <Link className=" text-blue-600 underline" href="/About">
          👈 Back to about Page
        </Link>
        <p className="hidden md:block">|</p>
        <Link className=" text-blue-600 underline" href="/Contact">
          Go to contact Page 👉
        </Link>
      </div>
    </div>
  );
}

export default Pricing;
