import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import HeroesReducer from "./heroes/heroesReducer";
import HeroesDialogReducer from "./heroes/heroesDialogReducer";

const allReducers = combineReducers({
  user: UserReducer,
  heroes: HeroesReducer,
  heroDialog: HeroesDialogReducer,
});

export default allReducers;
