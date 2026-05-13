/* Interactive Social Avatars — scrollspy
 *
 * Picks the active section using a fixed "anchor line" just below the
 * navbar: the active section is the *last* one whose top has scrolled
 * past that line. This is monotonic with scroll position, so the
 * highlight never flickers between two adjacent sections.
 *
 * Also:
 *   - adds an `is-current` class to the active section card
 *   - updates a small "current section" pill in the navbar (mobile)
 *   - collapses the mobile menu after a nav click
 *   - throttles work via requestAnimationFrame
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

    function getAnchorY() {
      // Anchor line = bottom of the fixed navbar + a small offset.
      var navH = navbar ? navbar.getBoundingClientRect().height : 0;
      return navH + 24;
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

      // Walk top-to-bottom; remember the last section whose top is above y.
      for (var i = 0; i < entries.length; i++) {
        var rect = entries[i].section.getBoundingClientRect();
        if (rect.top - y <= 0) {
          activeId = entries[i].id;
        } else {
          break; // sections are in document order, so we can stop.
        }
      }

      // Edge case: scrolled to the very bottom -> highlight the last section.
      var nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (nearBottom) activeId = entries[entries.length - 1].id;

      setActive(activeId);
    }

    // Throttle via rAF
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        compute();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", compute);
    compute();

    // Collapse the mobile menu after a nav click.
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
