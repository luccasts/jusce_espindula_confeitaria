# Dashboard Administrativo - Guia de Uso

## 📋 Visão Geral

O dashboard administrativo foi desenvolvido para gerenciar os produtos e categorias do catálogo da Jusce Confeitaria, com completa integração com o backend Spring Boot.

## ✨ Funcionalidades

### 1. **Gerenciamento de Produtos**
- ✅ **Listar produtos**: Visualize todos os produtos cadastrados
- ✅ **Criar novo produto**: Adicione novos bolos e doces ao catálogo
- ✅ **Editar produto**: Modifique informações de produtos existentes
- ✅ **Deletar produto**: Remova produtos do catálogo (soft delete)

**Campos do Produto:**
- Nome (obrigatório)
- Preço (obrigatório)
- Descrição
- URL da Imagem
- Badge (ex: "Novo", "Promoção")
- Ordem de Exibição
- Preço por Solicitação (checkbox)

### 2. **Gerenciamento de Categorias**
- ✅ **Listar categorias**: Veja todas as categorias disponíveis
- ✅ **Criar categoria**: Crie novas categorias de produtos
- ✅ **Editar categoria**: Modifique dados da categoria
- ✅ **Deletar categoria**: Remova categorias (soft delete)

**Campos da Categoria:**
- Slug (obrigatório, ex: "bolos-de-chocolate")
- Nome (obrigatório, ex: "Bolos de Chocolate")
- Ordem de Exibição

## 🚀 Como Usar

### Pré-requisitos
1. **Backend** em execução na porta `8081`
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Banco de dados MySQL** ativo e com a base `jusce_espindula` criada

3. **Frontend** sendo servido (você pode abrir `dashboard.html` no navegador)

### Acessando o Dashboard
1. Abra `frontend/dashboard.html` no navegador
2. Você será direcionado para o painel administrativo

### Criando um Novo Produto
1. Clique em **"Novo Produto"**
2. Preencha os campos obrigatórios (Nome e Preço)
3. Adicione informações opcionais (Descrição, Imagem, Badge)
4. Clique em **"Salvar"**

### Editando um Produto
1. Clique em **"Editar"** na linha do produto
2. Modifique os campos desejados
3. Clique em **"Salvar"**

### Deletando um Produto
1. Clique em **"Deletar"** na linha do produto
2. Confirme a ação na janela modal
3. O produto será marcado como inativo (não aparecerá na loja)

### Gerenciando Categorias
Os mesmos passos acima se aplicam para categorias - você pode criar, editar e deletar categorias.

## 🔌 Endpoints da API

### Produtos
- `GET /api/produtos` - Listar todos os produtos ativos
- `GET /api/produtos/{id}` - Buscar um produto específico
- `POST /api/produtos` - Criar novo produto
- `PUT /api/produtos/{id}` - Atualizar produto
- `DELETE /api/produtos/{id}` - Deletar (soft delete) produto

### Categorias
- `GET /api/categorias` - Listar categorias ativas
- `GET /api/categorias/{id}` - Buscar categoria específica
- `POST /api/categorias` - Criar nova categoria
- `PUT /api/categorias/{id}` - Atualizar categoria
- `DELETE /api/categorias/{id}` - Deletar categoria

## 🎨 Interface

### Abas Disponíveis
1. **Produtos** - Gerencie todos os produtos do catálogo
2. **Categorias** - Organize as categorias de produtos

### Design Responsivo
O dashboard é totalmente responsivo e funciona em:
- 💻 Desktops
- 📱 Tablets
- 📲 Celulares

## ⚠️ Notas Importantes

1. **Soft Delete**: Quando você "deleta" um produto ou categoria, ele é apenas marcado como inativo. Os dados não são perdidos e podem ser recuperados pelo backend se necessário.

2. **Validação**: O dashboard valida campos obrigatórios antes de enviar para o backend.

3. **CORS**: O backend está configurado para aceitar requisições de qualquer origem (`@CrossOrigin(origins = "*")`).

4. **Porta do Backend**: A API está configurada para `http://localhost:8081`. Se mudar, atualize a variável `API_BASE` em `js/dashboard.js`.

## 🐛 Troubleshooting

### "Erro ao carregar produtos"
- Verifique se o backend está rodando na porta 8081
- Abra o console (F12) para ver mensagens de erro detalhadas

### "CORS Error"
- Certifique-se que o backend tem `@CrossOrigin(origins = "*")` configurado
- Reinicie o servidor

### Não consegue salvar produto
- Verifique se todos os campos obrigatórios estão preenchidos
- Verifique a conexão com o banco de dados MySQL

## 📝 Próximas Melhorias (Sugestões)

- [ ] Autenticação e login
- [ ] Upload de imagens direto no dashboard
- [ ] Gerenciamento de tamanhos e opções de bolos
- [ ] Histórico de alterações
- [ ] Exportação de dados (CSV/PDF)
- [ ] Gerenciamento de pedidos
- [ ] Dashboard com estatísticas

---

**Desenvolvido para Jusce Espindula Confeitaria** 🎂
