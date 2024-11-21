export const techStacks = {
  "Programming": ["Python", "JavaScript", "Java", "C/C++", "SQL", "TypeScript", "R", "Swift"],
  "Web Development": ["React", "Node.js", "REST API", "Tailwind CSS"],
  "Data Science": ["Pandas", "NumPy", "NLP", "Regression", "Classification", "Clustering", "Data Visualization"],
  "Databases": ["MongoDB", "PostgreSQL"],
  "Tools": ["Git", "Docker", "Jira", "Postman", "Prisma"]
}

export const projects = [
  {
    title: "Scriptorium",
    description: "Online platform for writing, executing, and sharing code in multiple programming languages.",
    techStack: ["JavaScript", "TypeScript", "Docker", "Prisma", "React", "SQL", "REST API", "Tailwind CSS"],
    category: "Software Development",
    image: "/scriptorium.png?height=200&width=300",
    // video: "https://example.com/ai-recommendation-demo.mp4",
    github: "https://github.com/faraazzz31/scriptorium"
  },
  {
    title: "A11YMOLY",
    description: "A web accesibility testing platform parterning with 0 Barriers Foundation to automates WCAG compliance on web applications and PDFs.",
    techStack: ["React", "Tailwind CSS", "JavaScript", "MongoDB", "Node.js", "REST API"],
    category: "Software Development",
    image: "/wcag.jpeg?height=250&width=300",
    // video: "https://example.com/quantum-chat-demo.mp4",
    github: "https://github.com/johndoe/quantum-chat"
  },
  {
    title: "Trending Topic Analysis of Twitter Dataset using LDA",
    description: "Our project used LDA for topic modeling and ChatGPT for labeling topics, with preprocessing steps like expanding contractions and removing URLs. The analysis highlighted political themes in Canadian tweets, and our LDA model with 13 topics achieved a coherence score of 0.576, comparable to a baseline model.",
    techStack: ["NLP", "Python", "Pandas", "Clustering", "Data Visualization"],
    category: "Data Science",
    image: "/twitter.png?height=200&width=300",
    video: "https://utoronto-my.sharepoint.com/:p:/g/personal/christoffer_tan_mail_utoronto_ca/ERFqST0jR9lPh2mpN86g3rsB5GDVV9J689D29YB1-RwxfQ?e=3SdBiN",
    github: "https://github.com/JanisJ2/jsc270-a4"
  },
  {
    title: "Meal Planner",
    description: "Developed a user-friendly application allowing users to input preferences and receive personalized recipe recommendations, complete with a feature to save recipes to their weekly planner. The app also includes a calorie tracker, grocery list, and favorite recipe list for enhanced usability.",
    techStack: ["Java", "API", "Object Oriented Programming", "Clean Architecture"],
    category: "Software Development",
    image: "/mealmaster.png?height=200&width=300",
    video: "https://utoronto-my.sharepoint.com/:p:/g/personal/christoffer_tan_mail_utoronto_ca/Eam8mhJz0FBFl7rrl0asS-IBK3FRpEjQH_aSW3auHqQN8Q?e=yNKf2T",
    github: "https://github.com/ChristofferTan/csc207-project-meal-master"
  }
]

export const experiences = [
  {
    title: "Teaching Assistant (STA130 Fall 2024)",
    company: "University of Toronto",
    period: "September 2024 - Present",
    techStack: ["Data Visualization", "Python", "Pandas", "NumPy", "Regression", "Classification"],
    achievements: [
      "Facilitated weekly discussion-based tutorials for up to 24 students, developing their understanding of statistical concepts.",
      "Held office hours every 3 weeks and graded weekly assignments, exams, and projects, providing feedback to support student progress.",
      "Collaborated with course instructors and fellow TAs on grading standards, course goals, and instructional strategies."
    ]
  },
  {
    title: "Backend Software Engineer Intern",
    company: "Bang Jamin",
    period: "June 2024 - August 2024",
    techStack: ["TypeScript", "NodeJs", "MongoDB", "REST API", "Git", "Jira", "Postman"],
    achievements: [
      "Collaborated with cross-functional teams to develop new projects, utilizing Agile methodology with bi-weekly sprints.",
      "Developed an automated insurance policy generation system via REST API, leading to a 60% efficiency improvement.",
      "Designed and implemented a new dashboard for 1000+ car dealer users using TypeScript with Node.js (NestJs), enabling CRUD operations on MongoDB and providing real-time data visualization."
    ]

  },
]