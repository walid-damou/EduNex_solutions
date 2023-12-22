// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

// axios
import axios from "services/authAxios";

//Api Routes
import { topCollabRoute, baseURL } from "utils/APIRoutes";
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

  const [allCollabs, setAllCollabs] = useState([]);

  useEffect(() => {
    const getAllCollabs = async () => {
      const { data } = await axios.post(topCollabRoute);
      console.log(data);
      setAllCollabs(data.collabs);
    };
    getAllCollabs();
  }, []);

  let table = {
    columns: [
      {
        Header: "Collaborator Name",
        accessor: "author",
        width: "50%",
        align: "left",
      },
      {
        Header: "Number of certifs",
        accessor: "certifs",
        width: "50%",
        align: "center",
      },
    ],
    rows: [],
  };

  allCollabs.map((collab) =>
    table.rows.push({
      author: (
        <Author
          image={collab.image}
          name={`${collab.nom} ${collab.prenom}`}
          company={collab.Prenom}
        />
      ),
      certifs: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {dateFormat(collab.certifs_count)}
        </MDTypography>
      ),
    })
  );
  return table;
}

export default Data;
