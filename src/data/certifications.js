const drive = (id) => `https://drive.google.com/file/d/${id}/view`;

// Featured certifications are shown as cards; the rest appear in the expandable course list.
export const certifications = [
    // Featured
    { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', date: 'Oct 2026', url: drive('1mCMtoDf5htWzv3ib0oZ6BNs8-UTwzUFi'), featured: true },
    { name: 'AWS Certified Cloud Practitioner (CLF-C02)', issuer: 'Amazon Web Services', date: 'Aug 2026', url: drive('1fxgTGpzydZFReLKEmt7FiYOGdcrcmVAH'), featured: true },
    { name: 'Meta Front-End Developer Professional Certificate', issuer: 'Meta / Coursera', date: 'May 2026', url: 'https://www.coursera.org/account/accomplishments/professional-cert/CFBLM7XQIT74', featured: true },
    { name: 'MITx 6.00.1x: Introduction to CS & Programming Using Python', issuer: 'MITx / edX', date: 'Mar 2026', url: 'https://courses.edx.org/certificates/b2a7aec368e8447eae42048bae0cf405', featured: true },
    { name: 'CS50’s Introduction to Databases with SQL', issuer: 'Harvard University / edX', date: 'Aug 2026', url: 'https://cs50.harvard.edu/certificates/6a98565a-26dd-4bf3-8315-9b6c4a06da7f', featured: true },
    { name: 'CS50x: Introduction to Computer Science', issuer: 'HarvardX / edX', date: 'Dec 2025', url: null, featured: true },
    { name: 'Advanced DevOps Tools and Practices', issuer: 'Coursera', date: 'May 2026', url: 'https://www.coursera.org/account/accomplishments/verify/SC8JM9FL60IN', featured: true },
    { name: 'AWS Academy Graduate – Cloud Foundations', issuer: 'Amazon Web Services', date: 'Feb 2026', url: 'https://www.credly.com/badges/ff3e8510-e2a3-487a-bd7d-bdd6649d3a14', featured: true },

    // Coursera
    { name: 'Foundations of DevOps and Git', issuer: 'Coursera', date: 'May 2026', url: 'https://www.coursera.org/account/accomplishments/verify/OSV45IJG6S2M' },
    { name: 'Build Automation and Continuous Integration', issuer: 'Coursera', date: 'May 2026', url: 'https://www.coursera.org/account/accomplishments/verify/4Z6H8Y5C8J6Q' },
    { name: 'Advanced Git and GitHub Practices', issuer: 'Coursera', date: 'May 2026', url: 'https://www.coursera.org/account/accomplishments/verify/XU3YBXB0WI9J' },
    { name: 'Front-End Developer Capstone', issuer: 'Coursera', date: 'Mar 2026', url: drive('17X78v4jo03WFf-KVDoO09VzKZhk8_FVu') },
    { name: 'Coding Interview Preparation', issuer: 'Coursera', date: 'Mar 2026', url: drive('1UZRMy-Z16jt1hleUOEmSB7fbfTzkBRKM') },
    { name: 'Advanced React', issuer: 'Coursera', date: 'Mar 2026', url: drive('1uoTTXOIkIkrTG8RLmJueAn5PwA5EcYAU') },
    { name: 'Principles of UX/UI Design', issuer: 'Coursera', date: 'Mar 2026', url: drive('10NMPIVVq7HUZPHBvYM0HhIiw7yTDGCmA') },
    { name: 'Version Control', issuer: 'Coursera', date: 'Mar 2026', url: drive('1fjX_nXPVhKJ9ZveQDa02cyqBXQcXvUmG') },
    { name: 'HTML and CSS in Depth', issuer: 'Coursera', date: 'Mar 2026', url: drive('1WANEXXqEVQg2KD6xp82XBuGKT1SGzb1S') },
    { name: 'Programming with JavaScript', issuer: 'Coursera', date: 'Feb 2026', url: drive('1LTlpENKsdFD-1RCwdG-Jli97hHQjGO_L') },
    { name: 'Introduction to Front-End Development', issuer: 'Coursera', date: 'Feb 2026', url: drive('1TvzMTyvMa8Tmp5lxka7lBfVHPsvJd4_2') },
    { name: 'Delivering Quality Work with Agility', issuer: 'Coursera', date: 'Jan 2026', url: drive('1v91UN8hjeZCWJJbHglhXOUSyFZ8D_7C1') },

    // Manara Tech
    { name: 'AWS 1: Intro to Cloud Computing', issuer: 'Manara Tech', date: 'Jan 2026', url: drive('1ThkkJBWcYEVDwpFd-Mv8YeJcRj32ZelF') },
    { name: 'Backend Engineering with Node.js', issuer: 'Manara Tech', date: 'Nov 2025', url: drive('1vtS_aI8KVx_925yH_hWm51LaMapFXLqo') },

    // ITIDA
    { name: 'ITIDA GIGS Freelancing Program', issuer: 'ITIDA', date: 'Nov 2025', url: drive('1e8sOBTi-aAcTND50k_evrI7TQYxvhOb0') },

    // Sprints
    { name: 'DevOps Foundations', issuer: 'Sprints', date: 'Sep 2025', url: drive('1aBcmyXH1ItVMg-BjixtSuUWHqcDaC6oO') },
    { name: 'Programming with Python', issuer: 'Sprints', date: 'Sep 2025', url: drive('1QblZJ59sKPcy11rj3cSge_Wh9QWSX4YW') },
    { name: 'Mobile Development by Flutter', issuer: 'Sprints', date: 'Sep 2025', url: drive('1WPjiFAZapiJ_o71Kyygu0ilUjHipIFHF') },

    // Mahara Tech
    { name: 'Cloud and Virtualization Concepts', issuer: 'Mahara Tech', date: 'May 2026', url: drive('16UW-Rn1foDe9ArYQT-2lOV-rngMPn76u') },
    { name: 'Generative AI', issuer: 'Mahara Tech', date: 'Sep 2025', url: drive('1rfZjdpckdnm7Z8MmaZvml60lHwoKgnM7') },
    { name: 'JavaScript', issuer: 'Mahara Tech', date: 'Sep 2025', url: drive('1v2hQl3mVbfc_ZdJr2yPGKW5_ZHK-YpFs') },
    { name: 'Building Web Applications using PHP & MySQL', issuer: 'Mahara Tech', date: 'Sep 2025', url: drive('1VTrVmA48h_tyQeRKYqlpcFM4jsvq73vq') },
    { name: 'Freelancing Basics', issuer: 'Mahara Tech', date: 'Aug 2025', url: drive('1ZxCKDJIrllKSAC-DZmmHRA6aKRCFelay') },
    { name: 'AI For Everyone (AI4E)', issuer: 'Mahara Tech', date: 'May 2025', url: drive('1ehWruM0Pbc5Xx4ss81ZS4NY4ImTRMe7W') },
    { name: 'Database Fundamentals', issuer: 'Mahara Tech', date: 'May 2025', url: drive('1iIYWJ7lhu1S1dO0PGY7Jedylc-KLla2P') },
    { name: 'Learn HTML & CSS', issuer: 'Mahara Tech', date: 'May 2025', url: drive('1AbhvGWa_n7xQVx1-54kYxid-CAExJVce') },
    { name: 'Python Programming Basics', issuer: 'Mahara Tech', date: 'Mar 2025', url: drive('1IeBhrjIby4piryJe_73yY5s4vrDnGBRU') },

    // LinkedIn Learning
    { name: 'Introduction to Artificial Intelligence', issuer: 'LinkedIn Learning', date: 'Sep 2025', url: drive('1qP20NgKCjD2GCT5ZdV4InSf-QDoIHxzS') },

    // EYouth
    { name: 'Data Analysis Using Power BI', issuer: 'EYouth Learning', date: 'Oct 2025', url: drive('1V9No-3vKybxAF21BWSH8jpRbtqqew880') },
    { name: 'Data Analysis Using Excel', issuer: 'EYouth Learning', date: 'Oct 2025', url: drive('1cNXODxVl1dngePejSFxZnOHKJ8v0SPFx') },
    { name: 'Data Analysis', issuer: 'EYouth Learning', date: 'Oct 2025', url: drive('1Y_NFKiAS_0n7sTyc15FWJXORLcRZyDrW') },
    { name: 'Data Analysis Awareness', issuer: 'EYouth Learning', date: 'Oct 2025', url: drive('1zA1Opc15NGJ54IeXvgKhQNdw-_2glig0') },
];

// Public link to the full certificates folder
export const certificatesFolderUrl = 'https://drive.google.com/drive/folders/1eespjXtR1h1Zu7Xeed3DGgz9HT5oTRP5';
