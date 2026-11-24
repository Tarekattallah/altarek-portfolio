import { certifications, certificatesFolderUrl } from '../../data/certifications.js';

const externalIcon = '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

function spotlightCard(cert) {
    return `<article class="credential-spotlight">
        <div class="credential-brand"><span class="credential-wordmark" aria-hidden="true">AWS</span><span>${escapeHTML(cert.issuer)}</span></div>
        <h4>${escapeHTML(cert.name)}</h4>
        <div class="credential-spotlight-footer">
            <span>${escapeHTML(cert.date)}</span>
            <a href="${escapeHTML(cert.url)}" target="_blank" rel="noopener noreferrer" aria-label="View credential: ${escapeHTML(cert.name)}">View credential ${externalIcon}</a>
        </div>
    </article>`;
}

function credentialRow(cert, course = false) {
    const content = `<div class="credential-row-copy"><${course ? 'span' : 'h4'} class="credential-name">${escapeHTML(cert.name)}</${course ? 'span' : 'h4'}>
        <span class="credential-meta">${escapeHTML(cert.issuer)} <span aria-hidden="true">·</span> ${escapeHTML(cert.date)}</span>
        ${cert.url ? '' : '<span class="credential-unavailable">Certificate available on request</span>'}</div>
        ${cert.url ? externalIcon : ''}`;
    return cert.url
        ? `<a class="credential-row" href="${escapeHTML(cert.url)}" target="_blank" rel="noopener noreferrer" aria-label="View credential: ${escapeHTML(cert.name)}">${content}</a>`
        : `<div class="credential-row">${content}</div>`;
}

export function initCertificationsFeature() {
    const featuredWrapper = document.getElementById('certifications-featured');
    const coursesWrapper = document.getElementById('courses-list');
    const toggleBtn = document.getElementById('courses-toggle');
    const folderLink = document.getElementById('certificates-folder');
    if (!featuredWrapper || !coursesWrapper || !toggleBtn || !folderLink) return;

    const featured = certifications.filter(cert => cert.featured);
    const spotlight = featured.filter(cert => cert.spotlight);
    const programs = featured.filter(cert => !cert.spotlight);
    const courses = certifications.filter(cert => !cert.featured);
    const issuers = [...new Set(courses.map(cert => cert.issuer))];

    featuredWrapper.innerHTML = `<div class="credentials-cloud">
        <h3 class="credentials-group-heading">Cloud certifications <span>${spotlight.length}</span></h3>
        <div class="credentials-spotlights">${spotlight.map(spotlightCard).join('')}</div>
    </div><div class="credentials-programs">
        <h3 class="credentials-group-heading">Selected programs <span>${programs.length}</span></h3>
        <div class="credentials-program-list">${programs.map(cert => credentialRow(cert)).join('')}</div>
    </div>`;
    folderLink.href = certificatesFolderUrl;

    coursesWrapper.innerHTML = `<div class="course-library-tools">
        <div class="course-search"><label for="course-search">Find a course</label><input id="course-search" type="search" placeholder="Search by title or provider…" autocomplete="off" aria-controls="course-results"></div>
        <div class="course-provider"><label for="course-provider">Provider</label><select id="course-provider" aria-controls="course-results"><option value="">All providers</option>${issuers.map(issuer => `<option value="${escapeHTML(issuer)}">${escapeHTML(issuer)}</option>`).join('')}</select></div>
    </div>
    <p id="course-results-count" class="course-results-count" role="status" aria-live="polite" aria-atomic="true"></p>
    <ul id="course-results" class="course-results" aria-label="Courses"></ul>
    <div id="course-empty" class="course-empty" hidden><p>No courses match your search.</p><button type="button" class="course-reset">Clear filters</button></div>`;

    const search = coursesWrapper.querySelector('#course-search');
    const provider = coursesWrapper.querySelector('#course-provider');
    const results = coursesWrapper.querySelector('#course-results');
    const count = coursesWrapper.querySelector('#course-results-count');
    const empty = coursesWrapper.querySelector('#course-empty');
    const renderCourses = () => {
        const query = search.value.trim().toLocaleLowerCase();
        const matches = courses.filter(cert => (!provider.value || cert.issuer === provider.value)
            && `${cert.name} ${cert.issuer}`.toLocaleLowerCase().includes(query));
        results.innerHTML = matches.map(cert => `<li>${credentialRow(cert, true)}</li>`).join('');
        count.textContent = `${matches.length} of ${courses.length} courses`;
        empty.hidden = matches.length !== 0;
        results.hidden = matches.length === 0;
    };
    search.addEventListener('input', renderCourses);
    provider.addEventListener('change', renderCourses);
    coursesWrapper.querySelector('.course-reset').addEventListener('click', () => {
        search.value = '';
        provider.value = '';
        renderCourses();
        search.focus();
    });
    renderCourses();

    const label = toggleBtn.querySelector('span');
    const updateToggle = () => {
        toggleBtn.setAttribute('aria-expanded', String(!coursesWrapper.hidden));
        label.textContent = coursesWrapper.hidden ? `Browse all ${courses.length} courses` : 'Hide courses';
    };
    updateToggle();
    toggleBtn.addEventListener('click', () => {
        coursesWrapper.hidden = !coursesWrapper.hidden;
        updateToggle();
    });
}
