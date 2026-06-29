import PageHeader from '../components/PageHeader'
import { SearchIcon, CalendarIcon, IdCardIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

const PROTOCOLO = '0202612542700'

function OpcaoCard({ icon, title, description, onClick }) {
  return (
    <button type="button" className="cancelada-card" onClick={onClick}>
      <div className="cancelada-card-head">
        <span className="cancelada-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </button>
  )
}

export default function SolicitacaoCancelada({ onNovoAgendamento, onEmissao }) {
  const { t } = useLanguage()

  return (
    <section className="page page-flow">
      <PageHeader icon={<SearchIcon size={22} />} title={t('cancelada.title')} />

      <div className="flow-body">
        <div className="info-banner">
          <p>
            {t('cancelada.reserva')}{' '}
            <strong>#{PROTOCOLO}</strong> {t('cancelada.foiCancelada')}
          </p>
          <p>
            {t('cancelada.opcoes')}
          </p>
        </div>

        <div className="cancelada-grid">
          <OpcaoCard
            icon={<CalendarIcon size={22} />}
            title={t('cancelada.novoAg')}
            description={t('cancelada.novoAgDesc')}
            onClick={onNovoAgendamento}
          />
          <OpcaoCard
            icon={<IdCardIcon size={22} />}
            title={t('cancelada.emissao')}
            description={t('cancelada.emissaoDesc')}
            onClick={onEmissao}
          />
        </div>
      </div>
    </section>
  )
}
