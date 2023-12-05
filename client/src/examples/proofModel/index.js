// @mui material components
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// @mui icons
import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
import {baseURL} from "utils/APIRoutes";
const ProofModel = ({ finCourse, certifCompletion, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} disableAutoFocus={true}>
      <Slide direction="up" in={open} timeout={250}>
        <MDBox
          sx={{
            position: "sticky",
            top: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          ml={{ xs: 0, md: 0, lg: 15, sm: 2.5 }}
        >
          <Card>
            <MDBox p={2} display="flex" justifyContent="flex-end">
              <MDButton
                variant="gradient"
                color="dark"
                size="small"
                iconOnly
                onClick={() => onClose(false)}
              >
                <Icon fontSize="small">close</Icon>
              </MDButton>
            </MDBox>
            <MDBox
              px={4}
              pb={3}
              display={{ sm: "block", xs: "block", md: "block", lg: "flex" }}
            >
              <MDBox
                mr={
                  certifCompletion !== `${baseURL}/api/null` ? 1 : 0
                }
                mb={1}
              >
                <img
                  src={finCourse}
                  alt="show my proof"
                  width="300px"
                  height="200px"
                  style={{ border: "4px solid #2b85eb" }}
                />
                <MDBox textAlign="center">
                  <MDTypography variant="body2" fontWeight="bold" color="dark">
                    My End Course Proof
                  </MDTypography>
                </MDBox>
              </MDBox>
              {certifCompletion !== `${baseURL}/api/null` && (
                <MDBox ml={1}>
                  <img
                    src={certifCompletion}
                    alt="show my proof"
                    width="300px"
                    height="200px"
                    style={{ border: "4px solid #2b85eb" }}
                  />
                  <MDBox textAlign="center">
                    <MDTypography
                      variant="body2"
                      fontWeight="bold"
                      color="dark"
                    >
                      My Certification Completion Proof
                    </MDTypography>
                  </MDBox>
                </MDBox>
              )}
            </MDBox>
          </Card>
        </MDBox>
      </Slide>
    </Modal>
  );
};
export default ProofModel;
