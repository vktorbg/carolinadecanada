import React from 'react';
import './src/styles/global.css';

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <script
            key="debug-script"
            dangerouslySetInnerHTML={{
                __html: `
          (function() {
            console.log("🔍 [SYSTEM DEBUG] Iniciando monitoreo de errores...");
            
            // Capturamos cualquier error antes de que el bundle de Gatsby tome el control
            window.onerror = function(msg, url, line, col, error) {
              console.group("🛑 ERROR DETECTADO");
              console.error("Mensaje:", msg);
              console.error("Archivo:", url);
              console.error("Línea:", line, "Columna:", col);
              
              if (msg.toLowerCase().includes("export") || msg.toLowerCase().includes("unexpected token")) {
                console.warn("⚠️ Se detectó una fuga de ESM (export). Escaneando todos los scripts...");
                scanScripts();
              }
              console.groupEnd();
              return false;
            };

            async function scanScripts() {
              const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
              console.log("Escaneando " + scripts.length + " archivos JS en busca de la palabra 'export'...");
              
              for (const src of scripts) {
                try {
                  const resp = await fetch(src);
                  const text = await resp.text();
                  
                  // Buscamos 'export ' como palabra clave (con espacio, llave o asterisco)
                  const matches = [
                    { type: 'export con espacio', index: text.indexOf('export ') },
                    { type: 'export con llave', index: text.indexOf('export{') },
                    { type: 'export con asterisco', index: text.indexOf('export*') }
                  ].filter(m => m.index !== -1);

                  if (matches.length > 0) {
                    console.error("❌ ARCHIVO CORRUPTO ENCONTRADO:", src);
                    matches.forEach(m => {
                      const snippet = text.substring(m.index - 50, m.index + 100);
                      console.log("Tipo: " + m.type + " en posición " + m.index);
                      console.log("Contexto: ... " + snippet + " ...");
                    });
                  }
                } catch (e) {
                  // Probablemente un archivo de otro dominio o error de red
                }
              }
            }
            
            // Ejecutar escaneo preventivo después de la carga inicial
            window.addEventListener('load', () => {
              setTimeout(scanScripts, 2000);
            });
          })();
        `,
            }}
        />,
    ]);
};
