export const navLinks = [
  { title: 'Pagina principal', href: '/' },
  {
    title: 'Equipo',
    href: null,
    subMenu: [
      {
        title: 'Miembros del equipo',
        href: '/team-member'
      }
    ]
  },
  {
    title: 'Historias',
    href: null,
    subMenu: [
      {
        title: 'Nuestros niños',
        href: '/stories'
      },
      {
        title: 'Story Details',
        href: '/story-details'
      }
    ]
  },
  { title: 'Galeria', href: '/gallery' },
  { title: 'Nuestro trabajo', href: '/our-work' },
  { title: 'Sobre nosotros', href: '/about' },
  { title: 'Nuestros patrocinadores', href: '/sponsors' },
  { title: 'Contacto', href: '/contacts' }
];
