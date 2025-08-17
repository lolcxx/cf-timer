function initTimer(){
  const problemId = location.pathname;
  let elapsed = 0;
  let interval = null;
  let startTime;

  const solved =
    document.getElementById('cf-timer')
      .getAttribute('data-already-accepted') === 'yes';

  let isRunning = true;
  if(solved)
    isRunning = false;


  const saved = localStorage.getItem('cf-timer-' + problemId);
  if (saved) elapsed = parseInt(saved, 10);

  function update(ms){
    const total = Math.floor(ms / 1000);
    const h = String(Math.floor(total / 3600)).padStart(2,'0');
    const m = String(Math.floor(total % 3600 / 60)).padStart(2,'0');
    const s = String(total % 60).padStart(2,'0');
    document.getElementById('display').innerText = `${h}:${m}:${s}`;
  }

  function start(){
    if(interval) return;
    isRunning = true;
    document.getElementById('start').innerText = "Pause";
    startTime = Date.now() - elapsed;
    interval = setInterval(()=>{
      elapsed = Date.now() - startTime;
      update(elapsed);
    }, 1000);
  }

  function pause(){
    clearInterval(interval);
    interval = null;
    isRunning = false;
    document.getElementById('start').innerText = "Start";
  }
  document.getElementById('start').onclick = function(){
    if(isRunning)
      pause();
    else
      start();
  };
  // document.getElementById('start').onclick = pause;
  document.getElementById('reset').onclick = function(){
    pause();
    elapsed = 0;
    update(elapsed);
    // start();
  };

  update(elapsed);

  if(!solved){
    start();
  }

  window.addEventListener('beforeunload', ()=>{
    localStorage.setItem('cf-timer-' + problemId, elapsed);
  });
}
initTimer();
