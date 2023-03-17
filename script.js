const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.length < 3) {
    results.innerHTML = '<p class="error">Введите не менее 3 символов</p>';
    return;
  }
  fetch(
    `https://api.github.com/search/repositories?q=${input.value}&per_page=10`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.total_count === 0) {
        results.innerHTML = '<p class="error">Ничего не найдено</p>';
        return;
      }
      let html = '<ul>';
      data.items.forEach((item) => {
        html += `<li><a href="${item.html_url}" target="_blank">${item.name}</a>`;
        html += `<p>${item.description}</p>`;
        html += `<p>Language: ${item.language}, Stars: ${item.stargazers_count}, Forks: ${item.forks_count}</p>`;
        html += '</li>';
      });
      html += '</ul>';
      results.innerHTML = html;
    })
    .catch((error) => {
      results.innerHTML = '<p class="error">Ошибка при загрузке данных</p>';
    });
});
