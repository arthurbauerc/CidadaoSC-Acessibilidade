import { useLanguage } from '../i18n'

export default function Footer({ onBack, onNext, backLabel, nextLabel, nextDisabled = false }) {
  const { t } = useLanguage()
  return (
    <div className="flow-footer">
      <button type="button" className="btn-back" onClick={onBack}>
        {backLabel || t('back')}
      </button>
      <button
        type="button"
        className="btn-next"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel || t('next')}
      </button>
    </div>
  )
}
