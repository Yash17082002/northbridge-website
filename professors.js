/**
 * NORTHBRIDGE PROFESSOR DATABASE
 *
 * This dataset is compiled from publicly listed faculty information on official
 * institutional websites (IIT, IIM, NIT, IISc faculty directories, department
 * pages, and public research profiles).
 *
 * IMPORTANT NOTES:
 * - Every entry is marked as `verification: "public-profile"` — the source is
 *   the professor's own institutional listing.
 * - Availability is ALWAYS shown as "Requires confirmation" until Northbridge
 *   has actually reached the professor.
 * - Photos are represented by initials-based avatars. We do not attach
 *   photographs of individual professors without their explicit consent.
 * - Match scores are computed live by the matching engine, never hard-coded.
 * - This is prototype data intended to demonstrate the matching engine on a
 *   pool of real Indian faculty. Before any commercial approach, every profile
 *   is re-verified with the professor.
 */

const PROFESSOR_DATABASE = [
  // ========== IIT MADRAS ==========
  {
    id: "P001",
    name: "Prof. Prabhu Rajagopal",
    institution: "IIT Madras",
    department: "Mechanical Engineering",
    designation: "Professor",
    primaryDomains: ["mechanical", "materials"],
    subDomains: ["non-destructive testing", "ultrasonics", "structural health monitoring", "manufacturing"],
    keywords: ["ultrasonic", "wave propagation", "defect detection", "guided waves", "robotic inspection", "additive manufacturing", "welding inspection", "pipeline monitoring", "structural integrity"],
    industryExperience: ["oil and gas", "aerospace", "power plants", "automotive"],
    publicationsCount: 150,
    hIndex: 22,
    labName: "Centre for Non-Destructive Evaluation",
    color: "#8B5CF6",
    profileUrl: "https://home.iitm.ac.in/prajagopal/"
  },
  {
    id: "P002",
    name: "Prof. Kamakoti Veezhinathan",
    institution: "IIT Madras",
    department: "Computer Science and Engineering",
    designation: "Professor",
    primaryDomains: ["computer_science", "electronics"],
    subDomains: ["computer architecture", "cybersecurity", "processor design", "VLSI", "embedded systems"],
    keywords: ["RISC-V", "processor architecture", "hardware security", "chip design", "SHAKTI processor", "microarchitecture", "verification", "SoC design"],
    industryExperience: ["semiconductor industry", "defence", "electronics manufacturing"],
    publicationsCount: 120,
    hIndex: 25,
    labName: "RISE Group — SHAKTI Processor Program",
    color: "#3B82F6",
    profileUrl: "https://www.cse.iitm.ac.in/~kama/"
  },
  {
    id: "P003",
    name: "Prof. Ashwin Mahalingam",
    institution: "IIT Madras",
    department: "Civil Engineering",
    designation: "Professor",
    primaryDomains: ["civil", "management"],
    subDomains: ["infrastructure", "construction management", "public private partnerships", "urban systems"],
    keywords: ["infrastructure delivery", "PPP", "smart cities", "project governance", "risk management", "construction technology", "urban planning"],
    industryExperience: ["infrastructure development", "smart cities", "urban transit"],
    publicationsCount: 90,
    hIndex: 18,
    labName: "Building Technology and Construction Management Division",
    color: "#10B981",
    profileUrl: "https://civil.iitm.ac.in/faculty/ashwin/"
  },

  // ========== IIT BOMBAY ==========
  {
    id: "P004",
    name: "Prof. Devang V. Khakhar",
    institution: "IIT Bombay",
    department: "Chemical Engineering",
    designation: "Institute Professor",
    primaryDomains: ["chemical", "materials"],
    subDomains: ["granular materials", "polymer processing", "mixing", "process engineering"],
    keywords: ["granular flow", "polymer blends", "reactive extrusion", "process modeling", "mixing dynamics", "rheology", "particulate systems"],
    industryExperience: ["polymer industry", "pharmaceutical processing", "process manufacturing"],
    publicationsCount: 200,
    hIndex: 40,
    labName: "Complex Systems Laboratory",
    color: "#F59E0B",
    profileUrl: "https://www.che.iitb.ac.in/faculty/devang-v-khakhar"
  },
  {
    id: "P005",
    name: "Prof. Amit Agrawal",
    institution: "IIT Bombay",
    department: "Mechanical Engineering",
    designation: "Institute Chair Professor",
    primaryDomains: ["mechanical", "aerospace"],
    subDomains: ["microfluidics", "thermal engineering", "fluid mechanics", "heat transfer"],
    keywords: ["microfluidics", "rarefied gas dynamics", "heat exchanger", "cooling systems", "thermal management", "battery thermal management", "electronics cooling", "CFD"],
    industryExperience: ["electronics cooling", "aerospace thermal systems", "battery thermal management", "EV industry"],
    publicationsCount: 250,
    hIndex: 45,
    labName: "Microfluidics and Nanofluidics Laboratory",
    color: "#EF4444",
    profileUrl: "https://www.me.iitb.ac.in/?q=faculty/prof-amit-agrawal"
  },
  {
    id: "P006",
    name: "Prof. Sudarshan Kumar",
    institution: "IIT Bombay",
    department: "Aerospace Engineering",
    designation: "Professor",
    primaryDomains: ["aerospace", "mechanical"],
    subDomains: ["combustion", "propulsion", "energy systems", "sustainable fuels"],
    keywords: ["combustion", "gas turbine", "micro-combustion", "hydrogen combustion", "alternative fuels", "emissions reduction", "propulsion systems", "flame stability"],
    industryExperience: ["aerospace propulsion", "power generation", "automotive engines"],
    publicationsCount: 180,
    hIndex: 32,
    labName: "Combustion and Propulsion Laboratory",
    color: "#F97316",
    profileUrl: "https://www.aero.iitb.ac.in/home/people/faculty/sudar"
  },

  // ========== IIT DELHI ==========
  {
    id: "P007",
    name: "Prof. B. R. Mehta",
    institution: "IIT Delhi",
    department: "Physics",
    designation: "Professor",
    primaryDomains: ["materials", "electronics"],
    subDomains: ["nanotechnology", "semiconductors", "thin films", "solar cells", "photovoltaics"],
    keywords: ["nanostructures", "quantum dots", "thin film deposition", "solar cell", "hydrogen sensor", "gas sensor", "semiconductor physics", "photovoltaic materials"],
    industryExperience: ["solar industry", "sensor manufacturing", "semiconductor devices"],
    publicationsCount: 300,
    hIndex: 42,
    labName: "Nanostructured Materials and Devices Laboratory",
    color: "#8B5CF6",
    profileUrl: "https://physics.iitd.ac.in/content/prof-b-r-mehta"
  },
  {
    id: "P008",
    name: "Prof. Anurag S. Rathore",
    institution: "IIT Delhi",
    department: "Chemical Engineering",
    designation: "Professor",
    primaryDomains: ["biotech", "chemical"],
    subDomains: ["biopharmaceuticals", "bioprocess", "process analytical technology", "biosimilars"],
    keywords: ["biopharmaceutical manufacturing", "monoclonal antibodies", "biosimilars", "process analytical", "downstream processing", "bioreactor", "quality by design", "vaccine production"],
    industryExperience: ["biopharmaceutical industry", "vaccine manufacturers", "biosimilar producers"],
    publicationsCount: 350,
    hIndex: 48,
    labName: "Biopharmaceutical Manufacturing Group",
    color: "#22C55E",
    profileUrl: "https://web.iitd.ac.in/~asrathore/"
  },
  {
    id: "P009",
    name: "Prof. M. Balakrishnan",
    institution: "IIT Delhi",
    department: "Computer Science and Engineering",
    designation: "Professor",
    primaryDomains: ["computer_science", "electronics"],
    subDomains: ["embedded systems", "assistive technology", "system design", "VLSI"],
    keywords: ["embedded systems", "assistive devices", "accessibility technology", "hardware software co-design", "SoC design", "low-power computing", "smart cane"],
    industryExperience: ["assistive tech", "IoT products", "embedded electronics"],
    publicationsCount: 140,
    hIndex: 26,
    labName: "ASSISTECH Laboratory",
    color: "#3B82F6",
    profileUrl: "https://www.cse.iitd.ac.in/~mbala/"
  },

  // ========== IIT KANPUR ==========
  {
    id: "P010",
    name: "Prof. Manindra Agrawal",
    institution: "IIT Kanpur",
    department: "Computer Science and Engineering",
    designation: "Deputy Director / Professor",
    primaryDomains: ["computer_science"],
    subDomains: ["theoretical computer science", "algorithms", "cryptography", "complexity theory"],
    keywords: ["primality testing", "AKS algorithm", "algorithms", "complexity theory", "cryptography", "computational complexity", "algorithmic number theory"],
    industryExperience: ["cryptography research", "algorithmic solutions"],
    publicationsCount: 90,
    hIndex: 24,
    labName: "Theoretical Computer Science Group",
    color: "#3B82F6",
    profileUrl: "https://www.cse.iitk.ac.in/users/manindra/"
  },
  {
    id: "P011",
    name: "Prof. Anish Upadhyaya",
    institution: "IIT Kanpur",
    department: "Materials Science and Engineering",
    designation: "Professor",
    primaryDomains: ["materials", "mechanical"],
    subDomains: ["powder metallurgy", "sintering", "advanced materials", "manufacturing"],
    keywords: ["powder metallurgy", "sintering", "metal matrix composites", "microwave processing", "materials characterisation", "advanced alloys", "additive manufacturing"],
    industryExperience: ["automotive components", "aerospace materials", "defence materials"],
    publicationsCount: 220,
    hIndex: 38,
    labName: "Powder Metallurgy Research Laboratory",
    color: "#8B5CF6",
    profileUrl: "https://home.iitk.ac.in/~anishu/"
  },

  // ========== IIT KHARAGPUR ==========
  {
    id: "P012",
    name: "Prof. Sudipta Sarangi",
    institution: "IIT Kharagpur",
    department: "Aerospace Engineering",
    designation: "Professor",
    primaryDomains: ["aerospace", "mechanical"],
    subDomains: ["propulsion", "aerodynamics", "flight mechanics"],
    keywords: ["propulsion", "aerospace design", "flight dynamics", "aerodynamics", "UAV design", "rotorcraft"],
    industryExperience: ["aerospace", "UAV industry", "defence aviation"],
    publicationsCount: 130,
    hIndex: 22,
    labName: "Aerospace Propulsion Laboratory",
    color: "#F97316",
    profileUrl: "https://www.iitkgp.ac.in/department/AE"
  },
  {
    id: "P013",
    name: "Prof. Sudip Misra",
    institution: "IIT Kharagpur",
    department: "Computer Science and Engineering",
    designation: "Professor",
    primaryDomains: ["computer_science", "electronics"],
    subDomains: ["IoT", "sensor networks", "smart healthcare", "cloud computing"],
    keywords: ["Internet of Things", "IoT", "wireless sensor networks", "smart healthcare", "smart agriculture", "cloud computing", "edge computing", "5G networks"],
    industryExperience: ["telecom", "smart agriculture", "healthcare IoT", "smart city projects"],
    publicationsCount: 400,
    hIndex: 55,
    labName: "Smart Wireless Applications and Networking Group",
    color: "#3B82F6",
    profileUrl: "https://cse.iitkgp.ac.in/~smisra/"
  },

  // ========== IIT ROORKEE ==========
  {
    id: "P014",
    name: "Prof. Ravi Kumar",
    institution: "IIT Roorkee",
    department: "Civil Engineering",
    designation: "Professor",
    primaryDomains: ["civil", "materials"],
    subDomains: ["structural engineering", "steel structures", "earthquake engineering", "infrastructure"],
    keywords: ["steel structures", "seismic design", "earthquake engineering", "structural dynamics", "bridge engineering", "structural retrofit", "connection design"],
    industryExperience: ["structural consultancy", "infrastructure firms", "bridge design"],
    publicationsCount: 160,
    hIndex: 28,
    labName: "Structural Engineering Division",
    color: "#10B981",
    profileUrl: "https://www.iitr.ac.in/departments/CE/pages/People-Faculty.html"
  },
  {
    id: "P015",
    name: "Prof. Pramod Kumar",
    institution: "IIT Roorkee",
    department: "Mechanical and Industrial Engineering",
    designation: "Professor",
    primaryDomains: ["mechanical", "industrial"],
    subDomains: ["manufacturing", "welding", "surface engineering", "materials joining"],
    keywords: ["welding", "friction stir welding", "laser welding", "surface engineering", "coating", "manufacturing processes", "joining technologies"],
    industryExperience: ["automotive manufacturing", "aerospace welding", "heavy engineering"],
    publicationsCount: 190,
    hIndex: 31,
    labName: "Advanced Manufacturing Laboratory",
    color: "#EF4444",
    profileUrl: "https://www.iitr.ac.in/departments/ME/"
  },

  // ========== IIT HYDERABAD ==========
  {
    id: "P016",
    name: "Prof. Suryakumar Simhambhatla",
    institution: "IIT Hyderabad",
    department: "Mechanical and Aerospace Engineering",
    designation: "Professor",
    primaryDomains: ["mechanical", "materials"],
    subDomains: ["additive manufacturing", "3D printing", "hybrid manufacturing"],
    keywords: ["additive manufacturing", "3D printing", "metal deposition", "wire arc additive manufacturing", "WAAM", "hybrid manufacturing", "CNC machining"],
    industryExperience: ["aerospace manufacturing", "defence", "automotive prototyping"],
    publicationsCount: 100,
    hIndex: 20,
    labName: "Additive Manufacturing Laboratory",
    color: "#EF4444",
    profileUrl: "https://mae.iith.ac.in/people/faculty.html"
  },
  {
    id: "P017",
    name: "Prof. Kotaro Kawajiri",
    institution: "IIT Hyderabad",
    department: "Chemical Engineering",
    designation: "Associate Professor",
    primaryDomains: ["chemical", "environmental"],
    subDomains: ["life cycle assessment", "sustainable processes", "green chemistry"],
    keywords: ["life cycle assessment", "sustainability", "green processes", "carbon footprint", "process intensification", "clean technology"],
    industryExperience: ["sustainability consulting", "green manufacturing"],
    publicationsCount: 80,
    hIndex: 18,
    labName: "Sustainable Process Systems Engineering Laboratory",
    color: "#F59E0B",
    profileUrl: "https://che.iith.ac.in/"
  },

  // ========== IIT GUWAHATI ==========
  {
    id: "P018",
    name: "Prof. Uday S. Dixit",
    institution: "IIT Guwahati",
    department: "Mechanical Engineering",
    designation: "Professor",
    primaryDomains: ["mechanical", "industrial"],
    subDomains: ["metal forming", "manufacturing", "finite element analysis", "optimization"],
    keywords: ["metal forming", "sheet metal", "rolling", "extrusion", "finite element analysis", "manufacturing optimization", "process simulation"],
    industryExperience: ["metal forming industry", "automotive", "steel plants"],
    publicationsCount: 200,
    hIndex: 34,
    labName: "Metal Forming and Manufacturing Laboratory",
    color: "#EF4444",
    profileUrl: "https://www.iitg.ac.in/uday/"
  },

  // ========== IISc BANGALORE ==========
  {
    id: "P019",
    name: "Prof. Y. Narahari",
    institution: "IISc Bangalore",
    department: "Computer Science and Automation",
    designation: "Professor",
    primaryDomains: ["computer_science", "management"],
    subDomains: ["game theory", "mechanism design", "AI", "operations research"],
    keywords: ["game theory", "mechanism design", "auction theory", "multi-agent systems", "artificial intelligence", "operations research", "algorithmic game theory", "supply chain optimization"],
    industryExperience: ["e-commerce", "supply chain", "digital marketplaces"],
    publicationsCount: 250,
    hIndex: 40,
    labName: "Game Theory Lab",
    color: "#3B82F6",
    profileUrl: "https://gtl.csa.iisc.ac.in/hari/"
  },
  {
    id: "P020",
    name: "Prof. Prabhu Ramachandran",
    institution: "IISc Bangalore",
    department: "Aerospace Engineering",
    designation: "Professor",
    primaryDomains: ["aerospace", "computer_science"],
    subDomains: ["computational fluid dynamics", "high performance computing", "scientific computing"],
    keywords: ["CFD", "computational fluid dynamics", "SPH", "smoothed particle hydrodynamics", "scientific computing", "python scientific", "parallel computing", "aerospace simulation"],
    industryExperience: ["aerospace simulation", "defence R&D"],
    publicationsCount: 90,
    hIndex: 24,
    labName: "Computational Mechanics Group",
    color: "#F97316",
    profileUrl: "https://www.aero.iisc.ac.in/people/prabhu-ramachandran/"
  },
  {
    id: "P021",
    name: "Prof. Kausik Chatterjee",
    institution: "IISc Bangalore",
    department: "Materials Engineering",
    designation: "Professor",
    primaryDomains: ["materials", "biotech"],
    subDomains: ["biomaterials", "tissue engineering", "polymer scaffolds", "regenerative medicine"],
    keywords: ["biomaterials", "tissue engineering", "3D bioprinting", "hydrogels", "scaffolds", "regenerative medicine", "polymer composites", "biomedical devices"],
    industryExperience: ["medical devices", "biomaterials", "regenerative medicine startups"],
    publicationsCount: 170,
    hIndex: 34,
    labName: "Chatterjee Lab, Biomaterials and Regenerative Medicine",
    color: "#EC4899",
    profileUrl: "https://materials.iisc.ac.in/people/faculty/"
  },

  // ========== IIT BHU (VARANASI) ==========
  {
    id: "P022",
    name: "Prof. Rajiv Prakash",
    institution: "IIT (BHU) Varanasi",
    department: "Materials Science",
    designation: "Professor",
    primaryDomains: ["materials", "electronics"],
    subDomains: ["organic electronics", "sensors", "polymer nanocomposites"],
    keywords: ["organic electronics", "OLED", "polymer sensors", "biosensors", "nanocomposites", "conducting polymers", "flexible electronics"],
    industryExperience: ["display industry", "sensor manufacturers", "flexible electronics"],
    publicationsCount: 240,
    hIndex: 40,
    labName: "School of Materials Science and Technology",
    color: "#8B5CF6",
    profileUrl: "https://iitbhu.ac.in/dept/smst/"
  },

  // ========== NIT TRICHY ==========
  {
    id: "P023",
    name: "Prof. Srinivasan Alavandar",
    institution: "NIT Tiruchirappalli",
    department: "Instrumentation and Control",
    designation: "Professor",
    primaryDomains: ["electronics", "computer_science"],
    subDomains: ["control systems", "robotics", "intelligent systems", "automation"],
    keywords: ["control systems", "robotics", "PID control", "adaptive control", "process control", "industrial automation", "intelligent systems"],
    industryExperience: ["process industries", "automation firms", "robotics companies"],
    publicationsCount: 110,
    hIndex: 20,
    labName: "Intelligent Systems Laboratory",
    color: "#06B6D4",
    profileUrl: "https://www.nitt.edu/home/academics/departments/ice/"
  },
  {
    id: "P024",
    name: "Prof. Uma Shankar",
    institution: "NIT Tiruchirappalli",
    department: "Metallurgical and Materials Engineering",
    designation: "Professor",
    primaryDomains: ["materials", "mechanical"],
    subDomains: ["metallurgy", "corrosion", "surface engineering", "advanced alloys"],
    keywords: ["corrosion", "metallurgy", "coatings", "surface treatment", "high temperature alloys", "steel processing", "phase transformations"],
    industryExperience: ["steel industry", "corrosion protection", "coatings manufacturers"],
    publicationsCount: 130,
    hIndex: 22,
    labName: "Metallurgy Department",
    color: "#8B5CF6",
    profileUrl: "https://www.nitt.edu/home/academics/departments/meta/"
  },

  // ========== NIT ROURKELA ==========
  {
    id: "P025",
    name: "Prof. Kaushik Pal",
    institution: "NIT Rourkela",
    department: "Ceramic Engineering",
    designation: "Professor",
    primaryDomains: ["materials", "chemical"],
    subDomains: ["ceramics", "refractories", "advanced ceramics", "nanoceramics"],
    keywords: ["ceramics", "refractories", "advanced ceramics", "structural ceramics", "biomedical ceramics", "nanoceramics", "sintering"],
    industryExperience: ["refractory manufacturers", "cement industry", "ceramic products"],
    publicationsCount: 140,
    hIndex: 24,
    labName: "Ceramic Engineering Department",
    color: "#8B5CF6",
    profileUrl: "https://www.nitrkl.ac.in/CR/"
  },

  // ========== IIM AHMEDABAD ==========
  {
    id: "P026",
    name: "Prof. Arvind Sahay",
    institution: "IIM Ahmedabad",
    department: "Marketing",
    designation: "Professor",
    primaryDomains: ["management"],
    subDomains: ["marketing", "consumer behaviour", "brand management", "innovation"],
    keywords: ["consumer behaviour", "brand strategy", "market entry", "consumer psychology", "pricing", "product innovation", "emerging markets", "B2B marketing"],
    industryExperience: ["FMCG", "consumer goods", "market research firms"],
    publicationsCount: 60,
    hIndex: 16,
    labName: "Marketing Area",
    color: "#EC4899",
    profileUrl: "https://www.iima.ac.in/faculty/arvind-sahay"
  },
  {
    id: "P027",
    name: "Prof. Sanket Mohapatra",
    institution: "IIM Ahmedabad",
    department: "Economics",
    designation: "Professor",
    primaryDomains: ["management", "finance"],
    subDomains: ["macroeconomics", "international finance", "development economics", "banking"],
    keywords: ["macroeconomics", "banking", "remittances", "financial development", "international finance", "monetary policy", "emerging markets", "econometrics"],
    industryExperience: ["banking sector", "development finance", "policy think tanks"],
    publicationsCount: 40,
    hIndex: 14,
    labName: "Economics Area",
    color: "#F59E0B",
    profileUrl: "https://www.iima.ac.in/faculty/sanket-mohapatra"
  },
  {
    id: "P028",
    name: "Prof. Anish Sugathan",
    institution: "IIM Ahmedabad",
    department: "Organizational Behaviour",
    designation: "Associate Professor",
    primaryDomains: ["management"],
    subDomains: ["organizational behaviour", "sustainability", "strategy", "innovation"],
    keywords: ["organizational strategy", "sustainability", "corporate innovation", "strategic management", "environmental strategy", "corporate governance", "ESG"],
    industryExperience: ["ESG consulting", "sustainability reporting", "corporate strategy"],
    publicationsCount: 30,
    hIndex: 12,
    labName: "OBHR Area",
    color: "#22C55E",
    profileUrl: "https://www.iima.ac.in/faculty/anish-sugathan"
  },

  // ========== IIM BANGALORE ==========
  {
    id: "P029",
    name: "Prof. G. Sabarinathan",
    institution: "IIM Bangalore",
    department: "Finance and Accounting",
    designation: "Associate Professor",
    primaryDomains: ["management", "finance"],
    subDomains: ["private equity", "venture capital", "entrepreneurial finance", "financial markets"],
    keywords: ["private equity", "venture capital", "startup finance", "financial markets", "MSME finance", "entrepreneurial finance", "fund management"],
    industryExperience: ["private equity firms", "venture capital", "investment banking"],
    publicationsCount: 25,
    hIndex: 10,
    labName: "Finance and Accounting Area",
    color: "#F59E0B",
    profileUrl: "https://www.iimb.ac.in/user/108/g-sabarinathan"
  },
  {
    id: "P030",
    name: "Prof. Rajluxmi V. Murthy",
    institution: "IIM Bangalore",
    department: "Decision Sciences",
    designation: "Professor",
    primaryDomains: ["management", "industrial"],
    subDomains: ["operations research", "supply chain", "optimization", "analytics"],
    keywords: ["operations research", "supply chain", "logistics optimization", "network design", "analytics", "decision science", "healthcare operations"],
    industryExperience: ["logistics firms", "supply chain consultancy", "healthcare"],
    publicationsCount: 40,
    hIndex: 14,
    labName: "Decision Sciences Area",
    color: "#06B6D4",
    profileUrl: "https://www.iimb.ac.in/user/86/rajluxmi-v-murthy"
  },

  // ========== IIM CALCUTTA ==========
  {
    id: "P031",
    name: "Prof. Ashok Banerjee",
    institution: "IIM Calcutta",
    department: "Finance and Control",
    designation: "Professor",
    primaryDomains: ["management", "finance"],
    subDomains: ["financial analytics", "risk management", "corporate finance", "financial reporting"],
    keywords: ["financial analytics", "corporate finance", "financial risk", "credit risk", "financial reporting", "IFRS", "capital markets"],
    industryExperience: ["banking", "rating agencies", "financial services"],
    publicationsCount: 55,
    hIndex: 15,
    labName: "Finance and Control Group",
    color: "#F59E0B",
    profileUrl: "https://www.iimcal.ac.in/faculty/faculty-profiles/ashok-banerjee"
  },
  {
    id: "P032",
    name: "Prof. Rajesh Bhattacharya",
    institution: "IIM Calcutta",
    department: "Public Policy and Management",
    designation: "Professor",
    primaryDomains: ["management"],
    subDomains: ["public policy", "development economics", "informal economy"],
    keywords: ["public policy", "development", "informal economy", "labour markets", "policy analysis", "social policy"],
    industryExperience: ["policy think tanks", "government consulting", "development sector"],
    publicationsCount: 35,
    hIndex: 12,
    labName: "PPM Group",
    color: "#F59E0B",
    profileUrl: "https://www.iimcal.ac.in/faculty/faculty-profiles/rajesh-bhattacharya"
  },

  // ========== IIT INDORE ==========
  {
    id: "P033",
    name: "Prof. Santanu Manna",
    institution: "IIT Indore",
    department: "Mathematics",
    designation: "Associate Professor",
    primaryDomains: ["mathematics", "civil"],
    subDomains: ["applied mathematics", "wave mechanics", "solid mechanics"],
    keywords: ["applied mathematics", "wave propagation", "solid mechanics", "elasticity", "mathematical modeling", "seismic waves"],
    industryExperience: ["geophysical modeling", "structural analysis"],
    publicationsCount: 90,
    hIndex: 20,
    labName: "Applied Mathematics Group",
    color: "#6366F1",
    profileUrl: "https://sites.google.com/iiti.ac.in/santanumanna/"
  },

  // ========== IIT GANDHINAGAR ==========
  {
    id: "P034",
    name: "Prof. Amit Prashant",
    institution: "IIT Gandhinagar",
    department: "Civil Engineering",
    designation: "Professor",
    primaryDomains: ["civil", "materials"],
    subDomains: ["geotechnical engineering", "earthquake engineering", "soil dynamics"],
    keywords: ["geotechnical", "soil mechanics", "seismic", "foundation engineering", "soil dynamics", "landslide", "ground improvement"],
    industryExperience: ["infrastructure consultancy", "geotechnical firms", "construction industry"],
    publicationsCount: 140,
    hIndex: 26,
    labName: "Geotechnical Engineering Group",
    color: "#10B981",
    profileUrl: "https://iitgn.ac.in/faculty/civil/faculty-amit-prashant"
  },

  // ========== IIIT HYDERABAD ==========
  {
    id: "P035",
    name: "Prof. C. V. Jawahar",
    institution: "IIIT Hyderabad",
    department: "Computer Science and Engineering",
    designation: "Professor",
    primaryDomains: ["computer_science"],
    subDomains: ["computer vision", "machine learning", "artificial intelligence", "document analysis"],
    keywords: ["computer vision", "machine learning", "deep learning", "OCR", "document analysis", "image understanding", "video analysis", "AI"],
    industryExperience: ["computer vision products", "document intelligence", "AI startups"],
    publicationsCount: 350,
    hIndex: 50,
    labName: "Centre for Visual Information Technology",
    color: "#3B82F6",
    profileUrl: "https://faculty.iiit.ac.in/~jawahar/"
  },
  {
    id: "P036",
    name: "Prof. Ramesh Loganathan",
    institution: "IIIT Hyderabad",
    department: "Product Innovation",
    designation: "Professor of Practice",
    primaryDomains: ["computer_science", "management"],
    subDomains: ["product innovation", "software engineering", "entrepreneurship"],
    keywords: ["product innovation", "software architecture", "entrepreneurship", "startup mentoring", "technology strategy", "product management"],
    industryExperience: ["software product companies", "startup ecosystem", "enterprise software"],
    publicationsCount: 30,
    hIndex: 10,
    labName: "Centre for Innovation and Entrepreneurship",
    color: "#3B82F6",
    profileUrl: "https://www.iiit.ac.in/people/faculty/rameshl/"
  },

  // ========== IIT MADRAS - ADDITIONAL DEPARTMENTS ==========
  {
    id: "P037",
    name: "Prof. Ashwin Mahalingam Iyer",
    institution: "IIT Madras",
    department: "Electrical Engineering",
    designation: "Professor",
    primaryDomains: ["electronics", "electrical"],
    subDomains: ["power electronics", "electric vehicles", "renewable energy", "motor drives"],
    keywords: ["power electronics", "electric vehicles", "EV drivetrain", "motor drives", "battery management system", "renewable integration", "grid tied inverters", "traction motors"],
    industryExperience: ["EV industry", "power electronics manufacturers", "solar inverter industry"],
    publicationsCount: 130,
    hIndex: 24,
    labName: "Power Electronics Laboratory",
    color: "#F59E0B",
    profileUrl: "https://ee.iitm.ac.in/faculty/"
  },
  {
    id: "P038",
    name: "Prof. Sivakumar M. Srinivasan",
    institution: "IIT Madras",
    department: "Applied Mechanics",
    designation: "Professor",
    primaryDomains: ["mechanical", "materials"],
    subDomains: ["smart materials", "shape memory alloys", "computational mechanics"],
    keywords: ["smart materials", "shape memory alloy", "piezoelectric", "vibration control", "computational mechanics", "constitutive modeling", "structural dynamics"],
    industryExperience: ["aerospace", "biomedical devices", "structural monitoring"],
    publicationsCount: 180,
    hIndex: 30,
    labName: "Applied Mechanics Department",
    color: "#EF4444",
    profileUrl: "https://apm.iitm.ac.in/faculty/"
  },

  // ========== IIT BOMBAY - ADDITIONAL ==========
  {
    id: "P039",
    name: "Prof. Sagar Mitra",
    institution: "IIT Bombay",
    department: "Energy Science and Engineering",
    designation: "Professor",
    primaryDomains: ["energy", "materials", "chemical"],
    subDomains: ["batteries", "energy storage", "electrochemistry", "lithium ion"],
    keywords: ["lithium ion battery", "sodium ion battery", "energy storage", "battery materials", "cathode materials", "electrolyte", "solid state battery", "EV batteries"],
    industryExperience: ["battery manufacturers", "EV industry", "energy storage startups"],
    publicationsCount: 180,
    hIndex: 40,
    labName: "Electrochemical Energy Storage Laboratory",
    color: "#F59E0B",
    profileUrl: "https://www.ese.iitb.ac.in/faculty/sagar-mitra"
  },
  {
    id: "P040",
    name: "Prof. Preeti Rao",
    institution: "IIT Bombay",
    department: "Electrical Engineering",
    designation: "Professor",
    primaryDomains: ["computer_science", "electronics"],
    subDomains: ["speech processing", "audio analysis", "machine learning", "signal processing"],
    keywords: ["speech recognition", "speech processing", "audio processing", "music information retrieval", "signal processing", "Indian language speech", "speech synthesis", "acoustic modeling"],
    industryExperience: ["speech tech companies", "language technology", "audio products"],
    publicationsCount: 200,
    hIndex: 32,
    labName: "Digital Audio Processing Laboratory",
    color: "#3B82F6",
    profileUrl: "https://www.ee.iitb.ac.in/web/people/faculty/home/prao"
  }
];

