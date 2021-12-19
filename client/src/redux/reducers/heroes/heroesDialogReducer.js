const HeroesDialogReducer = (heroDialog = false, action) => {
  switch (action.type) {
    case "SET_OPEN_HERO_DETAILS_DIALOG":
      return !heroDialog;
    default:
      return heroDialog;
  }
};

export default HeroesDialogReducer;
