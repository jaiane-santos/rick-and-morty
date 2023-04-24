const personagem = document.getElementById("idperson");
const search = document.getElementById("search-btn");
const content = document.getElementById("content");
const img = document.getElementById("img");

const fetchApi = (value) => {
  const url = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return url;
};

const keys = [
  "name",
  "status",
  "species",
  "gender",
  "origin",
  "image",
  "location",
  "episode",
];

const buildResult = (result) => {
  const newObject = {};
  keys
    .map((key) => document.getElementById(key))
    .map((elem) => {
      elem.checked && (newObject[elem.name] = result[elem.name]);
    });

  return newObject;
};

search.addEventListener("click", async (e) => {
  e.preventDefault();
  const result = await fetchApi(personagem.value);
  content.textContent = `${JSON.stringify(buildResult(result), undefined, 2)}`;
  img.src = `${result.image}`;
});
