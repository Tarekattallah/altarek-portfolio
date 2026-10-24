export const blogPosts = [
    {
        id: '1',
        title: 'Building a Scalable Node.js Backend',
        slug: 'scalable-nodejs-backend',
        category: 'Backend Engineering',
        description: 'How I structure a scalable Node.js backend using separation of concerns, modular architecture, controllers, services, repositories, and models.',
        date: 'Oct 15, 2025',
        readTime: '4 min read',
        tags: ['Node.js', 'Express', 'Architecture', 'Backend'],
        featured: true,
        image: 'src/assets/images/blog/scalable-nodejs-backend.jpg',
    },
    {
        id: '2',
        title: 'Understanding RBAC in Enterprise Applications',
        slug: 'rbac-enterprise-applications',
        category: 'Software Architecture',
        description: 'A practical overview of Role-Based Access Control and how users, roles, permissions, and authorization work together in enterprise applications.',
        date: 'Oct 28, 2025',
        readTime: '4 min read',
        tags: ['RBAC', 'Security', 'Backend', 'Enterprise'],
        featured: false,
        image: 'src/assets/images/blog/rbac-enterprise-applications.jpg',
    },
    {
        id: '3',
        title: 'From CRUD APIs to Business Logic',
        slug: 'crud-to-business-logic',
        category: 'Backend Engineering',
        description: 'Why real-world enterprise applications require more than basic CRUD operations, and how business rules can be organized into reliable backend services and engines.',
        date: 'Nov 05, 2025',
        readTime: '4 min read',
        tags: ['REST API', 'Business Logic', 'Backend', 'Architecture'],
        featured: false,
        image: 'src/assets/images/blog/crud-to-business-logic.jpg',
    },
    {
        id: '4',
        title: 'What I Learned Building MADMS',
        slug: 'what-i-learned-building-madms',
        category: 'Project Case Studies',
        description: 'Lessons learned while designing and building a modular enterprise backend, including authentication, RBAC, validation, database design, and business modules.',
        date: 'Nov 12, 2025',
        readTime: '4 min read',
        tags: ['MADMS', 'Node.js', 'MongoDB', 'Enterprise'],
        featured: false,
        image: 'src/assets/images/blog/what-i-learned-building-madms.jpg',
    },
    {
        id: '5',
        title: 'Designing RESTful APIs the Right Way',
        slug: 'designing-restful-apis-right-way',
        category: 'Backend Engineering',
        description: 'Practical principles I follow when designing clean, consistent, and maintainable REST APIs.',
        date: 'Nov 18, 2025',
        readTime: '4 min read',
        tags: ['REST API', 'Node.js', 'Backend', 'API Design'],
        featured: false,
        image: 'src/assets/images/blog/designing-restful-apis-right-way.jpg',
    },
    {
        id: '6',
        title: 'MongoDB & Mongoose for Enterprise Applications',
        slug: 'mongodb-mongoose-enterprise',
        category: 'Databases',
        description: 'How schema design, validation, relationships, indexes, public identifiers, and soft deletion can be handled when building production-oriented applications with MongoDB and Mongoose.',
        date: 'Nov 25, 2025',
        readTime: '4 min read',
        tags: ['MongoDB', 'Mongoose', 'Database', 'Backend'],
        featured: false,
        image: 'src/assets/images/blog/mongodb-mongoose-enterprise.jpg',
    },
    {
        id: '7',
        title: 'AI-Assisted Software Development',
        slug: 'ai-assisted-software-development',
        category: 'AI & Software Development',
        description: 'How AI-assisted development can improve productivity, debugging, documentation, code exploration, and software engineering workflows while keeping developers responsible for architecture and technical decisions.',
        date: 'Dec 02, 2025',
        readTime: '4 min read',
        tags: ['AI', 'Software Engineering', 'Productivity'],
        featured: false,
        image: 'src/assets/images/blog/ai-assisted-software-development.jpg',
    },
    {
        id: '8',
        title: 'My Journey from Science to Software Engineering',
        slug: 'journey-science-to-software-engineering',
        category: 'Career & Engineering',
        description: 'My transition from a scientific and pharmaceutical background into software development, and how analytical thinking, problem solving, and attention to detail became valuable skills in engineering.',
        date: 'Dec 08, 2025',
        readTime: '4 min read',
        tags: ['Career', 'Software Engineering', 'Learning'],
        featured: false,
        image: 'src/assets/images/blog/journey-science-to-software-engineering.jpg',
    },
    {
        id: '9',
        title: 'Preparing for AWS Cloud Practitioner',
        slug: 'preparing-aws-cloud-practitioner',
        category: 'AWS & Cloud',
        description: 'My learning journey through AWS Cloud fundamentals and the key concepts behind cloud computing, security, storage, compute, networking, monitoring, and cost optimization.',
        date: 'Dec 15, 2025',
        readTime: '4 min read',
        tags: ['AWS', 'Cloud', 'CLF-C02'],
        featured: false,
        image: 'src/assets/images/blog/preparing-aws-cloud-practitioner.jpg',
    },
    {
        id: '10',
        title: 'From Full Stack Development to DevOps and SRE',
        slug: 'fullstack-to-devops-sre',
        category: 'DevOps & SRE',
        description: 'Why I am expanding beyond application development into cloud infrastructure, DevOps, reliability engineering, automation, and scalable systems.',
        date: 'Dec 22, 2025',
        readTime: '4 min read',
        tags: ['DevOps', 'SRE', 'Cloud', 'AWS'],
        featured: false,
        image: 'src/assets/images/blog/fullstack-to-devops-sre.jpg',
    }
];

// Helper function to resolve paths based on current page depth
export function getRelativePath(depth) {
    if (depth === 0) return './';
    if (depth === 1) return '../';
    if (depth === 2) return '../../';
    return './';
}

// Resolve a post's cover image for a page at the given depth
export function getPostImage(post, depth) {
    if (post.image.startsWith('http')) return post.image;
    return getRelativePath(depth) + post.image;
}
