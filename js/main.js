/*! (c) M Ramzan Ch */
(e => {
    "use strict";
    window.ChangelogHelper = function() {
        this.run = async () => {
            "complete" === document.readyState ? t() : document.onreadystatechange = () => {
                "complete" === document.readyState && t()
            }
        }
        ;
        const t = () => {
            e("section#changelog > div").each(( (t, a) => {
                const n = e(a).children("h2")
                  , s = n.attr("data-created")
                  , i = Date.parse(s)
                  , d = new Date(i).toLocaleDateString("gregory", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
                e("<span></span>").addClass("created").text(d).appendTo(n)
            }
            ))
        }
    }
    ,
    window.FeedbackHelper = function() {
        this.run = async () => {
            "complete" === document.readyState ? t() : document.onreadystatechange = () => {
                "complete" === document.readyState && t()
            }
        }
        ;
        const t = () => {
            setTimeout(( () => {
                const t = e("section[data-name='redeviation-extension']").attr("data-alias");
                t ? (document.dispatchEvent(new CustomEvent("redeviation-" + t + "-feedback",{
                    bubbles: !0,
                    cancelable: !1
                })),
                setTimeout(( () => {
                    e("section[data-name='redeviation-extension']").length > 0 && a()
                }
                ), 1e3)) : a()
            }
            ), 500)
        }
          , a = () => {
            e("section#feedback p.loading").remove(),
            e("section#feedback div.mailWrapper").addClass("visible")
        }
    }
    ,
    window.LandingpageHelper = function() {
        let t = [];
        this.run = async () => {
            a(),
            n(),
            l()
        }
        ;
        const a = () => {
            e("section.preview").each(( (t, a) => {
                const n = e(a).find("p.downloadOptions");
                let s = "chrome";
                /EDG\//i.test(navigator.userAgent) && n.children("a[data-store='edge']").length > 0 ? s = "edge" : /FIREFOX\//i.test(navigator.userAgent) && n.children("a[data-store='firefox']").length > 0 && (s = "firefox"),
                n.find("> a > span").each(( (t, a) => {
                    const n = e(a).outerWidth();
                    e(a).css({
                        width: n,
                        left: -n / 2
                    })
                }
                )),
                n.children("a[data-store='" + s + "']").clone().removeAttr("data-store").addClass("large").text(n.attr("data-text")).prependTo(n)
            }
            ))
        }
          , n = () => {
            "complete" === document.readyState ? s() : document.onreadystatechange = () => {
                "complete" === document.readyState && s()
            }
            ,
            ["scroll", "resize"].forEach((e => {
                window.addEventListener(e, ( () => {
                    o(),
                    "resize" === e && r()
                }
                ), {
                    passive: !0
                })
            }
            )),
            e("body > header > div > menu a").on("click", (t => {
                t.preventDefault();
                const a = e(t.currentTarget).attr("href");
                e("html, body").animate({
                    scrollTop: e(a).offset().top + 20
                }, 700)
            }
            ))
        }
          , s = () => {
            d(),
            setTimeout(( () => {
                e("section.preview").each(( (t, a) => {
                    const n = e(a).attr("id")
                      , s = e(a).attr("data-installed");
                    (e("#redeviation-" + n).length > 0 || e("[id^='redeviation-" + n + "-']").length > 0) && e("<span></span>").addClass("installed").text(s).appendTo(e(a).find("> div > header"))
                }
                ))
            }
            ), 1e3),
            e("body > header").addClass("visible"),
            r(),
            setInterval(( () => {
                requestAnimationFrame(i)
            }
            ), 10)
        }
          , i = () => {
            const e = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
              , a = e + window.innerHeight;
            t.forEach((t => {
                a > t.startPos && t.startPos + t.height > e ? (t.elm.addClass("visible"),
                0 === t.startPos && t.elm.css("transform", "translate3d(0,-" + e / 2 + "px,0)")) : t.elm.removeClass("visible")
            }
            ))
        }
          , d = () => {
            e("div.slideshow:not(.inited)").each(( (t, a) => {
                const n = e(a)
                  , s = JSON.parse(n.attr("data-images"));
                n.addClass("inited"),
                n.data("images", s).removeAttr("data-images"),
                e("<a href='#'></a>").addClass("close").appendTo(n.children("div.frame"));
                const i = n.find("> div.frame > div");
                if (s.forEach((e => {
                    i.append("<img data-src='" + e + "' />")
                }
                )),
                s.length > 1) {
                    e("<a href='#'></a>").addClass("next").appendTo(n),
                    e("<a href='#'></a>").addClass("prev").appendTo(n);
                    const t = e("<menu></menu>").appendTo(n);
                    for (let a = 0; a < s.length; a++)
                        e("<a href='#'></a>").appendTo(t)
                }
                n.find("> div.frame > a.close").on("click", (e => {
                    e.preventDefault(),
                    n.addClass("broken")
                }
                )),
                n.children("a").on("click", (t => {
                    t.preventDefault();
                    let a = n.data("idx") || 0;
                    const s = n.find("> div.frame > div > img").length;
                    a += e(t.currentTarget).hasClass("prev") ? -1 : 1,
                    a >= s ? a = 0 : a < 0 && (a = s - 1),
                    n.data("idx", a),
                    o()
                }
                )),
                n.find("> menu > a").on("click", (t => {
                    t.preventDefault(),
                    n.data("idx", e(t.currentTarget).index()),
                    o()
                }
                ))
            }
            )),
            o()
        }
          , o = () => {
            e("div.slideshow").each(( (t, a) => {
                const n = e(a)
                  , s = n.children("div.frame")
                  , i = s.children("div")
                  , d = i.children("img").length
                  , o = n.data("idx") || 0;
                n.find("> menu > a").removeClass("active"),
                n.find("> menu > a").eq(o).addClass("active");
                const r = parseInt(s.css("padding-top"));
                s.css("height", r + s.width() / 1.6 + "px"),
                i.css("transform", "translate3d(-" + o * s.width() + "px,0,0)");
                const l = [o];
                o > 0 ? l.push(o - 1) : 0 === o && d > 1 && l.push(d - 1),
                o + 1 < d ? l.push(o + 1) : o > 0 && l.push(0),
                ( (e, t) => {
                    const a = e.children("img");
                    t.forEach((e => {
                        const t = a.eq(e);
                        void 0 === t.attr("src") && t.attr("src", t.attr("data-src"))
                    }
                    ))
                }
                )(i, l),
                i.children("img").removeClass("active"),
                i.children("img").eq(o).addClass("active")
            }
            ))
        }
          , r = () => {
            t = [],
            e("body > header, body > footer, main > blockquote").addClass("parallaxed").each(( (a, n) => {
                const s = e(n)
                  , i = s.prev()
                  , d = {
                    elm: s,
                    startPos: i.length ? i.offset().top + i.outerHeight() : 0,
                    height: s.height()
                };
                t.push(d)
            }
            ))
        }
          , l = () => {
            const t = e("body > header > div > svg").addClass("visible")
              , a = t.children("path")
              , n = a[0].getTotalLength();
            let s = 0;
            const i = setInterval(( () => {
                requestAnimationFrame(( () => {
                    s += 7,
                    a[0].style.strokeDasharray = [s, n].join(" "),
                    s >= n && (clearInterval(i),
                    t.addClass("loaded"),
                    setTimeout(( () => {
                        e("body > header > div > h1").addClass("visible"),
                        setTimeout(( () => {
                            e("body > header > div > span.about").addClass("visible"),
                            setTimeout(( () => {
                                e("body > header > div > menu").addClass("visible")
                            }
                            ), 400)
                        }
                        ), 250)
                    }
                    ), 500))
                }
                ))
            }
            ), 10)
        }
    }
    ,
    window.UninstallHelper = function() {
        const t = [];
        this.run = async () => {
            a()
        }
        ;
        const a = () => {
            e("section#uninstall section.suggestions p.question").on("click", (a => {
                a.preventDefault();
                const n = e(a.currentTarget)
                  , s = n.parent("div").attr("data-alias");
                n.next("div.answer").addClass("visible"),
                -1 === t.indexOf(s) && (t.push(s),
                e.ajax({
                    url: location.href,
                    method: "POST",
                    data: {
                        suggestion: s
                    }
                }))
            }
            )),
            e("section#uninstall section.form button[type='submit']").on("click", (a => {
                a.preventDefault();
                const n = e("section#uninstall section.form")
                  , s = n.children("input[type='email']")[0].value
                  , i = n.children("textarea")[0].value;
                e.ajax({
                    url: location.href,
                    method: "POST",
                    data: {
                        message: i,
                        email: s,
                        clickedSuggestions: JSON.stringify(t)
                    }
                }),
                n.addClass("fadeout"),
                setTimeout(( () => {
                    const e = n.attr("data-message")
                      , t = n[0].offsetHeight;
                    n.css("min-height", t + "px"),
                    n.html("<p class='sent'>" + e + "</p>"),
                    n.removeClass("fadeout")
                }
                ), 500)
            }
            )),
            e("section#uninstall section.info > div.feedback > a").on("click", (t => {
                t.preventDefault(),
                e("html, body").animate({
                    scrollTop: e("section#uninstall section.form").offset().top + "px"
                }, 500),
                e("section#uninstall section.form > textarea")[0].focus()
            }
            ))
        }
    }
    ;
    (new function() {
        const t = [];
        this.run = () => new Promise((a => {
            e(( () => {
                e("section#uninstall").length > 0 && t.push((new window.UninstallHelper).run()),
                e("section#feedback").length > 0 && t.push((new window.FeedbackHelper).run()),
                e("section#changelog").length > 0 && t.push((new window.ChangelogHelper).run()),
                e("body.landingpage").length > 0 && t.push((new window.LandingpageHelper).run()),
                t.length > 0 ? Promise.all(t).then(a) : a()
            }
            ))
        }
        ))
    }
    ).run()
}
)(jQuery);
