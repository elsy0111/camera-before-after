// components/CameraEnhanced.tsx
"use client";

import Webcam from "react-webcam";
import Image from "next/image";

import React, {useCallback, useRef, useState, useEffect} from "react";
import {Loader} from "lucide-react";

let WINDOW_WIDTH = 0;
let WINDOW_HEIGHT = 0;
if (typeof window !== "undefined") {
	WINDOW_WIDTH = window.innerWidth;
	WINDOW_HEIGHT = window.innerHeight;
}

// fontawesome icon
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faImage, faDownload, faArrowRightArrowLeft, faGhost, faMaximize, faCrosshairs} from "@fortawesome/free-solid-svg-icons";

export function NavUpper(
	{previewImageSize, setPreviewImageSize, opacity, setOpacity, centerImage}: {
		previewImageSize: number; setPreviewImageSize: (size: number) => void; opacity: number;
		setOpacity: (opacity: number) => void;
		centerImage: () => void;
	}) {
	return (
		<div className="absolute top-0 left-0 py-5 w-full px-5 flex items-center z-2 gap-5 bg-gray-800/30">
			{/* Center image button */}
			<div className="flex-0">
				<button
					className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center"
					onClick={centerImage}
				>
					<FontAwesomeIcon icon={faCrosshairs} className="text-white text-2xl" />
				</button>
			</div>
			{/* Size slider */}
			<div className="flex-1">
				<div className="flex items-center">
					<input
						type="range"
						min={0}
						max={WINDOW_WIDTH}
						value={previewImageSize}
						onChange={(e) => {
							setPreviewImageSize(parseInt(e.target.value));
						}}
						className="h-2 rounded-lg appearance-none cursor-pointer w-full"
						style={{
							background: `linear-gradient(to right, #4caf50 ${previewImageSize / WINDOW_WIDTH * 100}%, 
												 #bbb ${previewImageSize / WINDOW_WIDTH * 100}%)`,
						}}></input>
					{/* Size value */}
					<div className="text-white text-lg rotate-90 ml-2">
						<FontAwesomeIcon icon={faMaximize} className="text-white text-2xl" />
					</div>
				</div>
			</div>
			{/* Opacity slider */}
			<div className="flex-1">
				<div className="flex items-center">
					<input
						type="range"
						min={0}
						max={100}
						value={opacity} onChange={(e) => {
							setOpacity(parseInt(e.target.value));
						}}
						className="h-2 rounded-lg appearance-none cursor-pointer w-full"
						style={{
							background: `linear-gradient(to right, #4caf50 ${opacity}%, #bbb ${opacity}%)`,
						}}
					/>
					{/* Opacity value */}
					<div className="text-white text-lg rotate-90 ml-2">
						<FontAwesomeIcon icon={faGhost} className="text-white text-2xl" />
					</div>
				</div>
			</div>
		</div>
	);
}

export function Nav({
	capture,
	facingMode,
	setFacingMode,
	mirrored,
	setMirrored,
	image,
	setImage,
	isLoading,
}: {
	capture: () => void;
	facingMode: string;
	setFacingMode: (mode: string) => void;
	mirrored: boolean;
	setMirrored: (mode: boolean) => void;
	image: string | null;
	setImage: (image: string | null) => void;
	isLoading: boolean;
}) {
	const [isDownloading, setIsDownloading] = useState<boolean>(false);

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

	// function to handle Download
	const handleDownload = () => {
		if (image) {
			setIsDownloading(true);
			setTimeout(() => {
				const link = document.createElement("a");
				link.href = image;
				link.download = `image_${new Date().toISOString()}.png`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				setTimeout(() => {
					setIsDownloading(false);
				}, 500);
			}, 10);
		}
	}

	return (
		<div className="absolute bottom-0 w-full px-5 z-2 py-3 bg-gray-800/30">
			<div className="grid grid-cols-5 items-center gap-10">
				{/* Upload button */}
				<button
					className="h-10 bg-yellow-500 rounded-lg flex items-center justify-center px-5"
					onClick={handleUpload}
				>
					<FontAwesomeIcon icon={faImage} className="text-white text-2xl rotate-90" />
				</button>
				{/* Download button */}
				<button
					className="h-10 bg-green-500 rounded-lg flex items-center justify-center px-5 disabled:bg-green-800"
					onClick={handleDownload}
					disabled={isDownloading}
				>
					{isDownloading ? (
						<div className="flex items-center">
							<Loader className="h-6 w-6 text-white animate-spin" />
						</div>
					) : (
						<FontAwesomeIcon icon={faDownload} className="text-white text-2xl rotate-90" />
					)}
				</button>
				{/* Capture button */}
				<div className="justify-self-center">
					<button
						className="h-20 w-20 bg-white rounded-full flex items-center justify-center disabled:opacity-50"
						onClick={capture}
						disabled={isLoading}
					>
						{isLoading ? (
							<Loader className="h-10 w-10 text-black animate-spin" />
						) : (
							<div className="h-18 w-18 rounded-full bg-black flex items-center justify-center">
								<div className="h-15 w-15 rounded-full bg-white"></div>
							</div>
						)}
					</button>
				</div>
				{/* Change camera button */}
				<button
					className="h-10 bg-red-500 rounded-lg flex items-center justify-center px-5"
					// change inside outside camera
					onClick={() => {
						setFacingMode(facingMode === "user" ? "environment" : "user");
					}}
				>
					<FontAwesomeIcon icon={faCamera} className="text-white text-2xl rotate-90" />
				</button>
				{/* Mirror button */}
				<button
					className="h-10 bg-blue-500 rounded-lg flex items-center justify-center px-5"
					onClick={() => {
						setMirrored(!mirrored);
					}}
				>
					<FontAwesomeIcon
						icon={faArrowRightArrowLeft}
						className="text-white text-2xl rotate-90"
					/>
				</button>
			</div>
		</div>
	);
}

