import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import {
  CalendarIcon,
  ClipboardIcon,
  CalendarInputIcon,
  CheckCircleIcon,
  RefreshIcon,
  ClockIcon,
  XCircleIcon,
  PlusIcon,
  MinusIcon,
} from '../components/Icons'
import { useLanguage } from '../i18n'

const PROTOCOLO = '0202612542700'
const DATA_SOLICITACAO = '20/06/2026'

function StatusItem({ icon, tone = 'plain', title, open, onToggle, highlight, children }) {
  return (
    <div className="status-row">
      <div className="status-rail">
        <span className={`status-icon tone-${tone}`}>{icon}</span>
      </div>
      <div className={`status-content ${highlight ? 'is-highlight' : ''}`}>
        <button type="button" className="status-head" onClick={onToggle}>
          <span>{title}</span>
          {open ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
        </button>
        {open && children && <div className="status-body">{children}</div>}
      </div>
    </div>
  )
}

function CancelModal({ onClose, onConfirmar, onAgendamento, t }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal modal-cancel">
        <h2>{t('final.modal.title')}</h2>
        <div className="modal-cancel-body">
          <div className="alert-warn">
            {t('final.modal.warn')}
          </div>

          <button type="button" className="opt-card" onClick={onConfirmar}>
            <div className="opt-card-head">
              <XCircleIcon size={22} />
              <strong>{t('final.modal.simCancelar')}</strong>
            </div>
            <p>
              {t('final.modal.simCancelarDesc')}
            </p>
          </button>

          <button type="button" className="opt-card" onClick={onAgendamento}>
            <div className="opt-card-head">
              <span className="opt-icon-green"><CalendarIcon size={20} /></span>
              <strong>{t('final.modal.agendamento')}</strong>
            </div>
            <p>{t('final.modal.agendamentoDesc')}</p>
          </button>
        </div>
        <div className="modal-cancel-footer">
          <button type="button" className="btn-back btn-block" onClick={onClose}>
            {t('back')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SolicitacaoFinalizada({ onHome, onCancelar, onAgendamento }) {
  const { t } = useLanguage()
  const [openPedido, setOpenPedido] = useState(true)
  const [openPagamento, setOpenPagamento] = useState(true)
  const [tentativa, setTentativa] = useState(2)
  const [taxaDisponivel, setTaxaDisponivel] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Simula o polling da taxa: incrementa tentativas e depois fica "disponível".
  useEffect(() => {
    if (taxaDisponivel) return
    if (tentativa >= 4) {
      const timer = setTimeout(() => setTaxaDisponivel(true), 1200)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setTentativa((n) => n + 1), 1500)
    return () => clearTimeout(timer)
  }, [tentativa, taxaDisponivel])

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CalendarIcon size={24} />}
        breadcrumb={t('final.breadcrumb')}
        title={t('final.title')}
        stepper={<Stepper total={5} current={5} />}
      />

      <div className="flow-body">
        <div className="info-banner">
          <p>
            {t('final.solicitacaoRealizada')}
          </p>
          <p>
            <strong>{t('final.lembreSe')}</strong> {t('final.lembreSeDesc')}
          </p>
        </div>

        <div className="protocolo-row">
          <div className="protocolo-field">
            <span className="resumo-label">{t('final.protocolo')}</span>
            <span className="chip chip-muted"><ClipboardIcon size={14} />{PROTOCOLO}</span>
          </div>
          <div className="protocolo-field">
            <span className="resumo-label">{t('final.dataSolicitacao')}</span>
            <span className="chip chip-muted"><CalendarInputIcon size={14} />{DATA_SOLICITACAO}</span>
          </div>
        </div>

        <div className="status-timeline">
          <StatusItem
            icon={<CheckCircleIcon size={22} />}
            tone="done"
            title={t('final.pedidoRecebido')}
            open={openPedido}
            onToggle={() => setOpenPedido((o) => !o)}
          >
            <p className="status-text">{t('final.pedidoRecebidoDesc')}</p>
            <p className="status-date">{t('final.dataConclusao')} {DATA_SOLICITACAO}</p>
          </StatusItem>

          <StatusItem
            icon={taxaDisponivel ? <ClockIcon size={16} /> : <RefreshIcon size={16} />}
            tone={taxaDisponivel ? 'amber' : 'loading'}
            title={t('final.pagamentoTaxa')}
            open={openPagamento}
            onToggle={() => setOpenPagamento((o) => !o)}
            highlight={taxaDisponivel}
          >
            {taxaDisponivel ? (
              <>
                <p className="status-text">
                  {t('final.taxaDisponivel')}
                </p>
                <p className="status-date">{t('final.dataConclusao')} {DATA_SOLICITACAO}</p>
                <button type="button" className="btn-primary btn-block">
                  {t('final.baixarGuiaPagamento')}
                </button>
              </>
            ) : (
              <>
                <p className="status-text">
                  {t('final.buscandoTaxa')} ({t('final.tentativa')} {tentativa}/10)
                </p>
                <p className="status-date">{t('final.dataConclusao')} {DATA_SOLICITACAO}</p>
              </>
            )}
          </StatusItem>
        </div>

        {taxaDisponivel && (
          <button type="button" className="btn-primary btn-block">
            {t('final.baixarGuiaProtocolo')}
          </button>
        )}

        <div className="info-banner">
          <p>
            {t('final.infoBoleto')}
          </p>
          <p>
            {t('final.acompanhePedido')}
          </p>
          <p>
            <a
              className="link-strong"
              href="https://www.policiacientifica.sc.gov.br/"
              target="_blank"
              rel="noreferrer"
            >
              {t('final.linkConsulta')}
            </a>
          </p>
        </div>

        <div className="flow-actions-inline">
          <button type="button" className="btn-back" onClick={onHome}>
            {t('home')}
          </button>
          <button type="button" className="btn-cancel-outline" onClick={() => setModalOpen(true)}>
            {t('final.cancelar')}
          </button>
        </div>
      </div>

      {modalOpen && (
        <CancelModal
          onClose={() => setModalOpen(false)}
          onConfirmar={onCancelar}
          onAgendamento={onAgendamento}
          t={t}
        />
      )}
    </section>
  )
}
