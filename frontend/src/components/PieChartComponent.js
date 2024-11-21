import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const PieChartComponent = () => {
    const [selectedMonth, setSelectedMonth] = useState("June");
    const [pieChartData, setPieChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`http://localhost:5000/api/pie-chart?selectedMonth=${selectedMonth}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPieChartData(data);
            } catch (error) {
                setError("Failed to load chart data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedMonth]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const data = {
        labels: pieChartData.map(item => item.category),
        datasets: [
            {
                data: pieChartData.map(item => item.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
            },
        ],
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>
                Pie Chart Stats -{" "}
                <select
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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                ) : pieChartData.length > 0 ? (
                    <Pie data={data} />
                ) : (
                    <p>No data available.</p>
                )}
            </div>

        </div>
    );
};

export default PieChartComponent;
