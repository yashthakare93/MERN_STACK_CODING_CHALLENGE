import React from "react";
import ItemsPerPage from "./ItemsPerPage";

const TransactionTable = ({
  transactions,
  onNextPage,
  onPrevPage,
  page,
  selectedPerPage,
  onChange,
}) => {
  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  };

  const thTdStyles = {
    border: "1px solid #d1d5db",
    padding: "12px 15px",
    textAlign: "left",
    fontSize: "14px",
  };

  const thStyles = {
    ...thTdStyles,
    backgroundColor: "#f3f4f6",
    fontWeight: "bold",
  };

  const rowHoverStyles = {
    backgroundColor: "#f9fafb",
  };

  const categoryFootwearStyles = {
    border: "2px solid #3b82f6",
    padding: "5px",
    textAlign: "center",
    backgroundColor: "#e0f3ff",
  };

  const categoryOtherStyles = {
    border: "2px solid #e5e7eb",
    padding: "5px",
    textAlign: "center",
  };

  const imageStyles = {
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const paginationStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "8px",
  };

  const paginationBtnStyles = {
    padding: "8px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const paginationBtnHoverStyles = {
    backgroundColor: "#d1d5db",
  };

  return (
    <div style={{ padding: "20px" }}>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>ID</th>
            <th style={thStyles}>Title</th>
            <th style={thStyles}>Description</th>
            <th style={thStyles}>Price</th>
            <th style={thStyles}>Category</th>
            <th style={thStyles}>Sold</th>
            <th style={thStyles}>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              style={transaction.id % 2 === 0 ? {} : rowHoverStyles}
            >
              <td style={thTdStyles}>{transaction.id}</td> 
              <td style={thTdStyles}>{transaction.title}</td>
              <td style={thTdStyles}>{transaction.description}</td>
              <td style={thTdStyles}>{transaction.price}</td>
              <td
                style={
                  transaction.category === "Footwear"
                    ? categoryFootwearStyles
                    : categoryOtherStyles
                }
              >
                {transaction.category || "NA"}
              </td>
              <td style={thTdStyles}>{transaction.sold ? "YES" : "NO"}</td>
              <td style={thTdStyles}>
                {transaction.image ? (
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    style={imageStyles}
                  />
                ) : (
                  <span>Not Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={paginationStyles}>
        <div>Page No: {page}</div>
        <div>
          <button
            onClick={onPrevPage}
            style={paginationBtnStyles}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                paginationBtnHoverStyles.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#e5e7eb")
            }
          >
            Previous
          </button>
          <span> - </span>
          <button
            onClick={onNextPage}
            style={paginationBtnStyles}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                paginationBtnHoverStyles.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#e5e7eb")
            }
          >
            Next
          </button>
        </div>
        <ItemsPerPage selectedPerPage={selectedPerPage} onChange={onChange} />
      </div>
    </div>
  );
};

export default TransactionTable;