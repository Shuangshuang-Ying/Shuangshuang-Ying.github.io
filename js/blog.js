// Blog posts data - start with a welcome post
const blogPosts = [
    {
        id: 'welcome',
        title: 'Welcome to My Blog!',
        date: '2024-01-01',
        file: 'blog/welcome.md',
        excerpt: 'Hello! Welcome to my personal website and blog. I\'m Shuangshuang Ying, a Master\'s student at LUT, and this is where I\'ll be sharing my thoughts, research insights, and learning journey.'
    }
];

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to load blog posts
function loadBlogPosts() {
    const container = document.getElementById('blog-posts');

    if (!container) {
        console.error('Blog posts container not found');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Add introduction text
    const intro = document.createElement('div');
    intro.className = 'blog-intro';
    intro.innerHTML = `
        <p style="text-align: center; margin-bottom: 3rem; color: var(--text-secondary); font-size: 1.1rem;">
            Welcome to my blog! This is where I share my thoughts on academic life, research, technology, and personal growth.
        </p>
    `;
    container.appendChild(intro);

    if (blogPosts.length === 0) {
        // Show empty state
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-pen-fancy" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h3>No posts yet</h3>
                <p>I haven't written any blog posts yet, but stay tuned for upcoming content!</p>
            </div>
        `;
        container.appendChild(emptyState);
        return;
    }

    // Create blog posts
    blogPosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';

        // Add staggered animation delay
        postElement.style.animationDelay = `${index * 0.1}s`;

        // Determine post category based on content
        let category = 'General';
        if (post.title.toLowerCase().includes('academic') || post.title.toLowerCase().includes('research')) {
            category = 'Academic';
        } else if (post.title.toLowerCase().includes('tutorial') || post.title.toLowerCase().includes('guide')) {
            category = 'Tutorial';
        } else if (post.title.toLowerCase().includes('welcome') || post.title.toLowerCase().includes('personal')) {
            category = 'Personal';
        }

        postElement.innerHTML = `
            <div class="post-category">${category}</div>
            <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
            <div class="meta">
                <span>${formatDate(post.date)}</span>
                <span class="reading-time">• ~${Math.max(1, Math.ceil(post.excerpt.split(' ').length / 50))} min read</span>
            </div>
            <div class="excerpt">${post.excerpt}</div>
            <a href="post.html?id=${post.id}" class="read-more">
                <i class="fas fa-arrow-right"></i>
                Read full post
            </a>
        `;

        container.appendChild(postElement);
    });

    // Add call-to-action for writing new posts
    const ctaElement = document.createElement('div');
    ctaElement.className = 'blog-cta';
    ctaElement.innerHTML = `
        <div style="background: var(--bg-secondary); padding: 2rem; border-radius: 16px; text-align: center; margin-top: 3rem; border: 2px dashed var(--border-color);">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">
                <i class="fas fa-edit" style="color: var(--primary-color);"></i>
                Ready to Add More Content?
            </h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                Create new blog posts by adding Markdown files to the <code>blog/</code> directory and updating the post metadata in <code>js/blog.js</code>.
            </p>
            <p style="color: var(--text-light); font-size: 0.9rem;">
                <strong>Tip:</strong> Use the welcome post as a template for your own content!
            </p>
        </div>
    `;
    container.appendChild(ctaElement);
}

// Function to add search functionality
function initializeSearch() {
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const posts = document.querySelectorAll('.blog-post');

            posts.forEach(post => {
                const title = post.querySelector('h2').textContent.toLowerCase();
                const excerpt = post.querySelector('.excerpt').textContent.toLowerCase();

                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
}

// Function to filter posts by category
function filterByCategory(category) {
    const posts = document.querySelectorAll('.blog-post');

    posts.forEach(post => {
        const postCategory = post.querySelector('.post-category').textContent;

        if (category === 'all' || postCategory === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// Load posts when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
    initializeSearch();

    // Add some interactivity to post cards
    setTimeout(() => {
        const posts = document.querySelectorAll('.blog-post');
        posts.forEach(post => {
            post.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });

            post.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-4px)';
            });
        });
    }, 500);
});

// CSS for post categories
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

    .blog-intro {
        margin-bottom: 2rem;
    }

    .reading-time {
        color: var(--text-light);
    }

    .read-more {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: gap 0.3s ease;
    }

    .read-more:hover {
        gap: 0.75rem;
    }

    .blog-cta {
        animation: fadeInUp 0.6s ease-out;
    }

    .empty-state {
        animation: fadeInUp 0.6s ease-out;
    }

    code {
        background: var(--bg-color);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.875rem;
        color: var(--primary-color);
        border: 1px solid var(--border-color);
    }
`;
document.head.appendChild(style);