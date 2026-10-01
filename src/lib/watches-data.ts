// ZAMANA — Vintage Timepieces, Bengaluru
// Catalog of 50 vintage watches. Prices are intentionally masked as "₹ xxx"
// until exact pricing is provided by the owner.

export type StockType = "fixed" | "auction";

export interface WatchSpec {
  id: string;
  ref: string;
  name: string;
  brand: string;
  era: string; // decade label, e.g. "1970s"
  year: string; // approximate year, e.g. "c. 1973"
  movement: string; // Automatic | Hand-Wound | Quartz | LED | Electric
  caseMaterial: string;
  caseSize: string;
  dial: string;
  strap: string;
  condition: string;
  serviceNote: string;
  stockType: StockType;
  /** Display price — masked until owner finalizes pricing. */
  price: string; // "₹ xxx"
  /** Hidden reserve for auction pieces (server-side only, never sent to client). */
  reserve: number;
  /** Hidden opening display for auctions is also masked; bids are real numbers. */
  featured?: boolean;
  story: string;
  image: string;
}

const W = (
  ref: string,
  name: string,
  brand: string,
  era: string,
  year: string,
  movement: string,
  caseMaterial: string,
  caseSize: string,
  dial: string,
  strap: string,
  condition: string,
  serviceNote: string,
  stockType: StockType,
  featured: boolean | undefined,
  story: string,
  image: string,
  reserve = 0
): WatchSpec => ({
  id: name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  ref,
  name,
  brand,
  era,
  year,
  movement,
  caseMaterial,
  caseSize,
  dial,
  strap,
  condition,
  serviceNote,
  stockType,
  price: "₹ xxx",
  reserve,
  featured,
  story,
  image,
});

