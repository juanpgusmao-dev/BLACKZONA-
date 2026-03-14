import sys

path = r'f:\Meu Drive\Clientes\ATIVO_BlackZona\index.html'
# Wait, the user info says g: drive.
path = r'g:\Meu Drive\Clientes\ATIVO_BlackZona\index.html'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(50, 65): # lines 51 to 65 (0-indexed 50 to 64)
    if i < len(lines):
        line = lines[i]
        print(f"Line {i+1}: {repr(line)}")
