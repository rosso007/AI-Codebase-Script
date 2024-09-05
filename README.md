# Codebase Context Generator

This project includes a powerful script for generating a concise overview of your codebase. This tool is particularly useful for providing context to AI assistants during development discussions, enabling more accurate and context-aware responses.

## Features

- Recursively scans your source directory
- Filters out irrelevant files and directories
- Removes comments from code files
- Compresses whitespace to reduce file size
- Truncates long content for conciseness
- Summarizes certain file types (e.g., CSS and SVG)
- Combines all processed file contents into a single JSON file

## Why It's Useful

1. Creates a compact representation of the entire codebase
2. Removes unnecessary elements, focusing on core code
3. Provides a structured overview for quick understanding of project structure
4. Handles large codebases efficiently
5. Ignores non-essential files and directories to reduce noise

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Ensure you have Node.js installed on your system

## Usage

1. Open the codegen.js file in the scripts directory
2. Modify the outputFile and srcDirectory variables to match your project structure:

   const outputFile = '/path/to/output/codebase_context.json';
   const srcDirectory = '/path/to/your/src/directory';

3. Customize the ignoreDirs, ignoreFiles, and ignoreExtensions arrays if needed
4. Run the script using Node.js:

   node scripts/generate_codebase_context.js

5. The script will generate a JSON file at the specified outputFile location
6. Use this JSON file to provide context to AI assistants when discussing your codebase

## Script Details

The script performs the following key actions:

1. File Filtering: Ignores specified directories, files, and file extensions
2. Comment Removal: Strips both single-line and multi-line comments from code files
3. Whitespace Compression: Reduces excessive whitespace to minimize file size
4. Content Truncation: Shortens long strings and arrays for brevity
5. File Summarization: Provides concise summaries for specific file types
6. JSON Compilation: Assembles all processed file contents into a structured JSON object

## Customization

You can customize the script behavior by modifying the following variables:

- ignoreDirs: Array of directory names to ignore
- ignoreFiles: Array of file names or patterns to ignore
- ignoreExtensions: Array of file extensions to ignore
- fileExtensions: Array of file extensions to process (in the processFiles function call)

## Contributing

Contributions to improve the script or expand its functionality are welcome.

## License

MIT License

## Contact

If you have any questions or suggestions, please open an issue in this repository.
