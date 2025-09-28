# Shuangshuang Ying - Personal Website

A clean, modern personal website for Shuangshuang Ying, MS student at LUT.

## ✨ Features

- **Modern Design**: Clean and professional layout with smooth animations
- **Responsive**: Works perfectly on all devices
- **Blog System**: Markdown-powered blog with automatic rendering
- **Fast**: No build process required, just HTML/CSS/JavaScript
- **Easy to Use**: Simple file structure for easy customization

## 🚀 Quick Start

### Local Development

```bash
# Navigate to the website directory
cd html-site

# Start a local server (choose one)
python -m http.server 8000    # Python
npx serve .                   # Node.js
php -S localhost:8000         # PHP

# Open http://localhost:8000 in your browser
```

### Adding Blog Posts

1. **Create a markdown file** in the `blog/` directory:
   ```
   blog/my-new-post.md
   ```

2. **Add frontmatter** at the top:
   ```markdown
   ---
   title: My Awesome Post Title
   ---

   Your content here...
   ```

3. **Update the blog metadata** in both `js/blog.js` and `js/post.js`:
   ```javascript
   // In js/blog.js
   const blogPosts = [
       {
           id: 'my-new-post',
           title: 'My Awesome Post Title',
           date: '2024-02-15',
           file: 'blog/my-new-post.md',
           excerpt: 'A brief description of your post...'
       },
       // ... other posts
   ];

   // In js/post.js
   const blogPosts = {
       'my-new-post': {
           title: 'My Awesome Post Title',
           date: '2024-02-15',
           file: 'blog/my-new-post.md',
           category: 'Personal' // or 'Academic', 'Tutorial', etc.
       },
       // ... other posts
   };
   ```

## 📁 File Structure

```
html-site/
├── index.html          # Homepage
├── blog.html           # Blog listing page
├── post.html           # Individual blog post page
├── publications.html   # Publications page
├── css/
│   └── style.css       # All styles
├── js/
│   ├── main.js         # Homepage interactions
│   ├── blog.js         # Blog listing logic
│   └── post.js         # Blog post rendering
├── blog/
│   ├── welcome.md      # Example blog post
│   └── ...             # Your blog posts here
├── img/
│   └── avatar.svg      # Profile avatar
├── favicon.svg         # Website icon
├── robots.txt          # SEO configuration
└── README.md           # This file
```

## 🎨 Customization

### Personal Information

Edit the following in `index.html`:
- Name and pronouns
- Bio and description
- Social media links
- Contact information

### Styling

Modify `css/style.css` to change:
- Color scheme (CSS variables at the top)
- Typography
- Layout and spacing
- Animations

### Avatar

Replace `img/avatar.svg` with your own image:
- Recommended size: 240x240px or larger
- Supported formats: SVG, PNG, JPG
- Update the `src` attribute in `index.html`

## 🔧 Advanced Features

### Markdown Support

The blog system supports:
- Headers and subheaders
- **Bold** and *italic* text
- Lists and numbered lists
- Links and images
- Code blocks with syntax highlighting
- Blockquotes
- Tables

### Automatic Features

- **Table of Contents**: Generated automatically for long posts
- **Reading Time**: Calculated based on word count
- **Code Copy**: Click-to-copy buttons on code blocks
- **Social Sharing**: Share posts on Twitter, LinkedIn
- **Responsive Images**: Automatic image optimization

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🚀 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose your main branch
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command to: (leave empty)
3. Set publish directory to: `html-site`
4. Deploy!

### Other Hosting

Upload the `html-site` folder contents to any web hosting service that supports static files.

## 📝 Content Tips

### Writing Good Blog Posts

- Start with a clear, engaging title
- Use headers to structure your content
- Include personal insights and experiences
- Add code examples when relevant
- Keep paragraphs short and readable

### Academic Content

- Reference your research properly
- Explain complex concepts simply
- Include visuals when helpful
- Share your learning process

## 🆘 Troubleshooting

### Blog Posts Not Showing

1. Check that the markdown file exists in the `blog/` directory
2. Verify the frontmatter format is correct
3. Ensure the post is added to both `js/blog.js` and `js/post.js`
4. Check the browser console for errors

### Styling Issues

1. Clear your browser cache
2. Check that `css/style.css` is loading
3. Verify CSS variable names are correct
4. Test on different browsers

### Local Server Issues

1. Make sure you're in the `html-site` directory
2. Try a different port if 8000 is busy
3. Check that Python/Node.js is installed
4. Use a different server method

## 📄 License

This website template is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using HTML, CSS, and JavaScript**