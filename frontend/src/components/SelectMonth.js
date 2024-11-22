import React from "react";

const SelectMonth = ({
  selectedMonth,
  onSearchChange,
  value,
  onMonthChange,
  onClear,
}) => {
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

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  };

  const searchBoxStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const searchInputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const clearButtonStyle = {
    marginLeft: '10px',
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const monthSelectorStyle = {
    /* You can add any additional styles here */
  };

  const monthDropdownStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  return (
    <div style={containerStyle}>
      <div style={searchBoxStyle}>
        <input
          style={searchInputStyle}
          type="text"
          value={value}
          onChange={onSearchChange}
          placeholder="Search transactions..."
        />
        <button
          style={clearButtonStyle}
          onClick={onClear}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#d32f2f')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#f44336')}
        >
          Clear
        </button>
      </div>

      <div style={monthSelectorStyle}>
        <select
          style={monthDropdownStyle}
          value={selectedMonth}
          onChange={onMonthChange}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectMonth;