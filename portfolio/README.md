# Acerca

 Este repositorio es una creación de Franco N. Angeletti para alojar el *front-end* de su currículum. Cabe decir que este mismo, también fue creado para concretar la resolución del trabajo práctico de [Argentina Programa](https://www.argentina.gob.ar/economia/conocimiento/argentina-programa).
 
#### Info de la página

> Hasta este momento, (***versión 2.7***) esta página no tiene ninguna interacción con ninguna Base de Datos, mas que con una archivo JSON. Se espera lograr una página dinámica donde también se pueda hacer algún tipo de interacción con una API que modifique el contenido de la página y de la base de datos.
> Las tecnologías que comprenden esta aplicación son: *TypeScript*, *HTML*, *CSS*, *Java*, *Boostrap*, *Angular*, entre otras.

## ¿Qué información podremos encontrar?

Bueno, sencillamente, al entrar en la página podremos ver la siguiente información:
- Una sección de "Acerca de mi".
- Otra sección donde veremos la "Experiencia laboral" (*Actualmente en desuso por falta de esta misma*).
- La sección de "Educación".
- Una sección para "Habilidades Blandas".
- Y, por último, una sección de proyectos.

Una implementación de la página es que, muestra cada sección de una manera distinta a la anterior.

## ¿Qué se podrá modificar en este curriculum?

 Bueno, si accede a la página, podrá notar en la parte superior izquierda un botón que permite loggearse... Lo cual significa que el contenido de la misma podrá modificarse ¿O no? Si y, es que, la **MAYORIA** de lo que se encuentra en la página puede ser modificado por el usuario sin necesidad de acceder al *inspector* y dajandolo acentado en la base de datos para que el próximo usuario vea los cambios (por ahora los cambios solo se hacen en el JSON y el Front-End).

## ¿Cómo iniciar el proyecto?

 1. Primero, debemos descargar el repositorio y descomprimirlo en donde lo veamos pertinente.
 2. Luego, abrimos dos consolas dentro de la carpeta generada y ejecutamos los siguentes comandos:
 ```{bash}
    json-server --watch ./src/assets/data/db.json --port 4000
 ```
 ```{bash}
    ng serve
 ```
 El primer comando iniciará el módulo de node que escuchará los cambios de la base de datos y, el segundo comenzará el framework de manera local en la dirección que muestre al final del output... Cabe decir que también debemos instalar node dentro de la carpeta y json-server.

---
##### Problemas e impedimentos

 Hasta el momento, la página, solo se encuentra con un problema de alojamiento del mismo.