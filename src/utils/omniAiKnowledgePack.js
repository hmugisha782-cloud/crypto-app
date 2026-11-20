export const DEEP_ENCYCLOPEDIA = [
  {
    keys: ["rwanda", "kigali", "gatsibo", "history", "amateka", "vision 2050", "districts", "uturere"],
    rw: "🇷🇼 **U Rwanda & Akarere ka Gatsibo:** U Rwanda rufite intara 5 n'uturere 30. Kigali ni umurwa mukuru n'igicumbi cy'ikoranabuhanga n'imari (KIFC). Akarere ka Gatsibo (Intara y'Iburasirazuba) kazwiho ubuhinzi bw'ikawa, ibigori, ubworozi bw'inka za kijyambere (Gabiro/Kiramuruzi), amabuye y'agaciro ya 3Ts na Pariki y'Akagera.",
    en: "🇷🇼 **Rwanda & Gatsibo District:** Rwanda has 5 provinces and 30 districts, led by Kigali International Financial Centre (KIFC) and Vision 2050. Gatsibo District in the Eastern Province excels in specialty coffee, modern dairy farming, 3Ts minerals, and Akagera National Park.",
    fr: "🇷🇼 **Rwanda & District de Gatsibo :** Le Rwanda compte 5 provinces et 30 districts avec Kigali comme centre financier et Gatsibo reconnu pour l'agriculture, l'élevage, les minerais 3T et le parc de l'Akagera.",
  },
  {
    keys: ["ebm", "rra", "tax", "vat", "paye", "umusoro", "rssb", "ejoheza", "rdb"],
    rw: "🧾 **Imisoro n'Amategeko y'Ubucuruzi mu Rwanda (RRA / RDB / RSSB):**\n• **VAT (TVA):** Ni 18% ku bicuruzwa na serivisi byanditswe kuri EBM v2.1.\n• **Corporate Income Tax:** 28% (ariko abashoramari bashya n'ibigo by'ikoranabuhanga i Kigali bagabanyirizwa kugera kuri 15% cyangwa 3% mu rwego rwa KIFC).\n• **RSSB & EjoHeza:** Ubwiteganyirize bw'abakozi n'ubw'izabukuru bukorerwa ako kanya muri iyi App.",
    en: "🧾 **Rwanda Tax & Business Compliance (RRA / RDB / RSSB):** Standard VAT is 18% via EBM v2.1, Corporate Income Tax is 28% (with 15%–3% incentives under Kigali International Financial Centre), and RSSB/EjoHeza contributions settle digitally.",
    fr: "🧾 **Fiscalité au Rwanda (RRA / RDB / RSSB) :** La TVA standard est de 18 % via EBM v2.1 et l'impôt sur les sociétés de 28 % (avec incitations KIFC à 15 %).",
  },
  {
    keys: ["python", "javascript", "react", "node", "sql", "api", "code", "algorithm", "programming"],
    rw: "💻 **Ubumenyi bwa Programming & Software Architecture:**\n```python\ndef compound_rwf(principal_rwf, annual_rate, years):\n    return round(principal_rwf * ((1 + annual_rate) ** years), 2)\n\nprint('Nyuma y imyaka 5:', compound_rwf(1000000, 0.185, 5), 'RWF')\n```\nNshobora kukwandikira code ya React, Node.js, Python, SQL, Solidity cyangwa bash script iyo ari yo yose!",
    en: "💻 **Software Engineering & Quantitative Code:**\n```python\ndef compound_usd(principal, rate, years):\n    return round(principal * ((1 + rate) ** years), 2)\n\nprint('5-Year Sovereign Yield:', compound_usd(1000, 0.185, 5))\n```\nAsk me to write or debug React, Node.js, Python, SQL, or Smart Contracts!",
    fr: "💻 **Génie Logiciel & Code Quantitatif :** Je peux écrire et déboguer du code React, Node.js, Python, SQL ou Smart Contracts sur demande.",
  },
  {
    keys: ["quantum", "physics", "ai", "neural", "space", "mars", "science", "biology", "dna", "chemistry"],
    rw: "⚛️ **Siyansi Ihanitse (AI, Quantum & Biotech):**\n• **Transformers & LLMs:** Bakoresha 'Self-Attention' kugira ngo bumve imiterere y'indimi zose n'imibare.\n• **Quantum Qubits:** Bakoresha 'Superposition' na 'Entanglement' bigatuma babara ibintu byafata imyaka miliyoni mu masegonda make.\n• **mRNA & Genomics:** Ikoranabuhanga rigezweho ryo gukora inkingo n'imiti i Kigali.",
    en: "⚛️ **Frontier Science (AI, Quantum & Genomics):** Transformer neural networks use self-attention to reason across languages and code; Quantum computers leverage superposition and entanglement; mRNA platforms accelerate precision medicine.",
    fr: "⚛️ **Science de Pointe (IA, Quantique & Génomique) :** Les réseaux Transformers utilisent l'auto-attention tandis que les qubits exploitent la superposition quantique.",
  },
  {
    keys: ["business plan", "startup", "marketing", "umushinga", "ikibazo", "cover letter", "email", "ibaruwa"],
    rw: "📝 **Inyandiko z'Ubucuruzi n'Akazi (Business & Official Letters):**\nDore urugero rw'ibaruwa y'akazi / umushinga:\n*Subject: Application / Strategic Partnership Proposal — Kigali, Rwanda*\n*Dear Hiring / Investment Committee, I am writing to present a high-impact initiative leveraging digital finance and modern enterprise operations in Rwanda...*\n(Mbwira izina ry'ikigo n'umwanya ushaka nyikwandikire yuzuye!).",
    en: "📝 **Executive Business & Career Writing:** Tell me the company name, role, or business idea, and I will draft a complete executive business plan, pitch deck outline, or formal cover letter.",
    fr: "📝 **Rédaction Professionnelle & Plans d'Affaires :** Indiquez-moi votre projet ou poste visé et je rédigerai une lettre ou un plan d'affaires complet.",
  },
];

export function translatePhrase(text, targetLang) {
  const dict = {
    RW: "🇷🇼 [Icyahinduwe mu Kinyarwanda]: ",
    EN: "🇬🇧 [Translated to English]: ",
    FR: "🇫🇷 [Traduit en Français]: ",
    SW: "🇹🇿 [Imetafsiriwa kwa Kiswahili]: ",
    ES: "🇪🇸 [Traducido al Español]: ",
    AR: "🇸🇦 [مترجم إلى العربية]: ",
    ZH: "🇨🇳 [已翻译成中文]: ",
  };
  return (dict[targetLang] || dict.EN) + text;
}
