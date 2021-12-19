import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import HeroesReducer from "./heroes/heroesReducer";
import HeroesDialogReducer from "./heroes/heroesDialogReducer";
import HeroIdReducer from "./heroes/heroIdReducer";

const allReducers = combineReducers({
  user: UserReducer,
  heroes: HeroesReducer,
  heroDialog: HeroesDialogReducer,
  heroDialogId: HeroIdReducer,
});

export default allReducers;
