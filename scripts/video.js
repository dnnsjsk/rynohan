const { exec } = require("child_process");
const env = process.argv;

const ls = exec(
  `remotion render remotion/index.js Scene public/clips/${env[2]}.mp4 --props='{"number": "${env[2]}"}'`,
  function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log("Error code: " + error.code);
      console.log("Signal received: " + error.signal);
    }
    console.log("Child Process STDOUT: " + stdout);
    console.log("Child Process STDERR: " + stderr);
    console.log("Complete!");
  }
);

ls.on("exit", function (code) {
  console.log("Child process exited with exit code " + code);
});
