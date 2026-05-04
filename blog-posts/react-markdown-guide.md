# Getting Started with React Markdown

If you're building a blog or documentation site with React, `react-markdown` is an excellent library for rendering Markdown content. In this post, I'll walk through how I set up this very blog using it.

## What is React Markdown?

React Markdown is a React component that takes a Markdown string and renders it as React elements. It's built on top of **remark** and **rehype**, which means you get access to a rich ecosystem of plugins.

## Basic Usage

Using React Markdown is straightforward. You import the component and pass your Markdown string as children:

```jsx
import Markdown from 'react-markdown';

function BlogPost({ content }) {
    return <Markdown>{content}</Markdown>;
}
```

## Why Markdown for Blog Posts?

There are several advantages to using Markdown files for blog content:

- **Simplicity** — Markdown is easy to read and write
- **Version control** — Markdown files work great with Git
- **Portability** — Your content isn't locked into any platform
- **Focus on content** — No need to worry about HTML structure while writing

## Code Highlighting

One of the great features is the ability to render code blocks. Here's an example of a Python function:

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

And here's some JavaScript:

```javascript
const factorial = (n) => {
    if (n === 0) return 1;
    return n * factorial(n - 1);
};
```

## Conclusion

React Markdown makes it incredibly easy to build content-driven React applications. Combined with Vite for fast development and React Router for navigation, you have everything you need for a modern blog.

---

*This post is part of my series on building modern web applications with React.*
