import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import InfoBanner from '../components/InfoBanner'
import { CalendarIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

export default function AutenticacaoCodigo({ onBack, onNext }) {
  const { t } = useLanguage()
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const canResend = seconds <= 0

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CalendarIcon size={24} />}
        breadcrumb={t('codigo.breadcrumb')}
        title={t('codigo.title')}
        stepper={<Stepper total={5} current={2} />}
      />

      <div className="flow-body">
        <InfoBanner>
          {t('codigo.info')}
        </InfoBanner>

        <label className="field">
          <span className="field-label">
            {t('codigo.label')}<span className="required">*</span>
          </span>
          <input
            type="text"
            className="field-input"
            placeholder={t('codigo.placeholder')}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>

        <button
          type="button"
          className="btn-primary btn-block"
          onClick={() => onNext?.({ code })}
          disabled={code.trim().length === 0}
        >
          {t('verify')}
        </button>

        <p className="resend-label">{t('codigo.noCode')}</p>
        <button
          type="button"
          className="btn-resend"
          disabled={!canResend}
          onClick={() => setSeconds(60)}
        >
          {canResend ? t('codigo.resend') : `${t('codigo.resend')} (${seconds}s)`}
        </button>
      </div>

      <Footer onBack={onBack} nextDisabled />
    </section>
  )
}
