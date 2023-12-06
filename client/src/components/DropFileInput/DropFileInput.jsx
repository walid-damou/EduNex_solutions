import React, { useRef, useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import "./drop-file-input.css";

import { ImageConfig } from "./config/ImageConfig";
import uploadImg from "../../assets/images/cloud-upload-regular-240.png";
import { Icon } from "@mui/material";

const DropFileInput = ({ onFileChange, name, title, required, accept }) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <>
      <MDBox
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <MDBox className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>{title}</p>
        </MDBox>
        <input
          type="file"
          value=""
          name={name}
          required={required}
          onChange={onFileDrop}
          accept={accept}
        />
      </MDBox>
      {fileList.length > 0 ? (
        <MDBox className="drop-file-preview">
          {[fileList[0]].map((item, index) => (
            <MDBox key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
              />
              <MDBox className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </MDBox>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                <Icon>close</Icon>
              </span>
            </MDBox>
          ))}
        </MDBox>
      ) : null}
    </>
  );
};

export default DropFileInput;
