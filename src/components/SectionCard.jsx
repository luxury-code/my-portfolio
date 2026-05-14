import { colors, shadows } from '../theme'

export default function SectionCard({ title, tag, bgColor, children, centered }) {
  return (
    <section
      style={{
        backgroundColor: bgColor || colors.bgCard,
        borderRadius: 8,
        border: `1px solid ${colors.border}`,
        boxShadow: shadows.card,
        padding: '56px 40px',
        maxWidth: 900,
        margin: '0 auto 24px',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      {tag && (
        <span
          style={{
            display: 'inline-block',
            backgroundColor: colors.primary,
            color: colors.secondary,
            fontSize: 12,
            fontWeight: 700,
            padding: '2px 10px',
            borderRadius: 12,
            marginBottom: 12,
            letterSpacing: 1,
          }}
        >
          {tag}
        </span>
      )}
      {title && (
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: colors.textPrimary,
            marginBottom: 16,
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}
