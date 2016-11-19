(function(){

    var API_URL = "https://swapi.co/api/people/";

    var apnd = document.getElementById("apnd");
    var search = document.getElementById("input--search");
    var subm = document.getElementById("submit")

    var persons = {};
    persons.birthday;
    persons.name;
    persons.eyesColor;
    persons.hairColor;
    persons.height;
    persons.skin;
    persons.gender;
    persons.origin;
    persons.species;
    persons.films;

    $(subm).on("click", recivePersons);

    $(search).on("keypress", function(event){
        
        if(event.which == 13){
            $("#apndText").html("Trabajando....");
            recivePersons();
        }
    })

    function recivePersons() {

        $.getJSON({
            url: API_URL + "?search=" + $(search).val()
        }, starWars);

        function starWars(data) {

            $("#apndText").fadeOut();
            console.log(data);

            persons.birthday = data.results[0].birth_year; 
            persons.name = data.results[0].name;
            persons.eyesColor = data.results[0].eye_color;
            persons.hairColor = data.results[0].hair_color;
            persons.height = data.results[0].height; 
            persons.skin = data.results[0].skin_color;
            persons.gender = data.results[0].gender;
            persons.origin = data.results[0].homeworld;
            persons.species = data.results[0].species;
            persons.films = data.results[0].films;

            $("#apndDate").html("Birth Year: " + persons.birthday);
            $("#apndName").html("Name: " + persons.name); 
            $("#apndEye").html("Hair Color: " + persons.hairColor);
            $("#apndEye").html("Eyes Color: " + persons.eyesColor);
            $("#apndHeight").html("Height: " + persons.height + "cm"); 
            $("#apndSkin").html("Skin Color: " + persons.skin);
            $("#apndGender").html("Gender: " + persons.gender);

            $.getJSON({url: persons.origin}, function(data){
                console.log(data);
                // PERSONS.NAME ES UN NUEVO ATRIBTO DENTRO DE OTRA LLAMADA, NO CONFUNDIR CON EL NOMBRE DE PERSONAJE
                persons.originPlanet = data.name;
                $("#origin").html("Origin Planet: " + persons.originPlanet);
            })

            $.getJSON({url: persons.species}, function(data){
                console.log(data);
                // OTRA VEZ PERSONS.NAME ES UN NUEVO ATRIBTO DENTRO DE OTRA LLAMADA, NO CONFUNDIR CON EL NOMBRE DE PERSONAJE
                persons.speciesOwn = data.name;
                $("#specie").html("Specie: " + persons.speciesOwn);
            })
            //ESTA FUNCION TODAVIA NO FUNCIONA
            $(persons.films).each( function(filmUrl) {
                $.getJSON({url: filmUrl}, function(data){
                    console.log(data);
                });
            }); 
        }
    }
})();