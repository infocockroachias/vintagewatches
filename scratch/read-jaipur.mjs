import ZAI from 'z-ai-web-dev-sdk';
async function main() {
  const zai = await ZAI.create();
  const result = await zai.functions.invoke("page_reader", { url: "https://jaipur.watch/" });
  const data = result.data || result;
  console.log("TITLE:", data.title);
  console.log("URL:", data.url);
  console.log("HTML_LEN:", (data.html || "").length);
  const text = (data.html || "").replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log("TEXT_SLICE:", text.slice(0, 12000));
  console.log("\n--- RAW HTML SLICE ---");
  console.log((data.html || "").slice(0, 8000));
}
main().catch(e => console.error('ERR', e.message));
