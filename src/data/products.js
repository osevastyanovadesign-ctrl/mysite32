// Peek — product catalog, three series, and brand identity.
// All text fields are objects keyed by language code (en/de/sr/ru).

export const MASCOT_DACHSHUND =
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/744b3ce3d_generated_07a9ccef.png";

// Eva — the sitting red dachshund, printed on the intro curtain fabric.
export const EVA_DACHSHUND =
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/cdef94de1_generated_image.png";

// The hero mug — a plain white ceramic mug with the Eva print.
export const HERO_MUG =
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/2445bebc2_generated_image.png";

export const PACKAGING_IMAGE =
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/44ff184d0_generated_6465872f.png";

export const LIFESTYLE_IMAGE =
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/91e72c8d7_generated_c1f6098a.png";

// Showcase images for the two bespoke (commission) series.
export const PORTRAIT_IMAGE =
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/e876bfd98_generated_image.png";
export const MIXED_IMAGE =
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/1401b9f4d_generated_image.png";

const L = (en, de, sr, ru) => ({ en, de, sr, ru });

// Series 01 — Prints. Ten ready, hand-illustrated animal mugs.
export const PRODUCTS = [
  {
    id: "fox",
    price: 32,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/83efb2335_generated_be9a25a3.png",
    name: L("Found You", "Dich gefunden", "Našao te", "Нашёл тебя"),
    animal: L("Red Fox", "Rotfuchs", "Crvena lisica", "Красная лисица"),
    narrative: L(
      "A red fox at the woodland edge. She waited three seasons for your eyes to meet. Hand-illustrated, white ceramic, 350 ml.",
      "Ein Rotfuchs am Waldrand. Er wartete drei Jahreszeiten, bis eure Augen sich trafen. Handgezeichnet, weiße Keramik, 350 ml.",
      "Crvena lisica na rubu šume. Čekala je tri godišnja doba da se vaši pogledi sretnu. Ručno ilustrovano, bela keramika, 350 ml.",
      "Рыжая лисица на опушке. Ждала три сезона, пока ваши взгляды не встретились. Ручная иллюстрация, белая керамика, 350 мл."
    ),
  },
  {
    id: "deer",
    price: 32,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/36ac4fb1b_generated_4a2b6179.png",
    name: L("A Quiet Hello", "Ein leises Hallo", "Tihi pozdrav", "Тихое приветствие"),
    animal: L("Fallow Deer", "Damhirsch", "Lopatara", "Лань"),
    narrative: L(
      "A fallow deer. Every morning she steps into the clearing to check you are still there. You are. She stays. Hand-illustrated on ceramic.",
      "Ein Damhirsch. Jeden Morgen tritt er auf die Lichtung, um zu sehen, ob du noch da bist. Du bist. Er bleibt. Handgezeichnet auf Keramik.",
      "Lopatara. Svakog jutra izlazi na čistinu da proveri da li si još tu. Jesi. Ona ostaje. Ručno ilustrovano na keramici.",
      "Пятнистая лань. Каждое утро выходит на поляну проверить, тут ли вы. Вы тут. Она остаётся. Ручная иллюстрация на керамике."
    ),
  },
  {
    id: "owl",
    price: 34,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/28b7cf839_generated_a19c3ac2.png",
    name: L("Waiting for Your Glance", "Wartet auf deinen Blick", "Čeka tvoj pogled", "Ждёт вашего взгляда"),
    animal: L("Barn Owl", "Schleiereule", "Bela sova", "Сипуха"),
    narrative: L(
      "A barn owl. She has seen every kind of dark and chosen to keep looking. She turns to you — a small invitation to stay.",
      "Eine Schleiereule. Sie hat jede Form der Dunkelheit gesehen und beschlossen, weiterzuschauen. Sie wendet sich dir zu — eine kleine Einladung zu bleiben.",
      "Bela sova. Videla je svaku vrstu mraka i izabrala da nastavi da gleda. Okreće se prema tebi — mali poziv da ostaneš.",
      "Сипуха. Видела всякий мрак и решила смотреть дальше. Поворачивается к вам — небольшое приглашение остаться."
    ),
  },
  {
    id: "cat",
    price: 30,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/20f41a2b0_generated_eb2dbd39.png",
    name: L("The Slow Blink", "Der langsame Lidschlag", "Sporo treptanje", "Медленное моргание"),
    animal: L("Tabby Cat", "Tigerkatze", "Risasta mačka", "Полосатый кот"),
    narrative: L(
      "A tabby cat. He doesn't give his gaze to just anyone. The blink, when it comes, is slow and full — it means: I see you, and I stay.",
      "Eine Tigerkatze. Er schenkt seinen Blick nicht jedem. Der Lidschlag, wenn er kommt, ist langsam und voll — er bedeutet: Ich sehe dich, und ich bleibe.",
      "Risasta mačka. Ne poklanja svoj pogled bilo kome. Treptanje, kad dođe, je sporo i puno — znači: vidim te, i ostajem.",
      "Полосатый кот. Дарит взгляд не каждому. Моргание, когда приходит, медленное и полное — значит: я вижу тебя и остаюсь."
    ),
  },
  {
    id: "hare",
    price: 30,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/30f1ad508_generated_image.png",
    name: L("Alert", "Wachsam", "Budan", "Насторожился"),
    animal: L("Brown Hare", "Feldhase", "Poljski zec", "Заяц-русак"),
    narrative: L(
      "A brown hare. Ears back, eyes forward, alert. Hand-illustrated, white ceramic, 350 ml.",
      "Ein Feldhase. Ohren zurück, Augen nach vorn, wachsam. Handgezeichnet, weiße Keramik, 350 ml.",
      "Poljski zec. Uši nazad, oči napred, budan. Ručno ilustrovano, bela keramika, 350 ml.",
      "Заяц-русак. Уши назад, глаза вперёд, насторожился. Ручная иллюстрация, белая керамика, 350 мл."
    ),
  },
  {
    id: "hedgehog",
    price: 30,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/72fb930f0_generated_image.png",
    name: L("Snout Up", "Schnauze hoch", "Njuška gore", "Нос вверх"),
    animal: L("Hedgehog", "Igel", "Jež", "Ёж"),
    narrative: L(
      "A hedgehog. He peeks over the torn edge and looks right at you. Hand-illustrated on ceramic.",
      "Ein Igel. Er schaut über den zerrissenen Rand und blickt dich direkt an. Handgezeichnet auf Keramik.",
      "Jež. Viri preko pocepanog ruba i gleda pravo u tebe. Ručno ilustrovano na keramici.",
      "Ёж. Выглядывает из-за разорванного края и смотрит прямо на вас. Ручная иллюстрация на керамике."
    ),
  },
  {
    id: "robin",
    price: 30,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/20eec18a3_generated_image.png",
    name: L("Head Tilt", "Kopf schief", "Kosa glava", "Голова набок"),
    animal: L("European Robin", "Rotkehlchen", "Crvendać", "Малиновка"),
    narrative: L(
      "A European robin. Head tilted, red breast, eyes forward. Hand-illustrated, 350 ml.",
      "Ein Rotkehlchen. Kopf schief, rote Brust, Augen nach vorn. Handgezeichnet, 350 ml.",
      "Crvendać. Kosa glava, crvene grudi, oči napred. Ručno ilustrovano, 350 ml.",
      "Малиновка. Голова набок, рыжая грудка, смотрит прямо. Ручная иллюстрация, 350 мл."
    ),
  },
  {
    id: "wolf",
    price: 34,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/e6e5c5801_generated_image.png",
    name: L("Amber Eyes", "Bernsteinaugen", "Jantarne oči", "Янтарные глаза"),
    animal: L("Grey Wolf", "Grauwolf", "Sivi vuk", "Серый волк"),
    narrative: L(
      "A grey wolf with amber eyes. He looks straight at you, steady and unhurried. Hand-illustrated on ceramic.",
      "Ein Grauwolf mit Bernsteinaugen. Er blickt dich direkt an, ruhig und ungestüm. Handgezeichnet auf Keramik.",
      "Sivi vuk sa jantarnim očima. Gleda pravo u tebe, mirno i nežurno. Ručno ilustrovano na keramici.",
      "Серый волк с янтарными глазами. Смотрит прямо и неспешно. Ручная иллюстрация на керамике."
    ),
  },
  {
    id: "bear",
    price: 34,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/d7241a249_generated_image.png",
    name: L("Calm Gaze", "Ruhiger Blick", "Miran pogled", "Спокойный взгляд"),
    animal: L("Brown Bear", "Braunbär", "Mrki medved", "Бурый медведь"),
    narrative: L(
      "A brown bear. A calm, steady gaze over the torn edge. Hand-illustrated, matte ceramic, 350 ml.",
      "Ein Braunbär. Ein ruhiger, stetiger Blick über den zerrissenen Rand. Handgezeichnet, matte Keramik, 350 ml.",
      "Mrki medved. Miran, stalan pogled preko pocepanog ruba. Ručno ilustrovano, mat keramika, 350 ml.",
      "Бурый медведь. Спокойный, ровный взгляд из-за разорванного края. Ручная иллюстрация, матовая керамика, 350 мл."
    ),
  },
  {
    id: "stag",
    price: 34,
    image: "https://media.base44.com/images/public/6a74367b534263a38dd99a70/f34d9921f_generated_image.png",
    name: L("Antlers", "Geweih", "Rogovi", "Рога"),
    animal: L("Red Deer", "Rothirsch", "Jelen lopatar", "Благородный олень"),
    narrative: L(
      "A red deer stag with antlers. He looks straight at you through the torn paper. Hand-illustrated, fired ceramic.",
      "Ein Rothirsch mit Geweih. Er blickt dich durch das zerrissene Papier direkt an. Handgezeichnet, gebrannte Keramik.",
      "Jelen lopatar sa rogovima. Gleda pravo u tebe kroz pocepani papir. Ručno ilustrovano, pečena keramika.",
      "Благородный олень с рогами. Смотрит прямо на вас сквозь разорванный край. Ручная иллюстрация, обожжённая керамика."
    ),
  },
];

