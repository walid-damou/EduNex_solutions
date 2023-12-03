// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

// axios
import axios from "services/authAxios";

//Api Routes
import { topCompaniesRoute, baseURL } from "utils/APIRoutes";
// React

import { useEffect, useState } from "react";

function Data(props) {
  const dateFormat = (timestamp) => {
    return timestamp.split("T")[0].split("-").reverse().join(" / ");
  };

  const Author = ({ image, name, company }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`${baseURL}/${image}`} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const [allCompanies, setAllCompanies] = useState([]);

  useEffect(() => {
    const getAllCompanies = async () => {
      const { data } = await axios.post(topCompaniesRoute);
      setAllCompanies((prev) => data.companies);
    };
    getAllCompanies();
  }, []);

  let table = {
    columns: [
      {
        Header: "Company Name",
        accessor: "author",
        width: "45%",
        align: "left",
      },
      { Header: "manager", accessor: "manager", align: "center" },
      { Header: "date", accessor: "date", align: "center" },
    ],
    rows: [],
  };

  allCompanies.map((company) =>
    table.rows.push({
      author: (
        <Author
          image={company.image}
          name={company.name}
          company={company.name}
        />
      ),
      manager: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {company.Collaborateurs[0].nom} {company.Collaborateurs[0].prenom}
        </MDTypography>
      ),
      date: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {dateFormat(company.createdAt)}
        </MDTypography>
      ),
    })
  );

  return table;
}

export default Data;
