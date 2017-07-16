# Fullstack < - > Java and AngularJS
## Springboot - AngularJS
### Resume
This is a course that I took this last month to strengthen my knowledge in "Angular" and improve my skills in "Backend".

Without more that to say let's to code!

### Description
The "Backend" use *Springboot* with some libraries for the correct running.
The "Frontend" use *AngularJS* with Bootstrap mainly.
The "Persistence" use MongoDB but you need to install, configure in backend for your respective connection.

---

## For Backend
### Requeriments
  * Maven
  * JDK >= 7

### First Run
Go to into folder called Spring Boot and type
* mvn clean package
* java -jar /target/(name_ of _file _generated).jar
For you correctly run verify if the Swagger Ui is running
* In your browser type "http://localhost:8080/swagger-ui.html"

---

## For Frontend
### Requeriments
  * NodeJS
  * Gulp
  * Bower

### First Run
Go to into folder called AngularJS and type:
* npm install
* bower install
* gulp -> (then the UI will open in Chrome Browser)

---

## For Persistence
### Requeriments
  * MongoDB
  * Robo Mongo (optional)

### First Run
Go to into main folder and type:
* mongod --dbpath /name-of-your-folder-name-where-you-want-to-save-the-data
