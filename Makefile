
webpush:
        rsync --checksum --archive --recursive --delete --itemize-changes . anirudh@samples.razorflow.com:/home/anirudh/samples/php

default: webpush
