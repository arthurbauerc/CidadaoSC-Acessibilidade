import PageHeader from '../components/PageHeader'
import { SearchIcon, CalendarIcon, IdCardIcon } from '../components/Icons'

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
  return (
    <section className="page page-flow">
      <PageHeader icon={<SearchIcon size={22} />} title="Solicitação cancelada" />

      <div className="flow-body">
        <div className="info-banner">
          <p>
            Sua reserva de horário para atendimento no Protocolo{' '}
            <strong>#{PROTOCOLO}</strong> foi cancelada.
          </p>
          <p>
            Caso deseje reagendar para um novo momento ou utilizar os serviços de emissão de
            forma online, confira as opções abaixo:
          </p>
        </div>

        <div className="cancelada-grid">
          <OpcaoCard
            icon={<CalendarIcon size={22} />}
            title="Novo agendamento presencial"
            description="Agende um atendimento para emissão da Carteira Nacional de Identidade (CIN)"
            onClick={onNovoAgendamento}
          />
          <OpcaoCard
            icon={<IdCardIcon size={22} />}
            title="Emissão online"
            description="Peça sua nova Carteira de Identidade Nacional (CIN)"
            onClick={onEmissao}
          />
        </div>
      </div>
    </section>
  )
}
