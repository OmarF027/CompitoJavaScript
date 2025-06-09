document.addEventListener("DOMContentLoaded", function () {
    // Array di prodotti di esempio
    let articoli = [
        {
            nome: "Smartphone Samsung Galaxy S22",
            categoria: "Elettronica",
            fornitore: "Samsung Italia",
            prezzo: 799.99,
            quantita: 4, 
            sogliaMinima: 5,
            dataArrivo: "2025-05-10"
        },
        {
            nome: "Aspirapolvere Dyson V11",
            categoria: "Casa",
            fornitore: "Dyson",
            prezzo: 499.00,
            quantita: 8, 
            sogliaMinima: 2,
            dataArrivo: "2025-04-22"
        },
        {
            nome: "T-shirt Nike Dri-FIT",
            categoria: "Abbigliamento",
            fornitore: "Nike",
            prezzo: 29.99,
            quantita: 30,
            sogliaMinima: 10,
            dataArrivo: "2025-06-01"
        },
        {
            nome: "Pallone da calcio Adidas",
            categoria: "Sport",
            fornitore: "Adidas",
            prezzo: 24.99,
            quantita: 20,
            sogliaMinima: 5,
            dataArrivo: "2025-05-15"
        },
        {
            nome: "Frigorifero LG",
            categoria: "Casa",
            fornitore: "LG",
            prezzo: 899.00,
            quantita: 0, // Prodotto esaurito
            sogliaMinima: 2,
            dataArrivo: "2025-03-30"
        },
        {
            nome: "Notebook HP Pavilion",
            categoria: "Elettronica",
            fornitore: "HP",
            prezzo: 649.99,
            quantita: 10,
            sogliaMinima: 3,
            dataArrivo: "2025-04-18"
        },
        {
            nome: "Scarpe da corsa Asics",
            categoria: "Sport",
            fornitore: "Asics",
            prezzo: 89.90,
            quantita: 12,
            sogliaMinima: 4,
            dataArrivo: "2025-05-05"
        },
        {
            nome: "Giacca Levi's",
            categoria: "Abbigliamento",
            fornitore: "Levi's",
            prezzo: 119.00,
            quantita: 7,
            sogliaMinima: 2,
            dataArrivo: "2025-04-28"
        }
    ];

    // Funzione per aggiornare le statistiche
    function aggiornaStatistiche() {
        document.getElementById("articoliTot").innerText = articoli.length;
        let inUscita = articoli.filter(a => a.quantita <= a.sogliaMinima).length;
        document.getElementById("articoliUscita").innerText = inUscita;
    }

    // Funzione per disegnare la tabella
    function disegnaTabella() {
        let tbody = document.getElementById("listaArticoli");
        tbody.innerHTML = "";

        // Filtri
        let filtroNome = document.getElementById("cercaNome").value.trim().toLowerCase();
        let filtroCategoria = document.getElementById("cercaCategoria").value.trim().toLowerCase();
        let filtroFornitore = document.getElementById("cercaFornitore").value.trim().toLowerCase();
        let filtroScorte = document.getElementById("filtroScorte").value;

        articoli.forEach((articolo, idx) => {
            // Filtraggio
            if (
                (filtroNome === "" || articolo.nome.toLowerCase().includes(filtroNome)) &&
                (filtroCategoria === "" || articolo.categoria.toLowerCase().includes(filtroCategoria)) &&
                (filtroFornitore === "" || articolo.fornitore.toLowerCase().includes(filtroFornitore)) &&
                (
                    filtroScorte === "tutti" ||
                    (filtroScorte === "basse" && articolo.quantita <= articolo.sogliaMinima) ||
                    (filtroScorte === "esauriti" && articolo.quantita === 0)
                )
            ) {
                let tr = document.createElement("tr");

                // Aggiungi classe per evidenziare i prodotti con scorte basse o esauriti
                if (articolo.quantita <= articolo.sogliaMinima && articolo.quantita > 0) {
                    tr.classList.add("evidenziaBasso");
                } else if (articolo.quantita === 0) {
                    tr.classList.add("evidenziaEsaurito");
                }

                ["nome", "categoria", "fornitore", "prezzo", "quantita", "sogliaMinima", "dataArrivo"].forEach(key => {
                    let td = document.createElement("td");
                    if (key === "prezzo") {
                        td.innerText = articolo.prezzo.toFixed(2) + " €";
                    } else if (key === "dataArrivo") {
                        td.innerText = articolo.dataArrivo;
                    } else {
                        td.innerText = articolo[key];
                    }
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            }
        });
    }

    // Gestione inserimento nuovo articolo
    document.getElementById("inserisciArticoloForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let nuovo = {
            nome: document.getElementById("nome").value.trim(),
            categoria: document.getElementById("categoria").value.trim(),
            fornitore: document.getElementById("fornitore").value.trim(),
            prezzo: parseFloat(document.getElementById("prezzo").value),
            quantita: parseInt(document.getElementById("quantita").value),
            sogliaMinima: parseInt(document.getElementById("sogliaMinima").value),
            dataArrivo: document.getElementById("dataArrivo").value
        };
        articoli.push(nuovo);
        aggiornaStatistiche();
        disegnaTabella();
        this.reset();
    });

    // Gestione filtri
    ["cercaNome", "cercaCategoria", "cercaFornitore", "filtroScorte"].forEach(id => {
        document.getElementById(id).addEventListener("input", disegnaTabella);
        document.getElementById(id).addEventListener("change", disegnaTabella);
    });

    // Pulsante reset filtri
    document.getElementById("resettaFiltri").addEventListener("click", function () {
        document.getElementById("cercaNome").value = "";
        document.getElementById("cercaCategoria").value = "";
        document.getElementById("cercaFornitore").value = "";
        document.getElementById("filtroScorte").value = "tutti";
        disegnaTabella();
    });

    // Inizializzazione
    aggiornaStatistiche();
    disegnaTabella();
});
