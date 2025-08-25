(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/lib/storage.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "DEFAULT_CHARACTER": ()=>DEFAULT_CHARACTER,
    "ensureCharacter": ()=>ensureCharacter,
    "loadCharacter": ()=>loadCharacter,
    "resetCharacter": ()=>resetCharacter,
    "saveCharacter": ()=>saveCharacter
});
const DEFAULT_CHARACTER = {
    name: "",
    stats: {
        math: 3,
        language: 3,
        science: 3,
        creativity: 3,
        social: 3
    },
    stress: 2,
    motivation: 3,
    week: 1
};
const KEY = "school-game:character";
function loadCharacter() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}
function saveCharacter(ch) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(KEY, JSON.stringify(ch));
}
function resetCharacter() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem(KEY);
}
function ensureCharacter() {
    let ch = loadCharacter();
    if (!ch) {
        ch = structuredClone(DEFAULT_CHARACTER);
        saveCharacter(ch);
    }
    return ch;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/lib/engine.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/lib/engine.js
__turbopack_context__.s({
    "applyEffects": ()=>applyEffects,
    "bestKey": ()=>bestKey,
    "clampStat": ()=>clampStat,
    "roll": ()=>roll,
    "runRequirement": ()=>runRequirement
});
function roll() {
    let dice = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "1d6";
    // Unterstützt Ausdrücke wie "2d6+1", "1d8", "1d6-2"
    const m = /^(\d+)d(\d+)([+-]\d+)?$/i.exec(dice.trim());
    if (!m) return 0;
    const [, cStr, sStr, modStr] = m;
    const count = parseInt(cStr, 10);
    const sides = parseInt(sStr, 10);
    const mod = modStr ? parseInt(modStr, 10) : 0;
    let sum = 0;
    for(let i = 0; i < count; i++)sum += Math.floor(Math.random() * sides) + 1;
    return sum + mod;
}
function clampStat(n) {
    return Math.max(0, Math.min(10, n));
}
function applyEffects(ch) {
    let effects = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const next = {
        ...ch,
        stats: {
            ...ch.stats
        }
    };
    const { stats = {}, stress = 0, motivation = 0, week = 0 } = effects;
    var _next_stats_k;
    for (const k of Object.keys(stats))next.stats[k] = clampStat(((_next_stats_k = next.stats[k]) !== null && _next_stats_k !== void 0 ? _next_stats_k : 0) + stats[k]);
    var _next_stress;
    if (typeof stress === "number") next.stress = clampStat(((_next_stress = next.stress) !== null && _next_stress !== void 0 ? _next_stress : 0) + stress);
    var _next_motivation;
    if (typeof motivation === "number") next.motivation = clampStat(((_next_motivation = next.motivation) !== null && _next_motivation !== void 0 ? _next_motivation : 0) + motivation);
    var _next_week;
    if (typeof week === "number" && week !== 0) next.week = ((_next_week = next.week) !== null && _next_week !== void 0 ? _next_week : 1) + week;
    return next;
}
function runRequirement(ch, requires) {
    var _requires_anyOf;
    if (!requires || !((_requires_anyOf = requires.anyOf) === null || _requires_anyOf === void 0 ? void 0 : _requires_anyOf.length)) {
        return {
            passed: true,
            details: []
        };
    }
    const details = [];
    let passed = false;
    for (const cond of requires.anyOf){
        if (cond.stat) {
            var _ch_stats_cond_stat;
            const val = (_ch_stats_cond_stat = ch.stats[cond.stat]) !== null && _ch_stats_cond_stat !== void 0 ? _ch_stats_cond_stat : 0;
            const ok = cond.gte != null && val >= cond.gte || cond.lte != null && val <= cond.lte || cond.gt != null && val > cond.gt || cond.lt != null && val < cond.lt;
            var _cond_gte, _ref, _ref1;
            details.push({
                type: "stat",
                key: cond.stat,
                value: val,
                ok,
                target: (_ref1 = (_ref = (_cond_gte = cond.gte) !== null && _cond_gte !== void 0 ? _cond_gte : cond.lte) !== null && _ref !== void 0 ? _ref : cond.gt) !== null && _ref1 !== void 0 ? _ref1 : cond.lt
            });
            if (ok) passed = true;
        } else if (cond.roll) {
            const r = roll(cond.roll);
            const ok = cond.gte != null && r >= cond.gte || cond.lte != null && r <= cond.lte || cond.gt != null && r > cond.gt || cond.lt != null && r < cond.lt;
            var _cond_gte1, _ref2, _ref3;
            details.push({
                type: "roll",
                dice: cond.roll,
                value: r,
                ok,
                target: (_ref3 = (_ref2 = (_cond_gte1 = cond.gte) !== null && _cond_gte1 !== void 0 ? _cond_gte1 : cond.lte) !== null && _ref2 !== void 0 ? _ref2 : cond.gt) !== null && _ref3 !== void 0 ? _ref3 : cond.lt
            });
            if (ok) passed = true;
        }
    }
    return {
        passed,
        details
    };
}
function bestKey(stats) {
    const entries = Object.entries(stats).sort((a, b)=>b[1] - a[1]);
    const map = {
        math: "Mathematik",
        language: "Sprache",
        nature: "Natur",
        creativity: "Kreativität",
        social: "Sozial"
    };
    return map[entries[0][0]] || entries[0][0];
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/data/events.json (json)": ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"id\":\"math_test\",\"title\":\"Mathearbeit zurückbekommen\",\"desc\":\"Beim Anblick des Ergebnisses hast du gemischte Gefühle. Wie reagierst du?\",\"choices\":[{\"id\":\"review\",\"label\":\"Fehler analysieren\",\"effects\":{\"stats\":{\"math\":1},\"motivation\":-1,\"week\":1}},{\"id\":\"ignore\",\"label\":\"Ignorieren und mit Freunden abhängen\",\"effects\":{\"stats\":{\"social\":1},\"stress\":-1,\"week\":1}}]},{\"id\":\"language_presentation\",\"title\":\"Fremdsprachenpräsentation\",\"desc\":\"Du bist dran, vor der Klasse zu präsentieren.\",\"choices\":[{\"id\":\"present\",\"label\":\"Auf die Bühne gehen\",\"requires\":{\"anyOf\":[{\"stat\":\"language\",\"gte\":5},{\"roll\":\"1d6\",\"gte\":4}]},\"successText\":\"Du hast flüssig gesprochen und Applaus bekommen!\",\"failText\":\"Du hast dich etwas verhaspelt, aber es versucht.\",\"successEffects\":{\"stats\":{\"language\":1,\"social\":1},\"motivation\":1,\"week\":1},\"failEffects\":{\"stress\":1,\"motivation\":-1,\"week\":1}},{\"id\":\"skip\",\"label\":\"Um Aufschub bitten\",\"effects\":{\"stress\":-1,\"week\":1}}]},{\"id\":\"club_offer\",\"title\":\"AG-Angebot\",\"desc\":\"Musik oder Robotik?\",\"choices\":[{\"id\":\"music\",\"label\":\"Musik-AG\",\"effects\":{\"stats\":{\"creativity\":2},\"week\":1}},{\"id\":\"robotics\",\"label\":\"Robotik-AG\",\"effects\":{\"stats\":{\"science\":1,\"math\":1},\"week\":1}}]},{\"id\":\"bio_argument\",\"title\":\"Streit mit dem Biologielehrer\",\"desc\":\"Es gab eine Diskussion im Unterricht.\",\"choices\":[{\"id\":\"apologize\",\"label\":\"Entschuldigen\",\"effects\":{\"stats\":{\"social\":1},\"stress\":-1,\"week\":1}},{\"id\":\"double_down\",\"label\":\"Weiter verteidigen\",\"effects\":{\"stats\":{\"science\":-1},\"motivation\":1,\"week\":1}}]},{\"id\":\"science_fair\",\"title\":\"Wissenschaftsmesse\",\"desc\":\"Die Projekteinreichung ist eröffnet.\",\"choices\":[{\"id\":\"apply\",\"label\":\"Teilnehmen (Naturwissenschaftstest)\",\"requires\":{\"anyOf\":[{\"stat\":\"science\",\"gte\":5},{\"roll\":\"1d6\",\"gte\":5}]},\"successText\":\"Dein Projekt hat die Jury beeindruckt!\",\"failText\":\"Das Experiment hat nicht funktioniert, aber du hast viel gelernt.\",\"successEffects\":{\"stats\":{\"science\":2,\"math\":1},\"motivation\":2,\"week\":1},\"failEffects\":{\"stats\":{\"science\":1},\"stress\":1,\"week\":1}},{\"id\":\"pass\",\"label\":\"Dieses Jahr aussetzen\",\"effects\":{\"stress\":-1,\"week\":1}}]},{\"id\":\"art_day\",\"title\":\"Kunsttag\",\"desc\":\"Freies Arbeiten im Atelier.\",\"choices\":[{\"id\":\"paint\",\"label\":\"Ein Bild malen\",\"effects\":{\"stats\":{\"creativity\":2},\"stress\":-1,\"week\":1}},{\"id\":\"help\",\"label\":\"Einem Freund helfen\",\"effects\":{\"stats\":{\"social\":1,\"creativity\":1},\"week\":1}}]},{\"id\":\"group_project\",\"title\":\"Krise im Gruppenprojekt\",\"desc\":\"Es gibt Meinungsverschiedenheiten im Team.\",\"choices\":[{\"id\":\"mediate\",\"label\":\"Vermitteln\",\"requires\":{\"anyOf\":[{\"stat\":\"social\",\"gte\":5},{\"roll\":\"1d6\",\"gte\":4}]},\"successText\":\"Du hast das Team wieder zusammengebracht.\",\"failText\":\"Der Streit hat sich verschärft.\",\"successEffects\":{\"stats\":{\"social\":2},\"stress\":-1,\"week\":1},\"failEffects\":{\"stress\":2,\"week\":1}},{\"id\":\"ignore\",\"label\":\"Dich um deine Arbeit kümmern\",\"effects\":{\"stats\":{\"math\":1},\"week\":1}}]},{\"id\":\"reading_challenge\",\"title\":\"Lesewettbewerb\",\"desc\":\"Veranstaltung in der Bibliothek.\",\"choices\":[{\"id\":\"join\",\"label\":\"Mitmachen\",\"effects\":{\"stats\":{\"language\":2},\"week\":1}},{\"id\":\"skip\",\"label\":\"Nicht teilnehmen\",\"effects\":{\"motivation\":-1,\"week\":1}}]},{\"id\":\"sports_day\",\"title\":\"Sporttag\",\"desc\":\"Aktivitäten auf dem Sportplatz.\",\"choices\":[{\"id\":\"compete\",\"label\":\"An Wettkämpfen teilnehmen\",\"effects\":{\"motivation\":2,\"stress\":-1,\"week\":1}},{\"id\":\"cheer\",\"label\":\"Vom Spielfeldrand anfeuern\",\"effects\":{\"stats\":{\"social\":1},\"week\":1}}]},{\"id\":\"math_competition\",\"title\":\"Mathematikwettbewerb\",\"desc\":\"Schulübergreifendes Turnier.\",\"choices\":[{\"id\":\"enter\",\"label\":\"Am Wettbewerb teilnehmen\",\"requires\":{\"anyOf\":[{\"stat\":\"math\",\"gte\":6},{\"roll\":\"2d6\",\"gte\":9}]},\"successText\":\"Du hast eine Medaille gewonnen!\",\"failText\":\"Du hast Erfahrung gesammelt.\",\"successEffects\":{\"stats\":{\"math\":2},\"motivation\":2,\"week\":1},\"failEffects\":{\"stats\":{\"math\":1},\"stress\":1,\"week\":1}},{\"id\":\"prepare\",\"label\":\"Für nächstes Jahr üben\",\"effects\":{\"stats\":{\"math\":1},\"week\":1}}]},{\"id\":\"robotics_lab\",\"title\":\"Robotiklabor\",\"desc\":\"Neue Sensoren sind angekommen.\",\"choices\":[{\"id\":\"build\",\"label\":\"Einen Miniroboter bauen\",\"effects\":{\"stats\":{\"science\":1,\"math\":1,\"creativity\":1},\"week\":1}},{\"id\":\"document\",\"label\":\"Den Prozess dokumentieren\",\"effects\":{\"stats\":{\"language\":1},\"week\":1}}]},{\"id\":\"tutor_friend\",\"title\":\"Einem Freund helfen\",\"desc\":\"Dein Freund versteht die Hausaufgabe nicht.\",\"choices\":[{\"id\":\"math_help\",\"label\":\"Mathematik erklären\",\"effects\":{\"stats\":{\"math\":1,\"social\":1},\"week\":1}},{\"id\":\"language_help\",\"label\":\"Sprachtraining geben\",\"effects\":{\"stats\":{\"language\":1,\"social\":1},\"week\":1}}]},{\"id\":\"school_festival\",\"title\":\"Schulfest\",\"desc\":\"Gelegenheit, einen Stand aufzubauen.\",\"choices\":[{\"id\":\"volunteer\",\"label\":\"Freiwillig helfen\",\"effects\":{\"stats\":{\"social\":2},\"motivation\":1,\"week\":1}},{\"id\":\"art_booth\",\"label\":\"Kunststand eröffnen\",\"effects\":{\"stats\":{\"creativity\":2},\"week\":1}}]},{\"id\":\"chemistry_lab\",\"title\":\"Chemieexperiment\",\"desc\":\"Achte auf die Sicherheitsregeln!\",\"choices\":[{\"id\":\"perform\",\"label\":\"Das Experiment durchführen\",\"requires\":{\"anyOf\":[{\"stat\":\"science\",\"gte\":5},{\"roll\":\"1d6\",\"gte\":5}]},\"successText\":\"Ein einwandfreies Ergebnis!\",\"failText\":\"Ein kleiner Verschüttungsvorfall, aber eine Lektion.\",\"successEffects\":{\"stats\":{\"science\":2},\"week\":1},\"failEffects\":{\"stress\":1,\"week\":1}},{\"id\":\"observe\",\"label\":\"Nur beobachten\",\"effects\":{\"motivation\":1,\"week\":1}}]},{\"id\":\"debate_club\",\"title\":\"Debattierclub\",\"desc\":\"Thema: Technologie und Gesellschaft.\",\"choices\":[{\"id\":\"speak\",\"label\":\"Eigenes Argument vertreten\",\"requires\":{\"anyOf\":[{\"stat\":\"language\",\"gte\":6},{\"roll\":\"1d6\",\"gte\":5}]},\"successText\":\"Du bist sehr überzeugend!\",\"failText\":\"Etwas ordnen und erneut versuchen.\",\"successEffects\":{\"stats\":{\"language\":2,\"social\":1},\"week\":1},\"failEffects\":{\"stats\":{\"language\":1},\"week\":1}},{\"id\":\"listen\",\"label\":\"Zuhören und mitschreiben\",\"effects\":{\"motivation\":1,\"week\":1}}]},{\"id\":\"time_management\",\"title\":\"Zeitmanagement\",\"desc\":\"Balance zwischen Hausaufgaben, AGs und Erholung.\",\"choices\":[{\"id\":\"plan\",\"label\":\"Einen Plan erstellen\",\"effects\":{\"stress\":-2,\"week\":1}},{\"id\":\"overcommit\",\"label\":\"Zu allem 'Ja' sagen\",\"effects\":{\"stress\":2,\"motivation\":1,\"week\":1}}]},{\"id\":\"coding_challenge\",\"title\":\"Programmierungs-Challenge\",\"desc\":\"Eine Algorithmusfrage wurde veröffentlicht.\",\"choices\":[{\"id\":\"solve\",\"label\":\"Versuchen zu lösen\",\"requires\":{\"anyOf\":[{\"stat\":\"math\",\"gte\":5},{\"roll\":\"2d6\",\"gte\":8}]},\"successText\":\"Eine großartige Lösung!\",\"failText\":\"Fast geschafft, noch etwas Übung.\",\"successEffects\":{\"stats\":{\"math\":1,\"science\":1},\"week\":1},\"failEffects\":{\"motivation\":-1,\"week\":1}},{\"id\":\"skip\",\"label\":\"Später anschauen\",\"effects\":{\"week\":1}}]},{\"id\":\"mentor_meeting\",\"title\":\"Beratungsgespräch mit dem Schulberater\",\"desc\":\"Es geht um deine Ziele und Stärken.\",\"choices\":[{\"id\":\"reflect\",\"label\":\"Das Feedback umsetzen\",\"effects\":{\"motivation\":2,\"week\":1}},{\"id\":\"ignore\",\"label\":\"Nach eigenem Kopf handeln\",\"effects\":{\"motivation\":-1,\"week\":1}}]},{\"id\":\"library_research\",\"title\":\"Bibliotheksrecherche\",\"desc\":\"Eine Literaturrecherche durchführen.\",\"choices\":[{\"id\":\"deep_dive\",\"label\":\"Gründlich lesen\",\"effects\":{\"stats\":{\"language\":1,\"science\":1},\"week\":1}},{\"id\":\"skim\",\"label\":\"Schnell überfliegen\",\"effects\":{\"motivation\":1,\"week\":1}}]},{\"id\":\"peer_presentation\",\"title\":\"Peer-Präsentation\",\"desc\":\"Einem Klassenkameraden ein Projekt vorstellen.\",\"choices\":[{\"id\":\"present\",\"label\":\"Präsentation halten\",\"requires\":{\"anyOf\":[{\"stat\":\"language\",\"gte\":5},{\"stat\":\"social\",\"gte\":5},{\"roll\":\"1d6\",\"gte\":4}]},\"successText\":\"Klar und überzeugend präsentiert!\",\"failText\":\"Es gab Verwirrung in den Folien.\",\"successEffects\":{\"stats\":{\"language\":1,\"social\":1,\"creativity\":1},\"week\":1},\"failEffects\":{\"stress\":1,\"week\":1}},{\"id\":\"assist\",\"label\":\"Technische Unterstützung leisten\",\"effects\":{\"stats\":{\"science\":1},\"week\":1}}]}]"));}),
"[project]/app/game/page.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>GamePage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$engine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/engine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$events$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/app/data/events.json (json)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// Kleine Helfer:
function avg(o) {
    const v = Object.values(o);
    return v.reduce((a, b)=>a + b, 0) / v.length;
}
function clamp01(n) {
    return Math.max(0, Math.min(10, n));
}
function GamePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [ch, setCh] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [idx, setIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "GamePage.useState": ()=>Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$events$2e$json__$28$json$29$__["default"].length)
    }["GamePage.useState"]);
    const [resultNote, setResultNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // zum Anzeigen des Testergebnisses/Nachricht
    const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GamePage.useMemo[current]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$events$2e$json__$28$json$29$__["default"][idx]
    }["GamePage.useMemo[current]"], [
        idx
    ]);
    // Charakter laden
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCharacter"])() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureCharacter"])();
            setCh(c);
        }
    }["GamePage.useEffect"], []);
    // Nachricht löschen, wenn Ereignis wechselt
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            setResultNote(null);
        }
    }["GamePage.useEffect"], [
        idx
    ]);
    // Nach Woche 10 zum Finale weiterleiten
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            if (!ch) return;
            var _ch_week;
            if (((_ch_week = ch.week) !== null && _ch_week !== void 0 ? _ch_week : 1) > 10) router.push("/final");
        }
    }["GamePage.useEffect"], [
        ch,
        router
    ]);
    if (!ch) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card",
        children: "Wird geladen..."
    }, void 0, false, {
        fileName: "[project]/app/game/page.jsx",
        lineNumber: 50,
        columnNumber: 19
    }, this);
    function nextEvent() {
        setIdx(Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$data$2f$events$2e$json__$28$json$29$__["default"].length));
    }
    function onChoice(choice) {
        var _choice_effects, _choice_successEffects, _choice_failEffects;
        let updated = {
            ...ch
        };
        if (choice.requires) {
            const res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$engine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["runRequirement"])(ch, choice.requires);
            const passed = res.passed;
            setResultNote({
                passed,
                details: res.details,
                text: passed ? choice.successText || "Erfolgreich!" : choice.failText || "Fehlgeschlagen."
            });
            updated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$engine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyEffects"])(updated, passed ? choice.successEffects : choice.failEffects);
        } else {
            updated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$engine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyEffects"])(updated, choice.effects);
        }
        // Fortschritt der Woche sichern (+1 falls nicht im Effekt enthalten)
        if (!((_choice_effects = choice.effects) === null || _choice_effects === void 0 ? void 0 : _choice_effects.week) && !((_choice_successEffects = choice.successEffects) === null || _choice_successEffects === void 0 ? void 0 : _choice_successEffects.week) && !((_choice_failEffects = choice.failEffects) === null || _choice_failEffects === void 0 ? void 0 : _choice_failEffects.week)) {
            var _updated_week;
            updated.week = ((_updated_week = updated.week) !== null && _updated_week !== void 0 ? _updated_week : 1) + 1;
        }
        var _updated_motivation;
        // Grundwerte begrenzen
        updated.motivation = clamp01((_updated_motivation = updated.motivation) !== null && _updated_motivation !== void 0 ? _updated_motivation : 0);
        var _updated_stress;
        updated.stress = clamp01((_updated_stress = updated.stress) !== null && _updated_stress !== void 0 ? _updated_stress : 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCharacter"])(updated);
        setCh(updated);
        var _updated_week1;
        if (((_updated_week1 = updated.week) !== null && _updated_week1 !== void 0 ? _updated_week1 : 1) > 10) {
            router.push("/final");
        } else {
            setTimeout(()=>nextEvent(), 400); // mit kurzer Verzögerung zum nächsten Ereignis
        }
    }
    // Stärkstes Fach
    const topSubject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$engine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bestKey"])(ch.stats);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "stack",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "kpi",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "val",
                                children: [
                                    ch.week,
                                    "/10"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lbl",
                                children: "Woche"
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "val",
                                children: ch.motivation
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lbl",
                                children: "Motivation"
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "val",
                                children: ch.stress
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lbl",
                                children: "Stress"
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "val",
                                children: avg(ch.stats).toFixed(1)
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lbl",
                                children: "Gesamtdurchschnitt"
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "val",
                                children: topSubject
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lbl",
                                children: "Stärkster Bereich"
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/game/page.jsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card stack",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: current.title
                    }, void 0, false, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: current.desc
                    }, void 0, false, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid-2",
                        style: {
                            marginTop: ".8rem"
                        },
                        children: current.choices.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onChoice(c),
                                children: c.label
                            }, c.id, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    resultNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        style: {
                            marginTop: ".8rem"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: resultNote.passed ? "✅ Erfolgreich" : "❌ Fehlgeschlagen"
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    marginTop: ".4rem"
                                },
                                children: resultNote.text
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                style: {
                                    marginTop: ".4rem"
                                },
                                children: resultNote.details.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: d.type === "stat" ? "Statusprüfung: ".concat(d.key, " = ").concat(d.value, " → Ziel ").concat(d.target, " → ").concat(d.ok ? "Bestanden" : "Nicht bestanden") : "Wurf (".concat(d.dice, ") = ").concat(d.value, " → Ziel ").concat(d.target, " → ").concat(d.ok ? "Bestanden" : "Nicht bestanden")
                                    }, i, false, {
                                        fileName: "[project]/app/game/page.jsx",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "row",
                        style: {
                            marginTop: ".8rem"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/status",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "secondary",
                                    children: "Status anzeigen"
                                }, void 0, false, {
                                    fileName: "[project]/app/game/page.jsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/final",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "ghost",
                                    children: "Zum Finale gehen"
                                }, void 0, false, {
                                    fileName: "[project]/app/game/page.jsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/game/page.jsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/game/page.jsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/game/page.jsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/game/page.jsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_s(GamePage, "8aTEytw5EsHCSnKJl9S0RFRxvug=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = GamePage;
var _c;
__turbopack_context__.k.register(_c, "GamePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_50973715._.js.map