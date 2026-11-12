export const HERO_AUTOPLAY_MS = 4800;

type EmblaApi = {
  selectedScrollSnap: () => number;
  scrollTo: (n: number) => void;
  on: (event: string, cb: () => void) => void;
  plugins: () => { autoplay?: AutoplayPlugin };
};

type AutoplayPlugin = {
  stop: () => void;
  play: () => void;
  reset?: () => void;
  isPlaying?: () => boolean;
};

type CarouselInstance = {
  api: EmblaApi;
  destroy: () => void;
};

function restartProgress(progressEl: HTMLElement) {
  progressEl.style.animation = 'none';
  void progressEl.offsetWidth;
  progressEl.style.animation = `hero-embla-progress ${HERO_AUTOPLAY_MS}ms linear forwards`;
}

function bindHeroDots(wrapper: HTMLElement, api: EmblaApi, autoplay: AutoplayPlugin) {
  const dotsRoot = wrapper.querySelector('[data-hero-embla-dots]');
  if (!dotsRoot) return;

  const dots = Array.from(dotsRoot.querySelectorAll<HTMLButtonElement>('[data-hero-embla-dot]'));

  const syncProgress = () => {
    const index = api.selectedScrollSnap();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dots.forEach((dot, i) => {
      const progress = dot.querySelector<HTMLElement>('[data-hero-embla-progress]');
      if (!progress) return;

      progress.style.animation = 'none';
      progress.style.width = i === index && reducedMotion ? '100%' : '0%';

      if (i === index && !reducedMotion) {
        restartProgress(progress);
      }
    });
  };

  const setActive = () => {
    const index = api.selectedScrollSnap();
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.dataset.active = active ? 'true' : 'false';
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.tabIndex = active ? 0 : -1;
    });
    syncProgress();
  };

  dots.forEach((dot) => {
    const index = Number(dot.getAttribute('data-hero-embla-dot'));
    dot.addEventListener('click', () => {
      api.scrollTo(index);
      // Resume the timer after a manual pick (do not permanently stop).
      if (autoplay.reset) autoplay.reset();
      else autoplay.play();
    });
  });

  api.on('select', setActive);
  api.on('reInit', setActive);
  setActive();
}

function ensurePlaying(autoplay: AutoplayPlugin) {
  if (document.hidden) return;
  if (autoplay.isPlaying && autoplay.isPlaying()) return;
  autoplay.play();
}

async function initHeroCarousels(root: ParentNode = document) {
  const nodes = [...root.querySelectorAll<HTMLElement>('[data-hero-embla]')].filter(
    (node) => node.dataset.heroEmblaReady !== 'true',
  );
  if (!nodes.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((node) => {
      node.dataset.heroEmblaReady = 'true';
    });
    return;
  }

  const [{ createCarousel }, autoplayMod] = await Promise.all([
    import('@starwind-ui/runtime/carousel'),
    import('embla-carousel-autoplay'),
  ]);

  const Autoplay = autoplayMod.default;
  if (typeof Autoplay !== 'function') {
    console.warn('[hero-embla] embla-carousel-autoplay default export missing');
    return;
  }

  nodes.forEach((carouselRoot) => {
    const wrapper = carouselRoot.closest('[data-hero-embla-wrap]');
    if (!wrapper) return;

    // Tear down any plugin-less instance that claimed this root first
    // (Starwind caches createCarousel in a WeakMap).
    try {
      (createCarousel(carouselRoot) as CarouselInstance).destroy();
    } catch {
      // No instance yet.
    }

    // stopOnInteraction MUST be false when stopOnMouseEnter is true —
    // otherwise mouseleave never resumes (embla-carousel-autoplay behavior).
    const autoplay = Autoplay({
      delay: HERO_AUTOPLAY_MS,
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    }) as AutoplayPlugin;

    const instance = createCarousel(carouselRoot, {
      opts: { loop: true, align: 'start', duration: 20 },
      plugins: [autoplay],
    }) as CarouselInstance;

    carouselRoot.dataset.heroEmblaReady = 'true';
    bindHeroDots(wrapper as HTMLElement, instance.api, autoplay);

    const pauseWhenHidden = () => {
      if (document.hidden) autoplay.stop();
      else ensurePlaying(autoplay);
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !document.hidden) ensurePlaying(autoplay);
        else autoplay.stop();
      },
      { threshold: 0.2 },
    );
    io.observe(carouselRoot);

    // Kick once after layout — covers late image/size settles.
    requestAnimationFrame(() => ensurePlaying(autoplay));
  });
}

export function setupHeroEmbla() {
  const run = () => {
    void initHeroCarousels();
  };

  run();
  document.addEventListener('astro:page-load', run);
}
