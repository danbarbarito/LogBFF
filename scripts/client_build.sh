#!/bin/bash

npm --prefix client run build && find client/dist/assets/ -name '*.js' -exec cp {} assets/logbff.js \;