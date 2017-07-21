# Linux Environment Setup
You can get the image directly from Chris, or if you are using Raspbian or another Linux distro, follow the rough steps below:

1. Install sudo

		$ su
		$ apt-get install sudo

2. Add the user to sudoers

		$ su 
		$ usermod -aG sudo kiicyient
		$ su - kiicyient

3. Install curl 

		$ sudo apt-get install curl

4. Install nvm

		$ sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

5. Install node v6.11.1

		$ nvm install v6.11.1
		$ nvm use v6.11.1


# General Project Setup

0. Clone the git repository

		$ git clone https://github.com/cjbeauchamp/KiiTrain.git

1. Create a config file from the template. The actual config file is ignored by git for security reasons.

		$ cp config.template.sh config.sh

2. Create a Kii Cloud application with Android (recommend Singapore https://api-sg.kii.com)

3. Edit the `config.sh` file by inserting your application's values

4. Add an app owner in Developer Portal

5. Create a group for owners, add the owner to the group.

6. Create several sensors owned by the owners group in Thing-IF onboarding console

	- Door Open Sensors
	- Seat Pressure Sensors

7. Create our controller device using the same method.

# Linux Controller

1. Install [kii node](https://docs.kii.com/en/guides/cloudsdk/javascript/quickstart/install-nodejs/)

		$ cd ./linux
		$ npm install kii-cloud-sdk --save

2. Initialize in `main.js` and `kii.config.js`

		// main.js
		global.kii = require('kii-cloud-sdk').create();
		require('./kii.config.js');

		// kii.config.js
		kii.Kii.initializeWithSite('__appid__', '__appkey__', kii.KiiSite.US);

3. Authenticate the [thing](https://docs.kii.com/en/guides/thingifsdk/thingsdk/thing-javascript)

4. Listen for sensor data (file reader)

	- Add `watch.js` to main
	- Link to library

			$ npm install chokidar --save

	- Create an `./events` directory
	- Run the script
	- Touch a file to show change

5. Write data via simulator

		$ bash ../simulate/perform.sh

6. Handle the first simulator data type: station data

	- Add `readEvent` method to `watch.js`
	- Output to and create `fileRead` method to `watch.js`

7. On file update, write to controller bucket

	- Create stations in app-scope `stations` bucket (with customIDs)
		- station1
		- station2
		- station3

	- Add `station.js` file and addEvent data
	- Include `station.js` requirement in `watch.js`
	- Add eventType=='station' to `fileRead` method

8. Set up MQTT for state update (real-time GPS) https://docs.kii.com/en/guides/thingifsdk/rest/bi_directional_mqtt/mqtt_request/

	- Create push.js file and createInstallation method. Work through each step.
	- Install mqtt library

			$ cd ./linux
			$ npm install mqtt --save

	- Add to `push.js`
	- Create `state.js` file
	- Add eventType=='state' to `watch.js`


9. Use server extension to read in data from other sensors. Controller sends data, parsed and updates state of sub-sensors.

	- Create `../extensions/main.js` method `sensor_reading`
		- Do it little by little, so you can see how it's put together
	- Download Kii server extensions

			$ cd ./extensions
			$ npm install kii-cli --save

	- Deploy using

			$ sh ./extensions/deploy.sh

	- Show the logs in dev portal
	- Add `sensor.js` file and methods
	- import `sensor.js` into `watch.js`
	- Add eventType=='sensor' to `watch.js`

# Android App

1. Download App from portal

2. Import project into Android Studio

3. Create device (Nexus 5x with play store)

# Web Dashboard

- Use ThingIF trigger to call server extension on state change to push to app topic that train has moved

- Controller should receive notifications from administrators via MQTT
