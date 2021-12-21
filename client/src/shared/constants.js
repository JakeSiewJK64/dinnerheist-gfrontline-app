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
    "& .MuiOutlinedInput-root": {
      color: "#fff",
    },
    "& .MuiInputAdornment-root": {
      color: "#fff",
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      "border-color": "#fff",
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
