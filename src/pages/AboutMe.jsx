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

export default function AboutMe() {
  return (
    <main style={pageStyle}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: colors.textPrimary, marginBottom: 8 }}>
          About Me
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 14 }}>
          개발자를 소개하는 페이지입니다
        </p>
        <div style={{ width: 48, height: 3, backgroundColor: colors.primary, margin: '16px auto 0' }} />
      </div>

      <SectionCard tag="ABOUT" title="About Me 페이지">
        <p style={bodyText}>
          About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.
          <br /><br />
          이 페이지에는 개발자의 배경, 경력, 학력, 관심사, 개발 철학 등
          더욱 깊은 자기소개 내용이 포함될 예정입니다.
        </p>
        <div style={{
          marginTop: 32,
          padding: 24,
          backgroundColor: colors.bgBanner,
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
        }}>
          <p style={{ color: colors.accent, fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
            준비 중인 콘텐츠
          </p>
          <ul style={{ ...bodyText, paddingLeft: 20, listStyleType: 'disc' }}>
            <li>상세 자기소개 및 개발 스토리</li>
            <li>경력 및 학력 타임라인</li>
            <li>기술 스택 상세 설명</li>
            <li>관심 분야 및 개발 철학</li>
          </ul>
        </div>
      </SectionCard>
    </main>
  )
}
