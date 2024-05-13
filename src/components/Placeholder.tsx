import { FC } from "react";
import { Box, BoxProps, Skeleton } from "@mui/material";

interface Props extends BoxProps {
  w: BoxProps["width"];
  h: BoxProps["height"];
  v?: "rounded" | "circular";
}

const Placeholder: FC<Props> = ({ w, h, v = "rounded", ...rest }) => (
  <Box component={Skeleton} width={w} height={h} variant={v} {...rest} />
);

export default Placeholder;
