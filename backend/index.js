const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const mails = require("./mail.json");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.listen(4000, () => console.log("PORT: 4000"));

app.post("/api.php", (req, res) => {
  const { method, payload } = req.body;
  if (method == "getMails") {
    return res.send({ status: true, data: mails.slice(0,19) });
  }
  if (method == "getMailsByPage") {
    let mailData = mails.slice();
    mailData = mailData.slice(payload.page * 10, payload.page * 10 + 9);
    return res.send({ status: true, data: mailData });
  }
  if (method == "changeRead") {
    try {
      console.log(payload.id);
      mails[payload.id].read = mails[payload.id].read == false ? true : false;
      fs.writeFileSync(
        path.join(__dirname, "./mail.json"),
        JSON.stringify(mails),
        "utf-8"
      );
      return res.send({ status: true });
    } catch {
      return res.send({ status: false });
    }
  }
  return res.send({ status: false });
});
