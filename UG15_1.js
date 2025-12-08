class SeatNotAvailableError_2905 extends Error {
  constructor(seat) { 
    super(seat);
    this.name = "SeatNotAvailableError_2905";
    this.seat = seat;
  }
}

class PaymentFailedError_2905 extends Error {
  constructor(reason) { 
    super(reason);
    this.name = "PaymentFailedError_2905";
  }
}

class BookingService_2905 {
  static validateAge_2905(age, movieRating) { 
    if (movieRating === "R" && age < 17) {
      throw new SeatNotAvailableError_2905(
        `Umur ${age} tahun tidak boleh nonton film R`
      );
    }
    return true;
  }

  static async checkSeatAvailability_2905(seatNumber) {
    const booked = new Set(["A1", "A2", "A3", "A4", "A5"]);
    if (booked.has(seatNumber)) {
      throw new SeatNotAvailableError_2905(seatNumber);
    }
    return true;
  }

  static async processPayment_2905(amount) {
    if (amount < 50000) {
      throw new PaymentFailedError_2905(
        "Pembayaran gagal: Saldo tidak mencukupi (min. Rp50.000)"
      );
    }
    return true;
  }

  static async bookTicket_2905(name, age, seat, movieRating, amount = 60000) {
    try {
      
      this.validateAge_2905(age, movieRating);
      
      await this.checkSeatAvailability_2905(seat);
      
      await this.processPayment_2905(amount);

      return { name, seat, movieRating, status: "Tiket berhasil dipesan" };
    } catch (error) {

      throw error;
    } finally {
      console.log("Cleanup booking session");
    }
  }
}

async function testBooking_2905() {
  const tests = [
    { name: "Budi", age: 15, seat: "A3", rating: "R" },
    { name: "Andi", age: 20, seat: "A1", rating: "SU" },
    { name: "Sari", age: 25, seat: "B7", rating: "SU", amount: 30000 },
    { name: "Dedi", age: 22, seat: "C5", rating: "SU", amount: 75000 },
  ];

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
