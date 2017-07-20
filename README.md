# Linux Environment Setup
You can get the image directly from Chris, or if you are using Raspbian or another Linux distro, follow the rough steps below:

- Install sudo

	$ su
	$ apt-get install sudo

- Add the user to sudoers

	$ su 
	$ usermod -aG sudo kiicyient
	$ su - kiicyient

- Install curl 

	$ sudo apt-get install curl

- Install nvm

	$ sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

- Install node v6.11.1

	$ nvm install v6.11.1
	$ nvm use v6.11.1


