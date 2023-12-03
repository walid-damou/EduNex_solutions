// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axiosAuth from "services/authAxios";

// Api Endpoint
import { baseURL } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";
import { browseVouchersSocRoute } from "utils/APIRoutes";

export default function Data() {
  const [controller] = useMaterialUIController();
  const { updater } = controller;

  const [allVouchers, setAllVouchers] = useState([]);

  useEffect(() => {
    const getAllVouchers = async () => {
      const { data } = await axiosAuth.post(browseVouchersSocRoute);
      setAllVouchers(data);
    };
    getAllVouchers();
  }, [updater]);

  const Company = ({ image, name, company }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{company}</MDTypography>
      </MDBox>
    </MDBox>
  );

  let vouchers = {
    columns: [
      {
        Header: "Provider",
        accessor: "provider",
        width: "10%",
        align: "left",
      },
      {
        Header: "Vouchers Left",
        accessor: "v_left",
        width: "10%",
        align: "center",
      },
    ],

    rows: [],
  };
  try {
    allVouchers.map((voucher) =>
      vouchers.rows.push({
        provider: <Company name={voucher.nom} image={voucher.image} />,

        v_left: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {voucher.count}
          </MDTypography>
        ),
      })
    );
  } catch (error) {}

  return vouchers;
}
