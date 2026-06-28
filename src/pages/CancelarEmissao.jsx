import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'
import InfoBanner from '../components/InfoBanner'
import { SearchIcon, CheckCircleIcon } from '../components/Icons'

function ConfirmModal({ loading, onVoltar, onConfirmar }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal modal-confirm">
        <h2>Cancelamento</h2>
        <div className="modal-confirm-body">
          <div className="alert-warn">
            Você está prestes a cancelar o processo de emissão online da sua Carteira de
            Identidade Nacional. Deseja seguir com o cancelamento?
          </div>
          <div className="modal-confirm-actions">
            <button type="button" className="btn-back" onClick={onVoltar} disabled={loading}>
              {loading ? <span className="spinner-inline">Carregando...</span> : 'Voltar'}
            </button>
            <button type="button" className="btn-next" onClick={onConfirmar} disabled={loading}>
              {loading ? <span className="spinner-inline">Carregando...</span> : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CancelarEmissao({ onBack, onNext }) {
  const [code, setCode] = useState('')
  const [validado, setValidado] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => onNext?.(), 1400)
    return () => clearTimeout(t)
  }, [loading, onNext])

  const canResend = seconds <= 0

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<SearchIcon size={22} />}
        breadcrumb="Emissão Online"
        title="Cancelar emissão"
      />

      {validado ? (
        <div className="flow-body">
          <div className="validado-box">
            <CheckCircleIcon size={56} />
            <div>
              <strong>Código de segurança validado!</strong>
              <span>Você já pode prosseguir.</span>
            </div>
          </div>
          <Footer onBack={() => setValidado(false)} onNext={() => setConfirmOpen(true)} />
          {confirmOpen && (
            <ConfirmModal
              loading={loading}
              onVoltar={() => setConfirmOpen(false)}
              onConfirmar={() => setLoading(true)}
            />
          )}
        </div>
      ) : (
        <div className="flow-body">
          <InfoBanner tone="blue">
            Enviamos um código de segurança para seu e-mail. Verifique sua caixa de entrada
            e também a pasta de spam.
          </InfoBanner>

          <label className="field">
            <span className="field-label">
              Código de segurança<span className="required">*</span>
            </span>
            <input
              type="text"
              className="field-input"
              placeholder="Digite o código enviado para seu e-mail..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="btn-slate btn-block"
            onClick={() => setValidado(true)}
            disabled={code.trim().length === 0}
          >
            Verificar
          </button>

          <p className="resend-label">Não recebeu seu código? Solicite o reenvio abaixo:</p>
          <button
            type="button"
            className="btn-outline-block"
            disabled={!canResend}
            onClick={() => setSeconds(60)}
          >
            {canResend ? 'Reenviar por e-mail' : `Reenviar por e-mail (${seconds}s)`}
          </button>

          <Footer onBack={onBack} nextDisabled />
        </div>
      )}
    </section>
  )
}
