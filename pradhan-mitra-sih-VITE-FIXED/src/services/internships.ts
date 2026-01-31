export interface Internship {
  id: string
  title: string
  company: string
  sector: string
  location: string
  stipend: string
  duration: string
  skillsRequired: string[]
  programType: string
  ageRange: string
  benefits: string[]
}

export const REAL_PM_INTERNSHIPS_2025: Internship[] = [
  // Prime Minister's Internship Scheme (PMIS) Internships
  {
    id: 'PMIS001',
    title: 'Software Development Intern',
    company: 'TCS (Tata Consultancy Services)',
    sector: 'IT & Software Development',
    location: 'Multiple Cities',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['JavaScript', 'Python', 'SQL', 'Git', 'Problem Solving'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  {
    id: 'PMIS002',
    title: 'Financial Services Analyst',
    company: 'Muthoot Finance',
    sector: 'Banking & Financial Services',
    location: 'Kerala, Karnataka',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['MS Excel', 'Financial Analysis', 'Communication', 'Data Analysis'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  {
    id: 'PMIS003',
    title: 'Manufacturing Process Intern',
    company: 'Maruti Suzuki',
    sector: 'Automotive & Manufacturing',
    location: 'Gurgaon, Manesar',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['MS Excel', 'Quality Control', 'Documentation', 'Teamwork'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  {
    id: 'PMIS004',
    title: 'Operations Support Intern',
    company: 'Eicher Motors',
    sector: 'Automotive & Manufacturing',
    location: 'Pithampur, Chennai',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['MS Excel', 'Operations Management', 'Communication', 'Problem Solving'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  {
    id: 'PMIS005',
    title: 'Energy Operations Intern',
    company: 'Reliance Industries',
    sector: 'Oil, Gas & Energy',
    location: 'Mumbai, Jamnagar',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['Data Analysis', 'MS Excel', 'Safety Protocols', 'Documentation'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  {
    id: 'PMIS006',
    title: 'Infrastructure Project Assistant',
    company: 'Larsen & Toubro',
    sector: 'Infrastructure & Construction',
    location: 'Multiple Sites',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['MS Excel', 'Project Management', 'Documentation', 'Communication'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  {
    id: 'PMIS007',
    title: 'Retail Operations Intern',
    company: 'Jubilant Foodworks (Domino\'s)',
    sector: 'FMCG & Retail',
    location: 'Multiple Cities',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['Customer Service', 'MS Excel', 'Communication', 'Teamwork'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  {
    id: 'PMIS008',
    title: 'Healthcare Administration Intern',
    company: 'Apollo Hospitals',
    sector: 'Healthcare',
    location: 'Delhi, Chennai, Hyderabad',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['MS Excel', 'Healthcare Administration', 'Communication', 'Documentation'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  {
    id: 'PMIS009',
    title: 'Digital Marketing Intern',
    company: 'Hindustan Unilever',
    sector: 'FMCG & Retail',
    location: 'Mumbai, Delhi',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['Digital Marketing', 'Social Media Management', 'Content Writing', 'SEO'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  {
    id: 'PMIS010',
    title: 'Supply Chain Analyst',
    company: 'ITC Limited',
    sector: 'FMCG & Retail',
    location: 'Kolkata, Bangalore',
    stipend: '₹5,000/month',
    duration: '12 months',
    skillsRequired: ['Supply Chain', 'MS Excel', 'Data Analysis', 'Logistics'],
    programType: 'PMIS',
    ageRange: '21-24 years',
    benefits: ['₹6,000 one-time grant', 'Insurance coverage', 'Certificate of completion']
  },
  // Existing internships
  {
    id: 'LIC001',
    title: 'Data Entry Operator',
    company: 'LIC India',
    sector: 'Insurance',
    location: 'Pan India',
    stipend: '₹15K-20K',
    duration: '6 months',
    skillsRequired: ['MS Excel', 'Data Entry', 'Typing 40wpm'],
    programType: 'Regular',
    ageRange: '18-25 years',
    benefits: ['Certificate', 'Experience Letter']
  },
  {
    id: 'SBI002',
    title: 'Junior Accountant',
    company: 'State Bank of India',
    sector: 'Banking',
    location: 'Tier 1 Cities',
    stipend: '₹18K-25K',
    duration: '6 months',
    skillsRequired: ['Tally ERP', 'MS Excel Advanced', 'GST'],
    programType: 'Regular',
    ageRange: '18-25 years',
    benefits: ['Certificate', 'Experience Letter']
  },
  {
    id: 'NHAI003',
    title: 'Site Assistant',
    company: 'NHAI',
    sector: 'Infrastructure',
    location: 'Project Sites',
    stipend: '₹20K-30K',
    duration: '6 months',
    skillsRequired: ['MS Excel', 'Documentation', 'Communication'],
    programType: 'Regular',
    ageRange: '18-25 years',
    benefits: ['Certificate', 'Experience Letter']
  }
]