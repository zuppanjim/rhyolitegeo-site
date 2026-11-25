// Is this page the one that is live? Written by private/fresh.py at publish time.
(function () {
  if (window.top !== window || window.__freshOn) return;   // a frame reloads with its page
  var me = document.currentScript, BUILD = me && me.getAttribute("data-build");
  if (!BUILD) return;
  window.__freshOn = true;
  window.__BUILD = BUILD;
  var KEY = "__fresh_reloaded", typed = false, bar = null, last = 0, live = null;
  document.addEventListener("input", function () { typed = true; }, true);

  function busy() {
    var a = document.activeElement;
    return typed || !!document.querySelector("dialog[open]") ||
      !!(a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable));
  }
  function showBar() {
    if (bar || !document.body) return;
    bar = document.createElement("div");
    bar.setAttribute("role", "status");
    bar.style.cssText = "position:fixed;left:50%;bottom:18px;transform:translateX(-50%);" +
      "z-index:2147483647;display:flex;gap:12px;align-items:center;padding:10px 14px;" +
      "border-radius:10px;background:#1d2330;color:#fff;font:14px/1.3 system-ui,sans-serif;" +
      "box-shadow:0 6px 24px rgba(0,0,0,.35)";
    bar.innerHTML = '<span>This page has been updated.</span>' +
      '<button type="button" style="font:inherit;padding:5px 12px;border:0;border-radius:7px;' +
      'background:#4f8cff;color:#fff;cursor:pointer">Reload</button>' +
      '<button type="button" aria-label="Dismiss" style="font:inherit;border:0;background:none;' +
      'color:#aab;cursor:pointer">✕</button>';
    var b = bar.querySelectorAll("button");
    b[0].onclick = function () { location.reload(); };
    b[1].onclick = function () { bar.remove(); };
    document.body.appendChild(bar);
  }
  function act(back) {
    // Coming back to the tab with nothing typed: reload, once per new build.
    if (back && !busy() && sessionStorage.getItem(KEY) !== live) {
      sessionStorage.setItem(KEY, live);
      location.reload();
    } else {
      showBar();
    }
  }
  function check(back) {
    if (live) { act(back); return; }
    var now = Date.now();
    if (now - last < 30000) return;
    last = now;
    fetch("/__version.json?t=" + now, { cache: "no-store", credentials: "same-origin" })
      .then(function (r) {
        return r.ok && /json/.test(r.headers.get("content-type") || "") ? r.json() : null;
      })
      .then(function (j) {
        if (j && j.build && j.build !== BUILD) { live = j.build; act(back); }
      })
      .catch(function () {});   // signed out, offline: say nothing
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") check(true);
  });
  window.addEventListener("pageshow", function (e) { if (e.persisted) check(true); });
  setInterval(function () { if (document.visibilityState === "visible") check(false); }, 300000);
  setTimeout(function () { check(false); }, 3000);
})();
