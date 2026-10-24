import { certifications, certificatesFolderUrl } from '../../data/certifications.js';

const issuerColors = {
    'Amazon Web Services': 'from-orange-500 to-amber-600',
    'Meta / Coursera': 'from-blue-500 to-indigo-600',
    'Coursera': 'from-blue-500 to-blue-700',
    'MITx / edX': 'from-rose-600 to-red-700',
    'Harvard University / edX': 'from-red-700 to-rose-900',
    'HarvardX / edX': 'from-red-700 to-rose-900',
};

const externalIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;

function initials(issuer) {
    if (issuer.startsWith('Amazon')) return 'AWS';
    return issuer.split(/[\s/]+/).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('');
}

function featuredCard(cert) {
    const link = cert.url
        ? `<a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 text-sm font-semibold inline-flex items-center gap-1 transition-colors">View credential ${externalIcon}</a>`
        : `<span class="text-gray-500 text-sm">Certificate available on request</span>`;
    return `
        <div class="cert-card reveal-up">
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${issuerColors[cert.issuer] || 'from-gray-600 to-gray-800'} flex items-center justify-center text-white text-xs font-bold tracking-wide">${initials(cert.issuer)}</div>
                <div class="min-w-0">
                    <h3 class="text-white font-semibold leading-snug">${cert.name}</h3>
                    <p class="text-gray-400 text-sm mt-1">${cert.issuer} · ${cert.date}</p>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-700/50">${link}</div>
        </div>`;
}

function courseGroups(courses) {
    const groups = new Map();
    courses.forEach(c => {
        if (!groups.has(c.issuer)) groups.set(c.issuer, []);
        groups.get(c.issuer).push(c);
    });
    return [...groups.entries()].map(([issuer, items]) => `
        <div class="bg-gray-800/30 p-5 rounded-lg border border-gray-700/50">
            <h4 class="text-blue-400 font-semibold mb-3 flex items-center justify-between gap-2">
                <span>${issuer}</span>
                <span class="text-xs text-gray-500 font-medium">${items.length}</span>
            </h4>
            <ul class="space-y-2">
                ${items.map(c => `
                    <li class="flex items-start justify-between gap-3 text-sm">
                        <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-blue-400 transition-colors leading-relaxed">${c.name}</a>
                        <span class="text-gray-500 text-xs whitespace-nowrap mt-0.5">${c.date}</span>
                    </li>`).join('')}
            </ul>
        </div>`).join('');
}

export function initCertificationsFeature() {
    const featuredWrapper = document.getElementById('certifications-featured');
    const coursesWrapper = document.getElementById('courses-list');
    const toggleBtn = document.getElementById('courses-toggle');
    if (!featuredWrapper || !coursesWrapper || !toggleBtn) return;

    const featured = certifications.filter(c => c.featured);
    const courses = certifications.filter(c => !c.featured);

    featuredWrapper.innerHTML = featured.map(featuredCard).join('');
    coursesWrapper.innerHTML = `
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">${courseGroups(courses)}</div>
        <p class="text-center mt-8">
            <a href="${certificatesFolderUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1">Browse all certificates on Google Drive ${externalIcon}</a>
        </p>`;

    const label = toggleBtn.querySelector('span');
    label.textContent = `Show all ${courses.length} courses`;
    toggleBtn.addEventListener('click', () => {
        const isHidden = coursesWrapper.classList.toggle('hidden');
        label.textContent = isHidden ? `Show all ${courses.length} courses` : 'Hide courses';
        toggleBtn.setAttribute('aria-expanded', String(!isHidden));
        toggleBtn.querySelector('svg').classList.toggle('rotate-180', !isHidden);
    });
}
