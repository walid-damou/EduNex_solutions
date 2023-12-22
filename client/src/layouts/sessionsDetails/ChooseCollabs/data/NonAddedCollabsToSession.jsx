/* eslint-disable react-hooks/exhaustive-deps */
// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MySnackBar from "components/MySnackBar";
import Checkbox from "@mui/material/Checkbox";

// React Hooks
import { useState, useEffect } from "react";

// Api Endpoint
import axios from "services/authAxios";

// import APIRoutes
import {
  baseURL,
  browseCollabsOutOfSessionRoute,
  addCollabsSessionRoute,
} from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";
import { toggleArrayItem } from "utils/Helper";

export default function Data(session) {
  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  const [allCollabs, setAllCollabs] = useState([]);
  const [checked, setChecked] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    const getAllCollabs = async () => {
      const { data } = await axios.post(browseCollabsOutOfSessionRoute, {
        sess: session,
      });
      console.log(data.collabs);
      setAllCollabs((prev) => data.collabs);
    };
    getAllCollabs();
  }, [updater]);

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
        Header: "",
        accessor: "check",
        width: "2%",
        align: "left",
      },
      {
        Header: "Profile",
        accessor: "author",
        width: "2%",
        align: "left",
      },
      {
        Header: "Full Name",
        accessor: "fullName",
        width: "20%",
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

  collabs.SubmitButton = () => {
    checked.map(async (collab) => {
      const { data } = await axios.post(addCollabsSessionRoute, {
        session,
        collab,
      });

      if (data.status) {
        setUpdater(dispatch, !updater);
        setToastInfos(dispatch, {
          color: "success",
          message: "Collaborator(s) Added to Session Successfully",
        });
      } else {
        setToastInfos(dispatch, { color: "warning", message: data.msg });
        setOpenSnackBar(true);
      }
    });
  };

  if (allCollabs.length === 0 || !Array.isArray(allCollabs)) {
    collabs.rows.push({ author: "No Collaborators Available" });
  } else {
    allCollabs.map((collab) =>
      collabs.rows.push({
        check: (
          <Checkbox
            onChange={(e) => {
              setChecked(toggleArrayItem(collab.id, checked));
              checked.length === 0 ? setIsChecked(false) : setIsChecked(true);
            }}
          ></Checkbox>
        ),
        author: <Company image={collab.image} />,
        fullName: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {`${collab.nom} ${collab.prenom}`}
          </MDTypography>
        ),
      })
    );
  }

  collabs.isChecked = isChecked;
  collabs.checked = checked;

  return collabs;
}
