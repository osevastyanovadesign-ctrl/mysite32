import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import { HERO_MUG } from "@/data/products";
import { useLang } from "./LanguageContext";

// Temporary Hero gallery.
// Replace these images later with the final editorial photographs.
const HERO_GALLERY = [
  HERO_MUG,
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/83efb2335_generated_be9a25a3.png",
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/36ac4fb1b_generated_4a2b6179.png",
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/28b7cf839_generated_a19c3ac2.png",
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/20f41a2b0_generated_eb2dbd39.png",
  "https://media.base44.com/images/public/6a74367b534263a38dd99a70/30f1ad508_generated_image.png",
];

const STACK_POSES = [
  {
    rotate: 5,
    x: -14,
    y: 12,
    scale: 0.965,
    origin: "bottom left",
  },
  {
    rotate: -7,
    x: -10,
    y: 6,
    scale: 0.972,
    origin: "top right",
  },
  {
    rotate: 4,
    x: 11,
    y: -2,
    scale: 0.98,
    origin: "bottom right",
  },
  {
    rotate: -6,
    x: -7,
    y: 8,
    scale: 0.986,
    origin: "top left",
  },
  {
    rotate: 7,
    x: 8,
    y: -5,
    scale: 0.993,
    origin: "bottom left",
  },
  {
    rotate: -2,
    x: 0,
    y: 0,
    scale: 1,
    origin: "center center",
  },
];

const MAX_STACK = 6;

