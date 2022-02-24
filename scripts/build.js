const { spawn } = require('child_process');

const argv = require('minimist')(process.argv.slice(2));

const env = argv._[0];

if (env === 'production') {
  spawn(`rescripts build`, {
    stdio: 'inherit',
    shell: true,
  });
} else {
  const { success, validateEnvs } = require('./utils');
  validateEnvs(env);
  success(`Building '${env}'`);
  spawn(`node ./node_modules/env-cmd/bin/env-cmd.js -f ./.env rescripts build`, {
    stdio: 'inherit',
    shell: true,
  });
}
