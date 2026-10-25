/* MedDecks offline helper. Build bf7b13cef0 */
var CACHE="meddecks-bf7b13cef0";
var CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","covers/anatomy-s.jpg","covers/anatomy.jpg","covers/biochemistry-s.jpg","covers/biochemistry.jpg","covers/histology-s.jpg","covers/histology.jpg","covers/physiology-s.jpg","covers/physiology.jpg","covers/preventive-s.jpg","covers/preventive.jpg"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE&&k.indexOf("meddecks-")===0}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
var LIB=/^https:\/\/(www\.gstatic\.com\/firebasejs|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net)\//;
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET")return;
  var u=r.url;
  if(r.mode==="navigate"||/\/index\.html$|\/$/.test(new URL(u).pathname)&&u.indexOf(self.location.origin)===0){
    e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put("index.html",cp)});return res}).catch(function(){return caches.match("index.html").then(function(m){return m||caches.match("./")})}));return}
  if(LIB.test(u)||u.indexOf(self.location.origin)===0){
    e.respondWith(caches.match(r).then(function(m){if(m)return m;return fetch(r).then(function(res){if(res&&(res.ok||res.type==="opaque")){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp)})}return res})}));
  }
});
