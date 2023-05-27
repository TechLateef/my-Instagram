import "./App.css";
import { Nav, Bio, Gallery , Story} from "./components";

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Bio />
        <Story />
        <Gallery />
      </div>
    </>
  );
}

export default App;
