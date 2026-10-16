import { shared } from "./shared";

export default function init(cfg) {
  const { TXT, RTL, fill, startGap } = shared(cfg);
  /* ================= Le ticket honnête ================= */
  (() => {
    const sec = document.querySelector(".offers");
    if (!sec) return;
    const $ = (s) => sec.querySelector(s);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Contenances de chaque format : à modifier ici uniquement (null = contenance à compléter) */
    const F = cfg.formats;
    const NOMS = TXT.noms;
    const mlTxt = (v) => (v ? `${v} ${TXT.ml}` : "");
    /* liste des contenances sur chaque carte de format */
    sec.querySelectorAll(".fmt-card").forEach((c) => {
      const f = F[c.dataset.fmt];
      const ul = document.createElement("ul");
      ul.className = "fmt-ml";
      ul.innerHTML = Object.keys(NOMS).map((k) => `<li><span>${NOMS[k]}</span><b>${mlTxt(f.ml[k])}</b></li>`).join("");
      c.querySelector(".fmt-txt").appendChild(ul);
    });
    let fmt = "petit", qty = 3; // l'offre 2 + 1 est proposée d'emblée, on peut repasser à 1 gamme
    /* Produits vendus : la gamme anti-taches (2 formats) et le sérum contour des yeux */
    let prod = "taches";
    const YEUX = { name: TXT.yeuxName, price: cfg.yeuxPrice, was: null, s: TXT.yeuxWord, pl: TXT.yeuxWords, offert: TXT.yeuxFree, content: TXT.yeuxContent };
    const P = () => prod === "yeux" ? YEUX : {
      name: fill(TXT.gammeName, { label: F[fmt].label }), price: F[fmt].price, was: F[fmt].was, s: TXT.gammeWord, pl: TXT.gammeWords, offert: TXT.gammeFree,
      content: Object.keys(NOMS).map((k) => `${NOMS[k]}${F[fmt].ml[k] ? " " + F[fmt].ml[k] + " " + TXT.ml : ""}`).join(TXT.comma),
    };
    const fmtCh = sec.querySelector(".fmt").closest(".ch");
    /* Galerie : les deux galeries (taches, cernes) sont écrites dans la page, chaque photo est un lien vers sa fiche.
       Ici : on affiche celle du soin choisi et on dessine ses points. */
    let galFor = null;
    const ogTracks = [...document.querySelectorAll(".og-track")], ogDots = document.querySelector(".og-dots");
    let ogTrack = ogTracks[0];
    const buildGallery = () => {
      ogTracks.forEach((tr) => { tr.hidden = tr.dataset.gal !== (prod === "yeux" ? "yeux" : "taches"); });
      ogTrack = ogTracks.find((tr) => !tr.hidden) || ogTracks[0];
      ogDots.innerHTML = [...ogTrack.children].map(() => "<i></i>").join("");
      ogTrack.scrollLeft = 0;
      ogUpd();
    };
    const ogUpd = () => {
      const items = [...ogTrack.children]; if (!items.length) return;
      let idx = 0, best = 1e9;
      items.forEach((c, i) => { const d = Math.abs(startGap(ogTrack, c)); if (d < best) { best = d; idx = i; } });
      [...ogDots.children].forEach((d, i) => d.classList.toggle("on", i === idx));
    };
    let ogT = false;
    ogTracks.forEach((tr) => tr.addEventListener("scroll", () => { if (tr === ogTrack && !ogT) { ogT = true; requestAnimationFrame(() => { ogT = false; ogUpd(); }); } }, { passive: true }));

    /* en-tête du ticket : vrai logo, numéro, date et heure du Maroc */
    $(".tk-logo").src = document.querySelector(".logo img").src;
    $("[data-tkno]").textContent = String(Math.floor(1000 + Math.random() * 9000));
    try {
      const stamp = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Casablanca" }).format(new Date()).replace(" ", "  ");
      $("[data-tkdate]").textContent = stamp;
    } catch (e) {}
    $("[data-inside]").innerHTML = ["gel", "serum", "creme", "ecran"].map((k) => `<li><img src="${document.querySelector(`.pin.${k} img`).src}" alt=""></li>`).join("");

    const money = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const tweens = new Map();
    const count = (el, to) => {
      const from = Number(el.dataset.v ?? el.textContent) || 0;
      el.dataset.v = to;
      if (reduce || from === to) { el.textContent = to; return; }
      cancelAnimationFrame(tweens.get(el));
      const t0 = performance.now();
      const f = (now) => {
        const k = Math.min(1, (now - t0) / 560), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(from + (to - from) * e);
        if (k < 1) tweens.set(el, requestAnimationFrame(f));
      };
      tweens.set(el, requestAnimationFrame(f));
    };

    /* lignes du ticket : on n'imprime que ce qui change */
    const list = $(".tk-lines");
    const lines = () => {
      const f = P();
      const L = [];
      if (qty === 1) {
        L.push({ k: "main", l: `1 × ${f.name}`, r: money(f.price) });
        // (le prix des 4 soins à l'unité est déjà barré à l'étape du format : pas de deuxième prix barré sur le ticket)
      } else {
        L.push({ k: "main", l: `2 × ${f.name}`, r: money(f.price * 2) });
        // un seul prix barré par format (celui des 4 soins achetés séparément) : ni l'article offert ni le prix par gamme n'en portent
        L.push({ k: "gift", l: `1 × ${f.name}`, r: "0,00", stamp: f.offert });
        L.push({ k: "per", cls: "sub per", l: fill(TXT.perItem, { s: f.s }), r: money(Math.round((f.price * 2) / 3)) });
      }
      L.push({ k: "ml", cls: "sub", l: (qty === 3 ? fill(TXT.each, { s: f.s }) : TXT.content) + f.content, r: "" });
      // gamme complète : livraison offerte ; sérum contour des yeux (achat à l'unité) : frais selon la ville
      L.push(prod === "yeux" ? { k: "liv", l: `${TXT.delivery} <small>(${TXT.deliveryFeeNote})</small>`, r: TXT.deliveryFee } : { k: "liv", l: TXT.delivery, r: TXT.deliveryFree });
      return L;
    };
    const html = (x) => `<span>${x.l}</span><span class="r">${x.r}</span>${x.stamp ? `<span class="stamp">${x.stamp}</span>` : ""}`;
    const print = (first) => {
      const want = lines();
      const keys = want.map((x) => x.k);
      [...list.children].forEach((li) => {
        if (!keys.includes(li.dataset.k)) {
          if (reduce || first) li.remove();
          else { li.classList.add("out"); li.addEventListener("animationend", () => li.remove(), { once: true }); }
        }
      });
      let prev = null;
      want.forEach((x) => {
        let li = list.querySelector(`li[data-k="${x.k}"]:not(.out)`);
        const content = html(x);
        if (!li) {
          li = document.createElement("li");
          li.dataset.k = x.k;
          if (x.cls) li.className = x.cls;
          li.innerHTML = content;
          if (!first && !reduce) li.classList.add("new");
          prev ? prev.after(li) : list.prepend(li);
        } else if (li.dataset.c !== content) {
          li.innerHTML = content;
          if (!first && !reduce) { li.classList.remove("flash"); void li.offsetWidth; li.classList.add("flash"); }
        }
        li.dataset.c = content;
        prev = li;
      });
    };

    const totals = () => {
      const f = P();
      const total = qty === 3 ? f.price * 2 : f.price;
      const save = qty === 3 ? f.price : (f.was ? f.was - f.price : 0);
      const what = prod === "yeux" ? TXT.yeuxName : F[fmt].label;
      // recapFr : toujours en français, c'est ce qui est écrit dans le tableur des commandes
      const whatFr = prod === "yeux" ? "Sérum contour des yeux" : F[fmt].labelFr;
      const recapFr = `${whatFr}, ${qty === 3 ? (prod === "yeux" ? "2 sérums + 1 offert" : "2 gammes + 1 offerte") : prod === "yeux" ? "1 sérum" : "1 gamme"}`;
      return { total, save, recapFr, recap: `${what}${TXT.comma}${qty === 3 ? fill(TXT.recapBundle, { pl: f.pl, free: f.offert }) : fill(TXT.recapOne, { s: f.s })}` };
    };
    const render = (first) => {
      sec.querySelectorAll(".fmt-card").forEach((c) => {
        const on = c.dataset.fmt === fmt;
        c.setAttribute("aria-checked", String(on));
        c.tabIndex = on ? 0 : -1;
      });
      sec.classList.toggle("three", qty === 3);
      sec.querySelectorAll(".qopt").forEach((o) => {
        const on = Number(o.dataset.q) === qty;
        o.setAttribute("aria-checked", String(on));
        o.tabIndex = on ? 0 : -1;
      });
      sec.classList.toggle("p-yeux", prod === "yeux");
      if (galFor !== prod) { galFor = prod; buildGallery(); }
      $("[data-offer-for]").textContent = prod === "yeux" ? TXT.offerForYeux : fill(TXT.offerForTaches, { p: F.petit.price });
      sec.querySelectorAll(".psw").forEach((b) => { const on = b.dataset.prod === prod; b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; });
      fmtCh.hidden = true; // le format se change dans le formulaire (bouton Grand format)
      print(first);
      const t = totals();
      $(".tk-save").style.visibility = t.save ? "" : "hidden";
      count($("[data-total]"), t.total);
      count($("[data-save]"), t.save);
      count($("[data-mini]"), t.total);
      $("[data-recap]").textContent = t.recap;
      const f = P(), per = Math.round((f.price * 2) / 3);
      $("[data-badge]").textContent = fill(TXT.badge, { free: f.offert });
      $("[data-n3]").textContent = fill(TXT.three, { pl: f.pl });
      $("[data-n1]").textContent = fill(TXT.one, { s: f.s });
      $("[data-unit]").textContent = prod === "yeux" ? TXT.unitYeux : TXT.unitGamme;
      // option 3 gammes
      count($("[data-o-per]"), per);
      count($("[data-o-total]"), f.price * 2);
      count($("[data-o-save]"), f.price);
      // option 1 gamme
      count($("[data-s-price]"), f.price);
      count($("[data-s-total]"), f.price);
      // les cartes de format affichent le prix qui correspond au choix fait au-dessus
      sec.querySelectorAll(".fmt-card").forEach((c) => {
        const g = F[c.dataset.fmt], gp = Math.round((g.price * 2) / 3);
        c.querySelector(".fmt-price").innerHTML = qty === 3
          ? fill(TXT.fmtPer, { p: gp })
          : fill(TXT.fmtOne, { p: g.price });
        c.querySelector(".fmt-was").innerHTML = qty === 3
          ? fill(TXT.fmtTotal3, { t: g.price * 2 })
          : fill(TXT.fmtWas, { was: g.was, diff: g.was - g.price });
      });
      $("[data-mini-lbl]").textContent = qty === 3 ? fill(TXT.three, { pl: f.pl }) : fill(TXT.one, { s: f.s });
      $("[data-total2]").textContent = t.total;
      $("[data-total3]").textContent = t.total;
      $("[data-pay-note]").textContent = prod === "yeux" ? TXT.payNoteFee : TXT.payNoteFree;
      sec.querySelectorAll(".fsw").forEach((b) => { const on = b.dataset.f === fmt; b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; });
      {
        // (le bouton « Passer au Grand format » du formulaire n'existe plus : le format se choisit à l'étape 1)
      }
      // le surligneur repasse sur l'économie
      if (!first && !reduce) {
        const m = $(".tk-save mark");
        m.style.setProperty("--mk", "0%");
        requestAnimationFrame(() => requestAnimationFrame(() => m.style.setProperty("--mk", "100%")));
      }
    };

    /* choix du format (clic, ou flèches au clavier comme un groupe radio) */
    const cards = [...sec.querySelectorAll(".fmt-card")];
    cards.forEach((c, i) => {
      c.addEventListener("click", () => { fmt = c.dataset.fmt; render(); });
      c.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
        e.preventDefault();
        const n = cards[(i + (e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1) + cards.length) % cards.length];
        fmt = n.dataset.fmt; render(); n.focus();
      });
    });
    /* choix du produit */
    const setProduct = (p) => { if (p === prod || sec.classList.contains("done")) return; prod = p; render(); window.dispatchEvent(new CustomEvent("otage:choice", { detail: { offre: p === "yeux" ? "contour_des_yeux" : "gamme" } })); };
    sec.querySelectorAll(".psw").forEach((b) => b.addEventListener("click", () => setProduct(b.dataset.prod)));
    window.OTAGE = window.OTAGE || {};
    OTAGE.setProduct = setProduct;
    /* choix de l'offre */
    const qopts = [...sec.querySelectorAll(".qopt")];
    qopts.forEach((o, i) => {
      // toucher une offre la choisit et amène directement aux cases à remplir
      o.addEventListener("click", () => {
        qty = Number(o.dataset.q); render();
        setTimeout(() => OTAGE.detachTicket && OTAGE.detachTicket(), reduce ? 0 : 350);
      });
      o.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
        e.preventDefault();
        const n = qopts[(i + 1) % qopts.length];
        qty = Number(n.dataset.q); render(); n.focus();
      });
    });
    render(true);

    /* barre mobile → ticket */
    const ticketCol = $(".tk-col");
    const goTicket = () => {
      const y = ticketCol.getBoundingClientRect().top + window.scrollY - 80;
      window.OTAGE && OTAGE.glideTo ? OTAGE.glideTo(y) : window.scrollTo({ top: y, behavior: "smooth" });
    };
    $(".mini-go").addEventListener("click", () => OTAGE.detachTicket());
    if ("IntersectionObserver" in window) {
      /* visible tant qu'on est sur l'offre, sauf formulaire ouvert ou commande faite */
      let inOffer = false;
      let curVisible = false;
      const syncMini = () => $(".tk-mini").classList.toggle("off", !inOffer || curVisible || sec.classList.contains("done"));
      new IntersectionObserver(([en]) => { curVisible = en.isIntersecting; syncMini(); }, { threshold: 0.25 }).observe($(".curtain"));
      new IntersectionObserver(([en]) => { inOffer = en.isIntersecting; syncMini(); }, { rootMargin: "-25% 0px -25% 0px" }).observe(sec);

      /* Le bouton Commander attire l'œil : il vibre dès qu'on arrive sur l'offre,
         puis toutes les 4 secondes (6 fois au maximum), jusqu'au premier appui. */
      const reduceM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let nudges = 0, nudgeTimer = 0, tapped = false, buzzed = false;
      const target = () => (window.innerWidth < 900 ? $(".mini-go") : $(".tk-send"));
      const nudge = () => {
        const b = target();
        const visible = window.innerWidth < 900 ? !$(".tk-mini").classList.contains("off") : inOffer && !$(".ticket").classList.contains("flipped");
        if (tapped || reduceM || !visible || sec.classList.contains("done")) return;
        b.classList.remove("nudge"); void b.offsetWidth; b.classList.add("nudge");
        // petite vibration réelle du téléphone, une seule fois (Android)
        if (!buzzed && window.innerWidth < 900 && navigator.vibrate) { try { navigator.vibrate([18, 60, 18]); } catch (e) {} buzzed = true; }
        nudges++;
      };
      const startNudge = () => {
        if (nudgeTimer || tapped) return;
        setTimeout(nudge, 700);
        nudgeTimer = setInterval(() => { if (nudges >= 6) { clearInterval(nudgeTimer); return; } nudge(); }, 4000);
      };
      new IntersectionObserver(([en]) => { if (en.isIntersecting) startNudge(); }, { threshold: 0.2 }).observe(sec.querySelector(".tk-choose"));
      [$(".mini-go"), $(".tk-send")].forEach((b) => {
        b.addEventListener("click", () => { tapped = true; clearInterval(nudgeTimer); b.classList.remove("nudge"); });
        b.addEventListener("animationend", (e) => { if (e.animationName === "buzz") b.classList.remove("nudge"); });
      });
      new MutationObserver(syncMini).observe($(".ticket"), { attributes: true, attributeFilter: ["class"] });
      new MutationObserver(syncMini).observe(sec, { attributes: true, attributeFilter: ["class"] });
      syncMini();
    }

    /* entrée de la section */
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { sec.classList.add("seen"); io.disconnect(); } }, { threshold: 0.1 });
      io.observe(sec);
    } else sec.classList.add("seen");

    /* liens « #offres » partout sur la page */
    document.querySelectorAll('a[href="#offres"]').forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      const y = sec.getBoundingClientRect().top + window.scrollY - 10;
      window.OTAGE && OTAGE.glideTo ? OTAGE.glideTo(y) : window.scrollTo({ top: y, behavior: "smooth" });
    }));

    /* ---- Le rideau du formulaire ---- */
    const ticket = $(".ticket"), stub = $(".stub"), form = $(".cur-form"), err = $(".tk-err");
    const curtain = $(".curtain");
    const glideY = (y) => (window.OTAGE && OTAGE.glideTo ? OTAGE.glideTo(y) : window.scrollTo({ top: y, behavior: "smooth" }));
    const openCurtain = () => curtain.classList.add("open");
    // il descend tout seul quand la cliente arrive dessus (l'offre est déjà choisie)
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { openCurtain(); io.disconnect(); } }, { threshold: 0.12 });
      io.observe(curtain);
    } else openCurtain();
    // depuis n'importe quel bouton Commander : on descend au rideau, ouvert, curseur dans le nom
    const detach = () => {
      if (sec.classList.contains("done")) { glideY(curtain.getBoundingClientRect().top + window.scrollY - 24); return; }
      openCurtain();
      let y = 0; for (let el = curtain; el; el = el.offsetParent) y += el.offsetTop;
      glideY(y - 24);
      setTimeout(() => form.elements.nom.focus({ preventScroll: true }), reduce ? 0 : 1300);
    };
    window.OTAGE = window.OTAGE || {};
    OTAGE.detachTicket = detach;

    /* boutons Petit / Grand format en haut de l'offre */
    sec.querySelectorAll(".fsw").forEach((b) => {
      b.addEventListener("click", () => { fmt = b.dataset.f; render(); });
      b.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
        e.preventDefault(); fmt = fmt === "petit" ? "grand" : "petit"; render(); sec.querySelector(`.fsw[data-f="${fmt}"]`).focus();
      });
    });
    /* passer au Grand format, ou revenir au Petit, sans quitter le formulaire */

    /* ---- Envoi des commandes au serveur du site (/api/order) ----
       Le serveur valide, recalcule les prix, attribue le numéro de commande et enregistre dans le tableur.
       Réponse : la commande acceptée (avec son numéro), un refus (champs, trop de commandes), ou null en cas de panne. */
    const QUEUE = "otage-commandes-en-attente";
    const readQ = () => { try { return JSON.parse(localStorage.getItem(QUEUE) || "[]"); } catch (e) { return []; } };
    const writeQ = (q) => { try { localStorage.setItem(QUEUE, JSON.stringify(q)); } catch (e) {} };
    const post = (o) => fetch("/api/order", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) })
      .then((r) => (r.status >= 500 ? null : r.json()), () => null);
    // commandes restées en attente (connexion coupée au moment de valider) : renvoyées au retour sur le site
    const flush = async () => {
      const q = readQ(); if (!q.length) return;
      const left = [];
      // sans « kind » : ancien format, abandonné. Sans « cgv » : commande mise en attente avant que le serveur ne vérifie
      // la case ; les formulaires de l'accueil l'exigeaient déjà avant d'enregistrer, la case avait donc été cochée.
      for (const o of q) { if (o.kind && (await post({ cgv: true, ...o })) === null) left.push(o); }
      writeQ(left);
    };
    flush();
    window.addEventListener("online", flush);

    /* ---- Valider la commande ---- */
    const telOk = (v) => /^(?:\+212|00212|0)[67]\d{8}$/.test(v.replace(/[\s.\-()]/g, "")); // mobile marocain : 06 ou 07
    let sending = false;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (sending) return;
      const bad = [];
      ["nom", "tel", "ville", "email"].forEach((n) => {
        const el = form.elements[n];
        if (!el) return;
        // l'e-mail est facultatif : vide, ou une adresse plausible
        const ok = n === "tel" ? telOk(el.value) : n === "email" ? el.value.trim() === "" || /^\S+@\S+\.\S{2,}$/.test(el.value.trim()) : el.value.trim().length > 1;
        el.setAttribute("aria-invalid", String(!ok));
        if (!ok) bad.push(el);
      });
      if (bad.length) {
        err.textContent = bad.length === 1 && bad[0].name === "tel"
          ? TXT.errPhone
          : bad.length === 1 && bad[0].name === "email" ? TXT.errEmail : TXT.errFields;
        bad[0].focus();
        return;
      }
      // case obligatoire : CGV et politique de retour
      if (form.elements.cgv && !form.elements.cgv.checked) { err.textContent = TXT.errTerms; form.elements.cgv.focus(); return; }
      err.textContent = "";
      const fd = new FormData(form);
      const t = totals();
      // le navigateur n'envoie que les choix ; les prix sont recalculés par le serveur
      const order = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8), // un renvoi du même formulaire ne crée pas de doublon
        locale: RTL ? "ar" : "fr",
        kind: prod === "yeux" ? "yeux" : "gamme",
        format: fmt,
        bundle: qty === 3,
        nom: String(fd.get("nom") || "").trim(),
        tel: String(fd.get("tel") || "").trim(),
        ville: String(fd.get("ville") || "").trim(),
        adresse: String(fd.get("adresse") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        site: form.elements.site ? form.elements.site.value : "", // champ piège : vide pour une personne
        cgv: true, // case CGV cochée (vérifiée juste au-dessus, et de nouveau par le serveur)
        page: location.href.split("#")[0],
      };
      const btn = form.querySelector(".tk-send");
      sending = true; btn.setAttribute("aria-busy", "true"); btn.disabled = true;
      const res = await post(order);
      sending = false; btn.removeAttribute("aria-busy"); btn.disabled = false;
      if (res && !res.ok) { // refusée par le serveur : on explique, rien n'est enregistré
        const fields = res.fields || [];
        fields.forEach((n) => form.elements[n] && form.elements[n].setAttribute("aria-invalid", "true"));
        err.textContent = res.error === "limite" ? TXT.errLimit : fields.length === 1 && fields[0] === "cgv" ? TXT.errTerms : fields.length === 1 && fields[0] === "tel" ? TXT.errPhone : fields.length === 1 && fields[0] === "email" ? TXT.errEmail : fields.length ? TXT.errFields : TXT.errServer;
        if (fields.length && form.elements[fields[0]]) form.elements[fields[0]].focus();
        return;
      }
      if (!res) writeQ([...readQ(), order]); // panne ou hors connexion : gardée sur l'appareil, renvoyée plus tard
      const numero = res ? res.numero : "";
      if (numero) $("[data-tkno]").textContent = numero.replace(/^OTG-/, "");
      // mesure d'audience (si acceptée) : seulement une commande confirmée par le serveur, avec son montant et son numéro.
      // Jamais de nom, téléphone, ville ni adresse.
      if (res && res.ok) window.dispatchEvent(new CustomEvent("otage:order", { detail: { offre: prod === "yeux" ? `contour_des_yeux_x${qty}` : `gamme_${fmt}_x${qty}`, value: res.subtotal, numero: res.numero } }));
      $("[data-thanks]").textContent = fill(TXT.thanks, { name: String(fd.get("nom")).trim().split(/\s+/)[0] });
      $(".stub-done").hidden = false;
      $("[data-thanks2]").textContent = fill(TXT.thanks, { name: String(fd.get("nom")).trim().split(/\s+/)[0] });
      // confirmation : récapitulatif, livraison, total, et le même texte prêt à envoyer sur WhatsApp
      {
        const liv = prod === "yeux" ? `${TXT.deliveryFee} (${TXT.deliveryFeeNote})` : TXT.deliveryFree;
        const lignes = [numero ? fill(TXT.orderNo, { n: numero }) : TXT.doneOffline, t.recap, `${TXT.delivery}${TXT.comma === ", " ? " : " : ": "}${liv}`, `${TXT.totalWord}${TXT.comma === ", " ? " : " : ": "}${t.total} ${TXT.dhWord}${prod === "yeux" ? " + " + TXT.delivery.toLowerCase() : ""}`];
        $("[data-done-recap]").innerHTML = lignes.map((l) => `<span>${l}</span>`).join("");
        const msg = [fill(TXT.waHello, { n: numero }).replace(/\s+([:،])/, "$1"), ...lignes.slice(1).map((l) => "- " + l), cfg.retractation].join("\n").replace(/[\u2066\u2069]/g, "");
        const wa = $("[data-done-wa]");
        if (cfg.whatsapp) wa.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`; else wa.hidden = true;
      }
      form.hidden = true;
      $(".cur-done").hidden = false;
      sec.classList.add("done", "locked");
      $(".tk-mini").hidden = true;
    });
    form.addEventListener("input", (e) => { if (e.target.getAttribute("aria-invalid") === "true") e.target.removeAttribute("aria-invalid"); });
  })();
}
