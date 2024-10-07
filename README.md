# Requisitos
* Node.js >= v20.18.0
* Gerenciador de pacotes - [pnpm](https://pnpm.io/pt/) v9.x
* Docker

# Primeiros passos
1. Criar novo arquivo `.env`
```bash
# Pedir no privado o template
  cp .env.example .env
```

2. Instalar pacotes
```bash
  pnpm install
```

3. Rodar conteiner
```bash
  docker compose up -d
  # OU
  pnpm docker:up:dbs
```

4. Rodar API
```bash
  pnpm dev
```

## Observações
1. **Gerenciador de versões node**

Para poder mudar a versão do node em diferentes projetos você pode usar o [ASDF](https://asdf-vm.com/) ou o [NVM](https://github.com/nvm-sh/nvm)