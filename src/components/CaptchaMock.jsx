import { useLanguage } from '../i18n'

export default function CaptchaMock({ checked, onChange }) {
  const { t } = useLanguage()
  return (
    <div className="captcha-mock">
      <label className="captcha-row">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span>{t('captcha.notRobot')}</span>
        <span className="captcha-brand">
          <span className="captcha-brand-icon" aria-hidden>
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M12 4a8 8 0 0 1 7.4 4.9l-2 .9A6 6 0 0 0 6.2 11l-1.9-.5A8 8 0 0 1 12 4z" fill="#1c3aa9" />
              <path d="M4 12a8 8 0 0 1 .3-2.5l1.9.5A6 6 0 0 0 12 18l-.5 2A8 8 0 0 1 4 12z" fill="#4285f4" />
              <path d="M20 12a8 8 0 0 1-8 8l.5-2A6 6 0 0 0 18 11l2 1z" fill="#fbbc05" />
            </svg>
          </span>
          <span className="captcha-brand-text">
            <strong>reCAPTCHA</strong>
            <small>{t('captcha.privacy')}</small>
          </span>
        </span>
      </label>
      <p className="captcha-quota">
        {t('captcha.quota')} <a href="#">{t('captcha.quotaLink')}</a> {t('captcha.quotaSuffix')}
      </p>
    </div>
  )
}
