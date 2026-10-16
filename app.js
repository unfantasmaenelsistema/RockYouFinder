(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // ── Textos ──────────────────────────────────────────────────────────────
  const TXT = {
    es: {
      brandSub: 'UN FANTASMA EN EL SISTEMA', lang: 'EN', themeLight: '☀ CLARO', themeDark: '☾ OSCURO',
      title: '¿En qué posición de rockyou.txt está tu contraseña?',
      lead: 'Antes de poner una clave en un reto CTF, mira cuánto tardará el alumno en sacarla con rockyou.txt. El diccionario viene integrado: no hay que cargar nada.',
      statusLoading: 'Cargando índice…',
      statusReady: n => `rockyou.txt integrado · ${n} líneas · se descarga solo el fragmento necesario`,
      statusOwn: (f, n) => `Buscando en ${f} · ${n} líneas (diccionario local)`,
      statusErr: 'No se ha podido cargar el índice. Recarga la página.',
      qLabel: '▸ CONTRASEÑA A COMPROBAR', qPh: 'Escribe la contraseña…', search: 'BUSCAR',
      scenLabel: 'Ataque previsto', perSec: 'intentos/s',
      rateHint: 'Velocidades orientativas en un portátil sin GPU. Cámbialas si conoces la de tu laboratorio.',
      scen: {
        ssh: 'SSH online · Hydra -t 4', ftp: 'FTP online · Hydra', web: 'Formulario web · Hydra/ffuf',
        bcrypt: 'Hash bcrypt (coste 10) · John', sha512: 'Hash Linux $6$ (sha512crypt) · John',
        zipaes: 'ZIP con AES · John', zip: 'ZIP clásico (ZipCrypto) · John',
        md5: 'Hash MD5 / SHA1 · John', ntlm: 'Hash NTLM · John', custom: 'Personalizado'
      },
      searching: 'Buscando…',
      found: 'ENCONTRADA EN', notFound: 'NO ESTÁ EN',
      pos: 'Posición', total: 'Líneas del diccionario', pct: 'Percentil', len: 'Longitud', time: 'Tiempo máx. estimado',
      chars: n => `${n} car.`,
      v: { fast: 'RÁPIDA — ideal para un CTF', ok: 'ACEPTABLE — unos minutos', slow: 'LENTA — puede desesperar', bad: 'DEMASIADO LENTA para un reto' },
      tag: { fast: 'rápida', ok: 'aceptable', slow: 'lenta', bad: 'muy lenta', miss: 'no está' },
      timeNote: (r) => `Con ${r} intentos/s, probando el diccionario en orden (Hydra y John lo recorren de arriba abajo).`,
      latin1: 'Encontrada con codificación Latin-1: esa línea de rockyou.txt no está en UTF-8.',
      spaces: 'Ojo: la palabra empieza o termina con espacios, y cuentan.',
      missNote: 'Un ataque con rockyou.txt tal cual no la sacará nunca. Con reglas (john --rules, hashcat -r best64.rule) sí podría si es una variante de una palabra del diccionario.',
      checkCmd: 'Para comprobarlo en Kali:',
      batchTitle: '▸ COMPROBAR VARIAS CANDIDATAS', batchHint: 'Una por línea (máx. 500). Se ordenan de más rápida a más lenta.',
      batchBtn: 'COMPROBAR LISTA', batchMax: 'Solo se comprueban las 500 primeras.',
      thWord: 'CONTRASEÑA', thPos: 'POSICIÓN', thTime: 'TIEMPO', thVerdict: 'VEREDICTO',
      clickHint: 'Haz clic en una fila para ver el detalle.',
      sugTitle: '▸ SUGERIR UNA CONTRASEÑA', sugHint: 'Elige al azar una contraseña entre las primeras posiciones de rockyou.txt.',
      sugMax: 'Posición máxima', sugMin: 'Longitud mínima', sugLetters: 'con letras', sugBtn: 'SUGERIR 5',
      sugNone: 'Ninguna cumple esos filtros. Prueba con una posición máxima mayor o menos longitud.',
      sugOwn: 'Las sugerencias salen siempre de rockyou.txt.',
      ownTitle: '▸ USAR OTRO DICCIONARIO (LOCAL)',
      ownHint: 'Si quieres buscar en otra wordlist, cárgala aquí. Se lee en tu navegador y no sale de tu equipo. Mientras esté cargada, las búsquedas se hacen en ella.',
      dropTitle: 'Arrastra la wordlist o haz clic', reading: 'Leyendo…', indexing: 'Indexando…',
      ownLoaded: n => `${n} líneas indexadas`, ownClear: 'VOLVER A ROCKYOU.TXT', ownErr: 'No se ha podido leer el archivo.',
      histTitle: '▸ HISTORIAL (ESTA SESIÓN)', histClear: 'LIMPIAR',
      footer: 'Todo ocurre en tu navegador: la contraseña no se envía a ningún sitio. Solo se descarga el fragmento del diccionario donde podría estar.',
      source: 'Código fuente',
      dur: { lt1: '< 1 s', s: 's', m: 'min', h: 'h', d: 'días', y: 'años' }
    },
    en: {
      brandSub: 'A GHOST IN THE SYSTEM', lang: 'ES', themeLight: '☀ LIGHT', themeDark: '☾ DARK',
      title: 'Where is your password in rockyou.txt?',
      lead: 'Before using a password in a CTF challenge, check how long it will take players to crack it with rockyou.txt. The wordlist is built in: nothing to load.',
      statusLoading: 'Loading index…',
      statusReady: n => `rockyou.txt built in · ${n} lines · only the needed chunk is downloaded`,
      statusOwn: (f, n) => `Searching ${f} · ${n} lines (local wordlist)`,
      statusErr: 'Could not load the index. Reload the page.',
      qLabel: '▸ PASSWORD TO CHECK', qPh: 'Type the password…', search: 'SEARCH',
      scenLabel: 'Expected attack', perSec: 'tries/s',
      rateHint: 'Rough speeds on a laptop without GPU. Change them if you know your lab’s rate.',
      scen: {
        ssh: 'Online SSH · Hydra -t 4', ftp: 'Online FTP · Hydra', web: 'Web login form · Hydra/ffuf',
        bcrypt: 'bcrypt hash (cost 10) · John', sha512: 'Linux $6$ hash (sha512crypt) · John',
        zipaes: 'AES ZIP · John', zip: 'Legacy ZIP (ZipCrypto) · John',
        md5: 'MD5 / SHA1 hash · John', ntlm: 'NTLM hash · John', custom: 'Custom'
      },
      searching: 'Searching…',
      found: 'FOUND IN', notFound: 'NOT IN',
      pos: 'Position', total: 'Wordlist lines', pct: 'Percentile', len: 'Length', time: 'Max. estimated time',
      chars: n => `${n} chars`,
      v: { fast: 'FAST — ideal for a CTF', ok: 'ACCEPTABLE — a few minutes', slow: 'SLOW — may frustrate players', bad: 'TOO SLOW for a challenge' },
      tag: { fast: 'fast', ok: 'acceptable', slow: 'slow', bad: 'too slow', miss: 'not found' },
      timeNote: (r) => `At ${r} tries/s, going through the wordlist in order (Hydra and John read it top to bottom).`,
      latin1: 'Found using Latin-1 encoding: that rockyou.txt line is not UTF-8.',
      spaces: 'Note: the word starts or ends with spaces, and they count.',
      missNote: 'A plain rockyou.txt attack will never find it. With rules (john --rules, hashcat -r best64.rule) it might, if it is a variant of a wordlist entry.',
      checkCmd: 'To double-check on Kali:',
      batchTitle: '▸ CHECK SEVERAL CANDIDATES', batchHint: 'One per line (max. 500). Sorted from fastest to slowest.',
      batchBtn: 'CHECK LIST', batchMax: 'Only the first 500 are checked.',
      thWord: 'PASSWORD', thPos: 'POSITION', thTime: 'TIME', thVerdict: 'VERDICT',
      clickHint: 'Click a row to see the details.',
      sugTitle: '▸ SUGGEST A PASSWORD', sugHint: 'Picks a random password among the top positions of rockyou.txt.',
      sugMax: 'Max. position', sugMin: 'Min. length', sugLetters: 'with letters', sugBtn: 'SUGGEST 5',
      sugNone: 'Nothing matches those filters. Try a higher max. position or a shorter length.',
      sugOwn: 'Suggestions always come from rockyou.txt.',
      ownTitle: '▸ USE ANOTHER WORDLIST (LOCAL)',
      ownHint: 'To search a different wordlist, load it here. It is read in your browser and never leaves your computer. While it is loaded, searches use it.',
      dropTitle: 'Drop the wordlist or click', reading: 'Reading…', indexing: 'Indexing…',
      ownLoaded: n => `${n} lines indexed`, ownClear: 'BACK TO ROCKYOU.TXT', ownErr: 'Could not read the file.',
      histTitle: '▸ HISTORY (THIS SESSION)', histClear: 'CLEAR',
      footer: 'Everything runs in your browser: the password is never sent anywhere. Only the wordlist chunk where it could be is downloaded.',
      source: 'Source code',
      dur: { lt1: '< 1 s', s: 's', m: 'min', h: 'h', d: 'days', y: 'years' }
    }
  };

  // Velocidades orientativas (intentos/s) en un portátil sin GPU.
  const SCEN = [
    ['ssh', 4], ['ftp', 10], ['web', 100], ['bcrypt', 200], ['sha512', 3000],
    ['zipaes', 20000], ['zip', 10000000], ['md5', 20000000], ['ntlm', 50000000], ['custom', 1000]
  ];

  let LANG = store.get('ryf_lang') || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
  const T = () => TXT[LANG];
  const fmt = n => n.toLocaleString(LANG === 'es' ? 'es-ES' : 'en-US');

  // ── Diccionario integrado ──────────────────────────────────────────────
  // windows-1252 en WHATWG asigna un carácter distinto a cada byte: sirve de
  // clave exacta para bytes que no son UTF-8 válido.
  const BYTES = new TextDecoder('windows-1252');
  const UTF8 = new TextDecoder('utf-8');
  const ENC = new TextEncoder();
  let meta = null;
  const shardCache = new Map();
  let own = null; // { name, lines, map }

  function fnv1a32(bytes) {
    let h = 0x811c9dc5;
    for (let i = 0; i < bytes.length; i++) h = Math.imul(h ^ bytes[i], 0x01000193);
    return h >>> 0;
  }

  async function gunzip(u8) {
    const stream = new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  function loadShard(id) {
    if (!shardCache.has(id)) {
      const p = (async () => {
        const name = id.toString(16).padStart(3, '0');
        const res = await fetch(`data/s/${name}.bin?v=${meta.sha256.slice(0, 8)}`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const buf = new Uint8Array(await res.arrayBuffer());
        const n = buf[0] | (buf[1] << 8) | (buf[2] << 16) | (buf[3] << 24);
        const words = BYTES.decode(await gunzip(buf.subarray(4, 4 + n))).split('\n');
        const deltas = await gunzip(buf.subarray(4 + n));
        const map = new Map();
        let pos = 0, k = 0;
        for (let i = 0; i < deltas.length;) {
          let v = 0, shift = 0, c;
          do { c = deltas[i++]; v += (c & 0x7f) * 2 ** shift; shift += 7; } while (c & 0x80);
          pos += v;
          const w = words[k++];
          if (!map.has(w)) map.set(w, pos);
        }
        return map;
      })();
      p.catch(() => shardCache.delete(id));
      shardCache.set(id, p);
    }
    return shardCache.get(id);
  }

  // Formas en bytes que puede tener lo que escribe el usuario: UTF-8 y, si
  // cabe en un byte por carácter, Latin-1 (rockyou.txt mezcla ambas).
  function variants(word) {
    const out = [{ bytes: ENC.encode(word), enc: 'utf8' }];
    const cps = Array.from(word, c => c.codePointAt(0));
    if (cps.some(c => c > 0x7f) && cps.every(c => c <= 0xff)) out.push({ bytes: Uint8Array.from(cps), enc: 'latin1' });
    return out;
  }

  async function lookup(word) {
    let best = null;
    for (const v of variants(word)) {
      const key = BYTES.decode(v.bytes);
      let pos;
      if (own) pos = own.map.get(key);
      else pos = (await loadShard(fnv1a32(v.bytes) & (meta.shards - 1))).get(key);
      if (pos !== undefined && (!best || pos < best.pos)) best = { pos, enc: v.enc };
    }
    return best;
  }
  const dictLines = () => own ? own.lines : meta.lines;
  const dictName = () => own ? own.name : 'rockyou.txt';

  // ── Tiempo estimado ────────────────────────────────────────────────────
  function rate() {
    const r = parseFloat($('rate').value);
    return r > 0 ? r : 1;
  }
  function verdict(sec) {
    if (sec <= 120) return 'fast';
    if (sec <= 900) return 'ok';
    if (sec <= 3600) return 'slow';
    return 'bad';
  }
  function duration(sec) {
    const d = T().dur;
    const one = (v, u) => (v < 10 ? Math.round(v * 10) / 10 : Math.round(v)).toLocaleString(LANG === 'es' ? 'es-ES' : 'en-US') + ' ' + u;
    if (sec < 1) return d.lt1;
    if (sec < 60) return one(sec, d.s);
    if (sec < 3600) return one(sec / 60, d.m);
    if (sec < 86400) return one(sec / 3600, d.h);
    if (sec < 86400 * 365) return one(sec / 86400, d.d);
    return one(sec / (86400 * 365), d.y);
  }

  const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shq = s => "'" + s.replace(/'/g, `'\\''`) + "'";

  // ── Búsqueda principal ─────────────────────────────────────────────────
  let last = null; // { word, hit }

  async function search(word) {
    if (!meta || !word) return;
    $('q').value = word;
    $('result').innerHTML = `<p class="muted">${T().searching}</p>`;
    try {
      const hit = await lookup(word);
      last = { word, hit };
      renderResult();
      addHistory(word, hit);
    } catch (e) {
      $('result').innerHTML = `<p class="muted">${T().statusErr}</p>`;
    }
  }

  function renderResult() {
    if (!last) return;
    const t = T(), { word, hit } = last;
    const notes = [];
    if (/^\s|\s$/.test(word)) notes.push(t.spaces);
    // Si la línea está en Latin-1, un grep con texto UTF-8 no la encuentra: se pasan los bytes con $'\xHH'.
    const pat = hit && hit.enc === 'latin1'
      ? "$'" + Array.from(word, c => { const n = c.codePointAt(0); return n > 0x7e || n < 0x20 || c === "'" || c === '\\' ? '\\x' + n.toString(16).padStart(2, '0') : c; }).join('') + "'"
      : shq(word);
    const cmd = `grep -nxF -- ${pat} ${own ? shq(own.name) : '/usr/share/wordlists/rockyou.txt'}`;
    if (!hit) {
      $('result').innerHTML = `<div class="card miss">
        <h2 class="verdict">✘ ${t.notFound} ${esc(dictName()).toUpperCase()}</h2>
        <div class="word">» <span>${esc(word)}</span></div>
        <p class="note">${t.missNote}</p>
        ${notes.map(n => `<p class="note">${n}</p>`).join('')}
      </div>`;
      return;
    }
    const lines = dictLines();
    const pct = hit.pos / lines * 100;
    const sec = hit.pos / rate();
    const v = verdict(sec);
    if (hit.enc === 'latin1') notes.push(t.latin1);
    $('result').innerHTML = `<div class="card v-${v}">
      <h2>✔ ${t.found} ${esc(dictName()).toUpperCase()}</h2>
      <div class="word">» <span>${esc(word)}</span></div>
      <div class="stats">
        <div class="stat hl"><small>${t.pos}</small><b>#${fmt(hit.pos)}</b></div>
        <div class="stat"><small>${t.time}</small><b>${duration(sec)}</b></div>
        <div class="stat"><small>${t.pct}</small><b>${pct < 0.01 ? pct.toFixed(4) : pct.toFixed(2)} %</b></div>
        <div class="stat"><small>${t.len}</small><b>${t.chars(Array.from(word).length)}</b></div>
      </div>
      <div class="bar"><i style="width:0"></i></div>
      <p class="verdict">${t.v[v]}</p>
      <p class="note">${t.timeNote(fmt(rate()))}</p>
      ${notes.map(n => `<p class="note">${n}</p>`).join('')}
      <p class="note">${t.checkCmd}</p>
      <pre class="cmd">${esc(cmd)}</pre>
    </div>`;
    requestAnimationFrame(() => {
      const bar = $('result').querySelector('.bar i');
      if (bar) bar.style.width = Math.max(pct, 0.3) + '%';
    });
  }

  // ── Varias candidatas ──────────────────────────────────────────────────
  let batchRows = null;

  async function runBatch() {
    if (!meta) return;
    const all = [...new Set($('batch').value.split(/\r?\n/).filter(w => w !== ''))];
    const list = all.slice(0, 500);
    $('batchOut').innerHTML = `<p class="muted">${T().searching}</p>`;
    const rows = [];
    let i = 0;
    const worker = async () => {
      while (i < list.length) {
        const w = list[i++];
        try { rows.push({ word: w, hit: await lookup(w) }); } catch (e) { rows.push({ word: w, hit: null }); }
      }
    };
    await Promise.all(Array.from({ length: 8 }, worker));
    rows.sort((a, b) => (a.hit ? a.hit.pos : Infinity) - (b.hit ? b.hit.pos : Infinity));
    batchRows = { rows, cut: all.length > 500 };
    renderBatch();
  }

  function rowsTable(rows) {
    const t = T();
    return `<table><thead><tr><th>${t.thWord}</th><th class="n">${t.thPos}</th><th class="n">${t.thTime}</th><th>${t.thVerdict}</th></tr></thead><tbody>${
      rows.map(r => {
        if (!r.hit) return `<tr class="click" data-w="${esc(r.word)}"><td class="w">${esc(r.word)}</td><td class="n">—</td><td class="n">—</td><td><span class="tag t-bad">${t.tag.miss}</span></td></tr>`;
        const sec = r.hit.pos / rate(), v = verdict(sec);
        return `<tr class="click" data-w="${esc(r.word)}"><td class="w">${esc(r.word)}</td><td class="n">#${fmt(r.hit.pos)}</td><td class="n">${duration(sec)}</td><td><span class="tag t-${v}">${t.tag[v]}</span></td></tr>`;
      }).join('')}</tbody></table><p class="hint">${t.clickHint}</p>`;
  }

  function renderBatch() {
    if (!batchRows) return;
    $('batchOut').innerHTML = (batchRows.cut ? `<p class="hint">${T().batchMax}</p>` : '') + rowsTable(batchRows.rows);
  }

  // ── Sugerencias ────────────────────────────────────────────────────────
  let topWords = null, sugRows = null;

  async function suggest() {
    if (!meta) return;
    if (!topWords) {
      $('sugOut').innerHTML = `<p class="muted">${T().searching}</p>`;
      const res = await fetch(`data/top.bin?v=${meta.sha256.slice(0, 8)}`);
      topWords = UTF8.decode(await gunzip(new Uint8Array(await res.arrayBuffer()))).split('\n');
    }
    const max = Math.min(parseInt($('sugMax').value, 10), topWords.length);
    const minLen = Math.max(1, parseInt($('sugMin').value, 10) || 1);
    const letters = $('sugLetters').checked;
    const pool = [];
    for (let i = 0; i < max; i++) {
      const w = topWords[i];
      if (w.length >= minLen && /^[\x21-\x7e]+$/.test(w) && (!letters || /[a-z]/i.test(w))) pool.push(i);
    }
    const picks = [];
    while (picks.length < 5 && pool.length) picks.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    picks.sort((a, b) => a - b);
    sugRows = picks.map(i => ({ word: topWords[i], hit: { pos: i + 1, enc: 'utf8' } }));
    renderSuggest();
  }

  function renderSuggest() {
    if (!sugRows) return;
    $('sugOut').innerHTML = !sugRows.length ? `<p class="hint">${T().sugNone}</p>`
      : (own ? `<p class="hint">${T().sugOwn}</p>` : '') + rowsTable(sugRows);
  }

  // ── Diccionario propio ─────────────────────────────────────────────────
  async function loadOwn(file) {
    const t = T();
    $('drop').classList.remove('loaded');
    $('dropTitle').textContent = file.name;
    $('dropSub').textContent = t.reading;
    try {
      const buf = new Uint8Array(await file.arrayBuffer());
      $('dropSub').textContent = t.indexing;
      await new Promise(r => setTimeout(r, 30));
      const lines = BYTES.decode(buf).split('\n');
      if (lines.length && lines[lines.length - 1] === '') lines.pop();
      const map = new Map();
      for (let i = 0; i < lines.length; i++) {
        let w = lines[i];
        if (w.endsWith('\r')) w = w.slice(0, -1);
        if (w && !map.has(w)) map.set(w, i + 1);
      }
      own = { name: file.name, lines: lines.length, map };
      $('drop').classList.add('loaded');
      $('ownClear').hidden = false;
      refreshAfterDictChange();
    } catch (e) {
      $('dropSub').textContent = t.ownErr;
    }
  }

  function clearOwn() {
    own = null;
    $('file').value = '';
    $('drop').classList.remove('loaded');
    $('ownClear').hidden = true;
    refreshAfterDictChange();
  }

  function refreshAfterDictChange() {
    last = null; batchRows = null;
    $('result').innerHTML = ''; $('batchOut').innerHTML = '';
    applyLang();
  }

  // ── Historial ──────────────────────────────────────────────────────────
  const hist = [];
  function addHistory(word, hit) {
    const i = hist.findIndex(h => h.word === word && h.dict === dictName());
    if (i >= 0) hist.splice(i, 1);
    hist.unshift({ word, hit, dict: dictName() });
    if (hist.length > 20) hist.pop();
    renderHistory();
  }
  function renderHistory() {
    $('histBox').hidden = !hist.length;
    $('hist').innerHTML = hist.length ? rowsTable(hist) : '';
  }

  // ── Interfaz ───────────────────────────────────────────────────────────
  function fillScenarios() {
    const sel = $('scenario'), cur = sel.value || store.get('ryf_scen') || 'ssh';
    sel.innerHTML = SCEN.map(([k]) => `<option value="${k}">${esc(T().scen[k])}</option>`).join('');
    sel.value = SCEN.some(([k]) => k === cur) ? cur : 'ssh';
  }

  function setStatus() {
    const st = $('status'), t = T();
    if (!meta) return;
    st.className = 'status ok';
    $('statusText').textContent = own ? t.statusOwn(own.name, fmt(own.lines)) : t.statusReady(fmt(meta.lines));
  }

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    $('themeBtn').textContent = t === 'light' ? T().themeDark : T().themeLight;
  }

  function applyLang() {
    const t = T();
    document.documentElement.lang = LANG;
    document.querySelectorAll('[data-t]').forEach(el => {
      const v = t[el.dataset.t];
      if (typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-tp]').forEach(el => { el.placeholder = t[el.dataset.tp]; });
    $('langBtn').textContent = t.lang;
    applyTheme(document.documentElement.getAttribute('data-theme'));
    fillScenarios();
    if (own) { $('dropTitle').textContent = own.name; $('dropSub').textContent = t.ownLoaded(fmt(own.lines)); }
    else { $('dropTitle').textContent = t.dropTitle; $('dropSub').textContent = ''; }
    setStatus();
    renderAll();
  }

  function renderAll() { renderResult(); renderBatch(); renderSuggest(); renderHistory(); }

  // Eventos
  $('searchBtn').addEventListener('click', () => search($('q').value));
  $('q').addEventListener('keydown', e => { if (e.key === 'Enter') search($('q').value); });
  $('scenario').addEventListener('change', () => {
    const k = $('scenario').value;
    store.set('ryf_scen', k);
    $('rate').value = k === 'custom' ? (store.get('ryf_custom') || 1000) : SCEN.find(s => s[0] === k)[1];
    renderAll();
  });
  $('rate').addEventListener('input', () => {
    if ($('scenario').value !== 'custom') { $('scenario').value = 'custom'; store.set('ryf_scen', 'custom'); }
    store.set('ryf_custom', $('rate').value);
    renderAll();
  });
  $('batchBtn').addEventListener('click', runBatch);
  $('sugBtn').addEventListener('click', () => suggest().catch(() => { $('sugOut').innerHTML = `<p class="muted">${T().statusErr}</p>`; }));
  document.addEventListener('click', e => {
    const tr = e.target.closest('tr.click');
    if (!tr) return;
    search(tr.dataset.w);
    $('q').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  $('histClear').addEventListener('click', () => { hist.length = 0; renderHistory(); });
  $('file').addEventListener('change', e => { if (e.target.files[0]) loadOwn(e.target.files[0]); });
  const drop = $('drop');
  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('over'));
  drop.addEventListener('drop', e => {
    e.preventDefault(); drop.classList.remove('over');
    if (e.dataTransfer.files[0]) loadOwn(e.dataTransfer.files[0]);
  });
  $('ownClear').addEventListener('click', clearOwn);
  $('langBtn').addEventListener('click', () => { LANG = LANG === 'es' ? 'en' : 'es'; store.set('ryf_lang', LANG); applyLang(); });
  $('themeBtn').addEventListener('click', () => {
    const t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    store.set('ryf_theme', t); applyTheme(t);
  });

  // Arranque
  fillScenarios();
  {
    const k = $('scenario').value;
    $('rate').value = k === 'custom' ? (store.get('ryf_custom') || 1000) : SCEN.find(s => s[0] === k)[1];
  }
  applyLang();
  fetch('data/meta.json', { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(m => { meta = m; setStatus(); $('q').focus(); })
    .catch(() => { $('status').className = 'status err'; $('statusText').textContent = T().statusErr; });
})();
