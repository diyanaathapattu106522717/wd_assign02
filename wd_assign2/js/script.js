/* recommend page js */
const restaurants = [           /* creates variable named restaurants - stores array containing 6 objects */
        {
            name: "Dragon Wok",
            diet: "none",
            budget: "low",
            purpose: "family"
        },
        {
            name: "Golden Saffron House",
            diet: "halal",
            budget: "medium",
            purpose: "family"
        },
        {
            name: "Marinara & Co.",
            diet: "none",
            budget: "high",
            purpose: "date"
        },
        {
            name: "K-Grill",
            diet: "none",
            budget: "medium",
            purpose: "business"
        },
        {
            name: "Luna Lucha Cantina",
            diet: "none",
            budget: "low",
            purpose: "date"
        },
        {
            name: "Nile & Stone",
            diet: "halal",
            budget: "medium",
            purpose: "business"
        }
    ];

    document.getElementById("recommendBtn").addEventListener("click", function () {       /* elementbyid - finds the button with id. eventlistener - waits for user to click 'recommend' button*/
        const diet = document.getElementById("diet").value;           /* const- creates variable named 'diet.' */  /*.value - gets selected dropdown value */
        const budget = document.getElementById("budget").value;       /* the values are used to find a matchmaking restaurant */
        const purpose = document.getElementById("purpose").value;

        const match = restaurants.find(r =>        /* searches array, returns first match */   /* r => — for each restaurant r, check for specified condition */
            (r.diet === diet || diet === "none") &&
            r.budget === budget &&
            r.purpose === purpose
        );

        const results = document.getElementById("results");         /* finds id 'results' from html */

        if (match) {   /* ` (backtick) - creates a template literal --> allows multi‑line strings, inserting variables with ${ }, mixing HTML + JS cleanly */  /* ${match.name} — Inserts the restaurant name into the HTML */
            results.innerHTML = `              
                <div class="recommend-card">  
                    <h2>${match.name}</h2>     
                    <p>This restaurant matches your preferences.</p>
                    <a href="reservation.html?restaurant=${encodeURIComponent(match.name)}" class="reserve-btn">Reserve Now</a>
                </div>
            `;
        } else {      
            results.innerHTML = `<p>No exact match found. Try adjusting your filters.</p>`;
        }
    });



