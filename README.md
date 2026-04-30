# Day & Night Weather Dashboard

> A sophisticated, data-driven weather application demonstrating advanced vanilla JavaScript architecture with strict Model-View-Controller separation of concerns, procedural celestial geometry, and dynamic UI context binding.

<div align="center">

**[Live Demo](https://weather-app-five-delta-29.vercel.app)** • **[Documentation](#architecture)** • **[Contributing](#development)**

</div>

---

## Project Overview

The **Day & Night Weather Dashboard** is a real-time weather forecasting application that transcends traditional weather data visualization by introducing **contextual UI generation** and **procedural astronomical tracking**. Built entirely in Vanilla JavaScript without frameworks, the application demonstrates enterprise-grade architectural patterns while maintaining a minimal, composable codebase.

### Core Proposition

This is not merely a weather display—it's an **intelligent information system** that:

- **Transforms raw meteorological data** into UI-ready models via a centralized view model
- **Procedurally renders celestial motion** using SVG coordinate geometry and real-time astronomical calculations
- **Dynamically adapts visual context** (backgrounds, map styles, typography) based on solar cycles and atmospheric conditions
- **Manages complex state** through a centralized controller with zero global mutation
- **Maintains architectural purity** via strict MVC boundaries and chart-level Model-Renderer-Config isolation

---

## Architecture

### Design Principles

The application adheres to three foundational architectural principles:

1. **Separation of Concerns (SoC)**: Each module has a single, well-defined responsibility with minimal cross-module coupling.
2. **Unidirectional Data Flow**: Data flows strictly from Models → Views → Controller event handlers, preventing circular dependencies.
3. **Immutable Configuration**: API keys, chart dimensions, and UI thresholds are frozen constants to prevent accidental runtime mutations.

### Directory Structure

```bash
src/
├── index.html                 # Application shell (semantic HTML5)
├── index.js                   # Entry point
│
├── api/                       # External API integration layer
│   ├── weather.js            # Visual Crossing weather API client
│   ├── dynamicBackground.js  # Unsplash image fetching
│   ├── geolocation.js        # Browser Geolocation API wrapper
│   └── map.js                # Geoapify static map URL builder
│
├── models/                    # Data transformation layer (MVC Models)
│   └── weatherViewModel.js   # Raw API → UI-ready data structure
│
├── components/               # UI rendering layer (MVC Views)
│   ├── index.js             # Component export barrel
│   ├── header.js            # Header date display
│   ├── sidebar.js           # Weather metrics + air quality
│   ├── weatherHero.js       # Main weather display
│   ├── insights.js          # Wind stats + astronomy toggle
│   └── nextdaysForecast.js  # 5-day forecast cards
│
├── charts/                   # Specialized visualization modules
│   ├── windChart/
│   │   ├── config.js        # Chart dimensions & scaling
│   │   ├── windChartModel.js      # Hourly wind → SVG coordinates
│   │   └── windChartRenderer.js   # SVG histogram + trendline
│   │
│   ├── forecastChart/
│   │   ├── config.js
│   │   ├── forecastChartModel.js  # Temperature data → coordinates
│   │   └── forecastChartRenderer.js  # Quadratic bezier trendlines
│   │
│   └── astroObjectPosition/
│       ├── computePosition.js      # Sun/moon trajectory computation
│       ├── renderAstroObject.js    # SVG circle positioning + phase
│       └── index.js               # Orchestration entry point
│
├── ui/                       # Application controller (MVC Controller)
│   └── controller.js        # Event binding + data pipeline orchestration
│
├── utils/                    # Pure utility functions
│   ├── weatherUnit.js           # Unit system management (metric/US/UK)
│   ├── weatherLevels.js         # Metric → interpretation mapping
│   ├── time-fns.js              # Timezone-aware time utilities + "vibe" engine
│   ├── customDropDown.js        # Accessible dropdown component
│   └── capitalizeFirstLetter.js # String utility
│
└── styles/                   # Component-scoped and utility CSS
    ├── main.css             # Entry point (import order = cascade priority)
    ├── base.css             # Global reset + typography
    ├── layout.css           # App grid layout
    ├── components/          # Component-specific styles
    │   ├── header.css
    │   ├── sidebar.css
    │   ├── weatherHero.css
    │   ├── insights.css
    │   └── nextdaysForecast.css
    └── utilities/           # Reusable utility classes
        ├── glass-panel.css          # Glassmorphism effect
        ├── customDropdown.css       # Dropdown styling
        ├── toggleSwitch.css         # Sun/moon mode toggle
        └── accessibility.css        # Screen reader utilities
```

### MVC Architecture Breakdown

#### **Model Layer: `src/models/weatherViewModel.js`**

The Model acts as the "brain" of the application, transforming raw Visual Crossing API responses into structured, component-aware objects.

**Responsibilities:**
- Normalize nested API response into flat, UI-optimized structure
- Extract component-specific data subsets (header, sidebar, weatherHero, insights)
- Compute derived values (e.g., centered 39-hour window from hourly data)
- Generate simplified forecast objects for card rendering

**Key Pattern:**
```javascript
// Raw API response → component-indexed model
processWeatherData(rawAPIData) → {
  conditions,
  header: { date },
  sidebar: { humidity, uvIndex, ... },
  weatherHero: { temperature, location, ... },
  insights: { centered39hWindow, astronomy { sun, moon } },
  nextFiveDays: [ { dayName, highTemp, icon } ]
}
```

**Benefits:**
- Single source of truth for data transformation
- Components consume only their required data slice
- API schema changes isolated to one module
- Easy to extend with new data fields

#### **View Layer: `src/components/` and `src/charts/`**

Views are stateless, pure rendering functions that accept processed models and update DOM.

**Component Structure:**
```bash
renderXXX(processedData) → DOM mutations only
```

**Chart Structure** (Model-Renderer-Config Pattern):
```bash
config.js           → Immutable dimensions, thresholds
chartModel.js       → Raw data → SVG coordinates
chartRenderer.js    → Coordinates → DOM SVG elements
index.js            → Orchestrate model + renderer
```

**Example: Wind Chart**
- `config.js`: SVG height=70px, visualMax=30m/s, barCap=0.7
- `windChartModel.js`: Convert hourly wind speeds to bar heights and gust line positions
- `windChartRenderer.js`: Create SVG `<rect>` elements and `<polyline>` trendline
- Result: Composable, testable, dimension-agnostic visualization

#### **Controller Layer: `src/ui/controller.js`**

The Controller orchestrates the complete data pipeline: events → models → views.

**Orchestration Flow:**
```bash
User Input (form/button)
    ↓
bindFormEvents() / bindLocationButton()
    ↓
getWeather(location, unitSystem)  [API call]
    ↓
processWeatherData()  [Model transformation]
    ↓
updateBackgroundImage()  [Dynamic context]
    ↓
renderAll()  [Component rendering]
    ├── renderHeader()
    ├── renderSideBar()
    ├── renderWeatherHero()
    ├── renderInsights()
    └── renderNextDaysForecast()
```

**Key Patterns:**
- Lazy DOM node caching via IIFE pattern to avoid null reference errors
- Single `isInitialized` guard prevents event listener duplication
- Centralized state management (currentProcessedData, currentTimeVibe)
- Promise chaining for sequential API → transform → render pipeline

---

## Key Features

### 1. Procedural Celestial Tracking

The application renders the **sun and moon trajectories in real-time** using procedural geometry rather than pre-computed sprites.

**How It Works:**

- **SVG Arc Definition**: An SVG `<path>` element defines an elliptical arc representing the celestial object's path above the horizon.
- **Time-Based Progress**: Current time (in seconds since midnight) is normalized to a 0–1 progress value between rise and set times.
- **Coordinate Extraction**: `track.getPointAtLength()` returns the (x, y) position at the specified progress along the arc.
- **Dynamic Positioning**: The circle element (`<circle>`) is continuously updated with new coordinates as time advances.

**Mathematical Foundation:**

```javascript
// Normalized progress: 0 = rise, 1 = set
progress = (currentTimeInSeconds - riseTimeInSeconds) / (setTimeInSeconds - riseTimeInSeconds)

// Arc traversal: SVG path length → screen coordinates
[x, y] = track.getPointAtLength(progress * totalArcLength)

// Result: Sun/moon appears to move along the arc in real-time
```

**Edge Case Handling:**
- **Midnight Crossing**: Objects that rise before midnight and set after correctly compute elapsed time across the day boundary.
- **Polar Regions**: Handles scenarios where celestial objects never set or never rise (constant visibility).

---

### 2. Dynamic Lunar Shrouding (Lunar Phase Simulation)

The application renders **real-time lunar phase visualization** using a calculated offset shadow.

**Implementation:**

- **Phase-Based Offset**: Moon phase (0 = new, 0.5 = full, 1 = new) is mapped to a horizontal shadow offset.
- **Crescent Effect**: A dark SVG circle (`moon-shroud`) slides across the visible moon circle to create crescent, gibbous, and full phase appearances.
- **Offset Calculation**:
  ```javascript
  const radius = 6;  // Moon circle radius
  offset = (phase - 0.5) * (radius * 4)
  // phase 0 → offset = -12 (full dark)
  // phase 0.5 → offset = 0 (no shadow, full moon)
  // phase 1 → offset = +12 (full light)
  ```

**Visual Result:**
- **New Moon**: Shroud completely covers the moon
- **Crescent**: Shroud partially offset, creating thin crescent
- **Full Moon**: Shroud hidden (offset = 0), moon fully visible
- **Gibbous**: Shroud progressively offset, showing intermediate phases

---

### 3. Contextual UI: The "Vibe" Engine

The application dynamically adapts its **visual context** (backgrounds, map styles, text hierarchy) based on the **time of day relative to solar cycles**.

**"Vibe" Categories:**

| Vibe | Time Window | Background Theme | Map Style | UI Intent |
|------|-------------|------------------|-----------|-----------|
| `night moody` | Before dawn OR after dusk (+30min buffer) | Dark, stormy | dark-matter | Calm, reduced contrast |
| `sunrise dawn` | 30min before to 1hr after sunrise | Golden, warm | klokantech-basic | Awakening energy |
| `morning light` | 1hr after sunrise to noon | Bright, clear | osm-bright | Vibrant, optimistic |
| `afternoon sun` | Noon to 1hr before sunset | Vivid, saturated | osm-bright | Peak energy |
| `sunset golden hour` | 1hr before to 30min after sunset | Golden, warm | dark-matter | Romantic, reflective |

**Implementation:**

```javascript
// Solar cycle calculation
getTimeVibe(timezone, sunriseTime, sunsetTime) → vibe string

// Context binding
currentTimeVibe → Unsplash image search query
currentTimeVibe → Geoapify map style selection
currentTimeVibe → CSS variable values (future extensibility)
```

**Real-World Impact:**
- A weather query at 6:30 AM automatically fetches "sunrise dawn" imagery and applies warm map styling.
- The same location at 3 PM renders "afternoon sun" context with bright map styles and saturated backgrounds.
- User never explicitly selects context—it's derived from solar physics.

---

### 4. Multi-Unit System Support

The application dynamically switches between **three standardized unit systems** without requiring page reload.

**Supported Systems:**
- **Metric**: °C, km/h, km
- **US**: °F, mph, miles
- **UK**: °C, mph, miles

**Implementation:**
- Centralized `weatherUnit.js` manages active unit system
- `setUnitSystem(unitSystem)` updates global state before data fetch
- All chart renderers query `formatUnit(measurement)` at render time
- Wind speed models apply unit-specific conversion factors

---

### 5. Air Quality Monitoring (AQI + Pollutant Tracking)

Real-time pollutant concentration display with color-coded risk levels.

**Monitored Pollutants:**
- **PM₂.₅**: Fine particulate matter (µg/m³)
- **PM₁₀**: Coarse particulate matter (µg/m³)
- **O₃**: Ozone (ppb)
- **NO₂**: Nitrogen dioxide (ppb)

**AQI Categories:**
- 0–50: **Good** (green)
- 51–100: **Moderate** (yellow)
- 101–150: **Unhealthy (Sensitive Groups)** (orange)
- 151–200: **Unhealthy** (red)
- 201–300: **Very Unhealthy** (purple)
- 300+: **Hazardous** (maroon)

---

### 6. Advanced Forecast Visualization

**39-Hour Centered Window**: Wind chart displays hourly data centered on the current hour (19.5 hours past + current + 19 hours future).

**Temperature Trendlines**: Forecast chart renders high/low temperature curves using quadratic Bézier splines for smooth interpolation between daily points.

---

### 7. Optimized Initial Load (UX)
The application implements a "Smart Start" sequence to ensure the user is never met with a blank state:
1. **Primary Action**: Attempts to utilize the **Browser Geolocation API** to provide hyper-local weather immediately upon arrival.
2. **Graceful Fallback**: If location access is denied or unavailable, the Controller automatically initializes with a high-context default city (e.g., Dubai).

---

### 8. Robust Asynchronous State Management

The application implements a dedicated Loading Lifecycle to bridge the gap between user intent and API resolution.

- **UX Consistency**: Employs a custom-animated "Thematic Pulse" overlay that maintains visual continuity with the application's astronomical theme while preventing "stale data" confusion.

- **Performance Testing**: Engineered to maintain UI responsiveness even under significant network latency, verified using Chrome DevTools' Slow 3G throttling.

- **Fail-Safe Logic**: Utilizes try...catch...finally blocks within the Controller to ensure the UI state resets correctly even if API requests are interrupted or exhausted.

---

## Tech Stack
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)](https://webpack.js.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

### Core Language & Runtime
- **Vanilla ES6+**: No frameworks; pure JavaScript modules with native `import`/`export`
- **Native Web APIs**: Fetch, Geolocation, Date (date-fns for timezone support)

### Styling
- **CSS3**: Grid, Flexbox, Custom Properties, Glassmorphism backdrop filter
- **Component Architecture**: BEM-inspired naming with scoped component stylesheets
- **Intrinsically Responsive Design**: Utilizes CSS Grid and Flexbox to maintain layout integrity across varying viewport widths without heavy reliance on fixed breakpoints.

### Build & Development
- **Webpack 5**: Module bundling, asset management, dev server
- **Babel**: (implicit via webpack) for ES6 transpilation
- **ESLint + Prettier**: Code quality and formatting enforcement
- **Husky + lint-staged**: Pre-commit hooks for linting/formatting

### External APIs (3rd-Party)

| Service | Purpose | Rate Limit | Documentation |
|---------|---------|------------|----------------|
| **Visual Crossing** | Weather & astronomy data | 40 queries/day | [Weather API Documentation](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/) |
| **Unsplash** | Dynamic background imagery | 50 reqs/hour | [Unsplash Developers](https://unsplash.com/documentation) |
| **Geoapify** | Static map rendering | 3k reqs/day| [Geoapify APIs Documentation](https://apidocs.geoapify.com/docs) |
| **Browser Geolocation** | User coordinates | Built-in | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) |

**Note**: Rate limits are based on the current API configuration used in this project (development/free-tier credentials). If you use your own API keys or different subscription tiers, these limits may differ.

### Libraries

| Library | Purpose | Size |
|---------|---------|------|
| **date-fns** | Timezone-aware date manipulation | ~13KB (modular) |
| **@fontsource** | Self-hosted typography (Inter, Plus Jakarta Sans) | ~50KB total |

---

## Getting Started

### Prerequisites
- **Node.js** 16+ and npm 8+
- **Environment Variables**: Create `.env` in project root
  ```env
  WEATHER_API_KEY=your_visual_crossing_api_key
  UNSPLASH_KEY=your_unsplash_access_key
  GEOAPIFY_KEY=your_geoapify_api_key
  ```

### Installation

```bash
git clone https://github.com/nishadnp/weather-app.git
cd weather-app
npm install
```

### Development

```bash
npm run dev
# Opens http://localhost:8080 with hot reload
```

### Production Build

```bash
npm run build
# Outputs optimized bundle to dist/
```

### Code Quality

```bash
npm run lint           # Run ESLint
npm run lint:fix       # Fix linting issues
npm run format         # Run Prettier
```

---

## Data Flow Diagram

```bash
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERACTION                        │
│            (Search form / Current location button)          │
└────────────────────┬────────────────────────────────────────┘
                     ↓
        ┌────────────────────────────┐
        │   UI CONTROLLER            │
        │ ui/controller.js           │
        │ • Event binding            │
        │ • Unit system selection    │
        └────────────┬───────────────┘
                     ↓
        ┌────────────────────────────┐
        │   API INTEGRATION LAYER    │
        │ api/weather.js             │
        │ • Fetch raw API data       │
        │ • Handle errors            │
        └────────────┬───────────────┘
                     ↓
    ┌────────────────────────────────────┐
    │   DATA TRANSFORMATION (MODEL)      │
    │ models/weatherViewModel.js         │
    │ • Normalize nested structures      │
    │ • Extract component-specific data  │
    │ • Compute derived values           │
    └────────────┬───────────────────────┘
                 ↓
    ┌──────────────────────────────────────────────────┐
    │         CONTEXT DERIVATION                       │
    │ • Time vibe calculation                          │
    │ • Background image fetch                         │
    │ • Map style selection                            │
    └────────────┬─────────────────────────────────────┘
                 ↓
    ┌─────────────────────────────────────────────┐
    │  VIEW RENDERING LAYER                       │
    │  ├── Header              (date display)     │
    │  ├── Sidebar             (metrics + AQI)    │
    │  ├── Weather Hero        (conditions)       │
    │  ├── Insights            (wind + astro)     │
    │  └── Next 5 Days Forecast (cards + chart)   │
    │                                             │
    │  CHART SUBSYSTEMS:                          │
    │  ├── Wind Chart          (bars + trendline) │
    │  ├── Forecast Chart      (bezier curves)    │
    │  └── Astro Chart         (arc + shadows)    │
    └────────────┬────────────────────────────────┘
                 ↓
        ┌────────────────────────┐
        │    RENDERED DOM        │
        │   (User sees result)   │
        └────────────────────────┘
```

---

## Architecture Principles: Why This Design?

### 1. Single Responsibility Principle
- Each module has **one reason to change**
- `weatherViewModel.js` changes only if API schema changes
- `windChartModel.js` changes only if chart math changes
- Components change only if DOM structure changes

### 2. Unidirectional Data Flow
- Data flows: Controller → Model → Views
- Views never modify Model; only Controller does
- No circular dependencies or mutual modification
- Easier to trace data mutations for debugging

### 3. Configuration Over Code
- Chart dimensions live in `config.js` files
- Thresholds for level mapping in `weatherLevels.js`
- API endpoints frozen in constants
- Non-developers can adjust UI without touching logic

### 4. Composition Over Inheritance
- Utility functions are pure, stateless
- Components are small, focused, reusable
- Charts are self-contained with model/renderer/config
- Easy to add new features without modifying existing code

### 5. Progressive Enhancement
- Static HTML provides baseline functionality (no JS)
- CSS handles layout and basic styling
- JavaScript layers interactivity and real-time updates
- Graceful degradation if APIs fail

---

## Extensibility Examples

### Add a New Weather Metric

1. Add field to Visual Crossing API request
2. Normalize in `models/weatherViewModel.js`
3. Create new component: `components/newMetric.js`
4. Call renderer in `controller.js`'s `renderAll()` function

### Add a New Chart Type

1. Create folder: `src/charts/newChart/`
2. Implement: `config.js`, `newChartModel.js`, `newChartRenderer.js`, `index.js`
3. Import and orchestrate in relevant component
4. Chart is instantly testable, reusable, dimension-agnostic

### Support a New Unit System

1. Add entry to `weatherUnit.js` UNIT_MAP
2. Update conversion factors in relevant chart models
3. UI automatically adapts on dropdown selection

---

## Performance Considerations

- **Lazy DOM Queries**: Nodes cached on first access via `??=` operator
- **Event Delegation**: Single listener on `document` for dropdowns
- **Efficient Rerenders**: Only modified data sections trigger DOM updates
- **SVG Optimization**: Chart paths computed once, reused for scaling
- **Async Image Loading**: Background images fetch without blocking UI
- **Minimal Bundle**: No frameworks; ~100KB minified + gzipped

---

## Browser Support

- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Mobile**: iOS Safari 14+, Chrome Android

(Requires ES6 support: arrow functions, destructuring, template literals, `fetch` API)

---

## Development

### Folder Structure Conventions

```bash
src/
├── api/         → External API clients (no DOM access)
├── models/      → Pure data transformations (no side effects)
├── components/  → View functions (DOM mutations only)
├── charts/      → Visualization subsystems (MRC pattern)
├── ui/          → Application controller (event orchestration)
├── utils/       → Pure utility functions (reusable across modules)
└── styles/      → Component + utility CSS
```

### Code Style

- **Naming**: camelCase for variables/functions, BEM for CSS classes
- **Comments**: JSDoc for public APIs; inline for complex logic
- **Modules**: One default export per file; named exports for utilities
- **Immutability**: Use `Object.freeze()` for config; avoid direct mutation

### Testing

Currently no test framework, but architecture enables easy testing:
```javascript
// Model is pure function → easy to unit test
processWeatherData(mockAPIResponse) → assert output structure

// Chart model is isolated → test without rendering
getWindChartModel(mockHours, config) → assert coordinate precision

// Chart renderer is predictable → mock DOM and assert SVG attributes
```

---

## Known Limitations

1. **Real-Time Updates**: Application doesn't auto-refresh; requires manual location re-entry
2. **Offline Mode**: No service worker; requires internet connectivity
3. **Historical Data**: Only current forecast; no historical data archive
4. **Accessibility**: Charts are primarily visual; however, core weather status and loading states utilize ARIA live regions and roles for screen reader compatibility.
5. **Mobile**: Responsive design present but not fully optimized for touch interactions

---

## Deployment & CI/CD

- The application is architected for modern cloud environments and is currently deployed via Vercel.

- Automated Pipeline: Integrated with GitHub to trigger automated builds and deployments on every git push.

- Environment Security: API keys (Visual Crossing, Unsplash, Geoapify) are managed through Vercel Environment Variables, ensuring sensitive credentials are never exposed in the client-side source code or version control.

- Production Optimization: Leverages Vercel’s edge network for fast asset delivery and optimized performance of the bundled Webpack output.

---

## License

![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)

See LICENSE file for details.

---

## Credits & Acknowledgements

### Iconography & UI Assets

- **Weather Icons**: Created by Dr. Lex (Alexander Thomas), based on the original Dark Sky icon set. Used under Creative Commons - Attribution license. (Source: [dr-lex.be](https://www.dr-lex.be/)).

- **Astronomy Icons**:

    - **Sunrise/Sunset**: Sourced from [Bootstrap Icons](https://icons.getbootstrap.com/).

    - **Moonrise/Moonset**: Sourced from [Carbon Design System](https://github.com/carbon-design-system/carbon) (Licensed under [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)).

- **General UI Icons**: Curated from [Google Material Symbols](https://fonts.google.com/icons) for high-density dashboard clarity.

- **Typography**: Inter and Plus Jakarta Sans self-hosted via [Fontsource](https://fontsource.org).

---

### Design Inspiration

**UI Reference**: Based on the *[Weathrly Weather Forecasting Web Design on Dribbble](https://dribbble.com/shots/26769969-Weathrly-Weather-Forecasting-Web-Design).*

**Technical Execution**: The static high-fidelity mockup was translated into a functional, state-driven dashboard. The implementation prioritizes intrinsic responsiveness using CSS Grid and Flexbox, custom glassmorphism effects, and real-time SVG coordinate geometry for celestial tracking.

## Contact & Support

- **Author**: [nishadnp](https://github.com/nishadnp)
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

---

<div align="center">

**Built with ☀️ and 🌙 by nishadnp**

*A celebration of Vanilla JavaScript, MVC architecture, and the poetry of procedural geometry.*

</div>
