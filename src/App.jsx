import { useState, useRef } from "react";

import Home from "./pages/Home";
import Karute from "./pages/Karute";
import Answer from "./pages/Answer";
import ModeSelect from "./pages/ModeSelect";
import Chat from "./pages/Chat";
import Menu from "./pages/Menu";

export default function App() {
  const [page, setPage] = useState("home");

  const [mode, setMode] = useState("");
  const [type, setType] = useState("");

  const [karute, setKarute] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  const [name, setName] = useState(""); // 🔥追加

  const pressTimer = useRef(null);

  const handlePressStart = () => {
    if (page !== "home") return;
    pressTimer.current = setTimeout(() => {
      setShowMenu(true);
    }, 800);
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer.current);
  };

  return (
    <div style={{ position: "relative" }}>
      {page === "home" && (
        <>
          <div
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: 60,
              zIndex: 10,
            }}
          />

          <div
            onClick={() => setShowMenu(true)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: 20,
              cursor: "pointer",
              zIndex: 20,
            }}
          >
            ●
          </div>
        </>
      )}

      {page === "home" && <Home setPage={setPage} />}

      {page === "mode" && (
        <ModeSelect
          setPage={setPage}
          setMode={setMode}
          setType={setType}
        />
      )}

      {page === "karute" && (
        <Karute
          setPage={setPage}
          setKarute={setKarute}
          name={name}       // 🔥追加
          setName={setName} // 🔥追加
        />
      )}

      {page === "answer" && (
        <Answer karute={karute} setPage={setPage} />
      )}

      {page === "chat" && (
        <Chat
          setPage={setPage}
          karute={karute}
          mode={mode}
          type={type}
        />
      )}

      {showMenu && <Menu setPage={setPage} setShow={setShowMenu} />}
    </div>
  );
}