"use client";

import { useRouter } from "next/navigation";
import DashBoardPage from "@/components/todo/DashBoardPage";

const DashBoardContainer = () => {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  return <DashBoardPage onLogin={handleNavigateToLogin} />;
};

export default DashBoardContainer;