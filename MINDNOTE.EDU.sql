-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         12.0.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para mindnote_edu
CREATE DATABASE IF NOT EXISTS `mindnote_edu` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `mindnote_edu`;

-- Volcando estructura para tabla mindnote_edu.estado_tareas
CREATE TABLE IF NOT EXISTS `estado_tareas` (
  `estado_id` int(11) NOT NULL AUTO_INCREMENT,
  `estado_nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`estado_id`),
  UNIQUE KEY `estado_nombre` (`estado_nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mindnote_edu.estado_tareas: ~4 rows (aproximadamente)
INSERT INTO `estado_tareas` (`estado_id`, `estado_nombre`) VALUES
	(1usuarios, 'pendiente'),
	(2, 'en_progreso'),
	(3, 'completada'),
	(4, 'cancelada');

-- Volcando estructura para tabla mindnote_edu.historial_tareas
CREATE TABLE IF NOT EXISTS `historial_tareas` (
  `historial_id` int(11) NOT NULL AUTO_INCREMENT,
  `historial_fechaRegistro` datetime NOT NULL DEFAULT current_timestamp(),
  `tarea_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `estado_id` int(11) NOT NULL,
  PRIMARY KEY (`historial_id`),
  KEY `tarea_id` (`tarea_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `estado_id` (`estado_id`),
  CONSTRAINT `historial_tareas_ibfk_1` FOREIGN KEY (`tarea_id`) REFERENCES `tareas` (`tarea_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `historial_tareas_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `historial_tareas_ibfk_3` FOREIGN KEY (`estado_id`) REFERENCES `estado_tareas` (`estado_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mindnote_edu.historial_tareas: ~0 rows (aproximadamente)

-- Volcando estructura para tabla mindnote_edu.notificaciones
CREATE TABLE IF NOT EXISTS `notificaciones` (
  `notificacion_id` int(11) NOT NULL AUTO_INCREMENT,
  `notificacion_mensaje` text NOT NULL,
  `notificacion_fechaEnvio` datetime NOT NULL DEFAULT current_timestamp(),
  `notificacion_entregado` tinyint(1) NOT NULL DEFAULT 0,
  `tarea_id` int(11) NOT NULL,
  PRIMARY KEY (`notificacion_id`),
  KEY `tarea_id` (`tarea_id`),
  CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`tarea_id`) REFERENCES `tareas` (`tarea_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mindnote_edu.notificaciones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla mindnote_edu.prioridad_tareas
CREATE TABLE IF NOT EXISTS `prioridad_tareas` (
  `prioridad_id` int(11) NOT NULL AUTO_INCREMENT,
  `prioridad_nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`prioridad_id`),
  UNIQUE KEY `prioridad_nombre` (`prioridad_nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mindnote_edu.prioridad_tareas: ~4 rows (aproximadamente)
INSERT INTO `prioridad_tareas` (`prioridad_id`, `prioridad_nombre`) VALUES
	(1, 'baja'),
	(2, 'media'),
	(3, 'alta'),
	(4, 'critica');

-- Volcando estructura para tabla mindnote_edu.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `rol_id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`rol_id`),
  UNIQUE KEY `rol_nombre` (`rol_nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mindnote_edu.roles:
INSERT INTO `roles` (`rol_id`, `rol_nombre`) VALUES
	(1, 'admin'),
	(2, 'usuario');

-- Volcando estructura para tabla mindnote_edu.tareas
CREATE TABLE IF NOT EXISTS `tareas` (
  `tarea_id` int(11) NOT NULL AUTO_INCREMENT,
  `tarea_titulo` varchar(100) NOT NULL,
  `tarea_descripcion` text NOT NULL,
  `tarea_fechaLimite` date NOT NULL,
  `tarea_hora` time NOT NULL,
  `estado_id` int(11) NOT NULL,
  `prioridad_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `tipo_id` int(11) NOT NULL,
  PRIMARY KEY (`tarea_id`),
  KEY `estado_id` (`estado_id`),
  KEY `prioridad_id` (`prioridad_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `fk_tareas_tipo` (`tipo_id`),
  CONSTRAINT `fk_tareas_tipo` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_tareas` (`tipo_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`estado_id`) REFERENCES `estado_tareas` (`estado_id`) ON UPDATE CASCADE,
  CONSTRAINT `tareas_ibfk_3` FOREIGN KEY (`prioridad_id`) REFERENCES `prioridad_tareas` (`prioridad_id`) ON UPDATE CASCADE,
  CONSTRAINT `tareas_ibfk_4` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mindnote_edu.tareas: ~17 rows (aproximadamente)
INSERT INTO `tareas` (`tarea_id`, `tarea_titulo`, `tarea_descripcion`, `tarea_fechaLimite`, `tarea_hora`, `estado_id`, `prioridad_id`, `usuario_id`, `tipo_id`) VALUES
	(31, 'Tarea Sena', 'Hacer presentación para sustentación ', '2025-10-12', '13:00:00', 1, 3, 1, 1),
	(32, 'Casa', 'Hacer aseo en casa', '2025-09-23', '12:00:00', 1, 3, 1, 2),
	(33, 'Patinaje', 'Llevar a mi hija a patinaje', '2025-09-21', '15:10:00', 1, 3, 31, 2),
	(34, 'Medicamentos', 'Reclamar medicamentos', '2025-09-17', '10:00:00', 1, 3, 31, 2),
	(35, 'Clase', 'Asistir a clase de pruebas ', '2025-09-30', '15:30:00', 1, 2, 30, 1),
	(36, 'EPS', 'Cita medica en la EPS', '2025-09-29', '15:00:00', 1, 3, 1, 2),
	(37, 'Colegio hermana', 'Ir al colegio de mi hermana por el boletin', '2025-09-30', '14:00:00', 1, 3, 1, 2),
	(38, 'Sustentacion', 'Preparar sustentacion', '2025-09-17', '11:30:00', 1, 3, 1, 1),
	(39, 'Hacer chocolates', 'Hacer chocolates para las ventas ', '2025-09-18', '13:30:00', 1, 2, 34, 2),
	(40, 'Ir al sena ', 'Ir a sustentar mi proyecto', '2025-09-16', '11:30:00', 1, 3, 1, 1),
	(43, 'Colegio', 'Ir al colegio por documentos', '2025-09-19', '14:00:00', 1, 2, 1, 1),
	(44, 'Entrevista', 'Tengo entrevista de trabajo mañana', '2025-09-19', '13:00:00', 1, 4, 1, 3),
	(45, 'Pruebas ', 'Tengo una prueba para presentar', '2025-09-19', '13:30:00', 1, 3, 6, 1),
	(46, 'Aseo', 'Hacer aseo en casa', '2025-09-19', '13:00:00', 1, 3, 38, 2),
	(47, 'Gestionar viaje', 'Gestionar viajes y costos ', '2025-10-15', '17:00:00', 1, 3, 1, 2),
	(48, 'Asisitr a clase ', 'Clase el dia jueves', '2025-10-09', '19:00:00', 1, 3, 39, 1),
	(49, 'Hacer proyecto', 'liscowi', '2025-10-29', '23:00:00', 2, 3, 40, 2);

-- Volcando estructura para tabla mindnote_edu.tipo_tareas
CREATE TABLE IF NOT EXISTS `tipo_tareas` (
  `tipo_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`tipo_id`),
  UNIQUE KEY `tipo_nombre` (`tipo_nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mindnote_edu.tipo_tareas: ~3 rows (aproximadamente)
INSERT INTO `tipo_tareas` (`tipo_id`, `tipo_nombre`) VALUES
	(1, 'academica'),
	(2, 'Personal'),
	(3, 'recordatorio');

-- Volcando estructura para tabla mindnote_edu.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_nombre` varchar(50) NOT NULL,
  `usuario_apellido` varchar(50) NOT NULL,
  `usuario_correo` varchar(100) NOT NULL,
  `usuario_contrasena` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `usuario_correo` (`usuario_correo`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla mindnote_edu.usuarios: ~8 rows (aproximadamente)
INSERT INTO `usuarios` (`usuario_id`, `usuario_nombre`, `usuario_apellido`, `usuario_correo`, `usuario_contrasena`, `rol_id`) VALUES
	(1, 'Laura', 'Buritica', 'lauraunisena25@gmail.com', 'L1013117437', 1),
	(6, 'Santiago', 'Hurtado', 'hurtado@gmail.com', 'S0987654321', 2),
	(30, 'William', 'Morales ', 'william@gmail.com', 'W1234567890', 2),
	(31, 'Mabel ', 'Espinosa ', 'mabel@gmail.com', 'M2468098767', 2),
	(34, 'Valentina', 'Galindo', 'valentina@gmail.com', 'V4567890345', 2),
	(38, 'Camila', 'Sanchez', 'cami@gmail.com', 'C123456789', 2),
	(39, 'Sergio', 'Garzon', 'sergio@gmail.com', 'L1013117437', 2),
	(40, 'Jose ', 'Leon', 'jose@gmail.com', 'J1013117437', 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;