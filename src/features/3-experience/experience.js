// type: 'Training' | 'Diploma' | 'Education' — shown as a badge on each tab
const experiences = [
    {
        company: 'Ministry of Justice',
        type: 'Training',
        role: 'Full Stack Development Trainee',
        period: 'Sep 5, 2026 - Oct 16, 2026',
        tasks: [
            'Contributed to the development of a judicial fee calculation and review platform using React, TypeScript, Express, PostgreSQL, and Prisma.',
            'Worked on rule-based fee calculations, role-based access control, and dashboards for tracking assessments and settlements.'
        ],
        badges: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'RBAC']
    },
    {
        company: 'Digilians',
        type: 'Diploma',
        role: 'Software Development Diploma — AI-Powered Software Development',
        period: 'Dec 2025 - Sep 2026 (9 Months)',
        tasks: [
            'Delivered by the National Telecommunication Institute (NTI) with the Egyptian Military Academy under the Digital Pioneers Initiative.',
            'Intensive training in full-stack development, software architecture, cybersecurity, cloud computing, DevOps, and AI-assisted development.'
        ],
        modules: [
            {
                title: 'Foundations of Software Development',
                items: ['Programming Fundamentals', 'Python', 'Java', 'TypeScript', 'Object-Oriented Programming', 'Data Structures & Algorithms', 'Big O Complexity', 'Debugging & Unit Testing', 'Git & Version Control', 'Agile & DevOps Fundamentals', 'AI-Assisted Development']
            },
            {
                title: 'Frontend Development & UX',
                items: ['HTML5', 'CSS3', 'JavaScript / TypeScript', 'React', 'State Management', 'Routing & SPA Development', 'Tailwind CSS', 'Bootstrap', 'Responsive & Mobile-First Design', 'UI/UX', 'Figma', 'Accessibility & Performance Optimization', 'AI-Powered UI Personalization']
            },
            {
                title: 'Backend Development & Databases',
                items: ['Node.js', 'Express.js', 'Django', 'Spring Boot', 'RESTful APIs', 'GraphQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Database Design & Data Modeling', 'JWT Authentication & Authorization', 'API Security', 'Input Validation', 'Logging & Error Handling', 'Query Optimization & Indexing']
            },
            {
                title: 'Advanced Software Development & Security',
                items: ['Software Architecture', 'Microservices', 'Event-Driven Architecture', 'Secure Software Design', 'Secure Coding', 'Cybersecurity', 'Vulnerability Assessment', 'Penetration Testing', 'Security Auditing', 'Automated Testing', 'AI-Powered Security & Testing']
            },
            {
                title: 'Cloud & DevOps',
                items: ['AWS', 'Azure', 'Google Cloud fundamentals', 'Docker', 'Kubernetes', 'Terraform', 'Infrastructure as Code', 'CI/CD', 'GitHub Actions', 'DevSecOps', 'AWS EC2, VPC, S3, Lambda', 'Monitoring & Logging', 'Prometheus & Grafana', 'Cloud Cost Optimization', 'Serverless Architecture']
            },
            {
                title: 'Full-Stack Capstone',
                items: ['Designed and developed a complete full-stack software solution', 'Integrated frontend, backend, and database systems', 'Applied software architecture and security principles', 'Used AI-assisted development tools', 'Tested and deployed the final application to the cloud', 'Documented and presented the complete solution']
            }
        ],
        badges: ['Python', 'Java', 'TypeScript', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'PostgreSQL', 'Git', 'GitHub', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'CI/CD', 'AI', 'Cybersecurity']
    },
    {
        company: 'National Telecommunication Institute (NTI)',
        type: 'Training',
        role: 'Web Design Training — Digital Egypt Youth Program',
        period: 'Jul 2025 - Aug 2025',
        tasks: [
            'Completed 120 hours of training: 90 technical hours in web design and front-end development, and 30 hours of freelancing coaching.',
            'Finished the program with a final score of 87%.'
        ],
        certificateUrl: 'https://drive.google.com/file/d/16k83NOxDHpW4yREaAQGQxNEH1ydu0RfR/view'
    },
    {
        company: 'Benha University',
        type: 'Education',
        role: 'Faculty of Science',
        period: '2018 - 2024',
        tasks: [
            'Diploma in Software Development (2023 - 2024).',
            'B.Sc. in Science, Special Chemistry (2018 - 2022).'
        ]
    }
];

