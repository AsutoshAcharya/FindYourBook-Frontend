import { FC } from "react";
import { CircularProgress, Stack, StackProps } from "@mui/material";

interface Props extends StackProps {
  size?: number;
}

const BlurryLoader: FC<Props> = ({ size = 30, sx = {}, ...rest }) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    sx={{
      bgcolor: "transparent",
      backdropFilter: "blur(20px)",
      backgroundImage:
        "linear-gradient(135deg,rgb(255 255 255 / 80%) 0%,rgb(0 0 0 / 0%) 100%)",
      ...sx,
    }}
    {...rest}
  >
    <CircularProgress size={size} />
  </Stack>
);

export default BlurryLoader;
