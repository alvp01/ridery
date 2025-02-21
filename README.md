# README

Hola, equipo de Ridery, gracis por tomarse el tiempo de revisar mi proyecto y considerar mi candidatura.

## Setup

**importante**: se asume que se trabaja en un ambiente basado en Debian, como Ubuntu (o Debian) o se usa WSL.

Para iniciar hay que clonar el repositorio usando uno de los siguientes comandos dentro carpeta deseada, haciendo uso de una línea de comandos:

`git clone git@github.com:alvp01/ridery.git` (si se clona usando SSH)

`git clone https://github.com/alvp01/ridery.git` (si se clona usando https)

### Instalando MongoDB

Para instala MongoDB correr los siguientes comandos:

````
sudo apt-get update
sudo apt-get install -y mongodb-org
````

Y para iniciar el servicio de MongoDB:

`sudo systemctl start mongod
`

### Instalando dependencias

Para instalar las dependencias tanto del backend como del frontend:

Hace falta navegar a la carpeta del frontend y ejecutar:

`npm i`

Para instalar las dependencias del backend hace falta navegar a la carpeta del backend y ejecutar:

`npm i`

### Populando la base de datos

Si se quiere popular la base de datos hace falta ubicarse en la carpeta backend y ejecutar el siguiente comando:

`npm run db:seed`

Este comando hace un reset de la base de datos y la popula con datos nuevos

### Corriendo el proyecto:

Para correr el proyecto es importante crear archivos .env en las raices de las carpetas del backend y del frontend:

````
.
├── backend
|   ├── .env
│   └── src
│       ├── api
│       │   └── v1
│       │       ├── controllers
│       │       ├── middlewares
│       │       ├── models
│       │       ├── routes
│       │       └── services
│       └── database
└── frontend
    ├── .env
    ├── public
    └── src
        ├── api
        ├── components
        ├── layouts
        ├── pages
        ├── plugins
        ├── router
        ├── services
        └── utils
````

La estructura de `./backend/.env` es la siguiente:

````
JWT_SECRET=<SECRETO>
DB_URI=<URL DE BASE DE DATOS> 
````
Se puede crear un secreto para el JWT usando [esta página](https://jwtsecret.com/generate)
Un ejemplo de URL de base de datos para mongo: `mongodb://localhost:27017/ridery`

La estructura de `./frontend/.env` es la siguiente:

````
VITE_APP_BASE_API_URL = <URL BASE>
````

Ejemplo de la URL base de la api: http://localhost:3000

### Corriendo el proyecto:

Para correr el proyecto hace falta usar dos terminales:

*Terminal 1*

- Ubicarse en el directorio `./backend`
- Correr en comando: `npm run dev`

*Terminal 2*

- Ubicarse en el directorio `./frontend`
- Correr el comando: `npm run dev`

*En el navegador*

Navegar hacia la dirección `http://localhost:5173/login`

#### Consideraciones:

- En caso de encontrar problemas instalando MongoDB, puedes visitar [su página oficial](https://www.mongodb.com/docs/manual/installation/)
- Aquí hay un pequeño video de [cómo funciona la app](https://www.loom.com/share/b2ca91e13d1d40408159cb61506074a6?sid=a2262acf-d893-4cce-acfd-1f0d80115644)