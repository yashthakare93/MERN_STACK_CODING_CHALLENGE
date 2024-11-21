const Transaction = require('../models/Transaction');

const getPieChartData = async (req, res) => {
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
            return transactionMonth === monthNumber;
        });

        const categoryCounts = {};


        filteredTransactions.forEach(transaction => {
            const category = transaction.category;
            if (category) {
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            }
        });

        const pieChartData = Object.keys(categoryCounts).map(category => ({
            category,
            count: categoryCounts[category]
        }));

        res.json(pieChartData);

    } catch (error) {
        console.error("Error in getPieChartData:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getPieChartData };
