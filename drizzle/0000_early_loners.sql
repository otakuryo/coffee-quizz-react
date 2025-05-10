CREATE TABLE `preguntas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`contenido` varchar(255) NOT NULL,
	`usuarioId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `preguntas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `respuestas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contenido` varchar(255) NOT NULL,
	`preguntaId` int NOT NULL,
	`usuarioId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `respuestas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `usuarios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`),
	CONSTRAINT `usuarios_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `preguntas` ADD CONSTRAINT `preguntas_usuarioId_usuarios_id_fk` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `respuestas` ADD CONSTRAINT `respuestas_preguntaId_preguntas_id_fk` FOREIGN KEY (`preguntaId`) REFERENCES `preguntas`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `respuestas` ADD CONSTRAINT `respuestas_usuarioId_usuarios_id_fk` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;