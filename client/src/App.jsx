import {
  Footer,
  Services,
  Navbar,
  Loader,
  Transaction,
  Welcome,
} from "./components";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        <Services />
        <Transaction />
        <Footer />
      </div>
    </div>
  );
};

export default App;
