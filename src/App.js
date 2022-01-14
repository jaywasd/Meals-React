import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import ContextProvider from "./Store/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <Header />
      <main>
        <Meals />
      </main>
    </ContextProvider>
  );
}

export default App;
