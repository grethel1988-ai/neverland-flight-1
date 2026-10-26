/* ===== 永無島的初次飛翔 — 遊戲主程式 ===== */
(() => {
'use strict';
const $ = s => document.querySelector(s);
const IMG = n => `assets/img/${n}.webp`;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];

/* ---------- 角色與台詞 ---------- */
const PARTNERS = {
  michael: { name: '麥克', img: 'michael_darling', tag: '抱著泰迪熊的小弟',
    hello: '我、我是麥克！我的小熊不見了……你願意陪我一起找嗎？小熊說牠也想認識你喔！',
    right: ['哇！你好厲害！小熊也在我懷裡拍手喔！（雖然牠只剩一隻眼睛看得到）', '答對了！等找到小熊，我要讓牠親你一下！', '耶～你比溫蒂姊姊講的睡前故事還要神奇！', '好棒好棒！我決定把我的餅乾分你一半……不，三分之一！'],
    wrong: ['沒關係啦！我上次把「熊」寫成「能」，小熊還不是原諒我了～', '嗚……沒關係，我們一起再想想，小熊說牠相信你！', '咦？跟我一樣呢！約翰哥哥說錯了才會記得更牢！', '別難過，抱一下小熊就會好了……借你抱一下下就好喔！'] },
  tink: { name: '奇妙仙子', img: 'tinker_bell', angry: 'tinker_bell_annoyed', tag: '傲嬌的仙塵精靈',
    hello: '哼！叫你跟來就跟來，別拖我後腿喔！……我才不是擔心你迷路呢！',
    right: ['哼，還、還算可以啦！賞你一點點仙塵！✨', '答對是應該的！……不過，剛剛那題真的有點帥。', '叮鈴～看在你這麼努力的份上，今天就不叫你笨蛋了！', '嗯哼，彼得都不一定答得出來呢！（別跟他說是我說的）'] ,
    wrong: ['叮叮叮！！錯了啦！我氣得都變紅了你看到沒有！', '你、你是故意的吧？再錯一次我就把你變成癩蛤蟆！', '哼！我的仙塵可不是給你這樣浪費的！……好啦，再給你一次機會。', '笨蛋笨蛋！……咳，下次仔細看題目，聽到沒有！'] },
  slightly: { name: '史萊特利', img: 'slightly', tag: '穿狐狸裝的機靈男孩',
    hello: '嘿嘿，我可是失落男孩裡最聰明的狐狸！跟著我，保證不會迷路……大概啦！',
    right: ['看吧！就跟我想的一模一樣！（我剛剛真的有想到喔）', '不愧是我挑中的夥伴，狐狸的眼光果然準！', '漂亮！這招我也會，只是讓給你表現而已～', '哈哈！我的狐狸尾巴都忍不住搖起來了！'],
    wrong: ['咳咳……這題連聰明的狐狸也會被騙啦，不怪你！', '嗯……其實我剛剛也想選那個，我們是同一國的！', '沒事沒事，狐狸也有掉進陷阱的時候，爬出來就好！', '欸，這題一定是虎克出的，太狡猾了！'] },
  tootles: { name: '圖特斯', img: 'tootles', tag: '穿臭鼬裝的憨厚男孩',
    hello: '你、你好……我是圖特斯，常常跌倒，但我會努力不拖累大家的！',
    right: ['哇啊！答對了！我高興得又跌倒了……不過好值得！', '你好厲害……可以教我嗎？我拿小餅乾跟你換！', '太好了！我的臭鼬尾巴開心到快要放出香味了……開玩笑的啦！', '我、我要把這一刻記在樹屋的牆上！'],
    wrong: ['沒關係！我昨天也答錯，還撞到樹三次呢，嘿嘿……', '別擔心，跌倒了就站起來，我最有經驗了！', '嗚哇……這題好難喔，我們一起慢慢想。', '不要難過啦，我把我最好看的松果送給你！'] },
};
const CAST = { tink: 'tinker_bell', tinkAngry: 'tinker_bell_annoyed', michael: 'michael_darling', slightly: 'slightly', tootles: 'tootles', croc: 'giant_crocodile', cubby: 'nibs', peter: 'peter_pan', wendy: 'wendy_darling', boys: 'lost_boys', john: 'john_darling' };

/* ---------- 關卡設定 ---------- */
const STAGES = [
  { name: '第一關　精靈山谷的仙塵步道', short: '精靈山谷', bg: 'neverland', inds: ['3-Ⅰ-1', '3-Ⅰ-2', '3-Ⅰ-3', '4-Ⅰ-5'],
    story: [
      { who: '旁白', text: '尋熊小隊來到閃閃發光的精靈山谷，空氣中飄著金色的仙塵……' },
      { who: '奇妙仙子', img: 'tinkAngry', angry: true, side: 'right', text: '叮叮叮！！可惡！我的仙塵撞到拼音障礙了，飛不過去啦！' },
      { who: '麥克', img: 'michael', side: 'left', text: '仙子姊姊不要生氣……我們幫你找出正確的拼音路徑好不好？' },
      { who: '奇妙仙子', img: 'tink', side: 'right', text: '哼，那就試試看吧！注音和筆畫答對了，我就灑仙塵讓大家飛更高！' } ] },
  { name: '第二關　失落男孩的樹屋派對', short: '樹屋派對', bg: 'lost_boys_underground_home', inds: ['4-Ⅰ-1', '4-Ⅰ-2', '4-Ⅰ-3', '四字語詞'],
    story: [
      { who: '旁白', text: '仙塵帶著大家飛進了地底下的神祕樹屋，這裡亂得像被颱風掃過！' },
      { who: '庫比', img: 'cubby', side: 'right', text: '我想幫麥克布置樹屋，可是……一「隻」大樹？一「棵」小熊？好混亂啊！' },
      { who: '圖特斯', img: 'tootles', side: 'left', text: '我們一起把字詞整理好，說不定能在沙發底下找到小熊的線索！' } ] },
  { name: '第三關　沙灘上的滴答腳印', short: '滴答沙灘', bg: 'coastal_scene_in_neverland', inds: ['5-Ⅰ-2', '5-Ⅰ-3', '5-Ⅰ-7'],
    story: [
      { who: '旁白', text: '在沙發下找到一隻棉花耳朵後，大家追著線索來到了白色沙灘。' },
      { who: '？？？', img: 'croc', side: 'right', text: '滴答……滴答……（巨大的鱷魚似笑非笑地張著嘴）' },
      { who: '麥克', img: 'michael', side: 'left', text: '啊！我的小熊掛在河對岸的椰子樹上！可是鱷魚擋在前面……' },
      { who: '史萊特利', img: 'slightly', side: 'left', text: '鱷魚每走一步，肚子就會浮現文字！踩對字磚就能過河，大家衝啊！' } ] },
];
const ENDING = [
  { who: '旁白', text: '最後一塊字磚亮起，大家一口氣跳過了河！' },
  { who: '麥克', img: 'michael', side: 'left', text: '小熊！！我找到你了！（緊緊抱住少了一隻眼睛的泰迪熊）謝謝你，{name}！' },
  { who: '彼得潘', img: 'peter', side: 'right', text: '哈哈！幹得好，{name}！你已經是真正的永無島勇士了！' },
  { who: '奇妙仙子', img: 'tink', side: 'right', text: '哼……這次就勉強承認你很厲害吧！這張證書是給你的！' } ];
const PROLOGUE = '「只要想著快樂的事，你就能飛！」\n達林家最小的弟弟麥克緊緊抱著少了一隻眼睛的泰迪熊，在奇妙仙子金色仙塵的圍繞下，搖搖晃晃地飛進了永無島。然而，一陣怪風吹過，小熊玩偶掉進了島上的神祕角落！\n穿著狐狸裝的史萊特利、臭鼬裝的圖特斯等失落男孩決定組成「尋熊小隊」。樹叢裡傳來「滴答、滴答」的聲音……你，願意加入嗎？';
const DIFF = { 25: { name: '見習飛行員', lives: 5 }, 40: { name: '仙塵冒險家', lives: 7 }, 50: { name: '永無島英雄', lives: 10 } };
const GUMMY_COLORS = [['#ffd23f', '#e0a800'], ['#7ed957', '#3f9e2a'], ['#ff5a6e', '#c9223a']];
const gummy = (k, lost) => { const [c, d] = GUMMY_COLORS[k % 3]; return `<svg class="gummy${lost ? ' lost' : ''}" viewBox="0 0 40 48" aria-hidden="true"><g fill="${c}" stroke="${d}" stroke-width="1.5"><circle cx="10" cy="8" r="6"/><circle cx="30" cy="8" r="6"/><ellipse cx="20" cy="15" rx="12" ry="10"/><ellipse cx="8" cy="28" rx="5" ry="6"/><ellipse cx="32" cy="28" rx="5" ry="6"/><ellipse cx="20" cy="32" rx="12" ry="13"/><ellipse cx="11" cy="43" rx="6" ry="4.5"/><ellipse cx="29" cy="43" rx="6" ry="4.5"/></g><ellipse cx="15" cy="27" rx="3" ry="6" fill="#fff" opacity=".55"/><circle cx="16" cy="14" r="1.6" fill="${d}"/><circle cx="24" cy="14" r="1.6" fill="${d}"/></svg>`; };
const IND_NAME = { '3-Ⅰ-1': '注音拼讀', '3-Ⅰ-2': '注音識字', '3-Ⅰ-3': '注音表達', '4-Ⅰ-1': '常用字詞', '4-Ⅰ-2': '部首部件', '4-Ⅰ-3': '查字典', '4-Ⅰ-5': '筆畫筆順', '5-Ⅰ-2': '標點符號', '5-Ⅰ-3': '閱讀理解', '5-Ⅰ-7': '句子與連接詞', '四字語詞': '四字語詞' };
const TYPE_NAME = { mc: '選擇題', match: '拖曳配對', fill: '拖曳填空', cat: '分類題', order: '排序題' };

/* ---------- 狀態 ---------- */
const S = { name: '', n: 0, partner: null, qs: [], i: 0, right: 0, lives: 0, stage: -1, answered: false };

/* ---------- 畫面切換 ---------- */
function show(id) { document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id)); }
function setBg(n) { $('#bg').style.backgroundImage = `url(${IMG(n)})`; }

