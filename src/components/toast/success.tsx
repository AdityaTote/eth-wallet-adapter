import { toast } from "react-toastify";
import React from "react";

export const showSuccessToast = (message: string) => {
	toast.success(message, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
		style: {
			background: "#1f2937",
			color: "#f9fafb",
			border: "1px solid #374151",
		},
	});
};

export const showSuccessToastWithTitle = (title: string, message: string) => {
	toast.success(
		<div>
			<div className="font-semibold text-sm">{title}</div>
			<div className="text-xs text-gray-300 mt-1">{message}</div>
		</div>,
		{
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			style: {
				background: "#1f2937",
				color: "#f9fafb",
				border: "1px solid #374151",
			},
		}
	);
};
