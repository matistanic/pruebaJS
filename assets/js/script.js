$(document).ready(function () {
    let limpiar = () => {
        $('#alerta').text("")
    }

    // Validando que sea número y mayor que 0
    let validar = (num) => {
        let validar = true;
        let validacionNum = /[1-9]+/gim;;
        if (validacionNum.test(num) == false) {
            $('#alerta').text("Tiene que ser número mayor que 0");
            validar = false;
        }
        return validar
    }
    
    // Si es válido buscamos al Hero
    $('form').submit((event) => {
        event.preventDefault();
        limpiar()
        let num = $('#input-buscar').val()
        let resultadoValidacion = validar(num)
        if (resultadoValidacion == true) {
            buscarHero(num);
        }
    })

    // Consumo de la API
    let buscarHero = (num) => {
        $.ajax({
            type: 'GET',
            url: "https://www.superheroapi.com/api.php/10224696900103573/" + num,
            dataType: 'json',
            success: function (data) {
                pintar(data)
            }
        })
    }

    // Traemos la información separada
    let pintar = data => {
        $('#section-container').removeClass('d-none')
        $('#image').attr("src",data.image.url);
        $('#name').text(`Nombre: ${data.name}`)             
        $('#connections').text(`Conexiones: ${data.connections["group-affiliation"]}`)
        $('#publisher').text(`Publicado por: ${data.biography.publisher}`)
        $('#occupation').text(`Ocupación: ${data.work.occupation}`)
        $('#first-appearance').text(`Primera Aparición: ${data.biography.publisher}`)
        $('#height').text(`Altura: ${data.appearance.height}`)
        $('#weight').text(`Peso: ${data.appearance.weight}`)
        $('#aliases').text(`Alianzas: ${data.biography.aliases}`)
        canvas(data.name,data.powerstats)             
    }

    // CanvasJS para el chart
    let canvas = (nombre,data) => {
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2",
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: `Estadisticas de poder para ${nombre}`
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - ({y}) ",
                dataPoints: [
                    { y: data.combat, label: "combate" },
                    { y: data.durability, label: "durabilidad" },
                    { y: data.intelligence, label: "inteligencia" },
                    { y: data.power, label: "poder" },
                    { y: data.speed, label: "velocidad" },
                    { y: data.strength, label: "fuerza" }  
                ]
            }]
        });
        chart.render();
    }
})
