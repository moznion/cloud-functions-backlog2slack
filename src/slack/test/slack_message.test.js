"use strict";

import test from "ava";
import { SlackMessage } from "../slack_message";

test("should toText() method work certainly", t => {
  const projectName = "test-project";
  const event = "Created";
  const summary = "New ticket has been created";
  const url = "https://example.com/foo/bar";

  const msg = new SlackMessage({ summary, event, url, projectName });
  t.is(
    msg.toText(),
    `*test-project*
Created: New ticket has been created
https://example.com/foo/bar`,
  );
});
