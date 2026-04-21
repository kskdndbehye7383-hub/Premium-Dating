import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { apiClient } from "../lib/apiClient";

export default function PremiumRoute() {
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const email = localStorage.getItem("spark_user_email");

  useEffect(() => {
    if (!email) {
      setIsPremium(false);
      return;
    }

    let isMounted = true;

    apiClient.getUserStatus(email)
      .then(data => {
        if (isMounted) setIsPremium(data.isPremium);
      })
      .catch((err) => {
        console.error("Premium validation failed", err);
        if (isMounted) setIsPremium(false);
      });

    return () => { isMounted = false; };
  }, [email]);

  // Loading state while verifying strict real-time backend status
  if (isPremium === null) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50/50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-200 border-t-rose-500 mb-4"></div>
        <p className="text-gray-500 font-medium">Verifying membership status...</p>
      </div>
    );
  }

  // If strict backend check says non-premium, redirect back to payment
  if (!isPremium) {
    return <Navigate to="/membership" replace />;
  }

  return <Outlet />;
}
