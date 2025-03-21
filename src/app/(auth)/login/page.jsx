"use client";
import { Login } from "@/lib/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    const result = await Login(email, password);

    if (result.success) {
      router.push("/");
      router.refresh();
    } else {
      setErrors(result.error);
      setGeneralError("Email or Password is Incorrect.");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your <span className="text-[#348c42] underline"> account</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">Enter your credentials to access your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            {/* Input Email */}
            <div>
              <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-input"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#348c42] sm:text-sm`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
            </div>

            {/* Input Password */}
            <div>
              <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password-input"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:border-[#348c42] sm:text-sm`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
            </div>
          </div>

          {/* Pesan Error Umum */}
          {generalError && <p className="text-red-500 text-sm text-center">{generalError}</p>}

          {/* Tombol Submit */}
          <div className="flex flex-col gap-4 items-center">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#348c42] hover:bg-[#62a66f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#348c42] transition-colors duration-200"
            >
              Sign in
            </button>
            <Link href={`/register`} className="text-[#348c42] text-sm underline">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
