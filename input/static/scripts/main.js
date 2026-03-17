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

searchBar.addEventListener("input", (e) => {
  const query = e.target.value;
  searchBarDropdown.innerHTML = "";

  if(query.length === 0) return searchBarDropdown.classList.replace("block", "hidden");

  searchBarDropdown.classList.replace("hidden", "block");
  const results = searchClient.apiSearch(e.target.value);
  const hits = results.hits;

  if (hits.length === 0) {
    return (searchBarDropdown.innerHTML = "No results");
  }

  let html = `<ul>`;

  const hitsHtml = hits
    .map((hit) => {
      return `
    <li>    
      <a href="${hit.urlPath}">${hit.highlights.title ? hit.highlights.title : hit.title}</a>
    </li>
    `;
    })
    .join("");

  html += `${hitsHtml + "</ul>"}`;

  searchBarDropdown.insertAdjacentHTML("afterbegin", html);
});

document.addEventListener("click", (e) => {
  if (!searchBarDropdown.contains(e.target) && !searchBar.contains(e.target)) {
    searchBarDropdown.classList.replace("block", "hidden");
  }
});
