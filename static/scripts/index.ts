/*

    Hola, lector de mi código, saludos.

   Al modificar la página solo lo hará en el front-end

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
                default:
                    break;
            }
        }
        
    });

    document.querySelectorAll(".removeButton").forEach(button => {
        button.setAttribute("style", "display: block;")
        button.addEventListener("mouseup", () => {
            if (button instanceof HTMLElement) {
                switch(button.dataset.meant) {
                    case "experiencia":
                        button.parentElement.parentElement.parentElement.remove();
                        break;
                    default:
                        break;
                }
            }
            
        });
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
    const FATHER:Element = origin.parentElement.parentElement.parentElement.parentElement;
    
    const card:Element = origin.parentElement.parentElement.parentElement
    card.setAttribute("style", "display:none")

    /* TODO: BIG TODO, WE NEED TO USER THE BELLOW CODE
    WITH EVENT LISTENERS */
    let edit:Element = document.createElement("div");
    edit.setAttribute("style", `position: absolute; top: ${window.screenY}; left: 40%;`)
    edit.innerHTML = `
    <div class="card" style="max-width:35rem; width: 15%; min-width: 18rem">
        <textarea style="resize: none; height:3rem;" placeholder="URL DE LA IMÁGEN DE LA COMPANÍA">${card.children[0].src}</textarea>
        <div class="card-body">
            <textarea style="resize: none; height:3rem;" placeholder="NOMBRE DE LA COMPANÍA">${card.children[1].children[0].innerHTML}</textarea>
            <textarea style="resize: none; height:5rem;" placeholder="DESCRIPCIÓN DEL CARGO EN LA COMPANÍA">${card.children[1].children[1].innerHTML}</textarea>
        </div>
        <ul class="list-group list-group-flush text-center">
            <li class="list-group-item"><textarea style="resize: none; height:2rem;" placeholder="CARGO EN LA COMPANÍA">${origin.parentElement.parentElement.children[0].innerHTML}</textarea></li>
            <li class="list-group-item"><textarea style="resize: none; height:2rem;" placeholder="TIEMPO EN LA COMPANÍA">${origin.parentElement.parentElement.children[1].innerHTML}</textarea></li>
            <li class="list-group-item"><a href="#"><textarea style="resize: none; height:3rem;" placeholder="URL QUE VALIDE LA EXPERIENCIA">${origin.parentElement.parentElement.children[2].children[0].src}</textarea></a></li>
            <li class="list-group-item d-flex justify-content-evenly">
                <button class="btn btn-warning">Close</button>
                <button class="btn btn-primary">Save</button>
            </li>
        </ul>
    </div>`;


    FATHER.appendChild(edit)
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});