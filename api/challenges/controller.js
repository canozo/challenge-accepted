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

controller.getAll = (req, res) => {
  // obtener todos los challenges
  pool.query(
    `select
    id_challenge, b.nombres as retador, c.nombres as retado, titulo, descripcion, recompensa
    from challenges a
    inner join usuarios b
    on a.id_usuario = b.id_usuario
    left join usuarios c
    on a.id_usuario_taken = c.id_usuario`,
    [],
    (error, result) => {
      if (error) {
        console.log(error);
        res.json({ error: true });
      } else {
        res.json(result);
      }
    }
  );
};

controller.getAvailable = (req, res) => {
  // obtener todos los challenges que esten disponibles
  pool.query(
    `select
    id_challenge, b.nombres as retador, titulo, descripcion, recompensa
    from challenges a
    inner join usuarios b
    on a.id_usuario = b.id_usuario
    where a.id_usuario_taken is null`,
    [],
    (error, result) => {
      if (error) {
        console.log(error);
        res.json({ error: true });
      } else {
        res.json(result);
      }
    }
  );
};

controller.getBy = (req, res) => {
  // obtener todos los challenges hechos por una persona
  const { id } = req.params;
  pool.query(
    `select
    id_challenge, b.nombres as retador, titulo, descripcion, recompensa
    from challenges a
    inner join usuarios b
    on a.id_usuario = b.id_usuario
    where a.id_usuario = ?`,
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.json({ error: true });
      } else {
        res.json(result);
      }
    }
  );
};

controller.getTakenBy = (req, res) => {
  // obtener todos los challenges que una persona ha ocupado
  const { id } = req.params;
  pool.query(
    `select
    id_challenge, b.nombres as retador, titulo, descripcion, recompensa
    from challenges a
    inner join usuarios b
    on a.id_usuario = b.id_usuario
    inner join usuarios c
    on a.id_usuario_taken = c.id_usuario
    where c.id_usuario = ?`,
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.json({ error: true });
      } else {
        res.json(result);
      }
    }
  );
};

module.exports = controller;
