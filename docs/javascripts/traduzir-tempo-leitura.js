function traduzirTempoLeitura() {
  document.querySelectorAll("*").forEach(function(el) {
    if (el.children.length === 0 && el.textContent.includes("Estimated time to read:")) {
      el.textContent = el.textContent.replace(
        /Estimated time to read:\s*(\d+)\s*minutes?/i,
        "Tempo estimado de leitura: $1 min"
      );
    }
  });
}

if (typeof document$ !== "undefined") {
  document$.subscribe(traduzirTempoLeitura);
} else {
  document.addEventListener("DOMContentLoaded", traduzirTempoLeitura);
}