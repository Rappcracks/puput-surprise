const correctPassword = "10112000";
const defaults = {
 lockTitle:"A Little Surprise", name:"Puput Nova Triana",
 letter:"Untuk Puput Nova Triana,\n\nSelamat ulang tahun, sayang! ❤️\n\nSemoga setiap hari membawa kebahagiaan, kesehatan, dan semua hal baik yang kamu impikan. Terima kasih sudah hadir dan membuat hari-hariku lebih berwarna.\n\nJangan pernah berhenti tersenyum, ya. Aku selalu mendoakan yang terbaik untukmu.\n\nLove you, sayang. 💗",
 caption:"Setiap momen bersamamu selalu jadi cerita favoritku.",
 gift:"Hadiah kecil ini mungkin sederhana, tapi dibuat dengan banyak cinta. Semoga kamu suka! ❤️ Happy Birthday All With You Always & Forever ❤️",
 song:"Still With You",artist:"Jung Kook (정국)"
};
const defaultMainPhoto = "Foto Utama/IMG-20260609-WA0007.jpg";
const defaultMemoryPhotos = ["foto kenangan/1768240531064.jpg", "foto kenangan/1768240531168.jpg", "foto kenangan/1768240531411.jpg", "foto kenangan/1768240825536.jpg", "foto kenangan/2025-12-28 08.06.42_.jpg", "foto kenangan/20260225_002952.jpg", "foto kenangan/IMG-20260209-WA0014.jpg", "foto kenangan/IMG-20260223-WA0026.jpg", "foto kenangan/IMG-20260303-WA0012.jpg", "foto kenangan/IMG-20260321-WA0013.jpg", "foto kenangan/IMG-20260321-WA0068.jpg", "foto kenangan/IMG-20260504-WA0000.jpg", "foto kenangan/IMG-20260615-WA0012.jpg", "foto kenangan/IMG-20260617-WA0002.jpg", "foto kenangan/IMG_20260210_153500.jpg", "foto kenangan/IMG_20260602_140610.jpg", "foto kenangan/IMG_20260615_191855.jpg", "foto kenangan/IMG_20260819_231152.jpg", "foto kenangan/WhatsApp Image 2026-11-07 at 23.55.30.jpeg", "foto kenangan/WhatsApp Image 2026-11-07 at 23.55.31.jpeg"];
let memoryIndex=0, memoryImages=[];
const $=id=>document.getElementById(id);
function init(){ loadEdits(); }
function checkPassword(){
 const field=$("passwordInput"), value=field.value.trim();
 if(value===correctPassword){$("lockHint").textContent="Yeay! Kejutan terbuka 💗";field.disabled=true;setTimeout(()=>activate("envelopeScreen"),450);}
 else{$("lockHint").textContent="Password belum tepat. Kejutan masih terkunci 💕";field.value="";field.focus();const row=document.querySelector(".password-row");row.classList.remove("shake");void row.offsetWidth;row.classList.add("shake");}
}
function activate(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active");$("backBtn").style.display=["lock","envelopeScreen","menu"].includes(id)?"none":"block"}
function checkDate(d){if(d===correctDate){$("lockHint").textContent="Yeay! Kejutan terbuka 💗";setTimeout(()=>activate("envelopeScreen"),450)}else{$("lockHint").textContent="Ups, belum tepat. Coba tanggal yang lain ya 💕"}}
let celebrationStarted=false;
function playTrumpetFanfare(){
 try{
  const AudioCtx=window.AudioContext||window.webkitAudioContext;
  if(!AudioCtx)return;
  const ctx=new AudioCtx();
  if(ctx.state==='suspended')ctx.resume();
  const master=ctx.createGain();master.gain.setValueAtTime(0.0001,ctx.currentTime);master.gain.exponentialRampToValueAtTime(0.22,ctx.currentTime+0.06);master.gain.setValueAtTime(0.22,ctx.currentTime+1.05);master.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+1.55);master.connect(ctx.destination);
  // Nada fanfare cerah dengan beberapa harmonik agar terdengar seperti terompet.
  const notes=[{f:523.25,t:0,d:.22},{f:659.25,t:.22,d:.22},{f:783.99,t:.44,d:.28},{f:1046.5,t:.74,d:.68}];
  notes.forEach(n=>{
   [1,2,3].forEach((harm,i)=>{
    const osc=ctx.createOscillator(), gain=ctx.createGain();
    osc.type=i===0?'sawtooth':'triangle';osc.frequency.setValueAtTime(n.f*harm,ctx.currentTime+n.t);
    gain.gain.setValueAtTime(i===0?.10:(i===1?.035:.012),ctx.currentTime+n.t);
    gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+n.t+n.d);
    osc.connect(gain);gain.connect(master);osc.start(ctx.currentTime+n.t);osc.stop(ctx.currentTime+n.t+n.d+.02);
   });
  });
  setTimeout(()=>ctx.close().catch(()=>{}),2100);
 }catch(e){console.log('Audio fanfare tidak dapat diputar:',e)}
}
function launchConfetti(){
 const layer=document.createElement('div');layer.className='confetti-layer';layer.setAttribute('aria-hidden','true');document.body.appendChild(layer);
 const colors=['#ff3dbb','#ffd84d','#7df5ff','#8cff7a','#ffffff','#ff8b45','#c69bff','#ff5f7e'];
 const emojis=['🎉','🎊','✨','💖','🌟','🥳'];
 for(let i=0;i<190;i++){
  const piece=document.createElement('span');
  const isEmoji=i%17===0;
  piece.className='confetti-piece'+(isEmoji?' emoji':'');
  piece.style.setProperty('--x',(Math.random()*100)+'vw');
  piece.style.setProperty('--w',isEmoji?(18+Math.random()*15)+'px':(5+Math.random()*8)+'px');
  piece.style.setProperty('--h',isEmoji?'auto':(8+Math.random()*13)+'px');
  piece.style.setProperty('--c',colors[Math.floor(Math.random()*colors.length)]);
  piece.style.setProperty('--r',Math.random()>.5?'50%':'2px');
  piece.style.setProperty('--dur',(2.4+Math.random()*2.1)+'s');
  piece.style.setProperty('--delay',(Math.random()*.85)+'s');
  piece.style.setProperty('--rot',(Math.random()*360)+'deg');
  piece.style.setProperty('--spin',(540+Math.random()*1100)+'deg');
  piece.style.setProperty('--drift',((Math.random()-.5)*38)+'vw');
  if(isEmoji)piece.textContent=emojis[Math.floor(Math.random()*emojis.length)];
  layer.appendChild(piece);
 }
 setTimeout(()=>layer.remove(),5700);
}
function openEnvelope(){
 if(celebrationStarted)return;
 celebrationStarted=true;
 $('envelope').classList.add('open');
 launchConfetti();playTrumpetFanfare();
 setTimeout(()=>activate('menu'),950);
}
function animateMessageWords(){
 const el=$("letterText"), raw=localStorage.letter||defaults.letter;el.textContent="";
 let word=0;raw.split(/(\s+)/).forEach(part=>{if(!part)return;if(/^\s+$/.test(part)){el.appendChild(document.createTextNode(part));return;}const span=document.createElement("span");span.className="word-reveal";span.textContent=part;span.style.setProperty("--word-delay",(word*.075)+"s");el.appendChild(span);word++;});
}
function showPage(id){activate(id);if(id==="letter")animateMessageWords();if(id==="memory"){const p=$("memoryPhoto");p.classList.remove("photo-changing");void p.offsetWidth;p.classList.add("photo-changing");}}
function goMenu(){activate("menu")}
function toggleEditor(){$("editor").classList.toggle("show");if($("editor").classList.contains("show"))fillEditor()}
function fillEditor(){
 $("eLockTitle").value=localStorage.lockTitle||defaults.lockTitle;
 $("eName").value=localStorage.name||defaults.name;
 $("eLetter").value=localStorage.letter||defaults.letter;
 $("eCaption").value=localStorage.caption||defaults.caption;
 $("eGift").value=localStorage.gift||defaults.gift;
 $("eSong").value=localStorage.song||defaults.song;$("eArtist").value=localStorage.artist||defaults.artist;
}
function saveEdits(){
 ["lockTitle","name","letter","caption","gift","song","artist"].forEach(k=>localStorage[k]=$("e"+k[0].toUpperCase()+k.slice(1)).value);
 if($("eMainPhoto").files[0]) compressImage($("eMainPhoto").files[0],url=>{localStorage.mainPhoto=url;setPhoto("mainPhoto",url)});
 const chosen=[...$("eMemoryPhoto").files];
 if(chosen.length){
   Promise.all(chosen.map(file=>new Promise(resolve=>compressImage(file,resolve))))
     .then(urls=>{memoryImages=urls;memoryIndex=0;localStorage.memoryPhotos=JSON.stringify(urls);renderMemory()});
 }
 if($("eAudio").files[0]){$("audioPlayer").src=URL.createObjectURL($("eAudio").files[0]);}
 applyEdits();$("editor").classList.remove("show");
}
function compressImage(file,cb){
 const reader=new FileReader();
 reader.onload=()=>{
   const img=new Image();
   img.onload=()=>{
     const max=1400, scale=Math.min(1,max/Math.max(img.width,img.height));
     const canvas=document.createElement("canvas");
     canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
     canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
     cb(canvas.toDataURL("image/jpeg",0.78));
   };
   img.src=reader.result;
 };
 reader.readAsDataURL(file);
}
function readFile(file,cb){let r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(file)}
function setPhoto(id,url){$(id).innerHTML="";let img=document.createElement("img");img.src=url;$(id).appendChild(img)}
function applyEdits(){
 $("lockTitle").textContent=localStorage.lockTitle||defaults.lockTitle;
 $("letterText").textContent=localStorage.letter||defaults.letter;
 $("memoryCaption").textContent=localStorage.caption||defaults.caption;
 $("giftText").textContent=localStorage.gift||defaults.gift;
 $("songTitle").textContent=localStorage.song||defaults.song;$("songArtist").textContent=localStorage.artist||defaults.artist;
 if(localStorage.mainPhoto)setPhoto("mainPhoto",localStorage.mainPhoto);else setPhoto("mainPhoto",defaultMainPhoto);
 if(localStorage.memoryPhotos){try{memoryImages=JSON.parse(localStorage.memoryPhotos)||[]}catch(e){memoryImages=defaultMemoryPhotos}}
 else if(localStorage.memoryPhoto){memoryImages=[localStorage.memoryPhoto]}
 else {memoryImages=defaultMemoryPhotos.slice()}
 memoryIndex=0;renderMemory();
 $("audioPlayer").src="assets/still-with-you.mp3";
}
function loadEdits(){applyEdits()}
function resetEdits(){Object.keys(defaults).forEach(k=>localStorage.removeItem(k));["mainPhoto","memoryPhoto","memoryPhotos","audio"].forEach(k=>localStorage.removeItem(k));location.reload()}
function renderMemory(){
 if(memoryImages.length){
   memoryIndex=(memoryIndex+memoryImages.length)%memoryImages.length;
   setPhoto("memoryPhoto",memoryImages[memoryIndex]);
   $("memoryCount").textContent=`Foto ${memoryIndex+1} dari ${memoryImages.length}`;
 }else{
   $("memoryCount").textContent="Belum ada foto — tambahkan lewat tombol ⚙";
 }
}
function changeMemory(dir){if(!memoryImages.length)return;memoryIndex=(memoryIndex+dir+memoryImages.length)%memoryImages.length;renderMemory();const p=$("memoryPhoto");p.classList.remove("photo-changing");void p.offsetWidth;p.classList.add("photo-changing");}

