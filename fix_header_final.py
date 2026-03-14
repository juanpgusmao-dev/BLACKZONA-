import os

path = r'g:\Meu Drive\Clientes\ATIVO_BlackZona\index.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Corrigir logo (base64 para arquivo local)
# Procurar o bloco do logo
import re
logo_pattern = re.compile(r'<a class="flex items-center group" href="index\.html">\s*<img alt="Blackzona Logo" class="h-12 w-auto" src="data:image/png;base64,[^"]*">\s*</a>', re.DOTALL)
new_logo = '<a class="flex items-center group" href="index.html">\n                <img alt="AXÉ Logo" class="h-10 w-auto" src="assets/logo-axe.png">\n            </a>'
content = logo_pattern.sub(new_logo, content)

# 2. Corrigir erros de encoding e textos
content = content.replace('AX', 'AXÉ')
content = content.replace('Coleo CANDACES', 'Coleção CANDACES')
content = content.replace('Mochilas e Resistncia', 'Mochilas e Resistência')

# 3. Garantir que o nome da marca nos comentários e classes esteja correto (opcional, mas bom pra limpeza)
content = content.replace('<!-- CENTER: Navigation -->', '<!-- CENTER: Menu -->')

# 4. Corrigir o CTA (caso ainda tenha algo de Blackzona, mas parece que o texto "Fale com a Preta" já voltou)
# O script anterior em 538 mostra que o CTA já está como "Fale com a Preta".

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Header de index.html corrigido com sucesso.")
