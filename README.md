Below is an example of a beautiful and useful `README.md` for **chatgpt-context-cli**:

---

```markdown
# chatgpt-context-cli

[![npm version](https://badge.fury.io/js/chatgpt-context-cli.svg)](https://badge.fury.io/js/chatgpt-context-cli)
[![Build Status](https://github.com/your-username/chatgpt-context-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/chatgpt-context-cli/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**chatgpt-context-cli** is an open-source CLI tool that scans your project files and generates a comprehensive context prompt for ChatGPT. This allows you to ask questions about your codebase with all the context needed for a precise answer.

## Features

- **Project File Tree:** Automatically generates a tree-like representation of your project's directory structure.
- **File Contents Aggregation:** Collects file contents of your choice, with a clear separation and labeling for each file.
- **Customizable Extensions:** Prompt for file extensions to include, with sensible defaults for TypeScript, React, Next.js, CSS, and SCSS files.
- **ES Module Support:** Built with TypeScript and published as an ES module for compatibility with the latest Node.js versions.

## Installation

You can install **chatgpt-context-cli** globally via npm:

```bash
npm install -g chatgpt-context-cli
```

Or you can run it without installation using npx:

```bash
npx chatgpt-context-cli
```

## Usage

Simply navigate to the root directory of your project and run:

```bash
chatgpt-context
```

Follow the interactive prompt to enter the file extensions you want to include (the default is set to `.tsx, .ts, .css, .scss`). The tool will scan your project—ignoring files and directories specified in your `.gitignore`—and output a formatted prompt with your project’s file tree and file contents.

### Example Output

```text
Below is the context of the project files that will be used to answer the following question:

===== Project File Tree =====
├── app
│   ├── globals.css
│   └── layout.tsx
├── components
│   └── Note.tsx
├── pages
│   ├── api
│   │   ├── note
│   │   │   └── [id].ts
│   │   └── notes.ts
│   └── index.tsx
└── tailwind.config.ts

===== File Contents =====

--- File: app/globals.css ---
@tailwind base;
@tailwind components;
@tailwind utilities;

...

..........................................................
```

You can now copy the generated prompt and use it as context when asking ChatGPT questions about your project.

## Contributing

Contributions are welcome! If you have suggestions or find issues, please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit Your Changes:**  
   Make sure your code is well-documented and includes tests if applicable.
4. **Push to Your Branch:**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request:**  
   Describe your changes clearly and reference any related issues.

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on the [GitHub repository](https://github.com/your-username/chatgpt-context-cli).

---

Happy coding!
```

---

### Customizing the README

- **Badges:**  
  Update the badge links (e.g., for npm version, CI, etc.) with your repository's details.
- **Repository Links:**  
  Replace `your-username` with your GitHub username or organization.
- **License & Contributing:**  
  Customize these sections if you decide to use a different license or add additional contributing guidelines.

This README provides a clear overview, installation instructions, usage examples, and contribution guidelines, making it useful and attractive to potential users and contributors.
