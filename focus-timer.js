javascript:(() => {
    "use strict";

    const ID = "sf-demo-assistant";

    // Zweiter Klick auf die Schnellaktion schließt den Chat
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
        width: "380px",
        height: "520px",
        zIndex: "2147483647",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#ffffff",
        color: "#1d2d3e",
        borderRadius: "14px",
        boxShadow: "0 10px 35px rgba(0,0,0,.28)",
        fontFamily: '"72", "Segoe UI", Arial, sans-serif'
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
    // NACHRICHTENBEREICH
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

    function addMessage(content, sender) {

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

        Object.assign(bubble.style, {
            maxWidth: "80%",
            padding: "10px 13px",

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
            lineHeight: "1.5",
            whiteSpace: "pre-line"
        });

        if (typeof content === "string") {

            bubble.textContent = content;

        } else {

            bubble.appendChild(content);
        }

        wrapper.appendChild(bubble);
        messages.appendChild(wrapper);

        messages.scrollTop =
            messages.scrollHeight;

        return wrapper;
    }

    // =========================================================
    // STARTNACHRICHT
    // =========================================================

    addMessage(
        "Hallo! 👋 Ich bin Ihr virtueller SF Assistant.\n\nWie kann ich Ihnen helfen?",
        "bot"
    );

    // =========================================================
    // VORBEREITETE DEMO-ANTWORTEN
    // =========================================================

    let responseIndex = 0;

    const responses = [

        // -----------------------------------------------------
        // ANTWORT 1
        // -----------------------------------------------------

        () => {
            return (
                'Die Startseite kannst du bearbeiten, indem du in der Aktionsleiste „Startseite verwalten“ auswählst.\n\n' +
                'Dort kannst du Banner, Schnellaktionen und Karten erstellen oder anpassen.\n\n' +
                'Möchtest du zu einem davon mehr wissen?'
            );
        },

        // -----------------------------------------------------
        // ANTWORT 2
        // -----------------------------------------------------

        () => {
            return (
                'Schnellaktionen sind die bunten Kästchen auf der Startseite unter dem Banner, wie z. B. „Mein Profil anzeigen“ oder „Erinnerungen anzeigen“.\n\n' +
                'Davon sind maximal 16 gleichzeitig sichtbar und du kannst bis zu 5 eigene Schnellaktionen erstellen.'
            );
        },

        // -----------------------------------------------------
        // ANTWORT 3
        // -----------------------------------------------------

        () => {

            const container =
                document.createElement("div");

            const text =
                document.createElement("div");

            text.textContent =
                "Lorna Okomato ist zum Beispiel Recruiterin.";

            const link =
                document.createElement("a");

            link.textContent =
                "Profil von Lorna Okomato öffnen";

            link.href =
                "https://hcm-us10-sales.hr.cloud.sap/sf/liveprofile?selected_user_encoded=7F77B0625BA343408823C8AAF2DA04E3&_s.crb=56P8gaR4Ki1NmGuJTQO12BezuBOLJCEzgR8YzCWmU1M%3d#/profile/7F77B0625BA343408823C8AAF2DA04E3";

            link.target = "_blank";
            link.rel = "noopener noreferrer";

            Object.assign(link.style, {
                display: "inline-block",
                marginTop: "9px",
                color: "#0a6ed1",
                fontWeight: "600",
                textDecoration: "none"
            });

            container.append(
                text,
                link
            );

            return container;
        },

        // -----------------------------------------------------
        // ANTWORT 4
        // -----------------------------------------------------

        () => {
            return (
                "Tut mir leid, dazu liegen mir aktuell keine ausreichenden Informationen vor.\n\n" +
                "Da müssen Sie Frau Kadjan fragen. 🙂"
            );
        }
    ];

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
                "●  ●  ●",
                "bot"
            );

        typing.style.opacity = "0.55";

        // Etwas zufällige Verzögerung,
        // damit die Antwort "berechnet" wirkt.
        const delay =
            900 + Math.random() * 900;

        setTimeout(() => {

            typing.remove();

            let response;

            if (
                responseIndex <
                responses.length
            ) {

                response =
                    responses[
                        responseIndex
                    ]();

                responseIndex++;

            } else {

                // Wenn alle Demo-Antworten verbraucht sind
                response =
                    "Tut mir leid, dazu liegen mir aktuell keine ausreichenden Informationen vor.\n\n" +
                    "Da müssen Sie Frau Kadjan fragen. 🙂";
            }

            addMessage(
                response,
                "bot"
            );

            input.disabled = false;
            send.disabled = false;
            input.focus();

        }, delay);
    }

    // =========================================================
    // NACHRICHT SENDEN
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