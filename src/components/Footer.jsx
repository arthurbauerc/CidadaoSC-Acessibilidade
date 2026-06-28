export default function Footer({ onBack, onNext, backLabel = 'Voltar', nextLabel = 'Prosseguir', nextDisabled = false }) {
  return (
    <div className="flow-footer">
      <button type="button" className="btn-back" onClick={onBack}>
        {backLabel}
      </button>
      <button
        type="button"
        className="btn-next"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </button>
    </div>
  )
}
