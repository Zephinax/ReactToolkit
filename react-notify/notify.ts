import { Slide, toast } from "react-toastify";
export const notify = (text: string, type: "success" | "error" | "warning") => {
  if (type === "success") {
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      toastId: "success_toast",
      transition: Slide,
    });
  }
  if (type === "error") {
    toast.error(text, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: "error_toast",
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
  }
  if (type === "warning") {
    toast.warn(text, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "warning_toast",
      theme: "colored",
      transition: Slide,
    });
  }
};
