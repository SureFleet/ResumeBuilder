# Resume Builder (Next.js + React)

Create a resume from a simple form, preview it live, and export as PDF or DOCX.

## Features
- Next.js (App Router) with TypeScript
- Tailwind CSS styling, print-friendly
- React Hook Form + Zod validation
- Export DOCX (docx package)
- Export PDF (@react-pdf/renderer)

## Quick start

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open http://localhost:3000

- Home: basic intro
- /builder: build your resume, export as PDF/DOCX
- /preview: view a sample template

## Export notes
- PDF generation uses @react-pdf/renderer and runs on the server API route.
- DOCX uses the docx package and streams a .docx file.

If PDF text rendering looks off, ensure fonts are available; you can switch to a custom font by registering it in the PDF component.

## Scripts
- dev: start dev server
- build: create production build
- start: start production server
- lint: run ESLint
- typecheck: run TypeScript type checks
- test: run Vitest

## Customize the template
Update `src/components/ResumeView.tsx` for the HTML/print layout and `src/components/ResumePDF.tsx` for the PDF layout. Adjust sections, fonts, and spacing to match your target template.

## License
MIT
# ResumeBuilder
