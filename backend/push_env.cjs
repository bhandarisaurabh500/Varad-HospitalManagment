const fs = require('fs');
const { execSync } = require('child_process');

const envFile = fs.readFileSync('.env', 'utf-8');
const lines = envFile.split('\n');

for (const line of lines) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    if (!key) continue;
    
    console.log(`Adding ${key}...`);
    try {
      execSync(`npx vercel env add ${key} production`, {
        input: value,
        stdio: ['pipe', 'pipe', 'pipe']
      });
      console.log(`Added ${key} successfully.`);
    } catch (e) {
      console.error(`Failed to add ${key}:`, e.stderr ? e.stderr.toString() : e.message);
    }
  }
}
