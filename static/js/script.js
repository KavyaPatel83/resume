// Global variables
let educationCount = 0;
let experienceCount = 0;
let skillCount = 0;

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to corresponding nav link
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add click events to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
    
    // Initialize with some default items
    addEducation();
    addExperience();
    addSkill();
});

// Education functions
function addEducation() {
    educationCount++;
    const container = document.getElementById('education-container');
    const educationItem = document.createElement('div');
    educationItem.className = 'form-item';
    educationItem.id = `education-${educationCount}`;
    
    educationItem.innerHTML = `
        <div class="form-item-header">
            <span class="form-item-title">Education ${educationCount}</span>
            <button type="button" class="btn-remove" onclick="removeEducation(${educationCount})">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Degree</label>
                <input type="text" name="education[${educationCount}][degree]" placeholder="Bachelor of Science">
            </div>
            <div class="form-group">
                <label>School/University</label>
                <input type="text" name="education[${educationCount}][school]" placeholder="University Name">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Year</label>
                <input type="text" name="education[${educationCount}][year]" placeholder="2020-2024">
            </div>
            <div class="form-group">
                <label>GPA (optional)</label>
                <input type="text" name="education[${educationCount}][gpa]" placeholder="3.8">
            </div>
        </div>
    `;
    
    container.appendChild(educationItem);
}

function removeEducation(id) {
    const element = document.getElementById(`education-${id}`);
    if (element) {
        element.remove();
    }
}

// Experience functions
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experience-container');
    const experienceItem = document.createElement('div');
    experienceItem.className = 'form-item';
    experienceItem.id = `experience-${experienceCount}`;
    
    experienceItem.innerHTML = `
        <div class="form-item-header">
            <span class="form-item-title">Experience ${experienceCount}</span>
            <button type="button" class="btn-remove" onclick="removeExperience(${experienceCount})">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" name="experience[${experienceCount}][title]" placeholder="Software Engineer">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" name="experience[${experienceCount}][company]" placeholder="Company Name">
            </div>
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" name="experience[${experienceCount}][duration]" placeholder="Jan 2020 - Present">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="experience[${experienceCount}][description]" rows="3" placeholder="Key responsibilities and achievements..."></textarea>
        </div>
    `;
    
    container.appendChild(experienceItem);
}

function removeExperience(id) {
    const element = document.getElementById(`experience-${id}`);
    if (element) {
        element.remove();
    }
}

