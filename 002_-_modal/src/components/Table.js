import React from "react";

function Table({ data, config,keyFn }) {
  const renderedRow = data.map((item, index) => {
    const renderCells = config.map((configItem, index) => {
      return (
        <td
          className={`border-b border-gray-300 p-2 ${
            configItem.label === "Color" && configItem.render(item)
          } `}
        >
          {configItem.label === "Color" ? "" : configItem.render(item)}
        </td>
      );
    });
    return (
      <tr key={keyFn(item)} className="border-b border-gray-300 text-center">
        {renderCells}
      </tr>
    );
  });

  const renderHeading = config.map((item, index) => {
    return <th key={index}>{item.label}</th>;
  });
  return (
    <div>
      <table className="table-auto border-spacing-2">
        <thead>
          <tr className="border-b-2 border-gray-300 text-center">
            {renderHeading}
          </tr>
        </thead>
        <tbody>{renderedRow}</tbody>
      </table>
    </div>
  );
}

export default Table;
