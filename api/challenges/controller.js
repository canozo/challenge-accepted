const pool = require('../../util/pool');

const controller = {};

controller.create = (req, res) => {
  const { id, titulo, descripcion, recompensa } = req.body;
  pool.query(
    `insert into challenges (id_usuario, titulo, descripcion, recompensa) values
    (?, ?, ?, ?)`,
    [id, titulo, descripcion, recompensa],
    (error) => {
      if (error) {
        console.log(error);
        res.json({ error: true });
      } else {
        res.json({ error: false });
      }
    },
  );
};

module.exports = controller;
