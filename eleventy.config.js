export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("input");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    const posts =  collectionApi.getFilteredByGlob("input/posts/*.md");
    console.log(posts);
    return collectionApi.getFilteredByGlob("input/posts/*.md");
  });

  eleventyConfig.addCollection("snippets", function (collectionApi) {
    return collectionApi.getFilteredByGlob("input/snippets/*.md");
  });

  eleventyConfig.addPassthroughCopy("input/static");
}
