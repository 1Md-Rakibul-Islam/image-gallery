import { images } from "../public/data/images";
import Gallery from "./components/Gallery";
images;

const App = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-300">
      <Gallery images={images} />
    </main>
  );
};

export default App;
