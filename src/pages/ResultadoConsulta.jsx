import PageHeader from '../components/PageHeader'
import { IdCardIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

export default function ResultadoConsulta({
  onBack,
  onAgendamento,
  titulo,
  detalhe,
}) {
  const { t } = useLanguage()

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<IdCardIcon size={24} />}
        breadcrumb={t('resultado.breadcrumb')}
        title={t('resultado.title')}
      />

      <div className="flow-body">
        <div className="result-error">
          <span className="result-error-icon" aria-hidden>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <circle cx="12" cy="12" r="11" fill="#e53935" />
              <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <div className="result-error-text">
            <strong>{titulo || t('resultado.unavailable')}</strong>
            <span>{detalhe || t('resultado.expired')}</span>
          </div>
        </div>

        <div className="info-banner result-info">
          <p>
            {t('resultado.needPresential')}
          </p>
          <p>
            <button type="button" className="link-inline" onClick={onAgendamento}>
              {t('resultado.clickHere')}
            </button>{' '}
            {t('resultado.redirectSchedule')}
          </p>
        </div>

        <button type="button" className="btn-back btn-block" onClick={onBack}>
          {t('back')}
        </button>
      </div>
    </section>
  )
}
