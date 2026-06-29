import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Stepper from '../components/Stepper'
import Footer from '../components/Footer'
import InfoBanner from '../components/InfoBanner'
import DateModal from '../components/DateModal'
import TimeModal from '../components/TimeModal'
import { CalendarIcon, CalendarInputIcon, ClockIcon, TrashIcon } from '../components/Icons'
import { useLanguage } from '../i18n'

const MAX_ADICIONAIS = 3

function novoAdicional() {
  return { nome: '', nascimento: '', data: '', horario: '' }
}

function formatDate(v) {
  const d = v.replace(/\D/g, '').slice(0, 8)
  return d.replace(/^(\d{2})(\d)/, '$1/$2').replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2')
}

function PickerField({ label, value, placeholder, icon, onClick }) {
  return (
    <label className="field">
      <span className="field-label">
        {label}<span className="required">*</span>
      </span>
      <button type="button" className="field-input picker-input" onClick={onClick}>
        <span className={value ? '' : 'picker-placeholder'}>{value || placeholder}</span>
        <span className="picker-icon">{icon}</span>
      </button>
    </label>
  )
}

export default function DataHora({ onBack, onNext }) {
  const { t } = useLanguage()
  const [principal, setPrincipal] = useState({
    nome: 'Arthur Bauer Cardoso',
    nascimento: '07/10/2005',
    email: 'arthurcardososjs@gmail.com',
    cpf: '',
    telefone: '(48) 99193-0903',
    data: '23/06/2026',
    horario: '',
  })
  const [adicionais, setAdicionais] = useState([])
  const [modal, setModal] = useState(null) // { kind: 'date'|'time', who: 'principal'|index }

  const setField = (who, field, value) => {
    if (who === 'principal') {
      setPrincipal((p) => ({ ...p, [field]: value }))
    } else {
      setAdicionais((list) =>
        list.map((a, i) => (i === who ? { ...a, [field]: value } : a))
      )
    }
  }

  const getReq = (who) => (who === 'principal' ? principal : adicionais[who])

  const addRequerente = () => {
    if (adicionais.length < MAX_ADICIONAIS) {
      setAdicionais((list) => [...list, novoAdicional()])
    }
  }

  const removeRequerente = (i) => {
    setAdicionais((list) => list.filter((_, idx) => idx !== i))
  }

  const principalValido =
    principal.nome && principal.nascimento && principal.email &&
    principal.telefone && principal.data && principal.horario

  const adicionaisValidos = adicionais.every(
    (a) => a.nome && a.nascimento && a.data && a.horario
  )

  const podeProsseguir = principalValido && adicionaisValidos

  const closeModal = () => setModal(null)
  const confirmModal = (value) => {
    if (!modal) return
    setField(modal.who, modal.kind === 'date' ? 'data' : 'horario', value)
    closeModal()
  }

  return (
    <section className="page page-flow">
      <PageHeader
        icon={<CalendarIcon size={24} />}
        breadcrumb={t('dataHora.breadcrumb')}
        title={t('dataHora.title')}
        stepper={<Stepper total={5} current={2} />}
      />

      <div className="flow-body flow-body-wide">
        <InfoBanner>{t('dataHora.info')}</InfoBanner>

        <div className="ag-card">
          {/* Requerente principal */}
          <div className="requerente-card">
            <h3 className="requerente-title">{t('dataHora.requerente')}</h3>

            <div className="req-grid">
              <label className="field">
                <span className="field-label">{t('dataHora.nome')}<span className="required">*</span></span>
                <input
                  className="field-input"
                  placeholder={t('dataHora.nome')}
                  value={principal.nome}
                  onChange={(e) => setField('principal', 'nome', e.target.value)}
                />
              </label>
              <label className="field">
                <span className="field-label">{t('dataHora.nascimento')}<span className="required">*</span></span>
                <input
                  className="field-input"
                  placeholder="DD/MM/AAAA"
                  value={principal.nascimento}
                  onChange={(e) => setField('principal', 'nascimento', formatDate(e.target.value))}
                  inputMode="numeric"
                />
              </label>
            </div>

            <label className="field">
              <span className="field-label">{t('dataHora.email')}<span className="required">*</span></span>
              <input
                type="email"
                className="field-input"
                placeholder={t('dataHora.emailPlaceholder')}
                value={principal.email}
                onChange={(e) => setField('principal', 'email', e.target.value)}
              />
            </label>

            <div className="req-grid">
              <label className="field">
                <span className="field-label">{t('dataHora.cpf')} <span className="optional">{t('dataHora.opcional')}</span></span>
                <input
                  className="field-input"
                  placeholder="000.000.000-00"
                  value={principal.cpf}
                  onChange={(e) => setField('principal', 'cpf', e.target.value)}
                  inputMode="numeric"
                />
              </label>
              <label className="field">
                <span className="field-label">{t('dataHora.telefone')}<span className="required">*</span></span>
                <input
                  className="field-input"
                  placeholder="(00) 00000-0000"
                  value={principal.telefone}
                  onChange={(e) => setField('principal', 'telefone', e.target.value)}
                />
              </label>
            </div>

            <div className="req-grid">
              <PickerField
                label={t('dataHora.data')}
                value={principal.data}
                placeholder={t('select')}
                icon={<CalendarInputIcon />}
                onClick={() => setModal({ kind: 'date', who: 'principal' })}
              />
              <PickerField
                label={t('dataHora.horario')}
                value={principal.horario}
                placeholder={t('select')}
                icon={<ClockIcon />}
                onClick={() => setModal({ kind: 'time', who: 'principal' })}
              />
            </div>
          </div>

          {/* Requerentes adicionais */}
          {adicionais.map((a, i) => (
            <div className="requerente-card" key={i}>
              <div className="requerente-title-row">
                <h3 className="requerente-title">
                  {t('dataHora.adicional')} <span className="req-index">#{i + 1}</span>
                </h3>
                <button
                  type="button"
                  className="btn-remove-req"
                  aria-label={t('dataHora.removeReq')}
                  title={t('dataHora.removeReq')}
                  onClick={() => removeRequerente(i)}
                >
                  <TrashIcon />
                </button>
              </div>

              <div className="req-grid">
                <label className="field">
                  <span className="field-label">{t('dataHora.nome')}<span className="required">*</span></span>
                  <input
                    className="field-input"
                    placeholder={t('dataHora.digitePlaceholder')}
                    value={a.nome}
                    onChange={(e) => setField(i, 'nome', e.target.value)}
                  />
                </label>
                <label className="field">
                  <span className="field-label">{t('dataHora.nascimento')}<span className="required">*</span></span>
                  <input
                    className="field-input"
                    placeholder="DD/MM/AAAA"
                    value={a.nascimento}
                    onChange={(e) => setField(i, 'nascimento', formatDate(e.target.value))}
                    inputMode="numeric"
                  />
                </label>
              </div>

              <div className="req-grid">
                <PickerField
                  label={t('dataHora.data')}
                  value={a.data}
                  placeholder={t('select')}
                  icon={<CalendarInputIcon />}
                  onClick={() => setModal({ kind: 'date', who: i })}
                />
                <PickerField
                  label={t('dataHora.horario')}
                  value={a.horario}
                  placeholder={t('select')}
                  icon={<ClockIcon />}
                  onClick={() => setModal({ kind: 'time', who: i })}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn-add-req"
          onClick={addRequerente}
          disabled={adicionais.length >= MAX_ADICIONAIS}
        >
          {t('dataHora.addReq')}
        </button>
        <p className="add-req-note">{t('dataHora.addReqNote').replace('{n}', MAX_ADICIONAIS)}</p>
      </div>

      <Footer
        onBack={onBack}
        onNext={() => onNext?.({ principal, adicionais })}
        nextDisabled={!podeProsseguir}
      />

      {modal?.kind === 'date' && (
        <DateModal
          value={getReq(modal.who)?.data}
          onConfirm={confirmModal}
          onClose={closeModal}
        />
      )}
      {modal?.kind === 'time' && (
        <TimeModal
          value={getReq(modal.who)?.horario}
          onConfirm={confirmModal}
          onClose={closeModal}
        />
      )}
    </section>
  )
}
