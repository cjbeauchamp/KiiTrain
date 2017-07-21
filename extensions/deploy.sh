#!/bin/bash

. ../config.sh

echo "Deploying code..."

node node_modules/kii-cli/bin/kii-servercode.js deploy-file \
	--file main.js \
	--site ${SITE_ABBRV} \
	--app-id ${APP_ID} \
	--app-key ${APP_KEY} \
	--client-id ${CLIENT_ID} \
	--client-secret ${CLIENT_SECRET}