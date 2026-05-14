import { Link } from 'react-router-dom'
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

const ctaButton = {
  display: 'inline-block',
  marginTop: 20,
  padding: '10px 28px',
  backgroundColor: colors.primary,
  color: colors.secondary,
  fontWeight: 700,
  borderRadius: 4,
  border: 'none',
  cursor: 'pointer',
  fontSize: 15,
  textDecoration: 'none',
  transition: 'background-color 0.15s',
}

const outlineButton = {
  ...ctaButton,
  backgroundColor: 'transparent',
  color: colors.accent,
  border: `1px solid ${colors.accent}`,
  marginLeft: 12,
}

export default function Home() {
  return (
    <main style={pageStyle}>

      {/* ── Hero 섹션 ── */}
      <SectionCard
        tag="HERO"
        bgColor={colors.secondary}
        centered
      >
        <div style={{ color: colors.primary, fontSize: 13, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>
          PORTFOLIO 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: colors.textInverse, marginBottom: 16, lineHeight: 1.3 }}>
          여기는 Hero 섹션입니다.
        </h1>
        <p style={{ color: '#8D9192', fontSize: 15, lineHeight: 1.8, maxWidth: 560, margin: '0 auto 24px' }}>
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
          <br />개발자/디자이너의 첫인상을 결정하는 핵심 공간입니다.
        </p>
        <div>
          <a href="#about-section" style={ctaButton}>소개 보기</a>
          <a href="#contact-section" style={{ ...outlineButton, color: colors.primaryLight, borderColor: colors.primaryLight }}>
            연락하기
          </a>
        </div>
      </SectionCard>

      {/* ── About Me 섹션 ── */}
      <div id="about-section">
        <SectionCard tag="ABOUT ME" title="About Me 섹션">
          <p style={bodyText}>
            여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
            <br /><br />
            개발자로서의 배경, 관심사, 가치관을 간결하게 소개하는 영역입니다.
            방문자가 나를 빠르게 파악할 수 있도록 핵심만 담습니다.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link to="/about" style={ctaButton}>더 알아보기</Link>
          </div>
        </SectionCard>
      </div>

      {/* ── Skill Tree 섹션 ── */}
      <SectionCard tag="SKILLS" title="Skill Tree 섹션">
        <p style={bodyText}>
          여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
        </p>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'React / Frontend', pct: 80 },
            { label: 'Node.js / Backend', pct: 65 },
            { label: 'UI/UX Design', pct: 55 },
          ].map(({ label, pct }) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 14, color: colors.textPrimary, fontWeight: 500 }}>{label}</span>
                <span style={{ fontSize: 13, color: colors.textMuted }}>{pct}%</span>
              </div>
              <div style={{ backgroundColor: colors.border, borderRadius: 4, height: 8 }}>
                <div style={{
                  width: `${pct}%`,
                  height: '100%',
                  backgroundColor: colors.primary,
                  borderRadius: 4,
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ ...bodyText, marginTop: 16, fontSize: 13, color: colors.textMuted }}>
          * 실제 스킬 데이터로 교체 예정
        </p>
      </SectionCard>

      {/* ── Projects 섹션 ── */}
      <SectionCard tag="PROJECTS" title="Projects 섹션">
        <p style={bodyText}>
          여기는 Projects 섹션입니다. 대표작 썸네일 3–4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </p>
        <div style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
        }}>
          {['프로젝트 A', '프로젝트 B', '프로젝트 C'].map((name) => (
            <div key={name} style={{
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: '24px 16px',
              textAlign: 'center',
              backgroundColor: colors.bgPage,
            }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: '50%',
                backgroundColor: colors.bgBanner,
                margin: '0 auto 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: colors.accent, fontWeight: 700, fontSize: 18,
              }}>
                {name[4]}
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary }}>{name}</p>
              <p style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>썸네일 예정</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <Link to="/projects" style={ctaButton}>더 보기</Link>
        </div>
      </SectionCard>

      {/* ── Contact 섹션 ── */}
      <div id="contact-section">
        <SectionCard tag="CONTACT" title="Contact 섹션" bgColor={colors.bgBanner}>
          <p style={bodyText}>
            여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['이메일', 'GitHub', 'LinkedIn'].map((channel) => (
              <span key={channel} style={{
                padding: '8px 20px',
                border: `1px solid ${colors.accent}`,
                borderRadius: 20,
                color: colors.accent,
                fontSize: 14,
                fontWeight: 500,
              }}>
                {channel}
              </span>
            ))}
          </div>
          <p style={{ ...bodyText, marginTop: 20, fontSize: 13, color: colors.textMuted }}>
            * 실제 연락처 및 메시지 폼으로 교체 예정
          </p>
        </SectionCard>
      </div>

    </main>
  )
}
