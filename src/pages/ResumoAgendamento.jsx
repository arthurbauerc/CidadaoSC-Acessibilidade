import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import { CheckCircleIcon, ClockIcon, ClipboardIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

function Field({ label, value, full }) {
  return (
    <div className={`resumo-field ${full ? 'is-full' : ''}`}>
      <span className="resumo-label">{label}</span>
      <span className="resumo-value">{value}</span>
    </div>
  )
}

function SectionCard({ title, onEdit, editLabel, children }) {
  return (
    <div className="resumo-card">
      <div className="resumo-card-head">
        <h3>{title}</h3>
        <button type="button" className="btn-edit" aria-label={editLabel} title={editLabel} onClick={onEdit}>
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
  const { t } = useLanguage()
  const r = requerente || {}
  const p = posto || {}
  const cpf = r.cpf || t('resumo.cpfNaoInformado')

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CheckCircleIcon size={26} />}
        breadcrumb={t('resumo.breadcrumb')}
        title={t('resumo.title')}
        stepper={<Stepper total={5} current={3} />}
      />

      <div className="flow-body flow-body-wide">
        <div className="resumo-wrap">
          {/* Agendamentos */}
          <SectionCard title={t('resumo.agendamentos')} onEdit={onEditAgendamento} editLabel={t('edit')}>
            <div className="resumo-sub">
              <div className="resumo-sub-head">
                <h4>{t('resumo.requerente')}</h4>
                <span className="chip chip-muted">
                  <ClipboardIcon size={14} />
                  {cpf}
                </span>
              </div>
              <div className="resumo-grid">
                <Field label={t('resumo.nomeCompleto')} value={r.nome} />
                <Field label={t('resumo.nascimento')} value={r.nascimento} />
              </div>
              <div className="resumo-grid">
                <div className="resumo-field">
                  <span className="resumo-label">{t('resumo.data')}</span>
                  <span className="chip chip-muted"><ClockIcon size={14} />{r.data}</span>
                </div>
                <div className="resumo-field">
                  <span className="resumo-label">{t('resumo.horario')}</span>
                  <span className="chip chip-muted"><ClockIcon size={14} />{r.horario}</span>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Dados do requerente */}
          <SectionCard title={t('resumo.dadosRequerente')} onEdit={onEditAgendamento} editLabel={t('edit')}>
            <div className="resumo-grid resumo-grid-3">
              <Field label={t('resumo.cpf')} value={cpf} />
              <Field label={t('resumo.nomeCompleto')} value={r.nome} />
              <Field label={t('resumo.nascimento')} value={r.nascimento} />
            </div>
            <div className="resumo-grid">
              <Field label={t('resumo.email')} value={r.email} />
              <Field label={t('resumo.telefoneCelular')} value={r.telefone} />
            </div>
          </SectionCard>

          {/* Posto de atendimento */}
          <SectionCard title={t('resumo.postoAtendimento')} onEdit={onEditPosto} editLabel={t('edit')}>
            <div className="resumo-grid">
              <Field label={t('resumo.postoAtendimento')} value={`PCI - ${(p.nome || '').toUpperCase()}`} />
              <Field label={t('resumo.endereco')} value={p.enderecoCompleto || p.endereco} />
            </div>
            <div className="resumo-grid">
              <Field label={t('resumo.email')} value={p.email} />
              <Field label={t('resumo.telefone')} value={p.telefone} />
            </div>
          </SectionCard>

          {/* Horário de funcionamento */}
          <SectionCard title={t('resumo.horarioFunc')} onEdit={onEditPosto} editLabel={t('edit')}>
            <span className="chip chip-muted">
              <ClipboardIcon size={14} />
              {p.horario}
            </span>
            <p className="resumo-obs">
              {t('resumo.obs')}{' '}
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
