ALTER TABLE `preguntas` DROP FOREIGN KEY `preguntas_usuarioId_usuarios_id_fk`;
--> statement-breakpoint
ALTER TABLE `respuestas` DROP FOREIGN KEY `respuestas_preguntaId_preguntas_id_fk`;
--> statement-breakpoint
ALTER TABLE `respuestas` DROP FOREIGN KEY `respuestas_usuarioId_usuarios_id_fk`;
--> statement-breakpoint
ALTER TABLE `preguntas` ADD CONSTRAINT `preguntas_usuarioId_usuarios_id_fk` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `respuestas` ADD CONSTRAINT `respuestas_preguntaId_preguntas_id_fk` FOREIGN KEY (`preguntaId`) REFERENCES `preguntas`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `respuestas` ADD CONSTRAINT `respuestas_usuarioId_usuarios_id_fk` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE cascade ON UPDATE no action;