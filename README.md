# Movie App
Movie App es una aplicación que permite a los usuarios buscar, informar y guardar contenido que sea de su preferencia. La aplicación incluye una vista principal con las películas mejor puntuadas, una sección con las películas más populares y una sección para buscar películas o series. Permite además la creación, autenticación y un sistema de prevalencia en la información de usuarios mediante una base de datos.

# Instrucciones de despliegue.
Para un correcto despliegue de la aplicación, se sugiere seguir el siguiente instructivo para una conexión exitosa entre la base de datos y la aplicación FullStack.

## 1.- Instalación de dependencias
Una vez tenga el proyecto en su equipo local, deberá ingresar a los directorios '/frontend' y '/backend' y en cada raíz deberá ejecutar el comando 'npm install'.

Con esto, todos las dependencias quedarán correctamente instaladas.

## 2.- Conexión a Base de datos.
La aplicación se realizó utilizando PostgreSQL como motor de base de datos. Para poder conectarse a ella existen dos métodos que se detallan a continuación:

### 2.1 A través de RDS de AWS.
Este es el método más sencillo y rápido. Se debe crear un archivo .env en la raíz de '/backend' y reemplazar la información por la adjunta en el correo enviado. Este archivo contiene las variables de entorno para conectarse a la base de datos. La API_KEY se debe reemplazar por una key generada en el sitio de la API [The Movie Data Base](https://www.themoviedb.org/). Para esto debe crear una cuenta e ir a los Ajustes de su cuenta para luego ir a la sección de API.

### 2.2 Configurando PostgreSQL de manera local.
Para esto se deben seguir las siguientes instrucciones:

#### 2.2.1 Instalar motor PostgreSQL
Se debe instalar [PostgreSQL](https://www.postgresql.org/) y seguir las instrucciones del ejecutable.

### 2.2.2 Creación de database en PostgreSQL
Una vez instalado postgreSQL y tener la configuración de seguridad hecha (contraseña y usuario que solicita al momento de instalar), se debe ingresar postgreSQL mediante la terminal a través de del comando psql (o el medio que estime conveniente) y pegar el script que se encuentra en la carpeta '/backend/database/movieDB.sql'. Este script contiene la creación de la base de datos y de las tablas con las cuales trabajará la aplicación.

### 2.2.3 Creación del archivo .env
Se debe ingresar al directorio /backend y en esta raíz se debe crear un archivo con el nombre '.env', el cuál tendrá las variables de entorno para la conexión de la base de datos con el paquete PG y la API Key para poder conectarse a la API TMDB. Una vez creado, debe ingresar en el e ingresar lo siguiente:

                        PG_HOST=localhost
                        PG_USER=username
                        PG_PASSWORD=password
                        PG_DATABASE=databasename
                        API_KEY=llaveApi

En esta información, se debe modificar los campos PG_USER, PG_PASSWORD y PG_DATABASE colocar los valores de su base de datos local sin comillas (ejmplo: PG_USER=pedro). Para la API_KEY, se debe realizar el mismo proceso indicado en el paso 2.1.

### 2.2.4 Ajuste de Pool en paquete PG
En el archivo '/backend/utils/queriesPg.js' se debe ajustar la configuración del Pool del paquete pg. Debe identificar la línea 14 de este código y eliminar la siguiente propiedad: 

                        ssl: {
                            rejectUnauthorized: false
                        }.

Esto debido a que esta es una configuración para el funcionamiento de la base de datos desde RDS (2.1).

## 3.- Ejecutar tanto el FrontEnd como el BackEnd
Finalmente, una vez realizadas todas las preparaciones indicadas en los pasos anteriores, se debe poner en funcionamiento el servidor Backend y la interfaz de cliente Frontend. Para esto, primero se debe aceder al directorio '/backend' y en su raíz ejecutar el comando 'npm run dev'.

Una vez incializado, se debe abrir una nueva terminal pero esta vez para acceder a la raíz de '/frontend' y ejecutar el mismo comando 'npm run dev'.

# Usuario por defecto
Se agrega un usuario en la base de datos para poder realizar pruebas dentro de la aplicación:
- user: prueba@prueba.com
- password: 123456

ó también se puede crear un usuario mediante el SignIn de la aplicación.

Siguiendo estos pasos, la aplicación se desplegará correctamente.

Gracias por tu atención!