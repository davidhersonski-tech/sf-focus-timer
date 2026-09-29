(() => {
    const ID = "sf-fokus-timer";
    const POSITION_KEY = "sf-fokus-timer-position";

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

    // =========================================================
    // PANEL
    // =========================================================

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

    // =========================================================
    // TITEL / DRAG-HANDLE
    // =========================================================

    const title = document.createElement("div");
    title.textContent = "🎯 SF-Fokuszeit";

    Object.assign(title.style, {
        fontWeight: "bold",
        fontSize: "17px",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        padding: "3px 0 6px 0"
    });

    // =========================================================
    // TIMER
    // =========================================================

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

    // =========================================================
    // BUTTONS
    // =========================================================

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

    // =========================================================
    // RENDERING
    // =========================================================

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

    // =========================================================
    // START / PAUSE
    // =========================================================

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

    // =========================================================
    // +5 MINUTEN
    // =========================================================

    addButton.addEventListener("click", () => {
        state.remaining += 5 * 60;
        status.textContent = "Fünf Minuten hinzugefügt";
        render();
    });

    // =========================================================
    // RESET
    // =========================================================

    resetButton.addEventListener("click", () => {

        stopInterval();

        state.remaining = DEFAULT_SECONDS;

        status.textContent =
            "Bereit für die nächste Übung";

        panel.style.background =
            "linear-gradient(135deg, #0a6ed1, #354a5f)";

        render();
    });

    // =========================================================
    // SCHLIESSEN
    // =========================================================

    closeButton.addEventListener("click", () => {

        stopInterval();

        panel.remove();

        delete window.sfFocusTimer;
    });

    // =========================================================
    // DRAG & DROP
    // =========================================================

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    title.addEventListener("pointerdown", (event) => {

        if (event.button !== 0) return;

        dragging = true;

        const rect = panel.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        // Wechsel von right auf left, damit das Panel
        // frei positioniert werden kann.
        panel.style.left = `${rect.left}px`;
        panel.style.top = `${rect.top}px`;
        panel.style.right = "auto";

        title.style.cursor = "grabbing";

        title.setPointerCapture(event.pointerId);

        event.preventDefault();
    });

    title.addEventListener("pointermove", (event) => {

        if (!dragging) return;

        const panelWidth = panel.offsetWidth;
        const panelHeight = panel.offsetHeight;

        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;

        // Panel innerhalb des sichtbaren Browserfensters halten
        newLeft = Math.max(
            0,
            Math.min(
                newLeft,
                window.innerWidth - panelWidth
            )
        );

        newTop = Math.max(
            0,
            Math.min(
                newTop,
                window.innerHeight - panelHeight
            )
        );

        panel.style.left = `${newLeft}px`;
        panel.style.top = `${newTop}px`;
    });

    title.addEventListener("pointerup", (event) => {

        if (!dragging) return;

        dragging = false;

        title.style.cursor = "grab";

        if (title.hasPointerCapture(event.pointerId)) {
            title.releasePointerCapture(event.pointerId);
        }

        const rect = panel.getBoundingClientRect();

        // Position speichern
        localStorage.setItem(
            POSITION_KEY,
            JSON.stringify({
                left: rect.left,
                top: rect.top
            })
        );
    });

    title.addEventListener("pointercancel", () => {
        dragging = false;
        title.style.cursor = "grab";
    });

    // =========================================================
    // ELEMENTE EINFÜGEN
    // =========================================================

    controls.append(
        startButton,
        addButton,
        resetButton,
        closeButton
    );

    panel.append(
        title,
        display,
        status,
        controls
    );

    document.body.appendChild(panel);

    // =========================================================
    // GESPEICHERTE POSITION WIEDERHERSTELLEN
    // =========================================================

    try {

        const savedPosition =
            JSON.parse(
                localStorage.getItem(POSITION_KEY)
            );

        if (
            savedPosition &&
            Number.isFinite(savedPosition.left) &&
            Number.isFinite(savedPosition.top)
        ) {

            const maxLeft =
                window.innerWidth - panel.offsetWidth;

            const maxTop =
                window.innerHeight - panel.offsetHeight;

            panel.style.left =
                `${Math.max(
                    0,
                    Math.min(
                        savedPosition.left,
                        maxLeft
                    )
                )}px`;

            panel.style.top =
                `${Math.max(
                    0,
                    Math.min(
                        savedPosition.top,
                        maxTop
                    )
                )}px`;

            panel.style.right = "auto";
        }

    } catch (error) {
        console.warn(
            "Gespeicherte Fokus-Timer-Position konnte nicht geladen werden.",
            error
        );
    }

    render();

})();