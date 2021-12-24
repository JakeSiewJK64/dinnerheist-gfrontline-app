import { HeroDialogFragment } from "./hero-dialog-fragment";
import { useState, useEffect } from "react";

export function EditHeroDialog({ openDialog, setOpenDialog, doll }) {
  const [hero, setHero] = useState(null);
  const [countries, setCountries] = useState(null);
  const [categories, setCategories] = useState(null);
  const [teams, setTeams] = useState(null);

  const GetHero = async () => {
    if (doll) {
      const response = await fetch("/heroes/getHeroById/" + doll.hero_id);
      const rows = await response.json();
      setHero(rows);
    }
  };

  const GetTeams = async () => {
    const res = await fetch("/heroes/getFactionTeam", {
      method: "GET",
    });
    const rows = await res.json();
    setTeams(rows);
  };

  const GetCountries = async () => {
    const res = await fetch("/heroes/getCountries", {
      method: "GET",
    });
    const rows = await res.json();
    setCountries(rows);
  };

  const GetCategories = async () => {
    const res = await fetch("/heroes/getCategories", {
      method: "GET",
    });
    const rows = await res.json();
    setCategories(rows);
  };

  useEffect(() => {
    GetTeams();
    GetCountries();
    GetCategories();
    GetHero();
  }, [doll]);

  if (hero && countries && categories && teams) {
    return (
      <HeroDialogFragment
        data={hero}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        categories={categories}
        teams={teams}
        countries={countries}
      />
    );
  } else {
    return <div></div>
  }
}
