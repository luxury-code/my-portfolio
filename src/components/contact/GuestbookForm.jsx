import { useState } from 'react';

const MAX_LENGTH = 500;

const inputStyle = {
  width: '100%',
  backgroundColor: '#0F172A',
  border: '1px solid #334155',
  borderRadius: 8,
  padding: '10px 14px',
  color: '#F8FAFC',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
};

/**
 * GuestbookForm - 방명록 작성 폼
 *
 * Props:
 * @param {function} onSubmit - 폼 제출 핸들러 [Required]
 */
export default function GuestbookForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [focusField, setFocusField] = useState('');

  function getFocusStyle(field) {
    return focusField === field ? { borderColor: '#3B82F6' } : {};
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    const ok = await onSubmit({ name, email, message });
    if (ok) {
      setName('');
      setEmail('');
      setMessage('');
    }
    setSubmitting(false);
  }

  return (
    <div style={{
      backgroundColor: '#1E293B',
      borderRadius: 10,
      padding: '20px',
      border: '1px solid #334155',
      marginBottom: 16,
    }}>
      <h3 style={{ color: '#F8FAFC', fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>
        ✏️ 방명록 남기기
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          placeholder="이름 *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocusField('name')}
          onBlur={() => setFocusField('')}
          required
          maxLength={50}
          style={{ ...inputStyle, ...getFocusStyle('name') }}
        />
        <input
          placeholder="이메일 (선택)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusField('email')}
          onBlur={() => setFocusField('')}
          style={{ ...inputStyle, ...getFocusStyle('email') }}
        />
        <div style={{ position: 'relative' }}>
          <textarea
            placeholder="메시지를 남겨주세요... 😊"
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
            onFocus={() => setFocusField('message')}
            onBlur={() => setFocusField('')}
            required
            rows={4}
            style={{
              ...inputStyle,
              ...getFocusStyle('message'),
              resize: 'vertical',
              minHeight: 90,
              paddingBottom: 28,
            }}
          />
          <span style={{
            position: 'absolute',
            bottom: 8,
            right: 12,
            fontSize: 11,
            color: message.length >= MAX_LENGTH ? '#EF4444' : '#64748B',
          }}>
            {message.length}/{MAX_LENGTH}
          </span>
        </div>

        <button
          type="submit"
          disabled={submitting || !name.trim() || !message.trim()}
          style={{
            padding: '10px',
            backgroundColor: submitting ? '#1D4ED8' : '#3B82F6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            cursor: submitting ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s, transform 0.1s',
            opacity: (!name.trim() || !message.trim()) ? 0.5 : 1,
          }}
          onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {submitting ? '등록 중...' : '방명록 등록하기 →'}
        </button>
      </form>
    </div>
  );
}
