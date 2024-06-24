import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-8">The page you are looking for does not exist.</p>
      <div className="flex space-x-4">
        <Link className="px-4 py-2 bg-white text-black rounded" href="/">
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