/* ---------- 打字機 ---------- */
let typeTimer = null, typeDone = null;
function typeText(el, text, speed = 28) {
  clearInterval(typeTimer); el.textContent = ''; let k = 0;
  return new Promise(res => {
    typeDone = () => { clearInterval(typeTimer); el.textContent = text; typeDone = null; res(); };
    typeTimer = setInterval(() => { el.textContent = text.slice(0, ++k); if (k >= text.length) typeDone && typeDone(); }, speed);
  });
}

/* ---------- 封面 ---------- */
function initTitle() {
  setBg('cover'); show('scr-title'); typeText($('#prologue'), PROLOGUE, 35);
  document.querySelectorAll('.diff').forEach(b => b.onclick = () => {
    document.querySelectorAll('.diff').forEach(x => x.classList.remove('on')); b.classList.add('on'); S.n = +b.dataset.n; $('#title-err').textContent = '';
  });
  $('#btn-start').onclick = () => {
    const nm = $('#inp-name').value.trim();
    if (!nm) { $('#title-err').textContent = '⚠ 請先輸入你的名字，奇妙仙子才知道要叫誰喔！'; $('#inp-name').focus(); return; }
    if (!S.n) { $('#title-err').textContent = '⚠ 請選擇一種冒險難度！'; return; }
    S.name = nm; initPartner();
  };
  $('#inp-name').onkeydown = e => { if (e.key === 'Enter') $('#btn-start').click(); };
}

