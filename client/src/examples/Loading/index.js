import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

import MDBox from "components/MDBox";
const Loading = () => {
  return (
    <Modal open={true} sx={{ background: "#6cb0fd" }} disableAutoFocus={true}>
      <MDBox sx={{ position: "absolute", top: "45%", right: "50%" }}>
        <CircularProgress color="light" thickness={4} />
      </MDBox>
    </Modal>
  );
};
export default Loading;
