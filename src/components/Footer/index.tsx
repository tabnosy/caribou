import './styles.scss'

const Footer = () => {
  return (

    <footer className='footer'>
      <div className='container'>
        <div className='footer__content'>
          <div className='footer__content-logo'>
            <img src="/logo.png" alt="logo" />
            <span>Caribou</span>
          </div>
          <ul className='footer__content-socials'>
            <li><a href="https://vk.com/tk21msk"><img src="/vk.svg" alt="vk icon" /></a></li>
            <li><a href="https://t.me/Media21TK"><img src="/telegram.svg" alt="tg icon" /></a></li>
          </ul>
        </div>
      </div>
    </footer>

  )
}

export default Footer
