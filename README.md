![Banner](/frontend/src/assets/BANNER.png)


Proyecto realizado por [Inés Mª Barrera Llerena](https://github.com/NessiTheLakeMonster)

## Manual de ejecución

### Backend :lock:

Primero se debera instalar las dependencias necesarias en el proyecto, para ello se deberá ejecutar el siguiente comando en la carpeta raíz. Con esto se generará la carpeta `node_modules`.

```bash
npm install
```

Para montar la base de datos se deberá tener creada una base de datos vacía en MySQL con el nombre de `planeswalker_dev`. Una vez creada con el siguiente comando se lanzarán tanto las migrations como los seeders.

```bash
npm run m
```

Para lanzar el servidor se deberá ejecutar el siguiente comando en la carpeta raíz.
```bash
nodemon app/app
```

En la base de datos se habrán creado varios usuarios, entre ellos se encuentra un `administrador` que tiene todos los roles. Los datos de acceso son los siguientes:

```json
{
    "email": "admin@gmail.com",
    "password": "admin"
}
```

### Frontend :computer:

Primero, al igual que en el backend, se deberán instalar las dependencias necesarias en el proyecto, para ello se deberá ejecutar el siguiente comando en la carpeta raíz. Con esto se generará la carpeta `node_modules`.

```bash
npm install
```

Para lanzar el frontend se deberá ejecutar el siguiente comando en la carpeta raíz.
```bash
ng serve --open
```

## Manual de la API :closed_lock_with_key:

