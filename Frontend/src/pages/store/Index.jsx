const Index = () => {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        Welcome to Safely Rest
      </h1>

      <p className="text-lg sm:text-xl max-w-2xl mb-6">
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
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
          text-gray-800 dark:text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          Become a Host
        </a>
      </div>
    </main>
  );
};

export default Index;
