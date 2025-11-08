const TIMEZONE = 'Asia/Colombo';

function formatDate(dateStr, endDateStr = null) {
  const start = new Date(dateStr + 'T00:00:00');

  if (endDateStr) {
    const end = new Date(endDateStr + 'T00:00:00');
    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = start.toLocaleDateString('en-US', { month: 'short', timeZone: TIMEZONE });
    const year = start.getFullYear();

    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${startDay}–${endDay} ${month} ${year}`;
    }
  }

  return start.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: TIMEZONE
  });
}

function isUpcoming(dateStr) {
  const eventDate = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

function truncateText(text, maxLength = 160) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

function getFormatBadge(eventFormat, isVirtual) {
  if (eventFormat === 'hybrid' || isVirtual === 'Y') {
    return '<span class="badge badge-hybrid">Hybrid</span>';
  } else if (eventFormat === 'virtual') {
    return '<span class="badge badge-virtual">Virtual</span>';
  } else {
    return '<span class="badge badge-inperson">In-Person</span>';
  }
}

function sortByField(array, field, order = 'asc') {
  return [...array].sort((a, b) => {
    let aVal = field.split('.').reduce((obj, key) => obj?.[key], a);
    let bVal = field.split('.').reduce((obj, key) => obj?.[key], b);

    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function showError(containerId, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <strong>Error:</strong> ${message}
      </div>
    `;
  }
}

function showEmptyState(containerId, title, message) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>${title}</h3>
        <p>${message}</p>
      </div>
    `;
  }
}

async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching JSON:', error);
    throw error;
  }
}

function setActiveNavLink() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('nav a');

  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === path || (href !== '/' && path.includes(href))) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);
