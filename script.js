
const articles = [
  {
    id: "bounce",
    title: "3 erros que seus leads estão dando Bounce",
    category: "Entregabilidade",
    description: "Entenda por que seus e-mails não chegam ao destino e como reduzir os bounces.",
    intro: "Bounce acontece quando um e-mail não pode ser entregue ao destinatário. Identificar a causa ajuda a proteger a reputação do seu domínio.",
    sections: [
      {
        title: "1. E-mails inválidos",
        text: "Endereços digitados incorretamente, inexistentes ou desativados podem gerar hard bounces. Revise e valide sua lista antes de iniciar uma campanha."
      },
      {
        title: "2. Problemas de autenticação",
        text: "Configurações inadequadas de SPF, DKIM ou DMARC podem prejudicar a autenticação e a entrega. Confira essas configurações com o responsável técnico pelo domínio."
      },
      {
        title: "3. Reputação e limites de envio",
        text: "Volumes elevados de envio, reclamações ou padrões de disparo inadequados podem prejudicar a reputação. Aumente o volume gradualmente e monitore os resultados."
      },
      {
        title: "O que fazer agora?",
        text: "Separe os hard bounces dos erros temporários, remova endereços inválidos, confira a autenticação do domínio e acompanhe os indicadores de entrega."
      }
    ]
  },
  {
    id: "leads",
    title: "Como encontrar leads mais qualificados",
    category: "Prospecção",
    description: "Aprenda a organizar sua prospecção e priorizar empresas com maior potencial.",
    intro: "Uma boa prospecção começa por entender quem tem mais chances de se beneficiar da sua solução.",
    sections: [
      {
        title: "Defina seu perfil de cliente ideal",
        text: "Determine características como segmento, porte da empresa, localização e necessidades que sua solução pode atender."
      },
      {
        title: "Pesquise antes de abordar",
        text: "Busque informações profissionais relevantes e sinais de que a empresa pode precisar da sua solução. Evite contatos genéricos."
      },
      {
        title: "Organize e priorize",
        text: "Registre informações importantes, mantenha os dados atualizados e priorize leads que correspondam ao seu perfil ideal."
      }
    ]
  },
  {
    id: "cadencia",
    title: "Como montar uma cadência de prospecção",
    category: "Prospecção",
    description: "Organize seus contatos para manter consistência sem exagerar nas abordagens.",
    intro: "Uma cadência é uma sequência planejada de tentativas de contato ao longo de um período.",
    sections: [
      {
        title: "1. Escolha os canais",
        text: "Defina os canais adequados para seu público, como e-mail e telefone, respeitando as preferências de contato."
      },
      {
        title: "2. Planeje os intervalos",
        text: "Distribua as tentativas de forma equilibrada e evite enviar mensagens repetidas em intervalos muito curtos."
      },
      {
        title: "3. Personalize cada contato",
        text: "Cada abordagem deve ter um motivo claro e acrescentar algo novo, em vez de apenas repetir a mensagem anterior."
      }
    ]
  },
  {
    id: "configuracao",
    title: "Por onde começar a configurar sua conta?",
    category: "Configurações",
    description: "Confira os primeiros pontos para revisar antes de iniciar sua operação.",
    intro: "Antes de iniciar sua rotina de prospecção, revise as configurações principais da sua conta.",
    sections: [
      {
        title: "Revise seus dados",
        text: "Confira os dados do usuário e da empresa e verifique se as permissões estão adequadas à sua função."
      },
      {
        title: "Confira suas integrações",
        text: "Se você utiliza ferramentas integradas, verifique se a conexão está ativa e se os dados são sincronizados corretamente."
      },
      {
        title: "Faça um teste",
        text: "Antes de iniciar uma operação maior, valide o fluxo com um teste controlado e confira os resultados."
      }
    ]
  },
  {
    id: "duvidas",
    title: "O que fazer quando precisar de ajuda?",
    category: "Dúvidas frequentes",
    description: "Saiba como organizar as informações para encontrar uma solução mais rápido.",
    intro: "Antes de procurar atendimento, reúna as informações que ajudam a explicar o problema.",
    sections: [
      {
        title: "Descreva o que aconteceu",
        text: "Explique o que você estava tentando fazer e qual resultado apareceu."
      },
      {
        title: "Registre a mensagem de erro",
        text: "Se possível, anote a mensagem apresentada e o momento em que o problema ocorreu."
      },
      {
        title: "Inclua evidências úteis",
        text: "Uma captura de tela sem dados sensíveis pode ajudar a explicar a situação. Nunca compartilhe senhas ou informações confidenciais."
      }
    ]
  }
];

const articleGrid = document.getElementById("articleGrid");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const emptyState = document.getElementById("emptyState");

