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

function CancelModal({ onClose, onConfirmar, onAgendamento }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal modal-cancel">
        <h2>Cancelar emissão online</h2>
        <div className="modal-cancel-body">
          <div className="alert-warn">
            Ao prosseguir com o cancelamento, todo o processo em andamento será perdido e
            não poderá ser recuperado.
          </div>

          <button type="button" className="opt-card" onClick={onConfirmar}>
            <div className="opt-card-head">
              <XCircleIcon size={22} />
              <strong>Sim, quero cancelar</strong>
            </div>
            <p>
              Você seguirá com o cancelamento do processo de emissão online da Carteira de
              Identidade Nacional.
            </p>
          </button>

          <button type="button" className="opt-card" onClick={onAgendamento}>
            <div className="opt-card-head">
              <span className="opt-icon-green"><CalendarIcon size={20} /></span>
              <strong>Agendamento presencial</strong>
            </div>
            <p>Agende um atendimento para emissão da Carteira Nacional de Identidade (CIN).</p>
          </button>
        </div>
        <div className="modal-cancel-footer">
          <button type="button" className="btn-back btn-block" onClick={onClose}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SolicitacaoFinalizada({ onHome, onCancelar, onAgendamento }) {
  const [openPedido, setOpenPedido] = useState(true)
  const [openPagamento, setOpenPagamento] = useState(true)
  const [tentativa, setTentativa] = useState(2)
  const [taxaDisponivel, setTaxaDisponivel] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Simula o polling da taxa: incrementa tentativas e depois fica "disponível".
  useEffect(() => {
    if (taxaDisponivel) return
    if (tentativa >= 4) {
      const t = setTimeout(() => setTaxaDisponivel(true), 1200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTentativa((n) => n + 1), 1500)
    return () => clearTimeout(t)
  }, [tentativa, taxaDisponivel])

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CalendarIcon size={24} />}
        breadcrumb="Emissão Online"
        title="Solicitação finalizada"
        stepper={<Stepper total={5} current={6} />}
      />

      <div className="flow-body">
        <div className="info-banner">
          <p>
            Sua solicitação de emissão Online da Carteira de Identidade Nacional foi
            realizada.
          </p>
          <p>
            <strong>Lembre-se:</strong> É necessária a apresentação da guia de solicitação
            para a retirada do documento.
          </p>
        </div>

        <div className="protocolo-row">
          <div className="protocolo-field">
            <span className="resumo-label">Número de protocolo</span>
            <span className="chip chip-muted"><ClipboardIcon size={14} />{PROTOCOLO}</span>
          </div>
          <div className="protocolo-field">
            <span className="resumo-label">Data da solicitação</span>
            <span className="chip chip-muted"><CalendarInputIcon size={14} />{DATA_SOLICITACAO}</span>
          </div>
        </div>

        <div className="status-timeline">
          <StatusItem
            icon={<CheckCircleIcon size={22} />}
            tone="done"
            title="Pedido recebido"
            open={openPedido}
            onToggle={() => setOpenPedido((o) => !o)}
          >
            <p className="status-text">Sua solicitação foi recebida com sucesso.</p>
            <p className="status-date">Data de conclusão {DATA_SOLICITACAO}</p>
          </StatusItem>

          <StatusItem
            icon={taxaDisponivel ? <ClockIcon size={16} /> : <RefreshIcon size={16} />}
            tone={taxaDisponivel ? 'amber' : 'loading'}
            title="Pagamento da taxa"
            open={openPagamento}
            onToggle={() => setOpenPagamento((o) => !o)}
            highlight={taxaDisponivel}
          >
            {taxaDisponivel ? (
              <>
                <p className="status-text">
                  Taxa disponível para pagamento. Clique no link abaixo para realizar o
                  pagamento.
                </p>
                <p className="status-date">Data de conclusão {DATA_SOLICITACAO}</p>
                <button type="button" className="btn-primary btn-block">
                  Baixar guia de pagamento
                </button>
              </>
            ) : (
              <>
                <p className="status-text">
                  Buscando taxa de pagamento... (tentativa {tentativa}/10)
                </p>
                <p className="status-date">Data de conclusão {DATA_SOLICITACAO}</p>
              </>
            )}
          </StatusItem>
        </div>

        {taxaDisponivel && (
          <button type="button" className="btn-primary btn-block">
            Baixar guia de protocolo
          </button>
        )}

        <div className="info-banner">
          <p>
            Você irá baixar o boleto de pagamento para sua solicitação. Lembre-se: a sua
            Carteira de Identidade Nacional somente será impressa após a compensação do
            pagamento, que pode ocorrer em até 3 dias após, mesmo que tenha sido efetuado
            via PIX.
          </p>
          <p>
            Acompanhe seu pedido: o status da sua solicitação de Carteira de Identidade
            Nacional pode ser consultado com o número do protocolo diretamente no site da
            Polícia Científica de Santa Catarina.
          </p>
          <p>
            <a
              className="link-strong"
              href="https://www.policiacientifica.sc.gov.br/"
              target="_blank"
              rel="noreferrer"
            >
              Clique aqui para acessar a consulta de protocolo
            </a>
          </p>
        </div>

        <div className="flow-actions-inline">
          <button type="button" className="btn-back" onClick={onHome}>
            Página inicial
          </button>
          <button type="button" className="btn-cancel-outline" onClick={() => setModalOpen(true)}>
            Cancelar solicitação
          </button>
        </div>
      </div>

      {modalOpen && (
        <CancelModal
          onClose={() => setModalOpen(false)}
          onConfirmar={onCancelar}
          onAgendamento={onAgendamento}
        />
      )}
    </section>
  )
}
