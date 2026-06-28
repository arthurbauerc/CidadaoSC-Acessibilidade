import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import { CheckCircleIcon, ClockIcon, ClipboardIcon } from '../components/Icons'

function Field({ label, value, full }) {
  return (
    <div className={`resumo-field ${full ? 'is-full' : ''}`}>
      <span className="resumo-label">{label}</span>
      <span className="resumo-value">{value}</span>
    </div>
  )
}

function SectionCard({ title, onEdit, children }) {
  return (
    <div className="resumo-card">
      <div className="resumo-card-head">
        <h3>{title}</h3>
        <button type="button" className="btn-edit" aria-label="Editar" title="Editar" onClick={onEdit}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 20h4l10-10-4-4L4 16v4z" />
            <path d="M13.5 6.5l4 4" />
          </svg>
        </button>
      </div>
      {children}
    </div>
  )
}

export default function ResumoAgendamento({ posto, requerente, onBack, onNext, onEditAgendamento, onEditPosto }) {
  const r = requerente || {}
  const p = posto || {}
  const cpf = r.cpf || 'CPF não informado'

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CheckCircleIcon size={26} />}
        breadcrumb="Confirme os dados"
        title="Resumo"
        stepper={<Stepper total={5} current={3} />}
      />

      <div className="flow-body flow-body-wide">
        <div className="resumo-wrap">
          {/* Agendamentos */}
          <SectionCard title="Agendamentos" onEdit={onEditAgendamento}>
            <div className="resumo-sub">
              <div className="resumo-sub-head">
                <h4>Requerente</h4>
                <span className="chip chip-muted">
                  <ClipboardIcon size={14} />
                  {cpf}
                </span>
              </div>
              <div className="resumo-grid">
                <Field label="Nome completo" value={r.nome} />
                <Field label="Data de nascimento" value={r.nascimento} />
              </div>
              <div className="resumo-grid">
                <div className="resumo-field">
                  <span className="resumo-label">Data</span>
                  <span className="chip chip-muted"><ClockIcon size={14} />{r.data}</span>
                </div>
                <div className="resumo-field">
                  <span className="resumo-label">Horário agendado</span>
                  <span className="chip chip-muted"><ClockIcon size={14} />{r.horario}</span>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Dados do requerente */}
          <SectionCard title="Dados do requerente" onEdit={onEditAgendamento}>
            <div className="resumo-grid resumo-grid-3">
              <Field label="CPF" value={cpf} />
              <Field label="Nome completo" value={r.nome} />
              <Field label="Data de nascimento" value={r.nascimento} />
            </div>
            <div className="resumo-grid">
              <Field label="E-mail" value={r.email} />
              <Field label="Telefone celular" value={r.telefone} />
            </div>
          </SectionCard>

          {/* Posto de atendimento */}
          <SectionCard title="Posto de atendimento" onEdit={onEditPosto}>
            <div className="resumo-grid">
              <Field label="Posto de atendimento" value={`PCI - ${(p.nome || '').toUpperCase()}`} />
              <Field label="Endereço" value={p.enderecoCompleto || p.endereco} />
            </div>
            <div className="resumo-grid">
              <Field label="E-mail" value={p.email} />
              <Field label="Telefone" value={p.telefone} />
            </div>
          </SectionCard>

          {/* Horário de funcionamento */}
          <SectionCard title="Horário de funcionamento" onEdit={onEditPosto}>
            <span className="chip chip-muted">
              <ClipboardIcon size={14} />
              {p.horario}
            </span>
            <p className="resumo-obs">
              Obs: Certidão de Nascimento: requerentes nunca casados Certidão de Casamento:
              se é ou já foi casado Outros documentos aceitos, requerentes nascidos no
              exterior, condições de saúde, consulte{' '}
              <a href="https://www.policiacientifica.sc.gov.br/carteira-de-identidade/" target="_blank" rel="noreferrer">
                https://www.policiacientifica.sc.gov.br/carteira-de-identidade/
              </a>
            </p>
          </SectionCard>
        </div>
      </div>

      <Footer onBack={onBack} onNext={onNext} />
    </section>
  )
}
