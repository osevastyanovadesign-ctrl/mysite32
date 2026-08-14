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


// ============================================================
// HERO GALLERY
// ============================================================

const HERO_GALLERY = [
  HERO_MUG,
  HERO_MUG,
  HERO_MUG,
  HERO_MUG,
  HERO_MUG,
  HERO_MUG,
];


// ============================================================
// PHYSICAL POSITIONS OF CARDS
// bottom → top
// ============================================================

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


// ============================================================
// HERO
// ============================================================

export default function Hero() {
  const { t } = useLang();

  const [open, setOpen] = useState(false);

  // ------------------------------------------------------------
  // Physical cards.
  // Bottom → top.
  // ------------------------------------------------------------

  const [stack, setStack] = useState([
    {
      id: 0,
      photoIndex: 0,
    },
  ]);

  const [current, setCurrent] = useState(0);

  // Card that is currently being brought to the top.
  const [liftingCard, setLiftingCard] = useState(null);

  // Card that is currently leaving the top.
  const [exitingTop, setExitingTop] = useState(null);

  const nextCardId = useRef(1);


  // ============================================================
  // BODY LOCK WHEN GALLERY IS OPEN
  // ============================================================

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);


  // ============================================================
  // TILT
  // ============================================================

  const rx = useMotionValue(0.5);
  const ry = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(
      ry,
      [0, 1],
      [7, -7]
    ),
    {
      stiffness: 120,
      damping: 14,
    }
  );

  const rotateY = useSpring(
    useTransform(
      rx,
      [0, 1],
      [-9, 9]
    ),
    {
      stiffness: 120,
      damping: 14,
    }
  );

  const handleMove = (e) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    rx.set(
      (e.clientX - rect.left) /
        rect.width
    );

    ry.set(
      (e.clientY - rect.top) /
        rect.height
    );
  };

  const resetTilt = () => {
    rx.set(0.5);
    ry.set(0.5);
  };


  // ============================================================
  // HELPERS
  // ============================================================

  const topCard =
    stack[stack.length - 1];


  // ============================================================
  // NEXT
  //
  // Clicking the top card:
  // 1. it flies slightly forward
  // 2. then disappears
  // 3. a new physical card appears on top
  // ============================================================

  const addNextCard = () => {
    if (liftingCard !== null) {
      return;
    }

    if (exitingTop !== null) {
      return;
    }

    if (!topCard) {
      return;
    }

    const nextPhotoIndex =
      (topCard.photoIndex + 1) %
      HERO_GALLERY.length;

    const newCard = {
      id: nextCardId.current++,
      photoIndex: nextPhotoIndex,
    };

    setCurrent(nextPhotoIndex);

    // ----------------------------------------------------------
    // If stack isn't full yet:
    // simply add a new physical card.
    // ----------------------------------------------------------

    if (stack.length < MAX_STACK) {
      setExitingTop(topCard.id);

      setTimeout(() => {
        setStack((prev) => [
          ...prev,
          newCard,
        ]);

        setExitingTop(null);
      }, 420);

      return;
    }

    // ----------------------------------------------------------
    // Stack is full.
    // Remove the current top physical card
    // and replace it with a new one.
    // ----------------------------------------------------------

    setExitingTop(topCard.id);

    setTimeout(() => {
      setStack((prev) => {
        const withoutTop =
          prev.slice(0, -1);

        return [
          ...withoutTop,
          newCard,
        ];
      });

      setExitingTop(null);
    }, 420);
  };


  // ============================================================
  // BRING ANY LOWER CARD TO TOP
  //
  // This is the important part.
  //
  // The selected card FIRST physically rises from its
  // CURRENT position.
  //
  // The rest of the stack does NOT move yet.
  //
  // Only after the card reaches the front do we reorder
  // the physical stack.
  // ============================================================

  const bringToTop = (cardId) => {
    if (liftingCard !== null) {
      return;
    }

    if (exitingTop !== null) {
      return;
    }

    const selectedCard =
      stack.find(
        (card) => card.id === cardId
      );

    if (!selectedCard) {
      return;
    }

    if (
      selectedCard.id ===
      topCard?.id
    ) {
      return;
    }

    // ----------------------------------------------------------
    // Start lifting.
    // ----------------------------------------------------------

    setLiftingCard(cardId);

    // Gallery image changes immediately,
    // but the physical card has not been reordered yet.
    setCurrent(
      selectedCard.photoIndex
    );

    // ----------------------------------------------------------
    // After the physical lift finishes,
    // move selected card to the top of the array.
    // ----------------------------------------------------------

    setTimeout(() => {
      setStack((prev) => {
        const card =
          prev.find(
            (item) =>
              item.id === cardId
          );

        if (!card) {
          return prev;
        }

        const remaining =
          prev.filter(
            (item) =>
              item.id !== cardId
          );

        return [
          ...remaining,
          card,
        ];
      });

      setLiftingCard(null);
    }, 520);
  };


  // ============================================================
  // PREVIOUS
  //
  // The card directly under the top becomes top.
  // ============================================================

  const previous = () => {
    if (liftingCard !== null) {
      return;
    }

    if (exitingTop !== null) {
      return;
    }

    setStack((prev) => {
      if (prev.length <= 1) {
        return prev;
      }

      const previousTop =
        prev[prev.length - 2];

      const currentTop =
        prev[prev.length - 1];

      const reordered = [
        ...prev.slice(0, -2),
        currentTop,
        previousTop,
      ];

      setCurrent(
        previousTop.photoIndex
      );

      return reordered;
    });
  };


  // ============================================================
  // NEXT
  // ============================================================

  const next = () => {
    addNextCard();
  };


  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section
      id="top"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-background
      "
    >

      {/* ======================================================
          HERO PHOTO
      ======================================================= */}

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
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <Image
            src={HERO_MUG}
            alt="A white Peek ceramic mug with the Eva dachshund print"
            className="
              w-full
              aspect-[4/3]
              object-cover
              squircle-lg
              shadow-2xl
              shadow-primary/10
            "
            fittingType="fill"
          />
        </motion.div>


        {/* ====================================================
            POLAROID STACK
        ===================================================== */}

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

          <AnimatePresence
            initial={false}
          >

            {stack.map(
              (card, stackIndex) => {

                const pose =
                  STACK_POSES[
                    Math.min(
                      stackIndex,
                      STACK_POSES.length - 1
                    )
                  ];

                const isTop =
                  stackIndex ===
                  stack.length - 1;

                const isLifting =
                  liftingCard ===
                  card.id;

                const isExiting =
                  exitingTop ===
                  card.id;


                // ------------------------------------------------
                // NORMAL CARD
                // ------------------------------------------------

                let animation = {
                  opacity: 1,
                  x: pose.x,
                  y: pose.y,
                  rotate: pose.rotate,
                  scale: pose.scale,
                  zIndex:
                    stackIndex + 1,
                };


                // ------------------------------------------------
                // LOWER CARD BEING BROUGHT TO FRONT
                //
                // VERY IMPORTANT:
                // keep its original rotation,
                // x and scale.
                //
                // Only move it upward and forward.
                // ------------------------------------------------

                if (isLifting) {
                  animation = {
                    opacity: 1,

                    x: pose.x,

                    y: pose.y - 150,

                    rotate: pose.rotate,

                    scale:
                      pose.scale + 0.025,

                    zIndex: 100,
                  };
                }


                // ------------------------------------------------
                // TOP CARD BEING OPENED / REMOVED
                //
                // It moves forward and slightly upward.
                // ------------------------------------------------

                if (isExiting) {
                  animation = {
                    opacity: 0,

                    x: pose.x,

                    y: pose.y - 110,

                    rotate: pose.rotate,

                    scale: 1.04,

                    zIndex: 100,
                  };
                }


                return (
                  <motion.div
                    key={card.id}

                    initial={{
                      opacity: 0,
                      x: pose.x,
                      y: pose.y - 30,
                      rotate:
                        pose.rotate,
                      scale:
                        pose.scale - 0.03,
                    }}

                    animate={
                      animation
                    }

                    transition={{
                      type: "spring",
                      stiffness:
                        isLifting ||
                        isExiting
                          ? 120
                          : 180,
                      damping:
                        isLifting ||
                        isExiting
                          ? 18
                          : 22,
                      mass: 0.8,
                    }}

                    style={{
                      transformOrigin:
                        pose.origin,
                      transformPerspective:
                        900,
                    }}

                    onClick={() => {
                      if (
                        isLifting ||
                        isExiting
                      ) {
                        return;
                      }

                      if (isTop) {
                        next();
                      } else {
                        bringToTop(
                          card.id
                        );
                      }
                    }}

                    className="
                      absolute
                      inset-0
                      text-left
                      cursor-pointer
                    "
                  >

                    {/* ==========================================
                        CARD INNER
                    =========================================== */}

                    <motion.div
                      onMouseMove={
                        isTop &&
                        !isLifting &&
                        !isExiting
                          ? handleMove
                          : undefined
                      }

                      onMouseLeave={
                        isTop &&
                        !isLifting &&
                        !isExiting
                          ? resetTilt
                          : undefined
                      }

                      style={
                        isTop &&
                        !isLifting &&
                        !isExiting
                          ? {
                              rotateX,
                              rotateY,
                              transformPerspective:
                                900,
                            }
                          : {
                              transformPerspective:
                                900,
                            }
                      }

                      className="
                        w-full
                        h-full
                      "
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

                        {/* ======================================
                            PHOTO
                        ======================================= */}

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
                                card.photoIndex
                              ]
                            }
                            alt={`PEEK editorial scene ${
                              card.photoIndex + 1
                            }`}
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                            fittingType="fill"
                          />
                        </div>


                        {/* ======================================
                            CAPTION
                        ======================================= */}

                        <div
                          className="
                            relative
                            mt-4
                            md:mt-5
                            pr-14
                          "
                        >
                          <p
                            className="
                              font-display
                              text-base
                              md:text-lg
                              leading-snug
                              text-foreground
                            "
                          >
                            A little joy for
                            every morning.
                          </p>
                        </div>


                        {/* ======================================
                            ARROWS
                        ======================================= */}

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
                                previous();
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
                                className="
                                  w-4
                                  h-4
                                "
                                strokeWidth={
                                  1.5
                                }
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
                                className="
                                  w-4
                                  h-4
                                "
                                strokeWidth={
                                  1.5
                                }
                              />
                            </button>

                          </div>
                        )}

                      </div>
                    </motion.div>
                  </motion.div>
                );
              }
            )}

          </AnimatePresence>
        </div>


        {/* ====================================================
            EXPANDED HERO GALLERY
        ===================================================== */}

        <AnimatePresence>

          {open && (

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}

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
                onClick={() =>
                  setOpen(false)
                }
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
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
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
                  onClick={() =>
                    setOpen(false)
                  }

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
                    strokeWidth={
                      1.5
                    }
                  />
                </button>


                {/* Gallery image */}

                <div
                  className="
                    relative
                    h-[40vh]
                    md:h-full
                    overflow-hidden
                    bg-secondary/40
                  "
                >

                  <AnimatePresence
                    mode="wait"
                  >

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

                      className="
                        absolute
                        inset-0
                      "
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

                        className="
                          w-full
                          h-full
                          object-cover
                        "

                        fittingType="fill"
                      />
                    </motion.div>

                  </AnimatePresence>


                  {/* Gallery controls */}

                  <div
                    className="
                      absolute
                      bottom-5
                      left-5
                      right-5
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <button
                      type="button"
                      onClick={previous}

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
                        className="
                          w-5
                          h-5
                        "
                        strokeWidth={
                          1.5
                        }
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
                      ).padStart(
                        2,
                        "0"
                      )}{" "}
                      /{" "}
                      {String(
                        HERO_GALLERY.length
                      ).padStart(
                        2,
                        "0"
                      )}
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
                        className="
                          w-5
                          h-5
                        "
                        strokeWidth={
                          1.5
                        }
                      />
                    </button>

                  </div>
                </div>


                {/* Editorial text */}

                <div
                  className="
                    p-8
                    md:p-12
                    flex
                    flex-col
                    justify-center
                  "
                >

                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[0.3em]
                      text-primary
                      mb-4
                    "
                  >
                    PEEK
                  </p>


                  <h2
                    className="
                      font-display
                      text-4xl
                      md:text-5xl
                      leading-[1.05]
                      text-foreground
                    "
                  >
                    {t(
                      "heroCard.title"
                    )}{" "}

                    <span
                      className="
                        italic
                        text-primary
                      "
                    >
                      {t(
                        "heroCard.accent"
                      )}
                    </span>
                  </h2>


                  <p
                    className="
                      mt-6
                      text-muted-foreground
                      leading-relaxed
                      text-lg
                    "
                  >
                    {t(
                      "heroCard.body"
                    )}
                  </p>


                  <div
                    className="
                      mt-8
                      border-l-2
                      border-secondary
                      pl-5
                    "
                  >

                    <p
                      className="
                        text-sm
                        uppercase
                        tracking-[0.2em]
                        text-muted-foreground
                        mb-2
                      "
                    >
                      {String(
                        current + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </p>


                    <p
                      className="
                        font-display
                        text-xl
                        italic
                        text-foreground
                      "
                    >
                      {t(
                        "heroCard.story"
                      )}
                    </p>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>


      {/* ======================================================
          SCROLL INDICATOR
      ======================================================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
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

        <span
          className="
            text-xs
            uppercase
            tracking-[0.25em]
          "
        >
          {t(
            "hero.scroll"
          )}
        </span>

        <ArrowDown
          className="
            w-4
            h-4
            animate-bounce
          "
          strokeWidth={
            1.5
          }
        />

      </motion.div>

    </section>
  );
}
