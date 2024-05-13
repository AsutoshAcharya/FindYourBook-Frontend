import {
  Fragment,
  ElementType,
  ReactNode,
  ReactElement,
  createElement,
  ComponentPropsWithRef,
  Ref,
  forwardRef,
} from "react";
import { SxProps } from "@mui/system";
import BLoader from "./BlurryLoader";

interface LoadingProps<C> {
  on: boolean;
  component?: C;
  Loader?: ReactNode;
  loaderSx?: SxProps & { size?: number };
}

type LoadingElement = <C extends ElementType>(
  props: ComponentPropsWithRef<C> & LoadingProps<C>,
  ref?: Ref<HTMLElement>
) => ReactElement;

const LoadingFC: LoadingElement = (props, ref) => {
  const {
    on,
    component,
    children,
    Loader,
    loaderSx = { height: "90%", width: "100%" },
    ...rest
  } = props;
  return createElement(
    component || Fragment,
    component ? { ...rest, ref } : {},
    on ? Loader || <BLoader sx={loaderSx} size={loaderSx?.size} /> : children
  );
};

const Loading = forwardRef(LoadingFC) as LoadingElement;
export default Loading;