const modalBackground = document.getElementById("modalBackground");
const modalClose = document.getElementById("modalClose");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalIntro = document.getElementById("modalIntro");
const modalBody = document.getElementById("modalBody");
const modalDone = document.getElementById("modalDone");

let activeCategory = "Todas";
let currentSearch = "";

function normalizeText(text) {
  return text
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderArticles() {
  if (!articleGrid) return;

  const filteredArticles = articles.filter((article) => {
    const searchableText = normalizeText(
      `${article.title} ${article.category} ${article.description} ${article.intro}`
    );

    const matchesSearch = searchableText.includes(
      normalizeText(currentSearch.trim())
    );

    const matchesCategory =
      activeCategory === "Todas" || article.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  articleGrid.innerHTML = "";

  filteredArticles.forEach((article) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "article-card";
    card.dataset.article = article.id;

    const category = document.createElement("span");
    category.className = "article-category";
    category.textContent = article.category;

    const title = document.createElement("h3");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.description;

    const readMore = document.createElement("span");
    readMore.className = "read-more";
    readMore.textContent = "Ler artigo →";

    card.append(category, title, description, readMore);
    card.addEventListener("click", () => openArticle(article.id));

    articleGrid.appendChild(card);
  });

  if (emptyState) {
    emptyState.hidden = filteredArticles.length > 0;
  }
}


function openArticle(articleId) {
  const article = articles.find((item) => item.id === articleId);

  if (!article) {
    console.error("Artigo não encontrado:", articleId);
    return;
  }

  if (
    !modalBackground ||
    !modalCategory ||
    !modalTitle ||
    !modalIntro ||
    !modalBody
  ) {
    console.error(
      "Faltam elementos do modal no HTML. Confira os IDs do artigo."
    );
    return;
  }

  modalCategory.textContent = article.category || "Artigo";
  modalTitle.textContent = article.title || "Sem título";
  modalIntro.textContent = article.intro || article.description || "";

  modalBody.replaceChildren();

  if (Array.isArray(article.sections)) {
    article.sections.forEach((section) => {
      const heading = document.createElement("h3");
      heading.textContent = section.title || "";

      const paragraph = document.createElement("p");
      paragraph.textContent = section.text || "";

      modalBody.append(heading, paragraph);
    });
  }

  modalBackground.classList.add("open");
  modalBackground.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}


function closeArticle() {
  if (!modalBackground) return;

  modalBackground.classList.remove("open");
  modalBackground.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function selectCategory(category) {
  activeCategory = category;

  document.querySelectorAll("[data-category]").forEach((button) => {
    const isCategoryButton = button.classList.contains("category-card");
    if (!isCategoryButton) return;

    button.classList.toggle(
      "active",
      button.dataset.category === category
    );
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.filter === category
    );
  });

  renderArticles();

  const articlesSection = document.getElementById("artigos");
  if (articlesSection) {
    articlesSection.scrollIntoView({ behavior: "smooth" });
  }
}

if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentSearch = searchInput ? searchInput.value : "";
    renderArticles();

    const articlesSection = document.getElementById("artigos");
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value;
    renderArticles();
  });
}

document.querySelectorAll("[data-search]").forEach((button) => {
  button.addEventListener("click", () => {
    const term = button.dataset.search || "";

    if (searchInput) {
      searchInput.value = term;
    }

    currentSearch = term;
    renderArticles();

    const articlesSection = document.getElementById("artigos");
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    selectCategory(button.dataset.category);
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;

    document.querySelectorAll("[data-filter]").forEach((filterButton) => {
      filterButton.classList.toggle(
        "active",
        filterButton === button
      );
    });

    document.querySelectorAll(".category-card").forEach((categoryButton) => {
      categoryButton.classList.toggle(
        "active",
        categoryButton.dataset.category === activeCategory
      );
    });

    renderArticles();
  });
});

document.querySelectorAll("[data-article]").forEach((button) => {
  button.addEventListener("click", () => {
    openArticle(button.dataset.article);
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeArticle);
}

if (modalDone) {
  modalDone.addEventListener("click", closeArticle);
}

if (modalBackground) {
  modalBackground.addEventListener("click", (event) => {
    if (event.target === modalBackground) {
      closeArticle();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeArticle();
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const resetSearchButton = document.getElementById("resetSearch");

if (resetSearchButton) {
  resetSearchButton.addEventListener("click", () => {
    currentSearch = "";
    activeCategory = "Todas";

    if (searchInput) searchInput.value = "";

    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === "Todas");
    });

    document.querySelectorAll(".category-card").forEach((button) => {
      button.classList.remove("active");
    });

    renderArticles();
  });
}

renderArticles();
