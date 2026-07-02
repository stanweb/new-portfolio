export const SITE_URL = "https://stanleykamau.netlify.app"

/**
 * Source of truth for blog metadata. Pulled at request time from a public
 * GitHub gist so posts can be added without redeploying. The local
 * `content/blogs.json` is used as a build-time fallback if the fetch fails.
 */
export const BLOGS_JSON_URL =
  "https://gist.githubusercontent.com/stanweb/3e797eea20d5236b650f27a7fbe8867a/raw/blogs.json"
