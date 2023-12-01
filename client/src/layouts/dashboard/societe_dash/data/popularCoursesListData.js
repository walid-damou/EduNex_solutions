// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

// axios
import axios from "services/authAxios";

import { baseURL, quotaSocRoute } from "utils/APIRoutes";
//Api Routes
// React

import { useEffect, useState } from "react";

function Data(props) {
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

  const [allQuotas, setAllQuotas] = useState([]);

  const [allProviders, setAllProviders] = useState([]);
  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    const getAllQuotas = async () => {
      const { data } = await axios.post(quotaSocRoute);
      console.log("data", data);
      if (data.status) {
        console.log("wslat");

        setAllImages(data.images);
        setAllProviders(data.providers);
        setAllQuotas(data.quotas);
        console.log(allQuotas);
      }
    };
    getAllQuotas();
  }, []);

  let table = {
    columns: [
      {
        Header: "Provider Name",
        accessor: "author",
        width: "50%",
        align: "left",
      },
      {
        Header: "Quota ",
        accessor: "certifs",
        width: "50%",
        align: "center",
      },
    ],
    rows: [],
  };
  for (let index = 0; index < allQuotas.length; index++) {
    table.rows.push({
      author: (
        <Author
          image={allImages[index]}
          name={allProviders[index]}
          company={allQuotas[index]}
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
          {allQuotas[index]}
        </MDTypography>
      ),
    });
  }

  return table;
}

export default Data;
