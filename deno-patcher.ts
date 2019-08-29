const enc = new TextEncoder();
const dec = new TextDecoder('utf-8');
(async () => {
  let tsBody = dec.decode(await Deno.readFile('lib/typescript.js'));
  tsBody = tsBody.split('\n').filter(l => !l.match(/require\(/)).join('\n');
  tsBody += `
export {
  ts,
};
`
  await Deno.writeFile('lib/typescript-patched.js', enc.encode(tsBody));
})();
