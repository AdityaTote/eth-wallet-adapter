import { toast } from "react-toastify";
import React from "react";

export const showErrorToast = (message: string) => {
	toast.error(message, {
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
			border: "1px solid #dc2626",
		},
	});
};

export const showErrorToastWithTitle = (title: string, message: string) => {
	toast.error(
		<div>
			<div className="font-semibold text-sm">{title}</div>
			<div className="text-xs text-gray-300 mt-1">{message}</div>
		</div>,
		{
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			style: {
				background: "#1f2937",
				color: "#f9fafb",
				border: "1px solid #dc2626",
			},
		}
	);
};
