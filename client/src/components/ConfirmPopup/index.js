// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";

const ConfirmPopup = ({
  title,
  open,
  onConfirmPopup,
  handleDetele,
  Id_Item,
}) => {
  return (
    <Modal
      open={open}
      onClose={onConfirmPopup}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Slide direction="up" in={open} timeout={250}>
        <MDBox
          position="fixed"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          shadow="xl"
          ml={{ xs: 0, md: 5, lg: 15, sm: 2.5 }}
        >
          <Grid item xs={12}>
            <Card>
              <MDBox p={2} display="flex" justifyContent="flex-end">
                <MDButton
                  variant="gradient"
                  color="dark"
                  size="small"
                  iconOnly
                  onClick={() => onConfirmPopup(false)}
                >
                  <Icon fontSize="small">close</Icon>
                </MDButton>
              </MDBox>
              <MDBox px={4} pb={2}>
                <MDTypography
                  textAlign="center"
                  fontWeight="light"
                  lineHeight="1.4"
                  fontSize="18px"
                >
                  {title}
                </MDTypography>
              </MDBox>
              <MDBox p={2} display="flex" justifyContent="center">
                <MDBox mr={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    size="small"
                    onClick={() => handleDetele(Id_Item)}
                  >
                    Confirm
                  </MDButton>
                </MDBox>
                <MDBox ml={1}>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    size="small"
                    onClick={() => onConfirmPopup(false)}
                  >
                    Cancel
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </MDBox>
      </Slide>
    </Modal>
  );
};

export default ConfirmPopup;
