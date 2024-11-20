import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionTable from "../components/TransactionTable";
import SelectMonth from "../components/SelectMonth";

const TransactionPage = () => {
    const [selectedMonth, setSelectedMonth] = useState("March");
    const [selectedPerPage, setSelectedPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const monthMapping = {
        January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
        July: "07", August: "08", September: "09", October: "10", November: "11", December: "12"
    };

    const formatMonth = (month) => {
        const currentYear = new Date().getFullYear();
        const monthNumber = monthMapping[month] || "01";
        return `${currentYear}-${monthNumber}`;
    };

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/transactions", {
                params: {
                    month: formatMonth(selectedMonth),
                    search: searchText,
                    page: currentPage,
                    perPage: selectedPerPage,
                },
            });
            const { transactions: fetchedTransactions, pagination } = response.data;
            setTransactions(fetchedTransactions || []);
            setTotalTransactions(pagination?.totalTransactions || 0);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setTransactions([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [selectedMonth, searchText, currentPage, selectedPerPage]);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalTransactions / selectedPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePerPageChange = (e) => {
        setSelectedPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); // Reset to first page on perPage change
    };

    return (
        <div style={{ backgroundColor: "#edf6f6", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <div style={{
                    width: "160px", height: "160px", backgroundColor: "white", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <p style={{ color: "#464646", fontWeight: "bold", fontSize: "20px" }}>
                        Transaction <br /> Dashboard
                    </p>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
                <SelectMonth
                    selectedMonth={selectedMonth}
                    value={searchText}
                    onMonthChange={(e) => {
                        setSelectedMonth(e.target.value);
                        setCurrentPage(1);
                    }}
                    onSearchChange={(e) => setSearchText(e.target.value)}
                    onClear={() => setSearchText("")}
                />
            </div>

            {isLoading ? (
                <div>Loading transactions...</div>
            ) : transactions.length > 0 ? (
                <>
                    <TransactionTable
                        transactions={transactions}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                        selectedPerPage={selectedPerPage}
                        onChange={handlePerPageChange}
                        page={currentPage}
                    />
                  
                </>
            ) : (
                <div>No transactions found for the selected criteria.</div>
            )}
        </div>
    );
};

export default TransactionPage;
