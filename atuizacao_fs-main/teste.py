import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import OneHotEncoder
import json
import os

# Carregar dados históricos
with open('C:\\Users\\Usuario\\OneDrive\\Área de Trabalho\\Projeto Futebol\\db\\base_flashscore_temp_atual.json', 'r') as f:
    historico = json.load(f)

# Os dados estão sob a chave '_default', então precisamos extrair dessa chave
historico = historico['_default']

# Transformar a estrutura de dados em uma lista de dicionários
historico_list = [value for key, value in historico.items()]

# Convertendo dados históricos para DataFrame
df_historico = pd.DataFrame(historico_list)

# Verifique as colunas disponíveis
print(df_historico.columns)

# Preprocessamento: removendo colunas irrelevantes, lidando com valores nulos, etc.
df_historico.fillna(0, inplace=True)

# Codificar variáveis categóricas
categorical_features = ['Home', 'Away']
encoder = OneHotEncoder(sparse_output=False)  # Correção aqui
encoded_df = pd.DataFrame(encoder.fit_transform(df_historico[categorical_features]), columns=encoder.get_feature_names_out(categorical_features))

# Juntar dados codificados com o DataFrame original
df_historico = df_historico.drop(columns=categorical_features).join(encoded_df)

# Ajustar colunas
X = df_historico[['FT_Odd_ML_H', 'FT_Odd_ML_D', 'FT_Odd_ML_A'] + list(encoded_df.columns)]
y = df_historico['FT_Goals_H']

# Dividir dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Treinar o modelo
modelo = RandomForestRegressor(n_estimators=100, random_state=42)
modelo.fit(X_train, y_train)

# Avaliar o modelo
y_pred = modelo.predict(X_test)
print(f'MSE: {mean_squared_error(y_test, y_pred)}')

# Carregar jogos futuros
df_futuro = pd.read_excel('C:\\Users\\Usuario\\OneDrive\\Área de Trabalho\\Projeto Futebol\\base_excel\\jogos_do_dia.xlsx')

# Preprocessamento dos jogos futuros
df_futuro.fillna(0, inplace=True)

# Renomear colunas para corresponder aos dados históricos
df_futuro.rename(columns={'FT_Odd_H': 'FT_Odd_ML_H', 'FT_Odd_D': 'FT_Odd_ML_D', 'FT_Odd_A': 'FT_Odd_ML_A'}, inplace=True)

# Codificar variáveis categóricas nos jogos futuros
encoded_future_df = pd.DataFrame(encoder.transform(df_futuro[categorical_features]), columns=encoder.get_feature_names_out(categorical_features))

# Manter colunas 'Home' e 'Away' para impressão depois
df_futuro_with_home_away = df_futuro[['Home', 'Away']].copy()

# Juntar dados codificados com o DataFrame original dos jogos futuros
df_futuro = df_futuro.drop(columns=categorical_features).join(encoded_future_df)

# Fazer previsões para jogos futuros
df_futuro['Previsao'] = modelo.predict(df_futuro[['FT_Odd_ML_H', 'FT_Odd_ML_D', 'FT_Odd_ML_A'] + list(encoded_future_df.columns)])

# Juntar as colunas 'Home' e 'Away' com as previsões
df_futuro_with_home_away['Previsao'] = df_futuro['Previsao']

# Exibir previsões
print(df_futuro_with_home_away[['Home', 'Away', 'Previsao']])
