import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

function MenuCards({ color, icon, title, description, value, route }) {
  return (
    <MDBox component={Link} to={route}>
      <MDBox
        borderRadius="xl"
        shadow="lg"
        sx={{
          overflow: "hidden",
          backfaceVisibility: "hidden",
          willChange: "transform, box-shadow",
          transition: "transform 200ms ease-out",
          cursor: "pointer",
          "&:hover": {
            transform: "perspective(1000px) rotateX(-4deg)",
          },
        }}
      >
        <Card>
          <MDBox p={2} mx={3} display="flex" justifyContent="center">
            <MDBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor={color}
              color="white"
              width="4rem"
              height="4rem"
              shadow="md"
              borderRadius="lg"
              variant="gradient"
            >
              <Icon fontSize="default">{icon}</Icon>
            </MDBox>
          </MDBox>
          <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
            <MDTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
              sx={{ zIndex: 20 }}
            >
              {title}
              {value > 0 && (
                <MDBadge
                  badgeContent={value}
                  color="warning"
                  size="xs"
                  sx={{ ml: -1, mt: -2 }}
                />
              )}
            </MDTypography>
            {description && (
              <MDTypography variant="caption" color="text" fontWeight="regular">
                {description}
              </MDTypography>
            )}
          </MDBox>
        </Card>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of MenuCards
MenuCards.defaultProps = {
  color: "info",
  value: "",
  description: "",
};

// Typechecking props for the MenuCards
MenuCards.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  route: PropTypes.string.isRequired,
};

export default MenuCards;
