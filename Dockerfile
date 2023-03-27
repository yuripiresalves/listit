# syntax=docker/dockerfile:1



FROM openjdk:17 AS TEMP_BUILD_IMAGE
RUN microdnf install findutils
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY ./backend/ $APP_HOME/
RUN  ./gradlew bootJar 

FROM openjdk:17
ENV APP_HOME=/usr/app/
ENV spring.profiles.active=deploy
WORKDIR $APP_HOME
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/build/libs/* ./app.jar
EXPOSE 8080
CMD ["java","-jar", "app.jar"]
