const div = document.getElementById('hoge');
const button = document.getElementById('fuga');
const input = document.getElementById('piyo');

button.addEventListener("click", () => {
  let req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    switch (req.readyState) {
      case 4:
        if (req.status === 304) {
          var data = req.responseText;
          div.innerText = data;
          var result = data.match(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g)[0];
          div.innerText = result;
        } else if (req.status === 200) {
          div.innerText = req.responseType;
        } else {
          div.innerText = "展開できません";
        }
        break;
    }
  };
  if (input && input.value && input.value.length > 0) {
    req.open('GET', input.value, false);
    req.send();
  }
});

window.onload = () => {
  input.value = "";
};
