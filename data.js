// Menu data extracted from the Bacino design handoff.
const MENU_DATA = {
  food: [
    { key: "anti-caldi", label: "Antipasti Caldi", items: [
      { name: "Polpette Sugo", price: "18", desc: "Mixed meatballs in tomato sauce." },
      { name: "Parmigiana Di Melanzane", price: "23", desc: "Sliced eggplant layered with cheese and tomato sauce." },
      { name: "Oliva Ascolana", price: "20", desc: "Deep-fried breaded green olives, stuffed with mixed meat." },
      { name: "Calamari Fritti", price: "20", desc: "Deep-fried breaded squid." },
      { name: "Porchetta", price: "23", desc: "Home-made roasted pork belly." },
      { name: "Fresh Mussels", price: "26", desc: "Cooked with tomato sauce or white wine." },
      { name: "Arancini", price: "20", desc: "Deep-fried breaded rice ball, stuffed with mixed meat and cheese." },
      { name: "Bruschetta", price: "15", desc: "Topping: cherry tomato." },
      { name: "Focaccia", price: "15", desc: "Oven-baked home-made pizza bread." },
      { name: "Garlic Pizza Bread", price: "9", desc: "Oven-baked home-made pizza bread." }
    ]},
    { key: "anti-freddi", label: "Antipasti Freddi", items: [
      { name: "Beef Tartar", price: "26", desc: "Chopped vegetables (celery, onion, capers) and olive oil." },
      { name: "Vitello Tonnato", price: "26", desc: "Sliced veal with home-made tuna sauce." },
      { name: "Bufala Caprese", price: "22", desc: "Semi-soft Italian cheese, fresh basil and sliced tomatoes." },
      { name: "Burrata (300g)", price: "38", desc: "Soft Italian cheese with cooked spinach." },
      { name: "Carpaccio Di Manzo", price: "20", desc: "Raw beef, thinly sliced." },
      { name: "Alici Marinate", price: "20", desc: "Fresh anchovies marinated in wine vinegar and lemon." },
      { name: "Tagliere Formaggio & Salumi", price: "39", desc: "Selection of Italian cheeses and cold cuts." },
      { name: "Tagliere Formaggio", price: "26", desc: "Selection of Italian cheeses." },
      { name: "Insalata Di Polpo", price: "22", desc: "Octopus salad." },
      { name: "Caesar Salad", price: "18", desc: "Home-made caesar dressing with grilled chicken." },
      { name: "Insalata Mista", price: "13", desc: "Mixed salad." }
    ]},
    { key: "pasta", label: "Pasta & Risotto", items: [
      { name: "Home-Made Lasagna", price: "27", desc: "Flat pasta layered with meat sauce, béchamel and parmigiano." },
      { name: "Spaghetti Aglio E Olio", price: "19", desc: "Garlic, chilli and olive oil (add tiger prawn, $2 each)." },
      { name: "Fettuccine Bolognese", price: "26", desc: "Rich, flavoured mixed-meat tomato sauce." },
      { name: "Spaghetti / Linguine Vongole", price: "27", desc: "Clams, white wine, olive oil and garlic." },
      { name: "Spaghetti Seafood", price: "29", desc: "Mixed seafood, tomato sauce, olive oil and garlic." },
      { name: "Home-Made Pappardelle with Lamb Ragù", price: "40", desc: "Flat pasta with lamb ragù sauce.", special: true },
      { name: "Home-Made Spaghetti alla Bottarga", price: "42", desc: "Cooked in crab bisque with prawn, cherry tomato and bottarga.", special: true },
      { name: "Penne Arrabbiata", price: "22", desc: "Fresh tomatoes and chilli pepper." },
      { name: "Spaghetti Carbonara", price: "25", desc: "Guanciale, eggs, pecorino cheese and black pepper." },
      { name: "Spaghetti Cacio E Pepe", price: "23", desc: "Pecorino cheese and black pepper." },
      { name: "Linguine Al Pesto", price: "22", desc: "Home-made pesto." },
      { name: "Home-Made Gnocchi", price: "24", desc: "Four cheese, tomato, or butter sage sauce." },
      { name: "Risotto Al Nero Di Seppia", price: "27", desc: "Squid ink and white wine." },
      { name: "Risotto Funghi E Tartufo", price: "27", desc: "Porcini mushroom and truffle oil." },
      { name: "Lobster Linguine", price: "43", desc: "Lobster with light tomato sauce, olive oil and garlic.", special: true }
    ]},
    { key: "pizza", label: "Pizza", note: "Prices shown as Half / Full. Extra toppings available on request.", items: [
      { name: "Burrata", price: "18 / 30", desc: "Burrata, Parma ham, rocket." },
      { name: "Bacino", price: "19 / 32", desc: "Pesto sauce, porcini mushroom, burrata, crispy guanciale, truffle oil." },
      { name: "Roma", price: "18 / 30", desc: "Pesto sauce, mortadella, stracciatella, crushed toasted pistachio." },
      { name: "Spicy 'Nduja", price: "18 / 30", desc: "Home-made pumpkin sauce, red onion, 'nduja, mozzarella, scamorza cheese." },
      { name: "Venezia", price: "18 / 30", desc: "Tomato sauce, mixed seafood." },
      { name: "Margherita", price: "13 / 20", desc: "Tomato sauce, mozzarella, basil." },
      { name: "Diavola", price: "15 / 25", desc: "Tomato sauce, mozzarella, spicy salami." },
      { name: "4 Formaggi", price: "15 / 26", desc: "Mozzarella, asiago, gorgonzola, taleggio." },
      { name: "Pepperoni", price: "18 / 30", desc: "Tomato sauce, Salami Milano, mozzarella, smoked cheese, black olive and red onion.", special: true },
      { name: "Bufalina", price: "16 / 28", desc: "Tomato sauce, buffalo mozzarella, basil." },
      { name: "Capricciosa", price: "16 / 28", desc: "Tomato sauce, mozzarella, artichoke, roasted ham, mushroom, black olive." },
      { name: "Milano", price: "14 / 24", desc: "Tomato sauce, mozzarella, tuna, onion." },
      { name: "Vegetarian", price: "14 / 24", desc: "Tomato sauce, mozzarella, zucchini, eggplant, artichoke, bell pepper." }
    ]},
    { key: "mains", label: "Meat & Fish", items: [
      { name: "Filetto Di Manzo", price: "45", desc: "Grilled beef tenderloin." },
      { name: "Costoletta D'Agnello", price: "45", desc: "Grilled lamb rack." },
      { name: "Grilled Iberico Pork", price: "40", desc: "Served with mixed vegetables and caramelised onion." },
      { name: "Osso Buco", price: "48", desc: "Veal shank braised with vegetable broth, served with mashed potato.", special: true },
      { name: "Branzino Al Cartoccio", price: "45", desc: "Oven-baked whole seabass." },
      { name: "Sous Vide Cod Fish", price: "40", desc: "Served with home-made pumpkin purée." },
      { name: "Costoletta alla Milanese or Grilled", price: "18/100g", desc: "Fried breaded veal chop or grilled veal chop (approx. 500–1000g).", special: true }
    ]},
    { key: "sides", label: "Sides", items: [
      { name: "Potato Fries / with Truffle Oil*", price: "10 / 13*", desc: "Plain, or tossed in truffle oil." },
      { name: "Mashed Potato", price: "9", desc: "Buttery and smooth." },
      { name: "Grilled Vegetables", price: "9", desc: "Eggplant and zucchini (Aubergine and courgette)" },
      { name: "Home-Made Tuscany Bread", price: "5", desc: "Baked in-house." }
    ]},
    { key: "dolci", label: "Dolci", items: [
      { name: "Tiramisu", price: "16", desc: "Coffee and rum soaked sponge, mascarpone and cocoa." },
      { name: "Panna Cotta with Mango Puree", price: "16", desc: "Sweetened Italian cream with mango purée." },
      { name: "Sicilian Cannoli", price: "18", desc: "Fried pastry shell with sweet ricotta filling." },
      { name: "Traditional Italian Chocolate Almond Cake", price: "18", desc: "Dark chocolate, almond extract and flour, topped with almond flakes.", special: true },
      { name: "Gelato", price: "9", desc: "Two scoops — vanilla, dark chocolate or pistachio." },
      { name: "Affogato", price: "12", desc: "Espresso poured over vanilla gelato." }
    ]}
  ],

  setlunch: [
    { key: "sl-2course", label: "2 Courses", note: "2-Courses · S$19 per person\nAdditional S$9 for your first glass of Prosecco, Malvasia Chardonnay, Sangiovese Merlot or Peroni Draught.\nAvailable Wednesday to Saturday, excl. public holidays.", items: [
      { name: "Spaghetti Aglio e Olio", price: "", desc: "Garlic, chilli and olive oil. Add tiger prawn, $2 each.", heading: "Main Course" },
      { name: "Half Margherita Pizza", price: "", desc: "Tomato sauce, mozzarella and basil.", orAlt: true },
      { name: "Gelato", price: "", desc: "One scoop — vanilla, dark chocolate or pistachio.", heading: "Dessert" }
    ]},
    { key: "sl-3course", label: "3 Courses", note: "3-Courses · S$24 per person\nAdditional S$9 for your first glass of Prosecco, Malvasia Chardonnay, Sangiovese Merlot or Peroni Draught.\nAvailable Wednesday to Saturday, excl. public holidays.", items: [
      { name: "Mixed Green Salad", price: "", desc: "Fresh garden leaves.", heading: "Starter" },
      { name: "Spaghetti al Pesto", price: "", desc: "Home-made pesto sauce.", heading: "Main Course" },
      { name: "Half Diavola Pizza", price: "", desc: "Mozzarella, spicy salami and tomato sauce.", orAlt: true },
      { name: "Tiramisu", price: "", desc: "Coffee and rum soaked sponge, mascarpone and cocoa.", heading: "Dessert" }
    ]}
  ],

  specials: [
    { key: "specials", label: "Chef's Specials", note: "Francesco's signature creations. Ask your server about availability.", items: [
      { name: "Home-Made Pappardelle with Lamb Ragù", price: "40", desc: "Flat pasta with lamb ragù sauce." },
      { name: "Home-Made Spaghetti alla Bottarga", price: "42", desc: "Cooked in crab bisque with prawn, cherry tomato and bottarga." },
      { name: "Lobster Linguine", price: "43", desc: "Lobster with light tomato sauce, olive oil and garlic." },
      { name: "Pepperoni Pizza", price: "18 / 30", desc: "Tomato sauce, Salami Milano, mozzarella, smoked cheese, black olive and red onion." },
      { name: "Osso Buco", price: "48", desc: "Veal shank braised with vegetable broth, served with mashed potato." },
      { name: "Costoletta alla Milanese or Grilled", price: "18/100g", desc: "Fried breaded veal chop or grilled veal chop (approx. 500–1000g)." },
      { name: "Traditional Italian Chocolate Almond Cake", price: "18", desc: "Dark chocolate, almond extract and flour, topped with almond flakes." }
    ]}
  ],

  drinks: [
    { key: "glass", label: "By the Glass", note: "Glass prices shown. Happy Hour till 9pm, Tuesday to Sunday. All also available by the bottle.", items: [
      { name: "Prosecco", price: "13", desc: "Sparkling, Veneto. Happy Hour $11." },
      { name: "Malvasia Chardonnay", price: "13", desc: "House white. Happy Hour $11." },
      { name: "Pinot Grigio", price: "13", desc: "House white." },
      { name: "Chardonnay", price: "13", desc: "House white." },
      { name: "Sauvignon Blanc", price: "15", desc: "House white." },
      { name: "Sangiovese Merlot", price: "13", desc: "House red. Happy Hour $11." },
      { name: "Montepulciano", price: "13", desc: "House red." },
      { name: "Merlot", price: "13", desc: "House red." },
      { name: "Chianti DOCG", price: "14", desc: "House red." },
      { name: "Amarone, Sant'Anna", price: "20", desc: "House red, Veneto." }
    ]},
    { key: "sparkling", label: "Sparkling & Rosé", items: [
      { name: "Prosecco", price: "53", desc: "Sparkling, Veneto." },
      { name: "Champagne, Rémi Couvreur Brut", price: "115", desc: "France." },
      { name: "Librandi Cirò Rosato DOC", price: "78", desc: "100% Gaglioppo, Calabria." }
    ]},
    { key: "white", label: "White Wine", note: "Bottle prices. A fuller cellar list is available in-restaurant.", items: [
      { name: "Malvasia Chardonnay", price: "53", desc: "House white." },
      { name: "Pinot Grigio", price: "65", desc: "House white." },
      { name: "Chardonnay", price: "70", desc: "House white." },
      { name: "Sauvignon Blanc", price: "80", desc: "House white." },
      { name: "Adler Schnabel Vololibero, 2023", price: "95", desc: "100% Pinot Grigio · Alto Adige." },
      { name: "Villa Matilde Falanghina, 2020", price: "85", desc: "100% Falanghina · Campania." },
      { name: "Reguta Sauvignon Blanc, 2022", price: "80", desc: "100% Sauvignon Blanc · Friuli." },
      { name: "Paolo e Noemia D'Amico Seiano Bianco, 2021", price: "75", desc: "Grechetto & Sauvignon Blanc · Lazio." },
      { name: "Mario Gagliasso Langhe Chardonnay, 2021", price: "105", desc: "100% Chardonnay · Piemonte." },
      { name: "Gorghi Tondi Coste a Preola Grillo, 2022", price: "80", desc: "100% Grillo · Sicily." },
      { name: "Antichi Poderi Jerzu Vermentino, 2021", price: "85", desc: "100% Vermentino · Sardegna." },
      { name: "Bolgheri Vermentino, Grattamacco, 2021", price: "135", desc: "100% Vermentino · Tuscany." }
    ]},
    { key: "red", label: "Red Wine", note: "A selection from our cellar. Reserve & vintage bottles — including Barolo Cannubi, Sassicaia and rare Brunello — available on request.", items: [
      { name: "Sangiovese Merlot", price: "53", desc: "House red." },
      { name: "Montepulciano", price: "68", desc: "House red." },
      { name: "Merlot", price: "70", desc: "House red." },
      { name: "Chianti DOCG", price: "70", desc: "House red." },
      { name: "Edizione Fantini, 2021", price: "130", desc: "Sangiovese, Negroamaro, Primitivo blend · Abruzzo." },
      { name: "Pinot Noir, Tenuta Sant'Anna, 2022", price: "80", desc: "100% Pinot Noir · Friuli." },
      { name: "Valtellina Superiore Sassella, 2020", price: "110", desc: "100% Nebbiolo · Lombardia." },
      { name: "Primitivo Primaio, 2022", price: "80", desc: "100% Primitivo · Puglia." },
      { name: "Nerodavola Gorghi Tondi, 2022", price: "80", desc: "100% Nero d'Avola · Sicily." },
      { name: "Mesa Buio, 2020", price: "115", desc: "100% Carignano · Sardegna." },
      { name: "Caprai Montefalco Rosso, 2022", price: "95", desc: "Sangiovese, Sagrantino · Umbria." },
      { name: "Valpolicella, Montresor San Pietro, 2022", price: "85", desc: "Corvina, Molinara, Rondinella · Veneto." },
      { name: "Amarone Valpolicella, Tenuta Sant'Anna, 2020", price: "110", desc: "Corvina, Corvinone, Rondinella · Veneto." },
      { name: "Barbera d'Asti Superiore, Cantine Volpi, 2022", price: "90", desc: "100% Barbera · Piemonte." },
      { name: "Barolo, Mario Gagliasso Tre Utin, 2021", price: "125", desc: "100% Nebbiolo · Piemonte." },
      { name: "Barbaresco, Cantine Volpi, 2017", price: "130", desc: "100% Nebbiolo · Piemonte." },
      { name: "Chianti Classico, Tenuta Rossetti, 2023", price: "90", desc: "100% Sangiovese · Tuscany." },
      { name: "Brunello di Montalcino, Argiano, 2017", price: "135", desc: "100% Sangiovese · Tuscany." },
      { name: "Ornellaia Le Volte, 2021", price: "110", desc: "Merlot, Sangiovese, Cabernet · Super Tuscan." },
      { name: "Brancaia Tre, 2022", price: "115", desc: "Merlot, Sangiovese, Cabernet · Super Tuscan." },
      { name: "Tenuta San Guido Guidalberto, 2020", price: "130", desc: "Cabernet Sauvignon, Merlot · Super Tuscan." },
      { name: "Antinori Tignanello, 2021", price: "320", desc: "Sangiovese, Cabernet · Super Tuscan." }
    ]},
    { key: "beer", label: "Beer & Cocktails", note: "Happy Hour prices apply till 9pm, Tuesday to Sunday.", items: [
      { name: "Peroni Draft", price: "10", desc: "Pint. Half pint $7." },
      { name: "Heineken", price: "10", desc: "Bottle. Bucket of 4 $38." },
      { name: "Erdinger Weissbier", price: "18", desc: "Bottle." },
      { name: "Menabrea Lager", price: "12", desc: "Bottle. Bucket of 4 $38." },
      { name: "Aperol Spritz", price: "15", desc: "Aperol, prosecco, soda." },
      { name: "Negroni", price: "18", desc: "Gin, Campari, vermouth." },
      { name: "Mojito", price: "18", desc: "Rum, lime, mint." },
      { name: "Gin & Tonic", price: "15", desc: "Classic." },
      { name: "Campari Soda", price: "13", desc: "Bittersweet aperitivo." },
      { name: "Cuba Libre", price: "13", desc: "Rum, cola, lime." },
      { name: "Coffee Martini", price: "18", desc: "Vodka, espresso, coffee liqueur." }
    ]},
    { key: "digestivi", label: "Digestivi", items: [
      { name: "Grappa", price: "8", desc: "Classic Italian pomace brandy." },
      { name: "Grappa Barrique", price: "10", desc: "Barrel-aged grappa." },
      { name: "Limoncello", price: "8", desc: "House lemon liqueur." },
      { name: "Sambuca", price: "8", desc: "Anise liqueur." },
      { name: "Amaro Ferro China", price: "8", desc: "Herbal digestivo." }
    ]}
  ],

  faqs: [
    { q: "Do I need a reservation?", a: "We recommend booking ahead, especially for dinner and during weekends. You can quickly reserve through our Google booking panel, or give us a call. Walk-ins are welcome whenever we have space." },
    { q: "Is there a set lunch?", a: "Yes. From Wednesday to Saturday we serve a set lunch: two courses for $19 or three courses for $24 per person. It's our most popular midday option, so booking is a good idea." },
    { q: "Do you cater to vegetarians and dietary needs?", a: "Absolutely. We have vegetarian antipasti, pasta and our Vegetarian pizza, and many dishes can be adapted. Please let us know about allergies or dietary requirements when you book and our kitchen will do its best to accommodate." },
    { q: "Do you host private events or catering?", a: "We do. Bacino is available for private dining and celebrations. Call us or email hello@bacino.sg with your proposed date, group size and any menu preferences that you have and we'll put together a proposal." },
    { q: "Do you have a corkage policy?", a: "We have a 1-for-1 corkage policy. Enjoy complimentary corkage on your second bottle once you order a regularly priced bottle from our wine list.\nWe offer a delicately curated wine list with bottles priced very reasonably and we invite guests to explore our selection, which has been carefully chosen to complement the dining experience." },
    { q: "Where are you located, and is there parking?", a: "We're in Pasir Panjang on Singapore's west coast. Public parking is available nearby, and we're a short ride from the Pasir Panjang MRT. Open our map from any Reserve panel for directions." },
    { q: "Are prices inclusive of service charge?", a: "All menu prices are subject to the prevailing service charge. Any applicable taxes are shown on your final bill." }
  ]
};
