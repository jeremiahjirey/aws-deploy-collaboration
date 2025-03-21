"use client";

import { NAV_LINKS } from "@/lib/";
import { getCurrentUser } from "@/lib/user_data";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Navbar() {
  const pathname = usePathname();
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setMounted(true);
      const storedToken = Cookies.get("token");
      setToken(storedToken);

      if (storedToken) {
        try {
          const userData = await getCurrentUser();
          setData(userData.data.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    }

    fetchData();
  }, []);

  console.log(data);

  if (!mounted) return null;

  return (
    <nav className="flex justify-center w-full shadow-sm fixed z-50 bg-white">
      <div className="flex justify-between max-w-[1440px] items-center px-3 md:px-16 w-full h-20">
        <Link href="/" className="font-semibold text-3xl text-[#3b893e]">
          Melesat.
        </Link>
        <div className="hidden sm:flex gap-10">
          {NAV_LINKS.map((nav) => (
            <Link
              href={nav.href}
              key={nav.key}
              className={`transition-all hover:text-[#3b893e] ${pathname === nav.href ? "text-[#3b893e] font-semibold" : ""}`}
            >
              {nav.label}
            </Link>
          ))}
        </div>
        <div className="hidden sm:flex gap-4">
          {token && data ? (
            <Link href="/dashboard" className="flex flex-col items-end">
              <h2 className="text-sm">{data.name ?? "User"}</h2>
              <p className="text-xs text-gray-500">{data.email ?? "No Email"}</p>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="group flex items-center transition-all gap-3 border-[1.5px] border-[#3b893e] rounded-full px-6 py-2 bg-[#3b893e] hover:bg-white hover:scale-105"
              >
                <p className="text-white group-hover:text-[#3b893e]">Login</p>
              </Link>
              <Link
                href="/register"
                className="flex transition-all items-center gap-3 group border-[1.5px] border-[#3b893e] rounded-full px-6 py-2 hover:bg-[#3b893e] hover:scale-105"
              >
                <p className="text-[#3b893e] group-hover:text-white">Sign Up</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
