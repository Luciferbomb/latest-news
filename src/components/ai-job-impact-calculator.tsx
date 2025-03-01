"use client";

import React, { useState } from 'react';

const AiJobImpactCalculator = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Industry data with corresponding jobs
  const industryData = {
    'Healthcare': ['Doctor', 'Nurse', 'Medical Researcher', 'Healthcare Administrator', 'Radiologist'],
    'Technology': ['Software Developer', 'Data Scientist', 'IT Support', 'UX Designer', 'Product Manager'],
    'Finance': ['Financial Analyst', 'Accountant', 'Investment Banker', 'Financial Advisor', 'Insurance Agent'],
    'Education': ['Teacher', 'Professor', 'Educational Administrator', 'Instructional Designer', 'School Counselor'],
    'Media': ['Journalist', 'Content Creator', 'Graphic Designer', 'Marketing Specialist', 'Social Media Manager'],
    'Manufacturing': ['Production Worker', 'Quality Control', 'Supply Chain Manager', 'Industrial Designer', 'Plant Manager'],
    'Retail': ['Sales Associate', 'Store Manager', 'Buyer', 'Customer Service Rep', 'Inventory Manager'],
    'Transportation': ['Driver', 'Logistics Coordinator', 'Air Traffic Controller', 'Fleet Manager', 'Dispatcher']
  };

  // Impact data structure
  const impactData = {
    'Healthcare': {
      'Doctor': {
        tasks: ['Diagnoses', 'Treatment planning', 'Patient communication', 'Documentation'],
        impact: [
          { year: 1, level: 30, description: 'AI assists with initial symptom analysis and suggests possible diagnoses' },
          { year: 3, level: 55, description: 'AI handles routine cases and documentation, allowing focus on complex patients' },
          { year: 5, level: 70, description: 'AI becomes diagnostic partner, handling most routine work with doctor oversight' }
        ]
      },
      'Nurse': {
        tasks: ['Patient monitoring', 'Medication administration', 'Care coordination', 'Documentation'],
        impact: [
          { year: 1, level: 25, description: 'AI helps with documentation and provides alerts for patient monitoring' },
          { year: 3, level: 45, description: 'AI optimizes schedules and assists with care coordination across teams' },
          { year: 5, level: 60, description: 'AI handles most routine monitoring, allowing nurses to focus on direct patient care' }
        ]
      },
      'Medical Researcher': {
        tasks: ['Literature review', 'Experiment design', 'Data analysis', 'Publication'],
        impact: [
          { year: 1, level: 40, description: 'AI accelerates literature review and identifies research gaps' },
          { year: 3, level: 65, description: 'AI suggests experiment designs and predicts outcomes' },
          { year: 5, level: 85, description: 'AI autonomously conducts initial experiments and validates hypotheses' }
        ]
      },
      'Healthcare Administrator': {
        tasks: ['Resource allocation', 'Staff scheduling', 'Billing/coding', 'Compliance'],
        impact: [
          { year: 1, level: 35, description: 'AI assists with billing and coding, reducing errors' },
          { year: 3, level: 60, description: 'AI manages scheduling and resource allocation optimization' },
          { year: 5, level: 75, description: 'AI handles most operational decisions with human oversight' }
        ]
      },
      'Radiologist': {
        tasks: ['Image interpretation', 'Diagnosis', 'Report creation', 'Collaboration'],
        impact: [
          { year: 1, level: 45, description: 'AI flags potential abnormalities for radiologist review' },
          { year: 3, level: 70, description: 'AI handles routine scans with radiologist providing final approval' },
          { year: 5, level: 85, description: 'AI autonomously interprets most images, with radiologists focusing on complex cases' }
        ]
      }
    },
    'Technology': {
      'Software Developer': {
        tasks: ['Requirements analysis', 'Coding', 'Testing', 'Maintenance'],
        impact: [
          { year: 1, level: 40, description: 'AI pairs with developers for code completion and bug detection' },
          { year: 3, level: 65, description: 'AI generates functional code from requirements, requires review and refinement' },
          { year: 5, level: 80, description: 'AI autonomously develops and maintains routine applications' }
        ]
      },
      'Data Scientist': {
        tasks: ['Data cleaning', 'Feature engineering', 'Model building', 'Interpretation'],
        impact: [
          { year: 1, level: 35, description: 'AI automates data cleaning and suggests relevant features' },
          { year: 3, level: 60, description: 'AI recommends optimal models and handles hyperparameter tuning' },
          { year: 5, level: 75, description: 'AI autonomously builds models, with humans focusing on strategy and interpretation' }
        ]
      },
      'IT Support': {
        tasks: ['Troubleshooting', 'System maintenance', 'User assistance', 'Issue documentation'],
        impact: [
          { year: 1, level: 45, description: 'AI resolves common issues through chatbots and automated diagnostics' },
          { year: 3, level: 70, description: 'AI handles most Level 1 and 2 support cases without human intervention' },
          { year: 5, level: 85, description: 'AI proactively identifies and resolves issues before users notice' }
        ]
      },
      'UX Designer': {
        tasks: ['User research', 'Wireframing', 'Prototyping', 'User testing'],
        impact: [
          { year: 1, level: 30, description: 'AI generates design alternatives based on requirements' },
          { year: 3, level: 55, description: 'AI creates complete prototypes from sketches or descriptions' },
          { year: 5, level: 70, description: 'AI autonomously designs interfaces based on user behavior data' }
        ]
      },
      'Product Manager': {
        tasks: ['Market research', 'Feature prioritization', 'Roadmap planning', 'Stakeholder communication'],
        impact: [
          { year: 1, level: 25, description: 'AI assists with market analysis and feature impact predictions' },
          { year: 3, level: 50, description: 'AI suggests optimal roadmaps based on market trends and user feedback' },
          { year: 5, level: 65, description: 'AI handles routine product decisions, with humans focusing on vision and strategy' }
        ]
      }
    },
    'Finance': {
      'Financial Analyst': {
        tasks: ['Data collection', 'Financial modeling', 'Trend analysis', 'Report generation'],
        impact: [
          { year: 1, level: 40, description: 'AI automates data collection and basic modeling' },
          { year: 3, level: 65, description: 'AI generates financial reports and forecasts with minimal guidance' },
          { year: 5, level: 80, description: 'AI handles most analysis independently, with analysts focusing on strategy' }
        ]
      },
      'Accountant': {
        tasks: ['Bookkeeping', 'Financial reporting', 'Tax preparation', 'Auditing'],
        impact: [
          { year: 1, level: 45, description: 'AI automates transaction categorization and reconciliation' },
          { year: 3, level: 70, description: 'AI handles most tax preparation and financial statement generation' },
          { year: 5, level: 85, description: 'AI performs comprehensive audits with accountants in oversight roles' }
        ]
      },
      'Investment Banker': {
        tasks: ['Market analysis', 'Deal valuation', 'Pitch creation', 'Client management'],
        impact: [
          { year: 1, level: 30, description: 'AI assists with financial modeling and market research' },
          { year: 3, level: 55, description: 'AI generates initial deal valuations and pitch materials' },
          { year: 5, level: 70, description: 'AI handles most analytical work, with bankers focusing on relationships' }
        ]
      },
      'Financial Advisor': {
        tasks: ['Client assessment', 'Portfolio management', 'Financial planning', 'Client communication'],
        impact: [
          { year: 1, level: 35, description: 'AI helps build personalized portfolios based on client goals' },
          { year: 3, level: 60, description: 'AI manages routine portfolio rebalancing and generates planning scenarios' },
          { year: 5, level: 75, description: 'AI handles most technical aspects, with advisors focusing on client relationships' }
        ]
      },
      'Insurance Agent': {
        tasks: ['Risk assessment', 'Policy recommendations', 'Claims processing', 'Client management'],
        impact: [
          { year: 1, level: 40, description: 'AI assists with risk assessment and policy matching' },
          { year: 3, level: 65, description: 'AI handles routine claims processing and policy recommendations' },
          { year: 5, level: 80, description: 'AI manages most technical processes, with agents focusing on complex cases' }
        ]
      }
    },
    'Education': {
      'Teacher': {
        tasks: ['Lesson planning', 'Instruction', 'Assessment', 'Classroom management'],
        impact: [
          { year: 1, level: 25, description: 'AI assists with lesson planning and automated grading' },
          { year: 3, level: 45, description: 'AI provides personalized learning paths for students' },
          { year: 5, level: 60, description: 'AI handles routine instruction, with teachers focusing on mentorship' }
        ]
      },
      'Professor': {
        tasks: ['Research', 'Course development', 'Lecturing', 'Student advising'],
        impact: [
          { year: 1, level: 30, description: 'AI assists with research literature reviews and grading' },
          { year: 3, level: 50, description: 'AI generates course materials and provides personalized student feedback' },
          { year: 5, level: 65, description: 'AI delivers some lecture content, with professors focusing on discussion and mentorship' }
        ]
      },
      'Educational Administrator': {
        tasks: ['Resource allocation', 'Policy implementation', 'Staff management', 'Reporting'],
        impact: [
          { year: 1, level: 35, description: 'AI optimizes scheduling and resource allocation' },
          { year: 3, level: 55, description: 'AI generates data-driven policy recommendations' },
          { year: 5, level: 70, description: 'AI handles most administrative processes, with humans focusing on leadership' }
        ]
      },
      'Instructional Designer': {
        tasks: ['Needs assessment', 'Content development', 'Learning evaluation', 'Technology integration'],
        impact: [
          { year: 1, level: 40, description: 'AI generates content drafts and learning assessments' },
          { year: 3, level: 60, description: 'AI creates complete learning modules based on objectives' },
          { year: 5, level: 75, description: 'AI handles most content creation, with designers focusing on strategy' }
        ]
      },
      'School Counselor': {
        tasks: ['Student assessment', 'Academic advising', 'Crisis intervention', 'Career guidance'],
        impact: [
          { year: 1, level: 20, description: 'AI helps identify at-risk students and suggests resources' },
          { year: 3, level: 40, description: 'AI provides initial career matching and academic planning' },
          { year: 5, level: 55, description: 'AI handles routine advising, with counselors focusing on emotional support' }
        ]
      }
    },
    'Media': {
      'Journalist': {
        tasks: ['Research', 'Interviewing', 'Writing', 'Fact-checking'],
        impact: [
          { year: 1, level: 35, description: 'AI assists with research and transcription' },
          { year: 3, level: 55, description: 'AI drafts routine news articles for human editing' },
          { year: 5, level: 70, description: 'AI generates most straightforward content, with journalists focusing on investigation' }
        ]
      },
      'Content Creator': {
        tasks: ['Ideation', 'Content production', 'Editing', 'Distribution'],
        impact: [
          { year: 1, level: 30, description: 'AI suggests content ideas and assists with editing' },
          { year: 3, level: 50, description: 'AI generates drafts and variations of content' },
          { year: 5, level: 65, description: 'AI produces routine content, with creators focusing on unique perspectives' }
        ]
      },
      'Graphic Designer': {
        tasks: ['Concept development', 'Layout design', 'Asset creation', 'Client revisions'],
        impact: [
          { year: 1, level: 35, description: 'AI generates design variations based on briefs' },
          { year: 3, level: 60, description: 'AI creates complete designs from specifications' },
          { year: 5, level: 75, description: 'AI handles most routine design work, with designers focusing on creative direction' }
        ]
      },
      'Marketing Specialist': {
        tasks: ['Campaign planning', 'Content creation', 'Analytics', 'Customer targeting'],
        impact: [
          { year: 1, level: 40, description: 'AI optimizes ad targeting and analyzes campaign performance' },
          { year: 3, level: 65, description: 'AI generates campaign content and predicts performance' },
          { year: 5, level: 80, description: 'AI manages routine campaigns, with specialists focusing on strategy' }
        ]
      },
      'Social Media Manager': {
        tasks: ['Content planning', 'Community engagement', 'Analytics', 'Trend monitoring'],
        impact: [
          { year: 1, level: 45, description: 'AI suggests optimal posting times and content ideas' },
          { year: 3, level: 70, description: 'AI creates and schedules routine content' },
          { year: 5, level: 85, description: 'AI handles most content creation and basic engagement' }
        ]
      }
    },
    'Manufacturing': {
      'Production Worker': {
        tasks: ['Assembly', 'Quality checking', 'Equipment operation', 'Material handling'],
        impact: [
          { year: 1, level: 35, description: 'AI-powered robots handle routine assembly tasks' },
          { year: 3, level: 60, description: 'AI systems manage most repetitive production processes' },
          { year: 5, level: 80, description: 'AI handles most production, with workers focusing on oversight and maintenance' }
        ]
      },
      'Quality Control': {
        tasks: ['Inspection', 'Testing', 'Documentation', 'Process improvement'],
        impact: [
          { year: 1, level: 45, description: 'AI vision systems detect defects with greater accuracy' },
          { year: 3, level: 70, description: 'AI manages comprehensive quality testing processes' },
          { year: 5, level: 85, description: 'AI handles most quality control, with specialists focusing on edge cases' }
        ]
      },
      'Supply Chain Manager': {
        tasks: ['Inventory management', 'Supplier coordination', 'Logistics planning', 'Cost optimization'],
        impact: [
          { year: 1, level: 40, description: 'AI optimizes inventory levels and logistics routes' },
          { year: 3, level: 65, description: 'AI predicts supply chain disruptions and suggests alternatives' },
          { year: 5, level: 80, description: 'AI manages most supply chain decisions, with managers focusing on strategy' }
        ]
      },
      'Industrial Designer': {
        tasks: ['Concept creation', 'Prototyping', 'Testing', 'Design refinement'],
        impact: [
          { year: 1, level: 30, description: 'AI generates design alternatives based on requirements' },
          { year: 3, level: 55, description: 'AI creates complex designs optimized for manufacturing' },
          { year: 5, level: 70, description: 'AI handles most technical design aspects, with designers focusing on aesthetics' }
        ]
      },
      'Plant Manager': {
        tasks: ['Production planning', 'Staff management', 'Process optimization', 'Budget control'],
        impact: [
          { year: 1, level: 35, description: 'AI optimizes production schedules and resource allocation' },
          { year: 3, level: 55, description: 'AI predicts maintenance needs and production bottlenecks' },
          { year: 5, level: 70, description: 'AI manages most operational decisions, with managers focusing on strategy' }
        ]
      }
    },
    'Retail': {
      'Sales Associate': {
        tasks: ['Customer assistance', 'Product knowledge', 'Transactions', 'Merchandising'],
        impact: [
          { year: 1, level: 30, description: 'AI chatbots handle basic customer inquiries' },
          { year: 3, level: 55, description: 'AI systems manage routine sales interactions' },
          { year: 5, level: 75, description: 'AI handles most transactions, with associates focusing on complex customer needs' }
        ]
      },
      'Store Manager': {
        tasks: ['Staff scheduling', 'Inventory management', 'Performance tracking', 'Customer service'],
        impact: [
          { year: 1, level: 35, description: 'AI optimizes staffing and inventory levels' },
          { year: 3, level: 60, description: 'AI manages most operational decisions with oversight' },
          { year: 5, level: 75, description: 'AI handles routine management tasks, with managers focusing on team development' }
        ]
      },
      'Buyer': {
        tasks: ['Trend analysis', 'Vendor negotiation', 'Assortment planning', 'Price optimization'],
        impact: [
          { year: 1, level: 40, description: 'AI predicts trends and suggests optimal product mix' },
          { year: 3, level: 65, description: 'AI handles routine purchasing decisions' },
          { year: 5, level: 80, description: 'AI manages most buying processes, with humans focusing on strategy' }
        ]
      },
      'Customer Service Rep': {
        tasks: ['Issue resolution', 'Product information', 'Order management', 'Customer communication'],
        impact: [
          { year: 1, level: 45, description: 'AI chatbots handle routine inquiries and issues' },
          { year: 3, level: 70, description: 'AI resolves most standard customer service cases' },
          { year: 5, level: 85, description: 'AI manages almost all routine service, with reps handling only complex cases' }
        ]
      },
      'Inventory Manager': {
        tasks: ['Stock monitoring', 'Order processing', 'Loss prevention', 'Space optimization'],
        impact: [
          { year: 1, level: 50, description: 'AI automates inventory tracking and reordering' },
          { year: 3, level: 75, description: 'AI predicts demand patterns and optimizes stock levels' },
          { year: 5, level: 90, description: 'AI handles most inventory decisions autonomously' }
        ]
      }
    },
    'Transportation': {
      'Driver': {
        tasks: ['Vehicle operation', 'Navigation', 'Loading/unloading', 'Documentation'],
        impact: [
          { year: 1, level: 30, description: 'AI assists with route optimization and navigation' },
          { year: 3, level: 60, description: 'Semi-autonomous vehicles handle highway driving' },
          { year: 5, level: 85, description: 'Fully autonomous vehicles handle most routes with oversight' }
        ]
      },
      'Logistics Coordinator': {
        tasks: ['Route planning', 'Scheduling', 'Load optimization', 'Tracking'],
        impact: [
          { year: 1, level: 45, description: 'AI optimizes routes and load configurations' },
          { year: 3, level: 70, description: 'AI manages most logistics planning with minimal oversight' },
          { year: 5, level: 85, description: 'AI handles all routine coordination, with humans managing exceptions' }
        ]
      },
      'Air Traffic Controller': {
        tasks: ['Traffic monitoring', 'Clearance authorization', 'Emergency response', 'Communication'],
        impact: [
          { year: 1, level: 25, description: 'AI assists with traffic prediction and optimization' },
          { year: 3, level: 45, description: 'AI manages routine traffic patterns with controller oversight' },
          { year: 5, level: 65, description: 'AI handles most traffic management, with controllers focusing on exceptions' }
        ]
      },
      'Fleet Manager': {
        tasks: ['Vehicle maintenance', 'Driver scheduling', 'Compliance', 'Cost management'],
        impact: [
          { year: 1, level: 40, description: 'AI predicts maintenance needs and optimizes schedules' },
          { year: 3, level: 65, description: 'AI manages most fleet operations with oversight' },
          { year: 5, level: 80, description: 'AI handles routine management, with humans focusing on strategy' }
        ]
      },
      'Dispatcher': {
        tasks: ['Resource assignment', 'Route planning', 'Communication', 'Problem solving'],
        impact: [
          { year: 1, level: 45, description: 'AI optimizes assignments and suggests routes' },
          { year: 3, level: 70, description: 'AI handles routine dispatching with minimal intervention' },
          { year: 5, level: 85, description: 'AI manages most dispatching, with humans handling only complex situations' }
        ]
      }
    }
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndustry(e.target.value);
    setSelectedJob('');
    setShowResults(false);
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJob(e.target.value);
    setShowResults(false);
  };

  // Direct calculate function (no form submission needed)
  const calculateImpact = () => {
    if (selectedIndustry && selectedJob) {
      setShowResults(true);
    }
  };

  const renderImpactLevel = (level: number) => {
    const color = level < 30 ? 'bg-blue-200' :
                 level < 50 ? 'bg-blue-300' :
                 level < 70 ? 'bg-blue-500' : 'bg-blue-700';
    
    const textColor = level < 50 ? 'text-black' : 'text-white';
    
    return (
      <div className="w-full h-6 bg-gray-200 rounded-full my-2">
        <div 
          className={`h-6 rounded-full ${color} ${textColor} flex items-center justify-center`} 
          style={{ width: `${level}%` }}
        >
          {level}%
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800 dark:text-blue-400">AI Job Impact Calculator</h1>
      
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Industry</label>
            <select 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedIndustry}
              onChange={handleIndustryChange}
            >
              <option value="">Choose an industry...</option>
              {Object.keys(industryData).map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Job</label>
            <select 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedJob}
              onChange={handleJobChange}
              disabled={!selectedIndustry}
            >
              <option value="">Choose a job...</option>
              {selectedIndustry && industryData[selectedIndustry].map((job) => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button 
          type="button"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors"
          disabled={!selectedIndustry || !selectedJob}
          onClick={calculateImpact}
        >
          Calculate AI Impact
        </button>
      </div>
      
      {showResults && selectedIndustry && selectedJob && impactData[selectedIndustry]?.[selectedJob] && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">{selectedJob} in {selectedIndustry}</h2>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2 dark:text-white">Key Tasks Impacted:</h3>
            <ul className="grid grid-cols-2 gap-2">
              {impactData[selectedIndustry][selectedJob].tasks.map((task, index) => (
                <li key={index} className="bg-blue-100 dark:bg-blue-900 py-1 px-3 rounded-full text-blue-800 dark:text-blue-200 text-sm">{task}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-4 dark:text-white">AI Impact Over Time:</h3>
            <div className="space-y-6">
              {impactData[selectedIndustry][selectedJob].impact.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold dark:text-white">Year {item.year}: {item.level}% Impact</h4>
                  {renderImpactLevel(item.level)}
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-medium mb-2 text-blue-800 dark:text-blue-300">Key Takeaway:</h3>
            <p className="text-gray-800 dark:text-gray-200">
              {
                impactData[selectedIndustry][selectedJob].impact[2].level > 80 ? 
                  `The ${selectedJob} role will likely be significantly transformed by AI in the next 5 years. Focus on developing skills in oversight, strategic decision-making, and human connection that complement AI capabilities.` :
                impactData[selectedIndustry][selectedJob].impact[2].level > 60 ?
                  `The ${selectedJob} role will experience substantial changes as AI handles routine aspects of the job. Developing expertise in areas requiring human judgment and creativity will be valuable.` :
                  `The ${selectedJob} role will be augmented rather than replaced by AI. Focus on learning to work effectively with AI tools while developing uniquely human skills that complement automation.`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiJobImpactCalculator; 