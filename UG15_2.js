class InvalidSeatFormatError_2905 extends Error {
  constructor(seat) { 
    super(seat);
    this.name = "InvalidSeatFormatError_2905";
    this.seat = seat;
  }
}

class RowNotExistError_2905 extends Error {
  constructor(row) {
    super(row);
    this.name = "RowNotExistError_2905";
    this.row = row;
  }
}

class SeatManager_2905 {
  static parseSeat_2905(seat) {
    const ok = /^[A-J][0-9]+$/.test(seat);
    if (!ok) {
      throw new InvalidSeatFormatError_2905(seat);
    }
    const row = seat[0];
    const num = Number(seat.slice(1));
    return { row, num };
  }

  static async loadLayout_2905() {
    return true;
  }

  static async reserveSeat_2905(seat) {
    try {
      const { row } = this.parseSeat_2905(seat);
      await this.loadLayout_2905();
      console.error(`Kursi ${seat} berhasil di-reserve`);
    } catch (error) {
      if (error instanceof InvalidSeatFormatError_2905) {
        console.error(
          `Gagal reserve: Format kursi ${seat} tidak valid. Gunakan huruf+nomer (contoh: A12)`
        );
      } else if (error instanceof RowNotExistError_2905) {
        console.error(`Gagal reserve: Baris ${error.row} tidak ada`);
      } else {
        console.error(`Gagal reserve: ${error.message}`);
      }
      throw error;
    } finally {
      console.log("Release seat lock");
    }
  }
}

(async function test() {
  const seats = ["A12", "K5", "Z99", "B10", "A1"];
  for (const s of seats) {
    try {
      await SeatManager_2905.reserveSeat_2905(s);
    } catch (e) {
      if (e instanceof InvalidSeatFormatError_2905) {
        console.log(`Format salah: ${s}`);
      } else if (e instanceof RowNotExistError_2905) {
        console.log(`Baris tidak ada: ${e.row}`);
      } else {
        console.log(`Error: ${e.message}`);
      }
    }
  }
})();
