import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const RoundedTextField = styled(TextField)(({ theme }) => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": { MozAppearance: "textfield" },
  "& .MuiOutlinedInput-root": { borderRadius: 8, border: 0 },
  "& .MuiOutlinedInput-input": { border: 0 },
  "& .MuiOutlinedInput-root:not(:focus-within):hover": {
    "& > fieldset": {
      border: 1,
      borderStyle: "solid",
      borderColor: theme.palette.grey[300],
      outline: "none",
    },
  },
}));

export default RoundedTextField;
