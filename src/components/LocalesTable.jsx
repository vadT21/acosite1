import React from "react";

const LocalesTable = ({ locales }) => {
  return (
    <div>
      <h2 style={{ marginBottom: "16px", fontSize: "18px", color: "#333" }}>
        Локали
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#FFF3CD",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#FFE69C" }}>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Локаль
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Title
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Subtitle
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              Keywords
            </th>
          </tr>
        </thead>
        <tbody>
          {locales.map((locale, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {locale.name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {locale.title}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {locale.subtitle}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {locale.keywords}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocalesTable;
