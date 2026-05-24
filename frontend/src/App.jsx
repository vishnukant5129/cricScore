import api from "./api/axios";
import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/api")
      .then(res => setMsg(res.data.message))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>ksfjsjfk: {msg}</h1>
    </div>
  );
}

export default App;