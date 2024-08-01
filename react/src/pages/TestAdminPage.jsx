import { useState, useEffect } from "react";

const TestAdminPage = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await fetch("/api/auth/test/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAdminData(data);
        } else {
          throw new Error("Failed to fetch admin data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Admin Test Page</h2>
      <h2>CI and Dockerization worked</h2>
      {adminData && <p>Admin Username: {adminData}</p>}
    </div>
  );
};

export default TestAdminPage;
