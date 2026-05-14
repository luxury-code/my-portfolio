import { NavLink } from 'react-router-dom'
import { colors } from '../theme'

const navStyle = {
  backgroundColor: colors.secondary,
  boxShadow: '0 4px 11px rgba(15, 17, 17, 0.2)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
}

const innerStyle = {
  maxWidth: 1100,
  margin: '0 auto',
  padding: '0 24px',
  display: 'flex',
  alignItems: 'center',
  height: 56,
  gap: 8,
}

const logoStyle = {
  color: colors.primary,
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: '-0.5px',
  marginRight: 'auto',
  cursor: 'default',
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? colors.primary : colors.textInverse,
        padding: '6px 16px',
        borderRadius: 4,
        fontWeight: isActive ? 600 : 400,
        fontSize: 15,
        border: isActive ? `1px solid ${colors.primary}` : '1px solid transparent',
        transition: 'all 0.15s',
      })}
    >
      {children}
    </NavLink>
  )
}

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        <span style={logoStyle}>My Portfolio</span>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About Me</NavItem>
        <NavItem to="/projects">Projects</NavItem>
      </div>
    </nav>
  )
}
