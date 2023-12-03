// Material Dashboard 2 React components
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

import { allCoursesRoute, baseURL, DeleteInstances } from "utils/APIRoutes";

// ConfirmPoppup component
import ConfirmPopup from "components/ConfirmPopup";

// Material Dashboard 2 React contexts
import { setUpdater, useMaterialUIController, setToastInfos } from "context";
import axiosAuth from "services/authAxios";

export default function Data(setOpenAddModel) {
  const [allCourses, setAllCourses] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);
  const [tempCourseId, setTempCourseId] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [sendEdit, setSendEdit] = useState([]);

  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  useEffect(() => {
    const getAllCourses = async () => {
      const { data } = await axiosAuth.get(allCoursesRoute, {
        paranoid: false,
      });
      setAllCourses(data);
    };
    getAllCourses();
  }, [updater]);

  const handleDelete = async (id) => {
    const { data } = await axiosAuth.post(DeleteInstances, {
      model: "cours",
      id: id,
    });
    if (data.status) {
      setUpdater(dispatch, !updater);
      setToastInfos(dispatch, {
        color: "error",
        message: "Course Deleted Successfully",
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
      <img
        src={`${baseURL}/${image}`}
        alt={name}
        width="50px"
        height="auto"
        style={{ border: "1.5px solid #2b85eb" }}
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

  const handleProvider = (provider) => {
    if (provider === null) {
      return " ";
    } else {
      return provider.nom;
    }
  };

  const getDataByID = (id) => {
    for (let i = 0; i < allCourses.length; i++) {
      if (allCourses[i].id === id) {
        setSendEdit(allCourses[i]);
      }
    }
  };

  let courses = {
    columns: [
      {
        Header: "Tiltle / Constructor",
        accessor: "author",
        width: "30%",
        align: "left",
      },
      {
        Header: "enrolled",
        accessor: "enrolled",
        align: "center",
        width: "25%",
      },
      {
        Header: "number of sessions",
        accessor: "number_of_sessions",
        align: "center",
        width: "25%",
      },
      {
        Header: "certified students",
        accessor: "certified_students",
        align: "center",
        width: "25%",
      },
      { Header: "Status", accessor: "status", align: "center", width: "25%" },
      { Header: "edit", accessor: "edit", align: "center", width: "2%" },
      { Header: "delete", accessor: "delete", align: "center", width: "2%" },
    ],

    rows: [],

    confirmation: confirmModel && (
      <ConfirmPopup
        title={"Are you sure you want to delete this course ?"}
        open={confirmModel}
        onConfirmPopup={() => setConfirmModel(!confirmModel)}
        handleDetele={handleDelete}
        Id_Item={tempCourseId}
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

    sendEdit: sendEdit,

    rawData: allCourses,
  };

  const parseStatus = (course) => {
    if (course.deletedAt) {
      return <MDBadge badgeContent="Deleted" color="error" size="md" />;
    } else {
      return <MDBadge badgeContent="Active" color="success" size="md" />;
    }
  };
  allCourses.map((course) =>
    courses.rows.push({
      author: (
        <Company
          image={course.image}
          name={course.nom}
          company={handleProvider(course.Provider)}
        />
      ),
      enrolled: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {course.collabs}
        </MDTypography>
      ),
      status: parseStatus(course),
      number_of_sessions: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {course.sessions}
        </MDTypography>
      ),
      certified_students: (
        <Progress
          color="info"
          value={
            course.collabs == 0
              ? 0
              : Math.floor(100 * (course.collabs_fin / course.collabs))
          }
        />
      ),
      edit: (
        <MDButton
          variant="text"
          onClick={() => {
            getDataByID(course.id);
            setOpenAddModel(true);
          }}
          disabled={course.deletedAt !== null}
        >
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small">edit</Icon>
          </MDTypography>
        </MDButton>
      ),

      delete: (
        <MDButton
          variant="text"
          onClick={() => {
            setConfirmModel(!confirmModel);
            setTempCourseId(course.id);
          }}
          disabled={course.deletedAt}
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

  return courses;
}
