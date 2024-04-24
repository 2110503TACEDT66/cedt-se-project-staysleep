'use client'
import { signIn, useSession } from "next-auth/react";
import { Alert, Button, CircularProgress, FormControl, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const SignInPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  if (session.data?.user) {
    router.push("/");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    setPending(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const response = await signIn("signin", {
      email: data.get("Email") as string,
      password: data.get("Password") as string,
      redirect: true,
      callbackUrl: "/",
    });

    setPending(false);
    if (response?.ok) {
      // router.push("/");
      // router.refresh();
    } else {
      setError(response?.error + " " + response?.status);
    }
  };

  return (
    <main className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <Image src={"/img/bg.png"} alt="cover" fill priority className="object-cover -z-20" quality={40} />
      <div className="relative w-[40vw] flex flex-col items-center justify-center p-16 rounded-lg overflow-hidden bg-[rgba(44,44,44,0.8)]">
        <h1 className="text-primary text-5xl font-extrabold">LOGIN</h1>
        <div className="relative mt-10 h-fit flex flex-col gap-3 justify-center items-center">
          {error && <Alert severity="error">{error}</Alert>}
          <form id="form" onSubmit={async (e) => { await handleSubmit(e) }} className="w-[20rem]">
            <div className="relative">
              <label htmlFor="Email" className="text-primaryWhite absolute -translate-x-full translate-y-[50%]">Email: </label>
              <input
                type="text"
                name="Email"
                placeholder="Email"
                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-white"
                required
              />
            </div>
            <div className="mt-5 relative">
              <label htmlFor="Password" className="text-primaryWhite absolute -translate-x-full translate-y-[50%]">Password: </label>
              <input
                type="password"
                name="Password"
                placeholder="Password"
                className="w-full max-w-full ml-2 px-5 py-3 bg-[rgba(217,217,217,0.1)] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary text-white"
                required
              />
            </div>
            <button className="ml-auto mr-auto mt-4 px-4 py-2 text-nowrap bg-secondary rounded-lg flex items-center font-bold text-primary hover:bg-black border border-primaryWhite hover:border-none" type="submit">
              Login
              {pending && <CircularProgress className="p-2 ml-4" />}
            </button>
          </form>
        </div>
        <div className="w-full mt-12 text-right text-sm text-primaryWhite">Don't have an account yet? → <Link style={{ color: "#1976d2", textDecoration: "underline" }} href="/auth/register">Register</Link> </div>
      </div>
    </main>
  );
}

export default SignInPage;