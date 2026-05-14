import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import GuestbookForm from './GuestbookForm';
import GuestbookList from './GuestbookList';
import ContactInfo from './ContactInfo';
import Toast from './Toast';

/** ContactSection - Home 탭 내 Contact 섹션 전체 컨테이너 */
export default function ContactSection() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [likedIds, setLikedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('guestbook_liked') || '[]');
    } catch {
      return [];
    }
  });
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* 스크롤 진입 fade-up */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    const { data } = await supabase
      .from('guestbook')
      .select('id, name, message, like_count, created_at')
      .eq('is_hidden', false)
      .order('created_at', { ascending: false })
      .limit(20);
    setEntries(data || []);
    setLoading(false);
  }

  async function handleSubmit(formData) {
    const { error } = await supabase.from('guestbook').insert({
      name: formData.name.trim(),
      email: formData.email.trim() || null,
      message: formData.message.trim(),
    });
    if (error) {
      showToast('작성 중 오류가 발생했습니다.', 'error');
      return false;
    }
    showToast('방명록이 등록되었습니다! 🎉', 'success');
    await fetchEntries();
    return true;
  }

  async function handleLike(id) {
    const already = likedIds.includes(id);
    const fn = already ? 'decrement_guestbook_like' : 'increment_guestbook_like';
    await supabase.rpc(fn, { entry_id: id });
    const next = already ? likedIds.filter((x) => x !== id) : [...likedIds, id];
    setLikedIds(next);
    localStorage.setItem('guestbook_liked', JSON.stringify(next));
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, like_count: Math.max((e.like_count || 0) + (already ? -1 : 1), 0) }
          : e
      )
    );
  }

  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div
      ref={sectionRef}
      id="contact-section"
      style={{
        backgroundColor: '#0F172A',
        borderRadius: 12,
        padding: '64px 40px',
        maxWidth: 900,
        margin: '0 auto 24px',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* 섹션 헤더 */}
      <div style={{ marginBottom: 48 }}>
        <span style={{
          display: 'inline-block',
          backgroundColor: '#3B82F6',
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          padding: '2px 10px',
          borderRadius: 12,
          letterSpacing: 1,
          marginBottom: 12,
        }}>
          CONTACT
        </span>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#F8FAFC', margin: '0 0 8px' }}>
          함께 만들어갈 준비가 되어있어요
        </h2>
        <p style={{ color: '#94A3B8', fontSize: 15, margin: 0 }}>
          협업, 프로젝트, 문의를 언제든 환영합니다.
        </p>
      </div>

      {/* 2단 레이아웃 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 32,
      }}>
        {/* 좌측: 연락처 + SNS */}
        <ContactInfo />

        {/* 우측: 방명록 */}
        <div>
          <GuestbookForm onSubmit={handleSubmit} />
          <GuestbookList
            entries={entries}
            loading={loading}
            likedIds={likedIds}
            onLike={handleLike}
          />
        </div>
      </div>
    </div>
  );
}
