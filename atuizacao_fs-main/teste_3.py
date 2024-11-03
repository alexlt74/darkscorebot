import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_squared_error, accuracy_score
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
encoder = OneHotEncoder(sparse_output=False)
encoded_df = pd.DataFrame(encoder.fit_transform(df_historico[categorical_features]), columns=encoder.get_feature_names_out(categorical_features))

# Juntar dados codificados com o DataFrame original
df_historico = df_historico.drop(columns=categorical_features).join(encoded_df)

# Ajustar colunas para previsão de gols
X_goals = df_historico[['FT_Odd_ML_H', 'FT_Odd_ML_D', 'FT_Odd_ML_A'] + list(encoded_df.columns)]
y_goals = df_historico['FT_Goals_H']

# Dividir dados em treino e teste para previsão de gols
X_goals_train, X_goals_test, y_goals_train, y_goals_test = train_test_split(X_goals, y_goals, test_size=0.2, random_state=42)

# Treinar o modelo de regressão para gols
modelo_gols = RandomForestRegressor(n_estimators=100, random_state=42)
modelo_gols.fit(X_goals_train, y_goals_train)

# Avaliar o modelo de gols
y_goals_pred = modelo_gols.predict(X_goals_test)
print(f'MSE (gols): {mean_squared_error(y_goals_test, y_goals_pred)}')

# Adicionar coluna de vencedor ao DataFrame histórico
df_historico['Winner'] = np.where(df_historico['FT_Goals_H'] > df_historico['FT_Goals_A'], 'Home', 
                                np.where(df_historico['FT_Goals_H'] < df_historico['FT_Goals_A'], 'Away', 'Draw'))

# Ajustar colunas para previsão de vencedor
y_winner = df_historico['Winner']

# Dividir dados em treino e teste para previsão de vencedor
X_winner_train, X_winner_test, y_winner_train, y_winner_test = train_test_split(X_goals, y_winner, test_size=0.2, random_state=42)

# Treinar o modelo de classificação para vencedor
modelo_vencedor = RandomForestClassifier(n_estimators=100, random_state=42)
modelo_vencedor.fit(X_winner_train, y_winner_train)

# Avaliar o modelo de vencedor
y_winner_pred = modelo_vencedor.predict(X_winner_test)
print(f'Accuracy (vencedor): {accuracy_score(y_winner_test, y_winner_pred)}')

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
df_futuro['Previsao_Gols'] = modelo_gols.predict(df_futuro[['FT_Odd_ML_H', 'FT_Odd_ML_D', 'FT_Odd_ML_A'] + list(encoded_future_df.columns)])
df_futuro['Previsao_Vencedor'] = modelo_vencedor.predict(df_futuro[['FT_Odd_ML_H', 'FT_Odd_ML_D', 'FT_Odd_ML_A'] + list(encoded_future_df.columns)])

# Juntar as colunas 'Home' e 'Away' com as previsões
df_futuro_with_home_away['Previsao_Gols'] = df_futuro['Previsao_Gols']
df_futuro_with_home_away['Previsao_Vencedor'] = df_futuro['Previsao_Vencedor']

# Salvar previsões em um arquivo CSV
df_futuro_with_home_away.to_csv('predictions.csv', index=False)
