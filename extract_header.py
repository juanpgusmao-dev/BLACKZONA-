import sys

path = r'g:\Meu Drive\Clientes\ATIVO_BlackZona\index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.splitlines(keepends=True)

# lines 44 to 92 (0-indexed 43 to 91)
header_block = "".join(lines[43:92])
print(header_block)
