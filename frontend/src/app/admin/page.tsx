"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api_services from "@/lib/api";

interface AdminLoginForm {
  username: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: AdminLoginForm) {
    try {
      setIsLoading(true);

      const response = await api_services.adminLogin(
        data.username,
        data.password
      );

      if (response.token) {
        // Store token in localStorage
        localStorage.setItem("admin_token", response.token);

        // Redirect to admin dashboard
        toast.success("Admin girişi uğurlu oldu");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        "Admin girişi uğursuz oldu. Zəhmət olmasa yenidən cəhd edin."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Admin Girişi</h1>
          <p className="text-muted-foreground">
            Elanları idarə etmək üçün admin panelinə daxil olun.
          </p>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                İstifadəçi adı
              </label>
              <Input
                id="username"
                placeholder="İstifadəçi adınızı daxil edin"
                {...register("username", {
                  required: "İstifadəçi adı tələb olunur",
                })}
                disabled={isLoading}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Şifrə
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifrənizi daxil edin"
                  {...register("password", { required: "Şifrə tələb olunur" })}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Giriş edilir..." : "Giriş et"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
