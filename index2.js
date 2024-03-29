const { spawn } = require('node:child_process');
const ls = spawn('docker run --name curtiktop -e TIKTOKUSERNAME=meulitoraletop iotbrlabs/curtiktop:latest', ['']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});