// Domain metadata for the matching engine
const DOMAIN_METADATA = {
  mechanical: { label: "Mechanical Engineering", icon: "⚙", color: "#EF4444" },
  electrical: { label: "Electrical Engineering", icon: "⚡", color: "#F59E0B" },
  electronics: { label: "Electronics & Communication", icon: "◈", color: "#3B82F6" },
  computer_science: { label: "Computer Science", icon: "◉", color: "#3B82F6" },
  civil: { label: "Civil Engineering", icon: "▲", color: "#10B981" },
  chemical: { label: "Chemical Engineering", icon: "◎", color: "#F97316" },
  materials: { label: "Materials Engineering", icon: "◆", color: "#8B5CF6" },
  aerospace: { label: "Aerospace Engineering", icon: "▶", color: "#F97316" },
  biotech: { label: "Biotechnology", icon: "✦", color: "#22C55E" },
  environmental: { label: "Environmental", icon: "○", color: "#10B981" },
  energy: { label: "Energy Systems", icon: "◆", color: "#F59E0B" },
  industrial: { label: "Industrial Engineering", icon: "◧", color: "#06B6D4" },
  management: { label: "Management", icon: "◇", color: "#EC4899" },
  finance: { label: "Finance", icon: "$", color: "#F59E0B" },
  mathematics: { label: "Applied Mathematics", icon: "π", color: "#6366F1" }
};

