import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
const urls = [
  ['collection', 'https://jaipur.watch/en-us/collections/best-seller'],
  ['product', 'https://jaipur.watch/en-us/products/devnagari-baagh-bw14'],
];
async function main() {
  const zai = await ZAI.create();
  for (const [name, url] of urls) {
    try {
      const result = await zai.functions.invoke("page_reader", { url });
      const data = result.data || result;
      fs.writeFileSync(`/home/z/my-project/scratch/jaipur-${name}.html`, data.html || "");
      console.log(name, "saved", (data.html || "").length);
    } catch (e) {
      console.error(name, "ERR", e.message);
    }
  }
}
main().catch(e => console.error('ERR', e.message));
