# Cronômetro Live OBS

Cronômetro moderno para transmissões ao vivo (OBS), com design elegante, fonte Poppins e fluxo limpo: primeiro insira as horas, depois apenas o cronômetro e botão de reiniciar.

## Funcionalidades
- Contagem regressiva configurável por horas
- Interface minimalista: tela inicial só campo de horas e botão iniciar
- Após iniciar, exibe apenas o cronômetro, nome "Live Zehavit Games" e botão de reiniciar
- Fonte Poppins e ícones Lucide para visual moderno
- Interface compacta (350x250), ideal para sobreposição no OBS

## Instalação e Uso
1. Clone o repositório:
   ```sh
   git clone https://github.com/jbrunops/cronometro-live-obs.git
   ```
2. Abra a pasta do projeto e o arquivo `index.html` em seu navegador.
3. Adicione a janela do navegador como "Fonte de Navegador" no OBS, ajustando o tamanho para 350x250.

## Personalização
- Para alterar o texto exibido abaixo do cronômetro, edite a `<div class="footer">` no arquivo `index.html`.
- Para mudar cores, fonte ou estilos, edite o arquivo `style.css`.

## Requisitos
- Navegador moderno (Chrome, Edge, Firefox, etc.)
- OBS Studio (para uso em transmissões)

---

Este projeto não armazena dados e não possui dependências externas além do Lucide Icons via CDN e Google Fonts para a fonte Poppins. 