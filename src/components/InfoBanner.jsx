export default function InfoBanner({ children, tone = 'default' }) {
  return <div className={`info-banner ${tone === 'blue' ? 'info-banner-blue' : ''}`}>{children}</div>
}
