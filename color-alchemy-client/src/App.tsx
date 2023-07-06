import { useEffect, useState } from "react";
import { Response } from "./lib/types";

import "./App.css";
import Game from "./components/Game";

function App() {
  const [apiRes, setApiRes] = useState<Response | undefined>();

  useEffect(() => {
    let apiUrl = "http://localhost:9876/init";
    const storedUserId = JSON.parse(localStorage.getItem("userId")!);

    if (storedUserId) {
      apiUrl = apiUrl + `/user/${storedUserId}`;
    }

    const fetchData = async (apiUrl: string) => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApiRes(data);
    };

    fetchData(apiUrl);
  }, []);

  return <div className="App">{apiRes && <Game data={apiRes} />}</div>;
}

export default App;
