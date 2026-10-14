import React, { useRef } from 'react'
import { menuByCategory, getItem, priceOptions, isSpicy, categoryLabel, menuStats, lowestPrice } from '../shared/menu'
import { restaurant } from '../shared/restaurant'
import { usePreviewDocument, useOverlay, useActiveSection, useActiveLinkInView, useInView } from '../shared/hooks'
import BkkBoostCredit from '../shared/BkkBoostCredit'
import Picture from '../shared/Picture'
import { HERO, FEATURE, THUMB, FEATURED_IDS, dishName } from '../shared/images'
import './street.css'

const FONTS =
  'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Archivo:wght@400;500;600&display=swap'

const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#visit', label: 'Find us' },
]

// Short labels for the hero's quick jumps into the menu.
const HERO_JUMPS = [
  { id: 'burgers', label: 'Burgers' },
  { id: 'wraps', label: 'Kebabs' },
  { id: 'plates', label: 'Plates' },
]

const CATEGORY_IDS = menuByCategory.map(c => `menu-${c.id}`)

const isSinglePrice = prices => {
  const options = priceOptions(prices)
  return options.length === 1 && !options[0].label
}

const Wordmark = () => (
  <span className="st-wordmark">
    <span className="st-wordmark__red">Red</span>hawks
  </span>
)

const Baht = ({ value }) => (
  <span className="st-price">
    <span className="st-price__num">{value}</span>
    <span className="st-price__cur">฿</span>
  </span>
)

const ArrowDown = () => (
  <svg className="st-icon" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
    <path d="M10 3v13M4 10l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" />
  </svg>
)

const ArrowOut = () => (
  <svg className="st-icon" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
    <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="2.4" />
  </svg>
)

// Featured dishes: one strip of equal cells, one per protein on offer.
const FeaturePrices = ({ prices }) => {
  if (isSinglePrice(prices)) {
    return <p className="st-fprices st-fprices--single"><Baht value={prices.single} /></p>
  }
  return (
    <dl className="st-fprices">
      {priceOptions(prices).map(({ key, label, price }) => (
        <div key={key}>
          <dt>{label}</dt>
          <dd><Baht value={price} /></dd>
        </div>
      ))}
    </dl>
  )
}

// Menu rows: beef / pork / chicken always sit in the same column, so prices
// line up down the whole board and can be compared at a glance.
const BoardPrices = ({ prices }) => (
  <dl className="st-bprices">
    {priceOptions(prices).map(({ key, label, price }) => (
      <div key={key} className={`st-bprices__cell st-bprices__cell--${key}`}>
        <dt>{label}</dt>
        <dd><Baht value={price} /></dd>
      </div>
    ))}
  </dl>
)

const Header = ({ overlayOpen, setOverlayOpen }) => (
  <header className="st-header">
    <a href="#top" className="st-header__brand" aria-label="RedHawks, back to top">
      <Wordmark />
    </a>
    <nav className="st-header__nav" aria-label="Main">
      {NAV_LINKS.map(link => (
        <a key={link.href} href={link.href}>{link.label}</a>
      ))}
      <a href={restaurant.phone.href} className="st-btn st-btn--red st-btn--sm">Call</a>
    </nav>
    <button
      type="button"
      className="st-toggle"
      aria-label="Open navigation"
      aria-expanded={overlayOpen}
      aria-controls="st-overlay"
      onClick={() => setOverlayOpen(true)}
    >
      <span className="st-toggle__bars" aria-hidden="true" />
    </button>
  </header>
)

const Overlay = ({ close }) => (
  <div id="st-overlay" className="st-overlay" role="dialog" aria-modal="true" aria-label="Site navigation">
    <div className="st-overlay__top">
      <Wordmark />
      <button type="button" className="st-toggle st-toggle--close" onClick={close} aria-label="Close navigation" autoFocus>
        <span className="st-toggle__x" aria-hidden="true" />
      </button>
    </div>
    <nav className="st-overlay__links" aria-label="Main">
      {NAV_LINKS.map(link => (
        <a key={link.href} href={link.href} onClick={close}>{link.label}</a>
      ))}
    </nav>
    <div className="st-overlay__foot">
      <a href={restaurant.phone.href} className="st-btn st-btn--ink">Call {restaurant.phone.display}</a>
      <a href={restaurant.directionsUrl} target="_blank" rel="noopener noreferrer" className="st-btn st-btn--ink-line">
        Directions <ArrowOut />
      </a>
    </div>
  </div>
)

