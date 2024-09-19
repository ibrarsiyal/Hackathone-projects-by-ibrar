document.addEventListener('DOMContentLoaded', function () {
    var _a;
    (_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        event.preventDefault();
        var nameElement = document.getElementById('name');
        var emailElement = document.getElementById('email');
        var phoneElement = document.getElementById('phone');
        var educationElement = document.getElementById('education');
        var experienceElement = document.getElementById('experience');
        var skillsElement = document.getElementById('skills');
        var usernameElement = document.getElementById('username');
        if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
            var name_1 = nameElement.value;
            var email = emailElement.value;
            var phone = phoneElement.value;
            var education = educationElement.value;
            var experience = experienceElement.value;
            var skills = skillsElement.value;
            var username_1 = usernameElement.value;
            // Create Resume Output
            var resumeOutput_1 = "\n              <h2>Resume</h2>\n              <p><strong>Name:</strong><span id=\"edit-name\" class=\"editable\">".concat(name_1, "</span></p>\n              <p><strong>Email:</strong><span id=\"edit-email\" class=\"editable\"> ").concat(email, "</span></p>\n              <p><strong>Phone Number:</strong><span id=\"edit-phone\" class=\"editable\"> ").concat(phone, "</span></p>\n\n              <h3>Education</h3>\n              <p><span id=\"edit-education\" class=\"editable\">").concat(education, "</span></p>\n\n              <h3>Experience</h3>\n              <p><span id=\"edit-experience\" class=\"editable\">").concat(experience, "</span></p>\n\n              <h3>Skills</h3>\n              <p><span id=\"edit-skills\" class=\"editable\">").concat(skills, "</span></p>\n          ");
            // Display Resume
            var resumeOutputElement = document.getElementById('resumeOutput');
            if (resumeOutputElement) {
                resumeOutputElement.innerHTML = resumeOutput_1;
                // Create download link for HTML
                var htmlDownloadLink = document.createElement('a');
                htmlDownloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput_1);
                htmlDownloadLink.download = "".concat(username_1, "_resume.html");
                htmlDownloadLink.textContent = 'Download Resume';
                resumeOutputElement.appendChild(htmlDownloadLink);
                // Create download link for PDF
                var pdfDownloadLink = document.createElement('a');
                pdfDownloadLink.href = 'javascript:void(0)';
                pdfDownloadLink.textContent = 'Download Resume as PDF';
                pdfDownloadLink.addEventListener('click', function () {
                    // Create a new window with the resume content
                    var printWindow = window.open('', '_blank');
                    if (printWindow) {
                        printWindow.document.open();
                        printWindow.document.write("\n                          <html>\n                          <head>\n                              <title>".concat(username_1, "'s Resume</title>\n                              <style>\n                                  ").concat(getPrintStyles(), " /* Include print-specific styles */\n                              </style>\n                          </head>\n                          <body>\n                              ").concat(resumeOutput_1, "\n                          </body>\n                          </html>\n                      "));
                        printWindow.document.close();
                        printWindow.print(); // Print or save as PDF from the browser's print dialog
                    }
                    else {
                        alert('Failed to open the print window. Please enable pop-ups for this site.');
                    }
                });
                resumeOutputElement.appendChild(pdfDownloadLink);
                // Make elements editable (already defined in script.ts)
                makeEditable();
            }
        }
        else {
            console.error('One or more form elements are missing');
        }
    });
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
function getPrintStyles() {
    // Define print-specific CSS styles here
    return "\n      body {\n          font-family: 'Times New Roman', Times, serif;\n          margin: 20px;\n          padding: 0;\n      }\n\n      h2, h3 {\n          color: #2c3e50;\n      }\n\n      .editable {\n          text-decoration: underline;\n          cursor: default;\n      }\n  ";
}
