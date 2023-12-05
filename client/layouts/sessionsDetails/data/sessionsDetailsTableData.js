/* eslint-disable react-hooks/exhaustive-deps */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MySnackBar from "components/MySnackBar";
import Icon from "@mui/material/Icon";

//React hooks
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

// Api Endpoint
import { baseURL, SessionCollabRoute } from "utils/APIRoutes";

import {
  useMaterialUIController,
  setOpenProofModel,
  setcollabProofModel,
  setfileProofModel,
  setUpdater,
  setToastInfos,
} from "context";

// Material Dashboard 2 React contexts
import { dateFormat } from "utils/Helper";

import { useParams } from "react-router-dom";
import { asignOneVoucherRoute } from "utils/APIRoutes";

export default function Data() {
  const [controller, dispatch] = useMaterialUIController();
  const { openProofModel, updater, toastInfos } = controller;

  const [allCollabs, setAllCollabs] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getCollab = async () => {
      const { data } = await axios.post(SessionCollabRoute, {
        sess: id,
      });
      setAllCollabs(data.collab);
    };
    getCollab();
  }, [updater]);

  const handleProof = (e) => {
    const rank = e.currentTarget.getAttribute("index");
    const type = e.currentTarget.getAttribute("typex");
    console.log(allCollabs[rank]);
    const collab = allCollabs[rank];
    setcollabProofModel(dispatch, `${collab.nom} ${collab.prenom}`);
    if (type === "fincourse") {
      const file = collab.Session_Collabs[0].fincourse;
      const templ = {
        id: file.id,
        path: file.file,
        name: file.name,
        size: file.size,
        type: file.mimetype,
      };
      setfileProofModel(dispatch, templ);
    } else if (type === "certifs") {
      const file = collab.Session_Collabs[0].certifs;
      const templ = {
        id: file.id,
        path: file.file,
        name: file.name,
        size: file.size,
        type: file.mimetype,
      };
      setfileProofModel(dispatch, templ);
    }
    setOpenProofModel(dispatch, !openProofModel);
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
      return (
        <MDButton
          size="small"
          variant="text"
          onClick={(e) => handleProof(e)}
          typex="certifs"
          index={index}
        >
          <MDBadge badgeContent="Check Proof" color="success" size="md" />
        </MDButton>
      );
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
        <MDButton
          size="small"
          variant="text"
          onClick={(e) => handleProof(e)}
          typex="fincourse"
          index={index}
        >
          <MDBadge
            type="fincourse"
            badgeContent="Check Proof"
            color="success"
            size="md"
            index={index}
          />
        </MDButton>
      );
    } else {
      return <MDBadge badgeContent="Studying" color="info" size="md" />;
    }
  };

  const asignVoucher = async (id) => {
    const { data } = await axios.post(asignOneVoucherRoute, { id });
    if (data.status) {
      setUpdater(dispatch, !updater);
      setToastInfos(dispatch, {
        color: "success",
        message: "Voucher Assigned Successfully",
      });
      setOpenSnackBar(true);
    } else {
      setToastInfos(dispatch, {
        color: "warning",
        message: data.msg,
      });
      setOpenSnackBar(true);
    }
  };

  const getVoucherStatus = (collab) => {
    const session_collab = collab.Session_Collabs[0];
    console.log(session_collab);
    if (
      session_collab.fincourse &&
      session_collab.fincourse.status === "accepted" &&
      !session_collab.Voucher
    ) {
      return (
        <MDBox display="flex">
          <MDBox>
            <MDButton
              variant="gradient"
              color="success"
              size="small"
              onClick={() => asignVoucher(collab.Session_Collabs[0].id)}
            >
              &nbsp;Assign
            </MDButton>
          </MDBox>
        </MDBox>
      );
    } else if (
      session_collab.fincourse &&
      session_collab.fincourse.status === "accepted" &&
      // session_collab.fincourse.status &&
      session_collab.Voucher
    ) {
      return (
        <MDBox display="flex">
          <MDBox>
            <MDButton
              variant="gradient"
              color="success"
              size="small"
              onClick={() => asignVoucher(collab.Session_Collabs[0].id)}
              disabled
            >
              <Icon fontSize="big" color="light">
                done_all
              </Icon>
              &nbsp; Assigned
            </MDButton>
          </MDBox>
        </MDBox>
      );
    } else {
      return (
        <MDBox display="flex">
          <MDBox>
            <MDButton
              variant="gradient"
              color="success"
              size="small"
              onClick={() => asignVoucher(collab.Session_Collabs[0].id)}
              disabled
            >
              <Icon fontSize="big" color="light">
                warning
              </Icon>
              &nbsp; Not Eligible
            </MDButton>
          </MDBox>
        </MDBox>
      );
    }
  };

  let sessionsDetails = {
    columns: [
      {
        Header: "Collaborators",
        accessor: "author",
        width: "20%",
        align: "left",
      },
      {
        Header: "Date Debut",
        accessor: "fin_cours",
        width: "20%",
        align: "center",
      },
      {
        Header: "status",
        accessor: "status",
        width: "10%",
        align: "center",
      },
      {
        Header: "voucher",
        accessor: "voucher",
        width: "10%",
        align: "center",
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

    rawData: allCollabs,
  };

  allCollabs.map((collab, index) => {
    sessionsDetails.rows.push({
      author: (
        <Company
          image={allCollabs.length > 0 && collab.image}
          name={allCollabs.length > 0 && `${collab.nom} ${collab.prenom}`}
        />
      ),
      fin_cours: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {dateFormat(collab.Session_Collabs[0].createdAt)}
        </MDTypography>
      ),
      status: getStatus(collab, index),
      voucher: getVoucherStatus(collab),
    });
  });

  return sessionsDetails;
}
