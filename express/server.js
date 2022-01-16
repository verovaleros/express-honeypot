const express = require("express");
const cors = require("cors");
const generateStatics = require("./honey/generateStatics");
const config = require("./config");
const beekeeperRouter = require("./beekeeper/router");
const hiveRouter = require("./hive/router");
const honeyRouter = require("./honey/router");

const app = express();

app.set("port", config.PORT);
app.set("trust proxy", true);

app.use(cors());

app.get("/", (req, res) => {
  res.send(generateStatics.indexHtml());
});
app.get("/robots.txt", (req, res) => {
  res.send(`User-agent: * \r\n Disallow: /hive/`);
});
app.get("/sitemap.xml", async (req, res) => {
  res.set("Content-Type", "text/xml");
  res.send(generateStatics.sitemapXml());
});

app.use(express.static(`${__dirname}/beekeeper/public`));
app.use("/beekeeper", beekeeperRouter);
app.use("/hive", hiveRouter);
app.use("/*", honeyRouter);

app.listen(app.get("port"), () => {
  // console.log("listening");
});
