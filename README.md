# 🖍️ DevSphere: Doodle Land Micro-Apps Suite ✨

[![Design System: Google Stitch](https://img.shields.io/badge/Design_System-Google_Stitch-FFD93D?style=for-the-badge&logo=google&logoColor=1E1B4B)](./DESIGN.md)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Firebase Auth](https://img.shields.io/badge/Firebase-Protected-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

[📄 Read the Full Design Specifications (DESIGN.md)](./DESIGN.md)

![Doodle Land App Preview](https://lh3.googleusercontent.com/aida/AEtjO1XlCzxJ7SxElAzBcMTw3b9VVk5P0AVV431TdzCSNVcotFf2fvORIBMFcsf_9z982a7_GOq0Tv24EO-GUarBPe2JCX8JxzOEIN3C6huMTYAqNNquyOUBT6NerxSqZGt1Rirmzkm9VBaLpkX-Lt3Sb2Ph31467gWaAV2jfwTIsryJaoYrIkd1l-B2qoB96YqFKRQlK0rwXU97rs4s3MrA5rSbCQywt-BTpP5h-JuwgQzG0vSR83HLfUwuuBo)

> **"A playful Neo-Brutalist 40-micro-app master command center"**
> 
> Welcome to **DevSphere**, a unified interactive platform that feels like an animated, tactile toy universe. Here, gamified interaction meets tangible physical play, housing 40 fully functional web applications! 🎨🧩

---

## 🏗️ Architecture & Security 🔒

DevSphere operates as a highly scalable **Unified Single-Page Application (SPA)** built on **Next.js 15**. Every app module is a dynamically routed segment within a flattened, optimized master layout. 

### 🎨 Google Stitch Design Sync
Our aesthetics are strictly tethered to the **Google Stitch** "Doodle Land" design language. Think pill-shaped buttons, heavy ink outlines (`3.5px solid #1E1B4B`), pure Neo-Brutalist drop shadows, and high-energy pastel bursts. Every component honors the [DESIGN.md](./DESIGN.md) source of truth for pixel-perfect fidelity.

### 🛡️ Firebase Secure Authentication Gate
Zero unauthenticated access! The root layout is securely wrapped in an **`AuthGuard`**. If you aren't authenticated via Firebase (Email/Password or Google), you are instantly intercepted by the immersive **Login Hero** gate. 

---

## 🧩 Milestone 1: The Core 10 Apps Logic Breakdown ⚙️

Here is a deep technical dive into the logic, state management, and specific functions driving each of our first 10 apps.

### 1️⃣ Calculator 🧮
- **Core Purpose:** A tactile, fully functional math evaluation engine with physical bounce physics.
- **Underlying Logic:** State tracks the current operand, previous operand, and selected operation. Inputs are parsed as strings and evaluated upon pressing equals.
- **Key Functions:**
  - `evaluateMath(prev, curr, op)`: Handles raw math execution and divide-by-zero edge cases.
  - `handleOperator(op)`: Swaps the operational state without losing history.
  - **Web Audio API:** A subtle `playClickSound()` triggers on every button press for an authentic mechanical switch feel.

### 2️⃣ Quiz App 🧠
- **Core Purpose:** A dynamic trivia engine with gamified streaks, high-score tracking, and celebratory particle bursts.
- **Underlying Logic:** Questions are managed in a state array (`questions[currentIndex]`). Selecting an answer evaluates against a pre-defined correct index, pushing score data into a Zustand store.
- **Key Functions:**
  - `calculateScore(time, streak)`: Determines point yield featuring streak multiplier algorithms.
  - `triggerConfetti()`: Hooks into Canvas/GSAP to fire a multi-color particle burst on correct answers.

### 3️⃣ Rock Paper Scissors ✌️
- **Core Purpose:** A high-speed, 2-player local state game with instant resolution and playful animations.
- **Underlying Logic:** Uses a static Choice Mapping Matrix (`{ rock: 'scissors', paper: 'rock', scissors: 'paper' }`) to calculate the winning condition in constant time O(1).
- **Key Functions:**
  - `resolveWinner(p1, p2)`: Evaluates the matrix map and returns `WIN`, `LOSE`, or `DRAW`.
  - **Animation Binding:** Anime.js `animateHandShake()` fires a 3-tick CSS rotation bounce before revealing choices.

### 4️⃣ Note App 📝
- **Core Purpose:** A markdown-supported sticky note tracker with mock AI tagging and persistence.
- **Underlying Logic:** Notes exist as an array of objects synced to `localStorage`. An overarching layout maps through the array, parsing markdown down to raw HTML safely.
- **Key Functions:**
  - `syncToStorage(notes)`: Debounced synchronization pipeline to `localStorage`.
  - `mockAITagger(text)`: Scans note text for keywords (e.g., "todo", "idea", "bug") and automatically assigns categoric chips.
  - `parseMarkdown(raw)`: A lightweight regex pipeline translating `**bold**` and `*italic*` strings.

### 5️⃣ Stopwatch App ⏱️
- **Core Purpose:** A high-precision digital chronometer with lap tracking and split-time logic.
- **Underlying Logic:** Avoids drifting `setInterval` delays by using the `performance.now()` API to calculate true delta time since the start timestamp.
- **Key Functions:**
  - `updateDisplay()`: Runs inside a `requestAnimationFrame` loop, translating delta time to `MM:SS:MS`.
  - `recordLap()`: Copies current elapsed time into a state array and calculates the delta split from the previous lap.
  - **Mechanical Effect:** Number wheels trigger a GSAP flip animation whenever the tens or seconds digit rolls over.

### 6️⃣ QR Reader App 📷
- **Core Purpose:** Generates dynamic QR codes and simulates a canvas-based camera stream for decoding.
- **Underlying Logic:** Uses the `qrcode` library to build 2D barcode data URIs from input text. Simulated reading uses a mock camera feed drawn dynamically onto a `<canvas>`.
- **Key Functions:**
  - `generateQR(text)`: Converts string data into a base64 Data URI blob.
  - `scanSimulatedStream(canvasCtx)`: Periodically scans the visual array of the canvas element for recognizable alignment patterns.

### 7️⃣ Weather App ⛅
- **Core Purpose:** Fetches real-time climate data and visualizes it with dynamic GSAP particle weather backends.
- **Underlying Logic:** Interacts with a REST weather API (mocked/live). The UI dynamically maps the condition code (Rain, Sun, Snow) to a specific canvas renderer.
- **Key Functions:**
  - `fetchWeatherData(location)`: Asynchronous data fetching handling loading, success, and error states.
  - `convertMetrics(temp, toScale)`: Utility for swapping between Celsius and Fahrenheit.
  - `initRainSystem()`: A complex Three.js/Canvas loop tracking hundreds of line-segments falling and colliding with the bottom edge.

### 8️⃣ E-Commerce Website 🛒
- **Core Purpose:** A robust storefront with dynamic grid filtering, localized cart state, and a multi-step checkout.
- **Underlying Logic:** Uses `Zustand` to maintain global cart state independent of the current route. Products are filtered dynamically by category and price constraints.
- **Key Functions:**
  - `addToCart(product, qty)`: Upserts product entities in the Zustand map array.
  - `filterGrid(category, sortOrder)`: Array reduction and sorting algorithm prioritizing O(n log n) efficiency.
  - `checkoutStateMachine`: Maps the user through `CART -> DETAILS -> PAYMENT -> SUCCESS` rendering distinct components per state.

### 9️⃣ Landing Page 🚀
- **Core Purpose:** A heavily animated, high-converting front door with scroll-linked interactions.
- **Underlying Logic:** Dominated by layout observers and GSAP ScrollTriggers that link the vertical scroll position to element opacity, translation, and morphing.
- **Key Functions:**
  - `bindScrollTimeline()`: Instantiates GSAP triggers linked to DOM refs.
  - `animateHeaderMorph()`: Condenses the oversized hero navigation into a sticky, pill-shaped glassmorphism bar when scrolled past 100px.
  - `calculateDynamicPricing(users)`: A live slider function computing standard vs. enterprise pricing limits on the fly.

### 1️⃣0️⃣ Password Generator 🔐
- **Core Purpose:** A cryptographically secure random key generator with real-time entropy evaluation.
- **Underlying Logic:** Builds a master character pool dynamically based on user-selected toggles (uppercase, numbers, symbols) and pulls randomized indices.
- **Key Functions:**
  - `generateSecureSequence(length, options)`: Utilizes `crypto.getRandomValues()` instead of `Math.random()` for pure randomness without predictable seeds.
  - `calculateEntropy(password)`: Evaluates the raw bits of entropy based on length and pool size ($E = L \times \log_2(R)$).
  - `evaluateStrengthRegex(password)`: Maps entropy score to our gamified strength labels (e.g., "Playful", "Rune Ward Active").

---

> 🚀 **Ready to orbit into Doodle Land?** Run `pnpm install` & `pnpm dev`, clear the Login Hero gate, and explore the master dashboard!
