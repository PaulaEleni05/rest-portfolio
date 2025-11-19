import { BrowserRouter as Router, Routes, Route  } from 'react-router'
import { useEffect, useState} from 'react';

import Navbar from './components/Navbar';

import Intro from './components/Intro';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// pages
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact'
// import PageNotFound from './pages/PageNotFound';
// import ProjectIndex from '@/pages/projects/Index';

export default function App() {
  const [activeSection, setActiveSection ] = useState('');

  useEffect(() => {
    const sections = [ 'intro', 'projects', 'contact'];
    const targets = sections.map(section => document.getElementById(section));

    const observer = new IntersectionObserver( (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
        console.log(entry.target.id)
        setActiveSection(entry.target.id);
      }
      });
    }, { threshold: 0.3, rootMargin:'0px 0px 0px 0px'});

    targets.forEach(el => observer.observe(el))
    return () => observer.disconnect()

    // console.log(targets);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar activeSection={activeSection}/>
      <main className='max-w-4xl mx-auto px-6 sm:px-8 lg:px-16'>
        <Intro />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path='/' element={<Home />} />
    //     <Route path='/about' element={<About />} />
    //     <Route path='/contact' element={<Contact />} />

    //     <Route path='/projects' element={<ProjectIndex />} />


    //     <Route path='*' element={<PageNotFound />} />
    //   </Routes>

    //   <Navbar />

    // </Router>
  );
}