/* ---------- 選夥伴 ---------- */
function initPartner() {
  show('scr-partner'); setBg('misty_forest');
  const g = $('#partner-grid'); g.innerHTML = '';
  Object.entries(PARTNERS).forEach(([k, p]) => {
    const c = document.createElement('button'); c.className = 'pcard'; c.id = 'partner-' + k;
    c.innerHTML = `<img src="${IMG(p.img)}" alt="${p.name}"><div class="pc-cap"><b>${p.name}</b><small>${p.tag}</small></div>`;
    c.onclick = () => {
      g.querySelectorAll('.pcard').forEach(x => x.classList.remove('on')); c.classList.add('on');
      S.partner = k; $('#pv-name').textContent = p.name; typeText($('#pv-text'), p.hello); $('#btn-partner-go').disabled = false;
    };
    g.appendChild(c);
  });
  $('#btn-partner-go').onclick = startGame;
}

/* ---------- 抽題（指標保證機制） ---------- */
function buildQuiz(n) {
  const all = [...BANK_MC.map(q => ({ ...q })), ...BANK_DRAG.map(q => ({ ...q }))];
  const inds = [...new Set(all.map(q => q.ind))];
  const chosen = new Set();
  // 1) 每個學習表現至少 1 題（優先選拖拉題，讓題型更多元）
  shuffle(inds).forEach((ind, k) => {
    const pool = all.filter(q => q.ind === ind);
    const drags = pool.filter(q => q.type !== 'mc');
    chosen.add(k % 2 === 0 && drags.length ? pick(drags) : pick(pool));
  });
  // 2) 拖拉題約占 30%
  const dragTarget = Math.round(n * 0.3);
  for (const q of shuffle(all.filter(q => q.type !== 'mc'))) { if ([...chosen].filter(x => x.type !== 'mc').length >= dragTarget) break; chosen.add(q); }
  // 3) 其餘以選擇題補足
  for (const q of shuffle(all.filter(q => q.type === 'mc'))) { if (chosen.size >= n) break; chosen.add(q); }
  // 4) 依關卡分組
  const stageOf = q => STAGES.findIndex(s => s.inds.includes(q.ind));
  let list = [...chosen].slice(0, n);
  const out = [];
  STAGES.forEach((_, si) => {
    let grp = shuffle(list.filter(q => stageOf(q) === si));
    // 同一篇閱讀的題目排在一起
    grp.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    grp.forEach(q => { q.stage = si; out.push(q); });
  });
  return out;
}

