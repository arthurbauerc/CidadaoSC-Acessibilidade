import { useEffect } from 'react'

const PLUGIN_SRC = 'https://vlibras.gov.br/app/vlibras-plugin.js'
const APP_URL = 'https://vlibras.gov.br/app'

/**
 * Widget oficial do VLibras (tradução do conteúdo da página para Libras).
 * Renderiza o markup exigido pela documentação e carrega o plugin uma única vez,
 * instanciando o widget após o script estar disponível.
 * https://vlibras.gov.br/doc/widget/installation/webpageintegration.html
 */
export default function VLibrasWidget() {
  useEffect(() => {
    const start = () => {
      if (window.VLibras && !window.__vlibrasStarted) {
        // eslint-disable-next-line no-new
        new window.VLibras.Widget(APP_URL)
        window.__vlibrasStarted = true
      }
    }

    // Plugin já carregado (HMR/remontagem) → só instancia se ainda não houver widget.
    if (window.VLibras) {
      start()
      return
    }

    // Evita inserir o script mais de uma vez.
    let script = document.querySelector(`script[src="${PLUGIN_SRC}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = PLUGIN_SRC
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', start)

    return () => script.removeEventListener('load', start)
  }, [])

  return (
    <div vw="" className="enabled">
      <div vw-access-button="" className="active" />
      <div vw-plugin-wrapper="">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  )
}
