/* ---------- Hero: cycling jargon -> plain examples ---------- */
const heroExamples = [
  {
    jargon: "HbA1c: 6.8%",
    plain: "Your average blood sugar over the last 3 months is a bit above the healthy range."
  },
  {
    jargon: "LDL Cholesterol: 165 mg/dL (H)",
    plain: "Your 'bad' cholesterol is higher than recommended, which can affect heart health."
  },
  {
    jargon: "TSH: 2.1 mIU/L (WNL)",
    plain: "Your thyroid hormone level is within the normal range — no concern here."
  },
  {
    jargon: "eGFR: 58 mL/min/1.73m²",
    plain: "This measures how well your kidneys filter waste — yours is slightly reduced."
  }
];

let heroIndex = 0;
let heroTimer = null;

function renderHeroExample(i){
  const demoJargon = document.getElementById("demo-jargon");
  const demoPlain = document.getElementById("demo-plain");
  const dots = document.querySelectorAll("#demo-dots span");

  if (demoJargon) demoJargon.textContent = heroExamples[i].jargon;
  if (demoPlain) demoPlain.textContent = heroExamples[i].plain;
  dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
}

function buildDots(){
  const container = document.getElementById("demo-dots");
  if (!container) return;

  container.innerHTML = "";
  heroExamples.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      heroIndex = idx;
      renderHeroExample(heroIndex);
      restartHeroTimer();
    });
    container.appendChild(dot);
  });
}

function restartHeroTimer(){
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    heroIndex = (heroIndex + 1) % heroExamples.length;
    renderHeroExample(heroIndex);
  }, 3800);
}

if (document.getElementById("demo-jargon") || document.getElementById("demo-plain") || document.getElementById("demo-dots")) {
  buildDots();
  renderHeroExample(heroIndex);
  restartHeroTimer();
}

/* ---------- Report simplifier ---------- */
// A small starter dictionary of common report terms.
// Each entry: pattern to find in the pasted text, plain explanation, and
// an optional way to read the flag (high/low/normal) from the matched value.
const glossary = [
  {
    key: "hemoglobin a1c",
    aliases: [/hba1c/i, /hemoglobin a1c/i],
    label: "HbA1c (Hemoglobin A1c)",
    explain: "Shows your average blood sugar level over the past 2–3 months.",
    valueRegex: /(\d+(\.\d+)?)\s*%/,
    interpret: (v) => v >= 6.5 ? "high" : (v >= 5.7 ? "borderline" : "normal")
  },
  {
    key: "ldl",
    aliases: [/ldl cholesterol/i, /\bldl\b/i],
    label: "LDL Cholesterol",
    explain: "Often called 'bad' cholesterol — higher levels are linked to a greater risk of heart disease.",
    valueRegex: /(\d+(\.\d+)?)\s*mg\/dl/i,
    interpret: (v) => v >= 130 ? "high" : "normal"
  },
  {
    key: "hdl",
    aliases: [/hdl cholesterol/i, /\bhdl\b/i],
    label: "HDL Cholesterol",
    explain: "Often called 'good' cholesterol — it helps remove other forms of cholesterol from your blood.",
    valueRegex: /(\d+(\.\d+)?)\s*mg\/dl/i,
    interpret: (v) => v < 40 ? "low" : "normal"
  },
  {
    key: "tsh",
    aliases: [/\btsh\b/i, /thyroid stimulating hormone/i],
    label: "TSH (Thyroid Stimulating Hormone)",
    explain: "Tells you how well your thyroid — the gland that controls metabolism — is working.",
    valueRegex: /(\d+(\.\d+)?)\s*(m?iu\/l)?/i,
    interpret: (v) => v > 4.5 ? "high" : (v < 0.4 ? "low" : "normal")
  },
  {
    key: "egfr",
    aliases: [/\begfr\b/i],
    label: "eGFR (kidney filtration rate)",
    explain: "Estimates how well your kidneys are filtering waste from your blood.",
    valueRegex: /(\d+(\.\d+)?)/,
    interpret: (v) => v < 60 ? "low" : "normal"
  },
  {
    key: "hemoglobin",
    aliases: [/\bhemoglobin\b(?!\s*a1c)/i, /\bhb\b(?!a1c)/i],
    label: "Hemoglobin",
    explain: "The protein in red blood cells that carries oxygen around your body.",
    valueRegex: /(\d+(\.\d+)?)\s*g\/dl/i,
    interpret: (v) => v < 12 ? "low" : (v > 17.5 ? "high" : "normal")
  },
  {
    key: "wbc",
    aliases: [/white blood cell/i, /\bwbc\b/i],
    label: "White Blood Cell (WBC) count",
    explain: "Measures the cells your immune system uses to fight infection.",
    valueRegex: /(\d+(\.\d+)?)/,
    interpret: () => "normal"
  },
  {
    key: "platelet",
    aliases: [/platelet/i],
    label: "Platelet count",
    explain: "Platelets help your blood clot. Very high or low counts can affect bleeding or clotting risk.",
    valueRegex: /(\d+(\.\d+)?)/,
    interpret: () => "normal"
  },
  {
    key: "creatinine",
    aliases: [/creatinine/i],
    label: "Creatinine",
    explain: "A waste product filtered by your kidneys — used to check how well they're working.",
    valueRegex: /(\d+(\.\d+)?)\s*mg\/dl/i,
    interpret: (v) => v > 1.3 ? "high" : "normal"
  },
  {
    key: "glucose",
    aliases: [/\bglucose\b(?!.*a1c)/i, /blood sugar/i],
    label: "Glucose (blood sugar)",
    explain: "The amount of sugar in your blood at the time of the test.",
    valueRegex: /(\d+(\.\d+)?)\s*mg\/dl/i,
    interpret: (v) => v > 125 ? "high" : (v < 70 ? "low" : "normal")
  },
  {
    key: "blood pressure",
    aliases: [/blood pressure/i, /\bbp\b/i],
    label: "Blood Pressure",
    explain: "Measures the force of blood against your artery walls — written as systolic/diastolic.",
    valueRegex: /(\d{2,3})\s*\/\s*(\d{2,3})/,
    interpret: (v, m) => {
      const sys = parseInt(m[1], 10);
      return sys >= 130 ? "high" : "normal";
    }
  }
];

