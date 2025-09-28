// Blog posts metadata - example posts for learning how to blog
const blogPosts = {
    'my-research-journey': {
        title: 'My Research Journey - Lessons from a Master\'s Student at LUT',
        date: '2024-02-10',
        file: 'blog/2024-02-10-my-research-journey.md',
        category: 'Personal'
    },
    'academic-writing-tips': {
        title: 'Academic Writing Tips for Graduate Students',
        date: '2024-02-01',
        file: 'blog/2024-02-01-academic-writing-tips.md',
        category: 'Academic'
    },
    'markdown-basics': {
        title: 'Markdown Basics - Your Complete Guide to Writing Beautiful Content',
        date: '2024-01-20',
        file: 'blog/2024-01-20-markdown-basics.md',
        category: 'Tutorial'
    },
    'blog-writing-guide': {
        title: 'How to Write Engaging Blog Posts - A Beginner\'s Guide',
        date: '2024-01-15',
        file: 'blog/2024-01-15-blog-writing-guide.md',
        category: 'Tutorial'
    }
};

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to estimate reading time based on content
function estimateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

// Function to parse frontmatter
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (match) {
        const frontmatter = {};
        const frontmatterText = match[1];
        const body = match[2];

        // Simple frontmatter parsing - handles key: value pairs
        frontmatterText.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex !== -1) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();

                // Remove quotes if present
                if ((value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }

                frontmatter[key] = value;
            }
        });

        return { frontmatter, body };
    }

    return { frontmatter: {}, body: content };
}

// Function to add table of contents
function generateTableOfContents(content) {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        headings.push({
            level,
            text,
            id
        });
    }

    if (headings.length === 0) return '';

    let toc = '<div class="table-of-contents"><h3>Table of Contents</h3><ul>';

    headings.forEach(heading => {
        const indent = 'margin-left: ' + ((heading.level - 1) * 20) + 'px;';
        toc += `<li style="${indent}"><a href="#${heading.id}">${heading.text}</a></li>`;
    });

    toc += '</ul></div>';
    return toc;
}

// Function to add IDs to headings for TOC navigation
function addHeadingIds(htmlContent) {
    return htmlContent.replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, (match, level, text) => {
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return `<h${level} id="${id}">${text}</h${level}>`;
    });
}

// Function to enhance code blocks with copy functionality
function enhanceCodeBlocks(container) {
    const codeBlocks = container.querySelectorAll('pre code');

    codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        pre.style.position = 'relative';

        // Add copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            font-size: 0.8rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });

        copyButton.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });

        copyButton.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0.7';
        });

        pre.appendChild(copyButton);
    });
}

