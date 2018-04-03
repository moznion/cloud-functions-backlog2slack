"use strict";

export class SlackMessage {
  constructor({ projectName, event, summary, url }) {
    this.projectName = projectName;
    this.event = event;
    this.summary = summary;
    this.url = url;
  }

  toText() {
    return "*" + this.projectName + "*" + "\n" + this.event + ": " + this.summary + "\n" + this.url;
  }
}