export default function Hero() {
  const { t } = useLang();

  const [open, setOpen] = useState(false);

  // Physical cards from bottom → top.
// Each card has its own permanent identity.
const [stack, setStack] = useState([
  {
    id: 0,
    photoIndex: 0,
  },
]);

const [current, setCurrent] = useState(0);

// Physical card currently being lifted.
const [liftingCard, setLiftingCard] = useState(null);

const nextCardId = useRef(1);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // ------------------------------------------------------------
  // Tilt
  // ------------------------------------------------------------

  const rx = useMotionValue(0.5);
  const ry = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(ry, [0, 1], [7, -7]),
    {
      stiffness: 120,
      damping: 14,
    }
  );

  const rotateY = useSpring(
    useTransform(rx, [0, 1], [-9, 9]),
    {
      stiffness: 120,
      damping: 14,
    }
  );

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    rx.set((e.clientX - rect.left) / rect.width);
    ry.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    rx.set(0.5);
    ry.set(0.5);
  };

  // ------------------------------------------------------------
  // Stack
  // ------------------------------------------------------------

  const topCard = stack[stack.length - 1];

  const addNextCard = () => {
  setLiftingCard(null);

  setStack((prev) => {
    const lastPhotoIndex =
      prev[prev.length - 1].photoIndex;

    const nextIndex =
      (lastPhotoIndex + 1) %
      HERO_GALLERY.length;

    const newCard = {
      id: nextCardId.current++,
      photoIndex: nextIndex,
    };

    setCurrent(nextIndex);

    // First build the physical stack.
    if (prev.length < MAX_STACK) {
      return [...prev, newCard];
    }

    // Stack is full.
    // Remove the top physical card
    // and put a new physical card on top.
    const withoutTop =
      prev.slice(0, -1);

    return [
      ...withoutTop,
      newCard,
    ];
  });
};

  const bringToTop = (cardId) => {
  const selectedCard = stack.find(
    (card) => card.id === cardId
  );

  if (!selectedCard) {
    return;
  }

  if (selectedCard.id === topCard?.id) {
    return;
  }

  // Нижняя карточка сразу становится верхней
  // в обычной позиции стопки.
  setLiftingCard(null);

  setStack((prev) => {
    const withoutSelected = prev.filter(
      (card) => card.id !== cardId
    );

    return [
      ...withoutSelected,
      selectedCard,
    ];
  });

  setCurrent(selectedCard.photoIndex);
};

  const next = () => {
    addNextCard();
  };

  const prev = () => {
  setLiftingCard(null);

  setStack((prev) => {
    if (prev.length <= 1) {
      return prev;
    }

    const oldTop =
      prev[prev.length - 1];

    const newTop =
      prev[prev.length - 2];

    const reordered = [
      ...prev.slice(0, -2),
      oldTop,
      newTop,
    ];

    setCurrent(
      newTop.photoIndex
    );

    return reordered;
  });
};

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Hero photograph */}
      <div className="relative w-full">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={HERO_MUG}
            alt="A white Peek ceramic mug with the Eva dachshund print"
            className="w-full aspect-[4/3] object-cover squircle-lg shadow-2xl shadow-primary/10"
            fittingType="fill"
          />
        </motion.div>

        {/* =====================================================
            POLAROID STACK
        ====================================================== */}

        <div
          className="
            absolute
            right-40
            inset-y-0
            my-auto
            w-[320px]
            md:w-[400px]
            aspect-[3/4]
          "
        >
          <AnimatePresence initial={false}>
            {stack.map((card, stackIndex) => {
             const photoIndex = card.photoIndex;
              const pose =
                STACK_POSES[
                  Math.min(
                    stackIndex,
                    STACK_POSES.length - 1
                  )
                ];

              const isTop =
                stackIndex === stack.length - 1;

              const isLifting =
               liftingCard === card.id;

              return (
                <motion.div
                  key={card.id}
                  initial={{
                    opacity: 0,
                    x: 45,
                    y: -100,
                    rotate: pose.rotate + 10,
                    scale: 0.92,
                  }}
                  animate={
  isLifting
    ? {
        opacity: 1,
        x: "-25vw",
        y: 0,
        rotate: 0,
        scale: 1.28,
        zIndex: 100,
      }
    : {
        opacity: 1,
        x: pose.x,
        y: pose.y,
        rotate: pose.rotate,
        scale: pose.scale,
        zIndex: stackIndex + 1,
      }
}
                  exit={{
                    opacity: 0,
                    x: 100,
                    y: -130,
                    rotate: pose.rotate + 15,
                    scale: 0.9,
                  }}
                  transition={
  isLifting
    ? {
        type: "spring",
        stiffness: 140,
        damping: 18,
        mass: 0.8,
      }
    : {
        type: "spring",
        stiffness: 180,
        damping: 20,
        mass: 0.75,
      }
}
                  style={{
                    transformOrigin: pose.origin,
                  }}
                  onClick={() => {
                  if (isTop) {
                  if (stack.length < MAX_STACK) {
                  next();
                  } else {
                  setLiftingCard(
                  liftingCard === card.id
                  ? null
                  : card.id
                  );
                   }
                  } else {
                 bringToTop(card.id);
                 }
              }}
                  className="
                    absolute
                    inset-0
                    text-left
                    cursor-pointer
                  "
                >
                  <motion.div
                    onMouseMove={
                      isTop
                        ? handleMove
                        : undefined
                    }
                    onMouseLeave={
                      isTop
                        ? reset
                        : undefined
                    }
                    style={
                      isTop && !isLifting
                        ? {
                            rotateX,
                            rotateY,
                            transformPerspective: 900,
                          }
                        : {
                            transformPerspective: 900,
                          }
                    }
                    className="w-full h-full"
                  >
                    <div
                      className="
                        relative
                        w-full
                        h-full
                        bg-white
                        p-3
                        md:p-4
                        pb-7
                        md:pb-9
                        shadow-[0_12px_30px_rgba(0,0,0,0.16)]
                      "
                    >
                      {/* Photo */}
                      <div
                        className="
                          relative
                          w-full
                          h-[80%]
                          overflow-hidden
                          bg-secondary/20
                        "
                      >
                        <Image
                          src={
                            HERO_GALLERY[
                              photoIndex
                            ]
                          }
                          alt={`PEEK editorial scene ${
                            photoIndex + 1
                          }`}
                          className="w-full h-full object-cover"
                          fittingType="fill"
                        />
                      </div>

                      {/* Caption */}
                      <div className="relative mt-4 md:mt-5 pr-14">
                        <p className="font-display text-base md:text-lg leading-snug text-foreground">
                          A little joy for every morning.
                        </p>
                      </div>

                      {/* Arrows only on top */}
                      {isTop && (
                        <div
                          className="
                            absolute
                            bottom-4
                            md:bottom-5
                            right-4
                            md:right-5
                            flex
                            items-center
                            gap-1
                          "
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              prev();
                            }}
                            className="
                              w-8
                              h-8
                              flex
                              items-center
                              justify-center
                              text-foreground/60
                              hover:text-foreground
                              transition-colors
                            "
                            aria-label="Previous scene"
                          >
                            <ChevronLeft
                              className="w-4 h-4"
                              strokeWidth={1.5}
                            />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              next();
                            }}
                            className="
                              w-8
                              h-8
                              flex
                              items-center
                              justify-center
                              text-foreground/60
                              hover:text-foreground
                              transition-colors
                            "
                            aria-label="Next scene"
                          >
                            <ChevronRight
                              className="w-4 h-4"
                              strokeWidth={1.5}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* =====================================================
            EXPANDED HERO GALLERY
        ====================================================== */}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                z-[70]
                flex
                items-end
                md:items-center
                justify-center
                p-0
                md:p-6
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  bg-foreground/40
                  backdrop-blur-sm
                "
                onClick={() => setOpen(false)}
              />

              <motion.div
                initial={{
                  y: 40,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: 40,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  z-10
                  w-full
                  max-w-6xl
                  h-[70vh]
                  bg-background
                  rounded-[2.5rem]
                  overflow-hidden
                  grid
                  md:grid-cols-2
                  shadow-2xl
                "
              >
                {/* Close */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    absolute
                    top-4
                    right-4
                    z-20
                    w-10
                    h-10
                    rounded-full
                    bg-background/80
                    backdrop-blur
                    flex
                    items-center
                    justify-center
                    text-foreground
                    hover:text-primary
                    transition-colors
                  "
                  aria-label="Close"
                >
                  <X
                    className="w-5 h-5"
                    strokeWidth={1.5}
                  />
                </button>

                {/* Gallery image */}
                <div className="relative h-[40vh] md:h-full overflow-hidden bg-secondary/40">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={
                          HERO_GALLERY[
                            current
                          ]
                        }
                        alt={`PEEK editorial image ${
                          current + 1
                        }`}
                        className="w-full h-full object-cover"
                        fittingType="fill"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gallery controls */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prev}
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-background/85
                        backdrop-blur
                        flex
                        items-center
                        justify-center
                        text-foreground
                        hover:text-primary
                        transition-colors
                      "
                      aria-label="Previous image"
                    >
                      <ChevronLeft
                        className="w-5 h-5"
                        strokeWidth={1.5}
                      />
                    </button>

                    <span
                      className="
                        rounded-full
                        bg-background/85
                        backdrop-blur
                        px-4
                        py-2
                        text-xs
                        tracking-[0.2em]
                        text-foreground
                      "
                    >
                      {String(
                        current + 1
                      ).padStart(2, "0")}{" "}
                      /{" "}
                      {String(
                        HERO_GALLERY.length
                      ).padStart(2, "0")}
                    </span>

                    <button
                      type="button"
                      onClick={next}
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-background/85
                        backdrop-blur
                        flex
                        items-center
                        justify-center
                        text-foreground
                        hover:text-primary
                        transition-colors
                      "
                      aria-label="Next image"
                    >
                      <ChevronRight
                        className="w-5 h-5"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </div>

                {/* Editorial text */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
                    PEEK
                  </p>

                  <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-foreground">
                    {t("heroCard.title")}{" "}
                    <span className="italic text-primary">
                      {t("heroCard.accent")}
                    </span>
                  </h2>

                  <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                    {t("heroCard.body")}
                  </p>

                  <div className="mt-8 border-l-2 border-secondary pl-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {String(
                        current + 1
                      ).padStart(2, "0")}
                    </p>

                    <p className="font-display text-xl italic text-foreground">
                      {t("heroCard.story")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.3,
          duration: 1,
        }}
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          flex
          flex-col
          items-center
          gap-2
          text-muted-foreground
        "
      >
        <span className="text-xs uppercase tracking-[0.25em]">
          {t("hero.scroll")}
        </span>

        <ArrowDown
          className="w-4 h-4 animate-bounce"
          strokeWidth={1.5}
        />
      </motion.div>
    </section>
  );
}
