CREATE USER fernanrod IDENTIFIED BY '0contraSeQueL2';

CREATE DATABASE pagina_revistas;

GRANT ALL PRIVILEGES ON pagina_revistas.* TO fernanrod;

USE DATABASE pagina_revistas;

CREATE TABLE usuario(
	username VARCHAR(250) NOT NULL PRIMARY KEY,
	password VARCHAR(250) NOT NULL,
	tipo ENUM('ADMINISTRADOR','EDITOR','USUARIO') NOT NULL,
	estado ENUM('ACTIVO','INHABILITADO') NOT NULL DEFAULT 'ACTIVO'
);

CREATE TABLE perfil(
	usuario VARCHAR(250) NOT NULL PRIMARY KEY,
	foto_perfil VARCHAR(250),
	descripcion TEXT,
	hobbies TEXT,
	genero ENUM('MASCULINO','FEMENINO','OTRO'),
	CONSTRAINT FK_usuario_perfil FOREIGN KEY(usuario) REFERENCES usuario(username)
);

CREATE TABLE etiqueta(
	nombre VARCHAR(250) NOT NULL PRIMARY KEY
);

CREATE TABLE categoria(
	nombre VARCHAR(250) NOT NULL PRIMARY KEY
);

CREATE TABLE revista(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	editor VARCHAR(250) NOT NULL,
	nombre VARCHAR(250) NOT NULL,
	descripcion TEXT,
	fecha_publicacion DATE NOT NULL,
	categoria VARCHAR(250) NOT NULL,
	estado_suscripciones ENUM('PERMITIDAS','RESTRINGIDAS') NOT NULL DEFAULT 'PERMITIDAS',
	CONSTRAINT FK_revista_categoria FOREIGN KEY(categoria) REFERENCES categoria(nombre)
);

CREATE TABLE precio_suscripcion(
	revista INT NOT NULL,
	precio_suscripcion FLOAT NOT NULL,
	fecha DATE NOT NULL,
	CONSTRAINT PRIMARY KEY (revista, fecha),
	CONSTRAINT FK_revista_id FOREIGN KEY (revista) REFERENCES revista(id)
);

CREATE TABLE numero_revista(
	numero INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	revista INT NOT NULL,
	nombre VARCHAR(250) NOT NULL,
	descripcion TEXT,
	fecha_publicacion DATE NOT NULL,
	costo_hosting FLOAT NOT NULL,
	PDF VARCHAR(250) NOT NULL,
	restriccion_me_gusta ENUM('PERMITIDO','PROHIBIDO') NOT NULL DEFAULT 'PERMITIDO',
	restriccion_comentarios ENUM('PERMITIDO','PROHIBIDO') NOT NULL DEFAULT 'PERMITIDO',
	CONSTRAINT FK_revista_numero FOREIGN KEY(revista) REFERENCES revista(id)
);

CREATE TABLE etiqueta_usuario(
	usuario VARCHAR(250) NOT NULL,
	etiqueta VARCHAR(250) NOT NULL,
	CONSTRAINT PRIMARY KEY (usuario,etiqueta),
	CONSTRAINT FK_usuario_etiqueta FOREIGN KEY (usuario) REFERENCES usuario(username),
	CONSTRAINT FK_etiqueta_usuario FOREIGN KEY (etiqueta) REFERENCES etiqueta(nombre)
);

CREATE TABLE etiqueta_revista(
	revista INT NOT NULL,
	etiqueta VARCHAR(250) NOT NULL,
	CONSTRAINT PRIMARY KEY (revista,etiqueta),
	CONSTRAINT FK_revista_etiqueta FOREIGN KEY (revista) REFERENCES revista(id),
	CONSTRAINT FK_etiqueta_revista FOREIGN KEY (etiqueta) REFERENCES etiqueta(nombre)
);

CREATE TABLE suscripcion(
	usuario VARCHAR(250) NOT NULL,
	revista INT NOT NULL,
	fecha_suscripcion DATE NOT NULL,
	fecha_cancelacion DATE,
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	CONSTRAINT FK_usuario_suscripcion FOREIGN KEY (usuario) REFERENCES usuario(username),
	CONSTRAINT FK_revista_suscripcion FOREIGN KEY (revista) REFERENCES revista(id)
);

CREATE TABLE pago(
	usuario VARCHAR(250) NOT NULL,
	suscripcion INT NOT NULL,
	fecha_pago DATE NOT NULL,
	periodo ENUM('MENSUAL','ANUAL') NOT NULL,
	tiempo_pagado INT NOT NULL,
	CONSTRAINT PRIMARY KEY (usuario,suscripcion,fecha_pago),
	CONSTRAINT FK_pago_suscripcion FOREIGN KEY (suscripcion) REFERENCES suscripcion(id),
	CONSTRAINT FK_pago_usuario FOREIGN KEY (usuario) REFERENCES usuario(username)
);

CREATE TABLE me_gusta(
	usuario VARCHAR(250) NOT NULL,
	numero_revista INT NOT NULL,
	CONSTRAINT PRIMARY KEY (usuario,numero_revista),
	CONSTRAINT FK_usuario_me_gusta FOREIGN KEY (usuario) REFERENCES usuario(username),
	CONSTRAINT FK_numero_revista_me_gusta FOREIGN KEY (numero_revista) REFERENCES numero_revista(numero)
);

CREATE TABLE comentario(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	usuario VARCHAR(250) NOT NULL,
	revista INT NOT NULL,
	numero_revista INT NOT NULL,
	comentario TEXT NOT NULL,
	CONSTRAINT FK_usuario_comentario FOREIGN KEY (usuario) REFERENCES usuario(username),
	CONSTRAINT FK_numero_revista_comentario FOREIGN KEY (numero_revista) REFERENCES numero_revista(numero)
);
