document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
      event.preventDefault();

      const nameElement = document.getElementById('name') as HTMLInputElement;
      const emailElement = document.getElementById('email') as HTMLInputElement;
      const phoneElement = document.getElementById('phone') as HTMLInputElement;
      const educationElement = document.getElementById('education') as HTMLTextAreaElement;
      const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
      const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
      const usernameElement = document.getElementById('username') as HTMLInputElement;

      if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
          const name = nameElement.value;
          const email = emailElement.value;
          const phone = phoneElement.value;
          const education = educationElement.value;
          const experience = experienceElement.value;
          const skills = skillsElement.value;
          const username = usernameElement.value;

          // Create Resume Output
          const resumeOutput = `
              <h2>Resume</h2>
              <p><strong>Name:</strong><span id="edit-name" class="editable">${name}</span></p>
              <p><strong>Email:</strong><span id="edit-email" class="editable"> ${email}</span></p>
              <p><strong>Phone Number:</strong><span id="edit-phone" class="editable"> ${phone}</span></p>

              <h3>Education</h3>
              <p><span id="edit-education" class="editable">${education}</span></p>

              <h3>Experience</h3>
              <p><span id="edit-experience" class="editable">${experience}</span></p>

              <h3>Skills</h3>
              <p><span id="edit-skills" class="editable">${skills}</span></p>
          `;

          // Display Resume
          const resumeOutputElement = document.getElementById('resumeOutput');
          if (resumeOutputElement) {
              resumeOutputElement.innerHTML = resumeOutput;

              // Create download link for HTML
              const htmlDownloadLink = document.createElement('a');
              htmlDownloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
              htmlDownloadLink.download = `${username}_resume.html`;
              htmlDownloadLink.textContent = 'Download Resume';
              resumeOutputElement.appendChild(htmlDownloadLink);

              // Create download link for PDF
              const pdfDownloadLink = document.createElement('a');
              pdfDownloadLink.href = 'javascript:void(0)';
              pdfDownloadLink.textContent = 'Download Resume as PDF';
              pdfDownloadLink.addEventListener('click', function() {
                  // Create a new window with the resume content
                  const printWindow = window.open('', '_blank');
                  if (printWindow) {
                      printWindow.document.open();
                      printWindow.document.write(`
                          <html>
                          <head>
                              <title>${username}'s Resume</title>
                              <style>
                                  ${getPrintStyles()} /* Include print-specific styles */
                              </style>
                          </head>
                          <body>
                              ${resumeOutput}
                          </body>
                          </html>
                      `);
                      printWindow.document.close();
                      printWindow.print(); // Print or save as PDF from the browser's print dialog
                  } else {
                      alert('Failed to open the print window. Please enable pop-ups for this site.');
                  }
              });
              resumeOutputElement.appendChild(pdfDownloadLink);

              // Make elements editable (already defined in script.ts)
              makeEditable();
          }
      } else {
          console.error('One or more form elements are missing');
      }
  });
});

function makeEditable() {
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach(element => {
      element.addEventListener('click', function() {
          const currentElement = element as HTMLElement;
          const currentValue = currentElement.textContent || "";

          if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
              const input = document.createElement('input');
              input.type = 'text';
              input.value = currentValue;
              input.classList.add('editing-input');

              input.addEventListener('blur', function() {
                  currentElement.textContent = input.value;
                  currentElement.style.display = 'inline';
                  input.remove();
              });

              currentElement.style.display = 'none';
              currentElement.parentNode?.insertBefore(input, currentElement);
              input.focus();
          }
      });
  });
}

function getPrintStyles() {
  // Define print-specific CSS styles here
  return `
      body {
          font-family: 'Times New Roman', Times, serif;
          margin: 20px;
          padding: 0;
      }

      h2, h3 {
          color: #2c3e50;
      }

      .editable {
          text-decoration: underline;
          cursor: default;
      }
  `;
}
