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

### Rutas de autenticación

#### Registro de usuario
+ **URL**
    `http://localhost:9090/api/auth/registro`
+ **Método**
    `POST`
+ **Body**
    ```json
    {
        "nombre": "Inés",
        "apellidos": "Barrera Llerena",
        "email": "ines@gmail.com",
        "nick": "NessiTheLakeMonster",
        "password": "123456"
    }
    ```
#### Inicio de sesión
+ **URL**
    `http://localhost:9090/api/auth/login`
+ **Método**
    `POST`
+ **Body**
    ```json
    {
        "email": "ines@gmail.com",
        "password": "123456"
    }
    ```

### Rutas de usuario

#### Obtener todos los usuarios
+ **URL**
    `http://localhost:9090/api/usuarios`
+ **Método**
    `GET`

#### Obtener un usuario
+ **URL**
    `http://localhost:9090/api/usuarios/user/:id`
+ **Método**
    `GET`

#### Obtener roles de un usuario
+ **URL**
    `http://localhost:9090/api/usuarios/:id`
+ **Método**
    `GET`

### Rutas de las cartas

#### Obtener carta por ID
+ **URL**
    `http://localhost:9090/api/cartas/:id`
+ **Método**
    `GET`

#### Obtener carta por nombre en español
+ **URL**
    `http://localhost:9090/api/cartas`
+ **Método**
    `POST`
+ **Body**
    ```json
    {
        "name": "Narset trascendente"
    }
    ```

#### Guardar carta
+ **URL**
    `http://localhost:9090/api/cartas/guardar`
+ **Método**
    `POST`
+ **Body**
    ```json
    {
        "id_api": 386716,
        "nombre_en": "Warden of the Eye",
        "nombre_es": "Protector del ojo",
        "foto_en": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386716&type=card",
        "foto_es": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=389406&type=card"
    }
    ```

### Rutas de los mazos

#### Obtener mazo por ID
+ **URL**
    `http://localhost:9090/api/mazos/:id`
+ **Método**
    `GET`

#### Obtener mazos de un usuario
+ **URL**
    `http://localhost:9090/api/mazos/user/:id_user`
+ **Método**
    `GET`
+ **Params**
    `x-token`

#### Obtener cartas de un mazo
+ **URL**
    `http://localhost:9090/api/mazos/cartas/:id`
+ **Método**
    `GET`
+ **Params**
    `x-token`

#### Rutas de planificador de mazos

##### Obtener mazo recomendado
+ **URL**
    `http://localhost:9090/api/planificador/recomendacion`
+ **Método**
    `POST`
+ **Body**
    ```json
    {
        "nombre": "mazo1",
        "id_usuario": 1,
        "formato": "Commander",
        "colores": [
            "W",
            "R"
        ]
    }
    ```

##### Crear mazo
+ **URL**
    `http://localhost:9090/api/planificador/crearMazo`
+ **Método**
    `POST`
+ **Body**
    ```json
    {
        "nombre": "mazo1",
        "id_usuario": 1,
        "formato": "Commander"
    }
    ```
+ **Params**
    `x-token`

##### Añadir carta a mazo
+ **URL**
    `http://localhost:9090/api/planificador/agregarCartaAMazo`
+ **Método**
    `POST`
+ **Body**
    ```json
    {
        "id_carta": 1,
        "id_mazo": 1
    }
    ```
+ **Params**
    `x-token`


### Rutas de la tienda

#### Obtener todas las cartas
+ **URL**
    `http://localhost:9090/api/tienda`
+ **Método**
    `GET`

#### Get carta de la tienda por ID
+ **URL**
    `http://localhost:9090/api/tienda/:id`
+ **Método**
    `GET`

#### Poner en venta carta
+ **URL**
    `http://localhost:9090/api/tienda`
+ **Método**
    `POST`
+ **Body**
    ```json
    {
        "id_vendedor" : 8,
        "id_carta" : 5,
        "precio" : 10,
        "estado" : "en buen estado"
    }
    ```
+ **Params**
    `x-token`
