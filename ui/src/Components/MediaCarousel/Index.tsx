import { useRef, useCallback, PropsWithChildren } from "react";
import "./Index.scss";

// Icons for Next/Prev
const ChevronLeft = () => (
<<<<<<< Updated upstream
    <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
);

const ChevronRight = () => (
    <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
);

const MediaCarousel = ({ children }: PropsWithChildren<{}>) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback((direction: "left" | "right") => {
        if (containerRef.current) {
            const { scrollLeft, clientWidth } = containerRef.current;
            const scrollAmount = clientWidth * 0.8; // Scroll 80% of width

            const newScrollLeft = direction === "left"
                ? scrollLeft - scrollAmount
                : scrollLeft + scrollAmount;

            containerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth"
            });
        }
    }, []);

    return (
        <div className="media-carousel-wrapper">
            <button
                className="nav-btn left"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
            >
                <ChevronLeft />
            </button>

            <div className="media-carousel" ref={containerRef}>
                {children}
            </div>

            <button
                className="nav-btn right"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
            >
                <ChevronRight />
            </button>
        </div>
    );
=======
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path
      fill="currentColor"
      d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
    />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path
      fill="currentColor"
      d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
    />
  </svg>
);

const MediaCarousel = ({ children }: PropsWithChildren<{}>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((direction: "left" | "right") => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of width

      const newScrollLeft =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="media-carousel-wrapper">
      <button
        className="nav-btn left"
        onClick={() => handleScroll("left")}
        aria-label="Scroll left"
      >
        <ChevronLeft />
      </button>

      <div className="media-carousel" ref={containerRef}>
        {children}
      </div>

      <button
        className="nav-btn right"
        onClick={() => handleScroll("right")}
        aria-label="Scroll right"
      >
        <ChevronRight />
      </button>
    </div>
  );
>>>>>>> Stashed changes
};

export default MediaCarousel;
