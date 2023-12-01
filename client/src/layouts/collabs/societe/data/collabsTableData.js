// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MySnackBar from "components/MySnackBar";

// @mui icons
import Icon from "@mui/material/Icon";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

// Api Endpoint
import { baseURL, DeleteInstances, browseCollabsRoute } from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setToastInfos } from "context";

export default function Data() {
  const [allCollabs, setAllCollabs] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempPartnerId, setTempPartnerId] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  useEffect(() => {
    const getAllCollabs = async () => {
      const { data } = await axios.get(browseCollabsRoute);
      setAllCollabs((prev) => data);
    };
    getAllCollabs();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axios.post(DeleteInstances, {
      model: "Collaborateur",
      id: id,
    });
    if (data.status) {
      setAllCollabs(allCollabs.filter((course) => course.id !== id));
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

  const Company = ({ name, image }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  let collabs = {
    columns: [
      {
        Header: "Profile",
        accessor: "author",
        width: "5%",
        align: "left",
      },
      {
        Header: "Full Name",
        accessor: "nom",
        width: "10%",
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
  try {
    allCollabs.map((collab) =>
      collabs.rows.push({
        author: <Company image={collab.image} />,
        nom: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {`${collab.nom} ${collab.prenom}`}
          </MDTypography>
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
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small">edit</Icon>
          </MDTypography>
        ),
        delete: (
          <MDButton
            variant="text"
            onClick={() => {
              setConfirmModel(!confirmModel);
              setTempPartnerId(collab.id);
            }}
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
  } catch (error) {}

  return collabs;
}
