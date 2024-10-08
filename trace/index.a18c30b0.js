import {
    M as E,
    r as o,
    j as l,
    a as t,
    T as D,
    t as R,
    W as x,
    b as M,
    c as j
} from './assets/workbench-b198d476.js'
const F = () => {
    const [s, c] = o.useState([]),
        [h, S] = o.useState([]),
        [g, w] = o.useState(k),
        [p, m] = o.useState({ done: 0, total: 0 }),
        [y, f] = o.useState(!1),
        [T, N] = o.useState(null),
        [u, P] = o.useState(null),
        b = e => {
            const r = [],
                d = [],
                a = new URL(window.location.href)
            for (let i = 0; i < e.length; i++) {
                const n = e.item(i)
                if (!n) continue
                const L = URL.createObjectURL(n)
                r.push(L),
                    d.push(n.name),
                    a.searchParams.append('trace', L),
                    a.searchParams.append('traceFileName', n.name)
            }
            const v = a.toString()
            window.history.pushState({}, '', v), c(r), S(d), f(!1), N(null)
        },
        W = e => {
            e.preventDefault(), b(e.dataTransfer.files)
        },
        U = e => {
            e.preventDefault(), e.target.files && b(e.target.files)
        }
    return (
        o.useEffect(() => {
            const e = new URL(window.location.href).searchParams.getAll('trace')
            for (const r of e)
                if (r.startsWith('file:')) {
                    P(r || null)
                    return
                }
            e.some(r => r.startsWith('blob:')) || c(e)
        }, [c]),
        o.useEffect(() => {
            ; (async () => {
                if (s.length) {
                    const e = a => {
                        a.data.method === 'progress' && m(a.data.params)
                    }
                    navigator.serviceWorker.addEventListener('message', e),
                        m({ done: 0, total: 1 })
                    const r = []
                    for (let a = 0; a < s.length; a++) {
                        const v = s[a],
                            i = new URLSearchParams()
                        i.set('trace', v), h.length && i.set('traceFileName', h[a])
                        const n = await fetch(`contexts?${i.toString()}`)
                        if (!n.ok) {
                            c([]), N((await n.json()).error)
                            return
                        }
                        r.push(...(await n.json()))
                    }
                    navigator.serviceWorker.removeEventListener('message', e)
                    const d = new E(r)
                    m({ done: 0, total: 0 }), w(d)
                } else w(k)
            })()
        }, [s, h]),
        l('div', {
            className: 'vbox workbench',
            onDragOver: e => {
                e.preventDefault(), f(!0)
            },
            children: [
                l('div', {
                    className: 'hbox header',
                    children: [
                        t('div', { className: 'logo', children: '🎭' }),
                        t('div', { className: 'product', children: 'Playwright' }),
                        g.title && t('div', { className: 'title', children: g.title }),
                        t('div', { className: 'spacer' }),
                        t(D, {
                            icon: 'color-mode',
                            title: 'Toggle color mode',
                            toggled: !1,
                            onClick: () => R()
                        })
                    ]
                }),
                t(x, { model: g }),
                !!p.total &&
                t('div', {
                    className: 'progress',
                    children: t('div', {
                        className: 'inner-progress',
                        style: { width: (100 * p.done) / p.total + '%' }
                    })
                }),
                u &&
                l('div', {
                    className: 'drop-target',
                    children: [
                        t('div', {
                            children:
                                'Trace Viewer uses Service Workers to show traces. To view trace:'
                        }),
                        l('div', {
                            style: { paddingTop: 20 },
                            children: [
                                l('div', {
                                    children: [
                                        '1. Click ',
                                        t('a', { href: u, children: 'here' }),
                                        ' to put your trace into the download shelf'
                                    ]
                                }),
                                l('div', {
                                    children: [
                                        '2. Go to ',
                                        t('a', {
                                            href: 'https://trace.playwright.dev',
                                            children: 'trace.playwright.dev'
                                        })
                                    ]
                                }),
                                t('div', {
                                    children:
                                        '3. Drop the trace from the download shelf into the page'
                                })
                            ]
                        })
                    ]
                }),
                !y &&
                !u &&
                (!s.length || T) &&
                l('div', {
                    className: 'drop-target',
                    children: [
                        t('div', { className: 'processing-error', children: T }),
                        t('div', {
                            className: 'title',
                            // children: 'Drop Playwright Trace to load'
                            children: 'Select a task to view the trace'
                        }),
                        // t('div', { children: 'or' }),
                        // t('button', {
                        //     onClick: () => {
                        //         const e = document.createElement('input')
                        //             ; (e.type = 'file'),
                        //                 e.click(),
                        //                 e.addEventListener('change', r => U(r))
                        //     },
                        //     children: 'Select file'
                        // }),
                        // t('div', {
                        //     style: { maxWidth: 400 },
                        //     children:
                        //         'Playwright Trace Viewer is a Progressive Web App, it does not send your trace anywhere, it opens it locally.'
                        // })
                    ]
                }),
                y &&
                t('div', {
                    className: 'drop-target',
                    onDragLeave: () => {
                        f(!1)
                    },
                    onDrop: e => W(e),
                    children: t('div', {
                        className: 'title',
                        children: 'Release to analyse the Playwright Trace'
                    })
                })
            ]
        })
    )
},
    k = new E([])
    ; (async () => (
        M(),
        window.location.protocol !== 'file:' &&
        (window.location.href.includes('isUnderTest=true') &&
            (await new Promise(s => setTimeout(s, 1e3))),
            navigator.serviceWorker.register('sw.bundle.js'),
            navigator.serviceWorker.controller ||
            (await new Promise(s => {
                navigator.serviceWorker.oncontrollerchange = () => s()
            })),
            setInterval(function () {
                fetch('ping')
            }, 1e4)),
        j.render(t(F, {}), document.querySelector('#root'))
    ))()
