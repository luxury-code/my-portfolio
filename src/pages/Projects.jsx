import SectionCard from '../components/SectionCard'
import { colors } from '../theme'

const pageStyle = {
  maxWidth: 1100,
  margin: '0 auto',
  padding: '40px 24px 80px',
}

const bodyText = {
  color: colors.textSecondary,
  fontSize: 15,
  lineHeight: 1.8,
}

const placeholderCards = [
  { name: '프로젝트 1', desc: '설명이 들어갈 예정입니다' },
  { name: '프로젝트 2', desc: '설명이 들어갈 예정입니다' },
  { name: '프로젝트 3', desc: '설명이 들어갈 예정입니다' },
  { name: '프로젝트 4', desc: '설명이 들어갈 예정입니다' },
]

export default function Projects() {
  return (
    <main style={pageStyle}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: colors.textPrimary, marginBottom: 8 }}>
          Projects
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 14 }}>
          포트폴리오 작품들이 전시될 공간입니다
        </p>
        <div style={{ width: 48, height: 3, backgroundColor: colors.primary, margin: '16px auto 0' }} />
      </div>

      <SectionCard tag="PROJECTS" title="Projects 페이지">
        <p style={bodyText}>
          Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
        </p>

        <div style={{
          marginTop: 28,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 20,
        }}>
          {placeholderCards.map((project) => (
            <div key={project.name} style={{
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: colors.bgCard,
              boxShadow: '0 2px 5px rgba(15, 17, 17, 0.1)',
            }}>
              <div style={{
                height: 120,
                backgroundColor: colors.bgBanner,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.accent,
                fontSize: 13,
                fontWeight: 500,
              }}>
                썸네일 예정
              </div>
              <div style={{ padding: '16px' }}>
                <p style={{ fontWeight: 700, color: colors.textPrimary, marginBottom: 6 }}>
                  {project.name}
                </p>
                <p style={{ fontSize: 13, color: colors.textMuted }}>{project.desc}</p>
                <div style={{ marginTop: 12 }}>
                  <span style={{
                    fontSize: 12,
                    padding: '4px 10px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: 12,
                    color: colors.textSecondary,
                  }}>
                    태그 예정
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 32,
          padding: 20,
          backgroundColor: colors.bgBanner,
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
        }}>
          <p style={{ color: colors.accent, fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
            준비 중인 콘텐츠
          </p>
          <ul style={{ ...bodyText, paddingLeft: 20, listStyleType: 'disc' }}>
            <li>실제 프로젝트 썸네일 이미지</li>
            <li>프로젝트별 상세 설명 및 기술 스택</li>
            <li>GitHub 링크 및 라이브 데모</li>
            <li>카테고리 필터 기능</li>
          </ul>
        </div>
      </SectionCard>
    </main>
  )
}
