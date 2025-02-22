const JobData = {
    title: 'DFCCIL Multi Tasking Staff Recruitment 2025',
    summary: 'Dedicated Freight Corridor Corporation of India DFCCIL has released recruitment for various posts.',
    importantDates: [
      { label: 'Application Begin', value: '18/01/2025' },
      { label: 'Last Date to Apply', value: '22/03/2025' }
    ],
    applicationFee: [
      { category: 'General/OBC/EWS', amount: '1000/-' },
      { category: 'SC/ST/PH', amount: '0/-' }
    ],
    ageLimit: { min: 18, max: 30, relaxation: 'As per rules' },
    vacancies: [
      { post: 'Multi Tasking Staff MTS', total: 464 },
      { post: 'Junior Manager Finance', total: 3 }
    ],
    eligibility: [
      { post: 'Multi Tasking Staff MTS', qualification: '10th Matric with ITI Certificate' },
      { post: 'Junior Manager Finance', qualification: 'CA / CMA Certificate' }
    ],
    categoryWiseVacancies: [
      { post: 'Multi Tasking Staff MTS', categories: [
        { name: 'UR', count: 194 },
        { name: 'SC', count: 70 }
      ] },
      { post: 'Junior Manager Finance', categories: [
        { name: 'UR', count: 1 },
        { name: 'OBC', count: 2 }
      ] }
    ],
    howToApply: [
      'Read the official notification carefully.',
      'Ensure you have all required documents.',
      'Submit the application form online.'
    ]
  };

export {JobData};