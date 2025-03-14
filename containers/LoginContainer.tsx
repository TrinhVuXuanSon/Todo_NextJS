// "use client";

// import { useState } from "react";
// import { signIn, getSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "@/redux/authSlice";
// import LoginForm from "@/components/todo/LoginForm";

// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const result = await signIn("credentials", {
//         username,
//         password,
//         redirect: false,
//       });

//       if (result?.error) {
//         setError("Thông tin không đúng");
//         return;
//       }

//       if (result?.ok) {
//         const session = await getSession();

//         if (session?.user) {
//           const user = {
//             name: session.user.name || "",
//           };

//           dispatch(
//             setCredentials({
//               user,
//               token: session.user.name || "",
//             })
//           );
//         }

//         router.push("/home");
//       }
//     } catch {
//       console.log("Lỗi đăng nhập");
//     }
//   };

//   return (
//     <LoginForm
//       username={username}
//       password={password}
//       error={error}
//       onUsernameChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//         setUsername(e.target.value)
//       }
//       onPasswordChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//         setPassword(e.target.value)
//       }
//       onSubmit={handleSubmit}
//     />
//   );
// }

// export default LoginPage;
