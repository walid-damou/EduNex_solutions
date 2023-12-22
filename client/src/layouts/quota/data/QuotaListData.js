// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";

export default function Data(QuotaList) {
  let table = {
    columns: [
      {
        Header: "Provider",
        accessor: "provider",
        width: "50%",
        align: "center",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        width: "50%",
        align: "center",
      },
    ],
    rows: [],
  };
  QuotaList.map((quota) =>
    table.rows.push({
      provider: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {quota.Provider.nom}
        </MDTypography>
      ),
      quantity: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {quota.quota}
        </MDTypography>
      ),
    })
  );

  return table;
}
