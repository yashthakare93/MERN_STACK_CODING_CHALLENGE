const Transaction = require("../models/Transaction");

const getStatistics = async (req, res) => {
    try {
        const { selectedMonth } = req.query;

        if (!selectedMonth) {
            return res.status(400).json({ error: "Month not provided." });
        }

        const monthMap = {
            "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
            "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
        };

        // Convert month name to number
        const monthNumber = monthMap[selectedMonth];

        if (!monthNumber) {
            return res.status(400).json({ error: "Invalid month provided." });
        }

        const transactions = await Transaction.find();

        const filteredTransactions = transactions.filter(transaction => {
            const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
            return transactionMonth === monthNumber;
        });


        const totalSaleAmount = filteredTransactions.reduce((sum, item) => sum + item.price, 0);
        const totalSoldItems = filteredTransactions.filter(item => item.sold === true).length;
        const totalNotSoldItems = filteredTransactions.filter(item => item.sold === false).length;

        res.json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems,
        });

    } catch (error) {
        console.error("Error in getStatistics:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getStatistics };
