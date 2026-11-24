export function initClientCaseStudy() {
    document.querySelectorAll('[data-comparison]').forEach(comparison => {
        const tabs = [...comparison.querySelectorAll('[role="tab"]')];
        const panels = [...comparison.querySelectorAll('[data-phase-panel]')];
        const tablist = comparison.querySelector('[role="tablist"]');
        if (!tablist || tabs.length !== panels.length || !tabs.length) return;

        function select(tab, moveFocus = false) {
            const phase = tab.dataset.phase;
            tabs.forEach(button => {
                const selected = button === tab;
                button.setAttribute('aria-selected', String(selected));
                button.tabIndex = selected ? 0 : -1;
            });
            panels.forEach(panel => {
                panel.setAttribute('role', 'tabpanel');
                panel.hidden = panel.dataset.phasePanel !== phase;
            });
            if (moveFocus) tab.focus();
        }

        tablist.hidden = false;
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => select(tab));
            tab.addEventListener('keydown', event => {
                let next;
                if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
                if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
                if (event.key === 'Home') next = 0;
                if (event.key === 'End') next = tabs.length - 1;
                if (next === undefined) return;
                event.preventDefault();
                select(tabs[next], true);
            });
        });
        select(tabs.find(tab => tab.dataset.phase === 'after') || tabs[0]);
    });
}
