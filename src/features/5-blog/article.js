import { blogPosts, getPostImage } from '../../data/blog-posts.js';

// Adds a "Copy" button to every code block in the article
function initCodeCopy() {
    document.querySelectorAll('.article-content pre').forEach(pre => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'code-copy-btn';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        wrapper.appendChild(button);

        button.addEventListener('click', async () => {
            const code = pre.innerText.trim();
            try {
                await navigator.clipboard.writeText(code);
                button.textContent = 'Copied!';
            } catch {
                button.textContent = 'Press Ctrl+C';
                const range = document.createRange();
                range.selectNodeContents(pre);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
            setTimeout(() => { button.textContent = 'Copy'; }, 2000);
        });
    });
}

// Thin bar under the header showing how far the reader is through the article
function initReadingProgress() {
    const article = document.querySelector('article');
    if (!article) return;

    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Reading progress');
    document.body.appendChild(bar);

    function update() {
        const start = article.offsetTop;
        const end = start + article.offsetHeight - window.innerHeight;
        const progress = end > start ? (window.scrollY - start) / (end - start) : 1;
        const percent = Math.round(Math.min(1, Math.max(0, progress)) * 100);
        bar.style.width = percent + '%';
        bar.setAttribute('aria-valuenow', String(percent));
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

export function initArticlePage() {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    initCodeCopy();
    initReadingProgress();
    
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

    // Set up Related Articles: rank by shared tags and category, then fill with the rest
    const relatedContainer = document.getElementById('related-articles');
    if (relatedContainer) {
        const score = (post) => post.tags.filter(t => currentPost.tags.includes(t)).length * 2
            + (post.category === currentPost.category ? 3 : 0);
        const related = blogPosts
            .filter(p => p.id !== currentPost.id)
            .map((post, order) => ({ post, order, score: score(post) }))
            .sort((a, b) => b.score - a.score || a.order - b.order)
            .slice(0, 3)
            .map(r => r.post);

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
