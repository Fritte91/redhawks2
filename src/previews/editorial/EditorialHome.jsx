import React, { useRef, useState } from 'react'
import { menuByCategory, getItem, priceOptions, priceText, categoryLabel, isSpicy, menuStats, lowestPrice } from '../../shared/menu'
import { restaurant } from '../../shared/restaurant'
import { usePreviewDocument, useOverlay, useActiveSection, useActiveLinkInView } from '../../shared/hooks'
import BkkBoostCredit from '../../shared/BkkBoostCredit'
import './editorial.css'

const FONTS =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&display=swap'

const HERO_ID = 4
// One burger, one kebab, one plate — chosen for range, not ranked.
const FEATURED_IDS = [2, 10, 16]

const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#visit', label: 'Visit' },
]

const CATEGORY_IDS = menuByCategory.map(c => `menu-${c.id}`)

const pad = n => String(n).padStart(2, '0')

const Wordmark = () => (
  <span className="ed-wordmark">
    <em>Red</em>hawks
  </span>
)

const Price = ({ value }) => (
  <span className="ed-price">
    {value}<span className="ed-price__cur">{'\u00a0'}฿</span>
  </span>
)

// Single price: name ····· price. Several proteins: one leader line each.
const PriceLines = ({ prices }) => {
  const options = priceOptions(prices)
  if (options.length === 1 && !options[0].label) return null
  return (
    <ul className="ed-opts">
      {options.map(({ key, label, price }) => (
        <li key={key}>
          <span>{label}</span>
          <span className="ed-leader" aria-hidden="true" />
          <Price value={price} />
        </li>
      ))}
    </ul>
  )
}

const singlePrice = prices => {
  const options = priceOptions(prices)
  return options.length === 1 && !options[0].label ? options[0].price : null
}

const Header = ({ overlayOpen, setOverlayOpen }) => (
  <header className="ed-header">
    <a href="#top" className="ed-header__brand" aria-label="RedHawks, back to top">
      <Wordmark />
      <span className="ed-header__sub">Burger &amp; Kebab</span>
    </a>
    <nav className="ed-header__nav" aria-label="Main">
      {NAV_LINKS.map(link => (
        <a key={link.href} href={link.href}>{link.label}</a>
      ))}
      <a href={restaurant.phone.href} className="ed-btn ed-btn--solid ed-btn--sm">Call</a>
    </nav>
    <button
      type="button"
      className="ed-toggle"
      aria-expanded={overlayOpen}
      aria-controls="ed-overlay"
      onClick={() => setOverlayOpen(true)}
    >
      Menu
    </button>
  </header>
)

const Overlay = ({ close }) => (
  <div id="ed-overlay" className="ed-overlay" role="dialog" aria-modal="true" aria-label="Site navigation">
    <div className="ed-overlay__top">
      <Wordmark />
      <button type="button" className="ed-toggle" onClick={close} autoFocus>Close</button>
    </div>
    <nav className="ed-overlay__links" aria-label="Main">
      {NAV_LINKS.map((link, i) => (
        <a key={link.href} href={link.href} onClick={close}>
          <span className="ed-overlay__no">{pad(i + 1)}</span>
          {link.label}
        </a>
      ))}
    </nav>
    <div className="ed-overlay__foot">
      <p>{restaurant.city}, {restaurant.region}</p>
      <a href={restaurant.phone.href} className="ed-btn ed-btn--solid">Call {restaurant.phone.display}</a>
    </div>
  </div>
)

