const JobData = {
    UP_Police: {
        title: 'UP Police Constable Recruitment 2025',
        summary: 'UP Police commission has announced recruitment for various posts.',
        importantDates: [
            { label: 'Application Begin', value: '01/03/2025' },
            { label: 'Last Date to Apply', value: '15/04/2025' }
        ],
        applicationFee: [
            { category: 'General/OBC/EWS', amount: '500/-' },
            { category: 'SC/ST/PH', amount: '250/-' }
        ],
        ageLimit: { min: 18, max: 25, relaxation: 'As per rules' },
        vacancies: [
            { post: 'Constable', total: 4000 },
            { post: 'Sub-Inspector', total: 500 }
        ],
        eligibility: [
            { post: 'Constable', qualification: '12th Pass' },
            { post: 'Sub-Inspector', qualification: 'Graduate' }
        ],
        categoryWiseVacancies: [
            { post: 'Constable', categories: [
                { name: 'UR', count: 1600 },
                { name: 'SC', count: 800 }
            ] },
            { post: 'Sub-Inspector', categories: [
                { name: 'UR', count: 250 },
                { name: 'OBC', count: 150 }
            ] }
        ],
        howToApply: [
            'Visit the official UP Police website.',
            'Fill out the application form.',
            'Submit the form and pay the application fee.'
        ]
    },
    
    Delhi_Police: {
        title: 'Delhi Police Recruitment 2025',
        summary: 'Delhi Police has opened applications for various positions.',
        importantDates: [
            { label: 'Application Begin', value: '10/04/2025' },
            { label: 'Last Date to Apply', value: '20/05/2025' }
        ],
        applicationFee: [
            { category: 'General/OBC/EWS', amount: '600/-' },
            { category: 'SC/ST/PH', amount: '300/-' }
        ],
        ageLimit: { min: 18, max: 27, relaxation: 'As per rules' },
        vacancies: [
            { post: 'Head Constable', total: 3000 },
            { post: 'Assistant Sub-Inspector', total: 600 }
        ],
        eligibility: [
            { post: 'Head Constable', qualification: '12th Pass with Computer Knowledge' },
            { post: 'Assistant Sub-Inspector', qualification: 'Graduate with Typing Skills' }
        ],
        categoryWiseVacancies: [
            { post: 'Head Constable', categories: [
                { name: 'UR', count: 1200 },
                { name: 'OBC', count: 800 }
            ] },
            { post: 'Assistant Sub-Inspector', categories: [
                { name: 'UR', count: 300 },
                { name: 'SC', count: 150 }
            ] }
        ],
        howToApply: [
            'Go to the official Delhi Police website.',
            'Complete the online application form.',
            'Upload required documents and submit the form.'
        ]
    }
};

export { JobData };