export function ShowImg({image, imageSize, opacity
	, position, setPosition
}: {
	image: string | null; imageSize: number; opacity: number;
	position: {x: number, y: number}; setPosition: (position: {x: number, y: number}) => void;
}) {
	const isDragging = useRef<boolean>(false);
	const offset = useRef({x: 0, y: 0});

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		isDragging.current = true;
		offset.current = {
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		};
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging.current) return;
		setPosition({
			x: e.clientX - offset.current.x,
			y: e.clientY - offset.current.y,
		});
	};

	const handleMouseUp = () => {
		isDragging.current = false;
	};

	// タッチ用イベント
	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		isDragging.current = true;
		const touch = e.touches[0];
		offset.current = {
			x: touch.clientX - position.x,
			y: touch.clientY - position.y,
		};
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		if (!isDragging.current) return;
		const touch = e.touches[0];
		setPosition({
			x: touch.clientX - offset.current.x,
			y: touch.clientY - offset.current.y,
		});
	};

	const handleTouchEnd = () => {
		isDragging.current = false;
	};

	return (
		<div className="z-1 touch-none"
			style={{
				position: "absolute",
				top: position.y,
				left: position.x,
				cursor: "grab",
			}}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{image && (
				<Image
					src={image}
					height={imageSize}
					width={imageSize}
					alt="Taken photo"
					className="rounded-md shadow-md shadow-black/50 max-w-screen max-h-screen"
					style={{opacity: opacity / 100}}
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
	const [previewImageSize, setPreviewImageSize] = useState<number>(200);
	const [opacity, setOpacity] = useState<number>(100);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [position, setPosition] = useState<{x: number, y: number}>({x: 0, y: 0});

	const capture = useCallback(() => {
		setIsLoading(true); // Set loading to true when capture starts
		setTimeout(() => { // Adding a setTimeout to ensure UI updates before taking the screenshot
			if (webcamRef.current) {
				const image = webcamRef.current.getScreenshot();
				setImage(image);
			}
			setIsLoading(false); // Set loading to false when image is captured
		}, 10);
	}, [webcamRef]);

	// Function to center the image in the webcam view
	const centerImage = useCallback(() => {
		// Get the actual webcam container dimensions if available
		let webcamHeight = WINDOW_HEIGHT;
		let webcamWidth = WINDOW_WIDTH;

		if (webcamRef.current) {
			const webcamContainer = webcamRef.current.video;
			if (webcamContainer) {
				webcamHeight = webcamContainer.clientHeight;
				webcamWidth = webcamContainer.clientWidth;
			}
		}

		// Calculate the center position based on webcam dimensions
		const centerX = 0;
		const centerY = WINDOW_HEIGHT / 2 - webcamHeight / 2;

		// width 100%
		setPreviewImageSize(webcamWidth);

		setPosition({
			x: centerX,
			y: centerY
		});
	}, [previewImageSize]);

	const videoConstraints = {
		facingMode: facingMode,
		height: 1080, // FHD
		width: 1920,
	};

	const [isClient, setIsClient] = useState(false);

	// クライアント側のみ実行される
	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return <div className="h-screen flex items-center justify-center text-5xl">Loading...</div>;
	}

	return (
		<div className="h-svh bg-gray-500">
			<NavUpper previewImageSize={previewImageSize} setPreviewImageSize={setPreviewImageSize} opacity={opacity}
				setOpacity={setOpacity}
				centerImage={centerImage}
			/>
			{/* Webcam component */}
			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
				<Webcam
					audio={false}
					screenshotFormat="image/png"
					videoConstraints={videoConstraints}
					forceScreenshotSourceSize={true}
					ref={webcamRef}
					mirrored={mirrored}
					screenshotQuality={1}
				></Webcam>
			</div>
			<Nav
				capture={capture}
				facingMode={facingMode}
				setFacingMode={setFacingMode}
				mirrored={mirrored}
				setMirrored={setMirrored}
				image={image}
				setImage={setImage}
				isLoading={isLoading}
			/>
			<ShowImg image={image} imageSize={previewImageSize} opacity={opacity}
				position={position}
				setPosition={setPosition} />
		</div>
	);
}
