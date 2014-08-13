#!/bin/bash

for filename in $(find "$PWD/client/app/js" -name \*.js); do
    JS_CODE_OPTS="$JS_CODE_OPTS --data-urlencode js_code@$filename"
done

for filename in $(find "$PWD/client/app/externs" -name \*.js); do
    JS_EXTERNS_OPTS="$JS_EXTERNS_OPTS --data-urlencode js_externs@$filename"
done

case "$1" in
    warnings)
        OUTPUT_INFO="--data-urlencode output_info=warnings"
        OUTPUT_INFO="$OUTPUT_INFO --data-urlencode warning_level=VERBOSE" ;;
    errors)
        OUTPUT_INFO="--data-urlencode output_info=errors" ;;
    *)
        OUTPUT_INFO="--data-urlencode output_info=compiled_code" ;;
esac

curl \
    $JS_CODE_OPTS \
    $JS_EXTERNS_OPTS \
    $OUTPUT_INFO \
    --data-urlencode angular_pass=true \
    --data-urlencode compilation_level=SIMPLE_OPTIMIZATIONS \
    --data-urlencode output_format=text \
    --data-urlencode use_closure_library=true \
    http://closure-compiler.appspot.com/compile
