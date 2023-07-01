// Klassen af sæder 

class Seat {
  constructor(id, price) {
    this.id = id;
    this.price = price;
    this.booked = false;
    this.element = this.createSeatElement();
    this.element.addEventListener("click", () => this.toggleBooking());
  }

  createSeatElement() {
    const seatElement = document.createElement("div");
    seatElement.className = "seat";
    APIKald();
    return seatElement;
  }

  toggleBooking() {
    if (this.booked) {
      console.log(`Seat ${this.id} is already booked.`);
      return;
    }

    if (this.selected) {
      this.selected = false;
      this.element.classList.remove("selected");
      console.log(`Seat ${this.id} is deselected.`);
    } else {
      this.selected = true;
      this.element.classList.add("selected");
      console.log(`Seat ${this.id} is selected. Price: ${this.price}.`);
    }
  }

  bookSeat() {
    if (this.booked) {
      console.log(`Seat ${this.id} is already booked.`);
      return;
    }

    if (this.selected) {
      this.booked = true;
      this.selected = false;
      this.element.classList.remove("selected");
      this.element.classList.add("booked");
      console.log(`Seat ${this.id} is booked.`);
    } else {
      console.log(`Seat ${this.id} is not selected.`);
    }
  }

  appendTo(parentElement) {
    parentElement.appendChild(this.element);
  }
}

// Stadion klassen
class Stadion {
  constructor(containerId, seatsData) {
    this.container = document.getElementById(containerId);
    this.seats = [];
    this.createSeats(seatsData);
    this.render();
  }

  createSeats(seatsData) {
    for (const seatData of seatsData) {
      const { id, price } = seatData;
      const seat = new Seat(id, price);
      this.seats.push(seat);
    }
  }

  render() {
    for (const seat of this.seats) {
      seat.appendTo(this.container);
    }
  }

  getSelectedSeats() {
    return this.seats.filter((seat) => seat.selected);
  }

  checkSeatAvailability(seatId) {
    const seat = this.seats.find((seat) => seat.id === seatId);
    if (seat) {
      return !seat.booked;
    }
    return false;
  }

  getSeatPrice(seatId) {
    const seat = this.seats.find((seat) => seat.id === seatId);
    if (seat) {
      return seat.price;
    }
    return null;
  }

  buySelectedSeats() {
    const selectedSeats = this.getSelectedSeats();
    for (const seat of selectedSeats) {
      seat.bookSeat();
    }
  }
}
  /*[
  { id: 1, price: 10 },
  { id: 2, price: 12 },
  { id: 3, price: 8 },
  { id: 4, price: 15 },
  { id: 5, price: 10 },
  { id: 6, price: 12 },
  { id: 7, price: 8 },
  { id: 8, price: 15 },
  { id: 9, price: 10 },
  { id: 10, price: 12 },
  { id: 11, price: 8 },
  { id: 12, price: 15 },
  { id: 13, price: 10 },
  { id: 14, price: 12 },
  { id: 15, price: 8 },
  { id: 16, price: 15 },
  { id: 17, price: 10 },
  { id: 18, price: 12 },
  { id: 19, price: 8 },
  { id: 20, price: 15 },
  { id: 21, price: 10 },
  { id: 22, price: 12 },
  { id: 23, price: 8 },
  { id: 24, price: 15 },
  { id: 25, price: 10 },
  { id: 26, price: 12 },
  { id: 27, price: 8 },
  { id: 28, price: 15 },
  { id: 29, price: 10 },
  { id: 30, price: 12 },
  { id: 31, price: 8 },
  { id: 32, price: 15 },
  { id: 33, price: 10 },
  { id: 34, price: 12 },
  { id: 35, price: 8 },
  { id: 36, price: 15 },
  { id: 37, price: 10 },
  { id: 38, price: 12 },
  { id: 39, price: 8 },
  { id: 40, price: 15 },
  { id: 41, price: 10 },
  { id: 42, price: 12 },
  { id: 43, price: 8 },
  { id: 44, price: 15 },
  { id: 45, price: 10 },
  { id: 46, price: 12 },
  { id: 47, price: 8 },
  { id: 48, price: 15 },
  { id: 49, price: 10 },
  { id: 50, price: 12 },
  { id: 51, price: 8 },
  { id: 52, price: 15 },
  { id: 53, price: 10 },
  { id: 54, price: 12 },
  { id: 55, price: 8 },
  { id: 56, price: 15 },
  { id: 57, price: 10 },
  { id: 58, price: 12 },
  { id: 59, price: 8 },
  { id: 60, price: 15 },
  { id: 61, price: 10 },
  { id: 62, price: 12 },
  { id: 63, price: 8 },
  { id: 64, price: 15 },
  { id: 65, price: 10 },
  { id: 66, price: 12 },
  { id: 67, price: 8 },
  { id: 68, price: 15 },
  { id: 69, price: 10 },
  { id: 70, price: 12 },
  { id: 71, price: 8 },
  { id: 72, price: 15 },
  { id: 73, price: 10 },
  { id: 74, price: 12 },
  { id: 75, price: 8 },
  { id: 76, price: 15 },
  { id: 77, price: 10 },
  { id: 78, price: 12 },
  { id: 79, price: 8 },
  { id: 80, price: 15 },
]*/;
let Objekt = []
let seatsData = []
//let stadion;
//henter sæder
async function APIKald() {
  const url = "https://www.itsmurf-servers.dk/vff/hentsaeder";
  var req = new Request(url);
  const response = await fetch(req);
  Objekt = await response.json();
  seatsData = Objekt.saeder?.map((saeder) => {
    return { id: saeder.id, price: saeder.pris }
  })
  console.log(seatsData);
  //stadion.createSeats()
}



// Laver en instans af stadion klassen
const stadion = new Stadion("seats-container", seatsData);

// Gør funktionen "buySelectedSeats" offentlig
window.buySelectedSeats = () => stadion.buySelectedSeats();
