#!/bin/bash

# For macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
        --remote-debugging-port=8989 \
        --user-data-dir="/tmp/chrome-debug" \
        --no-first-run \
        --no-default-browser-check
fi

# For Linux
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    google-chrome \
        --remote-debugging-port=8989 \
        --user-data-dir="/tmp/chrome-debug" \
        --no-first-run \
        --no-default-browser-check
fi

echo "Chrome started with debugging on port 8989"
