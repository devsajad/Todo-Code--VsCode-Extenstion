# 📝 Code Todos - Smart Task Manager for VS Code# code-todos README



> **Transform your code comments into actionable tasks with beautiful syntax highlighting!**This is the README for your extension "code-todos". After writing up a brief description, we recommend including the following sections.



[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://marketplace.visualstudio.com/items?itemName=sajjadzarepour.code-todos)## Features

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

### 🎨 **Syntax Highlighting**

---

Automatically highlights todo comments with category colors! Write comments like:

## ✨ Features

- `// features: Add user authentication` (highlighted in green)

### 🎨 **Syntax Highlighting**- `// fix bugs: Memory leak in handlers` (highlighted in red)

Automatically highlights todo comments in your code with category-specific colors. Write a comment and watch it come alive!- `// refactors: Extract utility functions` (highlighted in yellow)



```javascript### 📋 **Todo Management**

// features: Add user authentication system

// fix bugs: Memory leak in event listeners  - Scan workspace for todo comments

// refactors: Extract utility functions- Add manual tasks

```- Organize by categories

- Track completion status

### 📊 **Beautiful Task Dashboard**

- **Sidebar View**: Always accessible from the Activity Bar### 🎯 **Smart Categories**

- **Panel View**: Full-screen task management interface

- **Real-time Updates**: See changes instantly as you code- Default categories: Features, Fix Bugs, Refactors

- Custom categories with colors and icons

### 🎯 **Smart Categories**- Case-insensitive matching

- **Default Categories**: Features, Fix Bugs, Refactors- Real-time updates

- **Custom Categories**: Create your own with custom colors and icons

- **Color Coding**: Each category has its unique color for easy identification> See [SYNTAX_HIGHLIGHTING.md](SYNTAX_HIGHLIGHTING.md) for detailed documentation on the highlighting feature.

- **Case Insensitive**: Works with any capitalization

## Requirements

### 📁 **Dual Task System**

1. **Comment Tasks**: Automatically detected from your code commentsIf you have any requirements or dependencies, add a section describing those and how to install and configure them.

2. **Manual Tasks**: Add standalone tasks directly in the sidebar

## Extension Settings

### 🔍 **Workspace Scanning**

- Scans all files in your workspaceInclude if your extension adds any VS Code settings through the `contributes.configuration` extension point.

- Supports multiple file types: JS, TS, Python, CSS, HTML, and more

- Smart filtering excludes `node_modules`, `dist`, and other build foldersFor example:

- Real-time detection as you type

This extension contributes the following settings:

### ✅ **Task Management**

- ✓ Mark tasks as complete/incomplete- `myExtension.enable`: Enable/disable this extension.

- 📝 Edit tasks inline- `myExtension.thing`: Set to `blah` to do something.

- 🗑️ Delete tasks with one click

- 📍 Jump to task location in code## Known Issues

- 💾 Persistent storage across sessions

Calling out known issues can help limit users opening duplicate issues against your extension.

---

## Release Notes

## 🚀 Getting Started

Users appreciate release notes as you update your extension.

### Installation

### 1.0.0

1. Open VS Code

2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac) to open ExtensionsInitial release of ...

3. Search for **"Code Todos"**

4. Click **Install**### 1.0.1



### UsageFixed issue #.



#### **Method 1: Code Comments**### 1.1.0

Simply add comments in your code using this format:

Added features X, Y, and Z.

```javascript

// category: your task description---

```

## Following extension guidelines

**Examples:**

```javascriptEnsure that you've read through the extensions guidelines and follow the best practices for creating your extension.

// features: Add dark mode support

// fix bugs: Handle null user input- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

// refactors: Split this component

```## Working with Markdown



The extension automatically:You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- ✅ Detects the comment

- 🎨 Highlights it with the category color- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).

- 📋 Adds it to your todo list- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).

- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

#### **Method 2: Manual Tasks**

1. Click the **Code Todos** icon in the Activity Bar## For more information

