#!/usr/bin/env node
/**
 * chatgpt-context-cli
 *
 * This CLI tool scans the current project directory (respecting .gitignore),
 * prompts the user for file extensions to process (defaulting to common TypeScript/React/Next.js files),
 * then outputs a formatted prompt with a file tree and file contents.
 */

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import ignore from 'ignore';

// Define a type alias for the ignore instance
type IgnoreInstance = ReturnType<typeof ignore>;

// Utility type for file content structure
interface FileContent {
  name: string;
  content: string;
}

/**
 * Load .gitignore and create an ignore filter.
 */
function loadGitignore(rootPath: string): IgnoreInstance {
  const gitignorePath = path.join(rootPath, '.gitignore');
  const ig = ignore();
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    ig.add(gitignoreContent);
  }
  return ig;
}

/**
 * Recursively get all files under 'dir' with allowed extensions,
 * ignoring files per 'ig'.
 */
function getFiles(dir: string, allowedExts: string[], ig: IgnoreInstance): string[] {
  const results: string[] = [];
  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const relativePath = path.relative(dir, fullPath);

      // Skip files/folders ignored by .gitignore
      if (ig.ignores(relativePath)) continue;

      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile()) {
        // Check if the file has an allowed extension
        if (allowedExts.includes(path.extname(entry))) {
          results.push(relativePath);
        }
      }
    }
  }
  walk(dir);
  return results;
}

/**
 * Build a tree-like string representation from a list of file paths.
 */
function buildTree(filePaths: string[]): string {
  const tree: Record<string, any> = {};
  filePaths.forEach(filePath => {
    const parts = filePath.split(path.sep);
    let current = tree;
    parts.forEach((part, idx) => {
      if (!current[part]) {
        current[part] = idx === parts.length - 1 ? null : {};
      }
      if (current[part] !== null) {
        current = current[part];
      }
    });
  });

  function render(node: any, prefix = ''): string {
    let output = '';
    const entries = Object.keys(node);
    entries.forEach((entry, index) => {
      const isLast = index === entries.length - 1;
      output += prefix + (isLast ? '└── ' : '├── ') + entry + '\n';
      if (node[entry] !== null) {
        output += render(node[entry], prefix + (isLast ? '    ' : '│   '));
      }
    });
    return output;
  }
  return render(tree);
}

/**
 * Generate the final prompt with an explanation, file tree, and file contents.
 */
function generatePrompt(treeStr: string, fileContents: FileContent[]): string {
  const header = `Below is the context of the project files that will be used to answer the following question:

===== Project File Tree =====
${treeStr}
===== File Contents =====
`;
  let filesSection = '';
  fileContents.forEach(({ name, content }) => {
    filesSection += `\n--- File: ${name} ---\n`;
    filesSection += content + '\n';
    filesSection += '..........................................................\n';
  });
  return header + filesSection;
}

async function main(): Promise<void> {
  const rootDir = process.cwd();
  const ig = loadGitignore(rootDir);

  // Prompt the user for file extensions to process
  const { extensionsInput } = await inquirer.prompt<{ extensionsInput: string }>([
    {
      type: 'input',
      name: 'extensionsInput',
      message:
        'Enter file extensions to process (comma separated, e.g., .tsx, .ts, .css, .scss):',
      default: '.tsx, .ts, .css, .scss',
    },
  ]);
  const extensions = extensionsInput
    .split(',')
    .map(ext => ext.trim())
    .filter(ext => ext)
    .map(ext => (ext.startsWith('.') ? ext : `.${ext}`));

  // Get the list of files that match the allowed extensions
  const files = getFiles(rootDir, extensions, ig);

  // Build a tree representation of the files
  const treeStr = buildTree(files);

  // Read each file's content
  const fileContents: FileContent[] = files.map(file => {
    const fullPath = path.join(rootDir, file);
    let content = '';
    try {
      content = fs.readFileSync(fullPath, 'utf-8');
    } catch (err: any) {
      content = `Error reading file: ${err}`;
    }
    return { name: file, content };
  });

  // Generate and output the final prompt
  const finalPrompt = generatePrompt(treeStr, fileContents);
  console.log(finalPrompt);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
