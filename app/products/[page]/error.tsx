"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col place-items-center mt-5">
      <h2 className="text-2xl font-bold text-center">{error.message}</h2>
      <button className="hover:text-blue-500" onClick={() => router.push("/")}>
        Go back to main page
      </button>
    </div>
  );
}
