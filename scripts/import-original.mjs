import {load} from 'cheerio';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const origin='https://bilibel.nl';
const queue=['/']; const visited=new Set(); const assets=new Map(); const failures=[]; const pages=[];
const localHost=u=>['bilibel.nl','www.bilibel.nl'].includes(u.hostname);
async function get(url){const r=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(`${r.status} ${url}`);return r;}
async function asset(raw,base=origin){
  if(!raw||/^(data:|#|blob:)/.test(raw))return raw;
  let u;try{u=new URL(raw,base)}catch{return raw}
  if(!localHost(u))return raw;
  u.hostname='bilibel.nl';u.protocol='https:';u.search='';
  const key=u.href;const target='/original'+u.pathname;
  if(assets.has(key))return target;assets.set(key,target);
  try{let r=await get(key);let data=Buffer.from(await r.arrayBuffer());if(/\.css$/.test(u.pathname)){
    let css=data.toString();const matches=[...css.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/g)];
    for(const m of matches){const replacement=await asset(m[2],key);css=css.replace(m[0],`url("${replacement}")`)}data=Buffer.from(css);
  }await mkdir(path.dirname('public'+target),{recursive:true});await writeFile('public'+target,data);
  }catch(e){failures.push(String(e));return key}return target;
}
while(queue.length){
 const route=queue.shift();if(visited.has(route))continue;visited.add(route);
 console.log('Import',route);
 try{
 const $=load(await (await get(origin+route)).text());
 $('a[href]').each((_,el)=>{try{const raw=$(el).attr('href');if(raw.startsWith('#'))return;const u=new URL(raw,origin+route);if(localHost(u)&&!u.search&&!u.pathname.startsWith('/wp-')&&!/\.[a-z0-9]+$/i.test(u.pathname)){let p=u.pathname.endsWith('/')?u.pathname:u.pathname+'/';if(!visited.has(p))queue.push(p);$(el).attr('href',p+u.hash)}}catch{}});
 const title=$('title').text(); const bodyAttrs=$('body').attr();
 $('script,link[rel="pingback"],link[rel="https://api.w.org/"],link[rel="alternate"]').remove();
 for(const el of $('link[href]').toArray()){const href=$(el).attr('href');if($(el).attr('rel')==='stylesheet'||/icon/.test($(el).attr('rel')||''))$(el).attr('href',await asset(href));}
 for(const el of $('[src]').toArray()){$(el).attr('src',await asset($(el).attr('src')))}
 for(const el of $('[srcset]').toArray()){const list=$(el).attr('srcset').split(',');const out=[];for(const part of list){const [url,...size]=part.trim().split(/\s+/);out.push([await asset(url),...size].join(' '))}$(el).attr('srcset',out.join(', '))}
 for(const el of $('[style],style').toArray()){let value=el.tagName==='style'?$(el).html():$(el).attr('style');for(const match of [...value.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/g)])value=value.replace(match[0],`url('${await asset(match[2])}')`);if(el.tagName==='style')$(el).html(value);else $(el).attr('style',value)}
 $('a[href]').each((_,el)=>{const href=$(el).attr('href');if(href?.includes('/wp-content/'))$(el).attr('data-original-media',href)});
 for(const el of $('[data-original-media]').toArray()){$(el).attr('href',await asset($(el).attr('data-original-media')));$(el).removeAttr('data-original-media')}
 // Reveal Elementor content without loading WordPress's remote runtime.
 $('.elementor-invisible').removeClass('elementor-invisible');
 $('form').attr('data-local-form','true');
 $('head title').remove();
 pages.push({route,title,head:$('head').html(),body:$('body').html(),bodyAttrs});
 }catch(e){failures.push(String(e))}
}
await mkdir('src/data',{recursive:true});await writeFile('src/data/original.json',JSON.stringify(pages,null,2));await writeFile('src/data/import-report.json',JSON.stringify({pages:pages.map(p=>p.route),assets:assets.size,failures},null,2));console.log(JSON.stringify({pages:pages.length,assets:assets.size,failures},null,2));
