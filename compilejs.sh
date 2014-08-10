#!/bin/bash

COMPILER_URL=http://closure-compiler.appspot.com/compile

JS_CODE_DIR="$PWD/client/app/js"
JS_EXTERNS_DIR="$PWD/client/app/externs"

for filename in $(find $JS_CODE_DIR -name \*.js); do
    JS_CODE_OPTS="$JS_CODE_OPTS --data-urlencode js_code@$filename"
done

for filename in $(find $JS_EXTERNS_DIR -name \*.js); do
    JS_EXTERNS_OPTS="$JS_EXTERNS_OPTS --data-urlencode js_externs@$filename"
done

curl \
    $JS_CODE_OPTS \
    $JS_EXTERNS_OPTS \
    --data-urlencode "angular_pass=true" \
    --data-urlencode "compilation_level=ADVANCED_OPTIMIZATIONS" \
    --data-urlencode "generate_exports=true" \
    --data-urlencode "language=ECMASCRIPT5_STRICT" \
    --data-urlencode "output_format=text" \
    --data-urlencode "output_info=compiled_code" \
    --data-urlencode "use_closure_library=true" \
    $COMPILER_URL
