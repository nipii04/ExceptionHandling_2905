class SeatNotAvailableError_2905 extends Error {
  constructor(seat) { /* lengkapi + simpan seat */
    super(seat);
    this.name = "SeatNotAvailableError_2905";
    this.seat = seat;
  }
}

class PaymentFailedError_2905 extends Error {
  constructor(reason) { /* lengkapi */
    super(reason);
    this.name = "PaymentFailedError_2905";
  }
}

class BookingService_2905 {
  static validateAge_2905(age, movieRating) { /* throw SeatNotAvailableError jika umur tidak cukup */
    if (movieRating === "R" && age < 17) {
      throw new SeatNotAvailableError_2905(
        `Umur ${age} tahun tidak boleh nonton film R`
      );
    }
    return true;
  }

  static async checkSeatAvailability_2905(seatNumber) {
    // Simulasi: kursi A1–A5 sudah terbooking
    // Reject dengan SeatNotAvailableError jika sudah dibooking
    const booked = new Set(["A1", "A2", "A3", "A4", "A5"]);
    if (booked.has(seatNumber)) {
      throw new SeatNotAvailableError_2905(seatNumber);
    }
    return true;
  }

  static async processPayment_2905(amount) {
    // Simulasi payment gateway
    // Reject PaymentFailedError jika amount < 50000
    if (amount < 50000) {
      throw new PaymentFailedError_2905(
        "Pembayaran gagal: Saldo tidak mencukupi (min. Rp50.000)"
      );
    }
    return true;
  }

  static async bookTicket_2905(name, age, seat, movieRating, amount = 60000) {
    try {
      // 1. Validasi umur
      this.validateAge_2905(age, movieRating);
      // 2. Cek kursi
      await this.checkSeatAvailability_2905(seat);
      // 3. Proses pembayaran
      await this.processPayment_2905(amount);
      // 4. finally -> "Cleanup booking session"
      // Return objek tiket jika sukses
      return { name, seat, movieRating, status: "Tiket berhasil dipesan" };
    } catch (error) {
      // re-throw asli
      throw error;
    } finally {
      // cleanup
      console.log("Cleanup booking session");
    }
  }
}

// TESTING (JANGAN DIUBAH) – akan dites 4 kasus
async function testBooking_2905() {
  const tests = [
    { name: "Budi", age: 15, seat: "A3", rating: "R" },
    { name: "Andi", age: 20, seat: "A1", rating: "SU" },
    { name: "Sari", age: 25, seat: "B7", rating: "SU", amount: 30000 },
    { name: "Dedi", age: 22, seat: "C5", rating: "SU", amount: 75000 },
  ];

  // lengkapi loop + handling instanceof
  for (const t of tests) {
    try {
      const res = await BookingService_2905.bookTicket_2905(
        t.name, t.age, t.seat, t.rating, t.amount ?? 60000
      );
      console.error("Berhasil:", res);
    } catch (err) {
      if (err instanceof SeatNotAvailableError_2905) {
        console.error("Kursi/Umur tidak tersedia:", err.message);
      } else if (err instanceof PaymentFailedError_2905) {
        console.error("Pembayaran gagal:", err.message);
      } else {
        console.error("Error:", err.message);
      }
    }
  }
}
testBooking_2905();
