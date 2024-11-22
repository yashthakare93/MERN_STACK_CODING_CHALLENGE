import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import StatisticsComponent from "./Statistics";

const CombinedComponent = () => {
    const [combinedData, setCombinedData] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState("June");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCombinedData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/combined-data?selectedMonth=${selectedMonth}`
                );
                setCombinedData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching combined data:", err.response || err.message);
                setError(err.response ? err.response.data : err.message);
            }
        };

        fetchCombinedData();
    }, [selectedMonth]);

    return (
        <div style={{ padding: '20px',textAlign:'center' }}>
            <h1 style={{ paddingTop: '20px', fontSize: '52px' }}>Combined Data Overview</h1>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {combinedData ? (
                <div
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '20px',
                        backgroundColor: '#f4f4f4', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                    }}
                >
                    {/* Statistics Component */}
                    <div style={{ marginBottom: '20px' }}>
                        <StatisticsComponent statistics={combinedData.statistics} />
                    </div>

                    {/* Bar Chart Component */}
                    <div style={{ marginBottom: '20px' }}>
                        <BarChartComponent barChartData={combinedData.barChartData} />
                    </div>

                    {/* Pie Chart Component */}
                    <div>
                        <PieChartComponent pieChartData={combinedData.pieChartData} />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CombinedComponent;
