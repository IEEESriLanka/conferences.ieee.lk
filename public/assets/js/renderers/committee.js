async function renderCommittee() {
  try {
    const committee = await fetchJSON('/data/committee.json');

    const committeeContainer = document.getElementById('committee');
    if (!committeeContainer) return;

    committeeContainer.innerHTML = `
      <h2>${committee.year} CQM Committee Members</h2>
      <div class="member-list">
        ${committee.members.map(member => `
          <div class="member-item ${member.role === 'Chair' ? 'chair' : ''}">
            <div class="member-name">${member.name}</div>
            ${member.role ? `<div class="member-role">${member.role}</div>` : ''}
          </div>
        `).join('')}
      </div>
      
      <div class="committee-composition">
        <h2>Conference Quality and Management (CQM) Standing Committee</h2>
        <h3>General Composition</h3>
        <ul>
          ${committee.composition.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;

  } catch (error) {
    showError('committee', 'Content temporarily unavailable. Please try again later.');
  }
}

document.addEventListener('DOMContentLoaded', renderCommittee);
