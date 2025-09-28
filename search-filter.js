document.addEventListener('DOMContentLoaded', () => {

  function filterTable(inputId, tableSelector) {
    const input = document.getElementById(inputId);
    const table = document.querySelector(tableSelector);
    if (!input || !table) return;

    input.addEventListener('input', () => {
      const filter = input.value.toLowerCase();
      const rows = table.tBodies[0].rows;

      Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
      });
    });
  }

  function filterArticles(inputId, containerSelector, articleSelector) {
    const input = document.getElementById(inputId);
    const container = document.querySelector(containerSelector);
    if (!input || !container) return;

    input.addEventListener('input', () => {
      const filter = input.value.toLowerCase();
      const articles = container.querySelectorAll(articleSelector);

      articles.forEach(article => {
        const text = article.textContent.toLowerCase();
        article.style.display = text.includes(filter) ? '' : 'none';
      });
    });
  }

  // Cursos - tabela
  filterTable('course-search', 'table');

  // Grades - tabela
  filterTable('grades-search', 'table');

  // Anúncios - artigos
  filterArticles('announcement-search', 'main.container', 'article');
});
