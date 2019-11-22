CREATE DATABASE IF NOT EXISTS `challenge_accepted`;
USE `challenge_accepted`;

-- Usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(40) NOT NULL,
  `correo` VARCHAR(64) NOT NULL,
  `pass` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC))
ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Usuarios';

-- Challenges
CREATE TABLE IF NOT EXISTS `challenges` (
  `id_challenge` INT NOT NULL AUTO_INCREMENT,
  `id_usuario` INT NOT NULL,
  `id_usuario_taken` INT,
  `titulo` VARCHAR(64) NOT NULL,
  `descripcion` VARCHAR(256) NOT NULL,
  `recompensa` INT NOT NULL,
  PRIMARY KEY (`id_challenge`),
  CONSTRAINT `fk_challenges_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_challenges_usuario_taken`
    FOREIGN KEY (`id_usuario_taken`)
    REFERENCES `usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Challenges';

-- Challenges rechazados
CREATE TABLE IF NOT EXISTS `rechazados` (
  `id_challenge` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  INDEX `fk_aceptados_challenge_idx` (`id_challenge` ASC),
  INDEX `fk_aceptados_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_aceptados_challenge`
    FOREIGN KEY (`id_challenge`)
    REFERENCES `challenges` (`id_challenge`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_aceptados_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuarios` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Challenges rechazados por un usuario';
