const Transaction = require('../models/Transaction');

const getBarChartData = async (req, res) => {
    try {
        const { selectedMonth } = req.query;
        
        if (!selectedMonth) {
            return res.status(400).json({ error: "Month not provided." });
        }

        const monthMap = {
            "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
            "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
        };
        const monthNumber = monthMap[selectedMonth];

        if (!monthNumber) {
            return res.status(400).json({ error: "Invalid month provided." });
        }

        const transactions = await Transaction.find();
        const filteredTransactions = transactions.filter(transaction => {
            const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
            return transactionMonth === monthNumber && transaction.sold === true; 
        });

        const priceRanges = {
            '0-100': 0, '101-200': 0, '201-300': 0, '301-400': 0, '401-500': 0,
            '501-600': 0, '601-700': 0, '701-800': 0, '801-900': 0, '901+': 0
        };

        filteredTransactions.forEach(transaction => {
            const price = transaction.price;
            if (price <= 100) priceRanges['0-100']++;
            else if (price <= 200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901+']++;
        });

        const chartData = Object.keys(priceRanges).map(range => ({
            range,
            count: priceRanges[range]
        }));

        res.json(chartData);
    } catch (error) {
        console.error("Error in getBarChartData:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getBarChartData };
