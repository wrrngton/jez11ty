import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import util from "util";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt({ html: true });

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("input");

  eleventyConfig.addFilter("dump", (obj) => {
    return util.inspect(obj);
  });

  eleventyConfig.addFilter("toJson", (obj) => {
    return JSON.stringify(obj);
  });

  eleventyConfig.addFilter("checkEmptyArray", (obj) => {
    return typeof obj === "string" ? [] : obj;
  });

  eleventyConfig.addFilter("ifOccurs", (obj) => {
    return obj !== undefined ? obj : "";
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }

    if (data.draft && process.env.ELEVENTY_RUN_MODE === "serve") {
      return content;
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

  eleventyConfig.addCollection("references", function(collectionApi) {
    return collectionApi.getFilteredByGlob("input/references/*.md");
  });
  eleventyConfig.addFilter("squash", (content) => {
    if (!content) return "";
    return content
      .replace(/<[^>]+>/g, "") // Strip HTML tags
      .replace(/\s+/g, " ") // Collapse whitespace
      .trim();
  });

  // eleventyConfig.addCollection("searchHits", function(collectionApi) {
  //   const allPosts = collectionApi.getAll();
  //   const searchHits = allPosts.map((post) => {
  //     if (!post.data.draft) {
  //       const date = new Date(post.date);
  //       return {
  //         title: post.data.title,
  //         date: post.content,
  //         timestamp: Math.floor(date.getTime() / 1000),
  //         urlPath: post.filePathStem,
  //         content: post.templateContent,
  //         ...(post.data.description && {description: post.data.description}),
  //         ...(post.data.tags && {tags: post.data.tags})
  //       };
  //     }
  //   }).filter(doc => doc !== undefined);
  //   return searchHits;
  // });

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
        posts: posts,
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
