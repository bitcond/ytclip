const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function transcribe(audioPath) {
  const outputPath = path.join(__dirname, 'output.txt');

  await new Promise((resolve, reject) => {
    exec(`whisper "${audioPath}" --model small --language en --output_format txt --output_dir "${__dirname}"`, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  const transcript = fs.readFileSync(outputPath, 'utf8');
  fs.unlinkSync(outputPath);
  return transcript;
}

module.exports = { transcribe };
