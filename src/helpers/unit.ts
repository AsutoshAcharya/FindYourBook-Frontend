import { CSSObject } from "@mui/material";

export type SxObject = {
  [K in keyof CSSObject]: CSSObject[K] | ResponsiveSize;
};

export type ResponsiveSize = {
  xs?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

function unit(size: number, fixed: ResponsiveSize = {}): ResponsiveSize {
  return { ...getSize(size / 8), ...fixed };
}

function getSize(
  size: number,
  xsRatio: number = 0.8,
  mdRatio: number = 0.66, // 1280 -> 1920 with 150% scaling
  lgRatio: number = 0.71, // 1368x768
  xlRatio: number = 0.8,
  xxlRatio: number = 1 // 1920x1080
): ResponsiveSize {
  let xs = size * xsRatio;
  let md = size * mdRatio;
  let lg = size * lgRatio;
  let xl = size * xlRatio;
  let xxl = size * xxlRatio;
  return { xs, md, lg, xl, xxl };
}

// extra core functions
unit.text = function (size: number): ResponsiveSize {
  let xsRatio = 0.65;
  let mdRatio = 0.8;
  let lgRatio = 0.8;
  let xlRatio = 0.9;
  let xxlRatio = 1.1;
  return getSize(size, xsRatio, mdRatio, lgRatio, xlRatio, xxlRatio);
};

unit.dim = function (size: number, fixed: ResponsiveSize = {}): ResponsiveSize {
  return { ...getSize(size), ...fixed };
};

// custom functions
unit.scale = function (ratio: ResponsiveSize = {}) {
  return {
    transform: {
      xs: `scale(${ratio?.xs || 0.7})`,
      lg: `scale(${ratio?.lg || 0.8})`,
      xl: `scale(${ratio?.xl || 0.9})`,
      xxl: `scale(${ratio?.xxl || 1})`,
    },
  };
};

unit.wh = function (size: number, method: "dim" | "text" = "dim") {
  let dim = unit[method](size);
  return { height: dim, width: dim };
};

export default unit;
