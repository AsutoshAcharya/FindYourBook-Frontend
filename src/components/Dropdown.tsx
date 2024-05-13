import {
  createElement,
  ReactElement,
  ElementType,
  useState,
  MouseEventHandler,
  MouseEvent,
} from "react";
import {
  Box,
  BoxProps,
  Menu,
  MenuProps,
  MenuItem,
  MenuItemProps,
} from "@mui/material";
import { menuPropsStyles } from "helpers/styles";
import { SxObject } from "helpers/unit";

export type DropdownItem<T = any> = {
  label: string;
  props?: Omit<MenuItemProps, "onClick">;
  onClick?: (event: MouseEvent, closeDropdown: () => void) => void;
  renderContent?: (
    item: DropdownItem<T>,
    closeDropdown: () => void
  ) => ReactElement;
  renderItem?: (
    item: DropdownItem<T>,
    idx: number,
    closeDropdown: () => void
  ) => ReactElement;
  data?: T;
};

function Dropdown<C extends ElementType, T = any>({
  data,
  renderItem,
  menuProps,
  keepOpen,
  menuSx = {},
  smallMenu,
  component,
  ...rest
}: BoxProps<
  C,
  {
    component?: C;
    data: Array<DropdownItem<T>>;
    renderItem?: (
      item: DropdownItem<T>,
      idx: number,
      closeDropdown: () => void
    ) => ReactElement;
    menuProps?: Omit<MenuProps, "anchorEl" | "open" | "onClose">;
    menuSx?: SxObject;
    keepOpen?: boolean;
    smallMenu?: boolean;
  }
>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  function closeDropdown() {
    setAnchorEl(null);
  }
  function getOnClick(item: DropdownItem): MouseEventHandler {
    if (item.onClick) {
      return (event) => {
        item.onClick && item.onClick(event, closeDropdown);
        !keepOpen && closeDropdown();
      };
    }
    return () => closeDropdown();
  }

  return (
    <>
      {createElement(component || Box, {
        ...rest,
        role: "button",
        onClick: (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget),
      })}
      <Menu
        sx={{ ...menuPropsStyles({ smallSize: smallMenu }), ...menuSx }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        {...menuProps}
      >
        {data.map((item: DropdownItem, idx: number) =>
          renderItem ? (
            renderItem(item, idx, closeDropdown)
          ) : item.renderItem ? (
            item.renderItem(item, idx, closeDropdown)
          ) : (
            <MenuItem
              key={item.label}
              onClick={getOnClick(item)}
              {...(item.props || {})}
            >
              {item.renderContent
                ? item.renderContent(item, closeDropdown)
                : item.label}
            </MenuItem>
          )
        )}
      </Menu>
    </>
  );
}

export default Dropdown;