// Function to load and render post
async function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId || !blogPosts[postId]) {
        document.getElementById('article-content').innerHTML = `
            <div class="error-message">
                <h1><i class="fas fa-exclamation-triangle"></i> Post Not Found</h1>
                <p>The requested blog post could not be found. This might be because:</p>
                <ul>
                    <li>The URL is incorrect</li>
                    <li>The post has been moved or deleted</li>
                    <li>There's a temporary server issue</li>
                </ul>
                <a href="blog.html" class="btn btn-primary">
                    <i class="fas fa-arrow-left"></i>
                    Back to Blog
                </a>
            </div>
        `;
        return;
    }

    const post = blogPosts[postId];

    try {
        // Show loading state
        const articleContent = document.getElementById('article-content');
        articleContent.innerHTML = `
            <div class="loading-message">
                <i class="fas fa-spinner fa-spin"></i>
                Loading post...
            </div>
        `;

        const response = await fetch(post.file);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const content = await response.text();
        const { frontmatter, body } = parseFrontmatter(content);

        // Use frontmatter title if available, otherwise use metadata title
        const title = frontmatter.title || post.title;
        const category = post.category || 'General';

        // Update page title
        document.getElementById('page-title').textContent = `${title} - Shuangshuang Ying`;

        // Generate table of contents
        const toc = generateTableOfContents(body);

        // Convert markdown to HTML
        let htmlContent = marked.parse(body);

        // Add IDs to headings for TOC navigation
        htmlContent = addHeadingIds(htmlContent);

        // Calculate reading time
        const readingTime = estimateReadingTime(body);

        // Render the article
        articleContent.innerHTML = `
            <div class="post-header">
                <div class="post-category">${category}</div>
                <h1 class="article-title">${title}</h1>
                <div class="article-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span><i class="fas fa-clock"></i> ${readingTime} min read</span>
                    <span><i class="fas fa-tag"></i> ${category}</span>
                </div>
            </div>

            ${toc}

            <div class="article-content">${htmlContent}</div>

            <div class="post-footer">
                <div class="post-navigation">
                    <a href="blog.html" class="btn btn-secondary">
                        <i class="fas fa-arrow-left"></i>
                        Back to Blog
                    </a>
                </div>

                <div class="post-sharing">
                    <h4>Share this post</h4>
                    <div class="sharing-buttons">
                        <button onclick="sharePost('twitter')" class="share-btn twitter">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button onclick="sharePost('linkedin')" class="share-btn linkedin">
                            <i class="fab fa-linkedin"></i>
                        </button>
                        <button onclick="sharePost('copy')" class="share-btn copy">
                            <i class="fas fa-link"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Enhance code blocks with copy functionality
        enhanceCodeBlocks(articleContent);

        // Smooth scroll for TOC links
        const tocLinks = articleContent.querySelectorAll('.table-of-contents a');
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

    } catch (error) {
        console.error('Error loading post:', error);
        document.getElementById('article-content').innerHTML = `
            <div class="error-message">
                <h1><i class="fas fa-exclamation-triangle"></i> Error Loading Post</h1>
                <p>There was an error loading the blog post. Please try again later.</p>
                <details>
                    <summary>Technical details</summary>
                    <code>${error.message}</code>
                </details>
                <a href="blog.html" class="btn btn-primary">
                    <i class="fas fa-arrow-left"></i>
                    Back to Blog
                </a>
            </div>
        `;
    }
}

// Function to share post
function sharePost(platform) {
    const url = window.location.href;
    const title = document.querySelector('.article-title').textContent;

    switch (platform) {
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
            break;
        case 'copy':
            navigator.clipboard.writeText(url).then(() => {
                const copyBtn = document.querySelector('.share-btn.copy');
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                }, 2000);
            });
            break;
    }
}

// Load post when page loads
document.addEventListener('DOMContentLoaded', loadPost);

// Add custom styles for this page
const style = document.createElement('style');
style.textContent = `
    .post-category {
        display: inline-block;
        background: var(--gradient-secondary);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 1rem;
    }

    .post-header {
        text-align: center;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
    }

    .article-meta {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
        color: var(--text-light);
        font-size: 0.9rem;
    }

    .article-meta span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .table-of-contents {
        background: var(--bg-secondary);
        padding: 1.5rem;
        border-radius: 12px;
        margin: 2rem 0;
        border-left: 4px solid var(--primary-color);
    }

    .table-of-contents h3 {
        margin: 0 0 1rem 0;
        color: var(--text-primary);
        font-size: 1.1rem;
    }

    .table-of-contents ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .table-of-contents li {
        margin: 0.5rem 0;
    }

    .table-of-contents a {
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .table-of-contents a:hover {
        color: var(--primary-color);
    }

    .post-footer {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 2rem;
    }

    .sharing-buttons {
        display: flex;
        gap: 0.5rem;
    }

    .share-btn {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .share-btn.twitter { background: #1DA1F2; }
    .share-btn.linkedin { background: #0077B5; }
    .share-btn.copy { background: var(--primary-color); }

    .share-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    .loading-message, .error-message {
        text-align: center;
        padding: 3rem;
        color: var(--text-secondary);
    }

    .error-message {
        background: var(--bg-secondary);
        border-radius: 12px;
        border: 1px solid var(--border-color);
    }

    .error-message h1 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    .error-message ul {
        text-align: left;
        max-width: 400px;
        margin: 1rem auto;
    }

    .error-message details {
        margin: 1rem 0;
        text-align: left;
    }

    .error-message code {
        background: var(--bg-color);
        padding: 0.5rem;
        border-radius: 4px;
        display: block;
        margin-top: 0.5rem;
    }

    @media (max-width: 768px) {
        .article-meta {
            flex-direction: column;
            gap: 0.5rem;
        }

        .post-footer {
            flex-direction: column;
            text-align: center;
        }

        .table-of-contents {
            margin: 1rem -1rem;
        }
    }
`;
document.head.appendChild(style);