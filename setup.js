import { execSync } from 'child_process'

console.log('🚀 Setting up the project...')

try {
  console.log('📦 Installing dependencies...')
  execSync('npm install', { stdio: 'inherit' })

  console.log('🔄 Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit' })

  console.log('📊 Running database migrations...')
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' })

  console.log('✅ Setup complete! Run "npm run dev" to start the server.')
} catch (error) {
  console.error('❌ Error during setup:', error)
  process.exit(1)
}
