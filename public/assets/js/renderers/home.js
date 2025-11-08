async function renderHome() {
  try {
    const conferences = await fetchJSON('/data/conferences.json');
    const upcomingConferences = conferences.filter(conf => isUpcoming(conf.startDate));
    const sortedConferences = sortByField(upcomingConferences, 'startDate', 'asc');

    const upcomingList = document.getElementById('upcoming-list');
    if (!upcomingList) return;

    if (sortedConferences.length === 0) {
      showEmptyState('upcoming-list', 'No Upcoming Conferences', 'There are no upcoming conferences available at this time.');
      return;
    }

    upcomingList.innerHTML = sortedConferences.map(conf => `
      <div class="card">
        <h3 class="card-title">${conf.eventTitle}</h3>
        <div class="card-meta">
          <div class="card-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${formatDate(conf.startDate, conf.endDate)}
          </div>
          <div class="card-meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${conf.location.city}, ${conf.location.country}
          </div>
        </div>
        <div class="badge-container">
          ${getFormatBadge(conf.eventFormat, conf.isvirtual)}
        </div>
        <p>${truncateText(conf.about, 160)}</p>
        <a href="${conf.url}" class="btn">View Details</a>
      </div>
    `).join('');

  } catch (error) {
    showError('upcoming-list', 'Content temporarily unavailable. Please try again later.');
  }
}

document.addEventListener('DOMContentLoaded', renderHome);
