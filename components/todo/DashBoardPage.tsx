"use client";

import { DashBoardProps } from "@/types/todo";

const DashBoardPage = ({ onLogin }: DashBoardProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Vui lòng đăng nhập
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Bạn cần đăng nhập để truy cập vào home.
        </p>
        <div className="flex justify-center">
          <button
            onClick={onLogin}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;