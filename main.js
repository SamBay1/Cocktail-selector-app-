// Function to fetch and display cocktails

const fetchData = async (urls) => {
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const data = await Promise.all(responses.map((response) => response.json()));

  // Flatten the array of cocktail arrays into a single array of cocktails
  const cocktails = [].concat(...data.map((data) => data.drinks));
  console.log(cocktails);
  // ======================================
  const template = document.querySelector('#cocktail-card');
  const wrapper = document.createElement('div');

  cocktails.forEach((cocktail) => {
    let description = `${cocktail.strDrink} is a mixed drink typically consisting of different ingredients. It is served chilled and garnished, offering a refreshing beverage experience.`;
    const clone = template.content.cloneNode(true);
    clone.querySelector('h3').textContent = cocktail.strDrink;
    clone.querySelector('.description').textContent = description;
    clone.querySelector('.name').textContent = `Make ${cocktail.strDrink}`;

    const primaryBtn = clone.querySelector('.primary-btn');
    primaryBtn.addEventListener('click', async () => {
      const cocktailDetailsResponse = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`
      );
      const cocktailDetailsData = await cocktailDetailsResponse.json();
      const cocktailDetails = cocktailDetailsData.drinks[0];
      const instruction = cocktailDetails.strInstructions;

      alert(instruction);
    });

    const img = clone.querySelector('img');
    img.src = cocktail.strDrinkThumb;
    img.alt = `Image of ${cocktail.strDrink}`;

    wrapper.appendChild(clone);
  });

  const cocktailsContainer = document.querySelector('.cocktails');
  cocktailsContainer.innerHTML = '';
  cocktailsContainer.appendChild(wrapper);
};

// Event listener for filter buttons

document.addEventListener('DOMContentLoaded', () => {
  const url = [
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
  ];
  fetchData(url);
  // ==================================================================
  const showAllCocktails = document.querySelector('#all-cocktails');
  const showAtoB = document.querySelector('#a-b');
  const showCtoD = document.querySelector('#c-d');
  const showEtoG = document.querySelector('#e-g');
  const showHtoL = document.querySelector('#h-l');
  const showMtoN = document.querySelector('#m-n');
  const showSpecial = document.querySelector('#special');

  showAllCocktails.addEventListener('click', () => {
    const url = [
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`,
    ];

    fetchData(url);
  });
  showAtoB.addEventListener('click', () => {
    let letters = ['a', 'b'];
    // urls is a variable that holds an array of urls we send to fetch as an argument. for each letter we create a new url with that letter included in the address. this url is added to our array.
    const urls = letters.map(
      (letter) =>
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    // console.log(' urls array', urls);
    fetchData(urls);
  });
  showCtoD.addEventListener('click', () => {
    let letters = ['c', 'd'];
    const urls = letters.map(
      (letter) =>
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    // console.log(' urls array', urls);
    fetchData(urls);
  });
  showEtoG.addEventListener('click', () => {
    let letters = ['e', 'f', 'g'];
    const urls = letters.map(
      (letter) =>
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    console.log('urls array', urls);
    fetchData(urls);
  });

  showHtoL.addEventListener('click', () => {
    let letters = ['h', 'i', 'j', 'k', 'l'];
    const urls = letters.map(
      (letter) =>
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    console.log(' urls array', urls);
    fetchData(urls);
  });
  showMtoN.addEventListener('click', () => {
    let letters = ['m', 'n'];
    const urls = letters.map(
      (letter) =>
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    console.log(' urls array', urls);
    fetchData(urls);
  });

  showSpecial.addEventListener('click', () => {
    let numbers = ['1', '5', '7', '9'];
    // let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const urls = numbers.map(
      (number) =>
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${number}`
    );

    fetchData(urls);
  });
});
