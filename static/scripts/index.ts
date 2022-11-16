/*

    Hola, lector de mi código, saludos.

   Al modificar la página solo lo hará en el front-end

   TODO: Tal vez devería dividir el archivo en varios

*/


function main():number {
    // Botones y el estado de los mismos para el logeo
    let logIn:Element = document.querySelector("#logIn");
    let logOut:Element = document.querySelector("#logOut");
    
    document.querySelector("#logOut").addEventListener("mouseup", () => { location.reload(); });

    // El elemento que permite logearse
    let form:Element = document.getElementById("hiddenForm");

    // Primero, el superusario se deberá logear cada vez que entra a la página
    logOut.setAttribute("style", "display:none;")
    /* Agregamos las funciones para cada botón (logicamente cuando se avance en el curso
    se logeara realmente) y, modificamos el estado interno del loggeo */
    logIn.addEventListener("mouseup", () => { showForm(logIn, logOut, form) });
    document.querySelector("#closeForm").addEventListener("mouseup", () => { closeForm(form); })

    return 0;
}

function showForm(buttonIn:Element, buttonOut:Element, form:Element):void {
    /* Por ahora, "showForm" muestra el formulario y cambia el estado
    de los botones de loggeo 
    y permite editar la página*/
    form.setAttribute("style", "display: block;");  

    buttonIn.setAttribute("style", "display:none;");
    buttonOut.setAttribute("style", "display:block;");

    // Todos los botones de edición tienen la misma clase
    document.querySelectorAll(".editButton").forEach(button => {
        // Y, al "logguearse" se habilitan
        button.setAttribute("style", "display:block;");

        if (button instanceof HTMLElement) {
            // Para luego darles un evento
            switch(button.dataset.meant){
                case "about":
                    button.addEventListener("mouseup", () => {editAbout(button);} );
                    break;
                case "experiencia":
                    button.addEventListener("mouseup", () => {editExperience(button);});
                    break;
                case "educacion":
                    button.addEventListener("mouseup", () => {editEducation(button)});
                    break;
                default:
                    break;
            }
        }
        
    });

    document.querySelectorAll(".removeButton").forEach(button => {
        button.setAttribute("style", "display: block;")
        
            if (button instanceof HTMLElement) {
                switch(button.dataset.meant) {
                    case "experiencia":
                        button.addEventListener("mouseup", () => {
                            button.parentElement.parentElement.parentElement.remove();
                        });
                        break;
                    case "educacion":
                        button.addEventListener("mouseup", () => {
                            button.parentElement.parentElement.parentElement.remove();
                        });
                        break;
                    default:
                        break;
                }
            }
            
    });
}

function closeForm(form:Element):void {
    /* Simplemente, esconder el formulario */
    form.setAttribute("style", "display: none;");
}


function editAbout(origin:Element):void {
    // Se oculta el boton de editar que abrió el formulario
    origin.setAttribute("style", "display:none;");

    // Se encuentra y habilita el formulario de edición
    let editForm:Element = document.querySelector("#editAbout");    
    editForm.setAttribute("style", "display:block");

    // Se encuentra los botones del formulario de edición
    let closeEditForm:Element = document.querySelector("#aboutClose");
    let saveEditForm:Element = document.querySelector("#aboutSave");


    // Ahora, vamos a buscar todos los 'orígenes a modificar'
    let mainImg:HTMLImageElement = document.querySelector("#about-info img");
    let mainCaption:Element = document.querySelector("#about-info figcaption");
    let mainParagraph:Element = document.querySelector("#about-info p");
    
    // Y los inputs con lo cual lo vamos a hacer
    let imgSource:HTMLInputElement = document.querySelector("#imageSourceEdit");
    let name:HTMLInputElement = document.querySelector("#portfolioNameEdit");
    let presentation:HTMLInputElement = document.querySelector("#presentacionEdit");
    // Damos el valor a los inputs correspondientes
    imgSource.value = mainImg.src;
    name.value = mainCaption.innerHTML;
    presentation.value = mainParagraph.innerHTML; 

    
    // Al botón de cerrar se le da la habilidad de ocultar el form
    closeEditForm.addEventListener("mouseup", () => {
        editForm.setAttribute("style", "display:none");
        origin.setAttribute("style", "display:block;");
    });

    // Y al botón de salvar de modificar el front-end
    saveEditForm.addEventListener("mouseup", () => {
        mainImg.src = imgSource.value.trim();;
        mainCaption.innerHTML = name.value.trim();;
        mainParagraph.innerHTML = presentation.value.trim();;
    })
}

