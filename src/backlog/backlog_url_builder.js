"use strict";

export class BacklogUrlBuilder {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  build(...paths) {
    return this.baseUrl + "/" + paths.join("/");
  }
}
