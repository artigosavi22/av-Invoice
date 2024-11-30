
import Header from '../../components/v1/Header';
import Slider from '../../components/v1/Slider';
import Footer from '../../components/v1/Footer';
import Achievements from '../../components/v1/Achievement';
import ProductFeature from '../../components/v1/ProductFeature';
import TrustedPartners from '../../components/v1/TrustedPartners';
import LeafletMap from '../../components/v1/LeafletMap';
import AboutUs from '../../components/v1/Aboutus';

function Landing_page() {
  return (
    <div className="App">
     <Header/>
     <Slider/>
     <main>
        <Achievements/>
        <ProductFeature/>
        <TrustedPartners/>
        <AboutUs />
        <LeafletMap lat={18.605764540344275} lng={73.75286405127626} /> 
      </main>
     <Footer/>
    </div>
  );
}

export default Landing_page;
