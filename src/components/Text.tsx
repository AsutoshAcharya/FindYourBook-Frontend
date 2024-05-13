import { ElementType, Ref, forwardRef, ReactElement } from "react";
import { Typography, TypographyProps } from "@mui/material";
import { unit, orUndef, SxObject } from "@/helpers";

export interface TextProps<C extends ElementType = "span">
  extends TypographyProps {
  weight?: TypographyProps["fontWeight"];
  size?: TypographyProps["fontSize"];
  unitSize?: number;
  component?: C;
  underline?: "hover" | "always" | "never";
  cursor?: SxObject["cursor"];
}

type TextElement = <C extends ElementType>(
  props: TextProps<C>,
  ref?: Ref<HTMLElement>
) => ReactElement;

const Text: TextElement = (props, ref) => {
  const { weight, cursor, size, unitSize, underline, sx, ...rest } = props;
  return (
    <Typography
      ref={ref}
      fontWeight={weight}
      fontSize={unitSize ? unit.text(unitSize) : size}
      sx={{
        cursor,
        textDecoration: orUndef(underline === "always", "underline"),
        ...(underline === "hover" && {
          "&:hover": { textDecoration: "underline" },
        }),
        ...sx,
      }}
      {...rest}
    />
  );
};

const ForwardedText = forwardRef(Text) as TextElement;
export default ForwardedText;
