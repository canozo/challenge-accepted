const jwt = require('jsonwebtoken');
const pool = require('../util/pool');

const auth = {};

auth.getToken = (req, res, next) => {
  const bHeader = req.headers.authorization;
  if (bHeader !== undefined) {
    const bearerToken = bHeader.split(' ')[1];
    req.token = bearerToken;

    if (req.token) {
      next();
    } else {
      res.json({
        error: true,
        errToken: true,
        errores: {
          token: 'No se envio token de verificacion',
        },
      });
    }
  } else {
    res.json({
      error: true,
      errToken: true,
      errores: {
        token: 'No se envio token de verificacion',
      },
    });
  }
};

auth.verify = (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SALT, (err, data) => {
    if (err) {
      res.json({
        error: true,
        errToken: true,
        errores: {
          token: 'Token de verificacion no valido',
        },
      });
    } else {
      req.data = data;
      next();
    }
  });
};

auth.getUser = (req, res, next) => {
  const { correo, pass } = req.body;

  pool.query(
    `select id_usuario, nombres, correo, pass
    from usuarios
    where correo = ? and pass = SHA2(?, 256)`,
    [correo.trim(), pass],
    (error, result) => {
      if (error) {
        res.json({ error: true });
      } else if (result.length !== 1) {
        res.json({ error: true, errores: { usuario: 'Usuario no encontrado!' } });
      } else {
        // informacion que se guarda en el token
        req.user = {
          id: result[0].id_usuario,
          nombre: result[0].nombres,
          correo: result[0].correo,
        };
        next();
      }
    },
  );
};

auth.register = (req, res, next) => {
  const { nombres, correo, pass } = req.body;

  pool.query(
    'insert into usuarios (nombres, correo, pass) values (?, ?, SHA2(?, 256))',
    [nombres, correo, pass],
    (error, result) => {
      if (error) {
        res.json({ error: true });
      } else {
        req.user = correo;
        req.password = pass;
        next();
      }
    }
  );
};

module.exports = auth;
