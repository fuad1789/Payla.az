"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("../components/NavBar"), { ssr: false });

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="section">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="heading-2 mb-2">Xoş gəlmisiniz</h1>
              <p className="text-body text-gray-600">
                Davam etmək üçün hesabınıza daxil olun
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  E-poçt ünvanı
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`input ${error ? "input-error" : ""}`}
                  placeholder="E-poçt ünvanınızı daxil edin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Şifrə
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`input ${error ? "input-error" : ""}`}
                  placeholder="Şifrənizi daxil edin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Daxil olunur...
                  </div>
                ) : (
                  "Daxil ol"
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-body text-gray-600">
                Hesabınız yoxdur?{" "}
                <Link
                  href="/register"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Qeydiyyatdan keçin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
