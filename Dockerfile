FROM openjdk:17
ADD target/cronjobs.jar cronjobs.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","cronjobs.jar"]