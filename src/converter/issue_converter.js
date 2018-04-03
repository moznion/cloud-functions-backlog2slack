"use strict";

import { SlackMessage } from "../slack/slack_message";

export class IssueConverter {
  constructor(body, urlBuilder) {
    this.project = body.project;
    this.content = body.content;
    this.urlBuilder = urlBuilder;
  }

  convertAddEvent() {
    return new SlackMessage({
      projectName: this.project.name,
      summary: this.content.summary,
      event: "Added",
      url: this.urlBuilder.build("view", this.project.projectKey + "-" + this.content.key_id),
    });
  }

  convertUpdateEvent() {
    return new SlackMessage({
      projectName: this.project.name,
      summary: this.content.summary,
      event: "Updated",
      url: this.urlBuilder.build("view", this.project.projectKey + "-" + this.content.key_id),
    });
  }

  convertCommentEvent() {
    return new SlackMessage({
      projectName: this.project.name,
      summary: this.content.summary + " : " + this.content.comment.content,
      event: "Commented",
      url: this.urlBuilder.build(
        "view",
        this.project.projectKey + "-" + this.content.key_id + "#comment-" + this.content.comment.id,
      ),
    });
  }
}
