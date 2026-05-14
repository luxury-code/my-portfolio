/**
 * Toast - 알림 메시지 컴포넌트
 *
 * Props:
 * @param {string} message - 표시할 메시지 [Required]
 * @param {string} type    - 'success' | 'error' [Optional, 기본값: 'success']
 */
export default function Toast({ message, type = 'success' }) {
  const isSuccess = type === 'success';
  return (
    <div style={{
      position: 'fixed',
      bottom: 32,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: isSuccess ? '#166534' : '#7F1D1D',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 600,
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      zIndex: 9999,
      animation: 'fadeInUp 0.3s ease',
      whiteSpace: 'nowrap',
    }}>
      {message}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