export const WATCHES: WatchSpec[] = [
  W("ZM-001", "Seiko 5 Automatic Day-Date", "Seiko", "1970s", "c. 1974", "Automatic (17 jewels)", "Stainless steel", "37 mm", "Grey sunray, gold indices", "Black leather", "Very good, honest wear", "Serviced & timed, 6-month warranty", "fixed", true,
    "The watch that taught India to love automatics. This 7009-calibre Seiko 5 wears a warm grey sunray dial with gold accents and its day-wheel still flips sharp at midnight.", "/watches/w01.jpg"),
  W("ZM-002", "Grand Seiko Hi-Beat Automatic", "Grand Seiko", "1970s", "c. 1972", "Automatic Hi-Beat 5646", "Stainless steel", "36 mm", "Silver sunburst, applied markers", "Steel bracelet", "Excellent", "Serviced & timed, 6-month warranty", "fixed", false,
    "36,000 beats per hour of Grand Seiko obsession — the 56-series Hi-Beat is the connoisseur's grail from the golden era of Japanese horology.", "/watches/w02.jpg"),
  W("ZM-003", "Seiko SKX781 'Orange Monster'", "Seiko", "2000s", "c. 2005", "Automatic 7S36", "Stainless steel", "42 mm", "Bold orange, luminous indices", "Steel bracelet", "Very good, light scratches", "Pressure tested to 200 m", "auction", false,
    "The diver that made dive watches fun again. Legendary orange dial, 200 m of attitude, and a cult following that never fades.", "/watches/w03.jpg", 12000),
  W("ZM-004", "HMT Janata", "HMT", "1970s", "c. 1976", "Hand-Wound 17 jewels", "Nickel-chrome plated", "34 mm", "White, printed Hindu-Arabic numerals", "Black leather", "Good, dial honest & original", "Serviced & timed", "fixed", true,
    "Made in Bangalore by HMT — 'the timekeeper of the nation'. A Janata on the wrist is a piece of this very city's industrial history.", "/watches/w04.jpg"),
  W("ZM-005", "Rolex Datejust 16013", "Rolex", "1980s", "c. 1985", "Automatic 3035", "Steel & 18k yellow gold", "36 mm", "Champagne, gold batons", "Jubilee bracelet", "Excellent, crisp fluting", "Serviced, 1-year warranty", "fixed", false,
    "Two-tone Datejust with the Jubilee everyone asks for by name. The 16013 remains the definitive 'one watch' of the 1980s gentleman.", "/watches/w05.jpg"),
  W("ZM-006", "Citizen 17 Manual Wind", "Citizen", "1960s", "c. 1967", "Hand-Wound 17 jewels", "Stainless steel", "35 mm", "Silver, applied indices", "Brown leather", "Very good", "Serviced & timed", "fixed", false,
    "Clean-lined Japanese craftsmanship from the decade Citizen went global. Wind it each morning — it rewards the ritual.", "/watches/w06.jpg"),
  W("ZM-007", "Bulova Red LED", "Bulova", "1970s", "c. 1976", "LED Digital (module)", "Stainless steel", "36 mm", "Red LED display", "Steel bracelet", "Good, LED bright & crisp", "Electronics bench-tested", "fixed", false,
    "Space-age 1976 in a case. Press the button and that deep-red glow still stops conversations.", "/watches/w07.jpg"),
  W("ZM-008", "Wittnauer Polara 300", "Wittnauer", "1970s", "c. 1974", "Quartz Digital", "Stainless steel", "38 mm", "LED display, grey case", "Steel bracelet", "Very good", "Electronics bench-tested", "fixed", false,
    "From the Longines-Wittnauer group, the Polara 300 is vintage LED royalty — sportier, rarer, cooler.", "/watches/w08.jpg"),
  W("ZM-009", "Rado LED Digital", "Rado", "1970s", "c. 1975", "LED Digital", "Stainless steel", "35 mm", "Red LED display", "Original band", "Good, original strap", "Electronics bench-tested", "fixed", false,
    "Rado's 'Diastar futurism' moment — Swiss LED engineering when the future still looked like red digits.", "/watches/w09.jpg"),
  W("ZM-010", "Elgin Trench-Style Wristwatch", "Elgin", "1910s", "1919", "Hand-Wound 15 jewels", "Nickel case", "33 mm", "Porcelain enamel, black numerals", "Brown leather", "Fair — a 105-year survivor", "Serviced & timed, keep dry", "auction", false,
    "A 1919 Elgin from the National Watch Company era — porcelain dial, wire lugs, and a century of stories on the strap.", "/watches/w10.jpg", 9000),
  W("ZM-011", "Timex Ladies LED", "Timex", "1970s", "c. 1977", "LED Digital", "Gold-tone steel", "24 mm", "Red LED display", "Gold-tone bracelet", "Very good", "Electronics bench-tested", "fixed", false,
    "Disco-era Timex in gold-tone — the smallest, sparkliest way to wear a piece of the quartz revolution.", "/watches/w11.jpg"),
  W("ZM-012", "Wolbrook Skindiver", "Wolbrook", "1960s", "c. 1966", "Hand-Wound", "Stainless steel", "37 mm", "Black, luminous dot dial", "Tropic-style strap", "Very good, patina even", "Serviced & timed", "auction", false,
    "The French skindiver said to share DNA with the watch on a certain president's wrist. Skin it, dive it, love it.", "/watches/w12.jpg", 8000),
  W("ZM-013", "Citizen New Master 21J", "Citizen", "1960s", "c. 1968", "Hand-Wound 21 jewels", "Stainless steel", "35 mm", "Silver, dauphine hands", "Black leather", "Excellent", "Serviced & timed", "fixed", false,
    "21 jewels of mid-century Japanese finesse — the 'New Master' was Citizen flexing its hand-finishing muscles.", "/watches/w13.jpg"),
  W("ZM-014", "Tissot TwoTimer Chronograph", "Tissot", "2000s", "c. 2008", "Automatic Chronograph", "Stainless steel", "40 mm", "Black with luminous sub-dials", "Steel bracelet", "Very good", "Serviced & timed", "fixed", false,
    "Rally-inspired Tissot chrono — two time zones, tachy flange, and a swagger priced for real collectors.", "/watches/w14.jpg"),
  W("ZM-015", "Casio F-91W", "Casio", "1990s", "c. 1996", "Quartz Digital", "Resin", "35 mm", "Grey LCD", "Resin strap", "Excellent, crisp module", "New battery", "fixed", false,
    "The most honest watch ever made. This early-production F-91W has outlived trends, phones and possibly us.", "/watches/w15.jpg"),
  W("ZM-016", "Orient Capital Automatic", "Orient", "2010s", "c. 2014", "Automatic 21 jewels", "Stainless steel", "40 mm", "Cream, roman numerals", "Brown leather", "Excellent, near new-old-stock", "Fully inspected", "fixed", false,
    "Orient's in-house automatic in a dressy cream suit — proof that value watches can still have manners.", "/watches/w16.jpg"),
  W("ZM-017", "Zodiac 14k White Gold Dress Watch", "Zodiac", "1960s", "c. 1965", "Hand-Wound 17 jewels", "14k white gold", "26 mm", "Silver, baton indices", "Black leather", "Excellent", "Serviced & timed", "fixed", false,
    "Solid 14k white gold Swiss elegance for smaller wrists — Zodiac's quiet, jewellery-grade hour.", "/watches/w17.jpg"),
  W("ZM-018", "Beauwyn Swiss Chronograph", "Beauwyn", "1960s", "c. 1968", "Hand-Wound Chronograph", "Chrome-plated steel", "37 mm", "Silver with twin registers", "Brown leather", "Good, honest patina", "Serviced & timed", "auction", false,
    "A boutique-brand Swiss chrono with vintage pushers that click like a typewriter — underrated and full of charm.", "/watches/w18.jpg", 7000),
  W("ZM-019", "Grand Seiko Automatic 6146", "Grand Seiko", "1960s", "c. 1967", "Automatic 6146", "Stainless steel", "36 mm", "Silver, lion medallion back", "Black leather", "Very good", "Serviced & timed", "auction", false,
    "Early Grand Seiko with the lion medallion intact — the era when Suwa Seiko declared war on Swiss precision.", "/watches/w19.jpg", 22000),
  W("ZM-020", "Seiko Automatic Diver 200 m (6309)", "Seiko", "1980s", "c. 1983", "Automatic 6309", "Stainless steel", "44 mm", "Black, luminous round indices", "Steel bracelet", "Very good, unpolished", "Pressure tested to 200 m", "auction", false,
    "The 6309 cushion-case diver — the tactile, tough-hearted machine that made 'Seiko diver' a genre of its own.", "/watches/w20.jpg", 15000),
  W("ZM-021", "Rolex Oyster Perpetual (Patina Dial)", "Rolex", "1950s", "c. 1958", "Automatic", "Stainless steel", "34 mm", "Tropical patina, gilt printing", "Canvas strap", "Fair — museum-grade patina", "Serviced, sold as collector piece", "auction", true,
    "A 1950s Oyster Perpetual whose dial has aged into tropical honey. Every spot tells sixty years of Bengaluru summers and Swiss steel.", "/watches/w21.jpg", 30000),
  W("ZM-022", "Omega Speedmaster CK2915", "Omega", "1950s", "c. 1959", "Hand-Wound Chronograph 321", "Stainless steel", "38 mm", "Black 'Broad Arrow' dial", "Black leather", "Very good, serviced", "Serviced & timed, papers available", "auction", true,
    "The first Speedmaster — CK2915 with the Broad Arrow dial, calibre 321, the same reference that would later go to the Moon.", "/watches/w22.jpg", 45000),
  W("ZM-023", "Bulova Red LED (Second Series)", "Bulova", "1970s", "c. 1977", "LED Digital", "Stainless steel", "36 mm", "Red LED display", "Steel bracelet", "Good", "Electronics bench-tested", "fixed", false,
    "A second chance at the 70s — same hypnotic red digits, different case lines for the collector who wants a pair.", "/watches/w23.jpg"),
  W("ZM-024", "Longines 'Grand Prize' 10k Gold", "Longines", "1950s", "c. 1956", "Automatic 19AS", "10k gold-filled case", "35 mm", "Cream, dauphine hands", "Black leather", "Excellent", "Serviced & timed", "auction", false,
    "Longines' award-winning automatic in a gold-filled case — the 'Grand Prize' medal still struck on the caseback.", "/watches/w24.jpg", 18000),
  W("ZM-025", "Rado LED Digital (NOS Example)", "Rado", "1970s", "c. 1975", "LED Digital", "Stainless steel", "35 mm", "Red LED display", "Original band", "Excellent — near new old stock", "Electronics bench-tested", "fixed", false,
    "The cleanest Rado LED we have handled — display deep and even, caseback markings factory-sharp.", "/watches/w25.jpg"),
  W("ZM-026", "Timex Ladies LED (Gold Finish)", "Timex", "1970s", "c. 1978", "LED Digital", "Gold-tone steel", "23 mm", "Red LED display", "Gold-tone bracelet", "Good", "Electronics bench-tested", "fixed", false,
    "Gold-tone Timex LED — the kind of piece that turns a jeans-and-kurta outfit into a mood.", "/watches/w26.jpg"),
  W("ZM-027", "Wolbrook Skindiver (Second Example)", "Wolbrook", "1960s", "c. 1967", "Hand-Wound", "Stainless steel", "37 mm", "Black, gilt accents", "Tropic-style strap", "Good", "Serviced & timed", "fixed", false,
    "A second Wolbrook Skindiver from the same French estate — slightly warmer lume, same angular charm.", "/watches/w27.jpg"),
  W("ZM-028", "Tissot PR 516 GL", "Tissot", "1970s", "1972", "Automatic 2481", "Stainless steel", "38 mm", "Silver, racing-style indices", "Steel bracelet", "Very good", "Serviced & timed", "fixed", false,
    "The PR 516 'Grand Luxe' with its signature perforated racing bracelet — motorsport style you can wear to dinner.", "/watches/w28.jpg"),
  W("ZM-029", "Orient Capital (Full Set)", "Orient", "2010s", "c. 2016", "Automatic 21 jewels", "Stainless steel", "40 mm", "Cream, roman numerals", "Brown leather", "Excellent, complete with box", "Fully inspected", "fixed", false,
    "Complete with its original box and tags — the careful collector's version of the Capital.", "/watches/w29.jpg"),
  W("ZM-030", "Seiko 5 (SNK Series)", "Seiko", "1990s", "c. 1995", "Automatic 7S26", "Stainless steel", "37 mm", "Black, arabic numerals", "Canvas strap", "Very good", "Serviced & timed", "fixed", false,
    "The 90s Seiko 5 that started a thousand collections — robust, honest, and always ready.", "/watches/w30.jpg"),
  W("ZM-031", "Seiko 6G34 'Le Grand'", "Seiko", "1980s", "c. 1984", "Quartz Perpetual 6G34", "Stainless steel", "37 mm", "Grey, applied markers", "Steel bracelet", "Excellent", "Serviced, electronics verified", "auction", false,
    "Seiko's 1980s high-tech flagship — a perpetual quartz so advanced it stayed accurate for decades between services.", "/watches/w31.jpg", 10000),
  W("ZM-032", "Omega Speedmaster Schumacher Edition", "Omega", "1990s", "c. 1996", "Automatic Chronograph", "Stainless steel", "39 mm", "Yellow-accent racing dial", "Steel bracelet", "Very good", "Serviced & timed", "fixed", false,
    "The Schumacher-era Speedmaster — F1 energy, yellow highlights, and a rotor that growls like a V10.", "/watches/w32.jpg"),
  W("ZM-033", "Bulova Manual Wind", "Bulova", "1960s", "c. 1964", "Hand-Wound 17 jewels", "Stainless steel", "34 mm", "Silver, crosshair dial", "Black leather", "Very good", "Serviced & timed", "fixed", false,
    "A crosshair-dial Bulova from the Mad Men years — understated American design at its sharpest.", "/watches/w33.jpg"),
  W("ZM-034", "Timex Men's LED", "Timex", "1970s", "c. 1977", "LED Digital", "Stainless steel", "36 mm", "Red LED display", "Steel bracelet", "Good", "Electronics bench-tested", "fixed", false,
    "The people's LED watch — Timex democratised the digital future, one red digit at a time.", "/watches/w34.jpg"),
  W("ZM-035", "Tissot Handaufzug 1958", "Tissot", "1950s", "1958", "Hand-Wound 27B", "Stainless steel", "34 mm", "Two-tone silver dial", "Brown leather", "Very good, original dial", "Serviced & timed", "fixed", false,
    "'Handaufzug' — German for hand-wound — a 1958 Tissot with a two-tone dial that photographs like poetry.", "/watches/w35.jpg"),
  W("ZM-036", "Omega Speedmaster 'Pre-Moon'", "Omega", "1960s", "c. 1968", "Hand-Wound Chronograph 861", "Stainless steel", "42 mm", "Black, DO90 bezel", "Black leather", "Very good, original bezel", "Serviced & timed", "auction", true,
    "A pre-Moon Speedmaster — worn before Apollo, priced before the hype. The serious collector's entry point.", "/watches/w36.jpg", 35000),
  W("ZM-037", "Chateau Manual-Wind 5ATM", "Chateau", "1970s", "c. 1973", "Hand-Wound 17 jewels", "Chrome-plated steel", "36 mm", "Blue-grey dial", "Black leather", "Good", "Serviced & timed", "fixed", false,
    "Swiss-made Chateau with a moody blue-grey dial — the kind of sleeper watch that watchmakers quietly buy.", "/watches/w37.jpg"),
  W("ZM-038", "Seiko Grand Quartz 9940 Twinquartz", "Seiko", "1970s", "1979", "Twin-Quartz 9940", "Stainless steel", "36 mm", "White, polished batons", "Steel bracelet", "Excellent", "Serviced, rated ±5 sec/year", "auction", false,
    "1979 Twin-Quartz technology — chronometer-grade accuracy that humiliated mechanicals of its day, in the best way.", "/watches/w38.jpg", 8500),
  W("ZM-039", "Bulova Ladies Manual Wind", "Bulova", "1960s", "c. 1966", "Hand-Wound 17 jewels", "Gold-tone steel", "24 mm", "Champagne dial", "Black leather", "Very good", "Serviced & timed", "fixed", false,
    "A champagne-dial Bulova for smaller wrists — dainty, dependable, distinctly mid-century.", "/watches/w39.jpg"),
  W("ZM-040", "Longines Electronic Digital (Gold Bezel)", "Longines", "1970s", "c. 1974", "Electronic Digital", "Gold electroplated bezel", "36 mm", "Red LED display", "Black leather", "Very good", "Electronics bench-tested", "fixed", false,
    "Longines' electronic-era flagship with gold bezel gravitas — Swiss tradition meeting the digital dawn.", "/watches/w40.jpg"),
  W("ZM-041", "Bulova Manual Wind (Second Example)", "Bulova", "1960s", "c. 1963", "Hand-Wound 17 jewels", "Stainless steel", "34 mm", "Silver, arrow markers", "Brown leather", "Good", "Serviced & timed", "fixed", false,
    "From the same estate as ZM-033 — a slightly earlier Bulova with arrow markers and a lovely even patina.", "/watches/w41.jpg"),
  W("ZM-042", "Longines Electronic Digital (Wrist Variant)", "Longines", "1970s", "c. 1975", "Electronic Digital", "Gold electroplated bezel", "36 mm", "Red LED display", "Black leather", "Good", "Electronics bench-tested", "fixed", false,
    "The wrist-shot favourite from our window — same Longines electronics, a touch more gold, a lot more swagger.", "/watches/w42.jpg"),
  W("ZM-043", "Timex Electric Model 67", "Timex", "1970s", "c. 1972", "Electric (balance-driven)", "Gold-tone steel", "35 mm", "White, minimal printing", "Brown leather", "Very good", "Serviced & timed", "fixed", false,
    "Made in West Germany for the American giant — Model 67's hybrid heartbeat sits exactly between mechanical and quartz eras.", "/watches/w43.jpg"),
  W("ZM-044", "Tissot PRS 516", "Tissot", "2010s", "c. 2012", "Automatic", "Stainless steel", "42 mm", "Black, steering-wheel caseback", "Perforated leather", "Excellent", "Fully inspected", "fixed", false,
    "Modern PRS 516 with the steering-wheel caseback — a love letter to 70s racing that still keeps COSC-ish time.", "/watches/w44.jpg"),
  W("ZM-045", "Casio F-91W (Early Module)", "Casio", "1990s", "c. 1993", "Quartz Digital 593", "Resin", "35 mm", "Grey LCD", "Resin strap", "Excellent", "New battery", "fixed", false,
    "An early-90s module in remarkable shape — the F-91W that belongs in a design museum, because it is one.", "/watches/w45.jpg"),
  W("ZM-046", "Orient Capital (NOS, Unused)", "Orient", "2010s", "c. 2017", "Automatic 21 jewels", "Stainless steel", "40 mm", "Cream, roman numerals", "Brown leather, unworn", "New old stock, tags intact", "Fully inspected", "fixed", false,
    "Factory tags still on the strap — an unworn time capsule for someone who missed these the first time.", "/watches/w46.jpg"),
  W("ZM-047", "Glycine Airman SST Chronograph", "Glycine", "1970s", "c. 1972", "Automatic Chronograph", "Stainless steel", "40 mm", "Panda reverse, GMT hand", "Steel bracelet", "Very good", "Serviced & timed", "auction", false,
    "The Airman SST — Glycine's pilot-chrono with a GMT hand, made for the golden age of intercontinental flight.", "/watches/w47.jpg", 16000),
  W("ZM-048", "Seiko Marinemaster SBDX001", "Seiko", "2000s", "c. 2008", "Automatic 8L35", "Stainless steel", "44 mm", "Black, highly luminous", "Steel bracelet", "Excellent", "Pressure tested to 300 m", "auction", false,
    "The SBDX001 Marinemaster — Grand Seiko finishing in a 300 m professional diver. Seiko's quiet masterpiece.", "/watches/w48.jpg", 28000),
  W("ZM-049", "Omega Speedmaster Schumacher (Legend)", "Omega", "1990s", "c. 1997", "Automatic Chronograph", "Stainless steel", "39 mm", "Carbon-look racing dial", "Steel bracelet", "Very good", "Serviced & timed", "fixed", false,
    "The Legend edition with carbon-effect dial — Schumacher-era Speedmasters are the last affordable Moon-watch bloodline.", "/watches/w49.jpg"),
  W("ZM-050", "Bulova 'Senator'", "Bulova", "1950s", "c. 1955", "Hand-Wound 17 jewels", "Gold-filled", "34 mm", "Silver, gilt printing", "Black leather", "Very good", "Serviced & timed", "fixed", false,
    "The Senator — gold-filled, gilt-printed, and named like it expects to be addressed properly.", "/watches/w50.jpg"),
];

export const BRANDS = Array.from(new Set(WATCHES.map((w) => w.brand))).sort();
export const ERAS = Array.from(new Set(WATCHES.map((w) => w.era))).sort();
export const FEATURED = WATCHES.filter((w) => w.featured);
export const AUCTIONS = WATCHES.filter((w) => w.stockType === "auction");
export const TOTAL_COUNT = WATCHES.length;

export const MIN_BID_INCREMENT = 250; // ₹

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
