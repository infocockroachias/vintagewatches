import ZAI from 'z-ai-web-dev-sdk';
async function main() {
  const zai = await ZAI.create();
  const result = await zai.functions.invoke("page_reader", { url: "https://www.titan.co.in/" });
  const d = result?.data ?? result;
  console.log('TITLE:', d?.title);
  console.log('URL:', d?.url);
  const html = d?.html || '';
  console.log('HTML_LEN:', html.length);
  console.log(html.slice(0, 9000));
}
main().catch(e => console.error('ERR', e.message));
