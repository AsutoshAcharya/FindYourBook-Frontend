import { ElementType, Ref, forwardRef, ReactElement } from "react";
import { Box, BoxProps } from "@mui/material";
import { SxObject } from "@/helpers/unit";

export interface SquareProps<C> {
  size: SxObject["width"];
  radius?: SxObject["borderRadius"];
  bg?: string;
  component?: C;
}

type SquareElement = <C extends ElementType>(
  props: BoxProps<C, SquareProps<C>>,
  ref?: Ref<HTMLDivElement>
) => ReactElement;

const SquareFC: SquareElement = (props, ref) => {
  const { size, radius, bg, ...rest } = props;
  return (
    <Box
      ref={ref}
      minWidth={size}
      minHeight={size}
      width={size}
      height={size}
      borderRadius={radius}
      bgcolor={bg}
      {...rest}
    />
  );
};

const Square = forwardRef(SquareFC) as SquareElement;

export default Square;
