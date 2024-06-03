import { useMenu } from "../../context/Modal"
import './style.scss'

const Hero = () => {
  const { openMenu } = useMenu()

  return (
    <section className="hero">
      <div className='container'>
        <div className='hero__content'>
          <h1>Возьмите свои финансы <br/> под контроль</h1>
          <p>И начните отслеживать необходимые платежи</p>
          <button onClick={openMenu}>{`Попробуйте уже сейчас ->`}</button>
        </div>
      </div>
    </section> 
  )
}

export default Hero
