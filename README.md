# cloud-functions-backlog2slack [![Build Status](https://travis-ci.org/moznion/cloud-functions-backlog2slack.svg?branch=master)](https://travis-ci.org/moznion/cloud-functions-backlog2slack)

A [backlog](https://backlog.com/)'s web-hook forwarder that delivers messages of backlog to Slack.
This application works on Google Cloud Functions.

## Usage

### Configuration

```
$ cp ./src/config{.example,}.json
$ $EDITOR ./src/config.json # <= write configuration for your environment
```

### Deploy to Cloud Functions

Example shell script:

```sh
#!/bin/bash

set -eux

yarn build
cp ./src/config.json ./build/config.json
cp ./package.json ./build/package.json
gcloud beta functions deploy backlog2slack --trigger-http --source=build
```

## Disclaimer

### Available topic is limited

Patches welcome!

## Author

moznion (<moznion@gmail.com>)

## License

MIT