const Hero = ({ ctaRef }) => (
  <section className="st-hero" aria-labelledby="st-hero-title">
    <div className="st-hero__media">
      {/* Covers the viewport: on tall phones it renders at ~67vh × 2/3 wide, not 100vw. */}
      <Picture
        name={HERO.name}
        widths={HERO.widths}
        sizes="(min-width: 1024px) 42vw, (max-aspect-ratio: 2/3) 67vh, 100vw"
        fallbackWidth={1280}
        width={1280}
        height={Math.round((1280 * HERO.height) / HERO.width)}
        alt="Close-up of stacked burgers on a dark background"
        fetchpriority="high"
      />
    </div>
    <a href="#menu" className="st-sticker" aria-label={`${menuStats.total} items, from ${lowestPrice(menuStats.cheapest)} baht. See the menu`}>
      <span className="st-sticker__big">{menuStats.total}</span> items
      <span className="st-sticker__small">from {lowestPrice(menuStats.cheapest)}฿</span>
    </a>
    <div className="st-hero__body">
      <p className="st-hero__kicker">Burger &amp; Kebab · {restaurant.city}</p>
      <h1 id="st-hero-title" className="st-hero__title">
        <span className="st-hero__line">Red</span>
        <span className="st-hero__line">Hawks</span>
      </h1>
      <p className="st-hero__lede">Burgers, kebabs and Swedish plates from a kiosk in {restaurant.city}.</p>
      <div className="st-hero__ctas" ref={ctaRef}>
        <a href="#menu" className="st-btn st-btn--red st-hero__menu">
          See the menu <ArrowDown />
        </a>
        <nav className="st-hero__jumps" aria-label="Jump to a menu section">
          {HERO_JUMPS.map(jump => (
            <a key={jump.id} href={`#menu-${jump.id}`}>
              {jump.label}
              <span className="st-hero__count">{menuStats.count(jump.id)}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  </section>
)

const Featured = () => (
  <section className="st-feature" aria-labelledby="st-feature-title">
    <div className="st-wrap">
      <h2 id="st-feature-title" className="st-feature__title">
        Burger.{' '}<br />Kebab.{' '}<br /><span className="st-red">Plate.</span>
      </h2>
      <ol className="st-feature__list">
        {FEATURED_IDS.map(getItem).map((item, i) => (
          <li key={item.id} className="st-feature__item">
            <div className="st-feature__img">
              <Picture
                name={dishName(item.image)}
                widths={FEATURE.widths}
                sizes={i === 0 ? '(min-width: 1024px) 42vw, 100vw' : '(min-width: 1024px) 21vw, (min-width: 768px) 46vw, 100vw'}
                fallbackWidth={768}
                width={768}
                height={768}
                alt={item.name}
                loading="lazy"
              />
              <span className="st-feature__num" aria-hidden="true">0{i + 1}</span>
            </div>
            <div className="st-feature__text">
              <p className="st-feature__meta">
                {categoryLabel(item.category)}
                {isSpicy(item) && <span className="st-tag">Spicy</span>}
              </p>
              <h3 className="st-feature__name">{item.name}</h3>
              {item.description && <p className="st-feature__desc">{item.description}</p>}
              <FeaturePrices prices={item.prices} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

const CategoryNav = ({ active }) => {
  const navRef = useRef(null)
  useActiveLinkInView(navRef, active)

  return (
    <nav ref={navRef} className="st-cats" aria-label="Menu categories">
      {menuByCategory.map(category => (
        <a
          key={category.id}
          href={`#menu-${category.id}`}
          aria-current={active === `menu-${category.id}` ? 'true' : undefined}
        >
          {category.label}
          <span className="st-cats__count">{category.items.length}</span>
        </a>
      ))}
    </nav>
  )
}

const MenuBoard = () => {
  const active = useActiveSection(CATEGORY_IDS)
  return (
    <section id="menu" className="st-menu" aria-labelledby="st-menu-title">
      <div className="st-wrap st-menu__head">
        <h2 id="st-menu-title" className="st-menu__title">The menu</h2>
        <p className="st-menu__note">
          All prices in Thai baht. Where you can choose beef, pork or chicken, each price is listed.
        </p>
      </div>
      <div className="st-wrap st-menu__layout">
        <CategoryNav active={active} />
        <div className="st-menu__cats">
          {menuByCategory.map(category => (
            <section key={category.id} id={`menu-${category.id}`} className="st-cat" aria-labelledby={`st-cat-${category.id}`}>
              <div className="st-cat__head">
                <h3 id={`st-cat-${category.id}`} className="st-cat__title">{category.label}</h3>
                <span className="st-cat__count">
                  {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <ul className="st-rows">
                {category.items.map(item => {
                  const single = isSinglePrice(item.prices)
                  return (
                    <li key={item.id} className="st-row">
                      <Picture
                        name={dishName(item.image)}
                        widths={THUMB.widths}
                        sizes="(min-width: 1024px) 88px, (min-width: 768px) 80px, 64px"
                        fallbackWidth={192}
                        width={192}
                        height={192}
                        className="st-row__img"
                        alt=""
                        loading="lazy"
                      />
                      <div className="st-row__body">
                        <div className="st-row__top">
                          <h4 className="st-row__name">
                            {item.name}
                            {isSpicy(item) && <span className="st-tag">Spicy</span>}
                          </h4>
                          {single && <p className="st-row__single"><Baht value={item.prices.single} /></p>}
                        </div>
                        {item.description && <p className="st-row__desc">{item.description}</p>}
                        {!single && <BoardPrices prices={item.prices} />}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

const About = () => (
  <section id="about" className="st-about" aria-labelledby="st-about-title">
    <div className="st-wrap st-about__grid">
      <h2 id="st-about-title" className="st-about__title">
        A burger &amp; kebab <span className="st-red">kiosk</span> in {restaurant.city}.
      </h2>
      <div className="st-about__text">
        <p>
          Most burgers come in your choice of beef, pork or chicken. Döner in a wrap, in a pita or on a plate.
          Swedish meatballs, Swedish beef patties and an XXL sausage plate called Bamse. Fries on the side.
        </p>
        <ul className="st-facts">
          {menuByCategory.slice(0, 3).map(category => (
            <li key={category.id}>
              <span className="st-facts__num">{menuStats.count(category.id)}</span>
              <span className="st-facts__label">{category.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

const Visit = () => (
  <section id="visit" className="st-visit" aria-labelledby="st-visit-title">
    <div className="st-wrap">
      <h2 id="st-visit-title" className="st-visit__title">Find the kiosk</h2>
      <div className="st-visit__grid">
        <div className="st-visit__mapcard">
          <div className="st-visit__map">
            <iframe
              src={restaurant.mapEmbedUrl}
              title="Map showing RedHawks in Hua Hin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a href={restaurant.directionsUrl} target="_blank" rel="noopener noreferrer" className="st-visit__directions">
            Get directions <ArrowOut />
          </a>
        </div>
        <div className="st-visit__info">
          <address className="st-visit__address">
            {restaurant.city}<br />{restaurant.region}
          </address>
          <dl className="st-visit__rows">
            <div>
              <dt>Phone</dt>
              <dd><a href={restaurant.phone.href}>{restaurant.phone.display}</a></dd>
            </div>
            <div>
              <dt>Opening hours</dt>
              <dd><span className="st-tbc">To be confirmed</span></dd>
            </div>
          </dl>
          <a href={restaurant.phone.href} className="st-btn st-btn--ink-line st-visit__call">Call the kiosk</a>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="st-footer">
    <div className="st-wrap">
      <p className="st-footer__mark" aria-hidden="true"><Wordmark /></p>
      <div className="st-footer__row">
        <p className="st-footer__meta">
          {restaurant.name}<br />{restaurant.city}, {restaurant.region}
        </p>
        <nav className="st-footer__links" aria-label="Footer">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </div>
      <div className="st-footer__sign">
        <p>© {new Date().getFullYear()} {restaurant.name}</p>
        <BkkBoostCredit variant="badge" />
      </div>
    </div>
  </footer>
)

// Appears once the hero's own menu buttons have scrolled out of view.
const ActionBar = ({ visible }) => (
  <nav className={`st-actionbar${visible ? ' is-visible' : ''}`} aria-label="Quick actions">
    <a href="#menu">Menu</a>
    <a href={restaurant.phone.href}>Call</a>
    <a href={restaurant.directionsUrl} target="_blank" rel="noopener noreferrer">Directions</a>
  </nav>
)

const StreetHome = () => {
  const [overlayOpen, setOverlayOpen] = useOverlay()
  const heroCtaRef = useRef(null)
  const heroCtaInView = useInView(heroCtaRef)
  usePreviewDocument({ title: 'RedHawks — Street (preview)', fontsHref: FONTS, background: '#0e0c0b' })

  return (
    <div className="rh-street" id="top">
      <Header overlayOpen={overlayOpen} setOverlayOpen={setOverlayOpen} />
      {overlayOpen && <Overlay close={() => setOverlayOpen(false)} />}
      <main>
        <Hero ctaRef={heroCtaRef} />
        <Featured />
        <MenuBoard />
        <About />
        <Visit />
      </main>
      <Footer />
      <ActionBar visible={!heroCtaInView && !overlayOpen} />
    </div>
  )
}

export default StreetHome
