import { useState, useRef } from "react";

import Home from "./pages/Home";
import Karute from "./pages/Karute";
import Result from "./pages/Result";
import ModeSelect from "./pages/ModeSelect";
import Chat from "./pages/Chat";
import Menu from "./pages/Menu";
import List from "./pages/List";

import Payment from "./pages/Payment";
import Explanation from "./pages/Explanation";
import Subsidy from "./pages/Subsidy";


export default function App() {
  const [page, setPage] = useState("home");

  const [mode, setMode] = useState("");
  const [type, setType] = useState("");

  const [karute, setKarute] = useState({});
  const [name, setName] = useState("");

  const [showMenu, setShowMenu] = useState(false);

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

      {/* 基本画面 */}
      {page === "home" && (
        <Home
          setPage={setPage}
          setName={setName}
          setKarute={setKarute}
        />
      )}

      {page === "karute" && (
        <Karute
          setPage={setPage}
          setKarute={setKarute}
          name={name}
        />
      )}

      {page === "result" && (
        <Result karute={karute} setPage={setPage} />
      )}

      {page === "mode" && (
        <ModeSelect setPage={setPage} setMode={setMode} setType={setType} />
      )}

      {page === "chat" && (
        <Chat
          setPage={setPage}
          karute={karute}
          mode={mode}
          type={type}
        />
      )}

      {page === "list" && <List setPage={setPage} />}

      {/* 🔥 ここが今回の修正ポイント */}
      {page === "payment" && <Payment setPage={setPage} />}
      {page === "explanation" && <Explanation setPage={setPage} />}
      {page === "subsidy" && <Subsidy setPage={setPage} />}
     
      {/* メニュー */}
      {showMenu && <Menu setPage={setPage} setShow={setShowMenu} />}
    </div>
  );
}