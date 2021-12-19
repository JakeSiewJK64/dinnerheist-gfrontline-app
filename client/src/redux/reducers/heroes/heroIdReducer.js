const HeroIdReducer = (heroes = 0, action) => {
  switch (action.type) {
    case "HERO_DIALOG_ID":
      return action.heroID;
    default:
      return heroes + action.heroID;
  }
};

export default HeroIdReducer;
