import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'
import InfoBanner from '../components/InfoBanner'
import { SearchIcon, CheckCircleIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

function ConfirmModal({ loading, onVoltar, onConfirmar, t }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal modal-confirm">
        <h2>{t('cancelarEm.modalTitle')}</h2>
        <div className="modal-confirm-body">
          <div className="alert-warn">
            {t('cancelarEm.modalWarn')}
          </div>
          <div className="modal-confirm-actions">
            <button type="button" className="btn-back" onClick={onVoltar} disabled={loading}>
              {loading ? <span className="spinner-inline">{t('loading')}</span> : t('back')}
            </button>
            <button type="button" className="btn-next" onClick={onConfirmar} disabled={loading}>
              {loading ? <span className="spinner-inline">{t('loading')}</span> : t('confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CancelarEmissao({ onBack, onNext }) {
  const { t } = useLanguage()
  const [code, setCode] = useState('')
  const [validado, setValidado] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => onNext?.(), 1400)
    return () => clearTimeout(timer)
  }, [loading, onNext])

  const canResend = seconds <= 0

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<SearchIcon size={22} />}
        breadcrumb={t('cancelarEm.breadcrumb')}
        title={t('cancelarEm.title')}
      />

      {validado ? (
        <div className="flow-body">
          <div className="validado-box">
            <CheckCircleIcon size={56} />
            <div>
              <strong>{t('cancelarEm.validated')}</strong>
              <span>{t('cancelarEm.canProceed')}</span>
            </div>
          </div>
          <Footer onBack={() => setValidado(false)} onNext={() => setConfirmOpen(true)} />
          {confirmOpen && (
            <ConfirmModal
              loading={loading}
              onVoltar={() => setConfirmOpen(false)}
              onConfirmar={() => setLoading(true)}
              t={t}
            />
          )}
        </div>
      ) : (
        <div className="flow-body">
          <InfoBanner tone="blue">
            {t('cancelarEm.codeInfo')}
          </InfoBanner>

          <label className="field">
            <span className="field-label">
              {t('cancelarEm.codeLabel')}<span className="required">*</span>
            </span>
            <input
              type="text"
              className="field-input"
              placeholder={t('cancelarEm.codePlaceholder')}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="btn-slate btn-block"
            onClick={() => setValidado(true)}
            disabled={code.trim().length === 0}
          >
            {t('verify')}
          </button>

          <p className="resend-label">{t('cancelarEm.resendHint')}</p>
          <button
            type="button"
            className="btn-outline-block"
            disabled={!canResend}
            onClick={() => setSeconds(60)}
          >
            {canResend ? t('cancelarEm.resend') : `${t('cancelarEm.resend')} (${seconds}s)`}
          </button>

          <Footer onBack={onBack} nextDisabled />
        </div>
      )}
    </section>
  )
}
