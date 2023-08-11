class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };

    this.formasPagamento = ["dinheiro", "debito", "credito"];
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasPagamento.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const carrinho = {};
    let total = 0;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");
      if (!this.cardapio.hasOwnProperty(codigo)) {
        return "Item inválido!";
      }

      if (!carrinho[codigo]) {
        carrinho[codigo] = 0;
      }

      carrinho[codigo] += parseInt(quantidade);
    }

    for (const codigo in carrinho) {
      const item = this.cardapio[codigo];
      total += item.valor * carrinho[codigo];
    }

    if (total === 0) {
      return "Quantidade inválida!";
    }

    if (formaDePagamento === "dinheiro") {
      total *= 0.95; // 5% de desconto
    } else if (formaDePagamento === "credito") {
      total *= 1.03; // 3% de acréscimo
    }

    return `R$ ${total.toFixed(2)}`;
  }
}

// Exemplos de uso
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", ["chantily,1"])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("debito", [
    "cafe,1",
    "chantily,1",
  ])
);
console.log(
  new CaixaDaLanchonete().calcularValorDaCompra("credito", [
    "combo1,1",
    "cafe,2",
  ])
);

export default CaixaDaLanchonete;
