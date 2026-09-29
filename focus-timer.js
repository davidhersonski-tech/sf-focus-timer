javascript:(() => {
    "use strict";

    const ID = "sf-kadjan-bot";

    // Zweiter Klick auf die Schnellaktion: Chat schließen
    const existing = document.getElementById(ID);

    if (existing) {
        existing.remove();
        return;
    }

    // =========================================================
    // CHAT-FENSTER
    // =========================================================

    const chat = document.createElement("section");
    chat.id = ID;

    Object.assign(chat.style, {
        position: "fixed",
        right: "24px",
        bottom: "24px",
        width: "360px",
        height: "500px",
        zIndex: "2147483647",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",

        background: "#ffffff",
        color: "#1d2d3e",

        borderRadius: "14px",
        boxShadow: "0 10px 35px rgba(0,0,0,.28)",

        fontFamily:
            '"72", "Segoe UI", Arial, sans-serif'
    });

    // =========================================================
    // HEADER
    // =========================================================

    const header = document.createElement("div");

    Object.assign(header.style, {
        padding: "14px 16px",
        background:
            "linear-gradient(135deg, #0a6ed1, #0854a0)",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    });

    const headerLeft = document.createElement("div");

    const botName = document.createElement("div");
    botName.textContent = "🤖 SF Assistant";

    Object.assign(botName.style, {
        fontSize: "16px",
        fontWeight: "700"
    });

    const botStatus = document.createElement("div");
    botStatus.textContent = "● Online";

    Object.assign(botStatus.style, {
        marginTop: "3px",
        fontSize: "11px",
        opacity: "0.85"
    });

    headerLeft.append(
        botName,
        botStatus
    );

    const close = document.createElement("button");
    close.textContent = "✕";

    Object.assign(close.style, {
        border: "none",
        background: "transparent",
        color: "#ffffff",
        fontSize: "18px",
        cursor: "pointer"
    });

    close.addEventListener("click", () => {
        chat.remove();
    });

    header.append(
        headerLeft,
        close
    );

    // =========================================================
    // NACHRICHTEN
    // =========================================================

    const messages = document.createElement("div");

    Object.assign(messages.style, {
        flex: "1",
        padding: "16px",
        overflowY: "auto",
        background: "#f7f8f9",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    });

    // =========================================================
    // NACHRICHT ERSTELLEN
    // =========================================================

    function addMessage(text, sender) {

        const wrapper =
            document.createElement("div");

        Object.assign(wrapper.style, {
            display: "flex",
            justifyContent:
                sender === "user"
                    ? "flex-end"
                    : "flex-start"
        });

        const bubble =
            document.createElement("div");

        bubble.textContent = text;

        Object.assign(bubble.style, {
            maxWidth: "78%",
            padding: "9px 12px",
            borderRadius:
                sender === "user"
                    ? "14px 14px 3px 14px"
                    : "14px 14px 14px 3px",

            background:
                sender === "user"
                    ? "#0a6ed1"
                    : "#ffffff",

            color:
                sender === "user"
                    ? "#ffffff"
                    : "#1d2d3e",

            boxShadow:
                sender === "user"
                    ? "none"
                    : "0 1px 4px rgba(0,0,0,.12)",

            fontSize: "14px",
            lineHeight: "1.4"
        });

        wrapper.appendChild(bubble);
        messages.appendChild(wrapper);

        messages.scrollTop =
            messages.scrollHeight;

        return wrapper;
    }

    // =========================================================
    // BEGRÜSSUNG
    // =========================================================

    addMessage(
        "Hallo! 👋 Ich bin Ihr virtueller SF Assistant. Wie kann ich Ihnen helfen?",
        "bot"
    );

    // =========================================================
    // EINGABEBEREICH
    // =========================================================

    const inputArea =
        document.createElement("div");

    Object.assign(inputArea.style, {
        padding: "12px",
        display: "flex",
        gap: "8px",
        borderTop: "1px solid #d9d9d9",
        background: "#ffffff"
    });

    const input =
        document.createElement("input");

    input.type = "text";
    input.placeholder =
        "Nachricht eingeben...";

    Object.assign(input.style, {
        flex: "1",
        padding: "9px 11px",
        border: "1px solid #89919a",
        borderRadius: "7px",
        outline: "none",
        fontSize: "14px"
    });

    const send =
        document.createElement("button");

    send.textContent = "➤";

    Object.assign(send.style, {
        width: "42px",
        border: "none",
        borderRadius: "7px",
        background: "#0a6ed1",
        color: "#ffffff",
        cursor: "pointer",
        fontSize: "18px"
    });

    // =========================================================
    // BOT-ANTWORT
    // =========================================================

    function botReply() {

        const typing =
            addMessage(
                "schreibt ...",
                "bot"
            );

        typing.style.opacity = "0.65";
        typing.style.fontStyle = "italic";

        // Kleine zufällige Verzögerung,
        // damit es nach echtem Bot aussieht
        const delay =
            800 +
            Math.random() * 900;

        setTimeout(() => {

            typing.remove();

            addMessage(
                "Tut mir leid, das kann ich nicht beantworten. Da müssen Sie Frau Kadjan fragen.",
                "bot"
            );

        }, delay);
    }

    // =========================================================
    // SENDEN
    // =========================================================

    function sendMessage() {

        const text =
            input.value.trim();

        if (!text) return;

        addMessage(
            text,
            "user"
        );

        input.value = "";

        input.disabled = true;
        send.disabled = true;

        botReply();

        setTimeout(() => {
            input.disabled = false;
            send.disabled = false;
            input.focus();
        }, 1800);
    }

    send.addEventListener(
        "click",
        sendMessage
    );

    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                sendMessage();
            }
        }
    );

    // =========================================================
    // CHAT ZUSAMMENBAUEN
    // =========================================================

    inputArea.append(
        input,
        send
    );

    chat.append(
        header,
        messages,
        inputArea
    );

    document.body.appendChild(chat);

    input.focus();

})();