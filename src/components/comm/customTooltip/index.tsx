import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses,TooltipProps } from "@mui/material/Tooltip";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "24px",
    borderRadius: "16px",
    fontSize: "16px",
    lineHeight: "100%",
    boxShadow: "0 0 4px #dfdfdf",
    minWidth: "max-content",
  },
}));
