import React, {useState, useEffect} from 'react'
import { Line } from "./components/Line";
import { Region, startMirage } from "./server-mock";


if (process.env.NODE_ENV === 'development') {
  startMirage()
}

function App() {
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  async function getData() {
    try {
      const res = await fetch("/api/regions", {
        method: "GET",
      });
      setRegions(await res.json());
    } catch (e) { }
  }

  useEffect(() => {
    getData();
  }, []);

  return <div className="App">
    <div className="App">
      <Line
        indexNumber={0}
        opened={openedIds}
        setOpened={setOpenedIds}
        elems={regions}
      />
    </div>
  </div>
}

export default App
