import { Fragment, KeyboardEvent, Ref, forwardRef } from "react";
import { TextFieldProps, TypographyProps } from "@mui/material";

import { RoundedTextField } from "@/components";
import { Some, unit, SxObject } from "@/helpers";

interface BasicTextFieldProps {
  ref?: Ref<HTMLInputElement>;
  labelProps?: TypographyProps;
  height?: SxObject["height"];
  showCharacterLimit?: boolean;
}

const BasicTextField = forwardRef(
  (props: BasicTextFieldProps & TextFieldProps, ref: Ref<HTMLInputElement>) => {
    const {
      label,
      labelProps = {},
      size = "small",
      type,
      height = unit.dim(46),
      showCharacterLimit,
      sx,
      ...rest
    } = props;
    return (
      <Fragment>
        {/* {label && (
          <Label label={label} withAsterisk={props.required} {...labelProps} />
        )} */}
        <RoundedTextField
          ref={ref}
          size={size}
          type={type}
          sx={{
            //"& .MuiInputBase-root": { borderRadius: unit(6), border: 0 },
            "& .MuiInputBase-inputMultiline": { padding: "0 !important" },
            "& .MuiInputBase-formControl": {
              //border: 0,
              borderColor: "grey.500",
              borderRadius: unit(6),
            },
            "& .MuiInputBase-input": {
              borderRadius: unit(6),
              height,
              padding: "0 12px",
              fontSize: unit.text(16),
              "&::placeholder": { fontSize: unit.text(14) },
            },
            "& fieldset": {
              border: 1,
              outline: "none",
              borderColor: "grey.500",
            },
            "& .MuiFormHelperText-root": {
              fontSize: unit.text(12),
              mt: unit(4),
              lineHeight: 1,
            },
            ...sx,
          }}
          autoCorrect="off"
          spellCheck={false}
          {...(type === "number" && {
            onKeyDown: (e: KeyboardEvent) => {
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
            },
          })}
          {...(rest.inputProps?.maxLength &&
            showCharacterLimit &&
            getCharLimitProps(rest?.value, rest?.inputProps?.maxLength))}
          {...rest}
        />
      </Fragment>
    );
  }
);

function getCharLimitProps(value: any, maxLength: number) {
  let length = Some.Number(value?.length);
  return {
    helperText: length + " / " + maxLength,
    error: length === maxLength,
  };
}

export default BasicTextField;
