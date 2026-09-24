
export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tool {
  id: number;
  slug: string;
  name: string;
  category: string;
  desc: string;
}

export const categories: Category[] = [
  {
    "id": "student",
    "name": "Student / Academic",
    "slug": "student"
  },
  {
    "id": "engineering",
    "name": "Engineering / Electronics",
    "slug": "engineering"
  },
  {
    "id": "math",
    "name": "Math / Science",
    "slug": "math"
  },
  {
    "id": "developer",
    "name": "Developer Tools",
    "slug": "developer"
  },
  {
    "id": "text",
    "name": "Text Tools",
    "slug": "text"
  },
  {
    "id": "file",
    "name": "File / Image Tools",
    "slug": "file"
  },
  {
    "id": "converters",
    "name": "Converters",
    "slug": "converters"
  },
  {
    "id": "finance",
    "name": "Finance & Commerce",
    "slug": "finance"
  },
  {
    "id": "network",
    "name": "Networking & SysAdmin",
    "slug": "network"
  },
  {
    "id": "health",
    "name": "Health & Fitness",
    "slug": "health"
  },
  {
    "id": "time",
    "name": "Time & Date",
    "slug": "time"
  },
  {
    "id": "everyday",
    "name": "Everyday / Productivity",
    "slug": "everyday"
  }
];
export const tools: Tool[] = [
  {
    "id": 158,
    "slug": "ipv4-to-ipv6",
    "name": "IPv4 to IPv6 Converter",
    "category": "network",
    "desc": "Convert an IPv4 address to a mapped IPv6 address."
  },
  {
    "id": 157,
    "slug": "base64-converter",
    "name": "Base64 Converter",
    "category": "network",
    "desc": "Encode and decode text to and from Base64 format."
  },
  {
    "id": 156,
    "slug": "data-unit-converter",
    "name": "Data Unit Converter",
    "category": "network",
    "desc": "Convert between Bits, Bytes, Kilobytes, Megabytes, Gigabytes, etc."
  },
  {
    "id": 155,
    "slug": "chmod-calculator",
    "name": "CHMOD Calculator",
    "category": "network",
    "desc": "Calculate Linux file permissions in octal and symbolic formats."
  },
  {
    "id": 154,
    "slug": "mac-generator",
    "name": "MAC Address Generator",
    "category": "network",
    "desc": "Generate random MAC addresses with custom formatting."
  },
  {
    "id": 153,
    "slug": "bandwidth-calculator",
    "name": "Bandwidth Calculator",
    "category": "network",
    "desc": "Calculate file transfer times based on file size and connection speed."
  },
  {
    "id": 152,
    "slug": "subnet-calculator",
    "name": "Subnet Calculator",
    "category": "network",
    "desc": "Calculate network, broadcast, and host ranges from an IP and CIDR."
  },
  {
    "id": 151,
    "slug": "vat-calculator",
    "name": "VAT / Sales Tax Calculator",
    "category": "finance",
    "desc": "Easily add or extract VAT/Sales Tax from a given amount."
  },
  {
    "id": 150,
    "slug": "inflation-calculator",
    "name": "Inflation Calculator",
    "category": "finance",
    "desc": "Estimate the future or past value of money based on inflation rates."
  },
  {
    "id": 149,
    "slug": "profit-margin",
    "name": "Profit Margin Calculator",
    "category": "finance",
    "desc": "Calculate gross profit, margin percentage, and markup percentage."
  },
  {
    "id": 148,
    "slug": "auto-loan",
    "name": "Auto Loan Calculator",
    "category": "finance",
    "desc": "Calculate monthly car payments, total interest, and loan amortization."
  },
  {
    "id": 147,
    "slug": "discount-calculator",
    "name": "Discount Calculator",
    "category": "finance",
    "desc": "Calculate final price and savings after a percentage discount."
  },
  {
    "id": 146,
    "slug": "tip-calculator",
    "name": "Tip Calculator",
    "category": "finance",
    "desc": "Calculate tip amounts and split bills evenly among friends."
  },
  {
    "id": 145,
    "slug": "roi-calculator",
    "name": "ROI Calculator",
    "category": "finance",
    "desc": "Calculate the Return on Investment and net profit."
  },
  {
    "id": 144,
    "slug": "salary-calculator",
    "name": "Salary Calculator",
    "category": "finance",
    "desc": "Convert salary between hourly, weekly, monthly, and annual rates."
  },
  {
    "id": 143,
    "slug": "mortgage-calculator",
    "name": "Mortgage Calculator",
    "category": "finance",
    "desc": "Calculate monthly mortgage payments, including principal and interest."
  },
  {
    "id": 142,
    "slug": "percentage-change",
    "name": "Percentage Change",
    "category": "math",
    "desc": "Calculate the percentage increase or decrease between two numbers."
  },
  {
    "id": 141,
    "slug": "pythagorean-theorem",
    "name": "Pythagorean Theorem",
    "category": "math",
    "desc": "Solve for the hypotenuse or a missing side of a right triangle."
  },
  {
    "id": 140,
    "slug": "circle-calculator",
    "name": "Circle Calculator",
    "category": "math",
    "desc": "Calculate the area, circumference, and diameter of a circle."
  },
  {
    "id": 139,
    "slug": "triangle-calculator",
    "name": "Right Triangle Calculator",
    "category": "math",
    "desc": "Calculate area, perimeter, hypotenuse, and angles of a right triangle."
  },
  {
    "id": 138,
    "slug": "time-calculator",
    "name": "Time Calculator",
    "category": "time",
    "desc": "Add or subtract hours and minutes to/from a specific time."
  },
  {
    "id": 137,
    "slug": "unix-timestamp",
    "name": "Unix Timestamp Converter",
    "category": "time",
    "desc": "Convert Unix epoch timestamps to human-readable dates and vice versa."
  },
  {
    "id": 136,
    "slug": "business-days",
    "name": "Business Days Calculator",
    "category": "time",
    "desc": "Calculate the number of working days between two dates, excluding weekends."
  },
  {
    "id": 135,
    "slug": "macro-calculator",
    "name": "Macro Calculator",
    "category": "health",
    "desc": "Calculate daily macronutrients (proteins, carbs, fats) based on calorie goals."
  },
  {
    "id": 134,
    "slug": "body-fat-calculator",
    "name": "Body Fat Calculator",
    "category": "health",
    "desc": "Estimate body fat percentage using the US Navy method."
  },
  {
    "id": 133,
    "slug": "one-rep-max",
    "name": "One Rep Max Calculator",
    "category": "health",
    "desc": "Calculate your 1RM for weightlifting using standard formulas."
  },
  {
    "id": 132,
    "slug": "tdee-calculator",
    "name": "TDEE Calculator",
    "category": "health",
    "desc": "Calculate Total Daily Energy Expenditure based on activity level."
  },
  {
    "id": 131,
    "slug": "bmi-calculator",
    "name": "BMI Calculator",
    "category": "health",
    "desc": "Calculate Body Mass Index (BMI) and determine weight category."
  },
  {
    "id": 130,
    "slug": "roof-pitch",
    "name": "Roof Pitch Calculator",
    "category": "engineering",
    "desc": "Calculate roof pitch angle and rafter length."
  },
  {
    "id": 129,
    "slug": "brick-estimator",
    "name": "Brick & Block Estimator",
    "category": "engineering",
    "desc": "Estimate the number of bricks or blocks needed for a wall."
  },
  {
    "id": 128,
    "slug": "column-buckling",
    "name": "Column Buckling Calculator",
    "category": "engineering",
    "desc": "Calculate critical buckling load using Euler's formula."
  },
  {
    "id": 127,
    "slug": "rebar-weight",
    "name": "Rebar Weight Calculator",
    "category": "engineering",
    "desc": "Calculate total weight of steel rebar based on diameter and length."
  },
  {
    "id": 126,
    "slug": "concrete-volume",
    "name": "Concrete Volume Calculator",
    "category": "engineering",
    "desc": "Calculate concrete volume and bags required for a pour."
  },
  {
    "id": 125,
    "slug": "buoyancy-force",
    "name": "Buoyancy Force Calculator",
    "category": "engineering",
    "desc": "Calculate the buoyant force on an object submerged in a fluid."
  },
  {
    "id": 124,
    "slug": "pump-power",
    "name": "Pump Hydraulic Power Calculator",
    "category": "engineering",
    "desc": "Calculate the hydraulic and shaft power required for a fluid pump."
  },
  {
    "id": 123,
    "slug": "heat-conduction",
    "name": "Heat Conduction Calculator",
    "category": "engineering",
    "desc": "Calculate heat transfer rate using Fourier's Law of Conduction."
  },
  {
    "id": 122,
    "slug": "specific-heat-capacity",
    "name": "Specific Heat Capacity Calculator",
    "category": "engineering",
    "desc": "Calculate heat energy (Q = mcΔT) for thermodynamics."
  },
  {
    "id": 121,
    "slug": "ideal-gas-law",
    "name": "Ideal Gas Law Calculator",
    "category": "engineering",
    "desc": "Calculate Pressure, Volume, Moles, or Temperature using PV = nRT."
  },
  {
    "id": 120,
    "slug": "potential-energy",
    "name": "Potential Energy Calculator",
    "category": "engineering",
    "desc": "Calculate gravitational potential energy based on mass and height."
  },
  {
    "id": 119,
    "slug": "kinetic-energy",
    "name": "Kinetic Energy Calculator",
    "category": "engineering",
    "desc": "Calculate the kinetic energy of a moving object."
  },
  {
    "id": 118,
    "slug": "beam-deflection",
    "name": "Cantilever Beam Deflection Calculator",
    "category": "engineering",
    "desc": "Calculate maximum deflection for a cantilever beam with an end load."
  },
  {
    "id": 117,
    "slug": "flow-rate",
    "name": "Pipe Flow Rate Calculator",
    "category": "engineering",
    "desc": "Calculate volumetric flow rate, velocity, or pipe diameter."
  },
  {
    "id": 116,
    "slug": "reynolds-number",
    "name": "Reynolds Number Calculator",
    "category": "engineering",
    "desc": "Calculate Reynolds Number to determine if fluid flow is laminar or turbulent."
  },
  {
    "id": 115,
    "slug": "spring-constant",
    "name": "Spring Constant Calculator",
    "category": "engineering",
    "desc": "Calculate force, spring constant, or displacement (F = kx)."
  },
  {
    "id": 114,
    "slug": "area-moment-inertia",
    "name": "Area Moment of Inertia Calculator",
    "category": "engineering",
    "desc": "Calculate Area Moment of Inertia for standard structural shapes."
  },
  {
    "id": 113,
    "slug": "hookes-law",
    "name": "Hooke's Law Calculator",
    "category": "engineering",
    "desc": "Calculate stress, strain, and Young's Modulus for materials."
  },
  {
    "id": 112,
    "slug": "torque-power",
    "name": "Torque, Power & Speed Calculator",
    "category": "engineering",
    "desc": "Calculate mechanical power (kW/HP), torque, or RPM."
  },
  {
    "id": 111,
    "slug": "gear-ratio",
    "name": "Gear Ratio & RPM Calculator",
    "category": "engineering",
    "desc": "Calculate gear ratio and output RPM for driving and driven gears."
  },
  {
    "id": 110,
    "slug": "antenna-length",
    "name": "Antenna Length Calculator",
    "category": "engineering",
    "desc": "Calculate dipole and monopole antenna lengths based on frequency."
  },
  {
    "id": 109,
    "slug": "wavelength-frequency",
    "name": "Wavelength & Frequency Calculator",
    "category": "engineering",
    "desc": "Convert between wavelength and frequency using the speed of light."
  },
  {
    "id": 108,
    "slug": "rlc-resonance",
    "name": "RLC Resonance Calculator",
    "category": "engineering",
    "desc": "Calculate resonant frequency, Q factor, and bandwidth for RLC circuits."
  },
  {
    "id": 107,
    "slug": "high-pass-filter",
    "name": "High-Pass Filter Calculator",
    "category": "engineering",
    "desc": "Calculate RC and RL high-pass filter cutoff frequencies."
  },
  {
    "id": 106,
    "slug": "low-pass-filter",
    "name": "Low-Pass Filter Calculator",
    "category": "engineering",
    "desc": "Calculate RC and RL low-pass filter cutoff frequencies."
  },
  {
    "id": 105,
    "slug": "coaxial-impedance",
    "name": "Coaxial Cable Impedance Calculator",
    "category": "engineering",
    "desc": "Calculate the characteristic impedance of a coaxial cable."
  },
  {
    "id": 104,
    "slug": "wire-gauge-converter",
    "name": "AWG to Metric Converter",
    "category": "engineering",
    "desc": "Convert American Wire Gauge (AWG) to Metric (mm²)."
  },
  {
    "id": 103,
    "slug": "voltage-drop-calculator",
    "name": "Voltage Drop Calculator",
    "category": "engineering",
    "desc": "Calculate voltage drop over wire length and gauge."
  },
  {
    "id": 102,
    "slug": "pcb-trace-width",
    "name": "PCB Trace Width Calculator",
    "category": "engineering",
    "desc": "Calculate IPC-2221 standard PCB trace width for current capacity."
  },
  {
    "id": 101,
    "slug": "timer-555-calculator",
    "name": "555 Timer Calculator",
    "category": "engineering",
    "desc": "Calculate astable and monostable 555 timer circuit values."
  },
  {
    "id": 1,
    "slug": "cgpa-calculator",
    "name": "CGPA Calculator",
    "category": "student",
    "desc": "Calculate CGPA using semester-wise GPA and credits."
  },
  {
    "id": 2,
    "slug": "gpa-calculator",
    "name": "GPA Calculator",
    "category": "student",
    "desc": "Calculate your semester GPA based on subject grades and credits."
  },
  {
    "id": 3,
    "slug": "percentage-calculator",
    "name": "Percentage Calculator",
    "category": "student",
    "desc": "Calculate percentage of numbers, increase, decrease, and differences."
  },
  {
    "id": 4,
    "slug": "attendance-calculator",
    "name": "Attendance Calculator",
    "category": "student",
    "desc": "Check current attendance and calculate classes required to reach a target."
  },
  {
    "id": 5,
    "slug": "bunk-calculator",
    "name": "Bunk Calculator",
    "category": "student",
    "desc": "Calculate how many classes you can skip while maintaining a target percentage."
  },
  {
    "id": 6,
    "slug": "required-attendance-calculator",
    "name": "Required Attendance Calculator",
    "category": "student",
    "desc": "Calculate classes needed to hit a specific attendance percentage."
  },
  {
    "id": 7,
    "slug": "exam-countdown",
    "name": "Exam Countdown",
    "category": "student",
    "desc": "Live countdown timer to your upcoming exams."
  },
  {
    "id": 8,
    "slug": "study-timer",
    "name": "Study Timer",
    "category": "student",
    "desc": "Pomodoro timer to help you focus during study sessions."
  },
  {
    "id": 9,
    "slug": "semester-planner",
    "name": "Semester Planner",
    "category": "student",
    "desc": "Plan subjects, deadlines, and priorities."
  },
  {
    "id": 10,
    "slug": "grade-calculator",
    "name": "Grade Calculator",
    "category": "student",
    "desc": "Calculate current grade and required final exam score."
  },
  {
    "id": 11,
    "slug": "marks-percentage-calculator",
    "name": "Marks Percentage Calculator",
    "category": "student",
    "desc": "Convert marks to percentages instantly."
  },
  {
    "id": 12,
    "slug": "sgpa-calculator",
    "name": "SGPA Calculator",
    "category": "student",
    "desc": "Calculate your SGPA for the current semester."
  },
  {
    "id": 13,
    "slug": "cgpa-to-percentage",
    "name": "CGPA to Percentage",
    "category": "student",
    "desc": "Convert your CGPA to a percentage."
  },
  {
    "id": 14,
    "slug": "percentage-to-cgpa",
    "name": "Percentage to CGPA",
    "category": "student",
    "desc": "Convert percentage back to a CGPA."
  },
  {
    "id": 15,
    "slug": "age-calculator",
    "name": "Age Calculator",
    "category": "student",
    "desc": "Calculate your exact age in years, months, and days."
  },
  {
    "id": 16,
    "slug": "ohms-law-calculator",
    "name": "Ohm's Law Calculator",
    "category": "engineering",
    "desc": "Calculate voltage, current, resistance and power."
  },
  {
    "id": 17,
    "slug": "resistor-calculator",
    "name": "Resistor Calculator",
    "category": "engineering",
    "desc": "Calculate resistance from voltage and current."
  },
  {
    "id": 18,
    "slug": "resistor-color-code",
    "name": "Resistor Color Code Calculator",
    "category": "engineering",
    "desc": "Decode 4-band, 5-band, and 6-band resistors."
  },
  {
    "id": 19,
    "slug": "series-resistor-calculator",
    "name": "Series Resistor Calculator",
    "category": "engineering",
    "desc": "Calculate equivalent resistance for resistors in series."
  },
  {
    "id": 20,
    "slug": "parallel-resistor-calculator",
    "name": "Parallel Resistor Calculator",
    "category": "engineering",
    "desc": "Calculate equivalent resistance for resistors in parallel."
  },
  {
    "id": 21,
    "slug": "voltage-divider-calculator",
    "name": "Voltage Divider Calculator",
    "category": "engineering",
    "desc": "Calculate output voltage of a resistive divider."
  },
  {
    "id": 22,
    "slug": "current-divider-calculator",
    "name": "Current Divider Calculator",
    "category": "engineering",
    "desc": "Calculate current through parallel branches."
  },
  {
    "id": 23,
    "slug": "led-resistor-calculator",
    "name": "LED Resistor Calculator",
    "category": "engineering",
    "desc": "Find the correct resistor for an LED circuit."
  },
  {
    "id": 24,
    "slug": "power-calculator",
    "name": "Power Calculator",
    "category": "engineering",
    "desc": "Calculate electrical power using V, I, and R."
  },
  {
    "id": 25,
    "slug": "capacitor-calculator",
    "name": "Capacitor Calculator",
    "category": "engineering",
    "desc": "Calculate charge, voltage, and capacitance."
  },
  {
    "id": 26,
    "slug": "capacitor-series-calculator",
    "name": "Capacitor Series Calculator",
    "category": "engineering",
    "desc": "Calculate equivalent capacitance in series."
  },
  {
    "id": 27,
    "slug": "capacitor-parallel-calculator",
    "name": "Capacitor Parallel Calculator",
    "category": "engineering",
    "desc": "Calculate equivalent capacitance in parallel."
  },
  {
    "id": 28,
    "slug": "rc-time-constant",
    "name": "RC Time Constant Calculator",
    "category": "engineering",
    "desc": "Calculate time constant of an RC circuit."
  },
  {
    "id": 29,
    "slug": "rl-time-constant",
    "name": "RL Time Constant Calculator",
    "category": "engineering",
    "desc": "Calculate time constant of an RL circuit."
  },
  {
    "id": 30,
    "slug": "resonant-frequency",
    "name": "Resonant Frequency Calculator",
    "category": "engineering",
    "desc": "Calculate resonance frequency of an LC/RLC circuit."
  },
  {
    "id": 31,
    "slug": "frequency-period",
    "name": "Frequency to Period Calculator",
    "category": "engineering",
    "desc": "Convert frequency to time period."
  },
  {
    "id": 32,
    "slug": "period-frequency",
    "name": "Period to Frequency Calculator",
    "category": "engineering",
    "desc": "Convert time period to frequency."
  },
  {
    "id": 33,
    "slug": "decibel-calculator",
    "name": "Decibel Calculator",
    "category": "engineering",
    "desc": "Calculate decibels for power, voltage, and current ratios."
  },
  {
    "id": 34,
    "slug": "adc-resolution",
    "name": "ADC Resolution Calculator",
    "category": "engineering",
    "desc": "Calculate steps and voltage resolution of an ADC."
  },
  {
    "id": 35,
    "slug": "dac-resolution",
    "name": "DAC Resolution Calculator",
    "category": "engineering",
    "desc": "Calculate DAC resolution and steps."
  },
  {
    "id": 36,
    "slug": "pwm-calculator",
    "name": "PWM Calculator",
    "category": "engineering",
    "desc": "Calculate duty cycle, period, and frequency of a PWM signal."
  },
  {
    "id": 37,
    "slug": "transformer-calculator",
    "name": "Transformer Calculator",
    "category": "engineering",
    "desc": "Calculate voltage and turns ratio of a transformer."
  },
  {
    "id": 38,
    "slug": "battery-runtime",
    "name": "Battery Runtime Calculator",
    "category": "engineering",
    "desc": "Estimate battery life based on capacity and load."
  },
  {
    "id": 39,
    "slug": "opamp-calculator",
    "name": "Op-Amp Calculator",
    "category": "engineering",
    "desc": "Calculate gain and output of inverting and non-inverting op-amps."
  },
  {
    "id": 40,
    "slug": "electrical-unit-converter",
    "name": "Electrical Unit Converter",
    "category": "engineering",
    "desc": "Convert between standard electrical units."
  },
  {
    "id": 41,
    "slug": "scientific-calculator",
    "name": "Scientific Calculator",
    "category": "math",
    "desc": "Advanced browser-based scientific calculator."
  },
  {
    "id": 42,
    "slug": "fraction-calculator",
    "name": "Fraction Calculator",
    "category": "math",
    "desc": "Add, subtract, multiply, and divide fractions."
  },
  {
    "id": 43,
    "slug": "ratio-calculator",
    "name": "Ratio Calculator",
    "category": "math",
    "desc": "Simplify and solve ratios."
  },
  {
    "id": 44,
    "slug": "average-calculator",
    "name": "Average Calculator",
    "category": "math",
    "desc": "Calculate mean, median, and mode."
  },
  {
    "id": 45,
    "slug": "standard-deviation",
    "name": "Standard Deviation Calculator",
    "category": "math",
    "desc": "Calculate population and sample standard deviation."
  },
  {
    "id": 46,
    "slug": "variance-calculator",
    "name": "Variance Calculator",
    "category": "math",
    "desc": "Calculate statistical variance."
  },
  {
    "id": 47,
    "slug": "quadratic-equation",
    "name": "Quadratic Equation Solver",
    "category": "math",
    "desc": "Solve quadratic equations easily."
  },
  {
    "id": 48,
    "slug": "simple-interest",
    "name": "Simple Interest Calculator",
    "category": "math",
    "desc": "Calculate simple interest."
  },
  {
    "id": 49,
    "slug": "compound-interest",
    "name": "Compound Interest Calculator",
    "category": "math",
    "desc": "Calculate compound interest."
  },
  {
    "id": 50,
    "slug": "emi-calculator",
    "name": "EMI Calculator",
    "category": "math",
    "desc": "Calculate equated monthly installments for loans."
  },
  {
    "id": 51,
    "slug": "json-formatter",
    "name": "JSON Formatter",
    "category": "developer",
    "desc": "Format and minify JSON strings."
  },
  {
    "id": 52,
    "slug": "json-validator",
    "name": "JSON Validator",
    "category": "developer",
    "desc": "Validate JSON and find syntax errors."
  },
  {
    "id": 53,
    "slug": "json-to-csv",
    "name": "JSON to CSV Converter",
    "category": "developer",
    "desc": "Convert JSON arrays to CSV format."
  },
  {
    "id": 54,
    "slug": "csv-to-json",
    "name": "CSV to JSON Converter",
    "category": "developer",
    "desc": "Convert CSV data to JSON format."
  },
  {
    "id": 55,
    "slug": "base64-encoder",
    "name": "Base64 Encoder",
    "category": "developer",
    "desc": "Encode text to Base64."
  },
  {
    "id": 56,
    "slug": "base64-decoder",
    "name": "Base64 Decoder",
    "category": "developer",
    "desc": "Decode Base64 to text."
  },
  {
    "id": 57,
    "slug": "url-encoder",
    "name": "URL Encoder",
    "category": "developer",
    "desc": "Encode text for URLs."
  },
  {
    "id": 58,
    "slug": "url-decoder",
    "name": "URL Decoder",
    "category": "developer",
    "desc": "Decode URL-encoded text."
  },
  {
    "id": 59,
    "slug": "jwt-decoder",
    "name": "JWT Decoder",
    "category": "developer",
    "desc": "Decode JSON Web Tokens locally."
  },
  {
    "id": 60,
    "slug": "uuid-generator",
    "name": "UUID Generator",
    "category": "developer",
    "desc": "Generate random UUIDs securely."
  },
  {
    "id": 61,
    "slug": "password-generator",
    "name": "Password Generator",
    "category": "developer",
    "desc": "Generate strong, secure passwords."
  },
  {
    "id": 62,
    "slug": "hash-generator",
    "name": "Hash Generator",
    "category": "developer",
    "desc": "Generate SHA-256 and other cryptographic hashes."
  },
  {
    "id": 63,
    "slug": "timestamp-converter",
    "name": "Timestamp Converter",
    "category": "developer",
    "desc": "Convert Unix timestamps to human-readable dates."
  },
  {
    "id": 64,
    "slug": "regex-tester",
    "name": "Regex Tester",
    "category": "developer",
    "desc": "Test regular expressions against strings."
  },
  {
    "id": 65,
    "slug": "html-encoder",
    "name": "HTML Encoder / Decoder",
    "category": "developer",
    "desc": "Encode and decode HTML entities."
  },
  {
    "id": 66,
    "slug": "markdown-preview",
    "name": "Markdown Previewer",
    "category": "developer",
    "desc": "Preview and test markdown locally."
  },
  {
    "id": 67,
    "slug": "color-converter",
    "name": "Color Converter",
    "category": "developer",
    "desc": "Convert between HEX, RGB, and HSL."
  },
  {
    "id": 68,
    "slug": "css-minifier",
    "name": "CSS Minifier",
    "category": "developer",
    "desc": "Minify CSS code locally."
  },
  {
    "id": 69,
    "slug": "javascript-minifier",
    "name": "JavaScript Minifier",
    "category": "developer",
    "desc": "Minify JavaScript code locally."
  },
  {
    "id": 70,
    "slug": "sql-formatter",
    "name": "SQL Formatter",
    "category": "developer",
    "desc": "Format SQL queries."
  },
  {
    "id": 71,
    "slug": "word-counter",
    "name": "Word Counter",
    "category": "text",
    "desc": "Count words, characters, and sentences."
  },
  {
    "id": 72,
    "slug": "character-counter",
    "name": "Character Counter",
    "category": "text",
    "desc": "Count characters with and without spaces."
  },
  {
    "id": 73,
    "slug": "case-converter",
    "name": "Case Converter",
    "category": "text",
    "desc": "Convert text case (UPPER, lower, Title, etc)."
  },
  {
    "id": 74,
    "slug": "remove-duplicate-lines",
    "name": "Duplicate Line Remover",
    "category": "text",
    "desc": "Remove duplicate lines from text."
  },
  {
    "id": 75,
    "slug": "text-sorter",
    "name": "Text Sorter",
    "category": "text",
    "desc": "Sort lines alphabetically or by length."
  },
  {
    "id": 76,
    "slug": "text-cleaner",
    "name": "Text Cleaner",
    "category": "text",
    "desc": "Remove extra spaces and empty lines."
  },
  {
    "id": 77,
    "slug": "find-replace",
    "name": "Find and Replace",
    "category": "text",
    "desc": "Find and replace text efficiently."
  },
  {
    "id": 78,
    "slug": "text-reverser",
    "name": "Text Reverser",
    "category": "text",
    "desc": "Reverse lines or characters."
  },
  {
    "id": 79,
    "slug": "lorem-ipsum",
    "name": "Lorem Ipsum Generator",
    "category": "text",
    "desc": "Generate placeholder text."
  },
  {
    "id": 80,
    "slug": "reading-time",
    "name": "Reading Time Calculator",
    "category": "text",
    "desc": "Calculate estimated reading time."
  },
  {
    "id": 81,
    "slug": "image-compressor",
    "name": "Image Compressor",
    "category": "file",
    "desc": "Compress JPG and PNG images locally in browser."
  },
  {
    "id": 82,
    "slug": "image-resizer",
    "name": "Image Resizer",
    "category": "file",
    "desc": "Resize images securely."
  },
  {
    "id": 83,
    "slug": "image-cropper",
    "name": "Image Cropper",
    "category": "file",
    "desc": "Crop images using browser canvas."
  },
  {
    "id": 84,
    "slug": "image-converter",
    "name": "Image Format Converter",
    "category": "file",
    "desc": "Convert images to WebP, PNG, or JPG."
  },
  {
    "id": 85,
    "slug": "image-to-base64",
    "name": "Image to Base64",
    "category": "file",
    "desc": "Convert image files to Base64 strings."
  },
  {
    "id": 86,
    "slug": "file-size-converter",
    "name": "File Size Converter",
    "category": "file",
    "desc": "Convert bytes to KB, MB, GB."
  },
  {
    "id": 87,
    "slug": "text-file-generator",
    "name": "Text File Generator",
    "category": "file",
    "desc": "Create and download text files."
  },
  {
    "id": 88,
    "slug": "csv-generator",
    "name": "CSV Generator",
    "category": "file",
    "desc": "Generate dummy CSV files."
  },
  {
    "id": 89,
    "slug": "length-converter",
    "name": "Length Converter",
    "category": "converters",
    "desc": "Convert meters, inches, miles, etc."
  },
  {
    "id": 90,
    "slug": "weight-converter",
    "name": "Weight Converter",
    "category": "converters",
    "desc": "Convert kg, pounds, ounces, etc."
  },
  {
    "id": 91,
    "slug": "temperature-converter",
    "name": "Temperature Converter",
    "category": "converters",
    "desc": "Convert Celsius, Fahrenheit, Kelvin."
  },
  {
    "id": 92,
    "slug": "area-converter",
    "name": "Area Converter",
    "category": "converters",
    "desc": "Convert square meters, acres, etc."
  },
  {
    "id": 93,
    "slug": "volume-converter",
    "name": "Volume Converter",
    "category": "converters",
    "desc": "Convert liters, gallons, etc."
  },
  {
    "id": 94,
    "slug": "speed-converter",
    "name": "Speed Converter",
    "category": "converters",
    "desc": "Convert km/h, mph, m/s, etc."
  },
  {
    "id": 95,
    "slug": "time-converter",
    "name": "Time Converter",
    "category": "converters",
    "desc": "Convert seconds, minutes, hours, days."
  },
  {
    "id": 96,
    "slug": "date-difference",
    "name": "Date Difference Calculator",
    "category": "everyday",
    "desc": "Calculate the exact difference between dates."
  },
  {
    "id": 97,
    "slug": "days-between-dates",
    "name": "Days Between Dates",
    "category": "everyday",
    "desc": "Calculate days between two dates."
  },
  {
    "id": 98,
    "slug": "countdown-timer",
    "name": "Countdown Timer",
    "category": "everyday",
    "desc": "Simple countdown timer utility."
  },
  {
    "id": 99,
    "slug": "stopwatch",
    "name": "Stopwatch",
    "category": "everyday",
    "desc": "Browser-based stopwatch with lap functionality."
  },
  {
    "id": 100,
    "slug": "random-number-generator",
    "name": "Random Number Generator",
    "category": "everyday",
    "desc": "Generate random numbers securely."
  }
];
