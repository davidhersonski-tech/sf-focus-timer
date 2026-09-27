(() => {
    const ID = "sf-fokus-timer";

    // Zweiter Klick auf die Kachel: Timer vollständig beenden
    if (window.sfFocusTimer) {
        clearInterval(window.sfFocusTimer.interval);
        window.sfFocusTimer.root?.remove();
        delete window.sfFocusTimer;
        return;
    }

    const DEFAULT_SECONDS = 25 * 60;

    const state = {
        remaining: DEFAULT_SECONDS,
        running: false,
        interval: null,
        root: null
    };

    window.sfFocusTimer = state;

    const panel = document.createElement("section");
    panel.id = ID;
    state.root = panel;

    Object.assign(panel.style, {
        position: "fixed",
        right: "24px",
        top: "90px",
        zIndex: "2147483647",
        width: "270px",
        padding: "16px",
        textAlign: "center",
        color: "#ffffff",
        background: "linear-gradient(135deg, #0a6ed1, #354a5f)",
        borderRadius: "14px",
        boxShadow: "0 8px 28px rgba(0,0,0,.3)",
        fontFamily: "Arial, sans-serif"
    });

    const title = document.createElement("div");
    title.textContent = "🎯 SF-Fokuszeit";
    title.style.fontWeight = "bold";
    title.style.fontSize = "17px";

    const display = document.createElement("div");
    Object.assign(display.style, {
        margin: "14px 0",
        fontSize: "42px",
        fontWeight: "bold",
        fontVariantNumeric: "tabular-nums"
    });

    const status = document.createElement("div");
    status.textContent = "Bereit für die nächste Übung";
    status.style.marginBottom = "12px";
    status.style.fontSize = "13px";

    const controls = document.createElement("div");
    Object.assign(controls.style, {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "7px"
    });

    function makeButton(label) {
        const button = document.createElement("button");
        button.textContent = label;

        Object.assign(button.style, {
            padding: "7px 10px",
            border: "none",
            borderRadius: "6px",
            background: "#ffffff",
            color: "#0a4b78",
            cursor: "pointer",
            fontWeight: "bold"
        });

        return button;
    }

    const startButton = makeButton("Start");
    const addButton = makeButton("+5 Min.");
    const resetButton = makeButton("Reset");
    const closeButton = makeButton("Schließen");

    function render() {
        const minutes = Math.floor(state.remaining / 60);
        const seconds = state.remaining % 60;

        display.textContent =
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;

        startButton.textContent = state.running ? "Pause" : "Start";
    }

    function stopInterval() {
        clearInterval(state.interval);
        state.interval = null;
        state.running = false;
    }

    startButton.addEventListener("click", () => {
        if (state.running) {
            stopInterval();
            status.textContent = "Pausiert";
            render();
            return;
        }

        state.running = true;
        status.textContent = "Konzentriert arbeiten";
        render();

        state.interval = setInterval(() => {
            state.remaining--;

            if (state.remaining <= 0) {
                state.remaining = 0;
                stopInterval();
                status.textContent = "✅ Fokuszeit beendet";
                panel.style.background =
                    "linear-gradient(135deg, #107e3e, #256f3a)";
            }

            render();
        }, 1000);
    });

    addButton.addEventListener("click", () => {
        state.remaining += 5 * 60;
        status.textContent = "Fünf Minuten hinzugefügt";
        render();
    });

    resetButton.addEventListener("click", () => {
        stopInterval();
        state.remaining = DEFAULT_SECONDS;
        status.textContent = "Bereit für die nächste Übung";
        panel.style.background =
            "linear-gradient(135deg, #0a6ed1, #354a5f)";
        render();
    });

    closeButton.addEventListener("click", () => {
        stopInterval();
        panel.remove();
        delete window.sfFocusTimer;
    });

    controls.append(startButton, addButton, resetButton, closeButton);
    panel.append(title, display, status, controls);
    document.body.appendChild(panel);

    render();
})();