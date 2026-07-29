(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var dark = root.dataset.theme === 'dark';
      if (dark) {
        delete root.dataset.theme;
        localStorage.setItem('gkgy-theme', 'light');
      } else {
        root.dataset.theme = 'dark';
        localStorage.setItem('gkgy-theme', 'dark');
      }
    });
  }

  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var status = document.getElementById('search-status');
  var index = [];

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char];
    });
  }

  function render(query) {
    var term = query.trim().toLowerCase();
    if (!term) {
      results.innerHTML = '';
      status.textContent = '输入关键词开始搜索。';
      return;
    }

    var matches = index.filter(function (item) {
      return [item.title, item.tags, item.excerpt, item.content].join(' ').toLowerCase().includes(term);
    }).slice(0, 30);

    status.textContent = matches.length ? '找到 ' + matches.length + ' 篇相关文章。' : '没有找到相关文章，换一个关键词试试。';
    results.innerHTML = matches.map(function (item) {
      return '<article class="search-result">' +
        '<time>' + escapeHtml(item.date) + '</time>' +
        '<h2><a href="' + encodeURI(item.url) + '">' + escapeHtml(item.title) + '</a></h2>' +
        '<p>' + escapeHtml(item.excerpt).slice(0, 180) + '</p>' +
      '</article>';
    }).join('');
  }

  if (input && results && status) {
    fetch('/search.json')
      .then(function (response) { return response.json(); })
      .then(function (data) {
        index = data;
        var initial = new URLSearchParams(window.location.search).get('q') || '';
        if (initial) {
          input.value = initial;
          render(initial);
        }
      })
      .catch(function () {
        status.textContent = '搜索索引暂时不可用，请稍后再试。';
      });

    input.addEventListener('input', function (event) { render(event.target.value); });
    document.addEventListener('keydown', function (event) {
      if (event.key === '/' && document.activeElement !== input) {
        event.preventDefault();
        input.focus();
      }
    });
  }
})();
