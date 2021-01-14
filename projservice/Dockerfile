FROM openjdk:11.0.9.1-jdk

ARG JAR_FILE=storegoservice/target/*.jar

COPY ${JAR_FILE} application.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/application.jar"]