// Langit romantis interaktif: bintang, hati, garis penghubung, dan efek sentuhan.
function initLoveSky(){
 const canvas=$('loveSky'); if(!canvas)return;
 const ctx=canvas.getContext('2d'); if(!ctx)return;
 let w=0,h=0,dpr=1,mouse={x:-9999,y:-9999},tick=0;
 const particles=[],bursts=[];
 const rand=(a,b)=>a+Math.random()*(b-a);
 function resize(){dpr=Math.min(window.devicePixelRatio||1,2);w=window.innerWidth;h=window.innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
  const count=Math.max(36,Math.min(90,Math.floor(w*h/14500)));
  while(particles.length<count)particles.push({x:rand(0,w),y:rand(0,h),vx:rand(-.18,.18),vy:rand(-.22,.12),r:rand(1.2,2.8),phase:rand(0,Math.PI*2),kind:Math.random()<.23?'heart':'star'});
  while(particles.length>count)particles.pop();
 }
 function drawStar(x,y,r,alpha){ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI/4);ctx.globalAlpha=alpha;ctx.strokeStyle='#ffe6fa';ctx.lineWidth=1.1;ctx.shadowColor='#ffc6ef';ctx.shadowBlur=10;ctx.beginPath();ctx.moveTo(-r,0);ctx.lineTo(r,0);ctx.moveTo(0,-r);ctx.lineTo(0,r);ctx.stroke();ctx.restore();}
 function drawHeart(x,y,r,alpha){ctx.save();ctx.translate(x,y);ctx.scale(r/10,r/10);ctx.globalAlpha=alpha;ctx.fillStyle='#ffb8e9';ctx.shadowColor='#ff70d1';ctx.shadowBlur=12;ctx.beginPath();ctx.moveTo(0,8);ctx.bezierCurveTo(-17,-3,-10,-14,0,-7);ctx.bezierCurveTo(10,-14,17,-3,0,8);ctx.fill();ctx.restore();}
 function burst(x,y){for(let i=0;i<13;i++){const a=Math.PI*2*i/13+rand(-.15,.15),v=rand(.7,2.4);bursts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,kind:Math.random()<.5?'heart':'star',r:rand(2,4)});}}
 function frame(){tick+=.016;ctx.clearRect(0,0,w,h);
  for(const q of particles){q.x+=q.vx;q.y+=q.vy;if(q.x< -12)q.x=w+12;if(q.x>w+12)q.x=-12;if(q.y< -12)q.y=h+12;if(q.y>h+12)q.y=-12;
   const dx=mouse.x-q.x,dy=mouse.y-q.y,dist=Math.hypot(dx,dy);if(dist<115&&dist>1){q.x-=dx/dist*.22;q.y-=dy/dist*.22;}
   q.alpha=.35+.55*(.5+.5*Math.sin(tick*1.7+q.phase));
  }
  // Garis tipis hanya menghubungkan titik yang berdekatan, seperti rasi bintang.
  for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){const a=particles[i],b=particles[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<112){ctx.strokeStyle='rgba(255,220,247,'+(0.15*(1-d/112))+')';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
  for(const q of particles){if(q.kind==='heart')drawHeart(q.x,q.y,q.r*1.35,q.alpha);else drawStar(q.x,q.y,q.r*1.8,q.alpha);}
  for(let i=bursts.length-1;i>=0;i--){const b=bursts[i];b.x+=b.vx;b.y+=b.vy;b.vx*=.98;b.vy*=.98;b.life-=.018;if(b.kind==='heart')drawHeart(b.x,b.y,b.r*1.5,b.life);else drawStar(b.x,b.y,b.r*2,b.life);if(b.life<=0)bursts.splice(i,1);}
  requestAnimationFrame(frame);
 }
 document.addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;});
 document.addEventListener('pointerleave',()=>{mouse.x=-9999;mouse.y=-9999;});
 document.addEventListener('click',e=>{if(e.target.closest('button,input,textarea,a,.envelope'))return;burst(e.clientX,e.clientY);});
 window.addEventListener('resize',resize,{passive:true});resize();frame();
}

initLoveSky();
init();