function editExperience(origin:Element):void {
    // Muestra todas las cartas ocultas(Experiencia)
    document.querySelectorAll(".card").forEach(card => {
        card.setAttribute("style", "display: block;")
    });
    
    // Origin es la carta a editar, editor es la carta con los textAreas
    origin = origin.parentElement.parentElement.parentElement as HTMLElement;
    let editor:HTMLElement = document.getElementById("cardEditor");
    
    // (EXPERIMENTAL) 'yPosition' es la posición original de la carta a editar
    let yPosition:Number = origin.getBoundingClientRect().top + window.scrollY;
    
    // Todas los textAreas del editor
    const editAreas:Array<HTMLTextAreaElement> = [
        editor.querySelector("#cardEditor-image"),
        editor.querySelector("#cardEditor-name"),
        editor.querySelector("#cardEditor-desc"),
        editor.querySelector("#cardEditor-charge"),
        editor.querySelector("#cardEditor-time"),
        editor.querySelector("#cardEditor-url")
    ];
    // Toda la información MODIFICABLE de la carta original
    const originAreas:Array<HTMLImageElement | HTMLAnchorElement | Element> = [
        origin.querySelector("img"),
        origin.querySelector("h5"),
        origin.querySelector("p"),
        origin.querySelector("ul > li:first-child"),
        origin.querySelector("ul > li:nth-child(2)"),
        origin.querySelector("a")
    ]   
    

    origin.setAttribute("style", "display: none;")
    editor.setAttribute("style", `bottom: ${yPosition}px;`);

    
    // Y, actualizamos los valores del editor con los a valores a editar
    editAreas[0].value = originAreas[0].src;
    editAreas[1].value = originAreas[1].innerHTML;
    editAreas[2].value = originAreas[2].innerHTML
    editAreas[3].value = originAreas[3].innerHTML;
    editAreas[4].value = originAreas[4].innerHTML;
    editAreas[5].value = originAreas[5].href;


    /* Botón de cerrar */
    editor.querySelector("button:first-child").addEventListener("mouseup", () => {
        origin.setAttribute("style", "display: block;");
        editor.setAttribute("style", "display: none;");
    });
    /* Boton de salvar cambios (Nuevamente, Front-End) */
    editor.querySelector("button:last-child").addEventListener("mouseup", () => {
        origin.setAttribute("style", "display: block;");
        editor.setAttribute("style", "display: none;");

        originAreas[0].src = editAreas[0].value;
        originAreas[1].innerHTML = editAreas[1].value;
        originAreas[2].innerHTML = editAreas[2].value;
        originAreas[3].innerHTML = editAreas[3].value;
        originAreas[4].innerHTML = editAreas[4].value;
        originAreas[5].href = editAreas[5].value;
    });
}

function editEducation(origin:Element):void {
    // editor es el input que permite modificar un valor, textAreas son los varios inputs
    const editor:Element = document.querySelector("#educationEditor");
    const textAreas:Array<HTMLTextAreaElement> = [
        editor.querySelector("textarea:first-child"),
        editor.querySelector("textarea:nth-child(2)"),
        editor.querySelector("textarea:nth-child(3)")
    ];

    // origin es el elemento a modificar, originElements es la colección de elementos MODIFICABLES
    origin = origin.parentElement.parentElement.parentElement;
    const originElements:Array<Element | HTMLAnchorElement> = [
        origin.querySelector("h4"),
        origin.querySelector("span"),
        origin.querySelector("a")
    ];

    // Mostramos todos los títulos (si es que el usuario presiona editar al estar editando)
    document.querySelectorAll("#education li").forEach(list => {
        list.setAttribute("style", "display: block!important;")
    });
    // Y, al original lo escondemos
    origin.setAttribute("style", "display: none!important;")
    
    // Modificamos los valores por defecto de los inputs por los MODIFICABLES
    textAreas[0].value = originElements[0].innerHTML;
    textAreas[1].value = originElements[1].innerHTML;
    textAreas[2].value = originElements[2].href;

    /* CLOSE BUTTON */
    editor.querySelector("button:first-child").addEventListener("mouseup", () => {
        origin.setAttribute("style", "display: block!important;");
        editor.setAttribute("style", "display: none!important;");
    });
    /* SAVE BUTTON (En el Front-End) */
    editor.querySelector("button:last-child").addEventListener("mouseup", () => {
        origin.setAttribute("style", "display: block!important;");
        editor.setAttribute("style", "display: none!important;");

        originElements[0].innerHTML = textAreas[0].value;
        originElements[1].innerHTML = textAreas[1].value;
        originElements[2].href = textAreas[2].value;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});