import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import { CheckCircleIcon, ClockIcon, ClipboardIcon, CalendarInputIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

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
  const { t } = useLanguage()
  const r = requerente || {}
  const p = posto || {}
  const cpf = r.cpf || t('resumo.cpfNaoInformado')

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CheckCircleIcon size={26} />}
        breadcrumb={t('agConf.breadcrumb')}
        title={t('agConf.title')}
        stepper={<Stepper total={5} current={5} />}
      />

      <div className="flow-body flow-body-wide">
        <div className="resumo-wrap">
          <div className="resumo-card">
            <div className="resumo-card-head"><h3>{t('resumo.agendamentos')}</h3></div>
            <div className="resumo-sub">
              <div className="resumo-sub-head">
                <h4>{t('resumo.requerente')}</h4>
                <span className="chip chip-muted"><ClipboardIcon size={14} />{PROTOCOLO}</span>
              </div>
              <div className="resumo-grid">
                <Field label={t('resumo.nomeCompleto')} value={r.nome} />
                <Field label={t('resumo.nascimento')} value={r.nascimento} />
              </div>
              <div className="resumo-grid">
                <div className="resumo-field">
                  <span className="resumo-label">{t('resumo.data')}</span>
                  <span className="chip chip-muted"><CalendarInputIcon size={14} />{r.data}</span>
                </div>
                <div className="resumo-field">
                  <span className="resumo-label">{t('resumo.horario')}</span>
                  <span className="chip chip-muted"><ClockIcon size={14} />{r.horario}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="resumo-card">
            <div className="resumo-card-head"><h3>{t('resumo.dadosRequerente')}</h3></div>
            <div className="resumo-grid resumo-grid-3">
              <Field label={t('resumo.cpf')} value={cpf} />
              <Field label={t('resumo.nomeCompleto')} value={r.nome} />
              <Field label={t('resumo.nascimento')} value={r.nascimento} />
            </div>
            <div className="resumo-grid">
              <Field label={t('resumo.email')} value={r.email} />
              <Field label={t('resumo.telefoneCelular')} value={r.telefone} />
            </div>
          </div>

          <div className="resumo-card">
            <div className="resumo-card-head"><h3>{t('resumo.postoAtendimento')}</h3></div>
            <div className="resumo-grid">
              <Field label={t('resumo.postoAtendimento')} value={`PCI - ${(p.nome || '').toUpperCase()}`} />
              <Field label={t('resumo.endereco')} value={p.enderecoCompleto || p.endereco} />
            </div>
            <div className="resumo-grid">
              <Field label={t('resumo.email')} value={p.email} />
              <Field label={t('resumo.telefone')} value={p.telefone} />
            </div>
          </div>

          <div className="resumo-card">
            <div className="resumo-card-head"><h3>{t('resumo.horarioFunc')}</h3></div>
            <span className="chip chip-muted"><ClipboardIcon size={14} />{p.horario}</span>
            <p className="resumo-obs">
              {t('resumo.obs')}{' '}
              <a href="https://www.policiacientifica.sc.gov.br/carteira-de-identidade/" target="_blank" rel="noreferrer">
                https://www.policiacientifica.sc.gov.br/carteira-de-identidade/
              </a>
            </p>
          </div>
        </div>

        <button type="button" className="btn-blue btn-block">
          {t('agConf.baixarGuia')}
        </button>

        <div className="flow-actions-inline">
          <button type="button" className="btn-back" onClick={onHome}>
            {t('home')}
          </button>
          <button type="button" className="btn-cancel-outline" onClick={onCancelar}>
            {t('cancel')}
          </button>
        </div>
      </div>
    </section>
  )
}
