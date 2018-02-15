function gp(score) {
  if (96 <= score && score <= 100) return 4.3;
  if (85 <= score && score <= 95) return 4;
  if (75 <= score && score <= 84) return 3;
  if (65 <= score && score <= 74) return 2;
  if (60 <= score && score <= 64) return 1;
  return 0;
}

function execute() {
  let [sum, n] =
  document.forms.main_form.elements['src']
    .value.split('\n')
    .map(function(elm, idx, ary) {
      return elm.split(/\s+/);
    })
    .filter(function(elm, idx, ary) {
      return /申請|確認|取下げ/.test(elm[elm.length - 1]);
    })
    .map(function(elm, idx, ary) {
      return elm.slice(-3, -1).map(function(elm, idx, ary) {
        return Number(elm);
      });
    })
    .reduce(function(ac, elm, idx, ary) {
      return [ac[0] + elm[0] * gp(elm[1]), ac[1] + elm[0]];
    }, [0, 0]);
  let gpa100 = Math.round(sum / n * 100);
  let result = document.getElementById('result');
  if (isNaN(gpa100)) {
    result.innerHTML = '<h2>そのデータ、なんかおかしくない？</h2>';
    return;
  }

  let gpa_str = (gpa100 / 100).toFixed(2);
  let pokemon_name = POKEMON_NAMES[gpa100];
  let pokemon_url = encodeURI(
    'https://www.google.co.jp/search?tbm=isch&q=ポケモン ' + pokemon_name);

  result.innerHTML = `
    <h2>結果</h2>
    <p>あなたのGPAは<span class="result-GPA">${gpa_str}</span>です。あなたのGPAポケモンは
    <span class="result-Pokemon-text">${pokemon_name}</span>
    です。画像は<a href="${pokemon_url}">ここらへん</a>からどうぞ。この結果をツイートしたい方は<a href="${encodeURI('https://twitter.com/intent/tweet?text=GPAは' + gpa_str + 'です。GPAポケモンは' + pokemon_name + 'です。')}">ここから</a>ツイートできますが、画像は自動ではつきません。`;
}
