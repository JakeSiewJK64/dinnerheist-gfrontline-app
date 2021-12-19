export const SetHeroes = (heroes) => {
  return {
    type: "SET_HEROES_ARRAY",
    payload: heroes,
  };
};

export const OpenHeroDetailsDialog = (item) => {
  return {
    type: "SET_OPEN_HERO_DETAILS_DIALOG",
    openHeroDialog: item,
  };
};

export const SetHeroDialogID = (id) => {
  return {
    type: "HERO_DIALOG_ID",
    heroID: id,
  };
};
