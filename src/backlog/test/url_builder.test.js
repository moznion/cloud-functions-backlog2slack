"use strict";

import test from "ava";
import { BacklogUrlBuilder } from "../backlog_url_builder";

test("should build URL successfully", t => {
  const b = new BacklogUrlBuilder("https://example.com");
  t.is(b.build("foo", "bar", "buz"), "https://example.com/foo/bar/buz");
});
