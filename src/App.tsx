import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import Certificate from './components/Certificate';
import ImageCropper from './components/ImageCropper';

function App() {
  const [staffName, setStaffName] = useState('');
  const [staffPhoto, setStaffPhoto] = useState<string | null>(null);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState<'png' | 'pdf' | null>(null);

  const certificateRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleCropComplete = useCallback((croppedImage: string) => {
    setStaffPhoto(croppedImage);
    setShowCropper(false);
    setRawImage(null);
  }, []);

  const handleCropCancel = useCallback(() => {
    setShowCropper(false);
    setRawImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleGenerate = () => {
    if (!staffName.trim()) { alert('Please enter the staff name.'); return; }
    if (!staffPhoto) { alert('Please upload a staff photo.'); return; }
    setShowCertificate(true);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const captureCanvas = () =>
    html2canvas(certificateRef.current!, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123,
      logging: false,
    });

  const handleDownloadPNG = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true); setDownloadType('png');
    try {
      const canvas = await captureCanvas();
      const link = document.createElement('a');
      link.download = `Certificate_${staffName.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error(err);
      alert('Error generating PNG. Please try again.');
    } finally {
      setIsDownloading(false); setDownloadType(null);
    }
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true); setDownloadType('pdf');
    try {
      const canvas = await captureCanvas();
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`Certificate_${staffName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false); setDownloadType(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #011a17 0%, #022c27 40%, #033d35 70%, #011a17 100%)', fontFamily: "'Lato', sans-serif" }}>

      {/* Cropper Modal */}
      {showCropper && rawImage && (
        <ImageCropper
          imageSrc={rawImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          aspectRatio={3 / 4}
        />
      )}

      {!showCertificate ? (
        /* ════ INPUT FORM ════ */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px' }}>

          {/* Background decoration */}
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Decorative circles */}
            <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)' }}/>
            <div style={{ position:'absolute', bottom:'-100px', left:'-100px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)' }}/>
            <svg style={{ position:'absolute', top:'10%', left:'5%', opacity:0.08 }} width="120" height="120" viewBox="0 0 120 120">
              {[0,45,90,135,180,225,270,315].map(a=>(
                <ellipse key={a} cx="60" cy="20" rx="6" ry="16" fill="#14b8a6" transform={`rotate(${a},60,60)`}/>
              ))}
              <circle cx="60" cy="60" r="12" fill="#0d9488"/>
            </svg>
            <svg style={{ position:'absolute', bottom:'15%', right:'6%', opacity:0.07 }} width="90" height="90" viewBox="0 0 90 90">
              {[0,45,90,135,180,225,270,315].map(a=>(
                <ellipse key={a} cx="45" cy="15" rx="5" ry="12" fill="#14b8a6" transform={`rotate(${a},45,45)`}/>
              ))}
              <circle cx="45" cy="45" r="9" fill="#0d9488"/>
            </svg>
          </div>

          <div style={{
            width: '100%', maxWidth: '480px', position: 'relative',
            animation: 'fadeInUp 0.6s ease-out',
          }}>
            {/* Logo/Icon area */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '70px', height: '70px', borderRadius: '20px',
                background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                boxShadow: '0 8px 32px rgba(13,148,136,0.4)',
                marginBottom: '14px',
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
              </div>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '26px', fontWeight: '800', color: 'white', fontFamily: "'Cinzel', serif", letterSpacing: '1px' }}>
                Certificate Generator
              </h1>
              <p style={{ margin: 0, fontSize: '13px', color: '#5eead4', opacity: 0.85, letterSpacing: '0.5px' }}>
                Maharashtra State Board · Certificate of Appreciation
              </p>
            </div>

            {/* Form Card */}
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(94,234,212,0.15)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}>
              {/* Card top accent */}
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #0d9488, #14b8a6, #5eead4, #14b8a6, #0d9488)' }}/>

              <div style={{ padding: '32px 32px 28px 32px' }}>

                {/* Staff Name */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#5eead4', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Staff Name <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={staffName}
                      onChange={(e) => setStaffName(e.target.value)}
                      placeholder="Enter full name of staff member"
                      style={{
                        width: '100%', padding: '13px 14px 13px 40px', borderRadius: '12px',
                        border: '1.5px solid rgba(94,234,212,0.2)',
                        background: 'rgba(255,255,255,0.05)', color: 'white',
                        fontSize: '15px', outline: 'none', transition: 'all 0.2s',
                        fontFamily: "'Lato', sans-serif", boxSizing: 'border-box',
                      }}
                      onFocus={e => {
                        e.target.style.border = '1.5px solid #14b8a6';
                        e.target.style.background = 'rgba(20,184,166,0.08)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(20,184,166,0.12)';
                      }}
                      onBlur={e => {
                        e.target.style.border = '1.5px solid rgba(94,234,212,0.2)';
                        e.target.style.background = 'rgba(255,255,255,0.05)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Staff Photo */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#5eead4', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Staff Photo <span style={{ color: '#f87171' }}>*</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: `2px dashed ${staffPhoto ? '#14b8a6' : 'rgba(94,234,212,0.25)'}`,
                      borderRadius: '14px',
                      padding: '20px',
                      cursor: 'pointer',
                      background: staffPhoto ? 'rgba(13,148,136,0.08)' : 'rgba(255,255,255,0.02)',
                      transition: 'all 0.25s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.border = '2px dashed #14b8a6';
                      e.currentTarget.style.background = 'rgba(13,148,136,0.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.border = `2px dashed ${staffPhoto ? '#14b8a6' : 'rgba(94,234,212,0.25)'}`;
                      e.currentTarget.style.background = staffPhoto ? 'rgba(13,148,136,0.08)' : 'rgba(255,255,255,0.02)';
                    }}
                  >
                    {staffPhoto ? (
                      <>
                        <img
                          src={staffPhoto}
                          alt="Preview"
                          style={{ width: '64px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #14b8a6', flexShrink: 0 }}
                        />
                        <div>
                          <div style={{ color: '#5eead4', fontWeight: '700', fontSize: '14px', marginBottom: '3px' }}>✓ Photo ready</div>
                          <div style={{ color: '#99f6e4', fontSize: '12px', opacity: 0.75 }}>Click to change photo</div>
                          <div style={{ color: '#99f6e4', fontSize: '11px', opacity: 0.55, marginTop: '2px' }}>You can re-crop after changing</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{
                          width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
                          background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(94,234,212,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
                          </svg>
                        </div>
                        <div>
                          <div style={{ color: 'white', fontWeight: '600', fontSize: '14px', marginBottom: '3px' }}>Upload staff photo</div>
                          <div style={{ color: '#5eead4', fontSize: '12px', opacity: 0.75 }}>JPG, PNG, WEBP · You can crop after selecting</div>
                        </div>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* Date */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: '#5eead4', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Certificate Date
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                      </svg>
                    </div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{
                        width: '100%', padding: '13px 14px 13px 40px', borderRadius: '12px',
                        border: '1.5px solid rgba(94,234,212,0.2)',
                        background: 'rgba(255,255,255,0.05)', color: 'white',
                        fontSize: '15px', outline: 'none', transition: 'all 0.2s',
                        fontFamily: "'Lato', sans-serif", boxSizing: 'border-box',
                        colorScheme: 'dark',
                      }}
                      onFocus={e => {
                        e.target.style.border = '1.5px solid #14b8a6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(20,184,166,0.12)';
                      }}
                      onBlur={e => {
                        e.target.style.border = '1.5px solid rgba(94,234,212,0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  style={{
                    width: '100%', padding: '15px', borderRadius: '14px', border: 'none',
                    background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0d9488 100%)',
                    backgroundSize: '200% auto',
                    color: 'white', fontWeight: '800', fontSize: '16px',
                    cursor: 'pointer', transition: 'all 0.3s',
                    fontFamily: "'Cinzel', serif", letterSpacing: '2px',
                    boxShadow: '0 6px 24px rgba(13,148,136,0.45)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundPosition = 'right center';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 32px rgba(13,148,136,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundPosition = 'left center';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(13,148,136,0.45)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                  </svg>
                  Generate Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ════ CERTIFICATE PREVIEW ════ */
        <div style={{ padding: '28px 16px 48px 16px' }}>
          {/* Top bar */}
          <div style={{
            maxWidth: '860px', margin: '0 auto 20px auto',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
          }}>
            <button
              onClick={() => setShowCertificate(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 18px', borderRadius: '10px',
                border: '1.5px solid rgba(94,234,212,0.25)',
                background: 'rgba(255,255,255,0.05)', color: '#99f6e4',
                fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: "'Lato', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#14b8a6'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(94,234,212,0.25)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
              </svg>
              Back to Form
            </button>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {/* Download PNG */}
              <button
                onClick={handleDownloadPNG}
                disabled={isDownloading}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                  color: 'white', fontWeight: '700', fontSize: '14px',
                  cursor: isDownloading ? 'not-allowed' : 'pointer',
                  opacity: isDownloading && downloadType !== 'png' ? 0.5 : 1,
                  boxShadow: '0 4px 16px rgba(13,148,136,0.4)',
                  transition: 'all 0.2s', fontFamily: "'Lato', sans-serif",
                }}
                onMouseEnter={e => { if(!isDownloading) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(13,148,136,0.55)'; }}}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(13,148,136,0.4)'; }}
              >
                {isDownloading && downloadType === 'png' ? (
                  <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                  </svg>
                )}
                {isDownloading && downloadType === 'png' ? 'Generating…' : 'Download PNG'}
              </button>

              {/* Download PDF */}
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '10px', border: '1.5px solid rgba(94,234,212,0.3)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#99f6e4', fontWeight: '700', fontSize: '14px',
                  cursor: isDownloading ? 'not-allowed' : 'pointer',
                  opacity: isDownloading && downloadType !== 'pdf' ? 0.5 : 1,
                  transition: 'all 0.2s', fontFamily: "'Lato', sans-serif",
                }}
                onMouseEnter={e => { if(!isDownloading) { e.currentTarget.style.background='rgba(13,148,136,0.15)'; e.currentTarget.style.borderColor='#14b8a6'; }}}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(94,234,212,0.3)'; }}
              >
                {isDownloading && downloadType === 'pdf' ? (
                  <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5eead4" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                  </svg>
                )}
                {isDownloading && downloadType === 'pdf' ? 'Generating…' : 'Download PDF'}
              </button>
            </div>
          </div>

          {/* Certificate Preview */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(94,234,212,0.1)',
              borderRadius: '2px',
            }}>
              <Certificate
                ref={certificateRef}
                staffName={staffName}
                staffPhoto={staffPhoto!}
                date={formatDate(date)}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder { color: rgba(153,246,228,0.35) !important; }
      `}</style>
    </div>
  );
}

export default App;
