# Movie App
Movie App es una aplicación que permite a los usuarios poder buscar, informar y guardar contenido que sea de su preferencia. La aplicación incluye una vista principal con las películas mejor puntuadas, una sección con las películas más populares y otra sección con las series más populares. Permite además la creación de usuarios, autenticación de usuarios y un sistema de prevalencia en la información mediante una base de datos.

# Instrucciones de despliegue.
La aplicación esta contruida en basea múltiples técnologías y modulos, por lo que se recomienda seguir las siguientes instrucciones para un correcto despligue de la aplicación:

## 1.- Instalación de dependencias
Una vez tenga el proyecto en su equipo local, deberá ingrear a los directorios /frontend y /backend y cada uno deberá ejecutar el comando:
                        npm install

Con esto, todos las dependencias quedarán correctamente instaladas.

## 2.- Instalar motor PostgreSQL
El almacenamiento de datos de este proyecto se realizó mediante postgreSQL, por lo que se necesita tener instalado dicho motor en su equipo para que la aplicación pueda funcionar en su totalidad.

## 3.- Creación de database en PostgreSQL
Una vez instalado postgreSQL y tener la configuración de seguridad hecha, se debe ingresar postgreSQL mediante la terminal a través de del comando psql (o el medio que estime conveniente) y pegar el  script que se encuentra en la carpeta '/backend/database/movieDB.sql'. Este script contiene la creación de la basede datos y de las tablas con las cuales trabajará la aplicación.

## 4.- Creación del archivo .env
Se debe ingresar al directorio /backend y en esta raíz se debe crear un archivo con el nombre '.env', el cuál tendrá las variables de entorno para la conexión de la base de datos con el paquete PG y la API Key para poder conectarse a la API TMDB. Una vez creado, debe ingresar en el e ingresar lo siguiente:

                        PORT=3000
                        PG_HOST=localhost
                        PG_USER=username
                        PG_PASSWORD=password
                        PG_DATABASE=databasename
                        PG_PORT=5173
                        API_KEY=llaveApi

En esta información, se debe modificar los campos PG_USER, PG_PASSWORD, PG_DATABASE y API_KEY colocar los valores de su base de datos local sin comillas (ejmplo: PG_USER=pedro). Parala API_KEY, se debe generar una llave en la API TMDB e ingresarla endicho campo.

## 5.- Ejecutar tanto el FrontEnd como el BackEnd
Una vez realizadas todas las preparaciones indicadas en los pasos 1 al 4, se debe poner en funcionamiento el servidor Backend y la interfaz de cliente Frontend. Para esto, primero se debe aceder al directorio '/backend' y en su raíz ejecutar el comando:
                        npm run dev

Una vez incializado, se debe abrir una nueva terminal pero esta vez para acceder a la raíz de '/frontend' y ejecutar el mismo comando.

Siguiendo estos pasos, la aplicación se desplegará correctamente.

Gracias por tu atención!