function startGame() {
  S.qs = buildQuiz(S.n); S.i = 0; S.right = 0; S.stage = -1; S.lives = DIFF[S.n].lives;
  const p = PARTNERS[S.partner]; $('#fb-name').textContent = p.name; setFace(p.img);
  nextQuestion();
}

/* ---------- 劇情播放 ---------- */
function playStory(lines, bg, banner) {
  return new Promise(res => {
    show('scr-story'); setBg(bg); $('#st-banner').textContent = banner; $('#st-banner').hidden = !banner;
    const L = $('#st-left'), R = $('#st-right'); L.className = 'stand left'; R.className = 'stand right';
    let k = 0, busy = false;
    const step = async () => {
      if (typeDone) { typeDone(); return; }
      if (k >= lines.length) { $('#scr-story').onclick = null; res(); return; }
      const ln = lines[k++];
      const text = ln.text.replace(/\{name\}/g, S.name);
      $('#st-name').textContent = ln.who;
      if (ln.img) {
        const el = ln.side === 'left' ? L : R, other = ln.side === 'left' ? R : L;
        el.style.backgroundImage = `url(${IMG(CAST[ln.img])})`;
        el.className = `stand ${ln.side} show${ln.angry ? ' angry' : ''}`;
        if (other.classList.contains('show')) other.classList.add('dim');
      }
      typeText($('#st-text'), text);
    };
    $('#scr-story').onclick = step; step();
  });
}

/* ---------- 題目流程 ---------- */
async function nextQuestion() {
  if (S.i >= S.qs.length) return finish();
  const q = S.qs[S.i];
  if (q.stage !== S.stage) {
    S.stage = q.stage; const st = STAGES[S.stage];
    await playStory(st.story, st.bg, st.name);
    setBg(st.bg); $('#hud-stage').textContent = st.short;
  }
  show('scr-quiz'); renderQuestion(q);
}

function updateHud() {
  $('#hud-bar').style.width = (S.i / S.qs.length * 100) + '%';
  $('#hud-count').textContent = `第 ${S.i + 1} / ${S.qs.length} 題`;
  $('#hud-score').textContent = Math.round(S.right / S.qs.length * 100);
  $('#hud-name').textContent = '🧭 ' + S.name;
  $('#hud-diff').textContent = DIFF[S.n].name;
  const life = $('#hud-life');
  if (DIFF[S.n].lives) { const L = DIFF[S.n].lives; life.innerHTML = Array.from({ length: L }, (_, k) => gummy(k, k >= S.lives)).join(''); }
  else life.innerHTML = '';
}

function setFace(img, mood) { const f = $('#fb-face'); f.style.backgroundImage = `url(${IMG(img)})`; f.className = 'face' + (mood ? ' ' + mood : ''); }

