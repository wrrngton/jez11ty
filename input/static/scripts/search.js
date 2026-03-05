const searchBox = document.querySelector("#search");
const items = document.querySelectorAll("#snippets > li");
const results = document.querySelector("#snippets");

const documents = Array.from(items).map((item) => {
  return {
    title: item.innerText.replaceAll("\n", "").trim().toLowerCase(),
    innerHtml: item.innerHTML,
  };
});

function runSearch(query) {
  const searchQuery = query.toLowerCase();
  const url = new URL(window.location);
  url.searchParams.set('q', searchQuery)
  window.history.replaceState({}, '', url);

  const matchingItems = documents.filter((doc) => doc.title.includes(searchQuery));

  if (matchingItems.length === 0)
    return (results.innerHTML = "<span>No results, sorry!</span>");

  const html = matchingItems
    .map((match) => `<li>${match.innerHtml}</li>`)
    .join("");

  results.innerHTML = "";

  results.insertAdjacentHTML("afterbegin", html);
}

document.addEventListener("DOMContentLoaded", () => {
  const urlOnLoad = new URL(window.location);
  const queryOnLoad = urlOnLoad.searchParams.get('q');
  runSearch(queryOnLoad);
});

searchBox.addEventListener("input", (e) => {
  runSearch(e.target.value);
});

document.addEventListener("keypress", (e) => {
  if (e.key === "k" && e.ctrlKey) {
    searchBox.focus();
  }
});
