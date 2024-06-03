import './style.scss'

const cards = [
  {
    icon: 'message.png',
    header: 'Качественная поддержка',
    description: 'Обученная команда поддержки сможет помочь вам в трудную минуту!'
  },
  {
    icon: 'guard.png',
    header: 'Защита данных',
    description: 'Никто не сможет узнать куда и какую сумму вы потратили или планируете потратить.'
  },
  {
    icon: 'hours.png',
    header: 'Быстро и легко',
    description: 'Интуитивно понятный интерфейс, который позволит добавлять, удалять и менять статус для необходимых расходов.'
  },
]

const Reviews = () => {
  return (
    <section className='reviews'>
      <div className='container'>
        <div className='reviews__wrapper'>
          <h3>Что выделяет этот проект <br />среди прочих?</h3>
          <div className='reviews__cards'>
            {cards.map((card, index) => (
              <div className='reviews__cards-card' key={index}>
                <img src={card.icon} alt={card.header} />
                <div className='reviews__cards-card-text'>
                  <h4>{card.header}</h4>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews
