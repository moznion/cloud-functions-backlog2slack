"use strict";

import test from "ava";
import { IssueConverter } from "../issue_converter";
import { SlackMessage } from "../../slack/slack_message";
import { BacklogUrlBuilder } from "../../backlog/backlog_url_builder";

const issueConverter = new IssueConverter(
  {
    project: {
      projectKey: "TEST",
      name: "TestProject",
    },
    content: {
      key_id: 100,
      summary: "This is an example summary",
      comment: {
        id: 54321,
        content: "This is an example comment",
      },
    },
  },
  new BacklogUrlBuilder("https://example.com"),
);

test("should convertAddEvent work certainly", t => {
  t.deepEqual(
    issueConverter.convertAddEvent(),
    new SlackMessage({
      projectName: "TestProject",
      event: "Added",
      summary: "This is an example summary",
      url: "https://example.com/view/TEST-100",
    }),
  );
});

test("should convertUpdateEvent work certainly", t => {
  t.deepEqual(
    issueConverter.convertUpdateEvent(),
    new SlackMessage({
      projectName: "TestProject",
      event: "Updated",
      summary: "This is an example summary",
      url: "https://example.com/view/TEST-100",
    }),
  );
});

test("should convertCommentEvent work certainly", t => {
  t.deepEqual(
    issueConverter.convertCommentEvent(),
    new SlackMessage({
      projectName: "TestProject",
      event: "Commented",
      summary: "This is an example summary : This is an example comment",
      url: "https://example.com/view/TEST-100#comment-54321",
    }),
  );
});
