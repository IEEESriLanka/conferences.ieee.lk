# IEEE Sri Lanka Section - Conferences Website

A static, JSON-driven website for IEEE Sri Lanka Section conferences. The site provides centralized information about Section conferences, co-sponsorship guidelines, workshops, resources, and committee information.

## Features

- **Home Page**: Overview with upcoming conferences and guidelines card
- **Conferences**: Searchable, filterable list of all conferences with pagination
- **Guidelines**: Detailed Technical and Financial Co-Sponsorship guidelines
- **Workshops**: Archive of Conference Quality Management workshops
- **Resources**: Helpful links and tools for conference organizers
- **Committee**: Current committee composition and members
- **Conference Details**: Individual event pages with structured data (JSON-LD)

## Technology Stack

- Vanilla JavaScript (ES6+)
- CSS3 with CSS Variables
- Semantic HTML5
- JSON for data storage
- No frameworks or build dependencies for runtime

## Project Structure

```
/
├── public/
│   ├── index.html              # Home page
│   ├── conferences.html        # All conferences page
│   ├── guidelines.html         # Guidelines page
│   ├── workshops.html          # Workshops page
│   ├── resources.html          # Resources page
│   ├── committee.html          # Committee page
│   ├── conf/
│   │   └── details.html        # Conference detail template
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css      # Main stylesheet
│   │   └── js/
│   │       ├── utils.js        # Utility functions
│   │       └── renderers/
│   │           ├── home.js
│   │           ├── conferences.js
│   │           ├── details.js
│   │           ├── guidelines.js
│   │           ├── workshops.js
│   │           ├── resources.js
│   │           └── committee.js
│   └── data/
│       ├── conferences.json    # Conference data
│       ├── workshops.json      # Workshop data
│       ├── committee.json      # Committee data
│       └── resources.json      # Resource links
└── README.md
```

## Data Files

All content is managed through JSON files in `/public/data/`:

- **conferences.json**: Conference listings with dates, locations, formats
- **workshops.json**: CQM workshop archive
- **committee.json**: Committee composition and members
- **resources.json**: Helpful links for organizers

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

The site is static and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service
- IEEE Sri Lanka Section hosting

### Deployment Steps

1. Build the project: `npm run build`
2. Deploy the `dist/` directory to your hosting service
3. Configure DNS: `conferences.ieee.lk` via CNAME
4. Ensure HTTPS is enabled

### Cache Control

Recommended HTTP cache headers:
- JSON files: `Cache-Control: max-age=300` (5 minutes)
- HTML files: `Cache-Control: no-cache`
- CSS/JS: `Cache-Control: max-age=31536000` (1 year)

## Updating Content

### Adding a New Conference

Edit `/public/data/conferences.json`:

```json
{
  "eventId": 12345,
  "eventTitle": "Conference Name",
  "startDate": "2026-03-15",
  "endDate": "2026-03-16",
  "about": "Description...",
  "location": {
    "city": "Colombo",
    "region": "",
    "country": "Sri Lanka"
  },
  "sponsors": "Sponsor names...",
  "url": "/conf/details.html?id=12345",
  "isvirtual": "N",
  "eventFormat": "in-person"
}
```

### Adding a Workshop

Edit `/public/data/workshops.json`:

```json
{
  "year": 2026,
  "title": "Workshop Title",
  "date": "2026-11-15",
  "time": "08:30–17:30",
  "venue": "Venue Name",
  "link": ""
}
```

### Updating Committee Members

Edit `/public/data/committee.json` to update the year and members list.

### Adding Resources

Edit `/public/data/resources.json`:

```json
{
  "title": "Resource Title",
  "url": "https://example.com",
  "category": "Category",
  "description": "Optional description"
}
```

## Accessibility

The site follows WCAG 2.1 AA standards:
- Semantic HTML landmarks
- Skip-to-content link
- Keyboard navigation support
- Sufficient color contrast
- Screen reader friendly
- Alt text for all meaningful images/icons

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required
- Responsive design for mobile, tablet, desktop

## License

Copyright 2025 IEEE Sri Lanka Section. All rights reserved.

## Contact

For questions or updates, contact the IEEE Sri Lanka Section Secretary.
