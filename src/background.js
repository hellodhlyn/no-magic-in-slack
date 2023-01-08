const redirectedKey = "no_magic";
const redirectedValue = "true";

const redirectPath = "/sign_in_with_password";

async function redirect(details) {
  const url = new URL(details.url);
  if (details.type !== "main_frame" ||
      !(url.searchParams.get("redir")?.startsWith("/ssb/signin_redirect")) ||
      url.searchParams.get(redirectedKey) === redirectedValue) {
    return {};
  }

  const redirectUrl = new URL(redirectPath, details.url);
  
  redirectUrl.searchParams.append(redirectedKey, redirectedValue);
  console.log(redirectUrl.href);
  return { redirectUrl: redirectUrl.href };
}

const filters = {
  urls: [
    "https://*.slack.com/*",
  ],
};
browser.webRequest.onBeforeRequest.addListener(redirect, filters, ["blocking"]);
