let allConferences = [];
let filteredConferences = [];
let currentPage = 1;
const itemsPerPage = 10;

let filters = {
  search: '',
  country: '',
  format: '',
  sort: 'startDate'
};

async function loadConferences() {
  try {
    allConferences = await fetchJSON('/data/conferences.json');
    applyFilters();
  } catch (error) {
    showError('conf-list', 'Content temporarily unavailable. Please try again later.');
  }
}

function applyFilters() {
  filteredConferences = allConferences.filter(conf => {
    const matchesSearch = !filters.search ||
      conf.eventTitle.toLowerCase().includes(filters.search.toLowerCase()) ||
      (conf.about && conf.about.toLowerCase().includes(filters.search.toLowerCase()));

    const matchesCountry = !filters.country || conf.location.country === filters.country;

    const matchesFormat = !filters.format ||
      (filters.format === 'hybrid' && (conf.eventFormat === 'hybrid' || conf.isvirtual === 'Y')) ||
      (filters.format === 'virtual' && conf.eventFormat === 'virtual') ||
      (filters.format === 'in-person' && conf.eventFormat === 'in-person' && conf.isvirtual !== 'Y');

    return matchesSearch && matchesCountry && matchesFormat;
  });

  if (filters.sort === 'startDate') {
    filteredConferences = sortByField(filteredConferences, 'startDate', 'asc');
  } else if (filters.sort === 'title') {
    filteredConferences = sortByField(filteredConferences, 'eventTitle', 'asc');
  } else if (filters.sort === 'city') {
    filteredConferences = sortByField(filteredConferences, 'location.city', 'asc');
  }

  currentPage = 1;
  renderConferences();
  renderPagination();
}

function renderConferences() {
  const confList = document.getElementById('conf-list');
  if (!confList) return;

  if (filteredConferences.length === 0) {
    showEmptyState('conf-list', 'No Conferences Found', 'Try adjusting your search or filter criteria.');
    return;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageConferences = filteredConferences.slice(startIndex, endIndex);

  confList.innerHTML = pageConferences.map(conf => `
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
}

function renderPagination() {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;

  const totalPages = Math.ceil(filteredConferences.length / itemsPerPage);

  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  let pagesHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    pagesHTML += `
      <button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">
        ${i}
      </button>
    `;
  }

  pagination.innerHTML = `
    <button id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    ${pagesHTML}
    <button id="next-page" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;

  document.getElementById('prev-page')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderConferences();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  document.getElementById('next-page')?.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderConferences();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  document.querySelectorAll('.page-number').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentPage = parseInt(e.target.dataset.page);
      renderConferences();
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function setupFilters() {
  document.getElementById('search-input')?.addEventListener('input', (e) => {
    filters.search = e.target.value;
    applyFilters();
  });

  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    filters.sort = e.target.value;
    applyFilters();
  });

  document.querySelectorAll('.chip[data-filter="country"]').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.chip[data-filter="country"]').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      filters.country = e.target.dataset.value;
      applyFilters();
    });
  });

  document.querySelectorAll('.chip[data-filter="format"]').forEach(chip => {
    chip.addEventListener('click', (e) => {
      document.querySelectorAll('.chip[data-filter="format"]').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      filters.format = e.target.dataset.value;
      applyFilters();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadConferences();
  setupFilters();
});
