# 🎬 Cronômetro Live OBS

Um cronômetro moderno e elegante desenvolvido especificamente para transmissões ao vivo no OBS Studio. Com design glassmorphism e funcionalidades avançadas, oferece controle preciso do tempo durante suas lives.

## ✨ Funcionalidades

### 🕐 Dois Modos de Operação
- **Contar Tempo**: Configure duração específica (ex: 1:30, 2:45, 90min)
- **Parar às**: Defina horário final e o sistema calcula automaticamente o tempo restante

### 🎨 Design Moderno
- Interface glassmorphism com efeitos de blur
- Gradientes elegantes e transições suaves
- Animações fluidas e responsivas
- Tipografia Poppins para melhor legibilidade

### 🔔 Notificações Inteligentes
- Aviso aos 5 minutos restantes
- Alerta no último minuto
- Efeito visual de pulso quando o tempo está acabando
- Notificações deslizantes personalizadas

### 📱 Responsivo
- Design adaptativo para diferentes tamanhos de tela
- Otimizado para sobreposição no OBS (380x280px)
- Fundo transparente para integração perfeita

## 🚀 Como Usar

### 1. Configuração Básica
1. Baixe o arquivo HTML
2. Abra em qualquer navegador moderno
3. Configure seu tempo desejado
4. Clique em "Iniciar Cronômetro"

### 2. Integração com OBS
1. No OBS Studio, adicione uma nova fonte
2. Selecione "Navegador" (Browser Source)
3. Configure a URL para o arquivo HTML local
4. Defina dimensões: **380x280** pixels
5. Marque "Shutdown source when not visible" para melhor performance

### 3. Exemplos de Uso

#### Modo: Contar Tempo
```
1:30    → 1 hora e 30 minutos
2:45    → 2 horas e 45 minutos
90      → 90 minutos
90min   → 90 minutos
```

#### Modo: Parar às
```
20:00   → Para às 20:00 (8 da noite)
14:30   → Para às 14:30 (2:30 da tarde)
```

**Exemplo prático**: Se você começar a live às 10:21 e definir para parar às 20:00, o cronômetro mostrará exatamente **9h 39min** restantes.

## 🛠️ Personalização

### Alterar Texto da Live
Edite a linha no código HTML:
```html
<div class="footer">Live Zehavit Games</div>
```

### Modificar Cores
As principais cores estão definidas no CSS:
- **Fundo do cronômetro**: `#23283a` para `#2e3650`
- **Botão principal**: `#667eea` para `#764ba2`
- **Texto**: `#ffffff`

### Ajustar Dimensões
Para diferentes tamanhos, modifique:
```css
.container {
  width: 380px;
  min-height: 280px;
}
```

## 📋 Requisitos Técnicos

### Navegadores Suportados
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Edge 79+

### Recursos Utilizados
- **Fonte**: Google Fonts (Poppins)
- **Ícones**: Símbolos Unicode (▶, ↻, ⏰, etc.)
- **Efeitos**: CSS3 com backdrop-filter e gradientes
- **JavaScript**: Vanilla JS (sem dependências externas)

### Performance
- **Tamanho do arquivo**: ~8KB
- **Tempo de carregamento**: < 500ms
- **Uso de CPU**: Mínimo (apenas 1 timer por segundo)
- **Compatibilidade**: Não usa localStorage (funciona no OBS)

## 🎯 Configurações Recomendadas para OBS

### Fonte do Navegador
```
URL: file:///caminho/para/cronometro.html
Largura: 380
Altura: 280
FPS: 30
Renderizar quando não visível: Desabilitado
```

### Posicionamento
- **Canto superior direito**: Para não interferir no conteúdo
- **Canto inferior**: Para informações constantes
- **Sobreposição**: Use filtros de transparência se necessário

## 🔧 Solução de Problemas

### O cronômetro não aparece no OBS
- Verifique se o caminho do arquivo está correto
- Certifique-se de que o navegador usado pelo OBS suporta CSS moderno
- Teste primeiro em um navegador normal

### O tempo não conta corretamente
- Verifique se o formato de entrada está correto
- Para horários finais, certifique-se de usar formato 24h (HH:MM)
- O sistema usa o fuso horário local do computador

### Problemas de performance
- Feche outras abas do navegador
- Verifique se há outros timers JavaScript rodando
- Reinicie o OBS se necessário

## 🎨 Showcase

### Tela Inicial
- Seletor de modo com botões modernos
- Campo de entrada inteligente
- Botão de início com gradiente

### Tela do Cronômetro
- Display grande e legível
- Nome da live personalizado
- Botão de reset acessível
- Efeitos visuais quando o tempo está acabando

## 📝 Changelog

### v2.5 (Atual)
- ✨ Design glassmorphism moderno
- 🔧 Dois modos de operação
- 🔔 Sistema de notificações
- 📱 Interface responsiva
- 🎯 Otimizado para OBS

### v1.0 (Anterior)
- ⏰ Cronômetro básico
- 🎨 Design simples
- 🔄 Funcionalidade de reset

## 🤝 Contribuições

Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Criar forks do projeto
- Enviar pull requests

---

### 🎮 Criado para streamers

**Desenvolvido Por Jackson Porciúncula**