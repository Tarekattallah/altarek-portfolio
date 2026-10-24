import { projectsData, getProjectById } from '../../data/projects.js';

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
            let cardTopHTML = '';
            let imagePath = project.coverImage;
            if (imagePath && !imagePath.startsWith('http')) {
                imagePath = '../' + imagePath;
            }
            if (project.coverImage) {
                cardTopHTML = `<div class="h-48 bg-gray-800 bg-cover bg-center rounded-t-lg" style="background-image: url('${imagePath}')"></div>`;
            } else {
                cardTopHTML = `<div class="h-48 bg-gradient-to-br ${project.placeholderColor} flex items-center justify-center p-4 text-center rounded-t-lg">
                    <span class="text-2xl font-bold text-white tracking-wider opacity-90">${project.placeholderText}</span>
                </div>`;
            }

            let badgeHTML = project.featured ? `<div class="absolute top-4 right-4 bg-yellow-500 text-yellow-950 text-xs font-bold px-2 py-1 rounded shadow-lg">Featured</div>` : '';

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
                            <button class="text-blue-500 hover:text-blue-400 text-sm font-semibold flex items-center gap-1 transition-colors open-modal-btn" data-project-id="${project.id}">
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

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('project-modal-content');

    function openModal(project) {
        if (!modal || !modalContent) return;

        let imagePath = project.coverImage;
        if (imagePath && !imagePath.startsWith('http')) {
            imagePath = '../' + imagePath;
        }
        let detailImagePath = project.detailImages && project.detailImages.length > 0 ? project.detailImages[0] : null;
        if (detailImagePath && !detailImagePath.startsWith('http')) {
            detailImagePath = '../' + detailImagePath;
        }

        const coverHTML = detailImagePath || imagePath
            ? `<img src="${detailImagePath || imagePath}" alt="${project.title}" class="w-full h-full object-cover">`
            : `<div class="w-full h-full bg-gradient-to-br ${project.placeholderColor} flex items-center justify-center p-6 text-center">
                   <h3 class="text-3xl font-bold text-white tracking-wider opacity-90">${project.placeholderText}</h3>
               </div>`;

        let linksHTML = '';
        
        if (project.githubUrl) {
            linksHTML += `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-gray-300 hover:text-blue-500 font-semibold transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GitHub
            </a>`;
        }
        
        if (project.liveUrl) {
            linksHTML += `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-gray-300 hover:text-blue-500 font-semibold transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Live Demo
            </a>`;
        }

        if (project.hasCaseStudy) {
            linksHTML += `<a href="${project.id}/" class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition duration-300 bg-blue-900/30 px-4 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                View Case Study
            </a>`;
        }

        modalContent.innerHTML = `
            <div class="p-4 sm:p-8">
                <div class="flex justify-between items-start mb-4">
                     <h2 class="text-3xl font-bold text-white">${project.title}</h2>
                     <button id="close-modal-btn" class="text-gray-500 hover:text-white transition-colors text-4xl leading-none">&times;</button>
                </div>
                <div class="w-full h-56 sm:h-80 bg-gray-700 rounded-lg overflow-hidden mb-6 shadow-lg">
                     ${coverHTML}
                </div>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${project.tags.map(tag => `<span class="bg-blue-900/50 text-blue-300 text-sm font-medium px-3 py-1 rounded-full">${tag}</span>`).join('')}
                </div>
                <p class="text-gray-300 leading-relaxed mb-6">${project.longDescription || project.shortDescription}</p>
                <div class="flex items-center gap-6">
                     ${linksHTML}
                </div>
            </div>`;

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-95');
        document.body.classList.add('overflow-hidden');

        document.getElementById('close-modal-btn').onclick = closeModal;
    }

    function closeModal() {
        if (!modal || !modalContent) return;
        modal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('pointer-events-none');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    }

    gridWrapper.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-modal-btn');
        if (btn) {
            const projectId = btn.dataset.projectId;
            const project = getProjectById(projectId);
            if (project) openModal(project);
        }
    });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) closeModal();
        });
    }
}
