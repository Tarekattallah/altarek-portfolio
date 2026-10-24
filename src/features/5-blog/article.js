import { blogPosts, getPostImage } from '../../data/blog-posts.js';

export function initArticlePage() {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    
    const currentSlug = mainEl.getAttribute('data-article-slug');
    if (!currentSlug) return;

    const currentIndex = blogPosts.findIndex(p => p.slug === currentSlug);
    if (currentIndex === -1) return;

    const currentPost = blogPosts[currentIndex];

    // Set up Prev/Next Navigation
    const prevNextContainer = document.getElementById('prev-next-nav');
    if (prevNextContainer) {
        const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
        const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

        let html = '';
        if (prevPost) {
            html += `
                <a href="../${prevPost.slug}/" class="group flex flex-col w-1/2 text-left p-4 rounded-lg hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700">
                    <span class="text-sm text-gray-500 mb-1 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg> Previous</span>
                    <span class="text-white font-semibold group-hover:text-blue-400 transition-colors">${prevPost.title}</span>
                </a>
            `;
        } else {
            html += `<div class="w-1/2"></div>`;
        }

        if (nextPost) {
            html += `
                <a href="../${nextPost.slug}/" class="group flex flex-col w-1/2 text-right p-4 rounded-lg hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700">
                    <span class="text-sm text-gray-500 mb-1 flex items-center justify-end gap-1">Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
                    <span class="text-white font-semibold group-hover:text-blue-400 transition-colors">${nextPost.title}</span>
                </a>
            `;
        } else {
            html += `<div class="w-1/2"></div>`;
        }

        prevNextContainer.innerHTML = html;
    }

    // Set up Related Articles (by tag intersection or category)
    const relatedContainer = document.getElementById('related-articles');
    if (relatedContainer) {
        let related = blogPosts.filter(p => p.id !== currentPost.id && (p.category === currentPost.category || p.tags.some(t => currentPost.tags.includes(t))));
        // Sort by number of common tags (optional, keeping it simple for now)
        related = related.slice(0, 3); // Get top 3

        if (related.length > 0) {
            relatedContainer.innerHTML = related.map(post => `
                <div class="blog-card">
                    <div class="blog-card__image h-40" style="background-image: url('${getPostImage(post, 2)}')"></div>
                    <div class="blog-card__content p-6">
                        <span class="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2 block">${post.category}</span>
                        <h4 class="text-lg font-bold text-white mb-2 leading-tight">${post.title}</h4>
                        <div class="mt-auto pt-4">
                            <a href="../${post.slug}/" class="text-blue-500 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">Read <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            document.getElementById('related-articles-section').classList.add('hidden');
        }
    }
}
