# Challenge Accepted

1. Entrar a MySQL
```
mysql -u root -p
```

2. Crear su usuario
```
CREATE USER 'admin_ca'@'localhost' IDENTIFIED BY 'Moc5vynsOJ8f8SR';
```

3. Correr script SQL (`/db/sql/SCRIPT.sql`), solo es copiar y pegar en el CLI o cliente de MySQL

4. Usar la base de datos que acabamos de crear
```
USE `challenge_accepted`;
```

5. Darle privilegios al usuario
```
GRANT ALL PRIVILEGES ON challenge_accepted.* TO 'admin_ca'@'localhost';
```

Correr el server como dev:
1. Si es la primera vez corriendo el proyecto:
```
npm i
```
2. Luego:
```
npm run dev
```
