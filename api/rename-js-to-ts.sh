#!/bin/bash

# Absolute path to the directory where the .js files are located
DIRECTORY="/Users/edgaras318/home-service-ts/home-service-ts/api/src"

# Check if directory exists
if [ ! -d "$DIRECTORY" ]; then
  echo "Directory $DIRECTORY does not exist."
  exit 1
fi

# Find all .js files in the directory and all subdirectories, then rename them to .ts
find "$DIRECTORY" -type f -name "*.js" | while read -r file; do
  # Extract the directory and filename (without the .js extension)
  baseName=$(basename "$file" .js)
  dirName=$(dirname "$file")

  # Rename the .js file to .ts
  mv "$file" "$dirName/$baseName.ts"
  echo "Renamed $file to $dirName/$baseName.ts"
done
