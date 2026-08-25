import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

/** 테이블명 — 포트폴리오 전용 방명록 */
const TABLE_NAME = 'portfolio_guestbook';

/**
 * anon 역할에 조회 권한이 있는 컬럼만 명시적으로 요청한다.
 * (email 원본 컬럼은 권한에서 제외되어 있으므로 select('*') 를 사용하면 안 된다)
 */
const SELECT_COLUMNS = 'id, author_name, message, affiliation, is_email_public, public_email, emoji, created_at';

/** 한 번에 불러올 방명록 개수 */
const PAGE_SIZE = 20;

/**
 * useGuestbook 커스텀 훅
 * Supabase 방명록 테이블의 목록 조회와 새 글 등록을 담당한다.
 *
 * @returns {object} entries, isLoading, isSubmitting, error, submitEntry, refresh
 *
 * Example usage:
 * const { entries, isLoading, submitEntry } = useGuestbook();
 */
export function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  /** 방명록 목록을 최신순으로 불러온다 */
  const refresh = useCallback(async () => {
    setIsLoading(true);

    const { data, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select(SELECT_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE);

    if (fetchError) {
      setError('방명록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setEntries([]);
    } else {
      setError('');
      setEntries(data ?? []);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /**
   * 방명록 새 글을 등록한다.
   *
   * @param {object} form - { authorName, message, affiliation, email, isEmailPublic, emoji }
   * @returns {Promise<boolean>} 등록 성공 여부
   */
  const submitEntry = useCallback(async (form) => {
    setIsSubmitting(true);

    const trimmedEmail = form.email?.trim() ?? '';

    const { error: insertError } = await supabase.from(TABLE_NAME).insert({
      author_name: form.authorName?.trim() || null,
      message: form.message.trim(),
      affiliation: form.affiliation?.trim() || null,
      email: trimmedEmail || null,
      is_email_public: Boolean(trimmedEmail) && form.isEmailPublic,
      emoji: form.emoji,
    });

    setIsSubmitting(false);

    if (insertError) {
      setError('방명록 등록에 실패했습니다. 입력 내용을 확인해 주세요.');
      return false;
    }

    setError('');
    await refresh();
    return true;
  }, [refresh]);

  return { entries, isLoading, isSubmitting, error, submitEntry, refresh };
}
