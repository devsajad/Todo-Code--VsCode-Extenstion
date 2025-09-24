# Syntax Highlighting Feature

## Overview

The VS Code extension now includes **automatic syntax highlighting** for todo comments that match your configured categories. When you write a comment like `// fix bugs: Fix this issue`, it will be highlighted with the category's color as background and white text.

## How It Works

### Supported Comment Formats

The syntax highlighter recognizes these comment patterns:

```javascript
// features: Add user authentication
/* fix bugs: Fix memory leak */
// refactors: Extract this function
```

```python
# features: Add new API endpoint
# fix bugs: Handle edge cases
```

```css
/* features: Add dark mode support */
/* refactors: Optimize CSS selectors */
```

### Color Scheme

- **Background**: Uses the category's configured color (e.g., red for "Fix Bugs")
- **Text**: White text for better contrast
- **Style**: Bold font weight with rounded corners
- **Hover**: Shows "Todo: [Category Name]" on hover

## Configuration

### Default Categories with Colors:

1. **Features** → Green (`#22c55e`)

   - Example: `// features: Add OAuth integration`

2. **Fix Bugs** → Red (`#ef4444`)

   - Example: `// fix bugs: Memory leak in event handlers`

3. **Refactors** → Yellow (`#eab308`)
   - Example: `// refactors: Extract utility functions`

### Case Insensitive

The highlighter works regardless of case:

- `// Features: ...` ✅
- `// FEATURES: ...` ✅
- `// features: ...` ✅
- `// FiX bUgS: ...` ✅

## Real-time Updates

The syntax highlighting automatically updates when:

1. **Files are opened** - Decorations applied immediately
2. **Text is edited** - Updates as you type
3. **Categories are modified** - Colors update when you change category colors
4. **New categories added** - New patterns are recognized instantly

## File Support

The highlighter works across all text-based files:

- JavaScript/TypeScript (`.js`, `.ts`, `.jsx`, `.tsx`)
- Python (`.py`)
- CSS/SCSS (`.css`, `.scss`)
- HTML (`.html`)
- Markdown (`.md`)
- JSON (`.json`)
- And many more!

## Example Usage

Create a test file and try these comments:

```javascript
// features: User authentication system
function login() {
  // fix bugs: Handle null user input
  if (!user) return;

  /* refactors: Move validation to utils */
  validateUser(user);
}

// features: Add password reset functionality
// fix bugs: Email validation regex is broken
/* refactors: Split this component into smaller pieces */
```

Each comment will be highlighted with its category's color!

## Troubleshooting

### Comments Not Highlighting?

1. **Check category names** - Must match exactly (case-insensitive)
2. **Verify comment format** - Must follow `// category: description` pattern
3. **File extension** - Make sure it's a supported file type
4. **Reload extension** - Try reloading VS Code if needed

### Performance

The highlighter is optimized for performance:

- Only scans visible editors
- Uses efficient regex patterns
- Minimal memory footprint
- Updates incrementally on text changes

## Technical Details

- **Module**: `src/core/syntaxHighlighter.ts`
- **Decoration API**: Uses VS Code's `TextEditorDecorationType`
- **Pattern Matching**: Regex-based with escaped special characters
- **Event Handling**: Listens to document and editor changes
- **Memory Management**: Proper cleanup on extension deactivation
