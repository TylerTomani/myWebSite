export function letterFocus() {
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toLowerCase();
    if (!/^[a-z0-9]$/.test(key)) return;

    const allEls = [...document.querySelectorAll('[id]')].filter(el => {
      const rect = el.getBoundingClientRect();
      return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    const matchingEls = allEls.filter(el => el.id.toLowerCase().startsWith(key));
    if (matchingEls.length === 0) return;

    const active = document.activeElement;
    const activeIndex = allEls.indexOf(active);

    // Find the closest next/prev match relative to current position
    let target;


    if (e.shiftKey) {
      // Go backward through DOM order
      for (let i = allEls.length - 1; i >= 0; i--) {
        if (
          allEls[i].id.toLowerCase().startsWith(key) &&
          allEls.indexOf(allEls[i]) < activeIndex
        ) {
          target = allEls[i];
          break;
        }
      }
      // Wrap to last match if none before
      if (!target) target = matchingEls[matchingEls.length - 1];
    } else {
      // Go forward through DOM order
      for (let i = 0; i < allEls.length; i++) {
        if (
          allEls[i].id.toLowerCase().startsWith(key) &&
          allEls.indexOf(allEls[i]) > activeIndex
        ) {
          target = allEls[i];
          break;
        }
      }
      // Wrap to first match if none after
      if (!target) target = matchingEls[0];
    }

    target?.focus();
  });
}
