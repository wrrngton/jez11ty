import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import util from "util";

export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("input");

  eleventyConfig.addFilter("dump", (obj) => {
    return util.inspect(obj);
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("input/posts/*.md");
  });

  eleventyConfig.addCollection("snippets", function(collectionApi) {
    return collectionApi.getFilteredByGlob("input/snippets/*.md");
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

  eleventyConfig.addPassthroughCopy("input/static");
}
