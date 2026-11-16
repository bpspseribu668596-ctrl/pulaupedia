// ── Load .env manual (tanpa package tambahan) ──────────────────────────────
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  }
  console.log("> .env loaded from", envPath);
} else {
  console.log("> WARNING: .env file not found at", envPath);
}

// ── Parse DATABASE_URL manual (handle @ di password) ───────────────────────
// Format: postgresql://user:password@host:port/database
// Password bisa mengandung @ jadi gunakan regex greedy
function parseDbUrl(url) {
  const m = url.match(/^postgresql:\/\/([^:]+):(.+)@([^:@]+):(\d+)\/(.+)$/);
  if (!m) return null;
  return { user: m[1], password: m[2], host: m[3], port: parseInt(m[4]), database: m[5] };
}

// ── Next.js server ──────────────────────────────────────────────────────────
const { createServer } = require("http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {

    // ── Debug: cek env vars ────────────────────────────────────────────────
    if (req.url === "/__envcheck") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        env_file_exists: fs.existsSync(envPath),
        DATABASE_URL: process.env.DATABASE_URL ? "set" : "NOT SET",
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? "set" : "NOT SET",
        NODE_ENV: process.env.NODE_ENV || "not set",
        PORT: process.env.PORT || "3000 (default)",
      }, null, 2));
      return;
    }

    // ── Debug: tes koneksi DB dengan parameter individual ──────────────────
    if (req.url === "/__dbcheck") {
      const { Pool } = require("pg");
      const parsed = parseDbUrl(process.env.DATABASE_URL);

      if (!parsed) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ db_connected: false, error: "Cannot parse DATABASE_URL" }, null, 2));
        return;
      }

      const pool = new Pool({
        user: parsed.user,
        password: parsed.password,
        host: parsed.host,
        port: parsed.port,
        database: parsed.database,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 10000,
      });

      pool.query("SELECT 1 as test")
        .then((result) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            db_connected: true,
            result: result.rows,
            parsed_host: parsed.host,
            parsed_port: parsed.port,
            parsed_user: parsed.user,
            parsed_database: parsed.database,
          }, null, 2));
        })
        .catch((err) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            db_connected: false,
            error: err.message,
            code: err.code,
            parsed_host: parsed.host,
            parsed_port: parsed.port,
          }, null, 2));
        })
        .finally(() => pool.end());
      return;
    }

    // ── Debug: tes network ke host DB ──────────────────────────────────────
    if (req.url === "/__netcheck") {
      const net = require("net");
      const dns = require("dns");

      // Test multiple hosts and ports
      const targets = [
        { host: "aws-0-ap-northeast-2.pooler.supabase.com", port: 6543 },
        { host: "aws-0-ap-northeast-2.pooler.supabase.com", port: 5432 },
        { host: "supabase.com", port: 443 },
      ];

      const results = [];
      let remaining = targets.length;

      targets.forEach((target) => {
        dns.lookup(target.host, (dnsErr, address) => {
          if (dnsErr) {
            results.push({ host: target.host, port: target.port, dns: false, tcp: false, error: dnsErr.message });
            remaining--;
            if (remaining === 0) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(results, null, 2));
            }
            return;
          }

          const socket = new net.Socket();
          socket.setTimeout(6000);
          let done = false;

          const finish = (data) => {
            if (done) return;
            done = true;
            socket.destroy();
            results.push({ host: target.host, port: target.port, dns: true, ip: address, ...data });
            remaining--;
            if (remaining === 0) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(results, null, 2));
            }
          };

          socket.on("connect", () => finish({ tcp: true, message: "OPEN" }));
          socket.on("timeout", () => finish({ tcp: false, message: "TIMEOUT (blocked?)" }));
          socket.on("error", (err) => finish({ tcp: false, error: err.message, code: err.code }));

          socket.connect(target.port, target.host);
        });
      });
      return;
    }

    // ── Semua route lain → Next.js ─────────────────────────────────────────
    handle(req, res);
  }).listen(process.env.PORT || 3000, () => {
    console.log("> Ready on port", process.env.PORT || 3000);
  });
});
