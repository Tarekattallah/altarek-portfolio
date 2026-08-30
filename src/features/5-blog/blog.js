import { blogPosts, getRelativePath } from '../../data/blog-posts.js';

export function initBlogFeature() {
    const blogWrapper = document.getElementById('blog-wrapper');
    if (!blogWrapper) return;

    blogWrapper.innerHTML = ''; // Clear existing

    // Get latest 3 posts for the homepage
    const recentPosts = blogPosts.slice(0, 3);

    recentPosts.forEach(post => {
        const blogCard = `
            <div class="blog-card reveal-up">
                <div class="blog-card__image" style="background-image: url('${post.image}')">
                    <span class="blog-card__date">${post.date}</span>
                </div>
                <div class="blog-card__content">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-blue-500 text-xs font-semibold uppercase tracking-wider">${post.category}</span>
                        <span class="text-gray-500 text-xs">${post.readTime}</span>
                    </div>
                    <h3 class="blog-card__title">${post.title}</h3>
                    <p class="blog-card__excerpt">${post.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${post.tags.map(tag => `<span class="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">${tag}</span>`).join('')}
                    </div>
                    <div class="blog-card__footer">
                        <a href="blog/${post.slug}/" class="blog-card__read-more">
                            Read Article
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </a>
                    </div>
                </div>
            </div>
        `;
        blogWrapper.innerHTML += blogCard;
    });
}
