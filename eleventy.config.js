import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import util from "util";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("input");

  eleventyConfig.addFilter("dump", (obj) => {
    return util.inspect(obj);
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (
      (data.draft && process.env.ELEVENTY_RUN_MODE === "build") ||
      (data.draft && process.env.ELEVENTY_RUN_MODE === "serve")
    ) {
      return false;
    }
  });

  eleventyConfig.addFilter("getContentType", (filePathStem) => {
    const contentType = filePathStem.split("/")[1];
    return contentType;
  });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addFilter("md", (str) => (str ? md.render(str) : ""));

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("input/posts/*.md");
  });

  eleventyConfig.addCollection("snippets", function(collectionApi) {
    return collectionApi.getFilteredByGlob("input/snippets/*.md");
  });

  eleventyConfig.addCollection("categoryPosts", function(collectionApi) {
    const allPosts = collectionApi.getAll();
    const allCats = allPosts.flatMap((el) =>
      el.data.category !== undefined ? [el.data.category] : [],
    );

    const postsWithCats = allCats.map((cat) => {
      const posts = collectionApi.getAll().filter(function(item) {
        if (item.data.category == cat) return item;
      });

      const obj = {
        category: cat,
        posts: posts
      };

      return obj;
    });

    return postsWithCats;
  });

  eleventyConfig.addCollection("recentPosts", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("input/posts/*.md")
      .reverse()
      .slice(0, 2);
  });

  eleventyConfig.addFilter("getDate", function(dateStr, format) {
    const date = new Date(dateStr);
    if (format === "year") {
      return date.getFullYear();
    } else return;
  });

  eleventyConfig.addFilter("postDate", function(dateStr) {
    const date = new Date(dateStr);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const newDateStr = date.toLocaleDateString("en-GB", options);
    const finalDateStr = newDateStr.replaceAll("/", "-");
    return finalDateStr;
  });

  eleventyConfig.addFilter("alphSort", function(suppliedArr) {
    return suppliedArr.sort();
  });

  eleventyConfig.addFilter("makeTitleCase", function(inputStr) {
     const splitString = inputStr.split("");
     const firstLetterUpper = splitString[0].toUpperCase();
     splitString[0] = firstLetterUpper;
     const finalString = splitString.join("");
     return finalString;
  });

  eleventyConfig.addPassthroughCopy("input/static");
}
