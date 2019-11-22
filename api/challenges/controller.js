const pool = require('../../util/pool');

const controller = {};

controller.create = (req, res) => {
  const { user } = req.data;
  const { titulo, descripcion, recompensa } = req.body;

  if (recompensa === 0 || recompensa === '0') {
    res.json({ error: true });
    return;
  }

  pool.query(
    `insert into challenges (id_usuario, titulo, descripcion, recompensa) values
    (?, ?, ?, ?)`,
    [user.id, titulo, descripcion, recompensa],
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
  // (no hechos por el mismo usuario, ni rechazados por el mismo)
  const { user } = req.data;
  pool.query(
    `select
    a.id_challenge as id_challenge, b.nombres as retador, titulo, descripcion, recompensa
    from challenges a
    inner join usuarios b
    on a.id_usuario = b.id_usuario
    left join rechazados c
    on a.id_challenge = c.id_challenge
    where a.id_usuario_taken is null
    and a.id_usuario != ?
    and c.id_usuario is null`,
    [user.id],
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
  const { user } = req.data;
  pool.query(
    `select
    id_challenge, c.nombres as retado, c.correo as correo, titulo, descripcion, recompensa
    from challenges a
    inner join usuarios b
    on a.id_usuario = b.id_usuario
    left join usuarios c
    on a.id_usuario_taken = c.id_usuario
    where a.id_usuario = ?`,
    [user.id],
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
  const { user } = req.data;
  pool.query(
    `select
    id_challenge, b.nombres as retador, b.correo as correo, titulo, descripcion, recompensa
    from challenges a
    inner join usuarios b
    on a.id_usuario = b.id_usuario
    inner join usuarios c
    on a.id_usuario_taken = c.id_usuario
    where c.id_usuario = ?`,
    [user.id],
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

controller.accept = (req, res) => {
  // aceptar un challenge
  const { id } = req.body;
  const { user } = req.data;
  pool.query(
    `update challenges
    set id_usuario_taken = ?
    where id_challenge = ?`,
    [user.id, id],
    (error) => {
      if (error) {
        console.log(error);
        res.json({ error: true });
      } else {
        res.json({ error: false });
      }
    }
  );
};

controller.deny = (req, res) => {
  // rechazar un challenge
  const { id } = req.body;
  const { user } = req.data;
  pool.query(
    `insert into rechazados (id_usuario, id_challenge) values
    (?, ?)`,
    [user.id, id],
    (error) => {
      if (error) {
        console.log(error);
        res.json({ error: true });
      } else {
        res.json({ error: false });
      }
    }
  );
};

module.exports = controller;
