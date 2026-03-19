// English certificate content
const englishContent = {
    headerLine1: "M. S. Board Of Secondary And Higher Secondary Education,",
    headerLine2: "Mumbai Divisional Board, Vashi, Navi Mumbai-400 703.",
    certTitle: "CERTIFICATE OF APPRECIATION",
    presentedTo: "Proudly Presented To",
    recognitionText: "This certificate is presented in recognition of your valuable contribution and dedicated efforts in the successful conduct of the Secondary School Certificate Examination, February-March 2026, organized by the Maharashtra State Board of Secondary and Higher Secondary Education. Your diligence, discipline, and commitment are highly commendable.",
    dateLabel: "Date",
    principalTitle: "Chief Conductor",
    staffNameLabel: "Staff Member's Full Name *",
    schoolName: "St. Agrasen High School & Jr. College<br>Kalwa East Thane 400605",
    centreNumber: "Centre No. 6118"
};

function applyEnglishContent() {
    document.getElementById('headerLine1').textContent = englishContent.headerLine1;
    document.getElementById('headerLine2').textContent = englishContent.headerLine2;
    document.getElementById('certTitle').textContent = englishContent.certTitle;
    document.getElementById('certTitle').setAttribute('data-lang', 'english');
    document.getElementById('presentedTo').textContent = englishContent.presentedTo;
    document.getElementById('presentedTo').setAttribute('data-lang', 'english');
    document.getElementById('recognitionText').innerHTML = englishContent.recognitionText;
    document.getElementById('dateLabel').textContent = englishContent.dateLabel;
    document.getElementById('principalTitle').textContent = englishContent.principalTitle;
    document.getElementById('staffNameLabel').textContent = englishContent.staffNameLabel;
    document.getElementById('certStaffName').setAttribute('data-lang', 'english');

    const schoolInfoDiv = document.getElementById('schoolInfo');
    schoolInfoDiv.setAttribute('data-lang', 'english');
    const centreNumberDiv = document.getElementById('centreNumber');
    const schoolNameDiv = document.getElementById('schoolName');
    if (centreNumberDiv) {
        centreNumberDiv.innerHTML = englishContent.centreNumber;
    }
    if (schoolNameDiv) {
        schoolNameDiv.innerHTML = englishContent.schoolName;
    }
}

        // Set today's date as default
        document.getElementById('dateIssued').valueAsDate = new Date();

        // Photo upload handler
        document.getElementById('staffPhotoInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.getElementById('staffPhotoPreview');
                    preview.src = event.target.result;
                    preview.classList.add('show');
                    // Also update the certificate header photo
                    document.getElementById('staffPhoto').src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Handle form submission
        document.getElementById('certificateForm').addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const staffName = document.getElementById('staffName').value;
            const dateIssued = document.getElementById('dateIssued').value;
            const principalName = document.getElementById('principalName').value;

            // Populate certificate fields - keep name in English
            document.getElementById('certStaffName').textContent = staffName;

            // Format date
            const dateObj = new Date(dateIssued);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            document.getElementById('certDate').textContent = formattedDate;

            // Set principal name
            if (principalName) {
                document.getElementById('certPrincipalName').textContent = principalName;
            }

            // Keep certificate content in English only
            applyEnglishContent();

            // Show certificate, hide form
            document.getElementById('formSection').style.display = 'none';
            document.getElementById('certificateWrapper').classList.add('active');

            // Scroll to certificate
            document.getElementById('certificateWrapper').scrollIntoView({ behavior: 'smooth' });
        });

        function goBack() {
            document.getElementById('formSection').style.display = 'block';
            document.getElementById('certificateWrapper').classList.remove('active');
            document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
        }

        function printCertificate() {
            // Check if device is mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // For mobile devices, always download PDF
                downloadCertificate();
            } else {
                // For desktop, open print dialog
                window.print();
            }
        }

        function downloadCertificate() {
            const staffName = document.getElementById('certStaffName').textContent;
            const sanitizedName = staffName.replace(/[^a-zA-Z0-9\s]/g, '').trim();
            const fileName = `Certificate_${sanitizedName}_${new Date().getTime()}.pdf`;
            
            const certificateElement = document.getElementById('certificate');
            
            // Generate A4 landscape PDF (297mm x 210mm / 29.7cm x 21cm)
            const options = {
                margin: [0, 0, 0, 0],
                filename: fileName,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 3,
                    useCORS: true,
                    logging: false,
                    windowWidth: 1600,
                    windowHeight: 1200
                },
                jsPDF: {
                    orientation: 'landscape',
                    unit: 'mm',
                    format: 'a4',
                    compress: true
                }
            };
            
            // Create a clone to avoid affecting the original
            const clonedElement = certificateElement.cloneNode(true);
            clonedElement.classList.add('pdf-export');

            // Mount clone offscreen so CSS/layout is fully applied before capture
            const exportHost = document.createElement('div');
            exportHost.style.position = 'fixed';
            exportHost.style.left = '-10000px';
            exportHost.style.top = '0';
            exportHost.style.width = '297mm';
            exportHost.style.height = '210mm';
            exportHost.style.overflow = 'hidden';
            exportHost.appendChild(clonedElement);
            document.body.appendChild(exportHost);
            
            // Generate PDF and download
            html2pdf().set(options).from(clonedElement).outputPdf('blob').then(function(pdf) {
                // Create a blob URL
                const blobUrl = URL.createObjectURL(pdf);
                
                // Create a temporary link element
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = fileName;
                
                // Trigger download
                document.body.appendChild(link);
                link.click();
                
                // Cleanup
                setTimeout(function() {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(blobUrl);
                    document.body.removeChild(exportHost);
                }, 100);
            }).catch(function(error) {
                console.error('PDF generation error:', error);
                if (document.body.contains(exportHost)) {
                    document.body.removeChild(exportHost);
                }
                // Fallback to print if PDF generation fails
                alert('Download failed. Opening print dialog instead.');
                window.print();
            });
        }

        // Keyboard shortcut for printing (Ctrl+P within certificate view)
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'p' && document.getElementById('certificateWrapper').classList.contains('active')) {
                e.preventDefault();
                printCertificate();
            }
        });

// Ensure English content is active on initial load
applyEnglishContent();
    
