import { FC, Fragment, createElement, ReactNode } from "react";
import { Stack, Avatar, AvatarProps } from "@mui/material";
import { toAvatar, SxObject, unit } from "@/helpers";
import Square, { SquareProps } from "@/components/Square";

interface Props extends AvatarProps {
  name: string | ReactNode;
  size?: SxObject["width"];
  bg?: string;
  dotBg?: string;
  dotProps?: SquareProps<"div">;
}

const UserAvatar: FC<Props> = ({
  name,
  size,
  bg,
  dotBg,
  dotProps = {},
  sx = {},
  ...rest
}) =>
  createElement(
    dotBg ? Stack : Fragment,
    dotBg ? { position: "relative" } : {},
    <Avatar
      alt={typeof name === "string" ? name : "Avatar"}
      sx={{
        bgcolor: bg || "primary.main",
        fontWeight: 600,
        fontSize: "1rem",
        ...(size && { width: size, height: size }),
        ...sx,
      }}
      {...rest}
      children={typeof name === "string" ? toAvatar(name) : name}
    />,
    dotBg && (
      <Square
        bg={dotBg}
        radius="50%"
        position="absolute"
        left={unit.dim(35)}
        bottom={unit.dim(4)}
        {...{ size: unit.dim(12), ...dotProps }}
      />
    )
  );

export default UserAvatar;
