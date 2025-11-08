async function renderResources() {
  try {
    const resources = await fetchJSON('/data/resources.json');

    const resourcesList = document.getElementById('resources');
    if (!resourcesList) return;

    resourcesList.innerHTML = resources.map(resource => `
      <div class="resource-item">
        <a href="${resource.url}" target="_blank" rel="noopener noreferrer">${resource.title}</a>
        ${resource.category ? `<span class="resource-category">${resource.category}</span>` : ''}
        ${resource.description ? `<p style="margin-top: 8px; font-size: 14px; color: var(--dark-gray);">${resource.description}</p>` : ''}
      </div>
    `).join('');

  } catch (error) {
    showError('resources', 'Content temporarily unavailable. Please try again later.');
  }
}

document.addEventListener('DOMContentLoaded', renderResources);
