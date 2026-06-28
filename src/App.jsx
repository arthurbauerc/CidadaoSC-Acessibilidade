import { useState } from 'react'
import './App.css'
import AccessibilityBar from './components/AccessibilityBar'
import VLibrasWidget from './components/VLibrasWidget'
import { IdCardIcon, SearchIcon, CalendarIcon } from './components/Icons'
import EmissaoCPF from './pages/EmissaoCPF'
import PostoRetirada from './pages/PostoRetirada'
import AutenticacaoContato from './pages/AutenticacaoContato'
import AutenticacaoCodigo from './pages/AutenticacaoCodigo'
import RecuperarCPF from './pages/RecuperarCPF'
import ResultadoConsulta from './pages/ResultadoConsulta'
import SelecaoPosto from './pages/SelecaoPosto'
import DataHora from './pages/DataHora'
import ResumoAgendamento from './pages/ResumoAgendamento'
import AutenticacaoAgendamento from './pages/AutenticacaoAgendamento'
import ConsultarAgendamento from './pages/ConsultarAgendamento'
import TipoEmissao from './pages/TipoEmissao'
import Confirmacao from './pages/Confirmacao'
import SolicitacaoFinalizada from './pages/SolicitacaoFinalizada'
import CancelarEmissao from './pages/CancelarEmissao'
import SolicitacaoCancelada from './pages/SolicitacaoCancelada'
import AgendamentoConfirmado from './pages/AgendamentoConfirmado'
import CancelarAgendamento from './pages/CancelarAgendamento'

const TABS = { CIN: 'cin', AGENDAMENTO: 'agendamento' }
const VIEWS = {
  HOME: 'home',
  CPF: 'cpf',
  RECUPERAR_CPF: 'recuperar-cpf',
  RESULTADO: 'resultado',
  POSTO: 'posto',
  CONTATO: 'contato',
  CODIGO: 'codigo',
  TIPO_EMISSAO: 'tipo-emissao',
  CONFIRMACAO: 'confirmacao',
  FINALIZADA: 'finalizada',
  CANCELAR_EMISSAO: 'cancelar-emissao',
  CANCELADA: 'cancelada',
  // Agendamento presencial — novo agendamento
  AG_POSTO: 'ag-posto',
  AG_DATA: 'ag-data',
  AG_RESUMO: 'ag-resumo',
  AG_AUTH: 'ag-auth',
  AG_CONFIRMADO: 'ag-confirmado',
  AG_CANCELAR: 'ag-cancelar',
  AG_CANCELADA: 'ag-cancelada',
  // Agendamento presencial — consultar
  AG_CONSULTAR: 'ag-consultar',
}

function Header({ activeTab, onChangeTab, onHome }) {
  return (
    <header className="site-header">
      <button
        type="button"
        className="header-logos"
        onClick={onHome}
        aria-label="Ir para a página inicial"
        title="Página inicial"
      >
        <img src="/images/logo_gov.png" alt="Governo de Santa Catarina" className="logo-gov" />
        <img src="/images/logomarca-pci.png" alt="Polícia Científica de Santa Catarina" className="logo-pci" />
      </button>

      <nav className="site-nav">
        <button
          type="button"
          className={`nav-tab ${activeTab === TABS.CIN ? 'is-active' : ''}`}
          onClick={() => onChangeTab(TABS.CIN)}
        >
          Carteira de Identidade Nacional
        </button>

        <button
          type="button"
          className={`nav-tab ${activeTab === TABS.AGENDAMENTO ? 'is-active' : ''}`}
          onClick={() => onChangeTab(TABS.AGENDAMENTO)}
        >
          Agendamento presencial
        </button>

        <img src="/images/griaule.svg" alt="Griaule" className="nav-brand" />
      </nav>
    </header>
  )
}

