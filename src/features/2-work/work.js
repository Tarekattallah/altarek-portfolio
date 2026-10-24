import { getFeaturedProjects, getProjectById } from '../../data/projects.js';

const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('project-modal-content');

function openModal(project) {
    if (!modal || !modalContent) return;

    const coverHTML = (project.detailImages && project.detailImages.length > 0) || project.coverImage
        ? `<img src="${(project.detailImages && project.detailImages.length > 0) ? project.detailImages[0] : project.coverImage}" alt="${project.title}" class="w-full h-full object-cover">`
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
        linksHTML += `<a href="projects/${project.id}/" class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition duration-300 bg-blue-900/30 px-4 py-2 rounded-lg">
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
    }, 300); // Wait for animation to finish
}

export function initWorkFeature() {
    const projectsWrapper = document.getElementById('projects-wrapper');
    if (!projectsWrapper) return;

    const featuredProjects = getFeaturedProjects();

    featuredProjects.forEach(project => {
        let cardTopHTML = '';
        if (project.coverImage) {
            cardTopHTML = `<div class="project-card__top" style="background-image: url('${project.coverImage}')"></div>`;
        } else {
            cardTopHTML = `<div class="project-card__top bg-gradient-to-br ${project.placeholderColor} flex items-center justify-center p-4 text-center">
                <span class="text-2xl font-bold text-white tracking-wider opacity-90">${project.placeholderText}</span>
            </div>`;
        }

        let linkIconHTML = '';
        if (project.hasCaseStudy) {
            linkIconHTML = `<a href="projects/${project.id}/" class="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-1 transition-all">
                Case Study <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </a>`;
        } else if (project.githubUrl) {
            linkIconHTML = `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>`;
        } else {
             linkIconHTML = `<button class="text-gray-400 hover:text-white transition-colors" title="View details">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>`;
        }

        const projectSlide = `
            <div class="swiper-slide h-full">
                <div class="project-card h-full flex flex-col" data-project-id="${project.id}">
                    ${cardTopHTML}
                    <div class="project-card__content flex flex-col flex-grow">
                        <span class="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2 block">${project.category}</span>
                        <h3 class="project-card__title mb-2">${project.title}</h3>
                        <p class="project-card__description mb-4 flex-grow">${project.shortDescription}</p>
                        <div class="project-card__footer mt-auto border-t border-gray-700/50 pt-4 flex justify-between items-center">
                            <div class="project-card__tech">
                                <span class="tech-dot bg-blue-500"></span>
                                <span class="text-sm font-medium text-gray-300">${project.tech}</span>
                            </div>
                            <div class="project-card__links">
                                ${linkIconHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        projectsWrapper.innerHTML += projectSlide;
    });

    new Swiper('.swiper-container', {
        effect: 'slide',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: { 768: { slidesPerView: 2, spaceBetween: 30 }, },
        autoplay: { delay: 3000, disableOnInteraction: false, },
        grabCursor: true,
    });

    // Modal event listeners
    const workSection = document.getElementById('work');
    if (workSection) {
        workSection.addEventListener('click', (e) => {
            const card = e.target.closest('[data-project-id]');
            if (card) {
                // If the user clicked the case study link, let the browser handle it.
                if (e.target.closest('a[href^="projects/"]')) {
                    return;
                }
                const projectId = card.dataset.projectId;
                const project = getProjectById(projectId);
                if (project) openModal(project);
            }
        });
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) closeModal();
        });
    }
}