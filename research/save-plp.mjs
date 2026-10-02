import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync } from 'fs';
async function main() {
  const zai = await ZAI.create();
  // PLP: men's watches listing — check product tiles + filters
  const result = await zai.functions.invoke("page_reader", { url: "https://www.titan.co.in/shop/watches-for-men?lang=en_IN" });
  const d = result?.data ?? result;
  writeFileSync('/home/z/my-project/research/titan-plp.html', d?.html || '');
  console.log('saved PLP', (d?.html || '').length, 'chars; title:', d?.title);
}
main().catch(e => console.error('ERR', e.message));
