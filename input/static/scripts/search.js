const searchBox = document.querySelector("#search");
const items = document.querySelectorAll("#references li");
const results = document.querySelector("#references");
const sections = document.querySelectorAll("[id^='section__']");

const documents = Array.from(items).map((item) => {
  return {
    title: item.innerText.replaceAll("\n", "").trim().toLowerCase(),
    innerHtml: item.innerHTML,
    category: item.parentNode.parentNode.id.replace("section__", ""),
  };
});

function getSectionMatchingDocs(matchingDocs) {
  const newObj = {};
  for (const section of sections) {
    const sectionName = section.id.replace("section__", "");
    const matchingSectionDocs = matchingDocs.filter(
      (item) => sectionName == item.category,
    );
    newObj[sectionName] = matchingSectionDocs;
  }
  return newObj;
}

function runSearch(query) {
  const searchQuery = query.toLowerCase();
  const url = new URL(window.location);
  url.searchParams.set("q", searchQuery);
  window.history.replaceState({}, "", url);

  const matchingItems = documents.filter((doc) =>
    doc.title.includes(searchQuery),
  );

  if (matchingItems.length === 0) {
    sections.forEach((section) => {
      section.innerHTML = "<span>No results, sorry!</span>";
    });
  }

  const matchingSectionDocs = getSectionMatchingDocs(matchingItems);
  console.log(matchingSectionDocs);

  for (const sectionDocs in matchingSectionDocs) {
    const sectionList = document.querySelector(`#section__${sectionDocs}`);

    if (matchingSectionDocs[sectionDocs].length === 0) {
      return sectionList.innerHTML = "<span>No results, sorry!</span>";
    }

    sectionList.innerHTML = "";
    let html = "<ul>";
    const insideHtml = matchingSectionDocs[sectionDocs]
      .map((match) => `<li>${match.innerHtml}</li>`)
      .join("");
    html += `${insideHtml} </ul>`
    sectionList.insertAdjacentHTML("afterbegin", html);
  }
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
