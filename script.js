
$(document).ready(function(){

    var apikey ="1PM86ivvoKYdiurkdcQQwlqzG6a6gSD8qWV7s9W0tTuavtINk7l1knqL"
    var backgroundcount=0;
    var authorcount=0;
    let imagesData=[];
    let quotesData=[];

    navigator.clipboard.writeText("How strange and foolish is man. He loses his health in gaining wealth. Then, to regain his health he wastes his wealth. He ruins his present while worrying about his future, but weeps in the future by recalling his past. He lives as though death shall never come to him, but dies in a way as if he were never born. - Ali Ibn Abi Talib");

    quotesearch();
    imagesearch();
    

    $("#newquote").click(function (event){
        event.preventDefault();
        const quoterandomizer = Math.floor(Math.random() * quotesData.length)
        const backgroundrandomizer =  Math.floor(Math.random() * imagesData.length)

        $('.textbox').animate({ opacity: 0 }, 500, function () {
            $(this).animate({ opacity: 1 }, 500);
            $('#text').html(quotesData[quoterandomizer].quote);
          });
        
        $('.author').animate({ opacity: 0 }, 500, function () {
            $(this).animate({ opacity: 1 }, 500);
            $('#author').html("- " + quotesData[quoterandomizer].source);
          });

        $('#tweet-quote').attr(
            'href',
            'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
            encodeURIComponent('"' + quotesData[quoterandomizer].quote + '" ' + quotesData[quoterandomizer].source)
        );

        $("#copy-quote").click(function (event) {
            event.preventDefault();
            console.log("copy")

            navigator.clipboard.writeText(quotesData[quoterandomizer].quote + " - " + quotesData[quoterandomizer].source);
        
        });

        
        $("body").css("background-image", "url(" + imagesData[backgroundrandomizer].src.original + ")");
        $(":root").get(0).style.setProperty("--coloruse", imagesData[backgroundrandomizer].avg_color)

        

        //sol 1: create div, z index -1, put image inside it, new click replaces img
        //get 20 links of images

        
    });

    function imagesearch(){
        return $.ajax({
            method: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", apikey);
            },

            url: "https://api.pexels.com/v1/search?query=nature&per_page=80",

            success: function(data) {
            

                imagesData = data.photos;
                
                
            },

            error: function (error){
                console.log(error)
            }
        })
    }

    function quotesearch(){
        return $.ajax({
            method: 'GET',

            url: "https://philosophy-quotes-api.glitch.me/quotes",

            success: function(data) {
                quotesData= data;
                
                
                
            },

            error: function (error){
                console.log(error)
            }
        })
    }

    

});
