import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col place-content-center place-items-center p-24 ${inter.className}`}
    >
      <div className="flex place-items-center">
        <h1 className="text-4xl font-bold text-center">
          Summer Camp 2024 Recruitment Task
        </h1>
      </div>
      <div className="flex place-items-center mt-12">
        <Link href="/products">Click here to see a list of products</Link>
      </div>
    </main>
  );
}
