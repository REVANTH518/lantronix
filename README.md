###### LANTRONIX ######
This project handles the users registration and user login process.

### Install necessary packeges 
## Ubuntu platform

sudo apt-get update
sudo apt-get install git -y

## ----- Install NVM and node version 14.15.5 -----

touch ~/.bash_profile
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source ~/.bash_profile
nvm install 14.15.5
nvm use 14.15.5
nvm alias default 14.15.5
npm config set registry http://registry.npmjs.org/

## -------------------------------------------------

## -------- Creating a local mysql database --------
Install mysql server community edition (version 5.7.16 or higher) locally. Do not enable validate password plugin. Enter password as ```root``` when prompted. Skip all other options.

sudo apt-get update
sudo apt-get install mysql-server-5.7 -y
sudo apt-get install mysql-client-5.7 -y
sudo systemctl start mysql
sudo systemctl enable mysql
sudo service mysql restart

## --------------------------------------------------------

## --- Create mysql databases by running below scripts. ---

mysql -uroot -proot  -e 'create database `lantronix`';

## ---------------------------------------------------------

Install packages
-- got to project directory and run 
    npm install
-- to start server do 
    npm start
-- to run test cases run 
    npm test
