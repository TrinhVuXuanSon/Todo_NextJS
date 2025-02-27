"use client";

import { useRouter } from "next/navigation";

const DashBoardPage = () => {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-5">Chào mừng đến với DashBoard</h1>
        <button
          onClick={handleNavigateToLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default DashBoardPage;
