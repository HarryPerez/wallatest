const { spawn } = require('child_process');

const argv = require('minimist')(process.argv.slice(2));

const env = argv._[0];

if (env === 'production') {
  spawn(`node ./node_modules/@rescripts/cli/bin/rescripts.js start`, {
    stdio: 'inherit',
    shell: true,
  });
} else {
  const { success, validateEnvs } = require('./utils');
  validateEnvs(env);
  success(`Starting '${env}'`);
  spawn(`node ./node_modules/env-cmd/bin/env-cmd.js -f ./.env ./node_modules/@rescripts/cli/bin/rescripts.js start`, {
    stdio: 'inherit',
    shell: true,
  });
}
