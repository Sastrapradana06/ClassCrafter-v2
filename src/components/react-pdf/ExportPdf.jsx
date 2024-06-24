/* eslint-disable react/prop-types */
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export default function ExportPdf({ columnsTable, columnsData, data, page }) {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Data {page}</Text>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderNo}>
              <Text style={styles.tableCellHeader}>No</Text>
            </View>
            {columnsTable.map((column, index) => (
              <View style={styles.tableColHeader} key={index}>
                <Text style={styles.tableCellHeader}>{column}</Text>
              </View>
            ))}
          </View>
          {/* Table Rows */}
          {data.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableColNo}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              {columnsData.map((column, index) => (
                <View style={styles.tableCol} key={index}>
                  <Text style={styles.tableCell}>
                    {item[column.toLowerCase()]}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    fontStyle: "uppercase",
  },
  table: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeaderNo: {
    width: "30px",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#65B741",
    color: "white",
    padding: 2,
  },
  tableColHeader: {
    width: "77px",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#65B741",
    color: "white",
    padding: 2,
  },
  tableColNo: {
    width: "30px",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 2,
  },
  tableCol: {
    width: "77px",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 2,
  },
  tableCellHeader: {
    margin: 3,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 3,
    fontSize: 10,
  },
});
