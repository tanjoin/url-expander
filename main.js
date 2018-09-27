const div = document.getElementById('hoge');
const button = document.getElementById('fuga');
const input = document.getElementById('piyo');

button.addEventListener("click", () => {
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    switch (req.readyState) {
      case 4:
        let contentType = req.getResponseHeader("Content-Type");
        if (contentType === null) {
          div.innerText = "展開できません";
        } else if (!/text\/html/.test(contentType)) {
          if (/image\//.test(contentType)) {
            div.innerText = "画像です";
          } else if (/json/.test(contentType)) {
            div.innerText = "JSONです";
          } else {
            div.innerText = contentType + " 形式のデータです";
          }
        } else if (req.status === 304 || req.status === 200) {
          var data = req.responseText;
          div.innerText = data;
          var result = data.match(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g)[0];
          div.innerText = result;
        } else {
          div.innerText = "展開できません";
        }
        break;
    }
  };
  if (input && input.value && input.value.length > 0 && div.innerText !== "解析中...") {
    req.open('GET', input.value);
    req.send();
    div.innerText = "解析中...";
  }
});

window.onload = () => {
  input.value = "";
};
