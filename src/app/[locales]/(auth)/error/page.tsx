"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

const Error = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const error = searchParam.get("error");

  const errorMessage =
    error && (errors[error as keyof typeof errors] ?? errors.default);

  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-6">
        <Image
          alt="Error illustration"
          className="aspect-square"
          height={200}
          src="/placeholder.svg"
          width={200}
        />
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Oops, something went wrong!
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            We&apos;re sorry, but an unexpected error has occurred. Please try
            again later or contact support if the problem persists.
          </p>
        </div>
        <button
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          // href="/login"
          onClick={() => router.back()}
        >
          Go back
        </button>
      </div>
    </main>
  );
};

export default Error;
