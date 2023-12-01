// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MySnackBar from "components/MySnackBar";

// @mui icons
import Icon from "@mui/material/Icon";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

// Api Endpoint
import { allDepartmentsRoute, DeleteInstances } from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setToastInfos } from "context";

export default function Data() {
  const [AllDepartements, setAllDepartements] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempDepartmentId, setTempDepartmentId] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  useEffect(() => {
    const getAllDepartements = async () => {
      const { data } = await axios.get(allDepartmentsRoute);
      setAllDepartements(data.data);
    };
    getAllDepartements();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axios.post(DeleteInstances, {
      model: "Departement",
      id: id,
    });
    if (data.status) {
      setAllDepartements(
        AllDepartements.filter((departement) => departement.id !== id)
      );
      setToastInfos(dispatch, {
        color: "error",
        message: "Department Deleted Successfully",
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

  const Company = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  let departements = {
    columns: [
      {
        Header: "Department Name",
        accessor: "author",
        width: "25%",
        align: "center",
      },
      {
        Header: "Number of Students",
        accessor: "Number_of_students",
        align: "center",
        width: "30%",
      },
      {
        Header: "Certified Students",
        accessor: "Number_of_challenges",
        align: "center",
        width: "20%",
      },
      { Header: "edit", accessor: "edit", align: "center", width: "3%" },
      { Header: "delete", accessor: "delete", align: "center", width: "3%" },
    ],

    rows: [],
    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this department ?"}
        open={confirmModel}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempDepartmentId}
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
  };

  AllDepartements.map((department) =>
    departements.rows.push({
      author: <Company name={department.nom} />,
      Number_of_students: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {department.collab_count}
        </MDTypography>
      ),
      Number_of_challenges: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {department.challenge_count}
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
            setTempDepartmentId(department.id);
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

  return departements;
}