function ActionCard({ icon, title, description, onClick }) {
  return (
    <button type="button" className="action-card" onClick={onClick}>
      <div className="action-card-header">
        <span className="action-card-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </button>
  )
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal">
        <h2 id="modal-title">{title}</h2>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

function EmissaoHome({ onStart }) {
  const [declarado, setDeclarado] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAction = (action) => {
    if (!declarado) {
      setModalOpen(true)
      return
    }
    onStart?.(action)
  }

  return (
    <section className="page">
      <h1>Emissão Online</h1>
      <p>
        A <strong>Emissão Online da Carteira de Identidade Nacional (CIN)</strong> está
        disponível para todos os usuários que tenham emitido o documento em Santa
        Catarina (a partir de 08/03/2023) e que, na data do pedido online,{' '}
        <strong>tenham 16 anos ou mais</strong>.
      </p>
      <p>
        O documento será produzido com base nas{' '}
        <strong>informações da última solicitação presencial realizada</strong> e,
        posteriormente, encaminhado para a{' '}
        <strong>unidade de atendimento escolhida</strong> pelo usuário, para retirada.
      </p>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={declarado}
          onChange={(e) => setDeclarado(e.target.checked)}
        />
        <span>Declaro que tenho 16 anos ou mais.</span>
      </label>

      <div className="card-grid">
        <ActionCard
          icon={<IdCardIcon />}
          title="Emissão Online"
          description="Peça sua nova Carteira de Identidade Nacional (CIN)"
          onClick={() => handleAction('emissao')}
        />
        <ActionCard
          icon={<SearchIcon />}
          title="Consultar pedido"
          description="Veja como está o andamento do seu pedido de identidade"
          onClick={() => handleAction('consultar')}
        />
      </div>

      {modalOpen && (
        <Modal title="Atenção" onClose={() => setModalOpen(false)}>
          Por favor, você deve declarar que é maior de 16 anos para continuar com o
          processo de emissão de identidade.
        </Modal>
      )}
    </section>
  )
}

function AgendamentoPage({ onNovoAgendamento, onConsultar }) {
  return (
    <section className="page">
      <h1>Agendamentos</h1>

      <div className="card-grid">
        <ActionCard
          icon={<CalendarIcon />}
          title="Novo agendamento presencial"
          description="Agende um atendimento para emissão da Carteira Nacional de Identidade (CIN)."
          onClick={onNovoAgendamento}
        />
        <ActionCard
          icon={<SearchIcon />}
          title="Consultar ou cancelar"
          description="Consulte seu local de agendamento ou cancele o seu horário."
          onClick={onConsultar}
        />
      </div>
    </section>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState(TABS.CIN)
  const [view, setView] = useState(VIEWS.HOME)
  const [agData, setAgData] = useState({ posto: null, requerente: null })
  const [emData, setEmData] = useState({ cpf: '', posto: null, email: '', telefone: '' })

  const goHome = () => {
    setActiveTab(TABS.CIN)
    setView(VIEWS.HOME)
  }

  const handleStart = (action) => {
    if (action === 'emissao') setView(VIEWS.CPF)
  }

  const renderView = () => {
    if (activeTab === TABS.AGENDAMENTO) {
      switch (view) {
        case VIEWS.AG_POSTO:
          return (
            <SelecaoPosto
              onBack={() => setView(VIEWS.HOME)}
              onNext={(posto) => {
                setAgData((d) => ({ ...d, posto }))
                setView(VIEWS.AG_DATA)
              }}
            />
          )
        case VIEWS.AG_DATA:
          return (
            <DataHora
              onBack={() => setView(VIEWS.AG_POSTO)}
              onNext={({ principal }) => {
                setAgData((d) => ({ ...d, requerente: principal }))
                setView(VIEWS.AG_RESUMO)
              }}
            />
          )
        case VIEWS.AG_RESUMO:
          return (
            <ResumoAgendamento
              posto={agData.posto}
              requerente={agData.requerente}
              onBack={() => setView(VIEWS.AG_DATA)}
              onNext={() => setView(VIEWS.AG_AUTH)}
              onEditAgendamento={() => setView(VIEWS.AG_DATA)}
              onEditPosto={() => setView(VIEWS.AG_POSTO)}
            />
          )
        case VIEWS.AG_AUTH:
          return (
            <AutenticacaoAgendamento
              onBack={() => setView(VIEWS.AG_RESUMO)}
              onNext={() => setView(VIEWS.AG_CONFIRMADO)}
            />
          )
        case VIEWS.AG_CONFIRMADO:
          return (
            <AgendamentoConfirmado
              posto={agData.posto}
              requerente={agData.requerente}
              onHome={goHome}
              onCancelar={() => setView(VIEWS.AG_CANCELAR)}
            />
          )
        case VIEWS.AG_CANCELAR:
          return (
            <CancelarAgendamento
              email={agData.requerente?.email || 'seu e-mail'}
              onBack={() => setView(VIEWS.AG_CONFIRMADO)}
              onNext={() => setView(VIEWS.AG_CANCELADA)}
            />
          )
        case VIEWS.AG_CANCELADA:
          return (
            <SolicitacaoCancelada
              onNovoAgendamento={() => setView(VIEWS.AG_POSTO)}
              onEmissao={() => {
                setActiveTab(TABS.CIN)
                setView(VIEWS.CPF)
              }}
            />
          )
        case VIEWS.AG_CONSULTAR:
          return (
            <ConsultarAgendamento
              onBack={() => setView(VIEWS.HOME)}
              onNext={() => setView(VIEWS.HOME)}
            />
          )
        default:
          return (
            <AgendamentoPage
              onNovoAgendamento={() => setView(VIEWS.AG_POSTO)}
              onConsultar={() => setView(VIEWS.AG_CONSULTAR)}
            />
          )
      }
    }

    switch (view) {
      case VIEWS.CPF:
        return (
          <EmissaoCPF
            onBack={goHome}
            onNext={({ cpf }) => {
              setEmData((d) => ({ ...d, cpf }))
              setView(VIEWS.POSTO)
            }}
            onForgotCPF={() => setView(VIEWS.RECUPERAR_CPF)}
          />
        )
      case VIEWS.RECUPERAR_CPF:
        return (
          <RecuperarCPF
            onBack={() => setView(VIEWS.CPF)}
            onNext={() => setView(VIEWS.RESULTADO)}
          />
        )
      case VIEWS.RESULTADO:
        return (
          <ResultadoConsulta
            onBack={() => setView(VIEWS.CPF)}
            onAgendamento={() => setActiveTab(TABS.AGENDAMENTO)}
          />
        )
      case VIEWS.POSTO:
        return (
          <PostoRetirada
            onBack={() => setView(VIEWS.CPF)}
            onNext={(posto) => {
              setEmData((d) => ({ ...d, posto }))
              setView(VIEWS.CONTATO)
            }}
          />
        )
      case VIEWS.CONTATO:
        return (
          <AutenticacaoContato
            onBack={() => setView(VIEWS.POSTO)}
            onNext={({ email, phone }) => {
              setEmData((d) => ({ ...d, email, telefone: phone }))
              setView(VIEWS.CODIGO)
            }}
          />
        )
      case VIEWS.CODIGO:
        return (
          <AutenticacaoCodigo
            onBack={() => setView(VIEWS.CONTATO)}
            onNext={() => setView(VIEWS.TIPO_EMISSAO)}
          />
        )
      case VIEWS.TIPO_EMISSAO:
        return (
          <TipoEmissao
            onBack={() => setView(VIEWS.CODIGO)}
            onNext={() => setView(VIEWS.CONFIRMACAO)}
          />
        )
      case VIEWS.CONFIRMACAO:
        return (
          <Confirmacao
            requerente={{ cpf: emData.cpf, email: emData.email, telefone: emData.telefone }}
            posto={emData.posto}
            onBack={() => setView(VIEWS.TIPO_EMISSAO)}
            onNext={() => setView(VIEWS.FINALIZADA)}
          />
        )
      case VIEWS.FINALIZADA:
        return (
          <SolicitacaoFinalizada
            onHome={goHome}
            onCancelar={() => setView(VIEWS.CANCELAR_EMISSAO)}
            onAgendamento={() => {
              setActiveTab(TABS.AGENDAMENTO)
              setView(VIEWS.AG_POSTO)
            }}
          />
        )
      case VIEWS.CANCELAR_EMISSAO:
        return (
          <CancelarEmissao
            onBack={() => setView(VIEWS.FINALIZADA)}
            onNext={() => setView(VIEWS.CANCELADA)}
          />
        )
      case VIEWS.CANCELADA:
        return (
          <SolicitacaoCancelada
            onNovoAgendamento={() => {
              setActiveTab(TABS.AGENDAMENTO)
              setView(VIEWS.AG_POSTO)
            }}
            onEmissao={() => setView(VIEWS.CPF)}
          />
        )
      default:
        return <EmissaoHome onStart={handleStart} />
    }
  }

  return (
    <>
      <AccessibilityBar />
      <div className="app">
        <Header
          activeTab={activeTab}
          onChangeTab={(t) => {
            setActiveTab(t)
            setView(VIEWS.HOME)
          }}
          onHome={goHome}
        />
        <main className="main">{renderView()}</main>
      </div>
      <VLibrasWidget />
    </>
  )
}

export default App
