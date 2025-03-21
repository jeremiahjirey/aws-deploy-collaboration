"use client";

import { Register } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [matchPass, setMatchPass] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading

  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setMatchPass("");
    setLoading(true); // Mulai loading

    if (password !== confirmPassword) {
      setMatchPass("Password and Confirm Password do not match");
      setLoading(false); // Matikan loading jika error
      return;
    }

    const result = await Register(name, email, password);

    if (result.success) {
      router.push(`/login`);
      router.refresh();
    } else {
      setErrors(result.error);
    }

    setLoading(false); // Matikan loading setelah selesai
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-3 md:p-6">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">
          Create Your <span className="text-[#348c42] underline">Account</span>
        </h2>
        <p className="text-center text-sm text-gray-600 flex gap-2 justify-center">
          Already have an account?
          <Link href={`/login`} className="text-[#348c42] underline">
            Sign in
          </Link>
        </p>
        <form onSubmit={handleRegister}>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name-input" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name-input"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md outline-none focus:border-[#348c42] sm:text-sm`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
            </div>
            <div>
              <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">
                Email
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
                } rounded-md outline-none focus:border-[#348c42] sm:text-sm`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
            </div>
            <div>
              <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex gap-3">
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md outline-none focus:border-[#348c42] sm:text-sm`}
                  placeholder="Enter your password"
                />
                <input
                  id="confirm-password-input"
                  name="confirm_pass"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md outline-none focus:border-[#348c42] sm:text-sm`}
                  placeholder="Confirm password"
                />
              </div>
              {(errors.password || matchPass) && <p className="text-red-500 text-xs mt-1">{errors.password ? errors.password[0] : matchPass}</p>}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded-md mt-6 transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#348c42] text-white hover:bg-[#62a66f]"
            }`}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
