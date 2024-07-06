const router = require("express").Router();
const axios = require("axios");
const qs = require("qs");

const tokens = require("../token-data");
require("dotenv").config();

function getAzureOAuthUrl() {
  const authCodeApiUrl = process.env.AUTHORIZATION_CODE_URL;
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;
  return `${authCodeApiUrl}?client_id=${clientId}&scope=files.readwrite.all%20offline_access&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;
}

async function getAccessAndRefreshToken(
  accessTokenApiUrl,
  code,
  clientId,
  redirectUri,
  clientSecret
) {
  try {
    const res = await axios.post(
      accessTokenApiUrl,
      qs.stringify({
        code,
        client_id: clientId,
        redirect_uri: redirectUri,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        scope: "files.readwrite.all offline_access",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

router.get("/login", (req, res) => {
  const queryParams = req.queryParams;
  const redirectUr = getAzureOAuthUrl();
  // res.json({ isSuccess: true });
  res.redirect(302, redirectUr);
});

router.get("/oauth/login", async (req, res) => {
  const queryParams = req.query;
  const code = queryParams.code;
  const codeRes = await getAccessAndRefreshToken(
    process.env.ACCESS_TOKE_URL,
    code,
    process.env.CLIENT_ID,
    process.env.REDIRECT_URI,
    process.env.SECRET_VALUE
  );
  if (!codeRes) {
    res.json({
      isSuccess: false,
      message: "Something went wrong. Token could not be acquired",
    });
  } else {
    console.log("token data", codeRes);
    tokens.accessToken = codeRes.access_token;
    tokens.refreshToken = codeRes.refresh_token;
    tokens.userId = codeRes.user_id;
    res.json({ isSuccess: true, message: "token acquired" });
  }
});

module.exports = router;
