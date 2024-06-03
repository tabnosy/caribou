import { MenuProvider } from './context/Modal';
import Header from './components/Header';
import Hero from './components/Hero';
import Advantages from './components/Advantages';
import How from './components/How';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

function App() {
  return (
    <MenuProvider>
      <Header />
      <main>
        <Hero />
        <Advantages />
        <How />
        <Reviews />
      </main>
      <Footer />
    </MenuProvider>
  );
}

export default App;
