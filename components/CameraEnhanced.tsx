// components/CameraEnhanced.tsx
"use client";

import Webcam from "react-webcam";
import Image from "next/image";

import React, { useCallback, useRef, useState } from "react";

const videoConstraints = {
  facingMode: "user",
};
export function Nav({ capture }: { capture: () => void }) {
  return (
    <div className="absolute bottom-0 w-full px-10 mb-3 z-1">
      <div className="flex items-center justify-between gap-4">
        <div className="w-20 h-10 bg-yellow-500 rounded-lg flex items-center justify-between px-4">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <button
          className="h-20 w-20 bg-white rounded-full flex items-center justify-center"
          onClick={capture}
        >
          <div className="h-18 w-18 rounded-full bg-black flex items-center justify-center">
            <div className="h-15 w-15 rounded-full bg-white"></div>
          </div>
        </button>
        <div className="w-20 h-10 bg-red-500 rounded-lg flex items-center justify-between px-4">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
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
          className="rounded-bl-lg shadow-lg"
        />
      )}
    </div>
  );
}

export default function CameraEnhanced() {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      setImage(image);
    }
  }, [webcamRef]);

  return (
    <div className="h-svh bg-gray-500">
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="h-full w-full object-cover"
        ref={webcamRef}
        mirrored={true}
      ></Webcam>
      <Nav capture={capture} />
      <ShowImg image={image} />
    </div>
  );
}
