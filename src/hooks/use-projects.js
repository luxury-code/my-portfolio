import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

/** 테이블명 — 포트폴리오 Projects 탭 전용 */
const TABLE_NAME = 'portfolio_projects';

/** anon 역할에 조회 권한이 있는 컬럼만 명시적으로 요청한다 */
const SELECT_COLUMNS = 'id, title, description, tech_stack, detail_url, github_url, thumbnail_url, sort_order, created_at';

/**
 * useProjects 커스텀 훅
 * Supabase 에서 게시된 프로젝트 목록을 표시 순서대로 불러온다.
 *
 * @returns {object} projects, isLoading, error, refresh
 *
 * Example usage:
 * const { projects, isLoading, error, refresh } = useProjects();
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  /** 게시된 프로젝트를 sort_order 오름차순으로 불러온다 */
  const refresh = useCallback(async () => {
    setIsLoading(true);

    const { data, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select(SELECT_COLUMNS)
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true });

    if (fetchError) {
      setError('프로젝트 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      setProjects([]);
    } else {
      setError('');
      setProjects(data ?? []);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { projects, isLoading, error, refresh };
}
