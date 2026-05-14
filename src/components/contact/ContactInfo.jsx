import { useState } from 'react';

const card = {
  backgroundColor: '#1E293B',
  borderRadius: 10,
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  marginBottom: 12,
  border: '1px solid #334155',
  transition: 'border-color 0.2s',
};

const iconWrap = {
  width: 40,
  height: 40,
  borderRadius: 8,
  backgroundColor: '#0F172A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  flexShrink: 0,
};

const SNS_LINKS = [
  { label: 'GitHub',    emoji: '🐙', url: 'https://github.com/luxury-code' },
  { label: 'LinkedIn',  emoji: '💼', url: '#' },
  { label: 'Instagram', emoji: '📸', url: '#' },
  { label: 'Notion',    emoji: '📝', url: '#' },
  { label: 'Blog',      emoji: '✍️', url: '#' },
];

/** ContactInfo - 좌측 연락처 카드 및 SNS 아이콘 영역 */
export default function ContactInfo() {
  const [copied, setCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText('sbsulsan12@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      {/* 이메일 카드 */}
      <div style={card}>
        <div style={iconWrap}>✉️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginBottom: 2 }}>EMAIL</div>
          <div style={{ fontSize: 14, color: '#F8FAFC', fontWeight: 500 }}>sbsulsan12@gmail.com</div>
        </div>
        <button
          onClick={handleCopyEmail}
          style={{
            padding: '5px 12px',
            backgroundColor: copied ? '#22C55E' : '#3B82F6',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {copied ? '복사됨 ✓' : '복사'}
        </button>
      </div>

      {/* 위치 카드 */}
      <div style={card}>
        <div style={iconWrap}>📍</div>
        <div>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginBottom: 2 }}>LOCATION</div>
          <div style={{ fontSize: 14, color: '#F8FAFC', fontWeight: 500 }}>Seoul, Korea</div>
        </div>
      </div>

      {/* 상태 카드 */}
      <div style={card}>
        <div style={iconWrap}>🟢</div>
        <div>
          <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginBottom: 2 }}>STATUS</div>
          <div style={{ fontSize: 14, color: '#22C55E', fontWeight: 600 }}>현재 협업 가능합니다</div>
        </div>
      </div>

      {/* SNS 아이콘 */}
      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginBottom: 12, letterSpacing: 1 }}>
          SOCIAL
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {SNS_LINKS.map(({ label, emoji, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                textDecoration: 'none',
                transition: 'transform 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.18)';
                e.currentTarget.style.borderColor = '#3B82F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#334155';
              }}
            >
              {emoji}
            </a>
          ))}
        </div>
      </div>

      {/* 한 줄 소개 */}
      <p style={{
        color: '#94A3B8',
        fontSize: 14,
        lineHeight: 1.7,
        borderLeft: '3px solid #3B82F6',
        paddingLeft: 14,
        margin: 0,
      }}>
        사용자 경험을 중시하는 프론트엔드 개발자입니다.
        <br />새로운 도전과 협업을 즐깁니다.
      </p>
    </div>
  );
}
