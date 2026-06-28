import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import InfoBanner from '../components/InfoBanner'
import { CalendarIcon } from '../components/Icons'

export default function AutenticacaoCodigo({ onBack, onNext }) {
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const canResend = seconds <= 0

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CalendarIcon size={24} />}
        breadcrumb="Emissão Online"
        title="Autenticação"
        stepper={<Stepper total={5} current={2} />}
      />

      <div className="flow-body">
        <InfoBanner>
          Enviamos um código de verificação para seu e-mail. Verifique sua caixa de
          entrada e também a pasta de spam.
        </InfoBanner>

        <label className="field">
          <span className="field-label">
            Código de verificação<span className="required">*</span>
          </span>
          <input
            type="text"
            className="field-input"
            placeholder="Digite o código de verificação..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </label>

        <button
          type="button"
          className="btn-primary btn-block"
          onClick={() => onNext?.({ code })}
          disabled={code.trim().length === 0}
        >
          Verificar
        </button>

        <p className="resend-label">Não recebeu seu código? Solicite o reenvio abaixo.</p>
        <button
          type="button"
          className="btn-resend"
          disabled={!canResend}
          onClick={() => setSeconds(60)}
        >
          {canResend ? 'Reenviar por e-mail' : `Reenviar por e-mail (${seconds}s)`}
        </button>
      </div>

      <Footer onBack={onBack} nextDisabled />
    </section>
  )
}