const flagCopy = {
  high: { label: "Above normal", cls: "flag-high" },
  low: { label: "Below normal", cls: "flag-low" },
  borderline: { label: "Borderline", cls: "flag-high" },
  normal: { label: "Within normal range", cls: "flag-normal" }
};

function simplifyReport(text){
  const found = [];
  const seen = new Set();

  glossary.forEach(entry => {
    const matchedAlias = entry.aliases.find(re => re.test(text));
    if (!matchedAlias || seen.has(entry.key)) return;

    // Grab a line/window of text around the match for value extraction
    const aliasMatch = text.match(matchedAlias);
    const startIdx = aliasMatch.index;
    const windowText = text.slice(startIdx, startIdx + 60);
    const valueMatch = windowText.match(entry.valueRegex);

    let flag = "normal";
    if (valueMatch) {
      const num = parseFloat(valueMatch[1]);
      flag = entry.interpret(num, valueMatch);
    }

    found.push({ label: entry.label, explain: entry.explain, flag });
    seen.add(entry.key);
  });

  return found;
}

function renderOutput(items, rawText){
  const output = document.getElementById("output");

  if (!rawText.trim()){
    output.value = "Paste a report above, then click \"Explain this report\".";
    return;
  }

  if (items.length === 0){
    output.value = "We couldn't recognize specific test names in this text yet. CuraNova currently understands common blood tests like HbA1c, cholesterol, TSH, hemoglobin, glucose, and kidney markers — more are being added.";
    return;
  }

  output.value = items.map(item => {
    const flag = flagCopy[item.flag] || flagCopy.normal;
    return `${item.label} — ${flag.label}\n${item.explain}`;
  }).join("\n\n");
}

const simplifyBtn = document.getElementById("simplify-btn");
const sampleBtn = document.getElementById("sample-btn");
const reportInput = document.getElementById("report-input");
const output = document.getElementById("output");

if (simplifyBtn && reportInput && output) {
  simplifyBtn.addEventListener("click", () => {
    const text = reportInput.value;
    const items = simplifyReport(text);
    renderOutput(items, text);
  });
}

if (sampleBtn && reportInput && output) {
  sampleBtn.addEventListener("click", () => {
    const sample = "CBC: Hemoglobin 11.2 g/dL (L), WBC 7.8, Platelets 240.\nMetabolic panel: Glucose 138 mg/dL (H), Creatinine 1.1 mg/dL.\nLipid panel: LDL Cholesterol 172 mg/dL (H), HDL Cholesterol 38 mg/dL (L).\nThyroid: TSH 3.2 mIU/L (WNL).\nHbA1c: 7.1%.";
    reportInput.value = sample;
    const items = simplifyReport(sample);
    renderOutput(items, sample);
  });
}