import { useState, useRef } from "react";

import Home from "./pages/Home";
import Karute from "./pages/Karute";
import Answer from "./pages/Answer";
import ModeSelect from "./pages/ModeSelect";
import Chat from "./pages/Chat";
import ChatFree from "./pages/ChatFree";
import Result from "./pages/Result";
import Menu from "./pages/Menu";
import Payment from "./pages/Payment";
import Subsidy from "./pages/Subsidy";
import SubsidyChat from "./pages/SubsidyChat";
import List from "./pages/List";
import Sales from "./pages/Sales";

export default function App() {
  const [page, setPage] = useState("home");
  const [name, setName] = useState("");
  const [karute, setKarute] = useState({});
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

      {page === "home" && <Home setPage={setPage} name={name} setName={setName} />}
      {page === "karute" && <Karute setPage={setPage} name={name} setKarute={setKarute} />}
      {page === "answer" && <Answer karute={karute} setPage={setPage} />}
      {page === "result" && <Result karute={karute} setPage={setPage} />}
      {page === "mode" && <ModeSelect setPage={setPage} />}
      {page === "chat" && <Chat setPage={setPage} parts={karute.parts || []} karute={karute} />}
      {page === "chatFree" && <ChatFree setPage={setPage} />}
      {page === "payment" && <Payment setPage={setPage} />}
      {page === "subsidy" && <Subsidy setPage={setPage} />}
      {page === "subsidyChat" && <SubsidyChat setPage={setPage} />}
      {page === "list" && <List setPage={setPage} />}
      {page === "sales" && <Sales setPage={setPage} />}

      {showMenu && <Menu setPage={setPage} setShow={setShowMenu} />}
    </div>
  );
}