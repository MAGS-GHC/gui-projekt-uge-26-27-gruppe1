// Klassen af sæder 
let stadion;
class Seat {
  constructor(id, price, saedestatus) {
    this.id = id;
    this.price = price;
    this.booked = false;
    this.element = this.createSeatElement();
    this.element.addEventListener("click", () => this.toggleBooking());
  }

  createSeatElement() {
    const seatElement = document.createElement("div");
    seatElement.className = "seat";
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
      const { id, price, saedestatus } = seatData;
      const seat = new Seat(id, price, saedestatus);
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

  checkSeatAvailability() {
    const seat = this.seats.map((seat) => {
      if (seat.saedestatus === 'optaget') {
        return this.element.classList.add("booked");
      }
    });
    return seat;
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

let Objekt = []
let seatsData = []
//let stadion;
//henter sæder
async function HentSaeder() {
  const url = "https://www.itsmurf-servers.dk/vff/hentsaeder";
  var req = new Request(url);
  const response = await fetch(req);
  Objekt = await response.json();
  seatsData = Objekt.saeder
  //console.log(seatsData);
  stadion = new Stadion("seats-container", seatsData);
  stadion.createSeatElement
  return seatsData
}

HentSaeder()

async function Opdatersaeder(saedeid, saedestatus, ordreid) {
  const url = "https://www.itsmurf-servers.dk/vff/opdatersaeder" + saedeid;

  const data = {
    "saedestatus": saedestatus,
    "ordreid": ordreid
  }

  var req = new Request(url);
  const response = await fetch(req, {
    Method: 'PUT',
    Headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
    Body: data
  });
  const responseData = await response.json();
}

async function Bestilsaeder(saedeid, beloeb, antal, saedestatus, ordrestatus, navn, email) {
  const url = "https://www.itsmurf-servers.dk/vff/nyordre";

  const data = {
    "navn": navn,
    "ordrestatus": ordrestatus,
    "beloeb": beloeb,
    "antal": antal,
    "email": email
  }

  var req = new Request(url);
  const response = await fetch(req, {
    Method: 'POST',
    Headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
    Body: data
  });
  const responseData = await response.json();

  Opdatersaeder(saedeid, saedestatus, responseData)
  //stadion.createSeats()
}

// Laver en instans af stadion klassen


// Gør funktionen "buySelectedSeats" offentlig
window.buySelectedSeats = () => stadion.buySelectedSeats();
