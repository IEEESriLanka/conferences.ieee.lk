async function renderWorkshops() {
  try {
    const workshops = await fetchJSON('/data/workshops.json');
    const sortedWorkshops = sortByField(workshops, 'year', 'desc');

    const workshopsList = document.getElementById('workshops');
    if (!workshopsList) return;

    workshopsList.innerHTML = sortedWorkshops.map(workshop => `
      <div class="workshop-item">
        <div class="workshop-year">${workshop.year}</div>
        <h3 class="workshop-title">${workshop.title}</h3>

        ${workshop.date ? `
          <div class="workshop-details">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 6px;">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <strong>Date:</strong> ${formatDate(workshop.date)}
          </div>
        ` : ''}

        ${workshop.time ? `
          <div class="workshop-details">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 6px;">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <strong>Time:</strong> ${workshop.time}
          </div>
        ` : ''}

        ${workshop.venue ? `
          <div class="workshop-details">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 6px;">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <strong>Venue:</strong> ${workshop.venue}
          </div>
        ` : ''}

        ${workshop.link ? `
          <div style="margin-top: 16px;">
            <a href="${workshop.link}" class="btn" target="_blank" rel="noopener noreferrer">View Details</a>
          </div>
        ` : ''}
      </div>
    `).join('');

  } catch (error) {
    showError('workshops', 'Content temporarily unavailable. Please try again later.');
  }
}

document.addEventListener('DOMContentLoaded', renderWorkshops);
