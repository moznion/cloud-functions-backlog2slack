"use strict";

import { IssueConverter } from "./converter/issue_converter";
import { BacklogUrlBuilder } from "./backlog/backlog_url_builder";
import { SlackSender } from "./slack/slack_sender";

const config = require("./config.json");

exports.backlog2slack = async (req, res) => {
  /*eslint no-console: 0*/
  try {
    const body = req.body;
    const msg = convertMessage(body, new BacklogUrlBuilder(config.backlog.baseUrl));
    const resp = await new SlackSender({
      token: config.slack.token,
      channel: config.slack.channel,
      iconEmoji: config.slack.iconEmoji,
      username: config.slack.username,
    }).sendMessage(msg);

    if (resp.ok !== true) {
      console.error("Failed to process: " + resp);
      res.status(500).send("Failed");
      return;
    }
  } catch (err) {
    console.error("Failed to process: " + err.toString());
    res.status(500).send("Failed");
    return;
  }

  res.status(200).send("OK");
};

function convertMessage(body, urlBuilder) {
  switch (body.type) {
    case 1:
      return new IssueConverter(body, urlBuilder).convertAddEvent();
    case 2:
      return new IssueConverter(body, urlBuilder).convertUpdateEvent();
    case 3:
      return new IssueConverter(body, urlBuilder).convertCommentEvent();
    default:
      throw new Error("Unsupported type has come: " + body.type);
  }
}
