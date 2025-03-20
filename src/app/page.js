import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold">This Is Home Page</h2>
      <Link className="mt-3 text-blue-600 underline" href="/about">
        Go to About Page 👉
      </Link>
    </div>
  );
}

export default Home;
