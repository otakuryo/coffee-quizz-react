PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_preguntas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titulo` text NOT NULL,
	`contenido` text NOT NULL,
	`usuario_id` integer NOT NULL,
	`created_at` integer DEFAULT (now()) NOT NULL,
	FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_preguntas`("id", "titulo", "contenido", "usuario_id", "created_at") SELECT "id", "titulo", "contenido", "usuario_id", "created_at" FROM `preguntas`;--> statement-breakpoint
DROP TABLE `preguntas`;--> statement-breakpoint
ALTER TABLE `__new_preguntas` RENAME TO `preguntas`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_respuestas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contenido` text NOT NULL,
	`pregunta_id` integer NOT NULL,
	`usuario_id` integer NOT NULL,
	`created_at` integer DEFAULT (now()) NOT NULL,
	FOREIGN KEY (`pregunta_id`) REFERENCES `preguntas`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_respuestas`("id", "contenido", "pregunta_id", "usuario_id", "created_at") SELECT "id", "contenido", "pregunta_id", "usuario_id", "created_at" FROM `respuestas`;--> statement-breakpoint
DROP TABLE `respuestas`;--> statement-breakpoint
ALTER TABLE `__new_respuestas` RENAME TO `respuestas`;--> statement-breakpoint
CREATE TABLE `__new_usuarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT (now()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_usuarios`("id", "nombre", "email", "created_at") SELECT "id", "nombre", "email", "created_at" FROM `usuarios`;--> statement-breakpoint
DROP TABLE `usuarios`;--> statement-breakpoint
ALTER TABLE `__new_usuarios` RENAME TO `usuarios`;--> statement-breakpoint
CREATE UNIQUE INDEX `usuarios_email_unique` ON `usuarios` (`email`);