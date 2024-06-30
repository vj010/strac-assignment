const router = require("express").Router();
const axios = require("axios");

const tokens = require("../token-data");
require("dotenv").config();

function getOneDriveFiles() {
  return `https://login.live.com/oauth20_authorize.srf?client_id=7ae1e288-d76b-43a7-97de-399d5270c714&scope=offline_access
    &response_type=token&redirect_uri=http://localhost:4999/login`;
}

function downloadFile() {
  return ``;
}

function getUserListForFile() {}

router.get("/getFilesList", (req, res) => {
  const queryParams = req.queryParams;
  // res.json({ tokens });
});

router.get("/downloadFile", (req, res) => {
  const queryParams = req.queryParams;
});

router.get("/getUserListForFile", (req, res) => {
  const queryParams = req.queryParams;
});

module.exports = router;
