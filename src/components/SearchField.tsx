import { FC, useState, ChangeEvent } from "react";
import { InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import unit, { SxObject } from "@/helpers/unit";

interface Props {
  value?: string;
  size?: "small" | "medium";
  disabled?: boolean;
  iconOnLeft?: boolean;
  placeholder?: string;
  onChange: (text: string) => void;
  sx?: SxObject;
  characterLimit?: number;
  radius?: SxObject["borderRadius"];
}

const SearchField: FC<Props> = ({
  value,
  size = "small",
  onChange,
  disabled = false,
  iconOnLeft = false,
  placeholder = "Search",
  sx = {},
  characterLimit = 45,
  radius = unit(8),
}) => {
  const [query, setQuery] = useState(value || "");
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value.substring(0, characterLimit));
    setQuery(e.target.value.substring(0, characterLimit));
  }

  return (
    <OutlinedInput
      size={size}
      sx={{
        borderRadius: radius,
        "& input": {
          width: "100%",
          height: unit.dim(15),
          fontSize: unit.text(14),
        },
        paddingRight: "7px",
        ...sx,
      }}
      value={value !== undefined ? value : query}
      onChange={onChangeHandler}
      disabled={disabled}
      placeholder={placeholder}
      startAdornment={
        iconOnLeft && (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        )
      }
      endAdornment={
        !iconOnLeft && (
          <InputAdornment position="end" sx={{ cursor: "pointer" }}>
            <SearchIcon fontSize="small" />
          </InputAdornment>
        )
      }
    />
  );
};

export default SearchField;
