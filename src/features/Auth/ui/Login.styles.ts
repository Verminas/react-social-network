type Position = "relative" | "absolute" | "fixed" | "static" | "sticky";

export const formStyles: { [key: string]: string | Position } = {
  maxWidth: "400px",
  width: "100%",
  padding: "30px 20px 25px",
  backgroundColor: "white",
  borderRadius: "10px",
  position: "absolute", // Указание типа Position
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  boxShadow: "0px 0px 20px #80808045",
};
export const checkBoxStyles = { fontSize: "16px" };
export const buttonStyles = { fontSize: "18px", width: "100%" };