2. Click **"+ Add Task"**

3. Fill in task details- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)

4. Click **"Save"**- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)



#### **View Your Tasks****Enjoy!**

- **Sidebar**: Click the Code Todos icon in Activity Bar
- **Panel**: Run command `Show Code Todos Panel` (`Ctrl+Shift+P`)

---

## 📋 Supported Comment Formats

The extension recognizes various comment styles:

```javascript
// features: JavaScript single-line comment
/* fix bugs: JavaScript multi-line comment */
```

```python
# features: Python comment
```

```css
/* refactors: CSS comment */
```

```html
<!-- features: HTML comment -->
```

And many more file types!

---

## 🎨 Custom Categories

Create categories that match your workflow:

1. Open Code Todos sidebar
2. Click **"+ Add Category"**
3. Choose:
   - **Name**: Your category name
   - **Color**: Pick from palette
   - **Icon**: Select from VS Code icons
4. Click **"Save"**

Now use your custom category in comments:
```javascript
// my-category: This will be highlighted!
```

---

## ⌨️ Commands

| Command | Description |
|---------|-------------|
| `Show Code Todos Panel` | Open the full task management panel |
| `Debug Todo State` | Clear extension state (troubleshooting) |

Access via Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)

---

## 🎯 Use Cases

### For Solo Developers
- 📝 Track TODOs without leaving your editor
- 🎨 Visual reminders with syntax highlighting
- ✅ Mark progress as you complete tasks

### For Teams
- 📊 Standardize task comments across the team
- 🎯 Custom categories for your workflow (e.g., "security", "performance")
- 🔍 Easy code review with highlighted tasks

### For Project Management
- 📁 See all tasks across your entire project
- 🏷️ Organize by category
- 📍 Jump to implementation instantly

---

## 🛠️ Configuration

No configuration needed! Works out of the box with sensible defaults.

**Default Categories:**
- 🚀 **Features** (Green): New features and enhancements
- 🐛 **Fix Bugs** (Red): Bug fixes and issues
- ♻️ **Refactors** (Yellow): Code improvements and refactoring

---

## 🔧 Requirements

- **VS Code**: Version 1.60.0 or higher
- **Operating System**: Windows, macOS, or Linux

---

## 📊 Performance

- ⚡ **Lightweight**: Minimal impact on VS Code performance
- 🚀 **Fast Scanning**: Efficiently processes large codebases
- 💾 **Low Memory**: Optimized resource usage
- 🔄 **Real-time**: Instant updates as you type

---

## 🐛 Known Issues

None at the moment! Found a bug? [Report it here](https://github.com/devsajad/Todo-Code--VsCode-Extenstion/issues)

---

## 📝 Release Notes

### 1.0.0 (October 2025)

**Initial Release** 🎉

- ✅ Todo comment detection and highlighting
- ✅ Custom category management
- ✅ Syntax highlighting with color coding
- ✅ Workspace-wide task scanning
- ✅ Manual task creation
- ✅ Task completion tracking
- ✅ Beautiful sidebar and panel UI
- ✅ Persistent storage
- ✅ Multi-file type support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Feedback & Support

- 🐛 **Report bugs**: [GitHub Issues](https://github.com/devsajad/Todo-Code--VsCode-Extenstion/issues)
- 💡 **Feature requests**: [GitHub Issues](https://github.com/devsajad/Todo-Code--VsCode-Extenstion/issues)
- ⭐ **Rate & Review**: [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=sajjadzarepour.code-todos)

---

## 🌟 Show Your Support

If you find this extension helpful, please:
- ⭐ Star the [GitHub repository](https://github.com/devsajad/Todo-Code--VsCode-Extenstion)
- ✍️ Leave a review on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=sajjadzarepour.code-todos)
- 📢 Share with your team

---

## 👨‍💻 Author

**Sajjad Zarepour**

Made with ❤️ for developers who love clean code and organized workflows.

---

**Enjoy coding with Code Todos!** 🚀