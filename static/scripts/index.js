/*

    Hola, lector de mi código, saludos.

   Al modificar la página solo lo hará en el front-end

   TODO: Tal vez devería dividir el archivo en varios

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
                case "educacion":
                    button.addEventListener("mouseup", function () { editEducation(button); });
                    break;
                case "habilidades":
                    button.addEventListener("mouseup", function () { editSkills(button); });
                    break;
                default:
                    break;
            }
        }
    });
    document.querySelectorAll(".removeButton").forEach(function (button) {
        button.setAttribute("style", "display: block;");
        if (button instanceof HTMLElement) {
            switch (button.dataset.meant) {
                case "experiencia":
                    button.addEventListener("mouseup", function () {
                        button.parentElement.parentElement.parentElement.remove();
                    });
                    break;
                case "educacion":
                    button.addEventListener("mouseup", function () {
                        button.parentElement.parentElement.parentElement.remove();
                    });
                    break;
                default:
                    break;
            }
        }
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
    // Muestra todas las cartas ocultas(Experiencia)
    document.querySelectorAll(".card").forEach(function (card) {
        card.setAttribute("style", "display: block;");
    });
    // Origin es la carta a editar, editor es la carta con los textAreas
    origin = origin.parentElement.parentElement.parentElement;
    var editor = document.getElementById("cardEditor");
    // (EXPERIMENTAL) 'yPosition' es la posición original de la carta a editar
    var yPosition = origin.getBoundingClientRect().top + window.scrollY;
    // Todas los textAreas del editor
    var editAreas = [
        editor.querySelector("#cardEditor-image"),
        editor.querySelector("#cardEditor-name"),
        editor.querySelector("#cardEditor-desc"),
        editor.querySelector("#cardEditor-charge"),
        editor.querySelector("#cardEditor-time"),
        editor.querySelector("#cardEditor-url")
    ];
    // Toda la información MODIFICABLE de la carta original
    var originAreas = [
        origin.querySelector("img"),
        origin.querySelector("h5"),
        origin.querySelector("p"),
        origin.querySelector("ul > li:first-child"),
        origin.querySelector("ul > li:nth-child(2)"),
        origin.querySelector("a")
    ];
    origin.setAttribute("style", "display: none;");
    editor.setAttribute("style", "bottom: ".concat(yPosition, "px;"));
    // Y, actualizamos los valores del editor con los a valores a editar
    editAreas[0].value = originAreas[0].src;
    editAreas[1].value = originAreas[1].innerHTML;
    editAreas[2].value = originAreas[2].innerHTML;
    editAreas[3].value = originAreas[3].innerHTML;
    editAreas[4].value = originAreas[4].innerHTML;
    editAreas[5].value = originAreas[5].href;
    /* Botón de cerrar */
    editor.querySelector("button:first-child").addEventListener("mouseup", function () {
        origin.setAttribute("style", "display: block;");
        editor.setAttribute("style", "display: none;");
    });
    /* Boton de salvar cambios (Nuevamente, Front-End) */
    editor.querySelector("button:last-child").addEventListener("mouseup", function () {
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
function editEducation(origin) {
    // editor es el input que permite modificar un valor, textAreas son los varios inputs
    var editor = document.querySelector("#educationEditor");
    var textAreas = [
        editor.querySelector("textarea:first-child"),
        editor.querySelector("textarea:nth-child(2)"),
        editor.querySelector("textarea:nth-child(3)")
    ];
    // origin es el elemento a modificar, originElements es la colección de elementos MODIFICABLES
    origin = origin.parentElement.parentElement.parentElement;
    var originElements = [
        origin.querySelector("h4"),
        origin.querySelector("span"),
        origin.querySelector("a")
    ];
    // Mostramos todos los títulos (si es que el usuario presiona editar al estar editando)
    document.querySelectorAll("#education li").forEach(function (list) {
        list.setAttribute("style", "display: block!important;");
    });
    // Y, al original lo escondemos
    origin.setAttribute("style", "display: none!important;");
    // Modificamos los valores por defecto de los inputs por los MODIFICABLES
    textAreas[0].value = originElements[0].innerHTML;
    textAreas[1].value = originElements[1].innerHTML;
    textAreas[2].value = originElements[2].href;
    /* CLOSE BUTTON */
    editor.querySelector("button:first-child").addEventListener("mouseup", function () {
        origin.setAttribute("style", "display: block!important;");
        editor.setAttribute("style", "display: none!important;");
    });
    /* SAVE BUTTON (En el Front-End) */
    editor.querySelector("button:last-child").addEventListener("mouseup", function () {
        origin.setAttribute("style", "display: block!important;");
        editor.setAttribute("style", "display: none!important;");
        originElements[0].innerHTML = textAreas[0].value;
        originElements[1].innerHTML = textAreas[1].value;
        originElements[2].href = textAreas[2].value;
    });
}
function editSkills(origin) {
    // Tabla donde vamos a encontrar la plantilla editable de las skills
    var editor = document.querySelector("#skillsEditor");
    // Array donde se encuentran los datos base
    var data = document.querySelectorAll("#skillsData .progress");
    // Cuerpo de la tabla (donde vamos a agregar las filas de edición)
    var tableBody = document.querySelector("#skillsEditor tbody");
    var fragment = document.createDocumentFragment();
    // Escondemos el botón de editar y, mostramos el editor
    editor.setAttribute("style", "display: block;");
    origin.setAttribute("style", "display: none;");
    /* Por cada elemento de skill, vamos a hacer una fila de edición */
    for (var x = 0; x < data.length; x++) {
        var row = document.createElement("tr");
        row.className = "table-light";
        row.innerHTML = "\n            <td class=\"col-4\">".concat(data[x].children[0].innerHTML, "</td>\n            <td class=\"col-4\"> <input type=\"range\" min=\"0\" max=\"66\"/> </td>\n            <td class=\"col-4 w-100 d-flex justify-content-evenly\">\n                <button class=\"btn btn-primary\" data-id=\"").concat(x, "\">Save</button>\n                <button class=\"btn btn-warning\" data-id=\"").concat(x, "\">Delete</button>\n            </td>");
        fragment.appendChild(row);
    }
    tableBody.appendChild(fragment);
    /* Butón de salvar (Front-End) */
    document.querySelectorAll("#skillsEditor .btn-primary").forEach(function (button) {
        button.addEventListener("mouseup", function () {
            if (button instanceof HTMLElement) {
                var value = button.parentElement.previousElementSibling.children[0];
                value = value.value;
                data[button.dataset["id"]].children[1].setAttribute("style", "width: ".concat(value, "%;"));
            }
        });
    });
    /* Botón de eliminar la fila */
    document.querySelectorAll("#skillsEditor .btn-warning").forEach(function (button) {
        button.addEventListener("mouseup", function () {
            if (button instanceof HTMLElement) {
                data[button.dataset["id"]].remove();
                button.parentElement.parentElement.remove();
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    main();
});
