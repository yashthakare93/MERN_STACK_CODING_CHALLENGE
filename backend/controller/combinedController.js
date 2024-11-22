const axios = require("axios");

const getCombinedData = async (req, res) => {
    try {
        const { selectedMonth } = req.query;

        if (!selectedMonth) {
            return res.status(400).json({ error: "Month not provided." });
        }

        // API endpoints
        const barChartAPI = `http://localhost:5000/api/bar-chart?selectedMonth=${selectedMonth}`;
        const pieChartAPI = `http://localhost:5000/api/pie-chart?selectedMonth=${selectedMonth}`;
        const statisticsAPI = `http://localhost:5000/api/statistics?selectedMonth=${selectedMonth}`;

        const [barChartResponse, pieChartResponse, statisticsResponse] = await Promise.all([
            axios.get(barChartAPI),
            axios.get(pieChartAPI),
            axios.get(statisticsAPI),
        ]);

        const combinedData = {
            barChartData: barChartResponse.data,
            pieChartData: pieChartResponse.data,
            statistics: statisticsResponse.data,
        };

        res.status(200).json(combinedData);
    } catch (error) {
        console.error("Error in getCombinedData:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { getCombinedData };
