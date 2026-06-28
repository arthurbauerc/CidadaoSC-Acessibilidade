import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import { CheckCircleIcon, ClockIcon, ClipboardIcon, CalendarInputIcon } from '../components/Icons'

const PROTOCOLO = '0202612550377'

function Field({ label, value }) {
  return (
    <div className="resumo-field">
      <span className="resumo-label">{label}</span>
      <span className="resumo-value">{value}</span>
    </div>
  )
}

export default function AgendamentoConfirmado({ posto, requerente, onHome, onCancelar }) {
  const r = requerente || {}
  const p = posto || {}
  const cpf = r.cpf || 'CPF não informado'

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CheckCircleIcon size={26} />}
        breadcrumb="Novo agendamento"
        title="Agendamento confirmado"
        stepper={<Stepper total={5} current={5} />}
      />

      <div className="flow-body flow-body-wide">
        <div className="resumo-wrap">
          <div className="resumo-card">
            <div className="resumo-card-head"><h3>Agendamentos</h3></div>
            <div className="resumo-sub">
              <div className="resumo-sub-head">
                <h4>Requerente</h4>
                <span className="chip chip-muted"><ClipboardIcon size={14} />{PROTOCOLO}</span>
              </div>
              <div className="resumo-grid">
                <Field label="Nome completo" value={r.nome} />
                <Field label="Data de nascimento" value={r.nascimento} />
              </div>
              <div className="resumo-grid">
                <div className="resumo-field">
                  <span className="resumo-label">Data</span>
                  <span className="chip chip-muted"><CalendarInputIcon size={14} />{r.data}</span>
                </div>
                <div className="resumo-field">
                  <span className="resumo-label">Horário agendado</span>
                  <span className="chip chip-muted"><ClockIcon size={14} />{r.horario}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="resumo-card">
            <div className="resumo-card-head"><h3>Dados do requerente</h3></div>
            <div className="resumo-grid resumo-grid-3">
              <Field label="CPF" value={cpf} />
              <Field label="Nome completo" value={r.nome} />
              <Field label="Data de nascimento" value={r.nascimento} />
            </div>
            <div className="resumo-grid">
              <Field label="E-mail" value={r.email} />
              <Field label="Telefone celular" value={r.telefone} />
            </div>
          </div>

          <div className="resumo-card">
            <div className="resumo-card-head"><h3>Posto de atendimento</h3></div>
            <div className="resumo-grid">
              <Field label="Posto de atendimento" value={`PCI - ${(p.nome || '').toUpperCase()}`} />
              <Field label="Endereço" value={p.enderecoCompleto || p.endereco} />
            </div>
            <div className="resumo-grid">
              <Field label="E-mail" value={p.email} />
              <Field label="Telefone" value={p.telefone} />
            </div>
          </div>

          <div className="resumo-card">
            <div className="resumo-card-head"><h3>Horário de funcionamento</h3></div>
            <span className="chip chip-muted"><ClipboardIcon size={14} />{p.horario}</span>
            <p className="resumo-obs">
              Obs: Certidão de Nascimento: requerentes nunca casados Certidão de Casamento:
              se é ou já foi casado Outros documentos aceitos, requerentes nascidos no
              exterior, condições de saúde, consulte{' '}
              <a href="https://www.policiacientifica.sc.gov.br/carteira-de-identidade/" target="_blank" rel="noreferrer">
                https://www.policiacientifica.sc.gov.br/carteira-de-identidade/
              </a>
            </p>
          </div>
        </div>

        <button type="button" className="btn-blue btn-block">
          Baixar guia de agendamento
        </button>

        <div className="flow-actions-inline">
          <button type="button" className="btn-back" onClick={onHome}>
            Página inicial
          </button>
          <button type="button" className="btn-cancel-outline" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </section>
  )
}