function renderQuestion(q) {
  S.answered = false; updateHud();
  $('#q-tag').textContent = `${IND_NAME[q.ind] || q.ind}｜${TYPE_NAME[q.type]}`;
  $('#q-text').textContent = q.q;
  const ps = $('#passage');
  if (q.passage) { ps.hidden = false; $('#ps-title').textContent = q.title || '閱讀短文'; $('#ps-text').textContent = q.passage; } else ps.hidden = true;
  $('#btn-next').hidden = true; $('#btn-check').hidden = q.type === 'mc'; $('#btn-check').disabled = true;
  const p = PARTNERS[S.partner]; setFace(p.img);
  $('#fb-text').textContent = q.type === 'mc' ? '仔細看清楚，選出正確答案吧！' : '把答案卡片拖到框框裡（也可以先點卡片、再點框框）！';
  const area = $('#q-area'); area.innerHTML = '';
  if (q.type === 'mc') renderMC(q, area); else renderDrag(q, area);
}

/* 選擇題 */
function renderMC(q, area) {
  const order = shuffle([0, 1, 2, 3]);
  const box = document.createElement('div'); box.className = 'opts';
  order.forEach((oi, k) => {
    const b = document.createElement('button'); b.className = 'opt'; b.id = 'opt-' + k;
    b.innerHTML = `<span class="k">${'ABCD'[k]}</span><span></span>`; b.lastChild.textContent = q.opts[oi];
    b.dataset.oi = oi;
    b.onclick = () => {
      if (S.answered) return;
      const ok = oi === q.ans;
      box.querySelectorAll('.opt').forEach(x => { x.disabled = true; });
      b.classList.add(ok ? 'right' : 'wrong');
      judge(ok, q);
    };
    box.appendChild(b);
  });
  area.appendChild(box);
  S.reveal = () => box.querySelector(`[data-oi="${q.ans}"]`).click();
}

/* 拖拉題 */
let selChip = null;
function makeChip(text) { const c = document.createElement('div'); c.className = 'chip'; c.textContent = text; c.dataset.v = text; bindChip(c); return c; }
function renderDrag(q, area) {
  const zones = []; // {el, expect:[...], cap}
  const mkDrop = (expect, cap = 1) => { const d = document.createElement('div'); d.className = 'drop'; d.dataset.cap = cap; zones.push({ el: d, expect, cap }); return d; };
  let chips = [];
  if (q.type === 'match') {
    const g = document.createElement('div'); g.className = 'match-grid';
    q.pairs.forEach(([l, r]) => { const row = document.createElement('div'); row.className = 'mrow'; row.innerHTML = `<span class="lbl"></span><span>→</span>`; row.firstChild.textContent = l; row.appendChild(mkDrop([r])); g.appendChild(row); });
    area.appendChild(g); chips = q.pairs.map(p => p[1]);
  } else if (q.type === 'fill') {
    const t = document.createElement('div'); t.className = 'fill-text'; const parts = q.text.split('{}');
    parts.forEach((s, k) => { t.appendChild(document.createTextNode(s)); if (k < parts.length - 1) t.appendChild(mkDrop([q.answers[k]])); });
    area.appendChild(t); chips = [...q.answers, ...(q.distract || [])];
  } else if (q.type === 'cat') {
    const row = document.createElement('div'); row.className = 'cat-row';
    q.cats.forEach((c, ci) => { const col = document.createElement('div'); col.className = 'cat'; col.innerHTML = '<h4></h4>'; col.firstChild.textContent = c; const exp = q.items.filter(it => it[1] === ci).map(it => it[0]); col.appendChild(mkDrop(exp, exp.length)); row.appendChild(col); });
    area.appendChild(row); chips = q.items.map(it => it[0]);
  } else if (q.type === 'order') {
    const row = document.createElement('div'); row.className = 'order-row';
    q.items.forEach((it, k) => { const d = mkDrop([it]); d.dataset.i = k + 1; row.appendChild(d); });
    area.appendChild(row); chips = q.items.slice();
  }
  const pool = document.createElement('div'); pool.className = 'pool'; pool.id = 'pool';
  let sh = shuffle(chips); if (q.type === 'order' && sh.join() === chips.join()) sh = sh.reverse();
  sh.forEach(t => pool.appendChild(makeChip(t)));
  area.appendChild(pool);
  S.zones = zones; S.pool = pool;
  const chk = $('#btn-check');
  S.refresh = () => { chk.disabled = !zones.every(z => z.el.querySelectorAll('.chip').length >= z.cap); };
  chk.onclick = () => {
    if (S.answered) return;
    let ok = true;
    zones.forEach(z => {
      const got = [...z.el.querySelectorAll('.chip')].map(c => c.dataset.v).sort().join('|');
      const good = got === z.expect.slice().sort().join('|');
      z.el.classList.add(good ? 'ok' : 'ng'); if (!good) ok = false;
    });
    chk.hidden = true; judge(ok, q);
  };
  S.reveal = () => { zones.forEach(z => { z.el.innerHTML = ''; z.expect.forEach(v => { const c = [...pool.children].find(x => x.dataset.v === v); z.el.appendChild(c || makeChip(v)); }); }); S.refresh(); };
}

