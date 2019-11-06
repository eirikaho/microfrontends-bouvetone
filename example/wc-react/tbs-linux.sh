#!/usr/bin/env bash

sudo docker rm -f react
sudo docker build -t react . --pull
sudo docker run -d -p 3003:3003 \
    --name react \
    react
sudo docker logs -f react
