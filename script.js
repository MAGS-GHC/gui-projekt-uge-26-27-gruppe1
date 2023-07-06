// Klassen af sæder 
let stadion;
class Seat {
  constructor(id, price, saedestatus,raekkeid) {
    this.id = id;
    this.price = price;
    this.saedestatus = saedestatus;
    this.raekkeid = raekkeid;
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
    if (this.booked, this.saedestatus === "optaget") {
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
      console.log(`Seat: ${this.id} Row:${this.raekkeid} is selected. Price: ${this.price}. Availabilty: ${this.saedestatus}`);
    }
  }

  bookSeat() {
    if (this.booked, this.saedestatus === "optaget") {
      console.log(`Seat ${this.id} is already booked.`);
      return;
    }

    if (this.selected) {
      this.booked = true;
      this.selected = false;
      this.element.classList.remove("selected");
      this.element.classList.add("booked");
      updateSeatStatus(this.id, 'optaget', this.raekkeid)
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
      const { id, price, saedestatus, raekkeid } = seatData;
      const seat = new Seat(id, price, saedestatus, raekkeid);
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

async function updateSeatStatus(seatId, newStatus, raekkeid) {
  const url = `https://www.itsmurf-servers.dk/vff/opdatersaeder/${seatId}`;
  const requestData = {
    raekkeid: raekkeid,
    saedestatus: newStatus
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });

  if (response.ok) {
    console.log(`Seat ${seatId} status updated successfully.`);
  } else {
    console.log(`Failed to update seat ${seatId} status.`);
  }
}

/*/ async function Bestilsaeder(saedeid, beloeb, antal, saedestatus, ordrestatus, navn, email) {
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
*/
// Laver en instans af stadion klassen


// Gør funktionen "buySelectedSeats" offentlig
window.buySelectedSeats = () => stadion.buySelectedSeats();
