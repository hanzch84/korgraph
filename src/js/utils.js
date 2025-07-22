// src/js/utils.js
/** QR 코드 생성 */
export function generateQR(sessionId) {
  const url = `${window.location.origin}${window.location.pathname}?mode=submit&session=${sessionId}`;
  QRCode.toCanvas(
    document.getElementById('qrcode'),
    url,
    { width: 150, margin: 2, color: { dark: '#1e293b', light: '#ffffff' } },
    err => err && console.error(err)
  );
}

/** URL 파라미터로 submit 모드 감지 */
export function checkMode() {
  const mode = new URLSearchParams(window.location.search).get('mode');
  if (mode === 'submit') {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('submitPage').classList.add('active');
  }
}
