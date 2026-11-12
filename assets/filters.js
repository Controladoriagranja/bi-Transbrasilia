"use strict";
window.BudgetFilters=(()=>{
 const controls=new Map();
 function enhance(select){
  const single=select.dataset.single==='true';
  let options=[...select.options].filter(o=>o.value);const state=new Set(select.value?[select.value]:options.map(o=>o.value));
  if(single&&state.size!==1){state.clear();if(options.length)state.add(options[0].value);}
  const wrap=document.createElement('div');wrap.className='budget-select';
  const button=document.createElement('button');button.type='button';button.className='budget-select-trigger';button.setAttribute('aria-expanded','false');button.disabled=select.disabled;
  const panel=document.createElement('div');panel.className='budget-select-panel';panel.hidden=true;
  const search=document.createElement('input');search.type='search';search.placeholder='Pesquisar ou digitar código/nome';search.setAttribute('aria-label',search.placeholder);
  const allLabel=document.createElement('label'),all=document.createElement('input');all.type='checkbox';allLabel.append(all,document.createTextNode('Selecionar todos'));
  const list=document.createElement('div');list.className='budget-select-options';const count=document.createElement('small');
  panel.append(search,...(single?[]:[allLabel]),list,count);wrap.append(button,panel);select.after(wrap);select.hidden=true;
  function refresh(){const selected=options.filter(o=>state.has(o.value));button.textContent=(single||select.disabled||['ano','mes'].includes(select.id))&&selected.length===1?selected[0].textContent:selected.length===options.length?'Todos':selected.length===1?selected[0].textContent:selected.length+' selecionados';button.title=selected.map(o=>o.textContent).join(', ');all.checked=state.size===options.length;all.indeterminate=state.size>0&&state.size<options.length;list.replaceChildren();const term=search.value.toLocaleLowerCase('pt-BR');for(const o of options.filter(o=>o.textContent.toLocaleLowerCase('pt-BR').includes(term)).slice(0,200)){const label=document.createElement('label'),check=document.createElement('input');check.type=single?'radio':'checkbox';if(single)check.name='filter-'+select.id;check.checked=state.has(o.value);check.onchange=()=>{if(single){state.clear();state.add(o.value);}else{check.checked?state.add(o.value):state.delete(o.value);}apply();if(single){panel.hidden=true;button.setAttribute('aria-expanded','false');button.focus();}};label.append(check,document.createTextNode(o.textContent));list.append(label);}count.textContent=options.length+' opções · pesquise para localizar';}
  function apply(){if(select.disabled)return;select.value=state.size===1?[...state][0]:'';refresh();select.dispatchEvent(new Event('change',{bubbles:true}));}
  button.onclick=()=>{if(select.disabled)return;panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)search.focus();};search.oninput=refresh;all.onchange=()=>{state.clear();if(all.checked)options.forEach(o=>state.add(o.value));apply();};
  document.addEventListener('click',e=>{if(!wrap.contains(e.target)){panel.hidden=true;button.setAttribute('aria-expanded','false');}});wrap.addEventListener('keydown',e=>{if(e.key==='Escape'){panel.hidden=true;button.setAttribute('aria-expanded','false');button.focus();}});
  controls.set(select.id,{replaceOptions:rows=>{if(select.disabled)return;options=rows.map(r=>new Option(r.label,r.value));select.replaceChildren(new Option('Todos',''),...options);const previous=[...state][0];state.clear();if(single){const chosen=options.find(o=>o.value===previous)||options[0];if(chosen)state.add(chosen.value);}else options.forEach(o=>state.add(o.value));select.value=state.size===1?[...state][0]:'';refresh();},values:()=>[...state],set:values=>{if(select.disabled)return;const valid=values.filter(v=>options.some(o=>o.value===v));if(single){const chosen=valid[0]||[...state].find(v=>options.some(o=>o.value===v))||options[0]?.value;state.clear();if(chosen)state.add(chosen);}else{state.clear();valid.forEach(v=>state.add(v));}select.value=state.size===1?[...state][0]:'';refresh();}});refresh();
 }
 return {init:()=>document.querySelectorAll('.com-filter-grid select').forEach(select=>{if(!select.closest('label')?.hidden)enhance(select);}),values:id=>controls.get(id)?.values()??[],set:(id,values)=>controls.get(id)?.set(values),replaceOptions:(id,rows)=>controls.get(id)?.replaceOptions(rows)};
})();
