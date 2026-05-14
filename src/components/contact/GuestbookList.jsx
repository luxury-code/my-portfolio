/**
 * GuestbookList - 방명록 목록
 *
 * Props:
 * @param {Array}    entries   - 방명록 항목 배열 [Required]
 * @param {boolean}  loading   - 로딩 여부 [Required]
 * @param {Array}    likedIds  - 이미 좋아요한 항목 id 배열 [Required]
 * @param {function} onLike    - 좋아요 토글 핸들러 [Required]
 */
export default function GuestbookList({ entries, loading, likedIds, onLike }) {
  function formatTime(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = now - d;
    const min = Math.floor(diff / 60000);
    const hr = Math.floor(diff / 3600000);
    const day = Math.floor(diff / 86400000);
    if (min < 1) return '방금 전';
    if (min < 60) return `${min}분 전`;
    if (hr < 24) return `${hr}시간 전`;
    if (day < 7) return `${day}일 전`;
    return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0', color: '#64748B', fontSize: 14 }}>
        불러오는 중...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '24px',
        color: '#64748B',
        fontSize: 14,
        backgroundColor: '#1E293B',
        borderRadius: 10,
        border: '1px solid #334155',
      }}>
        아직 방명록이 없습니다. 첫 번째 메시지를 남겨보세요! 👋
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>
        GUESTBOOK · {entries.length}개
      </div>
      {entries.map((entry) => {
        const isLiked = likedIds.includes(entry.id);
        return (
          <div
            key={entry.id}
            style={{
              backgroundColor: '#1E293B',
              borderRadius: 10,
              padding: '14px 16px',
              border: '1px solid #334155',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* 아바타 */}
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: '#3B82F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {entry.name[0]?.toUpperCase()}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>{entry.name}</span>
              </div>
              <span style={{ fontSize: 11, color: '#64748B' }}>{formatTime(entry.created_at)}</span>
            </div>

            <p style={{
              fontSize: 14,
              color: '#CBD5E1',
              lineHeight: 1.6,
              margin: '0 0 10px',
              wordBreak: 'break-word',
            }}>
              {entry.message}
            </p>

            {/* 좋아요 버튼 */}
            <button
              onClick={() => onLike(entry.id)}
              style={{
                backgroundColor: isLiked ? '#1E3A5F' : 'transparent',
                border: `1px solid ${isLiked ? '#3B82F6' : '#334155'}`,
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 12,
                color: isLiked ? '#93C5FD' : '#64748B',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {isLiked ? '❤️' : '🤍'} {entry.like_count || 0}
            </button>
          </div>
        );
      })}
    </div>
  );
}
