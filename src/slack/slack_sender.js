"use strict";

import httpClient from "request-promise-native";

export class SlackSender {
  constructor({ token, channel, iconEmoji, username }) {
    this.token = token;
    this.channel = channel;
    this.iconEmoji = iconEmoji;
    this.username = username;
  }

  async sendMessage(message) {
    return httpClient({
      method: "POST",
      uri: "https://slack.com/api/chat.postMessage",
      json: true,
      form: {
        token: this.token,
        channel: this.channel,
        text: message.toText(),
        icon_emoji: this.iconEmoji,
        username: this.username,
      },
      timeout: 3000, // ms
    });
  }
}
