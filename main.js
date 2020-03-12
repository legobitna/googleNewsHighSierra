let newsList = [];
let page = 1;
let apiKey = "a7be96f9d0f54cb895dd865d8500fe04";



// Call the API when you first time load the webpage and when you click bring more button
let callAPI = async () => {
 
  let url = `http://newsapi.org/v2/everything?q=korea&page=${page}&apiKey=${apiKey}`;
  let data = await fetch(url);
  let result = await data.json();

  newsList = newsList.concat(result.articles);
  searchBySource(); // after get the newsList, show the available source 
  render(newsList);
};






// call the API when you search by category from the dropdown list 
let searchByCategory = async () => {
  let category = document.getElementById("category").value;
  let url = `http://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
  let data = await fetch(url);
  let result = await data.json();

  newsList = result.articles;
  render(newsList);
};





// Show the available sources when you load the page 
let searchBySource = () => {
  let sourceNames = newsList.map(item => item.source.name);

  let sourceObject = sourceNames.reduce((total, name) => {
    console.log("total:", total);
    if (name in total) {// in is the operator to use for object and find the key from object
      total[name]++;
    } else {
      total[name] = 1;
    }
    return total;
  }, {});

  let sourceArray = Object.keys(sourceObject);// get the Key from object to the array 

  let htmlForSource = sourceArray.map(
    item =>
      `<input onchange='sourceClicked("${item}")' type="checkbox" id="${item}"/> ${item} (${sourceObject[item]})`
  );

  document.getElementById("sourceArea").innerHTML = htmlForSource;
};






//function when you click the checkbox of source. 
let sourceClicked = index => {
  if (document.getElementById(index).checked == true) {
    let filteredNews = newsList.filter(item => item.source.name === index);
    render(filteredNews);
  } else {
    render(newsList);
  }
};






// render the array to show on screen 
let render = array => {
  let htmlForNews = array
    .map(item => {
      return `<div id="news" style="display: flex; border:1px solid grey">
         <img style="width:200px"
             src="${item.urlToImage}" />
         <div>
             <h2>${item.title}</h2>
             <p>${item.content}</p>
             <div>${item.publishedAt}</div>
             <div>${item.source.name}</div>
            //  view more part 
         </div>
     </div>`;
    })
    .join("");

  document.getElementById("newsArea").innerHTML = htmlForNews;
};




// when you click the bring more button
let loadMore = () => {
  page++; //2

  callAPI();
};


// call the API first when you load the page 
callAPI();
