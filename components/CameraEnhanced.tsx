// components/CameraEnhanced.tsx
"use client";

import Webcam from "react-webcam";
import Image from "next/image";

import React, { useCallback, useRef, useState } from "react";

// fontawesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function Nav({
  capture,
  facingMode,
  setFacingMode,
  mirrored,
  setMirrored,
  setImage,
}: {
  capture: () => void;
  facingMode: string;
  setFacingMode: (mode: string) => void;
  mirrored: boolean;
  setMirrored: (mode: boolean) => void;
  setImage: (image: string | null) => void;
}) {
  // function to handle Upload
  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="absolute bottom-0 w-full px-10 mb-3 z-1">
      <div className="flex items-center justify-around">
        {/* Upload button */}
        <button
          className="w-24 h-10 bg-yellow-500 rounded-lg flex items-center justify-center px-4"
          onClick={handleUpload}
        >
          <FontAwesomeIcon icon={faUpload} className="text-white text-2xl" />
        </button>
        <button
          className="h-20 w-20 bg-white rounded-full flex items-center justify-center"
          onClick={capture}
        >
          <div className="h-18 w-18 rounded-full bg-black flex items-center justify-center">
            <div className="h-15 w-15 rounded-full bg-white"></div>
          </div>
        </button>
        <div className="flex items-center justify-between w-24">
          <button
            className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center px-4"
            // change inside outside camera
            onClick={() => {
              if (facingMode === "user") {
                setFacingMode("environment");
              } else {
                setFacingMode("user");
              }
            }}
          >
            <FontAwesomeIcon icon={faRotate} className="text-white text-2xl" />
          </button>
          <button
            className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center px-4"
            onClick={() => {
              setMirrored(!mirrored);
            }}
          >
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="text-white text-2xl"
            />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ShowImg({ image }: { image: string | null }) {
  return (
    <div className="absolute top-0 right-0 z-0">
      <div></div>
      {image && (
        <Image
          src={image}
          height={0}
          width={200}
          alt="Taken photo"
          className="rounded-bl-md shadow-lg"
        />
      )}
    </div>
  );
}

export default function CameraEnhanced() {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<string>("environment");
  const [mirrored, setMirrored] = useState<boolean>(false);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      setImage(image);
    }
  }, [webcamRef]);

  const videoConstraints = {
    facingMode: facingMode,
  };

  return (
    <div className="h-svh bg-gray-500">
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="h-full w-full object-cover"
        ref={webcamRef}
        mirrored={mirrored}
      ></Webcam>
      <Nav
        capture={capture}
        facingMode={facingMode}
        setFacingMode={setFacingMode}
        mirrored={mirrored}
        setMirrored={setMirrored}
        setImage={setImage}
      />
      <ShowImg image={image} />
    </div>
  );
}
