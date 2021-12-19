import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import HeroesReducer from './heroesReducer';

const allReducers = combineReducers({
  user: UserReducer,
  heroes: HeroesReducer
});

export default allReducers;
