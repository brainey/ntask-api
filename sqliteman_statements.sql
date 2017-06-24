INSERT INTO users (name, email, password)
VALUES ('John', 'john@mail.net','12345');
SELECT * FROM users;
DELETE FROM users;
SELECT `id`, `name`, `password`, `email` FROM `Users` AS `Users` WHERE `Users`.`email` = 'john@mail.net' LIMIT 1;
