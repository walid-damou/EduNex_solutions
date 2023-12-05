import { createContext, useContext, useReducer, useMemo } from "react";
import React from "react";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material Dashboard 2 React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    case "REQUESTMODEL": {
      return { ...state, openRequestModel: action.value };
    }
    case "FORCEUPDATE": {
      return { ...state, updater: action.value };
    }
    case "PROOFPREVIEW": {
      return { ...state, openProofModel: action.value };
    }
    case "PROOFFILE": {
      return { ...state, fileProofModel: action.value };
    }
    case "PROOFCOLLAB": {
      return { ...state, collabProofModel: action.value };
    }
    case "OPENSELECTCOLLABS": {
      return { ...state, openSelectCollabs: action.value };
    }
    case "ACCOUNTTYPE": {
      return { ...state, accountType: action.value };
    }
    case "TYPELOADING": {
      return { ...state, loadingType: action.value };
    }
    case "PASSWORDCHANGED": {
      return { ...state, changedPassword: action.value };
    }
    case "NOTIFICATIONS": {
      return { ...state, changedNotif: action.value };
    }
    case "USERID": {
      return { ...state,userId: action.value };}
    case "TOASTINFOS": {
      return { ...state, toastInfos: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: false,
    fixedNavbar: true,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
    updater: false,
    openRequestModel: false,
    openProofModel: false,
    fileProofModel: { name: "", size: 0, type: "file/png" },
    collabProofModel: null,
    loadingProofModel: false,
    openSelectCollabs: false,
    loadingType: "init",
    accountType: false,
    changedPassword: false,
    changedNotif: 0,
    userId: false,
    toastInfos: { color: "", message: "" },
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <React.StrictMode>
      <MaterialUI.Provider value={value}> {children} </MaterialUI.Provider>
    </React.StrictMode>
  );
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) =>
  dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) =>
  dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });
const setDirection = (dispatch, value) =>
  dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const setUpdater = (dispatch, value) =>
  dispatch({ type: "FORCEUPDATE", value });
const setOpenRequestModel = (dispatch, value) =>
  dispatch({ type: "REQUESTMODEL", value });
const setOpenProofModel = (dispatch, value) =>
  dispatch({ type: "PROOFPREVIEW", value });
const setfileProofModel = (dispatch, value) =>
  dispatch({ type: "PROOFFILE", value });
const setcollabProofModel = (dispatch, value) =>
  dispatch({ type: "PROOFCOLLAB", value });
const setOpenSelectCollabs = (dispatch, value) =>
  dispatch({ type: "OPENSELECTCOLLABS", value });
const setTypeLoading = (dispatch, value) =>
  dispatch({ type: "TYPELOADING", value });
const setAccountType = (dispatch, value) =>
  dispatch({ type: "ACCOUNTTYPE", value });
const setChangedPassword = (dispatch, value) =>
  dispatch({ type: "PASSWORDCHANGED", value });
const setChangedNotif = (dispatch, value) =>
  dispatch({ type: "NOTIFICATIONS", value });
const setToastInfos = (dispatch, value) =>
  dispatch({ type: "TOASTINFOS", value });

const setUserId = (dispatch, value) =>
  dispatch({ type: "USERID", value });
export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setDirection,
  setLayout,
  setDarkMode,
  setUpdater,
  setOpenRequestModel,
  setOpenProofModel,
  setcollabProofModel,
  setfileProofModel,
  setOpenSelectCollabs,
  setChangedPassword,
  setAccountType,
  setTypeLoading,
  setChangedNotif,
 setToastInfos,
	setUserId,
};
