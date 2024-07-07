const readline = require("readline");
const axios = require("axios");
const tokenData = require("./token-data");

const green = "\x1b[32m";
const white = "\x1b[37m";
// Create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const authenticationErrorMessage =
  "user not authenticated : execute login command";
const listFilesErrorMessage =
  "could not fetch files from one drivce : try re-authenticating using login command";

function padRight(str, width) {
  return str.padEnd(width, " ");
}

async function loginCommand() {
  console.log(`${white}`);
  const res = await axios.get(
    `http://localhost:${process.env.PORT}/auth/login`
  );
  if (res?.data) {
    console.log(`go to following url to authenticate: ${res.data}`);
  } else {
    console.log(`authentication url could not be acquired`);
  }
}

async function listCommand() {
  console.log(`${white}`);
  if (!tokenData.accessToken) {
    console.log(authenticationErrorMessage);
    return;
  }
  const res = await axios.get(
    `http://localhost:${process.env.PORT}/onedrive/getFilesList`
  );

  if (!res?.data || !res?.data?.isSuccess) {
    console.log(listFilesErrorMessage);
    return;
  }

  const fileList = res.data?.data;
  if (!fileList?.length) {
    console.log("no files to show");
    return;
  }

  console.log(padRight("Name", 50) + padRight("ID", 50));
  console.log("-".repeat(100));

  fileList?.forEach((fileObject) => {
    console.log(padRight(fileObject.name, 50) + padRight(fileObject.id, 50));
    // console.log(fileObject.name, `(${fileObject.id})`);
  });

  //   console.log(res?.data);
}

function downloadCommand(fileId) {
  if (!tokenData.accessToken) {
    console.log(authenticationErrorMessage);
  }
}

function userListCommand(fileId) {
  if (!tokenData.accessToken) {
    console.log(authenticationErrorMessage);
  }
}

// Ask the user a question
const commandInput = () => {
  rl.question(
    `${green}Supported Commands:    login     list    download <file-id>      user-list <file-id> \n`,
    async (answer) => {
      const commandParts = answer?.trim()?.split("s+");

      //   console.log("commandParts", commandParts);
      //   readline.moveCursor(process.stdout, 0, -1); // Move cursor up one line
      //   readline.clearLine(process.stdout, 1); // Clear the line to the right of the cursor
      if (commandParts[0] === "login") {
        await loginCommand();
      } else if (commandParts[0] === "list") {
        await listCommand();
      } else if (commandParts[0] === "download") {
        downloadCommand(commandParts[1]);
      } else if (commandParts[0] === "user-list") {
        userListCommand(commandParts[1]);
      } else if (commandParts[0] === "exit") {
        process.exit(0);
      } else if (commandParts[0] === "") {
        console.log("no command provided");
      } else {
        console.log("command not suppored");
      }

      console.log("\n\n");

      commandInput();
    }
  );
};

commandInput();
