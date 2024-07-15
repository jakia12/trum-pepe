var astraGetParents = function (e, t) {
    Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (e) {
          for (
            var t = (this.document || this.ownerDocument).querySelectorAll(e),
              a = t.length;
            0 <= --a && t.item(a) !== this;

          );
          return -1 < a;
        });
    for (var a = []; e && e !== document; e = e.parentNode)
      (!t || e.matches(t)) && a.push(e);
    return a;
  },
  getParents = function (e, t) {
    console.warn(
      "getParents() function has been deprecated since version 2.5.0 or above of Astra Theme and will be removed in the future. Use astraGetParents() instead."
    ),
      astraGetParents(e, t);
  },
  astraToggleClass = function (e, t) {
    e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t);
  },
  toggleClass = function (e, t) {
    console.warn(
      "toggleClass() function has been deprecated since version 2.5.0 or above of Astra Theme and will be removed in the future. Use astraToggleClass() instead."
    ),
      astraToggleClass(e, t);
  },
  astraTriggerEvent =
    (!(function () {
      function e(e, t) {
        t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
        var a = document.createEvent("CustomEvent");
        return a.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), a;
      }
      "function" != typeof window.CustomEvent &&
        ((e.prototype = window.Event.prototype), (window.CustomEvent = e));
    })(),
    function (e, t) {
      var a = new CustomEvent(
        t,
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}
      );
      e.dispatchEvent(a);
    });
