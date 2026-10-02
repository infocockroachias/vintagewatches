import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
async function main() {
  const zai = await ZAI.create();
  const result = await zai.functions.invoke("page_reader", { url: "https://jaipur.watch/" });
  const data = result.data || result;
  const html = data.html || "";
  fs.writeFileSync('/home/z/my-project/scratch/jaipur-home.html', html);
  console.log("SAVED", html.length, "chars. TITLE:", data.title);
}
main().catch(e => console.error('ERR', e.message));
