// Bezoek aan de website meten (Jules, 23/11/2026), met PostHog in de Europese Unie, zonder cookies:
// er komt niets in cookies of in de opslag van de browser, en er is geen profiel van de bezoeker.
// Wat we zien: welke pagina's geopend worden, van waar de bezoeker komt, of een video start
// en of iemand op een knop tikt (TestFlight, Android, de app openen, mailen).
(function () {
  if (!/(^|\.)taalkaart\.be$/.test(location.hostname)) return; // niet op een proefversie of op de computer zelf
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister opt_out_capturing opt_in_capturing has_opted_out_capturing reset".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init("phc_", {
    api_host: "https://eu.i.posthog.com",
    defaults: "2026-01-30",
    cookieless_mode: "always",
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
    capture_pageleave: false,
    respect_dnt: true
  });
  posthog.register({ bron: "website" });

  function doel(href) {
    if (/testflight\.apple\.com\/join/.test(href)) return "testflight";
    if (/apps\.apple\.com/.test(href)) return "testflight-app";
    if (/\.apk($|\?)/.test(href)) return "android-download";
    if (/^(taalkaart|intent):/.test(href)) return "open-app";
    if (/^mailto:/.test(href)) return "mail";
    if (/\.pdf($|\?)/.test(href)) return "fiche";
    return null;
  }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    var d = a && doel(a.getAttribute("href") || "");
    if (d) posthog.capture("site_klik", { doel: d, pagina: location.pathname });
  }, true);
  var gestart = {};
  function video(naam, e) {
    var v = e.target;
    if (!v || v.tagName !== "VIDEO") return;
    var bestand = (v.currentSrc || "").split("/").pop().split("?")[0];
    if (naam === "site_video" && gestart[bestand]) return;
    gestart[bestand] = true;
    posthog.capture(naam, { video: bestand, pagina: location.pathname });
  }
  document.addEventListener("play", function (e) { video("site_video", e); }, true);
  document.addEventListener("ended", function (e) { video("site_video_einde", e); }, true);
})();
