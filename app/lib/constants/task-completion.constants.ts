export const tutoringCompletionFields = [
  {
    name: "isOneTimeJob",
    label: "Is this a one-time job?",
    type: "boolean",
  },

  {
    name: "studentLevel",
    label: "Student Level",
    type: "select",
    placeholder: "Select student level",
    options: [
      { label: "Beginner", value: "beginner" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" },
    ],
  },

  // {
  //   name: "teachingMethod",
  //   label: "Teaching Method",
  //   type: "select",
  //   placeholder: "Select teaching method",
  //   options: [
  //     { label: "Online", value: "online" },
  //     { label: "In Person", value: "in-person" },
  //   ],
  // },

  {
    name: "topicsCovered",
    label: "Topics Covered",
    type: "textarea",
    placeholder: "e.g. Algebra, grammar basics, reading comprehension",
  },

  {
    name: "sessionGoalsMet",
    label: "Were the session goals met?",
    type: "select",
    placeholder: "Select an option",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "Partially", value: "Partially" },
      { label: "No", value: "No" },
    ],
  },

  {
    name: "homeworkAssigned",
    label: "Did you assign homework?",
    type: "boolean",
  },

  {
    name: "challengesNoted",
    label: "Any Challenges Encountered?",
    type: "textarea",
    placeholder: "e.g. Student struggled with concepts or lacked focus",
  },

  {
    name: "durationMinutes",
    label: "Duration (minutes)",
    type: "number",
    placeholder: "e.g. 60",
  },

  {
    name: "studentProgress",
    label: "How was the student's progress?",
    type: "select",
    placeholder: "Select progress level",
    options: [
      { label: "Excellent", value: "Excellent" },
      { label: "Good", value: "Good" },
      { label: "Average", value: "Average" },
      { label: "Needs Improvement", value: "Needs Improvement" },
      { label: "Poor", value: "Poor" },
    ],
  },
];

//cleaning
export const cleaningCompletionFields = [
  {
    name: "isOneTimeJob",
    label: "Is this a one-time job?",
    type: "boolean",
    required: true,
  },
  {
    name: "cleanlinessLevel",
    label: "What level of cleaning was performed?",
    type: "select",
    required: true,
    options: [
      { label: "Standard Clean", value: "standard" },
      { label: "Deep Clean", value: "deep" },
      { label: "Light Touch-up", value: "light" },
    ],
    placeholder: "Select cleaning level",
  },
  {
    name: "areasCleaned",
    label: "Which areas were cleaned?",
    type: "multi-input",
    required: true,
    placeholder: "e.g., Living room, Kitchen, Bathroom",
  
  },
  {
    name: "tasksCompleted",
    label: "What tasks were completed?",
    type: "multi-input",
    required: true,
    placeholder: "e.g., Vacuuming, Dusting, Mopping floors",
  
  },
  {
    name: "issuesEncountered",
    label: "Were there any issues or challenges during the job?",
    type: "textarea",
    required: false,
    placeholder: "Describe any issues, damages, or special situations...",
  
  },
  {
    name: "durationMinutes",
    label: "How long did the job take?",
    type: "number",
    required: true,
    placeholder: "Duration in minutes",
    
  },
  
 
  
] as const;