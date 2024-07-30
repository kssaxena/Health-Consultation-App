import { toast } from "react-custom-alert";
// import "react-custom-alert/dist/index.css"; // import css file from root.

export const alertInfo = (msg) => toast.info(msg);
export const alertOk = (msg) => toast.success(msg);
export const alertError = (msg) => toast.error(msg);
