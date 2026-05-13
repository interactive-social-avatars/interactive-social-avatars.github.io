/* Interactive Social Avatars — scrollspy
 *
 * - Highlights the active nav link & section card as the user scrolls.
 * - Updates the small "current section" pill in the mobile top bar.
 * - Continuously measures the actual fixed-navbar height and writes it
 *   into the `--navbar-h` CSS variable so body padding-top and
 *   scroll-padding-top always match reality (so headings never end up
 *   under the navbar after a click).
 * - Collapses the mobile menu after a nav-link click.
 * - Throttled via requestAnimationFrame.
 */
(function () {
  "use strict";

  function init() {
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.navbar .nav-link[href^="#"]')
    );
    if (!navLinks.length) return;

    var entries = navLinks
      .map(function (link) {
        var id = link.getAttribute("href").slice(1);
        var section = document.getElementById(id);
        return section ? { id: id, link: link, section: section } : null;
      })
      .filter(Boolean);
    if (!entries.length) return;

    var currentLabel = document.getElementById("current-section-label");
    var navbar = document.querySelector(".navbar.fixed-top");
    var lastActiveId = null;

    /* --------------------------------------------------------------
     * Live navbar-height measurement.
     * On desktop the navbar becomes a left sidebar (height = 100vh),
     * which would push everything down; in that case we treat the
     * top reserved space as 0.
     * -------------------------------------------------------------- */
    function updateNavbarHeight() {
      if (!navbar) return;
      var rect = navbar.getBoundingClientRect();
      // If the navbar covers the full viewport height (sidebar mode),
      // there is no top inset to reserve.
      var h = rect.height >= window.innerHeight - 1 ? 0 : rect.height;
      document.documentElement.style.setProperty("--navbar-h", h + "px");
    }

    function getAnchorY() {
      // Match scroll-padding-top (= --navbar-h + 8px) + a tiny buffer.
      var v = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--navbar-h")
      );
      if (isNaN(v)) v = 0;
      return v + 16;
    }

    function setActive(id) {
      if (id === lastActiveId) return;
      lastActiveId = id;
      entries.forEach(function (e) {
        var isActive = e.id === id;
        e.link.classList.toggle("active", isActive);
        e.section.classList.toggle("is-current", isActive);
        if (isActive && currentLabel) {
          currentLabel.textContent = e.link.textContent.trim();
          currentLabel.classList.add("has-section");
        }
      });
    }

    function compute() {
      var y = getAnchorY();
      var activeId = entries[0].id;
      for (var i = 0; i < entries.length; i++) {
        var rect = entries[i].section.getBoundingClientRect();
        if (rect.top - y <= 0) {
          activeId = entries[i].id;
        } else {
          break;
        }
      }
      // Edge case: scrolled to the very bottom -> highlight the last section.
      var nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (nearBottom) activeId = entries[entries.length - 1].id;

      setActive(activeId);
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        compute();
        ticking = false;
      });
    }

    function onResize() {
      updateNavbarHeight();
      onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    // Re-measure when the mobile menu opens/closes (its height changes).
    if (navbar) {
      navbar.addEventListener("shown.bs.collapse", onResize);
      navbar.addEventListener("hidden.bs.collapse", onResize);
    }

    updateNavbarHeight();
    compute();

    // Collapse the mobile menu after a nav-link click.
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        var menu = document.getElementById("navbarSupportedContent");
        if (menu && menu.classList.contains("show") && window.jQuery) {
          window.jQuery(menu).collapse("hide");
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
