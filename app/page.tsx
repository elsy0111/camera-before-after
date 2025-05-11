// app/page.tsx
"use client";
import CameraEnhanced from "@/components/CameraEnhanced";
import {useEffect} from "react";

export default function Home() {
	// Zoom 禁止！！！！！！！
	useEffect(() => {
		const preventZoom = (e: TouchEvent) => {
			if (e.touches.length > 1) {
				e.preventDefault();
			}
		};
		const preventGesture = (e: Event) => {
			e.preventDefault();
		};

		document.addEventListener("touchstart", preventZoom, {passive: false});
		document.addEventListener("gesturestart", preventGesture);

		return () => {
			document.removeEventListener("touchstart", preventZoom);
			document.removeEventListener("gesturestart", preventGesture);
		};
	}, []);

	return (
		<div>
			<CameraEnhanced />
		</div>
	);
}
