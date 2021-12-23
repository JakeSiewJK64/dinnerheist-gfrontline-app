const express = require("express");
const router = express.Router();
const pool = require("../../db");
const cors = require("cors");
const authorize = require("../authentication/authorize");

router.get("/getAllHeroes", cors(), async (req, res) => {
  try {
    const r = await pool.query(`
            SELECT encode(h.image_url, 'escape') AS image_url, h.hero_name, h.hero_id, h.rarity, c.category_name
            FROM heroes h JOIN category c ON h.category = c.category_id;
        `);
    const result = await r.rows;
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getCountries", cors(), async (req, res) => {
  const response = await pool.query("SELECT * FROM countries");
  res.json(response.rows);
});

router.get("/getFactionTeam", cors(), async (req, res) => {
  const response = await pool.query(
    "SELECT t.team_id, t.team_name, f.faction_name FROM team t JOIN faction f on t.faction_id = f.faction_id;"
  );
  res.json(response.rows);
});

router.post("/upsertHero", authorize, async (req, res) => {
  console.log(req.body);
  const {
    image_url,
    hero_name,
    hero_id,
    manufacturer,
    hero_damage,
    va,
    personality,
    revise,
    evasion,
    armor,
    armor_penetration,
    crit_rate,
    crit_damage,
    accuracy,
    move_speed,
    health,
    firerate,
    hero_fullname,
    rarity,
    artist,
    description,
    category_name,
    country_name,
    team_name,
    faction_name,
  } = req.body;
});

router.get("/getHeroById/:id", cors(), async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await pool.query(
      `SELECT 
        encode(h.image_url, 'escape') as image_url,
        h.hero_name,
        h.hero_id,
        h.manufacturer,
        h.hero_damage,
        h.va,
        h.personality,
        h.revise,
        h.evasion,
        h.armor,
        h.armor_penetration,
        h.crit_rate,
        h.crit_damage,
        h.accuracy,
        h.move_speed,
        h.health,
        h.firerate,
        h.hero_fullname,
        h.rarity,
        h.artist,
        h.description,
        c.category_name,
        co.country_name,
        t.team_name,
        f.faction_name,
        encode(f.image_url, 'escape') AS faction_image_url
        FROM heroes h LEFT OUTER JOIN category c ON c.category_id = h.category
        JOIN countries co ON co.country_id = h.origin_country
        JOIN team t ON t.team_id = h.team_id
        JOIN faction f ON t.faction_id = f.faction_id
        WHERE hero_id = $1`,
      [id]
    );
    const response = rows.rows[0];
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
