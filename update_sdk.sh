#!/bin/bash

SDK_URL="https://storage.googleapis.com/appengine-sdks/featured/"
SDK_FILENAME="google_appengine_$1.zip"
SDK_DIR="google_appengine"
LIB_PATH="$VIRTUAL_ENV/lib"
BIN_PATH="$VIRTUAL_ENV/bin"

if [[ -z "$VIRTUAL_ENV" ]]; then
    echo "This command must be run within an active virtual environment."
    exit 1
fi

cd $LIB_PATH

if ! curl -O -f "$SDK_URL$SDK_FILENAME"; then
    exit $?
fi

if [[ -d "$SDK_DIR" ]]; then
    echo "Removing existing SDK installation..."
    rm -rf "$SDK_DIR"
fi

unzip "$SDK_FILENAME"
rm "$SDK_FILENAME"

cd $BIN_PATH
echo "Updating symlinks..."

for f in $(find . -maxdepth 1 -type l); do
    if [[ "$(readlink $f)" =~ "$SDK_DIR" ]]; then
        rm $f
    fi
done

for f in $(find "../lib/$SDK_DIR" -maxdepth 1 -name \*.py); do
    ln -s $f
done
