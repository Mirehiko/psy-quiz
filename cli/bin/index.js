#! /usr/bin/env node
const fs = require('node:fs');
const vorpal = require('vorpal')();
const { execSync } = require('child_process');

const defaultEnvContent = `
#################################################################################
# WARNING: Current configuration is default and must replaced in production mode #
#################################################################################

#Database: postgres
DB_NAME=psy-quiz
DB_USER=postgres
DB_PASSWORD=postgres
DB_PORT=5432
DB_HOST=postgres
DB_VOLUMES="./db/pgdata:/var/lib/postgresql/data"
PROXY_PORTS=5432:5432

#Server
SERVER_PORT=5002
SERVER_PORTS=5002:5002
SERVER_VOLUMES="./project:/usr/src/app"
# SERVER_COMMAND="npm run psy-quiz-backend" // for development
JWT_SECRET="someSecret"

BUILD_TARGET="development" // development | production

#Frontend
FRONTEND_PORTS=8080:8080
`;


vorpal
  .command('setup-env ')
  .action((argv, cb) => {
    console.log('Setup default environment');
    if (!argv.url) {
      fs.writeFile('./.env', defaultEnvContent, (err) => {
        if (err) {
          console.error(err);
        } else {
          copyEnvFile();
        }
      });
    } else {
      copyEnvFile();
    }
    cb();
  });

vorpal
  .command('install ')
  .action((argv, cb) => {
    console.log('Installing deps');
    execSync('npm ci --prefix ./project');
    cb();
  });

vorpal
  .delimiter('miterm')
  .show();

function copyEnvFile() {
  fs.copyFile('.env', './project/.env', (err) => {
    if (err) throw err;
    console.log('.env was copied to ./project/.env');
  });
}

