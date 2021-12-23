import { makeStyles } from "@material-ui/core/styles";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";

export const header_routes = [
  {
    id: 1,
    title: "Users",
    route: "/users",
    role: "administrator",
  },
  {
    id: 2,
    title: "Guns",
    route: "/heroes",
  },
  {
    id: 3,
    title: "Manage Dolls",
    route: "/manage-hero",
    role: "administrator",
  },
];

export const headerProfileMenuOptions = [
  {
    url: "profile",
    title: "PROFILE",
    icon: <PersonAdd />,
  },
  {
    url: "settings",
    title: "SETTINGS",
    icon: <Settings />,
  },
];

export const useStyles = makeStyles(() => ({
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

export const rarity_select = [
  {
    rarity: 2,
    title: "COMMON"
  },
  {
    rarity: 3,
    title: "RARE"
  },
  {
    rarity: 4,
    title: "EPOCH"
  },
  {
    rarity: 5,
    title: "LEGENDARY"
  },
]

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
