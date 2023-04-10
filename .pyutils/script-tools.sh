#!/usr/bin/env bash

_CMD="${0}"

_ARG_COUNT="${#}"
_ARG_ARRAY="${@}"

_REL_PATH="${0%/*}"
_ABS_PATH=`realpath $_REL_PATH`

_FILENAME="$(basename $0)"

_CWD=`pwd`

_LAST_EXIT_STATUS="$?"


# start command with a space to ignore history

# pushd
# popd