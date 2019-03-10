function onLoad(){
  
  var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
  var apiKey = "HVsjd10qxnnHB1fj8hqkHvVF0FMHHTwM";
  var searchTermArray = [];
  var searchDivIndex = 0;
  var searchTerm = "";
  var queryURL = "";
  
 
  function createSearchDiv(searchTerm){
    $("#search-div-container").prepend('<div id="search-div-' + searchDivIndex + '"' + 'class="search-div">' + searchTerm + '</div>');
    searchDivIndex++;
    $(".search-div").off("click");
    $(".search-div").on("click", function(queryURL){
      searchTerm = $(this).text();
      queryURL = baseURL + searchTerm + "&api_key=" + apiKey + "&limit=10";
      // console.log(queryURL);
      callAjax(queryURL);
    });
  }


  function clearSearchBox(){
    $('#search-input').val("");
  }

  function callAjax(queryURL){
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      // console.log("response: ",response);
      // console.log("response.data: ",response.data);
     
      var results = response.data;
      
      for (let i = 0; i < results.length; i++) {
    
        // $("#gif-container").prepend('<img src="' + response.data[i].images.fixed_height.url + '"' + '>');
        $("#gif-container").prepend(
          "<figure>"+
            '<img src="' + response.data[i].images.fixed_height.url + '"' + '>'+
            "<figcaption> Source: " + response.data[i].source_tld + "</figcaption>"+ 
            "<figcaption> Rating : " + response.data[i].rating + "</figcaption>"+
          "</figure>"
          );
       
      }
    });

  }


  $("#search-btn").on("click", function() {
    searchTerm = $('#search-input').val().trim();
    searchTerm = searchTerm.toLocaleLowerCase();
    if(searchTerm != ""){
      searchTermArray.push(searchTerm);
      localStorage.setItem("searchTerms", searchTermArray);
      createSearchDiv(searchTerm);
      clearSearchBox();
    }
  });

  $("#clear-btn").on("click", function(){
    searchTermArray = [];
    $("#search-div-container").empty();
    $("#gif-container").empty();
    localStorage.removeItem("searchTerms");
    clearSearchBox();
  });

  clearSearchBox(); //to fix problem where sometimes page loads with empty div
  if(localStorage.hasOwnProperty("searchTerms")){
    searchTermArray = localStorage.getItem("searchTerms").split(",");
  }

  for(i = 0; i < searchTermArray.length; i++){
    createSearchDiv(searchTermArray[i]);
  }


}