/* eslint-disable eqeqeq */
// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

import { Icon } from "@mui/material";

// React Hooks
import { useState, useEffect } from "react";

// import axios from "services/authAxios";
import axios from "services/authAxios";
import {
  baseURL,
  allPartnersRoute,
  AllSessionsCollabRoute,
} from "utils/APIRoutes";

import ProofModel from "examples/proofModel";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setOpenProofModel } from "context";
import { dateFormat } from "utils/Helper";

export default function Data(setSessionId) {
  const [allSessions, setAllSessions] = useState([]);
  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
    },
  ]);

  const [controller, dispatch] = useMaterialUIController();
  const { updater, openProofModel } = controller;

  const [showMyProof, setShowMyProof] = useState(false);

  useEffect(() => {
    const getAllSessions = async () => {
      const { data } = await axios.get(AllSessionsCollabRoute);
      setAllSessions(data);
      console.log("hadi data aba", data);
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

  const [myEndCourseProof, setMyEndCourseProof] = useState("");
  const [myCertifCompletionProof, setMyCertifCompletionProof] = useState("");

  // allSessions.map((session) =>
  //   setMyEndCourseProof(
  //     session.Session_Collabs[0].fincourse === null
  //       ? null
  //       : session.Session_Collabs[0].fincourse.file
  //   )
  // );

  // console.log(AllProofs);
  // console.log(allSessions);

  const getStatus = (collab, index) => {
    if (
      collab.Session_Collabs[0].certifs &&
      collab.Session_Collabs[0].certifs.status === "accepted"
    ) {
      return <MDBadge badgeContent="Certified" color="success" size="md" />;
    } else if (
      collab.Session_Collabs[0].certifs &&
      collab.Session_Collabs[0].certifs.status === "pending"
    ) {
      return <MDBadge badgeContent="Pending" color="warning" size="md" />;
    } else if (
      collab.Session_Collabs[0].fincourse &&
      collab.Session_Collabs[0].fincourse.status === "accepted"
    ) {
      return <MDBadge badgeContent="Finished" color="dark" size="md" />;
    } else if (
      collab.Session_Collabs[0].fincourse &&
      collab.Session_Collabs[0].fincourse.status === "pending"
    ) {
      return (
        <MDBadge
          type="fincourse"
          badgeContent="Pending"
          color="warning"
          size="md"
          index={index}
        />
      );
    } else {
      return <MDBadge badgeContent="Studying" color="secondary" size="md" />;
    }
  };

  let sessions = {
    columns: [
      {
        Header: "Session Name",
        accessor: "author",
        width: "10%",
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
        Header: "Period",
        accessor: "period",
        align: "center",
        width: "10%",
      },
      {
        Header: "status",
        accessor: "status",
        width: "10%",
        align: "center",
      },
      {
        Header: "proof",
        accessor: "proof",
        width: "10%",
        align: "center",
      },
      {
        Header: "show proof",
        accessor: "show_proof",
        width: "5%",
        align: "center",
      },
    ],

    rows: [],

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
              href={`https://www.google.com/search?q=${provider.nom}`}
              target="_blank"
              onClick={() => console.log(provider.id)}
            >
              {provider.nom}
            </MDButton>
          </Grid>
        ))}
      </Grid>
    ),

    ShowMyProof: showMyProof && (
      <ProofModel
        finCourse={`${baseURL}/${myEndCourseProof}`}
        certifCompletion={`${baseURL}/${myCertifCompletionProof}`}
        open={showMyProof}
        onClose={setShowMyProof}
      />
    ),
  };
  if (allSessions.length === 0 || !Array.isArray(allSessions)) {
    sessions.rows.push({ author: "No Sessions Available" });
  } else {
    allSessions.map((session, index) =>
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
        status: getStatus(session, index),
        proof: (
          <MDButton
            variant="gradient"
            color="info"
            size="small"
            onClick={() => {
              setSessionId(session);
              setOpenProofModel(dispatch, !openProofModel);
            }}
            disabled={
              session.Session_Collabs[0].fincourse &&
              session.Session_Collabs[0].certifs &&
              session.Session_Collabs[0].fincourse.status === "accepted" &&
              session.Session_Collabs[0].certifs.status === "accepted"
            }
          >
            &nbsp;Add Proof
          </MDButton>
        ),
        period: <Period debut={session.datedebut} fin={session.datefin} />,
        show_proof:
          session.Session_Collabs[0].fincourse === null ? (
            <MDButton variant="text">
              <MDTypography variant="caption" color="text" fontWeight="medium">
                <Icon fontSize="small">visibility_off</Icon>
              </MDTypography>
            </MDButton>
          ) : (
            <MDButton
              variant="text"
              onClick={() => {
                setMyEndCourseProof(
                  session.Session_Collabs[0].fincourse === null
                    ? null
                    : session.Session_Collabs[0].fincourse.file
                );
                setMyCertifCompletionProof(
                  session.Session_Collabs[0].certifs === null
                    ? null
                    : session.Session_Collabs[0].certifs.file
                );
                setShowMyProof(true);
              }}
            >
              <MDTypography variant="caption" color="text" fontWeight="medium">
                <Icon fontSize="small">visibility</Icon>
              </MDTypography>
            </MDButton>
          ),
      })
    );
  }

  return sessions;
}
