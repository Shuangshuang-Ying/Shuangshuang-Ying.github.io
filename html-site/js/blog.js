// Blog posts data - example posts for learning how to blog
const blogPosts = [
    {
        id: 'my-research-journey',
        title: 'My Research Journey - Lessons from a Master\'s Student at LUT',
        date: '2024-02-10',
        file: 'blog/2024-02-10-my-research-journey.md',
        excerpt: 'Starting my Master\'s program at LUT has been an incredible learning experience. I wanted to share some insights, challenges, and discoveries that might help fellow students.'
    },
    {
        id: 'academic-writing-tips',
        title: 'Academic Writing Tips for Graduate Students',
        date: '2024-02-01',
        file: 'blog/2024-02-01-academic-writing-tips.md',
        excerpt: 'As a Master\'s student, I\'ve learned that good academic writing is both an art and a science. These tips have helped me improve my academic writing significantly.'
    },
    {
        id: 'markdown-basics',
        title: 'Markdown Basics - Your Complete Guide to Writing Beautiful Content',
        date: '2024-01-20',
        file: 'blog/2024-01-20-markdown-basics.md',
        excerpt: 'If you\'re new to blogging or writing technical documentation, Markdown is an essential skill to master. This complete guide will teach you everything you need to know.'
    },
    {
        id: 'blog-writing-guide',
        title: 'How to Write Engaging Blog Posts - A Beginner\'s Guide',
        date: '2024-01-15',
        file: 'blog/2024-01-15-blog-writing-guide.md',
        excerpt: 'Welcome to my first blog post! If you\'re interested in learning how to write engaging blog posts, I want to share some tips and best practices I\'ve learned.'
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

// Function to estimate reading time
function estimateReadingTime(excerpt) {
    const wordsPerMinute = 200;
    const words = excerpt.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
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
            Welcome to my blog! Here you'll find posts about blogging tips, academic writing, research insights, and my journey as a Master's student.
            These example posts will help you learn how to create engaging blog content.
        </p>
    `;
    container.appendChild(intro);

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
        } else if (post.title.toLowerCase().includes('markdown') || post.title.toLowerCase().includes('blog')) {
            category = 'Tutorial';
        } else if (post.title.toLowerCase().includes('journey') || post.title.toLowerCase().includes('experience')) {
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

    // Add call-to-action for writing your own posts
    const ctaElement = document.createElement('div');
    ctaElement.className = 'blog-cta';
    ctaElement.innerHTML = `
        <div style="background: var(--bg-secondary); padding: 2rem; border-radius: 16px; text-align: center; margin-top: 3rem; border: 2px dashed var(--border-color);">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">
                <i class="fas fa-edit" style="color: var(--primary-color);"></i>
                Ready to Start Your Own Blog?
            </h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                These example posts show different types of content you can create. Use them as inspiration for your own blogging journey!
            </p>
            <p style="color: var(--text-light); font-size: 0.9rem;">
                <strong>Pro tip:</strong> Look at the source markdown files to see how these posts are structured and formatted.
            </p>
        </div>
    `;
    container.appendChild(ctaElement);
}

// Function to add search functionality (future enhancement)
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

// Function to filter posts by category (future enhancement)
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
`;
document.head.appendChild(style);