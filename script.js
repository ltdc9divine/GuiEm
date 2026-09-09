const scenes=[...document.querySelectorAll('.scene')];
const fill=document.querySelector('.progress-fill');
const ptxt=document.querySelector('.progress-text');
let current=0;
function goTo(i){
  current=Math.max(0,Math.min(scenes.length-1,i));
  scenes.forEach((s,n)=>{
    s.classList.toggle('active',n===current);
    s.querySelectorAll('.scene-card,.hero-card,.letter,.letter-wrap').forEach(el=>el.scrollTop=0);
  });
  fill.style.width=((current+1)/scenes.length*100)+'%';
  ptxt.textContent=`${current+1} / ${scenes.length}`;
}
document.querySelectorAll('.next').forEach(b=>b.addEventListener('click',()=>goTo(current+1)));

const petals=document.getElementById('petals');
function makePetal(){
  const p=document.createElement('span'); p.className='petal'; p.textContent=Math.random()>.45?'♡':'✿';
  p.style.left=Math.random()*100+'vw'; p.style.setProperty('--x',(Math.random()*180-90)+'px');
  p.style.animationDuration=(7+Math.random()*7)+'s'; p.style.fontSize=(10+Math.random()*12)+'px';
  petals.appendChild(p); setTimeout(()=>p.remove(),15000);
}
setInterval(makePetal,650); for(let i=0;i<8;i++) setTimeout(makePetal,i*250);

// Nút cuối trang thư: bấm là bung trái tim & quay về trang đầu đọc lại từ đầu
document.getElementById('restart').addEventListener('click',()=>{goTo(0);burst();});

function burst(){
  for(let i=0;i<20;i++) setTimeout(makePetal,i*45);
}
const audio=document.getElementById('audio'), mb=document.getElementById('musicBtn');
mb.addEventListener('click',async()=>{
  if(audio.paused){try{await audio.play();mb.textContent='❚❚'}catch(e){mb.textContent='♫';alert('Hãy đặt file nhạc tại assets/music.mp3 rồi bấm lại nhé ♡')}}else{audio.pause();mb.textContent='♫'}
});
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft') goTo(current-1);
  else if(e.key==='ArrowRight'||e.key==='Enter'){
    if(e.key==='Enter'&&document.activeElement&&document.activeElement.tagName==='BUTTON') return;
    goTo(current+1);
  }
});
goTo(0);