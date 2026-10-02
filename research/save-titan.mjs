import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync } from 'fs';
async function main() {
  const zai = await ZAI.create();
  const result = await zai.functions.invoke("page_reader", { url: "https://www.titan.co.in/" });
  const d = result?.data ?? result;
  writeFileSync('/home/z/my-project/research/titan-home.html', d?.html || '');
  console.log('saved', (d?.html || '').length, 'chars; title:', d?.title);
}
main().catch(e => console.error('ERR', e.message));
