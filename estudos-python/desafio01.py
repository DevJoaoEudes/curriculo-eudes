# ==========================================
# DESAFIO 01: PRATICANDO LOGICA DE PROGRAMACAO
# ==========================================
# Objetivo:
# 1. Perguntar o nome do usuario
# 2. Perguntar o ano de nascimento
# 3. Calcular a idade atual
# 4. Exibir se e maior ou menor de idade
# ==========================================

print("=== BEM-VINDO AO SEU PRIMEIRO PROGRAMA INTERATIVO ===")

# Entrada de dados
nome = input("Qual e o seu nome? ")
ano_nascimento_texto = input("Em que ano voce nasceu? ")

# Conversao de texto para numero inteiro (int)
ano_nascimento = int(ano_nascimento_texto)
ano_atual = 2026

# Processamento / Calculo
idade = ano_atual - ano_nascimento

# Saida com tomada de decisao
print(f"\nOla, {nome}! Em {ano_atual} voce completa {idade} anos.")

if idade >= 18:
    print("Status: Maior de idade! Pode tirar habilitacao e votar.")
elif idade >= 16:
    print("Status: Tem entre 16 e 17 anos (voto opcional, mas ainda nao pode dirigir).")
else:
    print("Status: Menor de idade.")
