import './style.scss'

const advantages = [
  'Абсолютно бесплатно', 'Нет скрытых функций', 'Не требуем личных данных'
]

const Advantages = () => {
  return (
    <section className="advantages">
      <div className='container'>
        <div className='advantages__wrapper'>
          {advantages.map((text, idx) => (
            <li key={idx}>
              <img src='/success.png' alt='success' />
              <span>{text}</span>
            </li>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages
