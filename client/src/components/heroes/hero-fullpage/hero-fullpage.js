import "./hero-fullpage.css";
import React, { useEffect, useState } from "react";

const HeroFullPage = (props) => {
  const [hero, setHero] = useState(null);
  const [heroId, setHeroId] = useState(null);

  const GetHeroById = async () => {
    if (heroId !== undefined || heroId !== null) {
      const response = await fetch("/heroes/getHeroById/" + heroId, {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      setHero(result);
    } else {
      console.log("error");
    }
  };
  useEffect(() => {
    setHeroId(props.match.params.id);
    console.log("hero id: ", heroId);
    if (setHeroId !== null || setHeroId !== undefined) {
      GetHeroById(props.match.params.id);
      console.log("hero: ", hero);
    }
  }, [heroId]);

  return <div>Hero full page</div>;
};

export default HeroFullPage;
