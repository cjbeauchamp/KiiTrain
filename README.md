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

		https://github.com/cjbeauchamp/KiiTrain.git

1. Create a config file from the template. The actual config file is ignored by git for security reasons.

		$ mv config.template.sh config.sh

2. Create a Kii Cloud application (recommend Singapore https://api-sg.kii.com)

3. Edit the `config.sh` file by inserting your application's values

4. Add an app owner in Developer Portal

5. Create a group for owners, add the owner to the group.

6. Create several sensors owned by the owners group in Thing-IF onboarding console

	- Door Open Sensors
	- Ambient Light Sensors
	- Seat Pressure Sensors

7. Create our controller device using the same method.

# Linux Controller

1. Install [kii node](https://docs.kii.com/en/guides/cloudsdk/javascript/quickstart/install-nodejs/)

		$ cd ./linux
		$ npm install kii-cloud-sdk --save

2. Initialize in `main.js`

		var kii = require('kii-cloud-sdk').create();
		kii.Kii.initializeWithSite('__appid__', '__appkey__', kii.KiiSite.US);

3. Authenticate the [thing](https://docs.kii.com/en/guides/thingifsdk/thingsdk/thing-javascript)

4. Listen for sensor data (file reader)

5. Write data via simulator

6. Handle the first simulator data type: station data

7. On file update, write to controller bucket

8. Set up MQTT for state update (real-time GPS)

9. Receive notifications from administrators via MQTT

10. Use server extension to read in data from other sensors. Controller sends data, parsed and updates state of sub-sensors.

# Android App

# Web Dashboard

# Server Extensions
