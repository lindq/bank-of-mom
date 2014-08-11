#!/bin/bash

for filename in $(find "$PWD/client/app/js" -name \*.js); do
    JS_CODE_OPTS="$JS_CODE_OPTS --data-urlencode js_code@$filename"
done

curl \
    $JS_CODE_OPTS \
    --data-urlencode "angular_pass=true" \
    --data-urlencode "compilation_level=SIMPLE_OPTIMIZATIONS" \
    --data-urlencode "output_format=text" \
    --data-urlencode "output_info=compiled_code" \
    --data-urlencode "use_closure_library=true" \
    http://closure-compiler.appspot.com/compile
