@echo off

REM ------------------------------------------------------------
REM Skript for å bygge og starte med Docker på Windows.
REM OBS! Må kjøres i CMD som administratorbruker.
REM ------------------------------------------------------------

docker rm -f react
call docker build -t react . --pull
call docker run -d -p 8080:8080 --name react react
call docker logs -f react
