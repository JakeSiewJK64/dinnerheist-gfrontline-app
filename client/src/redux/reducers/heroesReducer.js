const HeroesReducer = (heroes = false, action) => {
  switch (action.type) {
    case "SET_HEROES_ARRAY":
      return action.payload;
    case "SET_OPEN_HERO_DETAILS_DIALOG":
      return action.payload;
    default:
      return heroes;
  }
};

export default HeroesReducer;
