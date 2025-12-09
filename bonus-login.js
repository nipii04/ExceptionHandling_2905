// bonus-login.js
// NPM: 2905

// =========================
// 1) HIRARKI CUSTOM ERROR
// =========================
class LoginError_2905 extends Error {
  constructor(message, opts = {}) {
    super(message);
    this.name = "LoginError_2905";
    if (opts.cause) this.cause = opts.cause; // simpan error asli jika ada
  }
}

class ValidationError_2905 extends LoginError_2905 {
  constructor(message) {
    super(message);
    this.name = "ValidationError_2905";
  }
}





class AuthError_2905 extends LoginError_2905 {
  constructor(message) {
    super(message);
    this.name = "AuthError_2905";
  }
}

class SystemError_2905 extends LoginError_2905 {
  constructor(message, opts = {}) {
    super(message, opts);
    this.name = "SystemError_2905";
  }
}

// =========================
// 2) “DATABASE” SEDERHANA
// =========================
const USERS_2905 = Object.freeze({
  // username: password
  dwiki: "pbo123456",
  budi: "rahasia123",
  sari: "kodeku123",
});

// ==================================
// 3) DEFENSIVE PROGRAMMING & VALIDASI
// ==================================
function validateInput_2905(username, password) {
  // Bukan string
  if (typeof username !== "string" || typeof password !== "string") {
    throw new ValidationError_2905("Input harus berupa string.");
  }

  const u = username.trim();
  const p = password.trim();

  // Kosong
  if (!u || !p) {
    throw new ValidationError_2905("Username/password tidak boleh kosong.");
  }

  // Terlalu pendek
  if (u.length < 4) {
    throw new ValidationError_2905("Username terlalu pendek (min. 4 karakter).");
  }
  if (p.length < 6) {
    throw new ValidationError_2905("Password terlalu pendek (min. 6 karakter).");
  }

  return { username: u, password: p };
}

// ===================
// 4) AUTENTIKASI
// ===================
function authenticate_2905(username, password) {
  if (!Object.prototype.hasOwnProperty.call(USERS_2905, username)) {
    throw new AuthError_2905("Username tidak terdaftar.");
  }
  const ok = USERS_2905[username] === password;
  if (!ok) {
    // Pesan WAJIB persis “Password salah”
    throw new AuthError_2905("Password salah");
  }
  return { username };
}

// =====================================================
// 5) SATU SIKLUS LOGIN (try–catch–finally + rethrow tepat)
// =====================================================
async function loginOnce_2905(promptFn) {
  try {
    const username = await promptFn("Username: ");
    const password = await promptFn("Password: ");

    const { username: u, password: p } = validateInput_2905(username, password);
    const { username: authU } = authenticate_2905(u, p);

    console.log(`Login berhasil → selamat datang, ${authU}!`);
    return true;
  } catch (err) {
    // Specific catch dengan instanceof
    if (err instanceof ValidationError_2905) {
      console.log(err.message);              // input kosong/salah → pesan spesifik
      return false;
    } else if (err instanceof AuthError_2905) {
      console.log(err.message);              // termasuk “Password salah”
      return false;
    } else if (err instanceof LoginError_2905) {
      // Error turunan lain dari LoginError_2905
      console.log(err.message);
      return false;
    } else {
      // RETHROW HANYA error yang relevan sebagai SystemError_2905
      throw new SystemError_2905("Terjadi kesalahan sistem yang tidak terduga.", { cause: err });
    }
  } finally {
    // finally SELALU jalan
    console.log("Sesi login ditutup (finally).");
  }
}

// ===================
// 6) LOOP RETRY
// ===================
async function main_2905() {
  const readline = require("readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const promptFn = (q) => new Promise((res) => rl.question(q, (ans) => res(ans)));

  try {
    // Ulangi login jika gagal
    while (true) {
      try {
        const ok = await loginOnce_2905(promptFn);
        if (ok) break; // selesai bila berhasil
      } catch (e) {
        if (e instanceof SystemError_2905) {
          // Laporkan sistem error & hentikan
          console.log(`${e.name}: ${e.message}`);
          if (e.cause) console.log("Detail:", e.cause?.message ?? e.cause);
          break;
        } else {
          // Jika non-SystemError_2905 lolos ke sini, berhenti agar aman
          console.log("Error tak terduga. Mengakhiri program.");
          break;
        }
      }

      // Tanyakan apakah ingin ulang
      const again = (await promptFn("Coba lagi? (y/n): ")).trim().toLowerCase();
      if (again !== "y") break;
    }
  } finally {
    rl.close();
  }
}

// Jalankan jika file dieksekusi langsung
if (require.main === module) {
  main_2905();
}