(astraSmoothScroll = function (e, t) {
  e.preventDefault(), window.scrollTo({ top: t, left: 0, behavior: "smooth" });
}),
  (astScrollToTopHandler = function (e, t) {
    var a = getComputedStyle(t).content,
      n = t.dataset.onDevices,
      a = a.replace(/[^0-9]/g, "");
    "both" == n || ("desktop" == n && "769" == a) || ("mobile" == n && "" == a)
      ? ((n = window.pageYOffset || document.body.scrollTop),
        e && e.length
          ? n > e.offsetHeight + 100
            ? (t.style.display = "block")
            : (t.style.display = "none")
          : 300 < window.pageYOffset
          ? (t.style.display = "block")
          : (t.style.display = "none"))
      : (t.style.display = "none");
  }),
  (function () {
    var r = document.querySelectorAll("#masthead .main-header-menu-toggle"),
      c = document.getElementById("masthead"),
      i = {},
      d = "",
      u = document.body,
      m = "";
    function e(e) {
      d = e.detail.type;
      var t = document.querySelectorAll(".menu-toggle");
      if (
        ("dropdown" === d &&
          (document
            .getElementById("ast-mobile-popup")
            .classList.remove("active", "show"),
          g("updateHeader")),
        "off-canvas" === d)
      )
        for (var a = 0; a < t.length; a++)
          void 0 !== t[a] && t[a].classList.contains("toggled") && t[a].click();
      n(d);
    }
    function g(e) {
      m = c.querySelector("#ast-mobile-header");
      var t = "";
      if (null == m || "dropdown" !== m.dataset.type || "updateHeader" === e) {
        t = (
          void 0 !== e && "updateHeader" !== e
            ? e.closest(".ast-mobile-popup-inner")
            : document.querySelector("#ast-mobile-popup")
        ).querySelectorAll(".menu-item-has-children");
        for (var a = 0; a < t.length; a++) {
          t[a].classList.remove("ast-submenu-expanded");
          for (
            var n = t[a].querySelectorAll(".sub-menu"), s = 0;
            s < n.length;
            s++
          )
            n[s].style.display = "none";
        }
        var o = document.querySelectorAll(".menu-toggle");
        document.body.classList.remove(
          "ast-main-header-nav-open",
          "ast-popup-nav-open"
        ),
          document.documentElement.classList.remove("ast-off-canvas-active");
        for (var r = 0; r < o.length; r++)
          o[r].classList.remove("toggled"), (o[r].style.display = "flex");
      }
    }
    function n(e) {
      var t = document.querySelectorAll("#ast-mobile-header .menu-toggle"),
        a = document.querySelectorAll("#ast-desktop-header .menu-toggle");
      if (void 0 === e && null !== c)
        if ((m = c.querySelector("#ast-mobile-header"))) e = m.dataset.type;
        else {
          var n = c.querySelector("#ast-desktop-header");
          if (!n) return;
          e = n.dataset.toggleType;
        }
      if ("off-canvas" === e) {
        var n = document.getElementById("menu-toggle-close"),
          s = document.querySelector(".ast-mobile-popup-inner");
        if (null == s) return;
        popupLinks = s.getElementsByTagName("a");
        for (var o = 0; o < t.length; o++)
          t[o].removeEventListener("click", astraNavMenuToggle, !1),
            t[o].addEventListener("click", popupTriggerClick, !1),
            (t[o].trigger_type = "mobile");
        for (o = 0; o < a.length; o++)
          a[o].removeEventListener("click", astraNavMenuToggle, !1),
            a[o].addEventListener("click", popupTriggerClick, !1),
            (a[o].trigger_type = "desktop");
        n.addEventListener("click", function (e) {
          document
            .getElementById("ast-mobile-popup")
            .classList.remove("active", "show"),
            g(this);
        }),
          document.addEventListener("keyup", function (e) {
            27 === e.keyCode &&
              (e.preventDefault(),
              document
                .getElementById("ast-mobile-popup")
                .classList.remove("active", "show"),
              g());
          }),
          document.addEventListener("click", function (e) {
            e.target ===
              document.querySelector(
                ".ast-mobile-popup-drawer.active .ast-mobile-popup-overlay"
              ) &&
              (document
                .getElementById("ast-mobile-popup")
                .classList.remove("active", "show"),
              g());
          });
        for (let e = 0, t = popupLinks.length; e < t; e++)
          null !== popupLinks[e].getAttribute("href") &&
            (popupLinks[e].getAttribute("href").startsWith("#") ||
              -1 !== popupLinks[e].getAttribute("href").search("#")) &&
            (!popupLinks[e].parentElement.classList.contains(
              "menu-item-has-children"
            ) ||
              (popupLinks[e].parentElement.classList.contains(
                "menu-item-has-children"
              ) &&
                document
                  .querySelector("header.site-header")
                  .classList.contains("ast-builder-menu-toggle-icon"))) &&
            (popupLinks[e].addEventListener("click", p, !0),
            (popupLinks[e].headerType = "off-canvas"));
        AstraToggleSetup();
      } else if ("dropdown" === e) {
        var r = document.querySelectorAll(".ast-mobile-header-content") || !1,
          s = document.querySelector(".ast-desktop-header-content") || !1;
        if (0 < r.length)
          for (let e = 0; e < r.length; e++) {
            var l = r[e].getElementsByTagName("a");
            for (link = 0, len = l.length; link < len; link++)
              null !== l[link].getAttribute("href") &&
                (l[link].getAttribute("href").startsWith("#") ||
                  -1 !== l[link].getAttribute("href").search("#")) &&
                (!l[link].parentElement.classList.contains(
                  "menu-item-has-children"
                ) ||
                  (l[link].parentElement.classList.contains(
                    "menu-item-has-children"
                  ) &&
                    document
                      .querySelector("header.site-header")
                      .classList.contains("ast-builder-menu-toggle-icon"))) &&
                (l[link].addEventListener("click", p, !0),
                (l[link].headerType = "dropdown"));
          }
        if (s) {
          var i = s.getElementsByTagName("a");
          for (link = 0, len = i.length; link < len; link++)
            i[link].addEventListener("click", p, !0),
              (i[link].headerType = "dropdown");
        }
        for (o = 0; o < t.length; o++)
          t[o].removeEventListener("click", popupTriggerClick, !1),
            t[o].addEventListener("click", astraNavMenuToggle, !1),
            (t[o].trigger_type = "mobile");
        for (o = 0; o < a.length; o++)
          a[o].removeEventListener("click", popupTriggerClick, !1),
            a[o].addEventListener("click", astraNavMenuToggle, !1),
            (a[o].trigger_type = "desktop");
        AstraToggleSetup();
      }
      v();
    }
    function p(e) {
      switch (e.currentTarget.headerType) {
        case "dropdown":
          for (
            var t = document.querySelectorAll(".menu-toggle.toggled"), a = 0;
            a < t.length;
            a++
          )
            t[a].click();
          break;
        case "off-canvas":
          document.getElementById("menu-toggle-close").click();
      }
    }
    "" !== (m = null != c ? c.querySelector("#ast-mobile-header") : m) &&
      null !== m &&
      (d = m.dataset.type),
      document.addEventListener("astMobileHeaderTypeChange", e, !1),
      (popupTriggerClick = function (e) {
        var e = e.currentTarget.trigger_type,
          t = document.getElementById("ast-mobile-popup"),
          a = document.getElementById("menu-toggle-close");
        a && a.focus(),
          u.classList.contains("ast-popup-nav-open") ||
            u.classList.add("ast-popup-nav-open"),
          u.classList.contains("ast-main-header-nav-open") ||
            "mobile" === e ||
            u.classList.add("ast-main-header-nav-open"),
          document.documentElement.classList.contains(
            "ast-off-canvas-active"
          ) || document.documentElement.classList.add("ast-off-canvas-active"),
          "desktop" === e &&
            ((t.querySelector(".ast-mobile-popup-content").style.display =
              "none"),
            (t.querySelector(".ast-desktop-popup-content").style.display =
              "block")),
          "mobile" === e &&
            ((t.querySelector(".ast-desktop-popup-content").style.display =
              "none"),
            (t.querySelector(".ast-mobile-popup-content").style.display =
              "block")),
          (this.style.display = "none"),
          t.classList.add("active", "show");
      }),
      window.addEventListener("load", function () {
        n();
      }),
      document.addEventListener("astLayoutWidthChanged", function () {
        n();
      }),
      document.addEventListener("astPartialContentRendered", function () {
        (r = document.querySelectorAll(".main-header-menu-toggle")),
          u.classList.remove("ast-main-header-nav-open"),
          document.addEventListener("astMobileHeaderTypeChange", e, !1),
          n(),
          v();
      });
    var s =
      null !== navigator.userAgent.match(/Android/i) &&
      "Android" === navigator.userAgent.match(/Android/i)[0]
        ? window.visualViewport.width
        : window.innerWidth;
    window.addEventListener("resize", function () {
      var e, t, a, n;
      "INPUT" !== document.activeElement.tagName &&
        ((e = document.getElementById("menu-toggle-close")),
        (t = document.querySelector(".menu-toggle.toggled")),
        (a = document.querySelector(
          "#masthead > #ast-desktop-header .ast-desktop-header-content"
        )),
        (n = document.querySelector(".elementor-editor-active")),
        a && (a.style.display = "none"),
        (null !== navigator.userAgent.match(/Android/i) &&
        "Android" === navigator.userAgent.match(/Android/i)[0]
          ? window.visualViewport.width
          : window.innerWidth) !== s &&
          (t && null === n && t.click(),
          document.body.classList.remove(
            "ast-main-header-nav-open",
            "ast-popup-nav-open"
          ),
          e) &&
          null == n &&
          e.click(),
        h(),
        AstraToggleSetup());
    }),
      document.addEventListener("DOMContentLoaded", function () {
        if (
          (AstraToggleSetup(),
          null !==
            (e = u.classList.contains("ast-header-break-point")
              ? document.getElementById("ast-mobile-header")
              : document.getElementById("ast-desktop-header")))
        ) {
          var e,
            t = e.querySelector(".navigation-accessibility");
          if (t && e) {
            var a = e.getElementsByTagName("button")[0];
            if (void 0 === a) {
              if (
                !0 ===
                (a = e.getElementsByTagName("a")[0]).classList.contains(
                  "astra-search-icon"
                )
              )
                return;
              if (void 0 === a) return;
            }
            var n = t.getElementsByTagName("ul")[0];
            if (void 0 === n) a.style.display = "none";
            else {
              if (
                (-1 === n.className.indexOf("nav-menu") &&
                  (n.className += " nav-menu"),
                "off-canvas" === d &&
                  (document.getElementById("menu-toggle-close").onclick =
                    function () {
                      -1 !== t.className.indexOf("toggled")
                        ? ((t.className = t.className.replace(" toggled", "")),
                          a.setAttribute("aria-expanded", "false"),
                          n.setAttribute("aria-expanded", "false"))
                        : ((t.className += " toggled"),
                          a.setAttribute("aria-expanded", "true"),
                          n.setAttribute("aria-expanded", "true"));
                    }),
                (a.onclick = function () {
                  -1 !== t.className.indexOf("toggled")
                    ? ((t.className = t.className.replace(" toggled", "")),
                      a.setAttribute("aria-expanded", "false"),
                      n.setAttribute("aria-expanded", "false"))
                    : ((t.className += " toggled"),
                      a.setAttribute("aria-expanded", "true"),
                      n.setAttribute("aria-expanded", "true"));
                }),
                !astra.is_header_footer_builder_active)
              ) {
                for (
                  var s = n.getElementsByTagName("a"),
                    o = n.getElementsByTagName("ul"),
                    r = 0,
                    l = o.length;
                  r < l;
                  r++
                )
                  o[r].parentNode.setAttribute("aria-haspopup", "true");
                for (r = 0, l = s.length; r < l; r++)
                  s[r].addEventListener("focus", k, !0),
                    s[r].addEventListener("blur", k, !0),
                    s[r].addEventListener("click", L, !0);
              }
              astra.is_header_footer_builder_active &&
                !(function () {
                  const t = document.querySelectorAll(
                      "nav.site-navigation .menu-item-has-children > a .ast-header-navigation-arrow"
                    ),
                    a = document.querySelectorAll(
                      "nav.site-navigation .sub-menu"
                    ),
                    n = document.querySelectorAll(
                      "nav.site-navigation .menu-item-has-children"
                    ),
                    s = document.querySelectorAll(
                      ".astra-full-megamenu-wrapper"
                    );
                  t &&
                    (t.forEach((e) => {
                      e.addEventListener("keydown", function (a) {
                        "Enter" === a.key &&
                          (a.target
                            .closest("li")
                            .querySelector(".sub-menu")
                            .classList.contains("astra-megamenu")
                            ? setTimeout(() => {
                                var e = a.target
                                    .closest("li")
                                    .querySelector(".sub-menu"),
                                  t = a.target
                                    .closest("li")
                                    .querySelector(
                                      ".astra-full-megamenu-wrapper"
                                    );
                                e && e.classList.toggle("astra-megamenu-focus"),
                                  t &&
                                    t.classList.toggle(
                                      "astra-megamenu-wrapper-focus"
                                    ),
                                  a.target
                                    .closest("li")
                                    .classList.toggle("ast-menu-hover"),
                                  "false" !==
                                    a.target.getAttribute("aria-expanded") &&
                                  a.target.getAttribute("aria-expanded")
                                    ? a.target.setAttribute(
                                        "aria-expanded",
                                        "false"
                                      )
                                    : a.target.setAttribute(
                                        "aria-expanded",
                                        "true"
                                      );
                              }, 10)
                            : setTimeout(() => {
                                a.target
                                  .closest("li")
                                  .querySelector(".sub-menu")
                                  .classList.toggle("toggled-on"),
                                  a.target
                                    .closest("li")
                                    .classList.toggle("ast-menu-hover"),
                                  "false" !==
                                    a.target.getAttribute("aria-expanded") &&
                                  a.target.getAttribute("aria-expanded")
                                    ? a.target.setAttribute(
                                        "aria-expanded",
                                        "false"
                                      )
                                    : a.target.setAttribute(
                                        "aria-expanded",
                                        "true"
                                      );
                              }, 10));
                      });
                    }),
                    (a || n) &&
                      document.addEventListener(
                        "click",
                        function (e) {
                          b(a, t, n, s);
                        },
                        !1
                      ),
                    a || n) &&
                    document.addEventListener(
                      "keydown",
                      function (e) {
                        "Escape" === e.key && b(a, t, n, s);
                      },
                      !1
                    );
                  var e = document.querySelectorAll(
                    "nav.site-navigation .ast-nav-menu > .menu-item-has-children > a .ast-header-navigation-arrow"
                  );
                  e &&
                    e.forEach((e) => {
                      e.addEventListener(
                        "keydown",
                        function (e) {
                          e.target
                            .closest("li")
                            .classList.contains("ast-menu-hover") ||
                            "Enter" !== e.key ||
                            b(a, t, n, s);
                        },
                        !1
                      );
                    });
                })();
            }
          }
        }
      });
    for (
      var t,
        a,
        o,
        l,
        h = function () {
          var e = u.style.overflow,
            t =
              ((u.style.overflow = "hidden"),
              document.documentElement.clientWidth);
          if (((u.style.overflow = e), astra.break_point < t || 0 === t)) {
            if (0 < r.length)
              for (var a = 0; a < r.length; a++)
                null !== r[a] && r[a].classList.remove("toggled");
            u.classList.remove("ast-header-break-point"),
              u.classList.add("ast-desktop"),
              astraTriggerEvent(u, "astra-header-responsive-enabled");
          } else
            u.classList.add("ast-header-break-point"),
              u.classList.remove("ast-desktop"),
              astraTriggerEvent(u, "astra-header-responsive-disabled");
        },
        v = function () {
          var e = document.querySelectorAll(".ast-account-action-login");
          if (void 0 !== e) {
            var a = document.querySelectorAll("#ast-hb-login-close"),
              n = document.querySelectorAll("#ast-hb-account-login-wrap");
            if (0 < a.length)
              for (let t = 0; t < e.length; t++)
                (e[t].onclick = function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    n[t].classList.contains("show") ||
                      n[t].classList.add("show");
                }),
                  (a[t].onclick = function (e) {
                    e.preventDefault(), n[t].classList.remove("show");
                  });
          }
        },
        f =
          (h(),
          (AstraToggleSubMenu = function (e) {
            e.preventDefault(),
              "false" !== e.target.getAttribute("aria-expanded") &&
              e.target.getAttribute("aria-expanded")
                ? e.target.setAttribute("aria-expanded", "false")
                : e.target.setAttribute("aria-expanded", "true");
            for (
              var t = this.parentNode,
                a =
                  (t.classList.contains("ast-submenu-expanded") &&
                    document
                      .querySelector("header.site-header")
                      .classList.contains("ast-builder-menu-toggle-link") &&
                    (this.classList.contains("ast-menu-toggle") ||
                      ("" !== (e = t.querySelector("a").getAttribute("href")) &&
                        "#" !== e &&
                        (window.location = e))),
                  t.querySelectorAll(".menu-item-has-children")),
                n = 0;
              n < a.length;
              n++
            ) {
              a[n].classList.remove("ast-submenu-expanded");
              var s = a[n].querySelector(".sub-menu, .children");
              null !== s && (s.style.display = "none");
            }
            for (
              var o = t.parentNode.querySelectorAll(".menu-item-has-children"),
                n = 0;
              n < o.length;
              n++
            )
              if (o[n] != t) {
                o[n].classList.remove("ast-submenu-expanded");
                for (
                  var r = o[n].querySelectorAll(".sub-menu"), l = 0;
                  l < r.length;
                  l++
                )
                  r[l].style.display = "none";
              }
            t.classList.contains("menu-item-has-children") &&
              (astraToggleClass(t, "ast-submenu-expanded"),
              t.classList.contains("ast-submenu-expanded")
                ? (t.querySelector(".sub-menu").style.display = "block")
                : (t.querySelector(".sub-menu").style.display = "none"));
          }),
          (AstraToggleSetup = function () {
            if (
              "undefined" != typeof astraAddon &&
              "function" == typeof astraToggleSetupPro
            )
              astraToggleSetupPro(d, u, i);
            else {
              var e,
                t,
                a,
                n = !1;
              if (
                0 <
                  (e =
                    "off-canvas" === d || "full-width" === d
                      ? ((t = document.querySelectorAll(
                          "#ast-mobile-popup, #ast-mobile-header"
                        )),
                        (a = document.querySelectorAll(
                          "#ast-mobile-header .main-header-menu-toggle"
                        )).length)
                      : ((t = document.querySelectorAll("#ast-mobile-header")),
                        (n = !(
                          0 <
                          (e = (a = document.querySelectorAll(
                            "#ast-mobile-header .main-header-menu-toggle"
                          )).length)
                        ))
                          ? 1
                          : e)) ||
                n
              )
                for (var s = 0; s < e; s++)
                  if (
                    (n ||
                      (a[s].setAttribute("data-index", s), i[s]) ||
                      ((i[s] = a[s]),
                      a[s].addEventListener("click", astraNavMenuToggle, !1)),
                    void 0 !== t[s])
                  )
                    for (var o, r = 0; r < t.length; r++)
                      if (
                        0 <
                        (o = document
                          .querySelector("header.site-header")
                          .classList.contains("ast-builder-menu-toggle-link")
                          ? t[r].querySelectorAll(
                              "ul.main-header-menu .menu-item-has-children > .menu-link, ul.main-header-menu .ast-menu-toggle"
                            )
                          : t[r].querySelectorAll(
                              "ul.main-header-menu .ast-menu-toggle"
                            )).length
                      )
                        for (var l = 0; l < o.length; l++)
                          o[l].addEventListener(
                            "click",
                            AstraToggleSubMenu,
                            !1
                          );
            }
          }),
          (astraNavMenuToggle = function (e) {
            if ("undefined" != typeof astraAddon)
              astraNavMenuTogglePro(e, u, d, this);
            else {
              e.preventDefault();
              var e = document.querySelectorAll(
                  "#masthead > #ast-mobile-header .main-header-bar-navigation"
                ),
                t =
                  ((r = document.querySelectorAll(
                    "#masthead > #ast-mobile-header .main-header-menu-toggle"
                  )),
                  "0");
              if (
                (null !== this.closest("#ast-fixed-header") &&
                  ((e = document.querySelectorAll(
                    "#ast-fixed-header > #ast-mobile-header .main-header-bar-navigation"
                  )),
                  (r = document.querySelectorAll(
                    "#ast-fixed-header .main-header-menu-toggle"
                  )),
                  (t = "0")),
                void 0 === e[t])
              )
                return !1;
              for (
                var a = e[t].querySelectorAll(".menu-item-has-children"), n = 0;
                n < a.length;
                n++
              ) {
                a[n].classList.remove("ast-submenu-expanded");
                for (
                  var s = a[n].querySelectorAll(".sub-menu"), o = 0;
                  o < s.length;
                  o++
                )
                  s[o].style.display = "none";
              }
              -1 !==
                (this.getAttribute("class") || "").indexOf(
                  "main-header-menu-toggle"
                ) &&
                (astraToggleClass(e[t], "toggle-on"),
                astraToggleClass(r[t], "toggled"),
                e[t].classList.contains("toggle-on")
                  ? ((e[t].style.display = "block"),
                    u.classList.add("ast-main-header-nav-open"))
                  : ((e[t].style.display = ""),
                    u.classList.remove("ast-main-header-nav-open")));
            }
          }),
          u.addEventListener(
            "astra-header-responsive-enabled",
            function () {
              var e = document.querySelectorAll(".main-header-bar-navigation");
              if (0 < e.length)
                for (var t = 0; t < e.length; t++) {
                  null != e[t] &&
                    (e[t].classList.remove("toggle-on"),
                    (e[t].style.display = ""));
                  for (
                    var a = e[t].getElementsByClassName("sub-menu"), n = 0;
                    n < a.length;
                    n++
                  )
                    a[n].style.display = "";
                  for (
                    var s = e[t].getElementsByClassName("children"), o = 0;
                    o < s.length;
                    o++
                  )
                    s[o].style.display = "";
                  for (
                    var r = e[t].getElementsByClassName("ast-search-menu-icon"),
                      l = 0;
                    l < r.length;
                    l++
                  )
                    r[l].classList.remove("ast-dropdown-active"),
                      (r[l].style.display = "");
                }
            },
            !1
          ),
          (E = navigator.userAgent),
          (a =
            E.match(
              /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
            ) || []),
          /trident/i.test(a[1])
            ? (t = /\brv[ :]+(\d+)/g.exec(E) || [])
            : ("Chrome" === a[1] &&
                null != (t = E.match(/\bOPR|Edge\/(\d+)/))) ||
              ((a = a[2]
                ? [a[1], a[2]]
                : [navigator.appName, navigator.appVersion, "-?"]),
              null != (t = E.match(/version\/(\d+)/i)) && a.splice(1, 1, t[1]),
              "Safari" === a[0] &&
                a[1] < 11 &&
                document.body.classList.add("ast-safari-browser-less-than-11")),
          document.getElementsByClassName("astra-search-icon")),
        y = 0;
      y < f.length;
      y++
    )
      f[y].onclick = function (e) {
        var t;
        this.classList.contains("slide-search") &&
          (e.preventDefault(),
          (t = this.parentNode.parentNode.parentNode.querySelector(
            ".ast-search-menu-icon"
          )).classList.contains("ast-dropdown-active")
            ? ("" !== (t.querySelector(".search-field").value || "") &&
                t.querySelector(".search-form").submit(),
              t.classList.remove("ast-dropdown-active"))
            : (t.classList.add("ast-dropdown-active"),
              t
                .querySelector(".search-field")
                .setAttribute("autocomplete", "off"),
              setTimeout(function () {
                t.querySelector(".search-field").focus();
              }, 200)));
      };
    function b(e, t, a, n) {
      e &&
        e.forEach((e) => {
          e.classList.remove("astra-megamenu-focus"),
            e.classList.remove("toggled-on");
        }),
        a &&
          a.forEach((e) => {
            e.classList.remove("ast-menu-hover");
          }),
        n &&
          n.forEach((e) => {
            e.classList.remove("astra-megamenu-wrapper-focus");
          }),
        t &&
          t.forEach((e) => {
            e.setAttribute("aria-expanded", "false");
          });
    }
    function L() {
      var e = this || "";
      if (
        e &&
        !e.classList.contains("astra-search-icon") &&
        null === e.closest(".ast-builder-menu") &&
        -1 !== new String(e).indexOf("#")
      ) {
        var t = e.parentNode;
        if (u.classList.contains("ast-header-break-point"))
          (document
            .querySelector("header.site-header")
            .classList.contains("ast-builder-menu-toggle-link") &&
            t.classList.contains("menu-item-has-children")) ||
            (document
              .querySelector(".main-header-menu-toggle")
              .classList.remove("toggled"),
            (t = document.querySelector(
              ".main-header-bar-navigation"
            )).classList.remove("toggle-on"),
            (t.style.display = "none"),
            astraTriggerEvent(
              document.querySelector("body"),
              "astraMenuHashLinkClicked"
            ));
        else
          for (; -1 === e.className.indexOf("nav-menu"); )
            "li" === e.tagName.toLowerCase() &&
              -1 !== e.className.indexOf("focus") &&
              (e.className = e.className.replace(" focus", "")),
              (e = e.parentElement);
      }
    }
    function k() {
      for (
        var e = this;
        -1 === e.className.indexOf("navigation-accessibility");

      )
        "li" === e.tagName.toLowerCase() && e.classList.toggle("focus"),
          (e = e.parentElement);
    }
    if (
      ((u.onclick = function (e) {
        if (
          void 0 !== e.target.classList &&
          !e.target.classList.contains("ast-search-menu-icon") &&
          0 === astraGetParents(e.target, ".ast-search-menu-icon").length &&
          0 === astraGetParents(e.target, ".ast-search-icon").length
        )
          for (
            var t = document.getElementsByClassName("ast-search-menu-icon"),
              a = 0;
            a < t.length;
            a++
          )
            t[a].classList.remove("ast-dropdown-active");
      }),
      astra.is_header_footer_builder_active ||
        ("querySelector" in document &&
          "addEventListener" in window &&
          (u.addEventListener("mousedown", function () {
            u.classList.add("ast-mouse-clicked");
          }),
          u.addEventListener("keydown", function () {
            u.classList.remove("ast-mouse-clicked");
          }))),
      astra.is_scroll_to_id)
    ) {
      var E = document.querySelectorAll(
        'a[href*="#"]:not([href="#"]):not([href="#0"])'
      );
      if (E)
        for (const link of E)
          "" !== link.hash && link.addEventListener("click", S);
      function S(e) {
        let t = 0;
        var a = document.querySelector(".site-header");
        a &&
          ((a = a.querySelectorAll("div[data-stick-support]")) &&
            a.forEach((e) => {
              t += e.clientHeight;
            }),
          (a = this.hash)) &&
          (a = document.querySelector(a)) &&
          (a = a.offsetTop - t) &&
          astraSmoothScroll(e, a);
      }
    }
    astra.is_scroll_to_top &&
      ((o = document.querySelector("#page header")),
      (l = document.getElementById("ast-scroll-top")),
      astScrollToTopHandler(o, l),
      window.addEventListener("scroll", function () {
        astScrollToTopHandler(o, l);
      }),
      (l.onclick = function (e) {
        astraSmoothScroll(e, 0);
      }),
      l.addEventListener("keydown", function (e) {
        "Enter" === e.key && astraSmoothScroll(e, 0);
      }));
  })();
