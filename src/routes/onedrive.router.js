const router = require("express").Router();
const axios = require("axios");

const tokens = require("../token-data");
require("dotenv").config();

async function getAccessToken() {}

async function getOneDriveFiles(accessToken, userId) {
  try {
    const microsoftGraphUrl = `${process.env.MICROSOFT_GRAPH_URL}/${userId}/drives`;
    const res = await axios.get(microsoftGraphUrl, {
      headers: { Authorization: `Bearer${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function downloadFile() {
  return ``;
}

function getUserListForFile() {}

router.get("/getFilesList", async (req, res) => {
  const filesList = await getOneDriveFiles(tokens.accessToken, tokens.userId);
  if (!filesList) {
    res.json({
      isSuccess: false,
      message: "could not fetch files",
      data: null,
    });
  } else {
    res.json({ isSuccess: true, message: "success", data: filesList });
  }
});

router.get("/downloadFile", (req, res) => {
  const queryParams = req.queryParams;
});

router.get("/getUserListForFile", (req, res) => {
  const queryParams = req.queryParams;
});

module.exports = router;
