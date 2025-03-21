import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-screen min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl sm:text-4xl font-bold">This Is Home Page</h2>
        <Link className="mt-3 text-blue-600 underline" href="/About">
          Go to About Page 👉
        </Link>
      </div>
    </>
  );
}

export default App;
