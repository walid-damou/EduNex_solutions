/* eslint-disable eqeqeq */
// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import MySnackBar from "components/MySnackBar";

// @mui icons
import Icon from "@mui/material/Icon";

// React Hooks
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import axios from "services/authAxios";
import axios from "services/authAxios";

// Endpoint
import {
  allSessionsRoute,
  baseURL,
  allPartnersRoute,
  DeleteInstances,
} from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

import { dateFormat } from "utils/Helper";

export default function Data() {
  const [allSessions, setAllSessions] = useState([]);
  const [tempSessionId, setTempSessionId] = useState(0);
  const [confirmModel, setConfirmModel] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
    },
  ]);
  const [filterby, setFilterBy] = useState(null);

  const filterSessions = (providerId) => {
    if (providerId === null || providerId === -1) {
      return allSessions;
    } else {
      return allSessions.filter(
        (session) => session.Cour.Provider.id === providerId
      );
    }
  };

  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  useEffect(() => {
    const getAllSessions = async () => {
      const { data } = await axios.get(allSessionsRoute);
      console.log(data);

      setAllSessions(data);
    };
    getAllSessions();
  }, [updater]);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axios.get(allPartnersRoute);
      let temp = [];
      data.map((provider) => temp.push({ id: provider.id, nom: provider.nom }));
      temp.unshift({ id: -1, nom: "ALL" });
      setProviders(temp);
    };
    getAllPartners();
  }, []);

  const handleDelete = async (id) => {
    const { data } = await axios.post(DeleteInstances, {
      model: "Session",
      id: id,
    });
    if (data.status) {
      setAllSessions(allSessions.filter((session) => session.id !== id));
      setToastInfos(dispatch, {
        color: "error",
        message: "Session Deleted Successfully",
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

  const Company = ({ id, image, name, company }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <img
        src={`${baseURL}/${image}`}
        alt={name}
        width="70px"
        height="auto"
        style={{ border: "2px solid #2b85eb" }}
      />
      <MDBox ml={2} lineHeight={1}>
        <Link to={`/sessions/details/${id}`}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
        </Link>
        <MDTypography variant="caption">{company}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={1} width="7rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const Period = ({ debut, fin }) => (
    <MDBox display="flex" alignItems="center">
      <MDBox lineHeight={1.5} textAlign="right">
        <MDTypography variant="caption" fontWeight="medium">
          From :{" "}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="medium" color="info">
          {dateFormat(debut)}
        </MDTypography>
        <br />
        <MDTypography variant="caption" fontWeight="medium">
          To :{" "}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="medium" color="info">
          {dateFormat(fin)}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  let sessions = {
    columns: [
      {
        Header: "Session Name",
        accessor: "author",
        width: "30%",
        align: "left",
      },
      {
        Header: "Cours",
        accessor: "cours",
        width: "15%",
        align: "center",
      },
      {
        Header: "Provider",
        accessor: "provider",
        width: "15%",
        align: "center",
      },
      {
        Header: "enrolled",
        accessor: "enrolled",
        align: "center",
        width: "15%",
      },
      {
        Header: "certified students",
        accessor: "certified_students",
        align: "center",
        width: "25%",
      },
      {
        Header: "Period",
        accessor: "period",
        align: "center",
        width: "25%",
      },
      { Header: "edit", accessor: "edit", align: "center", width: "2%" },
      { Header: "delete", accessor: "delete", align: "center", width: "2%" },
    ],

    rows: [],

    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this session ?"}
        open={confirmModel}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempSessionId}
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

    ProvidersFilter: (
      <Grid container mt={1} ml={1} rowSpacing={1}>
        {providers.map((provider) => (
          <Grid
            item
            xs={1}
            md={1.5}
            lg={1}
            ml={{ xs: 3, lg: 2 }}
            key={provider.id}
          >
            <MDButton
              variant="outlined"
              size="small"
              color="success"
              sx={{ width: "100%" }}
              target="_blank"
              onClick={() => setFilterBy(provider.id)}
            >
              {provider.nom}
            </MDButton>
          </Grid>
        ))}
      </Grid>
    ),
  };
  if (allSessions.length === 0 || !Array.isArray(allSessions)) {
    sessions.rows.push({ author: "No Sessions Available" });
  } else {
    filterSessions(filterby).map((session) =>
      sessions.rows.push({
        author: (
          <Company
            id={session.id}
            image={session.Cour.image}
            name={session.nom}
          />
        ),
        cours: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {session.Cour.nom}
          </MDTypography>
        ),
        provider: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {session.Cour.Provider.nom}
          </MDTypography>
        ),
        enrolled: (
          <MDTypography
            component="a"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            {session.collabs}
          </MDTypography>
        ),
        certified_students: (
          <Progress
            color="info"
            value={
              session.collabs == 0
                ? 0
                : Math.floor(100 * (session.collabs_fin / session.collabs))
            }
          />
        ),
        period: <Period debut={session.datedebut} fin={session.datefin} />,
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
              setTempSessionId(session.id);
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
  }

  return sessions;
}
