const V='kakeibo-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){
  // 通常はネットワーク優先(更新がすぐ届く)。オフライン時はキャッシュで起動
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})
   .catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
 }else if(u.host==='fonts.googleapis.com'||u.host==='fonts.gstatic.com'){
  e.respondWith(caches.open(V).then(c=>c.match(r).then(m=>{
   const f=fetch(r).then(res=>{c.put(r,res.clone());return res}).catch(()=>m);return m||f})));
 }
});
