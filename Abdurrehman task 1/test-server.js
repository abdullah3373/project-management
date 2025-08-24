const { spawn } = require('child_process');

console.log('Starting server...');
const server = spawn('node', ['server/index-simple.js'], {
  stdio: 'pipe'
});

server.stdout.on('data', (data) => {
  console.log(`Server stdout: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Server stderr: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Give server time to start
setTimeout(() => {
  console.log('Testing server connection...');
  const { exec } = require('child_process');
  exec('curl http://localhost:3001/api/health', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
    }
    console.log(`Response: ${stdout}`);
    console.log(`Stderr: ${stderr}`);
    server.kill();
  });
}, 2000);
