import "./style/ProofPreview.css";
import { ImageConfig } from "./config/ImageConfig";

// @mui material components
import Card from "@mui/material/Card";

// Icons
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import axiosAuth from "services/authAxios";
import { acceptProofRoute, refuseProofRoute, baseURL } from "utils/APIRoutes";
import { useMaterialUIController, setUpdater } from "context";

const ProofPreview = ({ closeProofModel, collab, file }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { updater } = controller;

  const Accept = async (e) => {
    const { data } = await axiosAuth.post(acceptProofRoute, {
      id: e,
    });
    if (data.status) {
      setUpdater(dispatch, !updater);
      closeProofModel(false);
    }
  };
  const Decline = async (e) => {
    const { data } = await axiosAuth.post(refuseProofRoute, {
      id: e,
    });
    if (data.status) {
      setUpdater(dispatch, !updater);
      closeProofModel(false);
    }
  };

  return (
    <Card>
      <MDBox
        mx={2}
        mt={2}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        display="flex"
        justifyContent="space-between"
      >
        <MDTypography variant="h6" color="white" ml={1}>
          Proof Preview of {collab}
        </MDTypography>
        <MDButton
          variant="gradient"
          color="dark"
          size="small"
          iconOnly
          onClick={() => closeProofModel(false)}
        >
          <Icon fontSize="small">close</Icon>
        </MDButton>
      </MDBox>

      <MDBox p={2}>
        <MDBox className="proof_preview_item">
          <img
            src={ImageConfig[file.type.split("/")[1]] || ImageConfig["default"]}
            alt=""
          />
          <MDBox className="proof_preview_item_info">
            <p>{file.name}</p>
            <p>{file.size}B</p>
          </MDBox>
          <a
            href={`${baseURL}/${file.path}`}
            download={file.name}
            target="_blank"
            rel="noreferrer"
          >
            <span className="proof_preview_item_download">
              <Icon>preview</Icon>
              &nbsp; Open
            </span>
          </a>
        </MDBox>
        <MDBox mt={4} display="flex" justifyContent="center">
          <MDButton
            variant="gradient"
            color="success"
            sx={{ width: "30%", mr: "5px" }}
            onClick={() => {
              Accept(file.id);
            }}
          >
            Accept
          </MDButton>

          <MDButton
            variant="gradient"
            color="primary"
            sx={{ width: "30%", ml: "5px" }}
            onClick={() => Decline(file.id)}
          >
            Decline
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default ProofPreview;
