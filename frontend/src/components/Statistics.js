import React, { useEffect, useState } from "react";

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState("June"); 
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!selectedMonth) {
        setError("Please select a valid month.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/statistics?selectedMonth=${selectedMonth}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong.");
        }

        setStatistics(data);
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError("Error fetching statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div style={{ paddingBottom: "20px" }}>
      <div style={{ fontWeight: "bold", fontSize: "32px", textAlign: "center", margin: "20px 0" }}>
        Statistics -{" "}
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          {monthOptions.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <div
          style={{
            maxWidth: "600px",
            padding: "16px",
            backgroundColor: "#f8df8c",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
 
          {loading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : error ? (
            <p style={{ textAlign: "center", color: "red" }}>{error}</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px",paddingInline:"10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "80px" }}>
                <h3 style={{ fontWeight: "bold" }}>Total Sale Amount</h3>
                <p style={{ fontSize: "18px" }}>${statistics.totalSaleAmount}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "80px" }}>
                <h3 style={{ fontWeight: "bold" }}>Total Sold Items</h3>
                <p style={{ fontSize: "18px" }}>{statistics.totalSoldItems}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "80px" }}>
                <h3 style={{ fontWeight: "bold" }}>Total Not Sold Items</h3>
                <p style={{ fontSize: "18px" }}>{statistics.totalNotSoldItems}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
