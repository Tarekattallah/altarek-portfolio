// Shared by the homepage and the projects listing; paths are relative to each page.
export function initProjectModal({ assetPrefix = '', caseStudyPrefix = 'projects/' } = {}) {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-content');
    if (!modal || !content) return { open() {} };

    let trigger = null;
    let isOpen = false;
    let wasScrollLocked = false;
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]';
    const resolveImage = path => /^https?:\/\//.test(path) ? path : assetPrefix + path;

    content.setAttribute('role', 'dialog');
    content.setAttribute('aria-modal', 'true');
    content.setAttribute('aria-labelledby', 'project-modal-title');
    content.tabIndex = -1;
    modal.setAttribute('aria-hidden', 'true');

    function close() {
        if (!isOpen) return;
        isOpen = false;
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.add('scale-95');
        if (!wasScrollLocked) document.body.classList.remove('overflow-hidden');
        if (trigger?.isConnected) trigger.focus({ preventScroll: true });
        modal.setAttribute('aria-hidden', 'true');
        content.inert = true;
    }

    function open(project, opener = document.activeElement) {
        if (!isOpen) {
            trigger = opener;
            wasScrollLocked = document.body.classList.contains('overflow-hidden');
        }
        const image = project.detailImages?.[0] || project.coverImage;
        const links = [];
        if (project.githubUrl) {
            links.push(`<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 font-semibold">GitHub</a>`);
        }
        if (project.liveUrl) {
            links.push(`<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 font-semibold">Live Demo</a>`);
        }
        if (project.hasCaseStudy) {
            links.push(`<a href="${caseStudyPrefix}${project.id}/" class="text-blue-400 hover:text-blue-300 font-semibold">View Case Study</a>`);
        }

        content.innerHTML = `
            <div class="p-4 sm:p-8">
                <div class="flex justify-between items-start gap-4 mb-4">
                    <h2 id="project-modal-title" class="text-2xl sm:text-3xl font-bold text-white">${project.title}</h2>
                    <button type="button" id="close-modal-btn" aria-label="Close project details" class="text-gray-400 hover:text-white text-4xl leading-none flex-shrink-0">&times;</button>
                </div>
                ${image ? `<div class="w-full h-56 sm:h-80 bg-gray-700 rounded-lg overflow-hidden mb-6"><img src="${resolveImage(image)}" alt="${project.title}" class="w-full h-full object-cover"></div>` : ''}
                <div class="flex flex-wrap gap-2 mb-6">
                    ${project.tags.map(tag => `<span class="bg-blue-900/50 text-blue-300 text-sm font-medium px-3 py-1 rounded-full">${tag}</span>`).join('')}
                </div>
                <p class="text-gray-300 leading-relaxed mb-6">${project.longDescription || project.shortDescription}</p>
                <div class="flex flex-wrap items-center gap-6">${links.join('')}</div>
            </div>`;

        isOpen = true;
        content.inert = false;
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-95');
        content.scrollTop = 0;
        document.body.classList.add('overflow-hidden');
        const closeButton = content.querySelector('#close-modal-btn');
        closeButton.addEventListener('click', close);
        closeButton.focus({ preventScroll: true });
    }

    // Keep the closed dialog out of keyboard navigation, including before first open.
    content.inert = true;
    modal.addEventListener('click', event => {
        if (event.target === modal) close();
    });
    document.addEventListener('keydown', event => {
        if (!isOpen) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            close();
        } else if (event.key === 'Tab') {
            const items = [...content.querySelectorAll(focusableSelector)];
            const first = items[0];
            const last = items[items.length - 1];
            if (!items.length) {
                event.preventDefault();
                content.focus();
            } else if (event.shiftKey && (document.activeElement === first || !content.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !content.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    return { open, close };
}
