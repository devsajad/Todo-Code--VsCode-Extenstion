# Code Todos - Smart Task Manager for VS Code

**Transform your code comments into a powerful, organized, and beautiful task list. Never lose track of a `TODO` again!**

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

1.  **Install** the "Code Todos" extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=sajjadzarepour.code-todos).
2.  **Open** the Code Todos sidebar by clicking the icon in your activity bar.
3.  **Start coding!** Add comments in the supported format, and watch them appear in your task list.

## How It Works

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

<!--
    *****************************************************************
    ** IMAGE/GIF PLACEHOLDER - Feature Example **
    * Replace this with a screenshot showing syntax highlighting in action.
    *****************************************************************
-->

![Syntax Highlighting Example](https://raw.githubusercontent.com/devsajad/Todo-Code--VsCode-Extenstion/main/media/placeholder-highlighting.png)

### 2. Add Manual Tasks

Need to jot down a task that isn't tied to a specific line of code? You can add manual tasks directly from the sidebar.

1.  Click the **"+ Add Task"** button at the top of the Code Todos sidebar.
2.  Fill in the task details, assign a category, and set a priority.
3.  Click **"Save"** to add it to your list.

<!--
    *****************************************************************
    ** IMAGE/GIF PLACEHOLDER - Manual Task Feature **
    * Replace this with a GIF showing how to create a manual task.
    *****************************************************************
-->

![Manual Task Demo](https://raw.githubusercontent.com/devsajad/Todo-Code--VsCode-Extenstion/main/media/placeholder-manual-task.gif)

---

## 🎨 Customization

Create categories that perfectly match your workflow.

1.  Go to the Code Todos sidebar.
2.  Click the **"+ Add Category"** button.
3.  Define a name, color, and icon for your new category.

Now you can use it in your code!

```python
# documentation: Add docstrings for all public functions
```

<!--
    *****************************************************************
    ** IMAGE/GIF PLACEHOLDER - Custom Category Feature **
    * Replace this with a GIF showing how to create and use a custom category.
    *****************************************************************
-->

![Custom Category Demo](https://raw.githubusercontent.com/devsajad/Todo-Code--VsCode-Extenstion/main/media/placeholder-custom-category.gif)

---

## ⌨️ Commands

Access the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) to use these commands:

| Command                 | Description                                    |
| :---------------------- | :--------------------------------------------- |
| `Show Code Todos Panel` | Opens the full-screen task management panel.   |
| `Debug Todo State`      | Clears all extension data for troubleshooting. |

---

## 💬 Feedback & Contribution

This extension is for you! If you have ideas for new features or find a bug, please:

- **Report an Issue**: [Create an issue on GitHub](https://github.com/devsajad/Todo-Code--VsCode-Extenstion/issues)
- **Contribute**: Fork the repository and submit a pull request.

If you find this extension helpful, please consider leaving a ⭐ **review** on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=sajjadzarepour.code-todos).

---

## 👨‍💻 Author

**Sajjad Zarepour**

Made with ❤️ for developers who love clean code and organized workflows.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
