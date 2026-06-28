import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import { CalendarIcon, ClockIcon } from '../components/Icons'

function Linha({ label, value }) {
  return (
    <div className="conf-linha">
      <span className="conf-label">{label}</span>
      <span className="conf-value">{value}</span>
    </div>
  )
}

export default function Confirmacao({ requerente, posto, onBack, onNext }) {
  const [acordo, setAcordo] = useState(false)
  const r = requerente || {}
  const p = posto || {}

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CalendarIcon size={24} />}
        breadcrumb="Emissão Online"
        title="Confirmação"
        stepper={<Stepper total={5} current={4} />}
      />

      <div className="flow-body flow-body-wide">
        <div className="conf-wrap">
          <div className="conf-card">
            <div className="conf-card-head"><h3>Dados do requerente</h3></div>
            <Linha label="CPF" value={r.cpf || 'Não informado'} />
            <Linha label="Telefone celular" value={r.telefone} />
            <Linha label="E-mail" value={r.email} />
          </div>

          <div className="conf-card">
            <div className="conf-card-head"><h3>Local de retirada</h3></div>
            <Linha label="Posto de retirada" value={`PCI - ${(p.nome || '').toUpperCase()}`} />
            <Linha label="Endereço" value={p.enderecoCompleto || p.endereco} />
            <div className="conf-linha">
              <span className="conf-label">Horário de atendimento</span>
              <span className="conf-value">Segunda a sexta</span>
              <span className="chip chip-muted"><ClockIcon size={14} />{p.horarioChip}</span>
            </div>
            <Linha label="E-mail" value={p.email} />
            <Linha label="Telefone" value={p.telefone} />
          </div>
        </div>

        <label className="checkbox conf-checkbox">
          <input type="checkbox" checked={acordo} onChange={(e) => setAcordo(e.target.checked)} />
          <span>Estou de acordo com as informações acima e desejo prosseguir.</span>
        </label>
      </div>

      <Footer onBack={onBack} onNext={onNext} nextDisabled={!acordo} />
    </section>
  )
}
