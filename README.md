# 📝 Code Todos - Smart Task Manager for VS Code

**Transform your code comments into a powerful, organized, and beautiful task list. Never lose track of a `TODO` again!**

Code Todos scans your workspace for comments like `// features: ...` or `# fix bugs: ...` and elegantly organizes them in a dedicated sidebar view. Manage tasks, create custom categories, and stay productive without ever leaving your editor.

---

![Code Todos Demo](https://raw.githubusercontent.com/devsajad/Todo-Code--VsCode-Extenstion/main/media/main-demo.gif)

---

## ✨ Key Features

| Feature                    | Description                                                                                               |
| :------------------------- | :-------------------------------------------------------------------------------------------------------- |
| 🎨 **Syntax Highlighting** | Automatically highlights your task comments directly in the code with category-specific colors.           |
| 📋 **Task Dashboard**      | A beautiful and intuitive UI in the sidebar to view, manage, and filter all your tasks.                   |
| 🎯 **Smart Categories**    | Use default categories (`features`, `bugs`, `refactors`) or create your own with custom colors and icons. |
| ✍️ **Dual Task System**    | Tasks are automatically detected from code comments, but you can also add manual tasks directly.          |
| ⚡ **Real-Time & Fast**    | Uses an efficient scanning engine to detect changes in real-time with minimal performance impact.         |
| 🔎 **Jump to Code**        | Instantly navigate from a task in the sidebar directly to the corresponding line in your code.            |

---

## 🚀 Getting Started

### Installation

1.  Open **VS Code**
2.  Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac) to open the Extensions view
3.  Search for **"Code Todos"**
4.  Click **Install**
5.  Click the Code Todos icon in your Activity Bar to get started!

### Quick Start

1.  **Open** the Code Todos sidebar by clicking the icon in your activity bar
2.  **Start coding!** Add comments in the supported format, and watch them appear in your task list
3.  **Click any task** to jump directly to its location in your code

---

## 💡 How It Works

Code Todos offers two flexible ways to manage your tasks:

### 1. Create Tasks from Code Comments

Simply add comments to your code in the format: `// category: Your task description`

The extension will automatically detect these comments, highlight them, and add them to your task list in the sidebar.

**Examples:**

```javascript
// features: Implement user authentication with JWT
// fix bugs: Correct the off-by-one error in the pagination logic
// refactors: Extract the database connection into a separate module
```

![Syntax Highlighting Example](https://raw.githubusercontent.com/devsajad/Todo-Code--VsCode-Extenstion/main/media/highlighting.gif)

### 2. Add Manual Tasks

Need to jot down a task that isn't tied to a specific line of code? You can add manual tasks directly from the sidebar.

1.  Click the **"+ Add Task"** button at the top of the Code Todos sidebar.
2.  Fill in the task details, assign a category, and set a priority.
3.  Click **"Save"** to add it to your list.

![Manual Task Demo](https://raw.githubusercontent.com/devsajad/Todo-Code--VsCode-Extenstion/main/media/manual-task.gif)

---

## 🎨 Customization

### Create Custom Categories

Create categories that perfectly match your workflow:

1.  Open the Code Todos sidebar
2.  Click the **"+ Add Category"** button
3.  Define a name, color, and icon for your new category
4.  Click **"Save"**

Now you can use it in your code!

```python
# documentation: Add docstrings for all public functions
# security: Add input validation for user data
# performance: Optimize database queries
```

![Custom Category Demo](https://raw.githubusercontent.com/devsajad/Todo-Code--VsCode-Extenstion/main/media/custom-category.gif)

### Supported Comment Formats

Code Todos recognizes various comment styles across different languages:

| Language       | Comment Format                        |
| :------------- | :------------------------------------ |
| JavaScript/TS  | `// category: task description`       |
| JavaScript/TS  | `/* category: task description */`    |
| Python         | `# category: task description`        |
| CSS/SCSS       | `/* category: task description */`    |
| HTML           | `<!-- category: task description -->` |
| And many more! | Works with most programming languages |

---

## ⌨️ Commands

Access the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) to use these commands:

| Command                 | Description                                    |
| :---------------------- | :--------------------------------------------- |
| `Show Code Todos Panel` | Opens the full-screen task management panel.   |
| `Debug Todo State`      | Clears all extension data for troubleshooting. |

---

## 🎯 Use Cases

### For Solo Developers

- 📝 Track TODOs without leaving your editor
- 🎨 Visual reminders with syntax highlighting
- ✅ Mark progress as you complete tasks

### For Development Teams

- 📊 Standardize task comments across the team
- 🎯 Custom categories for your workflow (e.g., "security", "performance")
- 🔍 Easy code review with highlighted tasks

### For Project Management

- 📁 See all tasks across your entire project
- 🏷️ Organize by category and priority
- 📍 Jump to implementation instantly

---

## 🛠️ Requirements

- **VS Code**: Version 1.104.0 or higher
- **Operating System**: Windows, macOS, or Linux

---

## 💬 Feedback & Support

We'd love to hear from you! Your feedback helps make Code Todos better.

- 🐛 **Report a Bug**: [Create an issue on GitHub](https://github.com/devsajad/Todo-Code--VsCode-Extenstion/issues)
- 💡 **Request a Feature**: [Share your ideas](https://github.com/devsajad/Todo-Code--VsCode-Extenstion/issues)
- ⭐ **Rate & Review**: [Leave a review on the marketplace](https://marketplace.visualstudio.com/items?itemName=sajjadzarepour.code-todos&ssr=false#review-details)
- 🤝 **Contribute**: Fork the repository and submit a pull request

---

## 🌟 Show Your Support

If Code Todos has improved your workflow, please:

- ⭐ Star the [GitHub repository](https://github.com/devsajad/Todo-Code--VsCode-Extenstion)
- ✍️ Write a review on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=sajjadzarepour.code-todos&ssr=false#review-details)
- 📢 Share with your team and colleagues
- 💝 Spread the word on social media

Your support means the world! 🙏

---

## 📚 Related Resources

- [VS Code API Documentation](https://code.visualstudio.com/api)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

---

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes and releases.

---

## 👨‍💻 Author

**Sajjad Zarepour**

- GitHub: [@devsajad](https://github.com/devsajad)
- Email: [sajjadzarepur@gmail.com](mailto:sajjadzarepur@gmail.com)

Made with ❤️ for developers who love clean code and organized workflows.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