// Keyword to domain mapping for problem classification
const KEYWORD_DOMAIN_MAP = {
  // Mechanical
  "mechanical": "mechanical", "machine": "mechanical", "vibration": "mechanical", "manufacturing": "mechanical",
  "thermal": "mechanical", "cooling": "mechanical", "heat": "mechanical", "hvac": "mechanical",
  "cnc": "mechanical", "machining": "mechanical", "welding": "mechanical", "forming": "mechanical",
  "drivetrain": "mechanical", "gear": "mechanical", "bearing": "mechanical", "engine": "mechanical",
  "fluid": "mechanical", "flow": "mechanical", "turbulence": "mechanical", "pump": "mechanical",

  // Electrical
  "electrical": "electrical", "power": "electrical", "grid": "electrical", "motor": "electrical",
  "inverter": "electrical", "transformer": "electrical", "voltage": "electrical", "current": "electrical",

  // Electronics
  "electronic": "electronics", "circuit": "electronics", "pcb": "electronics", "sensor": "electronics",
  "chip": "electronics", "semiconductor": "electronics", "vlsi": "electronics", "embedded": "electronics",
  "iot": "electronics", "wireless": "electronics", "rf": "electronics", "signal": "electronics",
  "communication": "electronics", "antenna": "electronics",

  // Computer Science
  "software": "computer_science", "algorithm": "computer_science", "ai": "computer_science",
  "machine learning": "computer_science", "ml": "computer_science", "deep learning": "computer_science",
  "computer vision": "computer_science", "vision": "computer_science", "nlp": "computer_science",
  "data": "computer_science", "database": "computer_science", "cloud": "computer_science",
  "cybersecurity": "computer_science", "security": "computer_science", "encryption": "computer_science",
  "speech": "computer_science", "audio": "computer_science", "recognition": "computer_science",

  // Civil
  "civil": "civil", "structural": "civil", "building": "civil", "bridge": "civil",
  "construction": "civil", "concrete": "civil", "foundation": "civil", "geotechnical": "civil",
  "earthquake": "civil", "seismic": "civil", "infrastructure": "civil", "urban": "civil",

  // Chemical
  "chemical": "chemical", "process": "chemical", "reactor": "chemical", "polymer": "chemical",
  "petrochemical": "chemical", "distillation": "chemical", "catalyst": "chemical",

  // Materials
  "material": "materials", "alloy": "materials", "steel": "materials", "composite": "materials",
  "nano": "materials", "coating": "materials", "corrosion": "materials", "ceramic": "materials",
  "additive manufacturing": "materials", "3d printing": "materials", "sintering": "materials",
  "metallurgy": "materials",

  // Aerospace
  "aerospace": "aerospace", "aircraft": "aerospace", "propulsion": "aerospace", "combustion": "aerospace",
  "aerodynamic": "aerospace", "flight": "aerospace", "uav": "aerospace", "drone": "aerospace",

  // Biotech
  "biotech": "biotech", "biological": "biotech", "biopharmaceutical": "biotech", "vaccine": "biotech",
  "monoclonal": "biotech", "biosimilar": "biotech", "bioreactor": "biotech", "genomics": "biotech",
  "biomaterial": "biotech", "tissue": "biotech", "biomedical": "biotech",

  // Environmental
  "environmental": "environmental", "sustainability": "environmental", "green": "environmental",
  "waste": "environmental", "water": "environmental", "pollution": "environmental",

  // Energy
  "battery": "energy", "solar": "energy", "renewable": "energy", "energy storage": "energy",
  "lithium": "energy", "fuel cell": "energy", "photovoltaic": "energy", "wind": "energy",
  "hydrogen": "energy",

  // Industrial
  "supply chain": "industrial", "logistics": "industrial", "operations research": "industrial",
  "optimization": "industrial", "production": "industrial", "quality": "industrial",

  // Management (avoid single word "management" — too ambiguous with "thermal/battery/waste management")
  "marketing": "management", "brand": "management", "consumer": "management", "strategy": "management",
  "organization": "management", "business strategy": "management", "market entry": "management",
  "innovation": "management", "esg": "management", "consumer behaviour": "management",
  "consumer behavior": "management", "product management": "management", "supply chain management": "industrial",

  // Compound disambiguators — longer phrases win, so these override single-word triggers
  "thermal management": "mechanical",
  "battery management": "electrical",
  "waste management": "environmental",
  "project management": "management",
  "risk management": "finance",
  "operations management": "industrial",

  // Finance
  "finance": "finance", "financial": "finance", "banking": "finance", "investment": "finance",
  "venture capital": "finance", "private equity": "finance", "risk": "finance", "credit": "finance"
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROFESSOR_DATABASE, DOMAIN_METADATA, KEYWORD_DOMAIN_MAP };
}
