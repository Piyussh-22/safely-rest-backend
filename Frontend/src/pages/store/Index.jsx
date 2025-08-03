const Index = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">
        Welcome to Safely Rest
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-6">
        Find your perfect stay or become a host and share your space with
        travelers.
      </p>
      <div className="flex gap-4">
        <a
          href="/houses"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          Explore Houses
        </a>
        <a
          href="/signup"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          Become a Host
        </a>
      </div>
    </main>
  );
};

export default Index;
