import React, { useState } from "react";
import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// PDF Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    backgroundColor: "#fff",
  },
  section: { margin: 10 },
  header: { fontSize: 22, marginBottom: 20, textAlign: "center", fontWeight: "bold" },
  body: { marginTop: 10, marginBottom: 10 },
  signature: { marginTop: 40 },
});

// PDF Document Component
const OfferLetterPDF = ({ candidate }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Offer Letter</Text>
        <Text>Date: {new Date().toLocaleDateString()}</Text>
        <Text> </Text>
        <Text>To,</Text>
        <Text>{candidate.name}</Text>
        <Text> </Text>
        <Text style={styles.body}>
          Dear {candidate.name},
        </Text>
        <Text style={styles.body}>
          We are delighted to offer you the position of <Text style={{ fontWeight: "bold" }}>{candidate.position}</Text> at our company. Your annual salary will be Rs. <Text style={{ fontWeight: "bold" }}>{candidate.salary}</Text>.
        </Text>
        <Text style={styles.body}>
          Your expected joining date is <Text style={{ fontWeight: "bold" }}>{candidate.joiningDate}</Text>.
        </Text>
        <Text style={styles.body}>
          Please confirm your acceptance of this offer by replying to this letter or contacting our HR department.
        </Text>
        <Text style={styles.body}>
          We look forward to welcoming you to our team and wish you a successful career with us.
        </Text>
        <Text> </Text>
        <Text style={styles.signature}>Sincerely,</Text>
        <Text>HR Department</Text>
        {/* <Text>Company Name</Text> */}
      </View>
    </Page>
  </Document>
);

// Main App Component
function App() {
  const [candidate, setCandidate] = useState({
    name: "",
    position: "",
    salary: "",
    joiningDate: "",
  });

  const [error, setError] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
    setError("");
  };

  // Validate form before generating PDF
  const validate = () => {
    if (
      !candidate.name.trim() ||
      !candidate.position.trim() ||
      !candidate.salary.trim() ||
      !candidate.joiningDate.trim()
    ) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  // Generate and download PDF
  const handleDownload = async () => {
    if (!validate()) return;
    const blob = await pdf(<OfferLetterPDF candidate={candidate} />).toBlob();
    saveAs(blob, `Offer_Letter_${candidate.name.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: "40px auto",
      padding: 24,
      border: "1px solid #eee",
      borderRadius: 10,
      background: "#fafbfc",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
    }}>
      <h2 style={{ textAlign: "center" }}>Offer Letter Generator</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleDownload();
        }}
        autoComplete="off"
      >
        <label>
          Candidate Name:
          <input
            name="name"
            type="text"
            placeholder="Enter full name"
            value={candidate.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <label>
          Position:
          <input
            name="position"
            type="text"
            placeholder="e.g. Software Engineer"
            value={candidate.position}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <label>
          Salary:
          <input
            name="salary"
            type="text"
            placeholder="e.g. ₹10,00,000 per annum"
            value={candidate.salary}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <label>
          Joining Date:
          <input
            name="joiningDate"
            type="date"
            value={candidate.joiningDate}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 0",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            fontSize: 16,
            cursor: "pointer",
            marginTop: 10,
          }}
        >
          Download Offer Letter
        </button>
      </form>
      {/* <p style={{ fontSize: 13, color: "#888", marginTop: 16, textAlign: "center" }}>
        Powered by React & PDF Generator
      </p> */}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  margin: "6px 0 16px 0",
  padding: "8px",
  fontSize: 15,
  border: "1px solid #ccc",
  borderRadius: 4,
  boxSizing: "border-box",
};

export default App;
