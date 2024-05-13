import { FC, ElementType, ReactNode } from "react";
import { Stack, Dialog, DialogProps, StackProps } from "@mui/material";

import unit, { SxObject } from "@/helpers/unit";
import { Center, Text } from "@/components";

interface ModalProps extends Omit<DialogProps, "maxWidth"> {
  width?: SxObject["width"];
  minWidth?: SxObject["minWidth"];
  maxHeight?: SxObject["maxWidth"];
  borderRadius?: SxObject["borderRadius"];
  paperSx?: SxObject;
  closeOnBackdropClick?: boolean;
}

const Modal: FC<ModalProps> & {
  Actions: FC<StackProps>;
  Header: FC<StackProps>;
  Content: typeof ModalContent;
} = ({
  width,
  minWidth,
  borderRadius = unit(20),
  maxHeight = unit.dim(800),
  paperSx,
  onClose,
  closeOnBackdropClick,
  ...rest
}) => (
  <Dialog
    disableRestoreFocus
    sx={{
      "& .MuiPaper-root": {
        borderRadius,
        width,
        minWidth,
        maxHeight,
        ...paperSx,
      },
    }}
    {...rest}
    onClose={(e, reason) => {
      if ((reason !== "backdropClick" || closeOnBackdropClick) && onClose)
        onClose(e, reason);
    }}
  />
);

function ModalContent<C extends ElementType>({
  title,
  children,
  p = unit(20),
  px = unit(24),
  ...rest
}: StackProps<C, { component?: C; title?: ReactNode }>) {
  return (
    <Stack width="100%" height="100%" gap={unit(8)} p={p} px={px} {...rest}>
      {title && (
        <ModalHeader>
          {typeof title === "string" ? (
            <Text unitSize={20} weight="bold" children={title} lineHeight={1} />
          ) : (
            title
          )}
        </ModalHeader>
      )}
      {children}
    </Stack>
  );
}

const ModalHeader: FC<StackProps> = (props) => (
  <Center ai width="100%" direction="row" gap={1} {...props} />
);

const ModalActions: FC<StackProps> = (props) => (
  <Center direction="row" gap={unit(16)} justifyContent="end" {...props} />
);

Modal.Actions = ModalActions;
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
export default Modal;