function placeChip(chip, target) {
  if (S.answered) return;
  if (target && target.classList.contains('drop')) {
    const cap = +target.dataset.cap, inside = target.querySelectorAll('.chip');
    if (inside.length >= cap) S.pool.appendChild(inside[0]); // 換掉舊的
    target.appendChild(chip);
  } else S.pool.appendChild(chip);
  S.refresh && S.refresh();
}
function bindChip(c) {
  c.addEventListener('pointerdown', e => {
    if (S.answered) return;
    e.preventDefault();
    const sx = e.clientX, sy = e.clientY; let dragging = false; const ghost = $('#ghost');
    const move = ev => {
      if (!dragging && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) { dragging = true; ghost.textContent = c.textContent; ghost.hidden = false; c.style.opacity = .35; }
      if (dragging) {
        ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px';
        document.querySelectorAll('.drop.hover').forEach(d => d.classList.remove('hover'));
        const t = document.elementFromPoint(ev.clientX, ev.clientY); const d = t && t.closest('.drop'); if (d) d.classList.add('hover');
      }
    };
    const up = ev => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
      document.querySelectorAll('.drop.hover').forEach(d => d.classList.remove('hover'));
      ghost.hidden = true; c.style.opacity = '';
      if (dragging) {
        const t = document.elementFromPoint(ev.clientX, ev.clientY);
        const d = t && t.closest('.drop');
        if (d) placeChip(c, d); else if (t && t.closest('.pool')) placeChip(c, null);
        if (selChip) { selChip.classList.remove('sel'); selChip = null; }
      }
      else { // 點選模式
        if (c.parentElement.classList.contains('drop')) { placeChip(c, null); return; }
        if (selChip === c) { c.classList.remove('sel'); selChip = null; return; }
        if (selChip) selChip.classList.remove('sel'); selChip = c; c.classList.add('sel');
      }
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  });
}
document.addEventListener('click', e => {
  const d = e.target.closest('.drop');
  if (d && selChip && !e.target.closest('.chip')) { selChip.classList.remove('sel'); placeChip(selChip, d); selChip = null; }
});

/* ---------- 判定 ---------- */
function judge(ok, q) {
  S.answered = true;
  const p = PARTNERS[S.partner];
  if (ok) { S.right++; burst(); setFace(p.img, 'happy'); }
  else { if (DIFF[S.n].lives) S.lives--; setFace(p.angry || p.img, p.angry ? 'angry' : ''); }
  const line = pick(ok ? p.right : p.wrong).replace(/\{name\}/g, S.name);
  const fb = $('#fb-text'); fb.textContent = (ok ? '⭕ ' : '❌ ') + line;
  updateHud();
  const nb = $('#btn-next'); nb.hidden = false;
  const dead = DIFF[S.n].lives && S.lives <= 0;
  nb.textContent = dead ? '……' : (S.i === S.qs.length - 1 ? '完成冒險 ▶' : '下一題 ▶');
  nb.onclick = () => { if (dead) return gameOver(); S.i++; nextQuestion(); };
}

function gameOver() {
  show('scr-over'); const p = PARTNERS[S.partner];
  $('#over-face').style.backgroundImage = `url(${IMG(p.angry || p.img)})`;
  $('#over-text').textContent = `${p.name}：「${S.name}，小熊軟糖都吃光了……不過別灰心，再試一次一定可以找到小熊的！」（答對 ${S.right} 題）`;
  $('#btn-retry').onclick = () => startGame();
}

