// Business facts. Only details verified for publication are set; everything
// the page renders from `phone` and `hours` is skipped while they are null.
//
// Verification (2026-10-14) against the restaurant's public Google Maps listing,
// the same listing `directionsUrl` and the map embed point to:
//   - Name and location (Hua Hin, Prachuap Khiri Khan) match.
//   - Phone: the previous site listed +66 81 142 5861; the listing shows
//     065 012 4051. They conflict, so no number is published until the owner
//     confirms which is correct.
//   - Hours: the listing shows hours, but the owner has not confirmed them.
//   - Street address (Soi 102, Nong Kae) is on the listing; the page keeps to
//     the town until the owner confirms it.

export const restaurant = {
  name: 'RedHawks Burger & Kebab',
  city: 'Hua Hin',
  province: 'Prachuap Khiri Khan',
  country: 'TH',
  region: 'Prachuap Khiri Khan, Thailand',
  // When confirmed: { display: '+66 …', href: 'tel:+66…' }
  phone: null,
  directionsUrl:
    'https://www.google.com/maps/place/RedHawks+Burger+%26+Kebab/@12.5454302,99.9547621,17z/data=!3m1!4b1!4m6!3m5!1s0x30fdab1f656658fd:0x895aeec57703c742!8m2!3d12.545425!4d99.957337!16s%2Fg%2F11vd70rzz8',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.726013274!2d99.9547621!3d12.5454302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30fdab1f656658fd%3A0x895aeec57703c742!2sRedHawks%20Burger%20%26%20Kebab!5e0!3m2!1sen!2sth!4v1704290000000!5m2!1sen!2sth',
  // When confirmed: a short display string, e.g. 'Daily 13:00–23:00'.
  hours: null,
}
