const searchData = document.getElementById("search-data").textContent;
const jsonSearchData = JSON.parse(searchData);
const searchBar = document.querySelector(".search");
const searchResults = document.querySelector(".searchResults");

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

function runSearch(query = "") {
  query = searchBar.value || query;
  searchResults.innerHTML = "";
  syncUrl(query);

  const results = searchClient.apiSearch(query, { docsPerPage: 2 });
  const hits = results.hits;

  if (hits.length === 0) {
    return (searchResults.innerHTML = "No results");
  }
  let html = ``;

  const hitsHtml = hits
    .map((hit) => {
      const category = hit.urlPath.split("/")[1];
      return `
    <li class="searchPage__hit">    
      <a href="${hit.urlPath}" class="searchPage__link">
         <h2 class="searchPage__title">${hit.highlights.title ? hit.highlights.title : hit.title}</h2>
         <div class="searchPage__path">${category}</div>
      </a>
    </li>
    `;
    })
    .join("");

  html += `${hitsHtml}`;

  searchResults.insertAdjacentHTML("afterbegin", html);
}

searchBar.addEventListener("input", () => runSearch());

document.addEventListener("keydown", (e) => {
  if (e.key === "k" && e.ctrlKey) {
    searchBar.focus();
  }

  if (e.key === "Escape") {
    searchBar.blur();
  }
});

window.addEventListener("DOMContentLoaded", (e) => {
  const url = new URL(window.location.href);
  const searchQuery = url.searchParams.get("q");

  if (searchQuery && searchQuery.length > 0) {
    runSearch(searchQuery);
  }
});
