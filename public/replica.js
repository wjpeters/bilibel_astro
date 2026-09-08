// Elementor normally creates these players; restore them without its WordPress runtime.
document.querySelectorAll('[data-settings]').forEach(widget => {
  let settings;
  try { settings = JSON.parse(widget.getAttribute('data-settings')); } catch { return; }
  if (settings.video_type !== 'youtube' || !settings.youtube_url) return;
  let url;
  try { url = new URL(settings.youtube_url); } catch { return; }
  const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.split('/').pop();
  if (!/^[\w-]{11}$/.test(id || '')) return;
  const placeholder = widget.querySelector('.elementor-video');
  if (!placeholder || placeholder.tagName === 'IFRAME') return;
  const player = document.createElement('iframe');
  player.className = placeholder.className;
  player.src = `https://www.youtube.com/embed/${id}?controls=${settings.controls === 'no' ? '0' : '1'}&playsinline=1`;
  player.title = `YouTube-video — ${document.querySelector('h1')?.textContent.trim() || 'Bilibel'}`;
  player.loading = 'lazy';
  player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  player.allowFullscreen = true;
  player.referrerPolicy = 'strict-origin-when-cross-origin';
  player.style.border = '0';
  placeholder.replaceWith(player);
});
document.querySelectorAll('[data-thumbnail]').forEach(el=>{const link=el.closest('a');if(link)el.style.backgroundImage=`url("${link.getAttribute('href')}")`});
document.querySelectorAll('.menu-item-has-children>a').forEach(a=>{if(!a.querySelector('.sub-arrow')){const arrow=document.createElement('span');arrow.className='sub-arrow';arrow.innerHTML='<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';a.append(arrow)}});
document.querySelectorAll('.elementor-menu-toggle').forEach(toggle=>{
 toggle.setAttribute('aria-expanded','false');
 toggle.addEventListener('click',()=>{const open=toggle.classList.toggle('elementor-active');toggle.setAttribute('aria-expanded',String(open));const nav=toggle.parentElement.querySelector('nav.elementor-nav-menu--dropdown');if(nav){nav.setAttribute('aria-hidden',String(!open));nav.querySelectorAll('[tabindex]').forEach(a=>a.setAttribute('tabindex',open?'0':'-1'));}});
});
document.querySelectorAll('.elementor-nav-menu--dropdown .menu-item-has-children>a').forEach(a=>a.addEventListener('click',e=>{if(e.target.closest('.sub-arrow')){e.preventDefault();const sub=a.nextElementSibling;if(sub){const open=sub.style.display!=='block';sub.style.display=open?'block':'none';a.setAttribute('aria-expanded',String(open));}}}));
document.querySelectorAll('.swiper,.swiper-container').forEach(container=>{
 const wrapper=container.querySelector('.swiper-wrapper');if(!wrapper)return;
 const slides=[...wrapper.children].filter(s=>s.classList.contains('swiper-slide'));if(slides.length<2)return;
 wrapper.style.transform='none';wrapper.style.display='block';
 const dots=document.createElement('div');dots.className='replica-dots';let current=0;
 const show=n=>{current=(n+slides.length)%slides.length;slides.forEach((s,i)=>{s.classList.add('replica-slide');s.hidden=i!==current;s.style.width='100%';});[...dots.children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));};
 slides.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Ga naar review ${i+1}`);b.onclick=()=>show(i);dots.append(b)});container.append(dots);show(0);
 let timer=setInterval(()=>{if(!container.matches(':hover,:focus-within'))show(current+1)},7000);document.addEventListener('visibilitychange',()=>{if(document.hidden)clearInterval(timer)});
});
document.querySelectorAll('a[href]').forEach(a=>{if(/\.(webp|jpe?g|png)(\?.*)?$/i.test(a.getAttribute('href'))){a.addEventListener('click',e=>{e.preventDefault();const d=document.createElement('dialog');d.className='replica-lightbox';const img=document.createElement('img');img.src=a.href;img.alt=a.querySelector('img')?.alt||'Praktijkfoto';const close=document.createElement('button');close.textContent='×';close.setAttribute('aria-label','Sluiten');close.onclick=()=>d.close();d.append(img,close);document.body.append(d);d.addEventListener('close',()=>d.remove());d.showModal()})}});
document.querySelectorAll('.elementor-tab-title').forEach(title=>title.addEventListener('click',()=>{const content=title.nextElementSibling;const open=title.classList.toggle('elementor-active');title.setAttribute('aria-expanded',String(open));if(content){content.classList.toggle('elementor-active',open);content.style.display=open?'block':'none';}}));
document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const values=[...new FormData(form)].filter(([k])=>k.startsWith('form_fields')).map(([k,v])=>`${k.replace('form_fields[','').replace(']','')}: ${v}`).join('\n');location.href='mailto:info@bilibel.nl?subject='+encodeURIComponent('Bericht via Bilibel')+'&body='+encodeURIComponent(values);}));
// Cookie controls are local; the replica loads no analytics.
document.querySelectorAll('.cmplz-accept,.cmplz-deny,.cmplz-save-preferences').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.cmplz-cookiebanner').forEach(el=>el.style.display='none');localStorage.setItem('bilibel-consent','saved')}));
document.querySelectorAll('.cmplz-manage-consent').forEach(b=>b.addEventListener('click',()=>document.querySelectorAll('.cmplz-cookiebanner').forEach(el=>{el.style.display='block';el.classList.remove('cmplz-hidden')})));
