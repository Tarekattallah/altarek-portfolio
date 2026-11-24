import { projectsData, getProjectById } from '../../data/projects.js';
import { initProjectModal } from '../../shared/ui/project-modal.js';
import { projectCardImage } from '../../shared/ui/project-card-image.js';

export function initProjectsPage() {
    const gridWrapper = document.getElementById('projects-grid-wrapper');
    const categoriesWrapper = document.getElementById('project-categories');
    if (!gridWrapper || !categoriesWrapper) return;

    // Get unique categories
    const categories = ['All', ...new Set(projectsData.map(p => p.category))];

    // Render Categories
    categoriesWrapper.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'} px-4 py-2 rounded-full font-medium transition-colors text-sm" data-category="${cat}">
            ${cat}
        </button>
    `).join('');

    // Sort projects: featured first
    const sortedProjects = [...projectsData].sort((a, b) => (b.featured === a.featured) ? 0 : b.featured ? 1 : -1);

    // Render Projects
    function renderProjects(category = 'All') {
        const filtered = category === 'All' 
            ? sortedProjects 
            : sortedProjects.filter(p => p.category === category);

        if (filtered.length === 0) {
            gridWrapper.innerHTML = '<div class="col-span-full text-center text-gray-400 py-10">No projects found.</div>';
            return;
        }

        gridWrapper.innerHTML = filtered.map((project, index) => {
            const cardTopHTML = projectCardImage(project, { assetPrefix: '../', eager: index < 3 });

            let badgeHTML = project.featured ? `<div class="project-card-badge absolute top-4 right-4 bg-yellow-500 text-yellow-950 text-xs font-bold px-2 py-1 rounded shadow-lg">${project.engagement || 'Featured'}</div>` : '';

            return `
                <div class="project-card-grid bg-gray-900 rounded-lg shadow-xl overflow-hidden flex flex-col transform transition-transform hover:-translate-y-2 hover:shadow-2xl relative reveal-up" style="animation-delay: ${index * 50}ms">
                    ${badgeHTML}
                    ${cardTopHTML}
                    <div class="p-6 flex flex-col flex-grow">
                        <span class="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2 block">${project.category}</span>
                        <h3 class="text-xl font-bold text-white mb-2">${project.title}</h3>
                        <p class="text-gray-400 text-sm mb-4 flex-grow">${project.shortDescription}</p>
                        
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${project.tags.slice(0, 3).map(tag => `<span class="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">${tag}</span>`).join('')}
                            ${project.tags.length > 3 ? `<span class="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">+${project.tags.length - 3}</span>` : ''}
                        </div>

                        <div class="border-t border-gray-800 pt-4 flex justify-between items-center mt-auto">
                            <span class="text-sm font-medium text-gray-300">${project.tech}</span>
                            <button class="text-blue-500 hover:text-blue-400 text-sm font-semibold flex items-center gap-1 transition-colors open-modal-btn" aria-haspopup="dialog" data-project-id="${project.id}">
                                Details <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Initial render
    renderProjects();

    // Category Filter Event Listener
    categoriesWrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            // Update active state
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-800', 'text-gray-300');
            });
            e.target.classList.remove('bg-gray-800', 'text-gray-300');
            e.target.classList.add('bg-blue-600', 'text-white');

            const category = e.target.dataset.category;
            renderProjects(category);
        }
    });

    // Shared project details dialog
    const projectModal = initProjectModal({ assetPrefix: '../', caseStudyPrefix: '' });

    gridWrapper.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-modal-btn');
        if (btn) {
            const projectId = btn.dataset.projectId;
            const project = getProjectById(projectId);
            if (project) projectModal.open(project, btn);
        }
    });

}
