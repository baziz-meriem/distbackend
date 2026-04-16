/**
 * Load committed .env first (override platform defaults), keep host PORT, then migrate + app.
 */
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const hostPort = process.env.PORT;

require('dotenv').config({
  path: path.join(root, '.env'),
  override: true,
});
if (hostPort !== undefined) {
  process.env.PORT = hostPort;
}

const prisma = path.join(root, 'node_modules', '.bin', 'prisma');
const migrate = spawnSync(prisma, ['migrate', 'deploy'], {
  stdio: 'inherit',
  env: process.env,
  cwd: root,
});
if (migrate.error) {
  console.error(migrate.error);
  process.exit(1);
}
if (migrate.status !== 0) {
  process.exit(migrate.status ?? 1);
}

require(path.join(root, 'src', 'index.js'));
