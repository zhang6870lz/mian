// Simple carousel script: auto-play, nav buttons, dots, hover pause
(function(){
  const carousel = document.querySelector('.carousel');
  if(!carousel) return;

  const slides = carousel.querySelectorAll('.slide');
  const slidesList = carousel.querySelector('.slides');
  const leftBtn = carousel.querySelector('.nav.left');
  const rightBtn = carousel.querySelector('.nav.right');
  const dots = carousel.querySelectorAll('.dot');
  const total = slides.length;
  let index = 0;
  let timer = null;
  const interval = 2500; // 调整自动播放间隔为 2500ms

  function goTo(i){
    index = (i + total) % total;
    slidesList.style.transform = `translateX(${ -index * 100 }%)`;
    dots.forEach((d, idx)=> d.classList.toggle('active', idx===index));
  }

  function next(){ goTo(index+1) }
  function prev(){ goTo(index-1) }

  rightBtn.addEventListener('click', (e)=>{ e.preventDefault(); next(); resetTimer(); });
  leftBtn.addEventListener('click', (e)=>{ e.preventDefault(); prev(); resetTimer(); });

  dots.forEach((d, idx)=> d.addEventListener('click', ()=>{ goTo(idx); resetTimer(); }));

  function startTimer(){ if(timer) return; timer = setInterval(next, interval); }
  function stopTimer(){ if(!timer) return; clearInterval(timer); timer = null; }
  function resetTimer(){ stopTimer(); startTimer(); }

  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);

  // keyboard support
  carousel.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });

  // init
  goTo(0);
  startTimer();
  // make carousel focusable for keyboard
  carousel.setAttribute('tabindex','0');
})();
