function renderGuidelines() {
  const guidelinesContainer = document.getElementById('guidelines');
  if (!guidelinesContainer) return;

  guidelinesContainer.innerHTML = `
    <div class="guidelines-content">
      <p class="intro">
        The Technical and Financial Co-Sponsorships offered by IEEE Sri Lanka Section foster innovation
        and knowledge sharing across the country. The process includes proposal submission to the Section
        Secretary, formal submission for Technical/Financial Co-Sponsorship, and an MoU phase with appointment
        of Section representatives, participation, and feedback.
      </p>

      <p><strong>Effective Date:</strong> 01-01-2025</p>

      <h2>Technical Co-Sponsorships</h2>
      <p>
        Technical Co-Sponsorships are granted to conferences that meet IEEE quality standards and align
        with the Section's mission to advance technology for humanity. These sponsorships provide recognition
        and support for high-quality technical events.
      </p>

      <h2>Financial Co-Sponsorships</h2>
      <p>
        Financial Co-Sponsorships provide monetary support in addition to technical backing. These are
        awarded to conferences that demonstrate exceptional value to the technical community and require
        additional resources to achieve their goals.
      </p>

      <div class="phase-section">
        <h2>Application and Approval Process</h2>

        <h3>Phase I: Submitting the Conference Proposal</h3>
        <p>
          Conference organizers must submit a comprehensive proposal to the Secretary of IEEE Sri Lanka Section.
          The proposal should include:
        </p>
        <ul>
          <li>Conference objectives and scope</li>
          <li>Target audience and expected participation</li>
          <li>Technical program and topics</li>
          <li>Organizing committee composition</li>
          <li>Budget and financial plan</li>
          <li>Timeline and key milestones</li>
        </ul>

        <h3>Phase II: Formal Submission for Technical/Financial Co-Sponsorship</h3>
        <p>
          After initial approval, organizers must complete the formal IEEE application process through
          the official IEEE conference management system. This includes:
        </p>
        <ul>
          <li>Online application submission via IEEE portal</li>
          <li>Detailed technical program submission</li>
          <li>Publication plan and paper submission guidelines</li>
          <li>Quality assurance measures</li>
          <li>Financial breakdown and sponsorship requirements</li>
        </ul>

        <h3>Phase III: MoU Signing and Conference Execution</h3>
        <p>
          Upon approval, a Memorandum of Understanding (MoU) is signed between the conference organizers
          and IEEE Sri Lanka Section. This phase includes:
        </p>
        <ul>
          <li>Formal MoU signing ceremony</li>
          <li>Appointment of Section representatives to the conference committee</li>
          <li>Regular progress monitoring and reporting</li>
          <li>Active participation of Section representatives in conference execution</li>
          <li>Post-conference feedback and evaluation</li>
          <li>Final report submission and archival</li>
        </ul>
      </div>

      <div style="margin-top: 32px;">
        <a href="https://ieee.lk/wp-content/uploads/2025/01/Guidelines-for-Conference-Technical-Co-Sponsorships-and-Financial-Co-Sponsorships.pdf"
           class="btn"
           target="_blank"
           rel="noopener noreferrer">
          Download Guidelines (PDF)
        </a>
      </div>

      <p style="margin-top: 24px; font-size: 14px; color: var(--dark-gray);">
        <strong>Note:</strong> Conference organizers must submit a comprehensive proposal to the Secretary
        of IEEE Sri Lanka Section before beginning the formal application process.
      </p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', renderGuidelines);
