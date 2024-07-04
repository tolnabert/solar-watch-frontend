import { useState, useEffect } from "react";

const TestPublic = () => {
  const [publicData, setPublicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const response = await fetch("/api/auth/test/public");

        if (response.ok) {
          const data = await response.text();
          setPublicData(data);
        } else {
          throw new Error("Failed to fetch public data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Public Test Page</h2>
      <p>{publicData}</p>
    </div>
  );
};

export default TestPublic;
