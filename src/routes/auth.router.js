const router = require("express").router;
const axios = require("axios");
require("dotenv").config();

function getAzureOAuthUrl() {
  return ``;
}

router.get("/login", (req, res) => {
  const queryParams = req.queryParams;
  const redirectUr = getAzureOAuthUrl();
  res.redirect(redirectUr, 302);
});

module.exports = router;
