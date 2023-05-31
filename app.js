console.log("Let's get this party started!");
const giphyContainer = $("#giphy-container .row");
const storedGifs = JSON.parse(localStorage.getItem("gifs")) || [];

$("form").on("submit", async function(e){
    e.preventDefault();
    const giphySearchInpt = $('input[type="text"]');
    const imageURL = await getGiphy(giphySearchInpt.val().trim());
    createGiphyItem(imageURL);
    storedGifs.push(imageURL)
    localStorage.setItem("gifs", JSON.stringify(storedGifs))
    giphySearchInpt.val("");
})

$("#btnRemove").on("click", function(e) {
    giphyContainer.empty();
    storedGifs.length = 0;
    localStorage.removeItem("gifs")
})

$(document).ready(function(){
    storedGifs.forEach(gifUrl => createGiphyItem(gifUrl));
})

async function getGiphy(search){
    const apiKey = "n0mB0ciIUWak7jF2AQgkCZWmTwkw4QQX";
    const apiResponse = await axios.get("https://api.giphy.com/v1/gifs/search",{
        params: {
            q: search,
            api_key: apiKey,
            limit: 20 }})

    // console.log(apiResponse)
   return (apiResponse.data.data[0].images.original.url)
}

function createGiphyItem(imageUrl) {
    const giphyHtml = `<div class="col-sm-3 mb-2">
        <img src=${imageUrl} class="img-thumbnail rounded" alt="">
    </div>`
    const giphyItem = $(giphyHtml);
    giphyContainer.append(giphyItem);
}
