import { getFeaturedProjects, getProjectById } from '../../data/projects.js';
import { prefersReducedMotion } from '../../shared/ui/motion.js';
import { initProjectModal } from '../../shared/ui/project-modal.js';
import { projectCardImage } from '../../shared/ui/project-card-image.js';

export function initWorkFeature() {
    const projectsWrapper = document.getElementById('projects-wrapper');
    if (!projectsWrapper) return;

    const projectModal = initProjectModal();
    const featuredProjects = getFeaturedProjects();

    featuredProjects.forEach((project, index) => {
        const cardTopHTML = projectCardImage(project, { eager: index < 2 });

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
                        <h3 class="project-card__title mb-2"><button type="button" class="project-details-btn" aria-haspopup="dialog">${project.title}</button></h3>
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

    const slider = document.querySelector('.swiper-container');
    if (typeof Swiper === 'function') {
        new Swiper(slider, {
            effect: 'slide',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: { 768: { slidesPerView: 2, spaceBetween: 30 } },
            autoplay: prefersReducedMotion() ? false : { delay: 3000, disableOnInteraction: false },
            grabCursor: true,
        });
    } else {
        slider?.classList.add('projects-fallback');
    }

    // Modal event listeners
    const workSection = document.getElementById('work');
    if (workSection) {
        workSection.addEventListener('click', (e) => {
            const card = e.target.closest('[data-project-id]');
            if (card) {
                // Links navigate normally; the card and its title button open details.
                if (e.target.closest('a')) {
                    return;
                }
                const projectId = card.dataset.projectId;
                const project = getProjectById(projectId);
                if (project) projectModal.open(project, card.querySelector('.project-details-btn'));
            }
        });
    }
}
