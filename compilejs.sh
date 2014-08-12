#!/bin/bash

for filename in $(find "$PWD/client/app/js" -name \*.js); do
    JS_CODE_OPTS="$JS_CODE_OPTS --data-urlencode js_code@$filename"
done

for filename in $(find "$PWD/client/app/externs" -name \*.js); do
    JS_EXTERNS_OPTS="$JS_EXTERNS_OPTS --data-urlencode js_externs@$filename"
done

curl \
    $JS_CODE_OPTS \
    $JS_EXTERNS_OPTS \
    --data-urlencode "angular_pass=true" \
    --data-urlencode "compilation_level=SIMPLE_OPTIMIZATIONS" \
    --data-urlencode "output_format=text" \
    --data-urlencode "output_info=compiled_code" \
    --data-urlencode "output_info=warnings" \
    --data-urlencode "output_info=errors" \
    --data-urlencode "warning_level=VERBOSE" \
    --data-urlencode "use_closure_library=true" \
    http://closure-compiler.appspot.com/compile
