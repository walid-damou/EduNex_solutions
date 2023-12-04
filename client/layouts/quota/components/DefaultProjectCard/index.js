// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useState } from "react";

// table component import
import DataTable from "examples/Tables/DataTable";

//import QuotaData
import QuotaListData from "../../data/QuotaListData";
import { baseURL } from "utils/APIRoutes";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function DefaultProjectCard({
  image,
  title,
  openAddModel,
  quota,
  setCompanyID,
  companyID,
}) {
  const [expanded, setExpanded] = useState(false);

  const { columns, rows } = QuotaListData(quota);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MDBox shadow="xxl" borderRadius="xl">
        <CardMedia
          src={`${baseURL}/${image}`}
          component="img"
          title={title}
          sx={{
            width: "100%",
            height: "260px",
            margin: 0,
            boxShadow: ({ boxShadows: { xs } }) => xs,
          }}
        />
      </MDBox>
      <MDBox mx={1} px={2}>
        <MDBox mt={1} mb={2} display="flex" justifyContent="center">
          <MDTypography
            variant="h6"
            textTransform="capitalize"
            textAlign="center"
          >
            {title}
          </MDTypography>
        </MDBox>

        <MDBox display="flex" justifyContent="space-between" mb={0.5}>
          <MDButton
            variant="contained"
            size="small"
            color="info"
            onClick={() => {
              setCompanyID(companyID);
              openAddModel(true);
            }}
            sx={{ height: 20 }}
          >
            <MDTypography variant="text" color="light">
              Edit Quota
            </MDTypography>
          </MDButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ color: "#2b85eb", zIndex: 999 }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </MDBox>
      </MDBox>

      <MDBox
        sx={{
          position: "absolute",
          width: "100%",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Collapse in={expanded} timeout={500}>
          <MDBox>
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              showTotalEntries={false}
              entriesPerPage={false}
            />
          </MDBox>
        </Collapse>
      </MDBox>
    </Card>
  );
}

//Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  openAddModel: PropTypes.func.isRequired,
};

export default DefaultProjectCard;
