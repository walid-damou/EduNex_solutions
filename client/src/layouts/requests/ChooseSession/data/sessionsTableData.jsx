// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MySnackBar from "components/MySnackBar";
import Checkbox from "@mui/material/Checkbox";

// React Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Api Endpoint
import axios from "services/authAxios";

// import APIRoutes
import { baseURL, AcceptRequestRoute } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setToastInfos } from "context";
import { AllSessionsCollabNotEnrolledRoute } from "utils/APIRoutes";

export default function Data(request, cours, collab) {
  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  let navigate = useNavigate();

  const [allSessions, setAllSessions] = useState([]);
  const [checked, setChecked] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    const getAllSessions = async () => {
      const { data } = await axios.post(AllSessionsCollabNotEnrolledRoute, {
        collabId: collab,
        coursId: cours,
      });
      setAllSessions(data.sess);
    };
    getAllSessions();
  }, [updater]);

  const Company = ({ image, name, company }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <img
        src={`${baseURL}/${image}`}
        alt={name}
        width="60px"
        height="auto"
        style={{ border: "2px solid #2b85eb" }}
      />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{company}</MDTypography>
      </MDBox>
    </MDBox>
  );

  let sessions = {
    columns: [
      {
        Header: "",
        accessor: "check",
        width: "10%",
        align: "left",
      },
      {
        Header: "Session Name",
        accessor: "author",
        width: "90%",
        align: "left",
      },
    ],

    rows: [],

    notifications: openSnackBar && (
      <MySnackBar
        color={toastInfos.color}
        title={toastInfos.message}
        open={openSnackBar}
        close={() => setOpenSnackBar(!openSnackBar)}
      />
    ),
  };

  sessions.SubmitButton = async () => {
	  console.log("request",request);
    const { data } = await axios.post(AcceptRequestRoute, {
      session: checked,
      collab: collab,
      request: true,
      requestid:request,
    });
    if (data.status) {
      navigate("/sessions");
      setToastInfos(dispatch, {
        color: "success",
        message: "Request Accepted",
      });
      setOpenSnackBar(true);
    } else {
      setToastInfos(dispatch, { color: "warning", message: data.msg });
      setOpenSnackBar(true);
    }
  };

  if (allSessions.length === 0 || !Array.isArray(allSessions)) {
    sessions.rows.push({ author: "No Sessions Available" });
  } else {
    allSessions.map((session) =>
      sessions.rows.push({
        check: (
          <Checkbox
            onChange={(e) => {
              setChecked(session.id);
              setIsChecked(e.target.checked);
            }}
          ></Checkbox>
        ),
        author: <Company image={session.Cour.image} name={session.nom} />,
      })
    );
  }

  sessions.isChecked = isChecked;

  return sessions;
}
