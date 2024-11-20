import React from "react";

const ItemsPerPage = ({ selectedPerPage, onChange }) => {
  return (
    <div>
      <label htmlFor="itemsPerPage">Items per page:</label>
      <select
        id="itemsPerPage"
        value={selectedPerPage}
        onChange={onChange}
        style={{ marginLeft: '10px', padding: '5px 10px' }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default ItemsPerPage;
