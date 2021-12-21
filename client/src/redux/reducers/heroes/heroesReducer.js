const HeroesReducer = (heroes = [], action) => {
  switch (action.type) {
    case "SET_HEROES_ARRAY":
      return action.payload;
    default:
      return heroes + action.payload;
  }
};

export default HeroesReducer;
