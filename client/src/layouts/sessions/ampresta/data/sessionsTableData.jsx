// @mui material components
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import MySnackBar from "components/MySnackBar";

// @mui icons
import Icon from "@mui/material/Icon";

// React Hooks
import { useState, useEffect } from "react";

// import axios from "services/authAxios";
import axios from "services/authAxios";

import {
  AllSessionsAdminRoute,
  baseURL,
  allPartnersRoute,
  DeleteInstances,
} from "utils/APIRoutes";
import { dateFormat } from "utils/Helper";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

export default function Data() {
  const [allSessions, setAllSessions] = useState([]);
  const [tempSessionId, setTempSessionId] = useState(0);
  const [confirmModel, setConfirmModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
    },
  ]);

  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  useEffect(() => {
    const getAllSessions = async () => {
      const { data } = await axios.post(AllSessionsAdminRoute, {
        paranoid: false,
      });
      if (data.status) {
        setAllSessions(data.sessions);
        setLoading(true);
      }
    };
    getAllSessions();
  }, [updater]);

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axios.get(allPartnersRoute);
      let temp = [];
      data.map((provider) => temp.push({ id: provider.id, nom: provider.nom }));
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
      setUpdater(dispatch, !updater);
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
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
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

  const parseStatus = (partner) => {
    if (partner.deletedAt) {
      return <MDBadge badgeContent="Deleted" color="error" size="md" />;
    } else {
      return <MDBadge badgeContent="Active" color="success" size="md" />;
    }
  };
  let sessions = {
    columns: [
      {
        Header: "Session Name",
        accessor: "author",
        width: "20%",
        align: "left",
      },
      {
        Header: "Cours",
        accessor: "cours",
        width: "10%",
        align: "center",
      },
      {
        Header: "Provider",
        accessor: "provider",
        width: "10%",
        align: "center",
      },
      {
        Header: "enrolled",
        accessor: "enrolled",
        align: "center",
        width: "5%",
      },
      {
        Header: "certified students",
        accessor: "certified_students",
        align: "center",
        width: "15%",
      },
      {
        Header: "Period",
        accessor: "period",
        align: "center",
        width: "15%",
      },
      { Header: "Status", accessor: "status", align: "center", width: "25%" },
      { Header: "edit", accessor: "edit", align: "center", width: "1%" },
      { Header: "delete", accessor: "delete", align: "center", width: "1%" },
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
      <Grid container mt={1} rowSpacing={1}>
        {providers.map((provider) => (
          <Grid item xs={1} ml={2} key={provider.id}>
            <MDButton
              variant="outlined"
              size="small"
              color="success"
              sx={{ width: "100%" }}
              href={`https://www.google.com/search?q=${provider.nom}`}
              target="_blank"
            >
              {provider.nom}
            </MDButton>
          </Grid>
        ))}
      </Grid>
    ),
  };
  if (loading && (allSessions.length === 0 || !Array.isArray(allSessions))) {
    sessions.rows.push({ author: "No Sessions Available" });
  } else if (loading) {
    allSessions.map((session) =>
      sessions.rows.push({
        author: (
          <Company
            id={session.id}
            image={session.Cour.image}
            name={session.nom}
            company={session.Societe.name}
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
        status: parseStatus(session),
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
