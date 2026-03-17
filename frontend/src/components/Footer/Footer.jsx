import './Footer.css'

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
  </svg>
)

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5a12 12 0 0 0-3.794 23.39c.6.111.82-.26.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61A3.182 3.182 0 0 0 3.65 17.71c-1.09-.745.082-.73.082-.73a2.52 2.52 0 0 1 1.84 1.24 2.554 2.554 0 0 0 3.49.997 2.56 2.56 0 0 1 .762-1.604c-2.665-.304-5.467-1.333-5.467-5.93a4.64 4.64 0 0 1 1.235-3.22 4.31 4.31 0 0 1 .117-3.176s1.007-.322 3.3 1.23a11.44 11.44 0 0 1 6.006 0c2.29-1.552 3.295-1.23 3.295-1.23.49 1.034.532 2.245.116 3.176a4.63 4.63 0 0 1 1.232 3.22c0 4.61-2.807 5.623-5.48 5.92a2.865 2.865 0 0 1 .815 2.224v3.293c0 .32.216.694.825.576A12.002 12.002 0 0 0 12 .5Z" />
  </svg>
)

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const marqueeItems = [
  '3D Design',
  'Motion Graphics',
  '2D and 3D Animation',
  'Web Development',
  'BRANDING',
  'GAMES',
]

function SocialLinkLayers({ icon: IconComponent, label }) {
  return (
    <>
      <span className="footer-social-link__text-container" aria-hidden="true">
        <span className="footer-social-link__content footer-social-link__content--default">
          {IconComponent()}
          <span>{label}</span>
        </span>
      </span>

      <span className="footer-social-link__overlay" aria-hidden="true">
        <span className="footer-social-link__content footer-social-link__content--hover">
          {IconComponent()}
          <span>{label}</span>
        </span>
        <span className="footer-social-link__overlay-bg" />
      </span>
    </>
  )
}

function Footer() {
  const emailAddress = 'debasritmishra8@gmail.com'
  const socialLinks = [
    {
      // Using Gmail Compose URL which works perfectly in browsers
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`,
      label: 'Email',
      icon: EmailIcon,
    },
    {
      href: 'https://discord.com/users/1318549874740035654',
      label: 'Discord',
      icon: DiscordIcon,
    },
    {
      href: 'http://github.com/user-base-is-dead',
      label: 'GitHub',
      icon: GitHubIcon,
    },
    {
      href: 'https://x.com/777Koding',
      label: 'X',
      icon: XIcon,
    },
  ]

  const marqueeContent = [
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
    ...marqueeItems,
  ]

  return (
    <footer className="footer" id="footer">
      <div className="footer-marquee">
        <div className="footer-marquee__track">
          {marqueeContent.map((item, index) => (
            <span className="footer-marquee__item" key={index}>
              <span className="footer-marquee__text">{item}</span>
              <span className="footer-marquee__separator">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="footer-content">
        <h2 className="footer-brand">MISHRA</h2>
        <p className="footer-tagline">
          Let's collaborate and bring your ideas to life.
          <br />
          Reach out through any of these channels:
        </p>
      </div>

      <div className="footer-socials">
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            className="footer-social-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
          >
            <SocialLinkLayers icon={Icon} label={label} />
          </a>
        ))}
      </div>

      <div className="footer-marquee footer-marquee--reverse">
        <div className="footer-marquee__track">
          {marqueeContent.map((item, index) => (
            <span className="footer-marquee__item" key={index}>
              <span className="footer-marquee__text">{item}</span>
              <span className="footer-marquee__separator">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Mishra</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
