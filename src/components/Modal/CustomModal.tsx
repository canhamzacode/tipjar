import { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface CustomModalProps {
  title?: string;
  show: boolean;
  onDismiss: () => void;
  children: ReactNode;
  subTitle?: string;
  width?: string;
  headerClassName?: string;
  customHeader?: ReactNode;
  modalClassName?: string;
  modalPosition?: string;
  footer?: ReactNode;
}

const CustomModal = ({
  title,
  show,
  onDismiss,
  children,
  subTitle,
  width = "600px",
  headerClassName,
  customHeader,
  modalClassName,
  modalPosition = "center",
  footer
}: CustomModalProps) => {
  if (!show) return null;

  let placementClass = "";
  let containerClass = "w-full";

  switch (modalPosition) {
    case "top-left":
      placementClass = "top-0 left-0";
      containerClass = "w-full flex justify-start";
      break;
    case "top-right":
      placementClass = "top-0 right-0";
      containerClass = "w-full flex justify-end";
      break;
    case "bottom-left":
      placementClass = "bottom-0 left-0";
      containerClass = "w-full flex justify-start";
      break;
    case "bottom-right":
      placementClass = "bottom-0 right-0";
      containerClass = "w-full flex justify-end";
      break;
    case "center":
      placementClass = "inset-0 flex items-center justify-center";
      break;
    default:
      placementClass = modalPosition;
  }

  const isSidePosition =
    modalPosition === "top-left" ||
    modalPosition === "top-right" ||
    modalPosition === "bottom-left" ||
    modalPosition === "bottom-right";

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
      <div
       className={`${containerClass} ${isSidePosition ? "h-screen overflow-y-auto" : "h-full"} ${placementClass}`}
      >
        <div
          className={`bg-white rounded-lg shadow-lg relative ${modalClassName}`}
          style={{ width: width, maxHeight: "100vh" }}
        >
          {!customHeader && (
            <div className={`flex p-6 items-center justify-between pb-4 border-b ${headerClassName}`}>
              <div>
                <h2 className="text-xl font-semibold">{title}</h2>
                {subTitle && <p className="text-sm text-gray-500 max-w-[568px] mt-2">{subTitle}</p>}
              </div>
              <AiOutlineClose
                className="text-2xl cursor-pointer"
                onClick={onDismiss}
              />
            </div>
          )}
          {customHeader}
          <div className="mt-4 px-6 pb-6 overflow-auto chatbot-scrollbar" style={{ maxHeight: "60vh" }}>
          {/* <div className="mt-4 px-6 pb-6 overflow-auto chatbot-scrollbar" > */}
            {children}
          </div>
          {footer && (
            <div className={`flex p-6 items-center justify-between pb-4 border-t ${headerClassName}`}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;