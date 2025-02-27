"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Welcome to Todos App</h1>
        {status === "unauthenticated" && (
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}