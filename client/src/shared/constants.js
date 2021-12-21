import { makeStyles } from "@material-ui/core/styles";

export const header_routes = [
  {
    title: "Users",
    route: "/users",
    role: "administrator",
  },
  {
    title: "Guns",
    route: "/heroes",
  },
];

export const useStyles = makeStyles((theme) => ({
  heroStyles: {
    "& .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root": {
      color: "#fff",
    },
    "& .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      color: "#fff",
    },
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .css-8j6b76-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#fff",
    },
    "& .css-ittuaa-MuiInputAdornment-root": {
      color: "#fff",
    },
    "&:after": {
      borderBottomColor: "#fff",
    },
  },
}));

export const category_label = [
  {
    id: 1,
    category: "SMG",
    stars: 4,
    image_url: "https://iopwiki.com/images/7/76/Icon_SMG_4star.png",
  },
  {
    id: 2,
    category: "AR",
    stars: 4,
    image_url: "https://iopwiki.com/images/9/93/Icon_AR_4star.png",
  },
  {
    id: 3,
    category: "AR",
    stars: 5,
    image_url: "https://iopwiki.com/images/b/b6/Icon_AR_5star.png",
  },
];
