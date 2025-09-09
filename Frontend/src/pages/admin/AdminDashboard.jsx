import { Users, UserCheck, Home } from "lucide-react";

const AdminDashboard = () => {
  // Example dummy data (replace with API calls later)
  const stats = {
    totalMembers: 120,
    totalGuests: 80,
    totalHosts: 40,
    totalHouses: 25,
  };

  const cards = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Total Guests",
      value: stats.totalGuests,
      icon: <UserCheck className="w-8 h-8" />,
    },
    {
      title: "Total Hosts",
      value: stats.totalHosts,
      icon: <UserCheck className="w-8 h-8" />,
    },
    {
      title: "Houses Listed",
      value: stats.totalHouses,
      icon: <Home className="w-8 h-8" />,
    },
  ];

  // Dummy recent users (replace with API data)
  const recentUsers = [
    { name: "Amit Verma", role: "Guest", date: "2025-09-05" },
    { name: "Sara Khan", role: "Host", date: "2025-09-04" },
    { name: "John Doe", role: "Guest", date: "2025-09-03" },
    { name: "Priya Sharma", role: "Host", date: "2025-09-02" },
    { name: "Rahul Mehta", role: "Guest", date: "2025-09-01" },
  ];

  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Quick overview of SafelyRest</p>
      </header>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 shadow-lg flex items-center gap-4 transition hover:scale-[1.02]"
            style={{ backgroundColor: "var(--card-bg)", color: "var(--text)" }}
          >
            <div className="p-3 rounded-xl bg-opacity-20 bg-gray-400">
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="text-2xl font-bold">{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Recently Joined Users */}
      <div
        className="rounded-2xl p-6 shadow-lg"
        style={{ backgroundColor: "var(--card-bg)", color: "var(--text)" }}
      >
        <h2 className="text-xl font-semibold mb-4">Recently Joined</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-300/30">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">User Type</th>
                <th className="py-2 px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300/20 text-sm hover:bg-gray-200/10 transition"
                >
                  <td className="py-2 px-3 font-medium">{user.name}</td>
                  <td className="py-2 px-3">{user.role}</td>
                  <td className="py-2 px-3">{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
