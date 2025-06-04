"use client";
// import Cross from "@/public/icons/cross";
// import {
//   Completed,
//   Remove,
//   Remove1,
//   Upload,
//   Upload2,
//   Uploadloading,
// } from "@/public/icons/dashboard";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { toast } from "@/components/ui/use-toast";
import Uploadlogo from "@/public/icon/uploadlogo";
import Cross from "@/public/icon/cross";
import { useCurrentLocale, useI18n } from "@/locales/client";
// import { useToast } from "./ui/use-toast";
const Singledoc = ({ file, onRemove, onUploadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [uploadedSize, setUploadedSize] = useState(0);
  const previewFile = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      //console.log(fileURL, "url");
      return fileURL;
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          const newProgress = prevProgress + 10;
          const newUploadedSize = (newProgress / 100) * file.size;
          setUploadedSize(newUploadedSize);
          return newProgress;
        } else {
          clearInterval(interval);
          setUploadedSize(file.size);
          return prevProgress;
        }
      });
    }, 300);
    return () => clearInterval(interval);
  }, [file.size, onUploadComplete, file.name]);
  useEffect(() => {
    if (progress >= 100) onUploadComplete(file.name); // Notify the parent component
  }, [progress]);
  const formatSize = (size) => {
    if (size < 1024) {
      return `${size.toFixed(2)} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };
  return (
    <div className=" relative h-[40px] w-[40px]    ">
      <div
        onClick={onRemove}
        className=" absolute right-0 top-0 cursor-pointer"
      >
        <Cross />
      </div>
      <div className=" flex items-center w-full gap-2   border-[#E4EAF0]">
        <img
          className="  h-[40px] object-cover w-[40px] "
          src={previewFile(file)}
        />
      </div>
    </div>
  );
};
const Documentupload = ({ index, imagesArray, setImagesArray }) => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isAllUploaded, setisAllUploaded] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});

  useEffect(() => {
    //console.log(imagesArray, "nnnnnnnnnnnnn");
  }, [imagesArray]);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (imagesArray[index]?.length + droppedFiles.length > 10) {
      toast({
        title: "Cannot add more than 10 files ",
      });
    } else {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...droppedFiles.slice(0, 10 - files.length),
      ]);
    }
  };

  const updateImagesArray = (newFiles) => {
    const newImagesArray = [...imagesArray];
    if (!Array.isArray(newImagesArray[index])) {
      newImagesArray[index] = [];
    }
    newImagesArray[index] = [
      ...newImagesArray[index],
      ...newFiles.slice(files.length),
    ];
    setImagesArray(newImagesArray);
  };

  const handleChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (imagesArray[index]?.length + selectedFiles.length > 10) {
      toast({
        title: "Cannot add more than 10 files at one time",
      });
    } else {
      const newFiles = [
        ...(imagesArray[index] || []),
        ...selectedFiles.slice(0, 10 - files.length),
      ];
      updateImagesArray(newFiles);
      setFiles((prevFiles) => [
        ...prevFiles,
        ...selectedFiles.slice(0, 10 - files.length),
      ]);
    }
  };

  const handleRemoveFile = (idx) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== idx));
    const newImagesArray = [...imagesArray];
    newImagesArray[index] = newImagesArray[index].filter((_, i) => i !== idx);
    setImagesArray(newImagesArray);
  };
  const handleUploadComplete = (fileName) => {
    //console.log("Upload complete", fileName);
    setUploadStatus((prevStatus) => ({
      ...prevStatus,
      [fileName]: true,
    }));
  };
  useEffect(() => {
    setisAllUploaded(
      files.length > 0 &&
        Object.keys(uploadStatus).length === files.length &&
        Object.values(uploadStatus).every((status) => status)
    );
  }, [uploadStatus, files.length]);

  useEffect(() => {
    setFiles([]);
  }, [index]);

  useEffect(() => {
    imagesArray.map((image, index) => {
      //console.log(image, index);
    });
  }, [imagesArray]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="  w-full h-full flex justify-center items-center"
    >
      <input
        multiple
        type="file"
        id="fileInput"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <div className="  relative flex flex-col h-full cursor-pointer border-[#F1F1F1] w-full rounded-xl bg-[#F7F8F9]  ">
        <div className="p-4 h-full flex flex-col gap-4">
          <div
            onClick={() => {
              fileInputRef.current.click();
            }}
            className={clsx(
              " w-full  flex  flex-col justify-between h-full items-center  rounded-2xl",
              !isDragging ? "" : "border-[#205FFF]"
            )}
          >
            <div className="font-Circular text-[#4B5563] mx-auto w-[250px] font-medium">
              <div className="flex items-center justify-center gap-2">
                <Uploadlogo />
                <div className="font-Polysans font-semibold text-[0.9rem] text-[#4B5563]">
                  {t("p116")}
                </div>
              </div>
              <div className="text-center text-[#9CA3AF] font-normal pt-2 text-[0.9rem]">
                {t("p117")}
              </div>
            </div>
          </div>
          <div className=" absolute top-0 left-0 flex flex-wrap gap-4">
            {imagesArray[index]?.length > 0 &&
              imagesArray[index].map((file, index) => (
                <Singledoc
                  key={index}
                  file={file}
                  onRemove={() => handleRemoveFile(index)}
                  onUploadComplete={handleUploadComplete}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Documentupload;
