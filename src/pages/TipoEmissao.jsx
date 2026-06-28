import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import { CalendarIcon, IdCardIcon } from '../components/Icons'

export default function TipoEmissao({ onBack, onNext }) {
  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CalendarIcon size={24} />}
        breadcrumb="Emissão Online"
        title="Tipo de emissão"
        stepper={<Stepper total={5} current={3} />}
      />

      <div className="flow-body">
        <div className="tipo-card is-selected">
          <div className="tipo-card-head">
            <IdCardIcon size={22} />
            <strong>Reimpressão da Carteira de Identidade</strong>
          </div>
          <div className="tipo-card-body">
            Siga com a reimpressão da sua Carteira de Identidade sem atualizar nenhuma
            informação.
          </div>
        </div>
      </div>

      <Footer onBack={onBack} onNext={onNext} />
    </section>
  )
}
