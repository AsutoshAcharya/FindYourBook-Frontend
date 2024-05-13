import { FC, ReactNode } from "react";
import Text, { TextProps } from "@/components/Text";

interface Props extends TextProps {
  label: ReactNode;
  withAsterisk?: boolean;
}

const Label: FC<Props> = ({ label, withAsterisk, ...rest }) => (
  <Text
    width="100%"
    sx={withAsterisk ? { "&:after": { content: "' *'" } } : undefined}
    variant="caption"
    unitSize={14}
    color="grey.600"
    {...rest}
  >
    {label}
  </Text>
);

export default Label;
