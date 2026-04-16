/**
 * Demo users for local / staging. Run: npx prisma db seed
 *
 * Register often fails because the API requires numTel to be exactly 10 digits (0–9 only).
 */
const path = require('path');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient();

const DEMO_PASSWORD = 'demo123456';

async function main() {
  const hash = await bcrypt.hash(DEMO_PASSWORD, 10);

  await prisma.consommateur.upsert({
    where: { email: 'demo@example.com' },
    update: { mot_de_passe: hash },
    create: {
      nom: 'Demo',
      prenom: 'User',
      email: 'demo@example.com',
      mot_de_passe: hash,
      numTel: '0612345678',
    },
  });

  await prisma.sADM.upsert({
    where: { email: 'admin@example.com' },
    update: { mot_de_passe: hash },
    create: {
      nom: 'Super',
      prenom: 'Admin',
      email: 'admin@example.com',
      mot_de_passe: hash,
      numTel: '0612345679',
    },
  });

  console.log('Seed OK. Login with:');
  console.log('  Consommateur POST /api/v1/auth/consommateur/login');
  console.log('    email: demo@example.com  password:', DEMO_PASSWORD);
  console.log('  SADM       POST /api/v1/auth/sadm/login');
  console.log('    email: admin@example.com  password:', DEMO_PASSWORD);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
