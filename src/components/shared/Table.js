import React from 'react';

const Table = ({ columns, data, actions }) => (
  <div className="table-wrapper">
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((row) => actions(row))}</tbody>
    </table>
  </div>
);

export default Table;
