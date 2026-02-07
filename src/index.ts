import { Hono } from "hono";
// Import data from TS files
import { amazighCalendar } from "./amazighCalendar";
import { gregorianCalendar } from "./gregorianCalendar";
import { islamicCalendar } from "./islamicCalendar";
import getAmazighDate from "./amazighDate";
import getIslamicDate from "./islamicDate";
import getGregorianDate from "./gregorianDate";

const app = new Hono();

const welcomeStrings = [
  `Moroccan Time API`,
  `Made by Omniversify with Hono & Bun ${process.versions.bun}!`,
];

const date = new Date();
const moroccoDateTime = new Date()
  .toLocaleString("en-CA", {
    timeZone: "Africa/Casablanca",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  .replace(",", "_");

app.get("/", (c) => {
  return c.text(welcomeStrings.join("\n\n"));
});
app.get("/api", (c) => {
  return c.redirect("/api/");
});
app.get("/api/", (c) => {
  return c.html(
    `<h1>Moroccan Time API</h1><p>Current Time: ${moroccoDateTime}</p><h1>API Endpoints</h1><ul><li>/api/date/</li><li>/api/amazigh/</li><li>/api/gregorian/</li><li>/api/islamic/</li><li>/api/amazigh/:year/:month/:day/</li><li>/api/gregorian/:year/:month/:day/</li><li>/api/islamic/:year/:month/:day/</li></ul>`,
  );
});
app.get("/api/date/", (c) => {
  return c.redirect("/api/date");
});

function getCurrentMoroccoDate() {
  const now = new Date();
  const moroccoStr = now.toLocaleString("en-CA", { timeZone: "Africa/Casablanca" });
  const match = moroccoStr.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return {
      year: parseInt(match[1], 10),
      month: parseInt(match[2], 10),
      day: parseInt(match[3], 10)
    };
  }
  return {
    year: now.getUTCFullYear(),
    month: now.getUTCMonth() + 1,
    day: now.getUTCDate()
  };
}

app.get("/api/date", async (c) => {
  try {
    const { year, month, day } = getCurrentMoroccoDate();
    const [amazigh, gregorian, islamic] = await Promise.all([
      Promise.resolve(getAmazighDate(year, month, day)),
      Promise.resolve(getGregorianDate(year, month, day)),
      getIslamicDate(year, month, day)
    ]);
    return c.json({ amazigh, gregorian, islamic });
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});
app.get("/api/amazigh/", async (c) => {
  try {
    const { year, month, day } = getCurrentMoroccoDate();
    const result = getAmazighDate(year, month, day);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});
app.get("/api/amazigh", (c) => {
  return c.redirect("/api/amazigh/");
});
app.get("/api/gregorian/", (c) => {
  try {
    const { year, month, day } = getCurrentMoroccoDate();
    const result = getGregorianDate(year, month, day);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});
app.get("/api/gregorian", (c) => {
  return c.redirect("/api/gregorian/");
});
app.get("/api/islamic/", async (c) => {
  try {
    const { year, month, day } = getCurrentMoroccoDate();
    const result = await getIslamicDate(year, month, day);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});
app.get("/api/islamic", (c) => {
  return c.redirect("/api/islamic/");
});
app.get("/api/amazighMonths/", (c) => {
  return c.json(amazighCalendar);
});
app.get("/api/gregorianMonths/", (c) => {
  return c.json(gregorianCalendar);
});
app.get("/api/islamicMonths/", (c) => {
  return c.json(islamicCalendar);
});
app.get("/api/amazigh/:year/:month/:day/", (c) => {
  const year = Number(c.req.param("year"));
  const month = Number(c.req.param("month"));
  const day = Number(c.req.param("day"));

  try {
    const result = getAmazighDate(year, month, day);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});
app.get("/api/islamic/:year/:month/:day/", async (c) => {
  const year = Number(c.req.param("year"));
  const month = Number(c.req.param("month"));
  const day = Number(c.req.param("day"));

  try {
    const result = await getIslamicDate(year, month, day);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});
app.get("/api/gregorian/:year/:month/:day/", (c) => {
  const year = Number(c.req.param("year"));
  const month = Number(c.req.param("month"));
  const day = Number(c.req.param("day"));

  try {
    const result = getGregorianDate(year, month, day);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});



export default app;
