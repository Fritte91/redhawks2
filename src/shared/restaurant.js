// Business facts. `confirmed` marks what the owner has verified. Unconfirmed
// details still appear on the page (they come from the previous site, see
// src/components/Footer.jsx) but are never published as structured data.
// Opening hours are unknown: they stay null and the page says "to be confirmed".

export const restaurant = {
  name: 'RedHawks Burger & Kebab',
  // Confirmed: a burger & kebab kiosk in Hua Hin.
  city: 'Hua Hin',
  province: 'Prachuap Khiri Khan',
  country: 'TH',
  region: 'Prachuap Khiri Khan, Thailand',
  phone: {
    display: '+66 81 142 5861',
    href: 'tel:+66811425861',
    confirmed: false,
  },
  directionsUrl:
    'https://www.google.com/maps/place/RedHawks+Burger+%26+Kebab/@12.5454302,99.9547621,17z/data=!3m1!4b1!4m6!3m5!1s0x30fdab1f656658fd:0x895aeec57703c742!8m2!3d12.545425!4d99.957337!16s%2Fg%2F11vd70rzz8',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.726013274!2d99.9547621!3d12.5454302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30fdab1f656658fd%3A0x895aeec57703c742!2sRedHawks%20Burger%20%26%20Kebab!5e0!3m2!1sen!2sth!4v1704290000000!5m2!1sen!2sth',
  hours: null,
}
