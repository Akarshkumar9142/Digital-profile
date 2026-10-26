/*
  Portfolio pages data.
  Add verified project details here. Leave demo, screenshots, and contribution
  empty unless you have real links or information to include.
*/
window.PORTFOLIO_DATA = {
  resumePdf: "",
  projects: [
    {
      id: "nfc-digital-identity-portal",
      title: "NFC Digital Identity Portal",
      category: "Web · NFC",
      description: "A static digital identity page for sharing contact details and social links from an NFC card.",
      problem: "An NFC profile needs a clear destination where someone can quickly find contact details and ways to connect.",
      solution: "A lightweight, framework-free page that presents a digital contact card and supports common sharing actions.",
      features: [
        "Interactive 3D card presentation",
        "Social and contact links",
        "Downloadable vCard contact file",
        "QR code and profile link sharing",
        "Responsive layout with reduced-motion support"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "SVG"],
      hardware: ["MIFARE Classic S50 (1K), documented project target"],
      contribution: "",
      screenshots: [],
      demoUrl: "",
      githubUrl: "https://github.com/Akarshkumar9142/Digital-profile"
    },
  
        
    {
      id: "screening-easy",
      title: "Screening.Easy",
      category: "Web · Screen Sharing · WebRTC",
      description: "A browser-based presentation tool for sharing a laptop screen, PDF, image, or video with a TV, smart board, or another display.",
      problem: "Presenting content on another display can require cables, extra software, or complicated setup.",
      solution: "A browser-based interface that connects a presenter and receiver using a temporary 4-digit room code.",
      features: [
        "Presenter and receiver modes",
        "Temporary 4-digit connection code",
        "Screen and media presentation interface",
        "WebRTC peer-to-peer communication",
        "Responsive browser-based experience",
        "No account required in the displayed workflow"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "WebRTC"],
      hardware: [],
      contribution: "",
      screenshots: [],
      demoUrl: "https://akarshkumar9142.github.io/",
      githubUrl: ""

    },
    


  ]
};
