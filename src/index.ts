import unified from "unified";
import rehypeParse from "rehype-parse";
import rehypeSanitize from "rehype-sanitize";
import hastUtilSanitize from "hast-util-sanitize";
// The following works...
const hastUtilSanitizeGitHubSchema = require("hast-util-sanitize/lib/github.json");
// ...and the following doesn’t...
// import hastUtilSanitizeGitHubSchema from "hast-util-sanitize/lib/github.json";
import deepMerge from "deepmerge";
import rehypeStringify from "rehype-stringify";

console.log(
  unified()
    .use(rehypeParse)
    .use(
      rehypeSanitize,
      deepMerge<hastUtilSanitize.Schema>(hastUtilSanitizeGitHubSchema, {
        attributes: {
          code: ["className"],
          span: [["className", "math-inline"]],
          div: [["className", "math-display"]],
        },
      })
    )
    .use(rehypeStringify)
    .processSync(`<h1 class="hello">Hello World</h1><p><code class="language-js">return hello();</code>`)
    .toString()
);
