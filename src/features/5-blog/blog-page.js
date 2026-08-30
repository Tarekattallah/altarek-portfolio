import { blogPosts } from '../../data/blog-posts.js';

export function initBlogPage() {
    const grid = document.getElementById('blog-grid');
    const featuredContainer = document.getElementById('featured-article-container');
    const filtersContainer = document.getElementById('category-filters');
    const searchInput = document.getElementById('blog-search');
    const emptyState = document.getElementById('empty-state');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    if (!grid) return;

    let currentCategory = 'All';
    let searchQuery = '';

    // Extract unique categories
    const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

    // Render Filters
    if (filtersContainer) {
        filtersContainer.innerHTML = categories.map(cat => 
            `<button class="category-btn px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}" data-category="${cat}">${cat}</button>`
        ).join('');

        filtersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.remove('bg-blue-600', 'text-white');
                    b.classList.add('bg-gray-800', 'text-gray-300');
                });
                e.target.classList.remove('bg-gray-800', 'text-gray-300');
                e.target.classList.add('bg-blue-600', 'text-white');
                
                currentCategory = e.target.getAttribute('data-category');
                renderPosts();
            }
        });
    }

    // Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderPosts();
        });
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            currentCategory = 'All';
            const allBtn = document.querySelector('.category-btn[data-category="All"]');
            if(allBtn) allBtn.click();
            else renderPosts();
        });
    }

    function renderPosts() {
        // Filter posts
        const filteredPosts = blogPosts.filter(post => {
            const matchesCategory = currentCategory === 'All' || post.category === currentCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery) || 
                                  post.description.toLowerCase().includes(searchQuery) ||
                                  post.tags.some(tag => tag.toLowerCase().includes(searchQuery));
            return matchesCategory && matchesSearch;
        });

        // Separate featured post if it's the default view and a featured post exists
        let displayFeatured = null;
        let displayGrid = filteredPosts;

        if (currentCategory === 'All' && searchQuery === '') {
            displayFeatured = filteredPosts.find(p => p.featured);
            if (displayFeatured) {
                displayGrid = filteredPosts.filter(p => p.id !== displayFeatured.id);
            }
        }

        // Render Featured
        if (featuredContainer) {
            if (displayFeatured) {
                featuredContainer.innerHTML = `
                    <div class="relative rounded-2xl overflow-hidden bg-gray-800 group border border-gray-700 hover:border-blue-500 transition-colors">
                        <div class="md:flex">
                            <div class="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                                <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('${displayFeatured.image}');"></div>
                                <div class="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured</div>
                            </div>
                            <div class="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <span class="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-2">${displayFeatured.category}</span>
                                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">${displayFeatured.title}</h2>
                                <p class="text-gray-400 text-lg mb-6 leading-relaxed">${displayFeatured.description}</p>
                                <div class="flex items-center justify-between mt-auto">
                                    <div class="flex items-center gap-4 text-sm text-gray-500">
                                        <span>${displayFeatured.date}</span>
                                        <span>•</span>
                                        <span>${displayFeatured.readTime}</span>
                                    </div>
                                    <a href="${displayFeatured.slug}/" class="text-blue-500 font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                                        Read Article
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                featuredContainer.classList.remove('hidden');
            } else {
                featuredContainer.innerHTML = '';
                featuredContainer.classList.add('hidden');
            }
        }

        // Render Grid
        if (displayGrid.length === 0 && !displayFeatured) {
            grid.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
        } else {
            if (emptyState) emptyState.classList.add('hidden');
            grid.innerHTML = displayGrid.map(post => `
                <div class="blog-card">
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
                            <a href="${post.slug}/" class="blog-card__read-more">
                                Read Article
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    renderPosts();
}
