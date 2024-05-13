import { styled } from "@mui/material/styles";

// local imports
import Text, { TextProps } from "@/components/Text";

export interface PProps extends TextProps {
  lineClamp?: number;
  wordBreak?: "normal" | "break-all" | "keep-all" | "break-word";
}

/* This is typography component that does not overflow text */
const P = styled(({ lineClamp, wordBreak = "normal", ...props }: PProps) => (
  <Text
    width={props.width || "96%"}
    onMouseEnter={(e) => {
      if (
        e.currentTarget.offsetWidth < e.currentTarget.scrollWidth &&
        typeof props.children === "string"
      ) {
        e.currentTarget.title = props.title || props.children;
      }
    }}
    onMouseLeave={(e) => {
      e.currentTarget.title = "";
    }}
    sx={{
      ...(wordBreak === "normal" && { whiteSpace: "nowrap" }),
      ...(lineClamp && {
        display: "-webkit-box",
        WebkitLineClamp: lineClamp.toString(),
        WebkitBoxOrient: "vertical",
        whiteSpace: "normal",
      }),
      wordBreak,
    }}
    {...props}
  />
))(() => ({ textOverflow: "ellipsis", overflow: "hidden" }));

export default P;
