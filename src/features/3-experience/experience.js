const experiences = [
    {
        company: 'Digilians',
        role: 'AI-Powered Software Development',
        period: '2025 - 2026 (9-Month Professional Diploma)',
        tasks: [
            'Completed an intensive 9-month professional software development program focused on modern software engineering, AI-powered development, full-stack application development, cloud computing, DevOps, cybersecurity, and software architecture.'
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
        role: 'Front-End Development Trainee / Scholarship Program',
        period: 'Jul 2025 - Aug 2025',
        tasks: ['Completed an intensive one-month Front-End development training program focused on building responsive and interactive web applications.', 'Learned HTML, CSS, JavaScript, and mastered React fundamentals.', 'Developed practical web apps integrating RESTful APIs and managing state with Redux/Context API.', 'Gained experience in UI/UX design, responsive layouts, and maintaining clean project structure.', 'Applied best practices for app architecture and performance optimization']
    },
    {
        company: 'CS50 Problem-Solving & Projects Team',
        role: 'CS50 Problem-Solving & Projects Trainee',
        period: 'Jan 28, 2024 - Feb 1, 2024',
        tasks: [
            'Participated in CS50 Harvard University course projects and problem sets.',
            'Gained experience in C, Python, and web development fundamentals.',
            'Developed practical projects implementing algorithms, data structures, and clean code practices.',
            'Collaborated with team members to analyze problems, design solutions, and optimize project performance.',
            'Enhanced problem-solving and teamwork skills through collaborative project development.'
        ]
    },
    {
        company: 'Harvard University (via edX)',
        role: 'CS50’s Introduction to Programming with Python',
        period: 'Summer 2024 (6 Weeks)',
        tasks: [
            'Learned Python fundamentals including variables, loops, functions, and object-oriented programming.',
            'Implemented algorithms and data structures to solve real-world programming problems.',
            'Built small projects demonstrating web programming, file handling, and automation.',
            'Gained practical experience in debugging, testing, and applying clean coding practices.',
        ]
    }
];

export function initExperienceFeature() {
    const tabsContainer = document.getElementById('experience-tabs');
    const contentContainer = document.getElementById('experience-content');
    if (!tabsContainer || !contentContainer) return;

    experiences.forEach((exp, index) => {
        const isActive = index === 0;
        tabsContainer.innerHTML += `<button class="experience-tab-btn flex-shrink-0 ${isActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'} px-4 py-2 transition-colors duration-300" data-index="${index}">${exp.company}</button>`;
        
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

        contentContainer.innerHTML += `
            <div class="experience-content-panel ${isActive ? 'block' : 'hidden'} animate-fade-in" data-index="${index}">
                <h3 class="text-2xl font-bold text-white">${exp.role} <span class="text-blue-500">@ ${exp.company}</span></h3>
                <p class="text-sm text-gray-400 mt-1 mb-6 uppercase tracking-wider font-medium">${exp.period}</p>
                <ul class="space-y-3 mb-6">${exp.tasks.map(task => `<li class="flex items-start gap-3"><span class="text-blue-500 mt-1">▹</span><span class="text-gray-300 leading-relaxed">${task}</span></li>`).join('')}</ul>
                ${modulesHTML}
                ${badgesHTML}
            </div>`;
    });

    tabsContainer.addEventListener('click', (e) => {
        if (e.target.matches('.experience-tab-btn')) {
            const index = e.target.getAttribute('data-index');
            document.querySelectorAll('.experience-tab-btn').forEach(b => b.classList.remove('text-blue-500', 'border-b-2', 'border-blue-500'));
            e.target.classList.add('text-blue-500', 'border-b-2', 'border-blue-500');
            document.querySelectorAll('.experience-content-panel').forEach(p => p.classList.add('hidden'));
            contentContainer.querySelector(`.experience-content-panel[data-index="${index}"]`).classList.remove('hidden');
        }
    });
}