const typeStyles = {
    Training: 'bg-emerald-900/30 text-emerald-300 border-emerald-700/40',
    Diploma: 'bg-violet-900/30 text-violet-300 border-violet-700/40',
    Education: 'bg-amber-900/30 text-amber-300 border-amber-700/40',
};

function typeBadge(type) {
    return `<span class="inline-block border text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${typeStyles[type]}">${type}</span>`;
}

export function initExperienceFeature() {
    const tabsContainer = document.getElementById('experience-tabs');
    const contentContainer = document.getElementById('experience-content');
    if (!tabsContainer || !contentContainer) return;

    experiences.forEach((exp, index) => {
        const isActive = index === 0;
        tabsContainer.innerHTML += `<button class="experience-tab-btn flex-shrink-0 flex flex-col items-start gap-1 text-left ${isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'} px-4 py-2 transition-colors duration-300" data-index="${index}">
                <span>${exp.company}</span>
                ${typeBadge(exp.type)}
            </button>`;

        let modulesHTML = '';
        if (exp.modules) {
            modulesHTML = `<div class="mt-8">
                <h4 class="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Core Areas of Study</h4>
                <div class="grid md:grid-cols-2 gap-5">
                    ${exp.modules.map(mod => `
                        <div class="bg-gray-800/30 p-5 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
                            <h5 class="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                                ${mod.title}
                            </h5>
                            <ul class="space-y-2">
                                ${mod.items.map(item => `<li class="flex items-start text-sm text-gray-300 gap-2"><span class="text-blue-500 mt-1 text-xs opacity-70">▹</span> <span class="leading-relaxed">${item}</span></li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>`;
        }

        let badgesHTML = '';
        if (exp.badges) {
            badgesHTML = `<div class="mt-8">
                <h4 class="text-lg font-semibold text-gray-300 mb-4">Technologies & Tools</h4>
                <div class="flex flex-wrap gap-2">
                    ${exp.badges.map(badge => `<span class="bg-blue-900/20 text-blue-300 border border-blue-800/30 text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full shadow-sm">${badge}</span>`).join('')}
                </div>
            </div>`;
        }

        const certificateHTML = exp.certificateUrl
            ? `<a href="${exp.certificateUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-semibold">View certificate <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`
            : '';

        contentContainer.innerHTML += `
            <div class="experience-content-panel ${isActive ? 'block' : 'hidden'} animate-fade-in" data-index="${index}">
                <div class="mb-2">${typeBadge(exp.type)}</div>
                <h3 class="text-2xl font-bold text-white">${exp.role} <span class="text-blue-500">@ ${exp.company}</span></h3>
                <p class="text-sm text-gray-400 mt-1 mb-6 uppercase tracking-wider font-medium">${exp.period}</p>
                <ul class="space-y-3 mb-6">${exp.tasks.map(task => `<li class="flex items-start gap-3"><span class="text-blue-500 mt-1">▹</span><span class="text-gray-300 leading-relaxed">${task}</span></li>`).join('')}</ul>
                ${certificateHTML}
                ${modulesHTML}
                ${badgesHTML}
            </div>`;
    });

    tabsContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.experience-tab-btn');
        if (tab) {
            const index = tab.getAttribute('data-index');
            document.querySelectorAll('.experience-tab-btn').forEach(b => b.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500'));
            tab.classList.add('text-blue-500', 'border-b-2', 'border-blue-500');
            document.querySelectorAll('.experience-content-panel').forEach(p => p.classList.add('hidden'));
            contentContainer.querySelector(`.experience-content-panel[data-index="${index}"]`).classList.remove('hidden');
        }
    });
}
