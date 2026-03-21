const searchData = document.getElementById("search-data").textContent;
const jsonSearchData = JSON.parse(searchData);
const searchBar = document.querySelector(".search");
const searchBarDropdown = document.querySelector(".searchDropdown");

const docs = jsonSearchData.map((doc, index) => {
  return {
    objectid: index.toString(),
    ...doc,
  };
});

const config = {
  searchableAttributes: ["title", "description", "content"],
  stopWords: ["a", "and", "of", "for"],
  minCharsFor1Typo: 4,
  minCharsFor2Typos: 6,
  attributesToRetrieve: ["title", "description", "urlPath"],
  customRanking: [{ attribute: "timestamp", direction: 1 }],
};

const searchClient = new MinTie.SearchClient(config, docs);

function syncUrl(query) {
  if (query.length === 0) {
    const url = new URL(window.location);
    url.searchParams.delete("q");
    return window.history.replaceState({}, "", url);
  }

  const url = new URL(window.location);
  url.searchParams.set("q", query);
  window.history.replaceState({}, "", url);
}

function runSearch() {
  const query = searchBar.value;
  searchBarDropdown.innerHTML = "";
  syncUrl(query);

  if (query.length === 0)
    return searchBarDropdown.classList.replace("block", "hidden");

  searchBarDropdown.classList.replace("hidden", "block");
  const results = searchClient.apiSearch(query, { docsPerPage: 2 });
  const hits = results.hits;

  if (hits.length === 0) {
    return (searchBarDropdown.innerHTML = "No results");
  }
  let html = `<ul class="hits">`;

  const hitsHtml = hits
    .map((hit) => {
      const category = hit.urlPath.split("/")[1];
      return `
    <li class="hits__hit">    
      <a href="${hit.urlPath}" class="hits__link">
         <h2 class="hits__title">${hit.highlights.title ? hit.highlights.title : hit.title}</h2>
         <div class="hits__path">${category}</div>
      </a>
    </li>
    `;
    })
    .join("");

  html += `${hitsHtml + "</ul>"}`;

  searchBarDropdown.insertAdjacentHTML("afterbegin", html);
}

searchBar.addEventListener("input", () => runSearch());

document.addEventListener("click", (e) => {
  if (!searchBarDropdown.contains(e.target) && !searchBar.contains(e.target)) {
    searchBarDropdown.classList.replace("block", "hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "k" && e.ctrlKey) {
    searchBar.focus();
  }

  if (e.key === "Escape") {
    searchBar.blur();
    searchBarDropdown.classList.replace("block", "hidden");
  }
});
