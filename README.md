# The Admission Bridge

A modern web application that helps students find and apply to universities worldwide based on their budget, academic qualifications, and preferences.

[Live_Project](https://admission-bridge-nine.vercel.app/)

## Features

- **University Search**: Browse universities with advanced filtering options
- **Budget-Based Filtering**: Find universities within your tuition fee budget
- **Academic Matching**: Filter by GPA and IELTS requirements
- **Country & Degree Filtering**: Search by specific countries and degree levels
- **University Comparison**: Compare up to 3 universities side-by-side
- **Direct Application**: Apply to universities directly through the platform
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 16.1.1, React 19.2.3
- **Styling**: Tailwind CSS 4, DaisyUI 5.5.14
- **Animations**: Framer Motion 12.23.26
- **Icons**: React Icons 5.5.0
- **Database**: PostgreSQL with pg driver
- **Deployment**: Vercel

### Installation

1. Clone the repository:

```bash
git clone <https://github.com/Shajidaa/admission-bridge>
cd admission_brige
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your database configuration:

```env
DATABASE_URL=your_postgresql_connection_string
```

4. Set up the database:
   Create the required tables in your PostgreSQL database:

```sql
-- Universities table
CREATE TABLE universities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  degree_level VARCHAR(100) NOT NULL,
  tuition_fee INTEGER NOT NULL,
  min_gpa DECIMAL(3,2) NOT NULL,
  min_ielts DECIMAL(3,1) NOT NULL
);

-- Applications table
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  university_id INTEGER REFERENCES universities(id),
  student_name VARCHAR(255) NOT NULL,
  student_email VARCHAR(255) NOT NULL,
  student_gpa DECIMAL(3,2) NOT NULL,
  student_ielts DECIMAL(3,1) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── apply/
│   │   │   └── route.js          # Application submission API
│   │   └── universities/
│   │       └── route.js          # University search API
│   ├── components/
│   │   ├── ApplyModals.jsx       # Application modal component
│   │   ├── Card.jsx              # University card component
│   │   ├── CompareModal.jsx      # University comparison modal
│   │   ├── Footer.jsx            # Footer component
│   │   └── Hero.jsx              # Hero section with search
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Home page
└── lib/
    └── db.js                     # Database connection
```

## API Endpoints

### GET /api/universities

Fetch universities with optional filtering parameters:

- `budget`: Maximum tuition fee (default: 50000)
- `country`: Filter by country
- `degree`: Filter by degree level

## License

This project is private and proprietary.
