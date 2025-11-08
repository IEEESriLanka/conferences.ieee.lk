async function renderDetails() {
  const eventId = parseInt(getQueryParam('id'));

  if (!eventId) {
    showError('conf-details', 'Invalid conference ID.');
    return;
  }

  try {
    const conferences = await fetchJSON('/data/conferences.json');
    const conference = conferences.find(conf => conf.eventId === eventId);

    if (!conference) {
      showError('conf-details', 'Conference not found.');
      return;
    }

    const detailsContainer = document.getElementById('conf-details');
    if (!detailsContainer) return;

    detailsContainer.innerHTML = `
      <div class="card">
        <h1>${conference.eventTitle}</h1>

        <div class="card-meta">
          <div class="card-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${formatDate(conference.startDate, conference.endDate)}
          </div>
          <div class="card-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${conference.location.city}${conference.location.region ? ', ' + conference.location.region : ''}, ${conference.location.country}
          </div>
        </div>

        <div class="badge-container">
          ${getFormatBadge(conference.eventFormat, conference.isvirtual)}
        </div>

        <h2>About</h2>
        <p>${conference.about}</p>

        ${conference.sponsors ? `
          <h2>Sponsors</h2>
          <p>${conference.sponsors}</p>
        ` : ''}
      </div>
    `;

    injectStructuredData(conference);
    document.title = `${conference.eventTitle} - IEEE Sri Lanka Section`;

  } catch (error) {
    showError('conf-details', 'Content temporarily unavailable. Please try again later.');
  }
}

function injectStructuredData(conference) {
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  let attendanceMode = 'https://schema.org/OfflineEventAttendanceMode';
  if (conference.eventFormat === 'virtual') {
    attendanceMode = 'https://schema.org/OnlineEventAttendanceMode';
  } else if (conference.eventFormat === 'hybrid' || conference.isvirtual === 'Y') {
    attendanceMode = 'https://schema.org/MixedEventAttendanceMode';
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": conference.eventTitle,
    "startDate": conference.startDate,
    "endDate": conference.endDate,
    "eventAttendanceMode": attendanceMode,
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": `${conference.location.city}, ${conference.location.country}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": conference.location.city,
        "addressCountry": conference.location.country
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "IEEE Sri Lanka Section"
    },
    "url": `https://conferences.ieee.lk/conf/details.html?id=${conference.eventId}`,
    "description": conference.about
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', renderDetails);