// Series 02 & 03 — bespoke commission work (no fixed price, no modal).
export const TIERS = [
  {
    id: "portrait",
    image: PORTRAIT_IMAGE,
    alt: L(
      "A personalized mug with a golden retriever peeking from torn paper",
      "Eine personalisierte Tasse mit einem Golden Retriever, der aus zerrissenem Papier schaut",
      "Personalizovana šolja sa zlatnim retriverom koji viri iz pocepanog papira",
      "Персонализированная кружка с золотистым ретривером, выглядывающим из разорванной бумаги"
    ),
  },
  {
    id: "mixed",
    image: MIXED_IMAGE,
    alt: L(
      "A fine-art mug with a watercolor hare gazing upward",
      "Eine Kunsttasse mit einem nach oben blickenden Aquarellhasen",
      "Umetnička šolja sa akvarelnim zecom koji gleda nagore",
      "Художественная кружка с акварельным зайцем, смотрящим вверх"
    ),
  },
];

export const BRAND = {
  philosophy: L(
    "Peek makes ceramic mugs with hand-illustrated animals. We draw by hand: the animal peeks from torn paper and meets your gaze. Every piece is fired and signed. We believe the bond between human and animal is the art we want to make.",
    "Peek stellt Keramiktassen mit handgezeichneten Tieren her. Wir zeichnen von Hand: das Tier blickt aus zerrissenem Papier hervor und begegnet deinem Blick. Jedes Stück ist gebrannt und signiert. Wir glauben, die Verbindung zwischen Mensch und Tier ist die Kunst, die wir machen wollen.",
    "Peek pravi keramičke šolje sa ručno ilustrovanim životinjama. Crtamo rukom: životinja viri iz pocepanog papira i susreće tvoj pogled. Svaki komad je pečen i potpisan. Verujemo da je veza između čoveka i životinje umetnost koju želimo da stvaramo.",
    "Peek делает керамические кружки с авторскими иллюстрациями животных. Мы рисуем от руки: животное выглядывает из разорванной бумаги и встречается с вами взглядом. Каждая работа обожжена и подписана. Мы верим, что связь между человеком и животным — это та форма искусства, которой мы хотим заниматься."
  ),
  mission: L(
    "To fill the morning coffee or tea with a moment of quiet company — so the mug looks at you the way your pet waits at the door.",
    "Den morgendlichen Kaffee oder Tee mit einem Moment stiller Gesellschaft füllen — damit die Tasse dich ansieht, wie dein Tier an der Tür wartet.",
    "Da ispunimo jutarnju kafu ili čaj trenutkom tihog druženja — da šolja gleda u tebe onako kako tvoj ljubimac čeka pred vratima.",
    "Наполнить утренний кофе или чай моментом тихого общения — чтобы кружка смотрела на вас так, как ваш питомец ждёт у двери."
  ),
  values: [
    {
      title: L("Empathy", "Empathie", "Empatija", "Эмпатия"),
      body: L(
        "We draw the soft second when two creatures notice each other.",
        "Wir zeichnen die sanfte Sekunde, in der zwei Wesen einander bemerken.",
        "Crtamo onaj nežni trenutak kada dva stvora primete jedno drugo.",
        "Мы рисуем ту мягкую секунду, когда два существа замечают друг друга."
      ),
    },
    {
      title: L("Hand-made", "Handarbeit", "Ručni rad", "Ручная работа"),
      body: L(
        "Every print is drawn by hand and fired in a kiln. No templates.",
        "Jeder Druck ist von Hand gezeichnet und im Ofen gebrannt. Keine Schablonen.",
        "Svaki otisak je nacrtan rukom i pečen u peći. Bez šablona.",
        "Каждый принт нарисован от руки и обожжён в печи. Никаких шаблонов."
      ),
    },
    {
      title: L("Warm Simplicity", "Warme Einfachheit", "Tople jednostavnost", "Тёплая простота"),
      body: L(
        "Warmth without sentimentality. Quiet, never dull.",
        "Wärme ohne Sentimentalität. Leise, nie langweilig.",
        "Toplina bez sentimentalnosti. Tiho, nikad dosadno.",
        "Тепло без сентиментальности. Тихо, но не скучно."
      ),
    },
    {
      title: L("Unconditional Love", "Bedingungslose Liebe", "Bezuslovna ljubav", "Безусловная любовь"),
      body: L(
        "The kind that waits at the door — patient, unguarded, whole.",
        "Die Art, die an der Tür wartet — geduldig, unbeschützt, ganz.",
        "Onakva koja čeka pred vratima — strpljiva, nečuvana, celovita.",
        "Та, что ждёт у двери — терпеливая, беззащитная, полная."
      ),
    },
  ],
  voice: L(
    "The Whispered Invitation — gentle, poetic, and a little whimsical.",
    "Die geflüsterte Einladung — sanft, poetisch und ein wenig verspielt.",
    "Šaputana pozivnica — nežna, poetska i pomalo razigrana.",
    "Шёпотное приглашение — нежный, поэтичный и немного причудливый тон."
  ),
  voiceLines: [
    L("Found you.", "Dich gefunden.", "Našao te.", "Нашёл тебя."),
    L("A quiet hello.", "Ein leises Hallo.", "Tihi pozdrav.", "Тихое приветствие."),
    L("Waiting for your glance.", "Wartet auf deinen Blick.", "Čeka tvoj pogled.", "Ждёт твоего взгляда."),
  ],
};