/**
 * Builds src/assets/css/tailwind.css (committed; the site has no build step on deploy).
 * Rebuild after adding new Tailwind classes:
 *   npx tailwindcss@3.4.17 -c tailwind.config.js -i src/assets/css/tailwind.input.css -o src/assets/css/tailwind.css --minify
 */
module.exports = {
    content: [
        './*.html',
        './projects/**/*.html',
        './blog/**/*.html',
        './src/**/*.js',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
