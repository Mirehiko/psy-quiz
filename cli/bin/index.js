#! /usr/bin/env node
const yargs = require("yargs");
const fs = require("node:fs");
const { promisify } = require("node:util");

// const argv = yargs.default(process.argv.slice(2))
//   .command('$0', '', () => {
//   }, (argv) => {
//     console.log('== MI-Term CLI!==');
//     console.log(argv);
//   })
//   .parse();
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

const setupDefaultEnv = yargs
  .default(process.argv.slice(2))
  .command({
    command: "setup-env [url]",
    aliases: [".env"],
    desc: "setup default environment",
    // builder: yargs => yargs.default('value', 'true'),
    handler: (argv) => {
      console.log("Setup default environment");
      if (!argv.url) {
        fs.writeFile("./.env", defaultEnvContent, (err) => {
          if (err) {
            console.error(err);
          } else {
            copyEnvFile();
          }
        });
      } else {
        copyEnvFile();
      }
    },
  })
  // .command({
  //   command: 'build',
  //   desc: 'run server',
  //   handler: (argv) => {
  //     yargs.op;
  //   }
  // })
  // .command({
  //   command: 'run migration',
  //   desc: 'run server'
  // })
  .help()
  .wrap(72)
  .parse();

function copyEnvFile() {
  fs.copyFile(".env", "./project/.env", (err) => {
    if (err) throw err;
    console.log(".env was copied to ./project/.env");
  });
}
