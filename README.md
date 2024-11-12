# Painel Admin - Loja de Uniformes (FrontEnd)

![scrnli_oR1x1hgXGp72q5](https://github.com/user-attachments/assets/f6603c04-9c30-4f80-b4a5-32d0bd650690)

## :fire: Introdução

O Painel Admin é um projeto desenvolvido para a cliente Silvana Uniformes. Ele foi construído com foco em administração do negócio.

Você pode conferir o **BackEnd** do projeto no seguinte repositório: https://github.com/FabioSigF/admin_loja_uniformes

## :computer: Tecnologias Utilizadas

Para desenvolver o Front-End do projeto, utilizei:
- Nuxt 3 : framework para desenvolvimento;
- Typescript;
- Pinia: gerenciamento de estados;
Estilos:
- PrimeVue: biblioteca de componentes;
- Tailwind CSS: personalização de estilos dos componentes;
- ChartsJS: biblioteca de gráficos;
Outros:
- Toast: disparo de avisos;

## :mag: Instalação

1. Clone o repositório:

```bash
git clone https://github.com/FabioSigF/admin-loja-uniformes-frontend
cd admin-loja-uniformes-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` no diretório principal para configurar a rota para a API. Vou usar como exemplo a rota `http://localhost:8080`:

```bash
API_URL=http://localhost:8080
```

4. Agora, basta rodar a aplicação:

```bash
npm run dev
```


## :bulb: Funcionalidades

### Autenticação do usuário

Feita pela API Java com JWT e Spring Security. No Front, existe um middleware global que verifica se o token é válido e, caso não seja, redireciona para as rotas de autenticação /login ou /register.

![scrnli_kD90hu1hUpiPDx](https://github.com/user-attachments/assets/6b27c683-e6c2-4c70-b830-7289b0001a96)

### Sistema para Empresas
É possível criar, atualizar ou remover empresas parceiras. 

![scrnli_JD8NbwZmBP7K5w](https://github.com/user-attachments/assets/61b2c330-0e80-4349-a2c4-ff734361e73f)

### Vestuário para Empresas        

Empresas possuem um vestuário de uniformes com cores e tamanhos. É possível criar novos modelos, atualizar ou removê-los.

![scrnli_uuIhiyaUzP8RT2](https://github.com/user-attachments/assets/7c55ac29-323a-4a87-8a6f-00be710d4ae0)

### Controle de estoque       

Cada venda elimina itens do estoque. Uma venda só é possível caso existam itens suficientes. Estoque pode ser atualizado e consultado. 

![scrnli_W8QmZxe4dpB4x7](https://github.com/user-attachments/assets/4d210d36-4dff-4184-8ccf-3d63f98971c2)

### Registro de vendas

Novas vendas podem ser registradas, atualizadas ou removidas.                   

![scrnli_Z4k0z859lPlwEY](https://github.com/user-attachments/assets/68194f68-ab39-45e8-b5da-795ff35fab68)

### Relatórios de desempenho       

Relatórios de vendas por período, por empresa ou por categoria. Empresas são avaliadas coletivamente ou individualmente. A Loja de Uniformes pode consultar seu desempenho em vendas e criação de novos clientes por período.

![scrnli_6R11g9wA2PMN6P](https://github.com/user-attachments/assets/074ce969-199f-4ec4-a6e6-cfa8e84571a3)
