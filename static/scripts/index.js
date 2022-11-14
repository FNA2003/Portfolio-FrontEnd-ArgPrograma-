/*

    Hola, lector de mi código, saludos.

   Al modificar la página solo lo hará en el front-end

*/
function main() {
    // Botones y el estado de los mismos para el logeo
    var logIn = document.querySelector("#logIn");
    var logOut = document.querySelector("#logOut");
    document.querySelector("#logOut").addEventListener("mouseup", function () { location.reload(); });
    // El elemento que permite logearse
    var form = document.getElementById("hiddenForm");
    // Primero, el superusario se deberá logear cada vez que entra a la página
    logOut.setAttribute("style", "display:none;");
    /* Agregamos las funciones para cada botón (logicamente cuando se avance en el curso
    se logeara realmente) y, modificamos el estado interno del loggeo */
    logIn.addEventListener("mouseup", function () { showForm(logIn, logOut, form); });
    document.querySelector("#closeForm").addEventListener("mouseup", function () { closeForm(form); });
    return 0;
}
function showForm(buttonIn, buttonOut, form) {
    /* Por ahora, "showForm" muestra el formulario y cambia el estado
    de los botones de loggeo
    y permite editar la página*/
    form.setAttribute("style", "display: block;");
    buttonIn.setAttribute("style", "display:none;");
    buttonOut.setAttribute("style", "display:block;");
    // Todos los botones de edición tienen la misma clase
    document.querySelectorAll(".editButton").forEach(function (button) {
        // Y, al "logguearse" se habilitan
        button.setAttribute("style", "display:block;");
        if (button instanceof HTMLElement) {
            // Para luego darles un evento
            switch (button.dataset.meant) {
                case "about":
                    button.addEventListener("mouseup", function () { editAbout(button); });
                    break;
                case "experiencia":
                    button.addEventListener("mouseup", function () { editExperience(button); });
                    break;
                default:
                    break;
            }
        }
    });
    document.querySelectorAll(".removeButton").forEach(function (button) {
        button.setAttribute("style", "display: block;");
        button.addEventListener("mouseup", function () {
            if (button instanceof HTMLElement) {
                switch (button.dataset.meant) {
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
function closeForm(form) {
    /* Simplemente, esconder el formulario */
    form.setAttribute("style", "display: none;");
}
function editAbout(origin) {
    // Se oculta el boton de editar que abrió el formulario
    origin.setAttribute("style", "display:none;");
    // Se encuentra y habilita el formulario de edición
    var editForm = document.querySelector("#editAbout");
    editForm.setAttribute("style", "display:block");
    // Se encuentra los botones del formulario de edición
    var closeEditForm = document.querySelector("#aboutClose");
    var saveEditForm = document.querySelector("#aboutSave");
    // Ahora, vamos a buscar todos los 'orígenes a modificar'
    var mainImg = document.querySelector("#about-info img");
    var mainCaption = document.querySelector("#about-info figcaption");
    var mainParagraph = document.querySelector("#about-info p");
    // Y los inputs con lo cual lo vamos a hacer
    var imgSource = document.querySelector("#imageSourceEdit");
    var name = document.querySelector("#portfolioNameEdit");
    var presentation = document.querySelector("#presentacionEdit");
    // Damos el valor a los inputs correspondientes
    imgSource.value = mainImg.src;
    name.value = mainCaption.innerHTML;
    presentation.value = mainParagraph.innerHTML;
    // Al botón de cerrar se le da la habilidad de ocultar el form
    closeEditForm.addEventListener("mouseup", function () {
        editForm.setAttribute("style", "display:none");
        origin.setAttribute("style", "display:block;");
    });
    // Y al botón de salvar de modificar el front-end
    saveEditForm.addEventListener("mouseup", function () {
        mainImg.src = imgSource.value.trim();
        ;
        mainCaption.innerHTML = name.value.trim();
        ;
        mainParagraph.innerHTML = presentation.value.trim();
        ;
    });
}
function editExperience(origin) {
    var FATHER = origin.parentElement.parentElement.parentElement.parentElement;
    var card = origin.parentElement.parentElement.parentElement;
    card.setAttribute("style", "display:none");
    /* TODO: BIG TODO, WE NEED TO TRANSLATE THE BELLOW CODE
    TO DIFERENTS ELEMENTS SO WE CAN ADD EVENT LISTENERS AN SO ON  */
    var edit = document.createElement("div");
    edit.setAttribute("style", "position: absolute; top: ".concat(window.screenY, "; left: 40%;"));
    edit.innerHTML = "\n    <div class=\"card\" style=\"max-width:35rem; width: 15%; min-width: 18rem\">\n        <textarea style=\"resize: none; height:3rem;\" placeholder=\"URL DE LA IM\u00C1GEN DE LA COMPAN\u00CDA\">".concat(card.children[0].src, "</textarea>\n        <div class=\"card-body\">\n            <textarea style=\"resize: none; height:3rem;\" placeholder=\"NOMBRE DE LA COMPAN\u00CDA\">").concat(card.children[1].children[0].innerHTML, "</textarea>\n            <textarea style=\"resize: none; height:5rem;\" placeholder=\"DESCRIPCI\u00D3N DEL CARGO EN LA COMPAN\u00CDA\">").concat(card.children[1].children[1].innerHTML, "</textarea>\n        </div>\n        <ul class=\"list-group list-group-flush text-center\">\n            <li class=\"list-group-item\"><textarea style=\"resize: none; height:2rem;\" placeholder=\"CARGO EN LA COMPAN\u00CDA\">").concat(origin.parentElement.parentElement.children[0].innerHTML, "</textarea></li>\n            <li class=\"list-group-item\"><textarea style=\"resize: none; height:2rem;\" placeholder=\"TIEMPO EN LA COMPAN\u00CDA\">").concat(origin.parentElement.parentElement.children[1].innerHTML, "</textarea></li>\n            <li class=\"list-group-item\"><a href=\"#\"><textarea style=\"resize: none; height:3rem;\" placeholder=\"URL QUE VALIDE LA EXPERIENCIA\">").concat(origin.parentElement.parentElement.children[2].children[0].src, "</textarea></a></li>\n            <li class=\"list-group-item d-flex justify-content-evenly\">\n                <button class=\"btn btn-warning\">Close</button>\n                <button class=\"btn btn-primary\">Save</button>\n            </li>\n        </ul>\n    </div>");
    FATHER.appendChild(edit);
}
document.addEventListener("DOMContentLoaded", function () {
    main();
});