const Hero = () => {
  const item = getItem(HERO_ID)
  const { cheapest, priciest } = menuStats
  return (
    <section className="ed-hero" aria-labelledby="ed-hero-title">
      <div className="ed-wrap ed-hero__grid">
        <p className="ed-masthead">
          <span>Burger &amp; kebab kiosk</span>
          <span>{restaurant.city}, Thailand</span>
        </p>
        <h1 id="ed-hero-title" className="ed-hero__title">
          Burgers, kebabs <em>&amp;</em> a few Swedish plates.
        </h1>
        <div className="ed-hero__intro">
          <p className="ed-hero__lede">
            {menuStats.total} things on the menu, from {cheapest.name} at {lowestPrice(cheapest)}{'\u00a0'}฿
            to the {priciest.name} at {lowestPrice(priciest)}{'\u00a0'}฿.
          </p>
          <div className="ed-hero__ctas">
            <a href="#menu" className="ed-btn ed-btn--solid">Read the menu</a>
            <a href="#visit" className="ed-link">Find the kiosk</a>
          </div>
        </div>
        <figure className="ed-hero__figure">
          <div className="ed-hero__img">
            <img src={item.image} alt={item.name} fetchpriority="high" decoding="async" width="1024" height="1024" />
          </div>
          <figcaption>
            <em>Pictured</em> {item.name} — {priceText(item.prices)}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

const Featured = () => (
  <section className="ed-feature" aria-labelledby="ed-feature-title">
    <div className="ed-wrap">
      <div className="ed-section-head">
        <h2 id="ed-feature-title" className="ed-section-title">Three to <em>start</em> with</h2>
        <p className="ed-section-note">A burger, a kebab and a plate from the menu.</p>
      </div>
      <ol className="ed-feature__list">
        {FEATURED_IDS.map(getItem).map((item, i) => (
          <li key={item.id} className="ed-feature__item">
            <div className="ed-feature__img">
              <img src={item.image} alt={item.name} loading="lazy" decoding="async" width="1024" height="1024" />
            </div>
            <div className="ed-feature__text">
              <p className="ed-feature__no">No. {i + 1} · {categoryLabel(item.category)}</p>
              <h3 className="ed-feature__name">{item.name}</h3>
              {item.description && <p className="ed-feature__desc">{item.description}</p>}
              {singlePrice(item.prices) !== null ? (
                <p className="ed-feature__single"><Price value={singlePrice(item.prices)} /></p>
              ) : (
                <PriceLines prices={item.prices} />
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
)

const MenuSection = () => {
  const active = useActiveSection(CATEGORY_IDS)
  const [hovered, setHovered] = useState(null)
  const navRef = useRef(null)
  useActiveLinkInView(navRef, active)
  const activeCategory = menuByCategory.find(c => `menu-${c.id}` === active) ?? menuByCategory[0]
  const pictured = (hovered && getItem(hovered)) || activeCategory.items[0]

  return (
    <section id="menu" className="ed-menu" aria-labelledby="ed-menu-title">
      <div className="ed-wrap">
        <div className="ed-section-head">
          <h2 id="ed-menu-title" className="ed-menu__title">The <em>menu</em></h2>
          <p className="ed-section-note">
            Prices in Thai baht. Where you can choose beef, pork or chicken, each price is listed.
          </p>
        </div>
      </div>

      <div className="ed-wrap ed-menu__layout">
        <nav ref={navRef} className="ed-cats" aria-label="Menu categories">
          {menuByCategory.map((category, i) => (
            <a
              key={category.id}
              href={`#menu-${category.id}`}
              aria-current={active === `menu-${category.id}` ? 'true' : undefined}
            >
              <span className="ed-cats__no">{pad(i + 1)}</span>
              {category.label}
            </a>
          ))}
        </nav>
        <div className="ed-menu__list">
          {menuByCategory.map((category, i) => (
            <section key={category.id} id={`menu-${category.id}`} className="ed-cat" aria-labelledby={`ed-cat-${category.id}`}>
              <div className="ed-cat__head">
                <span className="ed-cat__no">{pad(i + 1)}</span>
                <h3 id={`ed-cat-${category.id}`} className="ed-cat__title">{category.label}</h3>
              </div>
              <ul>
                {category.items.map(item => {
                  const single = singlePrice(item.prices)
                  return (
                    <li
                      key={item.id}
                      className="ed-item"
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <img className="ed-item__thumb" src={item.image} alt="" loading="lazy" decoding="async" width="72" height="72" />
                      <div className="ed-item__main">
                        <div className="ed-item__line">
                          <h4 className="ed-item__name">
                            {item.name}
                            {isSpicy(item) && <span className="ed-tag">Spicy</span>}
                          </h4>
                          {single !== null && (
                            <>
                              <span className="ed-leader" aria-hidden="true" />
                              <Price value={single} />
                            </>
                          )}
                        </div>
                        {item.description && <p className="ed-item__desc">{item.description}</p>}
                        <PriceLines prices={item.prices} />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>

        <figure className="ed-menu__plate" aria-hidden="true">
          <div className="ed-menu__plate-img">
            <img key={pictured.id} src={pictured.image} alt="" decoding="async" />
          </div>
          <figcaption>
            <em>{categoryLabel(pictured.category)}</em> {pictured.name}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

const About = () => (
  <section id="about" className="ed-about" aria-labelledby="ed-about-title">
    <div className="ed-wrap ed-about__grid">
      <div className="ed-about__img">
        <img src="/4.jpg" alt="Burger topped with melted cheese, a knife through the bun" loading="lazy" decoding="async" />
      </div>
      <div className="ed-about__text">
        <h2 id="ed-about-title" className="ed-about__title">
          A burger &amp; kebab kiosk in <em>{restaurant.city}</em>.
        </h2>
        <p>
          Burgers in your choice of beef, pork or chicken. Döner in a wrap, in a pita or on a plate.
          Swedish meatballs, Swedish beef patties and an XXL sausage plate called Bamse. Fries on the side.
        </p>
        <dl className="ed-facts">
          {menuByCategory.slice(0, 3).map(category => (
            <div key={category.id}>
              <dt>{category.label}</dt>
              <dd>{menuStats.count(category.id)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
)

const Visit = () => (
  <section id="visit" className="ed-visit" aria-labelledby="ed-visit-title">
    <div className="ed-wrap ed-visit__grid">
      <div className="ed-visit__info">
        <h2 id="ed-visit-title" className="ed-section-title">Visit the <em>kiosk</em></h2>
        <dl className="ed-visit__rows">
          <div>
            <dt>Where</dt>
            <dd><address>{restaurant.city}<br />{restaurant.region}</address></dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd><a href={restaurant.phone.href}>{restaurant.phone.display}</a></dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd><span className="ed-tbc">To be confirmed</span></dd>
          </div>
        </dl>
        <div className="ed-visit__ctas">
          <a href={restaurant.directionsUrl} target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--solid">
            Get directions
          </a>
          <a href={restaurant.phone.href} className="ed-btn ed-btn--line">Call</a>
        </div>
      </div>
      <div className="ed-visit__map">
        <iframe src={restaurant.mapEmbedUrl} title="Map showing RedHawks in Hua Hin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="ed-footer">
    <div className="ed-wrap">
      <p className="ed-footer__mark" aria-hidden="true"><Wordmark /></p>
      <div className="ed-footer__row">
        <p>{restaurant.name}<br />{restaurant.city}, {restaurant.region}</p>
        <nav className="ed-footer__links" aria-label="Footer">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          <a href={restaurant.phone.href}>Call</a>
        </nav>
      </div>
    </div>
    <BkkBoostCredit variant="navy" />
  </footer>
)

const ActionBar = () => (
  <nav className="ed-actionbar" aria-label="Quick actions">
    <a href="#menu">Menu</a>
    <a href={restaurant.phone.href}>Call</a>
    <a href={restaurant.directionsUrl} target="_blank" rel="noopener noreferrer">Directions</a>
  </nav>
)

const EditorialHome = () => {
  const [overlayOpen, setOverlayOpen] = useOverlay()
  usePreviewDocument({ title: 'RedHawks — Editorial (preview)', fontsHref: FONTS, background: '#f4ede1' })

  return (
    <div className="rh-editorial" id="top">
      <Header overlayOpen={overlayOpen} setOverlayOpen={setOverlayOpen} />
      {overlayOpen && <Overlay close={() => setOverlayOpen(false)} />}
      <main>
        <Hero />
        <Featured />
        <MenuSection />
        <About />
        <Visit />
      </main>
      <Footer />
      {!overlayOpen && <ActionBar />}
    </div>
  )
}

export default EditorialHome
