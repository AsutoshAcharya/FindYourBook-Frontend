import {
  FC,
  ElementType,
  Fragment,
  ReactElement,
  createElement,
  Children,
} from "react";
import { BoxProps } from "@mui/material";

interface MatchProps<C> {
  test: string | number;
  component?: C;
}

/* This is just a fancy Switch case statement for rendering components
 * <Match
 *   test="second"
 *   component={Stack} // Now its a Stack with matching component as child
 *   // any number of StackProps can now be provided
 * >
 *   <Match.Case value="first">
 *     <First />
 *   </Match.Case>
 *   <Match.Case value="second">
 *     <Second />
 *   </Match.Case>
 *   <Match.Case value="third">
 *     <Third />
 *   </Match.Case>
 * </Match> */
function Match<C extends ElementType>({
  test,
  component,
  children,
  ...rest
}: BoxProps<C, MatchProps<C>>) {
  const child = Children.toArray(children).find(
    (kid) => (kid as any)?.props?.value === test
  );
  return createElement(component || Fragment, component ? rest : {}, child);
}

type CaseProps = { value: string | number; children: ReactElement };
const Case: FC<CaseProps> = ({ children }) => children;

Match.Case = Case;

export default Match;
