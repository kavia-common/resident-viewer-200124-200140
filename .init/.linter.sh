#!/bin/bash
cd /home/kavia/workspace/code-generation/resident-viewer-200124-200140/resident_directory_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

