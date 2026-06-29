import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import InfoBanner from '../components/InfoBanner'
import { IdCardIcon, CheckCircleIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

export default function AutenticacaoAgendamento({ onBack, onNext }) {
  const { t } = useLanguage()
  const [code, setCode] = useState('')
  const [validado, setValidado] = useState(false)
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const canResend = seconds <= 0

  if (validado) {
    return (
      <section className="page page-flow">
        <PageHeader
          icon={<IdCardIcon size={24} />}
          breadcrumb={t('authAg.breadcrumb')}
          title={t('authAg.title')}
          stepper={<Stepper total={5} current={4} />}
        />
        <div className="flow-body">
          <div className="validado-box">
            <CheckCircleIcon size={56} />
            <div>
              <strong>{t('authAg.validated')}</strong>
              <span>{t('authAg.canProceed')}</span>
            </div>
          </div>
          <Footer onBack={() => setValidado(false)} onNext={onNext} />
        </div>
      </section>
    )
  }

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<IdCardIcon size={24} />}
        breadcrumb={t('authAg.breadcrumb')}
        title={t('authAg.title')}
        stepper={<Stepper total={5} current={4} />}
      />

      <div className="flow-body">
        <InfoBanner>
          {t('authAg.info')}
        </InfoBanner>

        <label className="field">
          <span className="field-label">
            {t('authAg.codeLabel')}<span className="required">*</span>
          </span>
          <input
            type="text"
            className="field-input"
            placeholder={t('authAg.codePlaceholder')}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>

        <button
          type="button"
          className="btn-blue btn-block"
          onClick={() => setValidado(true)}
          disabled={code.trim().length === 0}
        >
          {t('authAg.verify')}
        </button>

        <p className="resend-label">{t('authAg.resendNote')}</p>
        <button
          type="button"
          className="btn-resend"
          disabled={!canResend}
          onClick={() => setSeconds(60)}
        >
          {canResend ? t('authAg.resend') : `${t('authAg.resend')} (${seconds}s)`}
        </button>
      </div>

      <Footer onBack={onBack} nextDisabled />
    </section>
  )
}
