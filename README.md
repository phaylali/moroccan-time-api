# 🗓️ Moroccan Time API 🇲🇦

<div align="center">

![Amazigh Calendar](https://img.shields.io/badge/Amazigh-Calendar-blue?style=for-the-badge)
![Hono](https://img.shields.io/badge/Hono-4.8.9-orange?style=for-the-badge)
![Bun](https://img.shields.io/badge/Bun-1.3.8-red?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge)

A powerful API that provides accurate date conversions between **Gregorian**, **Islamic (Hijri)**, and **Amazigh (Berber)** calendars - all with support for Tifinagh script! ✨

</div>

---

## ✨ Features

- 🔄 **Real-time Date Conversion** - Convert any date between three calendar systems
- 🌙 **Islamic/Hijri Dates** - Powered by the Aladhan API for accurate Hijri dates
- ⵣ **Amazigh Calendar** - Julian-based calendar with Tifinagh script support
- 🕐 **Morocco Timezone** - All dates are calculated for Africa/Casablanca timezone
- 🚀 **Lightning Fast** - Built with Hono and Bun for edge performance
- 🌐 **Edge Ready** - Deploys seamlessly to Vercel

---

## 📡 API Endpoints

### 🏠 Base Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Welcome message |
| `/api/` | GET | HTML documentation with all endpoints |
| `/api/list/` | GET | JSON list of all available APIs |

---

### 📋 API Discovery

Get a complete JSON list of all available endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/list/` | GET | Returns complete API documentation in JSON format |

**Example Response:**
```json
{
  "name": "Moroccan Time API",
  "version": "1.0.0",
  "description": "API for converting dates...",
  "endpoints": {
    "base": {
      "/api/": {"method": "GET", "description": "HTML documentation"},
      "/api/list/": {"method": "GET", "description": "JSON API list"},
      "/api/time/": {"method": "GET", "description": "Current Morocco time"}
    },
    "currentDate": {
      "/api/date/": {"method": "GET", "description": "All three calendars today"},
      "/api/amazigh/": {"method": "GET", "description": "Today's Amazigh date"},
      "/api/gregorian/": {"method": "GET", "description": "Today's Gregorian date"},
      "/api/islamic/": {"method": "GET", "description": "Today's Islamic date"}
    },
    "dateConversion": {
      "/api/amazigh/{year}/{month}/{day}/": {...},
      "/api/gregorian/{year}/{month}/{day}/": {...},
      "/api/islamic/{year}/{month}/{day}/": {...}
    },
    "monthNames": {
      "/api/amazighMonths/": {...},
      "/api/gregorianMonths/": {...},
      "/api/islamicMonths/": {...}
    }
  }
}
```

---

### 📅 All Calendars Combined

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/date/` | GET | Returns all three calendar dates for today |

**Example Response:**
```json
{
  "amazigh": {
    "year": 2976,
    "month": {
      "order": 1,
      "latin": "Yennayer",
      "tifinagh": "ⵢⵏⵏⴰⵢⵔ",
      "arabic": "يناير"
    },
    "day": 25
  },
  "gregorian": {
    "year": 2026,
    "month": {
      "order": 2,
      "latin": "February",
      "tifinagh": "ⴼⴰⴱⵔⵓⴰⵔⵉ",
      "arabic": "فبراير"
    },
    "day": 7
  },
  "islamic": {
    "year": 1447,
    "month": {
      "order": 8,
      "latin": "Shaʿban",
      "tifinagh": "ⵛⵄⴱⴰⵏ",
      "arabic": "شعبان"
    },
    "day": 19
  }
}
```

---

### 🌍 Current Date Endpoints

Get today's date in each calendar system:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/amazigh/` | GET | Returns today's date in Amazigh calendar |
| `/api/gregorian/` | GET | Returns today's date in Gregorian calendar |
| `/api/islamic/` | GET | Returns today's date in Islamic/Hijri calendar |
| `/api/time/` | GET | Returns current time in Morocco (YYYY-MM-DD_HH:MM format) |

**Example Responses:**

```
GET /api/amazigh/
→ {"year":2976,"month":{"order":1,"latin":"Yennayer","tifinagh":"ⵢⵏⵏⴰⵢⵔ","arabic":"يناير"},"day":25}

GET /api/gregorian/
→ {"year":2026,"month":{"order":2,"latin":"February","tifinagh":"ⴼⴰⴱⵔⵓⴰⵔⵉ","arabic":"فبراير"},"day":7}

GET /api/islamic/
→ {"year":1447,"month":{"order":8,"latin":"Shaʿban","tifinagh":"ⵛⵄⴱⴰⵏ","arabic":"شعبان"},"day":19}

GET /api/time/
→ "2026-02-07_ 02:43"
```

---

### 🔄 Date Conversion Endpoints

Convert any Gregorian date to Amazigh or Islamic calendar:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/amazigh/{year}/{month}/{day}/` | GET | Convert Gregorian date to Amazigh |
| `/api/gregorian/{year}/{month}/{day}/` | GET | Validate/formatted Gregorian date |
| `/api/islamic/{year}/{month}/{day}/` | GET | Convert Gregorian date to Islamic |

**URL Parameters:**
- `{year}` - 4-digit year (e.g., 2024)
- `{month}` - Month number 1-12 (e.g., 1 for January)
- `{day}` - Day of month 1-31 (e.g., 15)

**Examples:**

```
GET /api/amazigh/2024/1/15/
→ {"year":2974,"month":{"order":1,"latin":"Yennayer","tifinagh":"ⵢⵏⵏⴰⵢⵔ","arabic":"يناير"},"day":2}

GET /api/gregorian/2024/6/1/
→ {"year":2024,"month":{"order":6,"latin":"June","tifinagh":"ⵊⵓⵏ","arabic":"يونيو"},"day":1}

GET /api/islamic/2024/1/15/
→ {"year":1445,"month":{"order":7,"latin":"Rajab","tifinagh":"ⵔⴰⵊⴱ","arabic":"رجب"},"day":3}
```

---

### 📚 Month Names Reference

Get the list of month names for each calendar:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/amazighMonths/` | GET | List all Amazigh months with Tifinagh script |
| `/api/gregorianMonths/` | GET | List all Gregorian months with Tifinagh script |
| `/api/islamicMonths/` | GET | List all Islamic months with Tifinagh script |

**Example Response:**
```json
[
  {
    "order": 1,
    "latin": "Yennayer",
    "tifinagh": "ⵢⵏⵏⴰⵢⵔ",
    "arabic": "يناير"
  },
  {
    "order": 2,
    "latin": "Furar",
    "tifinagh": "ⴼⵓⵔⴰⵔ",
    "arabic": "فورار"
  }
  // ... more months
]
```

---

## 🗓️ Calendar Information

### 📅 Gregorian Calendar
The standard civil calendar used worldwide.

### 🕌 Islamic (Hijri) Calendar
Lunar calendar used in Islamic cultures. Dates are fetched from the [Aladhan API](https://aladhan.com/).

### ⵣ Amazigh (Berber) Calendar
The traditional Berber calendar, derived from the Julian calendar:
- **Year Offset**: Amazigh year = Julian year + 950 CE
- **New Year**: Yennayer 1 = January 14 Gregorian
- **13-day drift**: Due to the difference between Julian and Gregorian calendars
- **12 Months**: Same structure as Julian calendar with Berber names

---

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Node.js](https://nodejs.org/) (optional, for some tools)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/moroccan-time-api.git
cd moroccan-time-api

# Install dependencies
bun install
```

### Development

```bash
# Run development server with hot reload
bun run dev
```

The server will start at `http://localhost:3000`

### Building

```bash
# Build for production
bun run build
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anomalyco/moroccan-time-api)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vc deploy
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| 🟦 **TypeScript** | Type-safe JavaScript |
| ⚡ **Hono** | Lightweight web framework |
| 🟣 **Bun** | Fast JavaScript runtime |
| 🌐 **Vercel** | Edge deployment platform |
| 🕌 **Aladhan API** | Islamic date calculations |

---

## 📂 Project Structure

```
moroccan-time-api/
├── src/
│   ├── index.ts              # Main API routes
│   ├── amazighDate.ts        # Amazigh calendar conversion
│   ├── amazighCalendar.ts    # Amazigh month names
│   ├── gregorianDate.ts      # Gregorian date utilities
│   ├── gregorianCalendar.ts  # Gregorian month names
│   ├── islamicDate.ts        # Islamic date API integration
│   └── islamicCalendar.ts    # Islamic month names
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Environment Variables

No environment variables required! The API works out of the box.

For production deployment, you may want to set:
- `TZ` = `Africa/Casablanca` (for consistent timezone handling)

---

## 📝 API Response Format

All date endpoints return JSON in this format:

```typescript
interface DateResponse {
  year: number;
  month: {
    order: number;
    latin: string;
    tifinagh: string;
    arabic: string;
  };
  day: number;
}
```

---

## 🌐 Browser Usage

You can use the API directly in your browser or any HTTP client:

```javascript
// Fetch all calendars
const response = await fetch('https://your-api.com/api/date/');
const data = await response.json();
console.log(data);

// Fetch specific date conversion
const response = await fetch('https://your-api.com/api/amazigh/2024/1/15/');
const amazighDate = await response.json();
console.log(amazighDate);
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 📿 [Aladhan API](https://aladhan.com/) for accurate Islamic date calculations
- ⵣ Amazigh calendar month names from traditional Berber calendar
- ⚡ Built with Hono and Bun for blazing fast performance

---

<div align="center">

**Made with ❤️ in Morocco 🇲🇦**

**ⵉⵙⵍⴰ ⵢⴰⵍⵍⴰ ⵏ ⵓⵍⵎⵖⵔⵉⴱ ⵏ ⵓⵎⴰⵣⵉⵖ**

</div>
