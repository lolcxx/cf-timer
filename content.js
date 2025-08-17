(async () =>{
  const html = await (await fetch(chrome.runtime.getURL('timer.html'))).text();
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  var sidebar2 = document.getElementById("sidebar");
  sidebar2.prepend(wrapper);

  let accepted = false;
  document.querySelectorAll('.status-verdict-accepted, .status-accepted, td:last-child')
    .forEach(el=>{
      if(el.innerText.trim().toLowerCase() === 'accepted') accepted = true;
    });

  wrapper.querySelector('#cf-timer')
    .setAttribute('data-already-accepted', accepted ? 'yes' : 'no');
    
  const s = document.createElement('script');
  s.src = chrome.runtime.getURL('timer.js');
  document.head.appendChild(s);
})();
