// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MySnackBar from "components/MySnackBar";

// @mui icons
import Icon from "@mui/material/Icon";

// Endpoint
import { allCompaniesRoute, baseURL, DeleteInstances } from "utils/APIRoutes";
import { dateFormat } from "utils/Helper";

//React Hook
import { useState, useEffect } from "react";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

// Axios
import axiosAuth from "services/authAxios";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";
import { restoreSocialRoute } from "utils/APIRoutes";

export default function Data() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempCompanyId, setTempCompanyId] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  const restoreCompany = async (id) => {
    await axiosAuth.post(restoreSocialRoute, { id });
  };

  useEffect(() => {
    const getAllCompanies = async () => {
      const { data } = await axiosAuth.post(allCompaniesRoute, {
        paranoid: false,
      });
      if (data.status) {
        setAllCompanies(data.msg);
        setLoading(true);
      }
    };
    getAllCompanies();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axiosAuth.post(DeleteInstances, {
      model: "societe",
      id: id,
    });
    if (data.status) {
      setUpdater(dispatch, !updater);
      setToastInfos(dispatch, {
        color: "error",
        message: "Company Deleted Successfully",
      });
      setOpenSnackBar(true);
      setConfirmModel(!confirmModel);
    } else {
      setToastInfos(dispatch, {
        color: "warning",
        message: data.msg,
      });
      setOpenSnackBar(true);
    }
  };

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  let companies = {
    columns: [
      {
        Header: "Company Name",
        accessor: "author",
        width: "40%",
        align: "left",
      },
      { Header: "manager", accessor: "manager", align: "center", width: "15%" },
      { Header: "date", accessor: "date", align: "center", width: "15%" },
      { Header: "Status", accessor: "status", align: "center", width: "15%" },
      { Header: "edit", accessor: "edit", align: "center", width: "1%" },
      { Header: "delete", accessor: "delete", align: "center", width: "1%" },
      { Header: "restore", accessor: "restore", align: "center", width: "1%" },
    ],

    rows: [],

    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this company ?"}
        open={confirmModel}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempCompanyId}
      />
    ),

    notifications: openSnackBar && (
      <MySnackBar
        color={toastInfos.color}
        title={toastInfos.message}
        open={openSnackBar}
        close={() => setOpenSnackBar(!openSnackBar)}
      />
    ),

    rawData: allCompanies,
  };

  const parseStatus = (partner) => {
    if (partner.deletedAt) {
      return <MDBadge badgeContent="Deleted" color="error" size="md" />;
    } else {
      return <MDBadge badgeContent="Active" color="success" size="md" />;
    }
  };

  allCompanies.map((company) =>
    companies.rows.push({
      author: <Company image={company.image} name={company.name} />,
      manager: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {company.Collaborateurs[0].nom} {company.Collaborateurs[0].prenom}
        </MDTypography>
      ),
      date: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {dateFormat(company.createdAt)}
        </MDTypography>
      ),
      status: loading && parseStatus(company),
      edit: (
        <MDButton variant="outlined" disabled={company.deletedAt}>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small">edit</Icon>
          </MDTypography>
        </MDButton>
      ),

      delete: (
        <MDButton
          variant="outlined"
          onClick={() => {
            setConfirmModel(!confirmModel);
            setTempCompanyId(company.id);
          }}
          disabled={company.deletedAt}
        >
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small" color="primary">
              delete
            </Icon>
          </MDTypography>
        </MDButton>
      ),
      restore: (
        <MDButton
          variant="outlined"
          onClick={() => {
            // setConfirmModel(!confirmModel);
            // setTempCompanyId(company.id);
            restoreCompany(company.id);
            window.location.reload();
          }}
          disabled={!company.deletedAt}
        >
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small" color="primary">
              restore
            </Icon>
          </MDTypography>
        </MDButton>
      ),
    })
  );

  return companies;
}
