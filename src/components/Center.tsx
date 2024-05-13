import { ElementType, Ref, forwardRef, ReactElement } from "react";
import { Stack, StackProps } from "@mui/material";
import { SxObject } from "@/helpers";

type CenterElement = <C extends ElementType>(
  props: StackProps<
    C,
    { component?: C; jc?: boolean; ai?: boolean; cursor?: SxObject["cursor"] }
  >,
  ref?: Ref<HTMLDivElement>
) => ReactElement;

const Center: CenterElement = (props, ref) => {
  const { jc, ai, cursor, sx, ...rest } = props;
  return (
    <Stack
      ref={ref}
      {...(!jc && { alignItems: "center" })}
      {...(!ai && { justifyContent: "center" })}
      sx={{ cursor, ...sx }}
      {...rest}
    />
  );
};

const ForwardedCenter = forwardRef(Center) as CenterElement;

export default ForwardedCenter;
