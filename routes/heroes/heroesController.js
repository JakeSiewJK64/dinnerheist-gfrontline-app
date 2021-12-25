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

router.post("/upsertCountries", authorize, async (req, res) => {
  const { ...props } = req.body;
  if (props.country_id) {
    try {
      const response = await pool.query(
        "UPDATE countries SET country_name = $1 WHERE country_id = $2",
        [props.country_name, props.country_id]
      );
      if (response) {
        return res.status(200).send("Success");
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    try {
      const response = await pool.query(
        "INSERT INTO countries (country_name) VALUES ($1);",
        [props.country_name]
      );
      if (response) {
        return res.status(200).send("Success");
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }
});

router.get("/getFactionTeam", cors(), async (req, res) => {
  const response = await pool.query(
    "SELECT t.team_id, t.team_name, f.faction_name FROM team t JOIN faction f on t.faction_id = f.faction_id;"
  );
  res.json(response.rows);
});

router.get("/getCategories", cors(), async (req, res) => {
  const response = await pool.query("SELECT * FROM category");
  res.json(response.rows);
});

router.post("/upsertCategories", authorize, async (req, res) => {
  const { ...props } = req.body;

  if (props.category_id) {
    try {
      const response = await pool.query(
        `
        UPDATE category SET category_name = $1, category_description = $2 WHERE category_id = $3
      `,
        [props.category_name, props.category_description, props.category_id]
      );
      if (response) {
        res.status(200).send("Success");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } else {
    try {
      const response = await pool.query(
        `
        INSERT INTO category (category_name, category_description) VALUES ($1, $2)
      `,
        [props.category_name, props.category_description]
      );
      if (response) {
        return res.status(200).send("Success");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
});

router.get("/getFactions", cors(), async (req, res) => {
  const response = await pool.query("SELECT * FROM faction");
  res.json(response.rows);
});

router.post("/upsertFaction", authorize, async (req, res) => {
  const { ...props } = req.body;

  if (props.faction_id) {
    try {
      const response = pool.query(
        "UPDATE faction SET faction_name = $1 WHERE faction_id = $2",
        [props.faction_name, props.faction_id]
      );
      if (response) {
        return res.status(200).send("Success");
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    try {
      const response = pool.query(
        "INSERT INTO faction (faction_name, image_url) VALUES ($1, $2)",
        [props.faction_name, props.image_url]
      );
      if (response) {
        return res.status(200).send("Success");
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }
});

router.post("/upsertHero", authorize, async (req, res) => {
  const { ...props } = req.body;
  if (props.hero_id === null) {
    try {
      const response = await pool.query(
        `INSERT INTO heroes (
          hero_name,
          hero_damage,
          manufacturer,
          origin_country,
          artist,
          va,
          revise,
          image_url,
          evasion,
          armor,
          armor_penetration,
          crit_rate,
          crit_damage, accuracy, move_speed, health, firerate, rarity, category, description, team_id, hero_fullname, personality) VALUES 
          (
            $1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23
            );`,
        [
          props.hero_name,
          props.damage,
          props.manufacturer,
          props.country,
          props.artist,
          props.va,
          props.revise,
          props.image_url,
          props.evasion,
          props.armor,
          props.armor_penetration,
          props.crit_rate,
          props.crit_damage,
          props.accuracy,
          props.move_speed,
          props.health,
          props.firerate,
          props.rarity,
          props.category,
          props.description,
          props.team_id,
          props.hero_fullname,
          props.personality,
        ]
      );
      return res.status(200).send({
        msg: response.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await pool.query(
        `UPDATE heroes SET
        hero_name = $1,
        hero_damage = $2,
        manufacturer = $3,
        origin_country = $4,
        artist = $5,
        va = $6,
        revise = $7,
        image_url = $8,
        evasion = $9,
        armor = $10,
        armor_penetration = $11,
        crit_rate = $12,
        crit_damage = $13, accuracy = $14, move_speed = $15, health = $16, firerate = $17, rarity = $18, category = $19, description = $20, team_id = $21, hero_fullname = $22, personality = $23
        WHERE hero_id = $24;
        `,
        [
          props.hero_name,
          props.damage,
          props.manufacturer,
          props.country,
          props.artist,
          props.va,
          props.revise,
          props.image_url,
          props.evasion,
          props.armor,
          props.armor_penetration,
          props.crit_rate,
          props.crit_damage,
          props.accuracy,
          props.move_speed,
          props.health,
          props.firerate,
          props.rarity,
          props.category,
          props.description,
          props.team_id,
          props.hero_fullname,
          props.personality,
          props.hero_id,
        ]
      );
      return res.status(200).send({
        msg: response.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  }
});

router.get("/getCategories", cors(), async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM category");
    const rows = await response.rows;
    res.json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
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
