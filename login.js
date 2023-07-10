const logind = async () => {
    const brugernavn = document.getElementById("brugernavn").value;
    const password = document.getElementById("password").value;
    const data = {
        "brugernavn": brugernavn,
        "password": password
    }
    const url = "https://www.itsmurf-servers.dk/vff/login";

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
    console.log(responseData)
}

class bruger {
    constructor(navn, adresse, token, email, brugernavn, mobil, postnr) {
        this.navn = navn;
        this.adresse = adresse;
        this.token = token;
        this.email = email;
        this.brugernavn = brugernavn;
        this.mobil = mobil;
        this.postnr = postnr;
    }

}