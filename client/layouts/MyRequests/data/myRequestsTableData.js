import { useEffect, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

// Api Endpoint
import { baseURL, browseCollabRequests } from "utils/APIRoutes";
import { dateFormat } from "utils/Helper";

// import axios
import axios from "services/authAxios";

const Data = () => {
  const [req, setRequests] = useState([]);
  useEffect(() => {
    const getRequests = async () => {
      const { data } = await axios.get(browseCollabRequests, {});
      if (data.status) {
        setRequests(data.requests);
      }
    };
    getRequests();
  }, []);
  const Company = ({ image, name }) => (
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
      </MDBox>
    </MDBox>
  );

  const parseStatus = (partner) => {
    if (partner.status === "pending") {
      return <MDBadge badgeContent="Pending" color="warning" size="md" />;
    } else if (partner.status === "accepted") {
      return <MDBadge badgeContent="Accepted" color="success" size="md" />;
    } else if (partner.status === "refused") {
      return <MDBadge badgeContent="Refused" color="error" size="md" />;
    }
  };
  let myRequests = {
    columns: [
      {
        Header: "Course Name",
        accessor: "author",
        width: "25%",
        align: "left",
      },
      {
        Header: "date",
        accessor: "date",
        align: "center",
        width: "25%",
      },
      {
        Header: "status",
        accessor: "status",
        align: "center",
        width: "25%",
      },
    ],

    rows: [],
  };

  req.map((partner) =>
    myRequests.rows.push({
      author: <Company image={partner.Cour.image} name={partner.Cour.nom} />,
      date: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {dateFormat(partner.createdAt)}
        </MDTypography>
      ),
      status: parseStatus(partner),
    })
  );

  return myRequests;
};
export default Data;
