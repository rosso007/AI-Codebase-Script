const fs = require('fs').promises;
const path = require('path');

// Adjust these paths for your Codespace environment
const outputFile = 'choose a location here';
const srcDirectory = 'choose your source directory here';

function shouldIgnore(filePath) {
  const ignoreDirs = ['node_modules', '.next', '.git', 'public', 'styles'];
  const ignoreFiles = [
    '.env',
    '.env.local',
    'package-lock.json',
    '*.test.js',
    '*.spec.js',
    '*.d.ts'
  ];
  const ignoreExtensions = ['.md', '.json', '.lock', '.log'];

  return (
    ignoreDirs.some((dir) => filePath.includes(dir)) ||
    ignoreFiles.some((file) => filePath.endsWith(file)) ||
    ignoreExtensions.some((ext) => filePath.endsWith(ext))
  );
}

function removeComments(content) {
  // Remove single-line comments
  content = content.replace(/\/\/.*$/gm, '');
  // Remove multi-line comments
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  return content;
}

function compressWhitespace(content) {
  return content.replace(/\s+/g, ' ').trim();
}

function truncateLongContent(content) {
  const maxLength = 100;
  return content
    .replace(/(['"])(?:(?!\1)[^\\]|\\.)*\1/g, (match) => {
      return match.length > maxLength
        ? match.slice(0, maxLength) + '..."'
        : match;
    })
    .replace(/\[[^\]]{100,}\]/g, '[...]');
}

function summarizeFile(filePath, content) {
  if (filePath.endsWith('.css') || filePath.endsWith('.scss')) {
    return `CSS file with ${content.split('{').length - 1} rules`;
  }
  if (filePath.endsWith('.svg')) {
    return `SVG file`;
  }
  return content;
}

async function processFiles(directory, fileExtensions) {
  const result = {};
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(directory, file.name);
      if (file.isDirectory() && !shouldIgnore(fullPath)) {
        Object.assign(result, await processFiles(fullPath, fileExtensions));
      } else if (
        fileExtensions.includes(path.extname(file.name).slice(1)) &&
        !shouldIgnore(fullPath)
      ) {
        let content = await fs.readFile(fullPath, 'utf8');
        content = removeComments(content);
        content = compressWhitespace(content);
        content = truncateLongContent(content);
        content = summarizeFile(fullPath, content);
        result[fullPath] = content;
      }
    }
  } catch (error) {
    console.error(`Error processing ${directory}:`, error);
  }
  return result;
}

async function main() {
  try {
    const result = await processFiles(srcDirectory, ['js', 'jsx', 'ts', 'tsx']);
    await fs.writeFile(outputFile, JSON.stringify(result, null, 2));
    console.log(`All relevant files have been combined into ${outputFile}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
