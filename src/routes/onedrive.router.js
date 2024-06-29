const router = require("express").router;
const axios = require("axios");
require("dotenv").config();

function getOneDriveFiles() {
  return ``;
}

function downloadFile() {
  return ``;
}

function getUserListForFile() {}

router.get("/getFilesList", (req, res) => {
  const queryParams = req.queryParams;
});

router.get("/downloadFile", (req, res) => {
  const queryParams = req.queryParams;
});

router.get("/getUserListForFile", (req, res) => {
  const queryParams = req.queryParams;
});
