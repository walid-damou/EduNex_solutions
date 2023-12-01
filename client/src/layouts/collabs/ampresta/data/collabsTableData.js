// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import MySnackBar from "components/MySnackBar";

// @mui icons
import Icon from "@mui/material/Icon";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axiosAuth from "services/authAxios";

// Api Endpoint
import {
  baseURL,
  DeleteInstances,
  browseCollabsAdminRoute,
} from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setToastInfos, setUpdater } from "context";

export default function Data() {
  const [allCollabs, setAllCollabs] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempPartnerId, setTempPartnerId] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  useEffect(() => {
    const getAllCollabs = async () => {
      const { data } = await axiosAuth.get(browseCollabsAdminRoute);
      setAllCollabs((prev) => data);
    };
    getAllCollabs();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axiosAuth.post(DeleteInstances, {
      model: "Collaborateur",
      id: id,
    });
    if (data.status) {
      setUpdater(dispatch, !updater);
      setToastInfos(dispatch, {
        color: "error",
        message: "Collaborator Deleted Successfully",
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

  const parseStatus = (partner) => {
    if (partner.deletedAt) {
      return <MDBadge badgeContent="Deleted" color="error" size="md" />;
    } else {
      return <MDBadge badgeContent="Active" color="success" size="md" />;
    }
  };
  let collabs = {
    columns: [
      {
        Header: "Profile",
        accessor: "author",
        width: "5%",
        align: "left",
      },
      {
        Header: "Number of Sessions",
        accessor: "session",
        align: "center",
        width: "15%",
      },
      {
        Header: "Number of Certifs",
        accessor: "certif",
        align: "center",
        width: "30%",
      },
      { Header: "Status", accessor: "status", align: "center", width: "25%" },
      { Header: "edit", accessor: "edit", align: "center", width: "3%" },
      { Header: "delete", accessor: "delete", align: "center", width: "3%" },
    ],

    rows: [],
    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this provider ?"}
        open={confirmModel}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempPartnerId}
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

    rawData: allCollabs,
  };

  allCollabs.map((collab) =>
    collabs.rows.push({
      author: (
        <Company
          company={collab.Societe.name}
          name={`${collab.nom} ${collab.prenom}`}
          image={collab.image}
        />
      ),
      session: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {collab.session_count}
        </MDTypography>
      ),
      certif: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {collab.certifs_count}
        </MDTypography>
      ),
      edit: (
        <MDButton variant="text" disabled={collab.deletedAt}>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small">edit</Icon>
          </MDTypography>
        </MDButton>
      ),

      status: parseStatus(collab),
      delete: (
        <MDButton
          variant="text"
          onClick={() => {
            setConfirmModel(!confirmModel);
            setTempPartnerId(collab.id);
          }}
          disabled={collab.deletedAt}
        >
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small" color="primary">
              delete
            </Icon>
          </MDTypography>
        </MDButton>
      ),
    })
  );

  return collabs;
}
