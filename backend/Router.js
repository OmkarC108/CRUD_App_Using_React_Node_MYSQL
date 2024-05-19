const express = require("express");
const router = new express.Router();
const conn = require("./dbconn");

router.post("/create", (req, res) => {
  const { name, email, mobile, dob } = req.body;

  if (!name || !email || !mobile || !dob) {
    return res.status(422).json({ error: "Please fill all data" });
  }

  conn.query(
    "SELECT * FROM customer WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.error("Database error during SELECT:", err);
        return res.status(500).json({ error: "Database error during SELECT" });
      }

      if (result.length) {
        return res.status(422).json({ error: "Data already exists" });
      } else {
        const sql =
          "INSERT INTO customer (name, email, mobile, dob) VALUES (?, ?, ?, ?)";
        const values = [name, email, mobile, dob];

        conn.query(sql, values, (err, result) => {
          if (err) {
            console.error("Database error during INSERT:", err);
            return res
              .status(500)
              .json({ error: "Database error during INSERT" });
          } else {
            return res.status(201).json(req.body);
          }
        });
      }
    }
  );
});

router.get("/getusers", (req, res) => {
  conn.query("SELECT * FROM customer", (err, result) => {
    if (err) {
      res.status(422).json("nodata available");
    } else {
      res.status(201).json(result);
    }
  });
});

router.delete("/deleteuser/:id", (req, res) => {
  const { id } = req.params;

  conn.query("DELETE FROM customer WHERE id=?", id, (err, result) => {
    if (err) {
      res.status(422).json("delete error");
    } else {
      res.status(201).json(result);
    }
  });
});

router.get("/induser/:id", (req, res) => {
  const { id } = req.params;

  conn.query("SELECT * FROM customer WHERE id=?", id, (err, result) => {
    if (err) {
      res.status(422).json("delete error");
    } else {
      res.status(201).json(result);
    }
  });
});

router.patch("/updateuser/:id", (req, res) => {
  const { id } = req.params;

  const data = req.body;

  conn.query("UPDATE customer SET ? WHERE id=?", [data, id], (err, result) => {
    if (err) {
      res.status(422).json({ message: "error" });
    } else {
      res.status(201).json(result);
    }
  });
});

module.exports = router;
