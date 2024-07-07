const router = require("express").Router();
const axios = require("axios");
const fs = require("fs");

const tokens = require("../token-data");
require("dotenv").config();

async function getAccessToken() {}

async function getOneDriveFiles(accessToken, userId) {
  try {
    const microsoftGraphUrl = `${process.env.MICROSOFT_GRAPH_URL}/drives/${process.env.ONE_DRIVE_ID}/root/children`;
    const res = await axios.get(microsoftGraphUrl, {
      headers: { Authorization: `Bearer${accessToken}` },
    });

    const filesList = res?.data?.value
      ?.filter((item) => item.file)
      ?.map((fileInfo) => ({
        name: fileInfo.name,
        id: fileInfo.id,
      }));
    return filesList;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getFileInfo(fileId, accessToken) {
  const microsoftGraphUrl = `${process.env.MICROSOFT_GRAPH_URL}/drive/items/${fileId}`;
  const res = await axios.get(microsoftGraphUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res?.data;
}

async function downloadFile(downloadUrl, name) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: downloadUrl,
      responseType: "stream",
    })
      .then(function (response) {
        // Pipe the response stream to a file
        response.data.pipe(
          fs.createWriteStream(process.env.DOWNLOAD_PATH + name)
        );
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
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

router.get("/downloadFile/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  try {
    const fileInfo = await getFileInfo(fileId, tokens.accessToken);
    const name = fileInfo.name;
    const downloadUrl = fileInfo["@microsoft.graph.downloadUrl"];
    await downloadFile(downloadUrl, name);
    res.json({
      isSuccess: true,
      message: "success",
      data: null,
    });
  } catch (e) {
    // console.log(e);
    res.json({
      isSuccess: false,
      message: e.message,
      data: null,
    });
  }
});

router.get("/getUserListForFile", (req, res) => {
  const queryParams = req.queryParams;
});

module.exports = router;
