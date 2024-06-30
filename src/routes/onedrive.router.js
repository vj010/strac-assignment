const router = require("express").router;
const axios = require("axios");
require("dotenv").config();

function getOneDriveFiles() {
  return `https://login.live.com/oauth20_authorize.srf?client_id={client_id}&scope=offline_access
    &response_type=token&redirect_uri={redirect_uri}`;
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
