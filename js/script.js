const personagem = document.getElementById("idperson");
const search = document.getElementById("search-btn");
const reset = document.getElementById("reset");
const content = document.getElementById("content");
const resultContent = document.getElementById("result-content");
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

const keys = ["name", "status", "species", "gender", "origin", "location"];
const renamingKeys = {
  name: "Nome",
  status: "status",
  species: "Espécie",
  gender: "Gênero",
  origin: "Planeta de Origem",
  location: "Localização",
};

const buildResult = (result) => {
  return keys
    .map((key) => document.getElementById(key))
    .map((elem) => {
      if (elem.checked === true && typeof result[elem.name] !== "object") {
        const newElement = document.createElement("p");
        newElement.innerHTML = `${renamingKeys[elem.name]}: ${
          result[elem.name]
        }`;
        content.appendChild(newElement);
      } else if (
        (elem.checked === true && elem.name === "location") ||
        (elem.checked === true && elem.name === "origin")
      ) {
        const newElement = document.createElement("p");
        newElement.innerHTML = `${renamingKeys[elem.name]}: ${
          result[elem.name].name
        }`;
        content.appendChild(newElement);
      }
    });
};

search.addEventListener("click", async (e) => {
  e.preventDefault();
  if (personagem.value === "") {
    return (content.innerHTML = "É necessario buscar o personagem pelo ID");
  }
  const result = await fetchApi(personagem.value);
  if (content.firstChild === null) {
    resultContent.className = "result-content";
    img.src = `${result.image}`;
    buildResult(result);
  } else {
    content.innerHTML = "";
    resultContent.className = "result-content";
    img.src = `${result.image}`;
    buildResult(result);
  }
});

reset.addEventListener("click", () => location.reload());