// Skills functions
function addSkill() {
    skillCount++;
    const container = document.getElementById('skills-container');
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.id = `skill-${skillCount}`;
    
    skillItem.innerHTML = `
        <input type="text" name="skills[${skillCount}]" placeholder="Enter a skill">
        <button type="button" class="btn-remove" onclick="removeSkill(${skillCount})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(skillItem);
}

function removeSkill(id) {
    const element = document.getElementById(`skill-${id}`);
    if (element) {
        element.remove();
    }
}

// Form data collection
function getResumeFormData() {
    const formData = new FormData(document.getElementById('resume-form'));
    const data = {
        personalInfo: {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            linkedin: formData.get('linkedin')
        },
        targetRole: formData.get('targetRole'),
        education: [],
        experience: [],
        skills: []
    };
    
    // Collect education data
    for (let i = 1; i <= educationCount; i++) {
        const degree = formData.get(`education[${i}][degree]`);
        const school = formData.get(`education[${i}][school]`);
        const year = formData.get(`education[${i}][year]`);
        const gpa = formData.get(`education[${i}][gpa]`);
        
        if (degree || school) {
            data.education.push({ degree, school, year, gpa });
        }
    }
    
    // Collect experience data
    for (let i = 1; i <= experienceCount; i++) {
        const title = formData.get(`experience[${i}][title]`);
        const company = formData.get(`experience[${i}][company]`);
        const duration = formData.get(`experience[${i}][duration]`);
        const description = formData.get(`experience[${i}][description]`);
        
        if (title || company) {
            data.experience.push({ title, company, duration, description });
        }
    }
    
    // Collect skills data
    for (let i = 1; i <= skillCount; i++) {
        const skill = formData.get(`skills[${i}]`);
        if (skill && skill.trim()) {
            data.skills.push(skill.trim());
        }
    }
    
    return data;
}

function getCoverLetterFormData() {
    const formData = new FormData(document.getElementById('cover-letter-form'));
    return {
        personalInfo: {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address')
        },
        jobInfo: {
            company: formData.get('company'),
            position: formData.get('position'),
            hiringManager: formData.get('hiringManager')
        },
        experience: formData.get('experience'),
        skills: formData.get('skills'),
        motivation: formData.get('motivation')
    };
}

// Loading modal functions
function showLoading(text = 'Generating your document...') {
    document.getElementById('loading-text').textContent = text;
    document.getElementById('loading-modal').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading-modal').style.display = 'none';
}

// Resume generation
async function generateResume() {
    const data = getResumeFormData();
    
    if (!data.personalInfo.fullName || !data.personalInfo.email) {
        alert('Please fill in at least your name and email.');
        return;
    }
    
    showLoading('Crafting your professional resume...');
    
    try {
        const response = await fetch('/api/generate-resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate resume');
        }
        
        const result = await response.json();
        document.getElementById('resume-preview').innerHTML = result.resume;
        document.getElementById('download-resume-btn').style.display = 'inline-flex';
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate resume. Please try again.');
    } finally {
        hideLoading();
    }
}

// Cover letter generation
async function generateCoverLetter() {
    const data = getCoverLetterFormData();
    
    if (!data.personalInfo.fullName || !data.personalInfo.email || !data.jobInfo.company || !data.jobInfo.position) {
        alert('Please fill in at least your name, email, company, and position.');
        return;
    }
    
    showLoading('Crafting your personalized cover letter...');
    
    try {
        const response = await fetch('/api/generate-cover-letter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to generate cover letter');
        }
        
        const result = await response.json();
        document.getElementById('cover-letter-preview').innerHTML = result.coverLetter;
        document.getElementById('download-cover-letter-btn').style.display = 'inline-flex';
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate cover letter. Please try again.');
    } finally {
        hideLoading();
    }
}

// PDF generation functions
function downloadResumePDF() {
    const content = document.getElementById('resume-preview').innerHTML;
    const data = getResumeFormData();
    generatePDF(content, `${data.personalInfo.fullName}_Resume`);
}

function downloadCoverLetterPDF() {
    const content = document.getElementById('cover-letter-preview').innerHTML;
    const data = getCoverLetterFormData();
    generatePDF(content, `${data.personalInfo.fullName}_CoverLetter`);
}

function generatePDF(htmlContent, filename) {
    // Create a temporary div to hold the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.width = '210mm';
    tempDiv.style.padding = '20mm';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.lineHeight = '1.4';
    tempDiv.style.color = '#000';
    tempDiv.style.background = '#fff';
    
    // Temporarily add to document
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);
    
    // Create PDF using jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Convert HTML to text and add to PDF
    const content = tempDiv.innerText || tempDiv.textContent || '';
    const lines = content.split('\n');
    
    let yPosition = 20;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 6;
    
    lines.forEach((line) => {
        if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = 20;
        }
        
        if (line.trim() === '') {
            yPosition += lineHeight / 2;
            return;
        }
        
        // Style headers
        if (line === line.toUpperCase() && line.length < 50) {
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
        } else if (yPosition === 20) {
            pdf.setFontSize(18);
            pdf.setFont('helvetica', 'bold');
        } else {
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
        }
        
        const splitLines = pdf.splitTextToSize(line, 170);
        pdf.text(splitLines, margin, yPosition);
        yPosition += splitLines.length * lineHeight;
    });
    
    // Clean up
    document.body.removeChild(tempDiv);
    
    // Download
    pdf.save(`${filename}.pdf`);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc2626';
            isValid = false;
        } else {
            field.style.borderColor = '#e5e7eb';
        }
    });
    
    return isValid;
}

// Auto-save functionality (optional)
function autoSave() {
    const resumeData = getResumeFormData();
    const coverLetterData = getCoverLetterFormData();
    
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    localStorage.setItem('coverLetterData', JSON.stringify(coverLetterData));
}

// Load saved data on page load
function loadSavedData() {
    const savedResumeData = localStorage.getItem('resumeData');
    const savedCoverLetterData = localStorage.getItem('coverLetterData');
    
    if (savedResumeData) {
        // Populate resume form with saved data
        const data = JSON.parse(savedResumeData);
        // Implementation would go here
    }
    
    if (savedCoverLetterData) {
        // Populate cover letter form with saved data
        const data = JSON.parse(savedCoverLetterData);
        // Implementation would go here
    }
}

// Initialize auto-save
setInterval(autoSave, 30000); // Auto-save every 30 seconds