async function finish() {
  $('#hud-bar').style.width = '100%';
  await playStory(ENDING, 'coastal_scene_in_neverland', '任務完成！');
  showCert();
}
function showCert() {
  show('scr-cert'); setBg('neverland');
  const total = S.qs.length || S.n, rate = S.right / total;
  $('#c-name').textContent = S.name || '冒險者';
  $('#c-partner').textContent = PARTNERS[S.partner || 'michael'].name;
  $('#c-diff').textContent = DIFF[S.n || 25].name;
  $('#c-right').textContent = S.right; $('#c-total').textContent = total;
  $('#c-score').textContent = Math.round(rate * 100);
  $('#c-rank').textContent = rate >= .9 ? '★★★ 金色仙塵勳章 ★★★' : rate >= .7 ? '★★ 銀色星光勳章 ★★' : '★ 勇氣小熊勳章 ★';
  const d = new Date(); $('#c-date').textContent = `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  burst(80);
  $('#btn-print').onclick = () => window.print();
  $('#btn-again').onclick = () => startGame();
}

/* ---------- 仙塵粒子 ---------- */
const cv = $('#dust'), cx = cv.getContext('2d'); let parts = [];
function resize() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
addEventListener('resize', resize); resize();
for (let k = 0; k < 60; k++) parts.push({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + .5, vy: Math.random() * .0006 + .0002, t: Math.random() * 6, life: Infinity });
function burst(n = 40) { for (let k = 0; k < n; k++) parts.push({ x: .5 + (Math.random() - .5) * .4, y: .45, r: Math.random() * 3 + 1, vx: (Math.random() - .5) * .012, vy: -Math.random() * .012, t: 0, life: 90, g: true }); }
(function loop() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter(p => p.life > 0);
  for (const p of parts) {
    if (p.g) { p.x += p.vx; p.y += p.vy; p.vy += .0003; p.life--; } else { p.y -= p.vy; p.t += .03; if (p.y < -.02) p.y = 1.02; }
    const a = p.g ? p.life / 90 : (Math.sin(p.t) + 1) / 2 * .8 + .2;
    const X = (p.x + (p.g ? 0 : Math.sin(p.t) * .003)) * cv.width, Y = p.y * cv.height, R = p.r * devicePixelRatio;
    const gr = cx.createRadialGradient(X, Y, 0, X, Y, R * 3); gr.addColorStop(0, `rgba(255,240,170,${a})`); gr.addColorStop(1, 'rgba(255,200,80,0)');
    cx.fillStyle = gr; cx.beginPath(); cx.arc(X, Y, R * 3, 0, 7); cx.fill();
  }
  requestAnimationFrame(loop);
})();

/* ---------- 開發者快捷鍵 F2 / F3 / F4（僅本地開發） ---------- */
const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname) || location.protocol === 'file:';
function devMsg(t) { const d = $('#dev'); d.textContent = '[DEV] ' + t; d.hidden = false; clearTimeout(devMsg.t); devMsg.t = setTimeout(() => d.hidden = true, 1800); }
addEventListener('keydown', e => {
  if (!isLocal || !['F2', 'F3', 'F4'].includes(e.key)) return;
  e.preventDefault();
  const quizOn = $('#scr-quiz').classList.contains('active');
  if (e.key === 'F2') { if (quizOn && !S.answered && S.reveal) { S.reveal(); devMsg('F2 顯示答案'); } }
  if (e.key === 'F3') {
    if (!S.qs.length) return devMsg('請先開始遊戲');
    const nx = S.qs.findIndex((q, k) => k > S.i && q.stage > S.stage);
    S.i = nx < 0 ? S.qs.length : nx; devMsg('F3 跳到下一關'); nextQuestion();
  }
  if (e.key === 'F4') { if (!S.name) S.name = $('#inp-name').value.trim() || '測試員'; if (!S.n) S.n = 25; if (!S.partner) S.partner = 'michael'; devMsg('F4 直達證書'); showCert(); }
});

/* 預載圖片 */
['neverland', 'lost_boys_underground_home', 'coastal_scene_in_neverland', 'misty_forest', ...Object.values(CAST), 'tinker_bell_annoyed'].forEach(n => { const i = new Image(); i.src = IMG(n); });

if (isLocal) window.__dbg = { S, show, setBg, renderQuestion, gameOver, showCert, playStory, STAGES, DIFF, PARTNERS, judge };
initTitle();
})();
