// Card artwork is separate from the screenshots shown inside project details.
export function projectCardImage(project, { assetPrefix = '', eager = false } = {}) {
    const image = project.cardImage || project.coverImage;
    if (!image) return '';
    const src = /^https?:\/\//.test(image) ? image : assetPrefix + image;
    const alt = project.cardImageAlt || project.title;
    return `<div class="project-card__top">
        <img src="${src}" alt="${alt}" width="1536" height="864" loading="${eager ? 'eager' : 'lazy'}" decoding="async">
    </div>`;
}
