import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const BarChartComponent = () => {
    const [selectedMonth, setSelectedMonth] = useState("June");
    const [barChartData, setBarChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    useEffect(() => {
        const fetchBarChartData = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(
                    `http://localhost:5000/api/bar-chart?selectedMonth=${selectedMonth}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data); 
                const labels = data.map((item) => item.range);
                const counts = data.map((item) => item.count);

                setBarChartData({
                    labels,
                    datasets: [
                        {
                            label: "Number of Items Sold",
                            backgroundColor: "rgb(108,229,232)",
                            data: counts,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching bar chart data:", error);
                setError("Failed to load chart data.");
            } finally {
                setLoading(false);
            }
        };

        fetchBarChartData();
    }, [selectedMonth]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                Bar Chart Stats -{" "}
                <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    style={{
                        padding: "5px 10px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                >
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </h2>

            <div
                style={{
                    width: "800px",
                    height: "420px",
                    margin: "0 auto",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                {loading ? (
                    <p>Loading chart data...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : barChartData ? (
                    <Bar
                        data={barChartData}
                        options={{
                            responsive: true, 
                        }}
                    />
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
};

export default BarChartComponent;
