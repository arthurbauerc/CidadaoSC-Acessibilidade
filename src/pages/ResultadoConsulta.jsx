import PageHeader from '../components/PageHeader'
import { IdCardIcon } from '../components/Icons'

export default function ResultadoConsulta({
  onBack,
  onAgendamento,
  titulo = 'Indisponível para Emissão Online',
  detalhe = 'Sessão expirada',
}) {
  return (
    <section className="page page-flow">
      <PageHeader
        icon={<IdCardIcon size={24} />}
        breadcrumb="Emissão Online"
        title="Resultado da consulta"
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
            <strong>{titulo}</strong>
            <span>{detalhe}</span>
          </div>
        </div>

        <div className="info-banner result-info">
          <p>
            Será necessário realizar um atendimento presencial, preferencialmente por
            agendamento.
          </p>
          <p>
            <button type="button" className="link-inline" onClick={onAgendamento}>
              Clique aqui
            </button>{' '}
            para ser direcionado ao sistema de agendamento.
          </p>
        </div>

        <button type="button" className="btn-back btn-block" onClick={onBack}>
          Voltar
        </button>
      </div>
    </section>
  )
}
