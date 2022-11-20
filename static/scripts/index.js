function main() {
    // Botones para poder "loggearse" en la página
    var logIn = document.querySelector("#logIn");
    var logOut = document.querySelector("#logOut");
    // Formulario que nos deja logearnos
    var form = document.getElementById("hiddenForm");
    // Naturalmente, para des-logearse hay que estar logeado
    logOut.setAttribute("style", "display:none;");
    // Para deslogearse, vamos a refrescar la página (No existen las cookies)
    document.querySelector("#logOut").addEventListener("mouseup", function () { location.reload(); });
    // Permitimos la edición
    logIn.addEventListener("mouseup", function () { showForm(logIn, logOut, form); });
    // Y cerrar el formulario
    document.querySelector("#closeForm").addEventListener("mouseup", function () {
        form.setAttribute("style", "display: none;");
    });
    return 0;
}
function showForm(buttonIn, buttonOut, form) {
    // Mostramos el formulario
    form.setAttribute("style", "display: block;");
    // Y simulamos que nos logeamos a la vez
    buttonIn.setAttribute("style", "display:none;");
    buttonOut.setAttribute("style", "display:block;");
    // Permitimos que se modifique el contenido
    allowEdit();
}
function allowEdit() {
    // Todos los botones de edición tienen la misma clase
    document.querySelectorAll(".editButton").forEach(function (button) {
        button.setAttribute("style", "display:block;");
        // Lo de "instaceof" es una forma en la que TypeScript nos deja manipular un Elemento como otro tipo
        if (button instanceof HTMLElement) {
            // Cada botón de edición tiene un data-set que nos da la información de a quien corresponden
            switch (button.dataset.meant) {
                case "about":
                    button.addEventListener("mouseup", function () { return editAbout.bind(button); }, false);
                    break;
                case "experiencia":
                    button.addEventListener("mouseup", function () { return editExperience.bind(button); }, false);
                    break;
                case "educacion":
                    button.addEventListener("mouseup", function () { return editEducation.bind(button); }, false);
                    break;
                case "habilidades":
                    button.addEventListener("mouseup", function () { return editSkills.bind(button); }, false);
                    break;
                case "proyectos":
                    button.addEventListener("mouseup", function () { return editAbilities(button); }, false);
                    break;
                default:
                    console.error("Existe un botón de edición irreconocible");
                    break;
            }
        }
    });
    // Y, todos los botones de borrar, tienen la misma clase
    document.querySelectorAll(".removeButton").forEach(function (button) {
        button.setAttribute("style", "display: block;");
        // Y, borramos los contenedores (por ahora, desarrollo en Front-End)
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
function editAbout(origin) {
    // editor donde podremos modificar lo que se muestra en la sección "About"
    var editForm = document.querySelector("#editAbout");
    // Botones del formulario
    var closeEditForm = document.querySelector("#aboutClose");
    var saveEditForm = document.querySelector("#aboutSave");
    // Orígenes modificables de esta sección
    var mainImg = document.querySelector("#about-info img");
    var mainCaption = document.querySelector("#about-info figcaption");
    var mainParagraph = document.querySelector("#about-info p");
    // Inputs con los que damos el nuevo estado para la sección
    var imgSource = document.querySelector("#imageSourceEdit");
    var name = document.querySelector("#portfolioNameEdit");
    var presentation = document.querySelector("#presentacionEdit");
    // Escondemos el botón de editar y mostramos el formulario
    origin.setAttribute("style", "display:none;");
    editForm.setAttribute("style", "display:block");
    // Damos el valor de los orígenes a los inputs (para dar una referencia)
    imgSource.value = mainImg.src;
    name.value = mainCaption.innerHTML;
    presentation.value = mainParagraph.innerHTML;
    /* Botón de cierre para el formulario */
    closeEditForm.addEventListener("mouseup", function () {
        editForm.setAttribute("style", "display:none");
        origin.setAttribute("style", "display:block;");
    });
    /* Botón para salvar los cambios */
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
    // Origin es la carta a editar y, editor, es la carta que contiene los elementos a modificar
    origin = origin.parentElement.parentElement.parentElement;
    var editor = document.getElementById("cardEditor");
    // (EXPERIMENTAL) 'yPosition' es la posición original de la carta a editar, se usa para llevar al editor hacia donde estaba el origen
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
    // Muestra todas las cartas ocultas
    document.querySelectorAll(".card").forEach(function (card) {
        card.setAttribute("style", "display: block;");
    });
    // Y, escondemos la original para mostrar el editor
    origin.setAttribute("style", "display: none;");
    editor.setAttribute("style", "bottom: ".concat(yPosition, "px;"));
    // Luego, actualizamos los valores del editor con los a valores a editar
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
    /* Boton de salvar cambios (acutalmente, Front-End) */
    editor.querySelector("button:last-child").addEventListener("mouseup", function () {
        origin.setAttribute("style", "display: block;");
        editor.setAttribute("style", "display: none;");
        originAreas[0].src = editAreas[0].value.trim();
        originAreas[1].innerHTML = editAreas[1].value.trim();
        originAreas[2].innerHTML = editAreas[2].value.trim();
        originAreas[3].innerHTML = editAreas[3].value.trim();
        originAreas[4].innerHTML = editAreas[4].value.trim();
        originAreas[5].href = editAreas[5].value.trim();
    });
}
function editEducation(origin) {
    // editor, elemento que donde se encuentra los inputs para modificar x elemento. origin es el elemento a modificar
    var editor = document.querySelector("#educationEditor");
    origin = origin.parentElement.parentElement.parentElement;
    // Inputs donde el usuario puede modificar el origen
    var textAreas = [
        editor.querySelector("textarea:first-child"),
        editor.querySelector("textarea:nth-child(2)"),
        editor.querySelector("textarea:nth-child(3)")
    ];
    // Elementos MODIFICABLES
    var originElements = [
        origin.querySelector("h4"),
        origin.querySelector("span"),
        origin.querySelector("a")
    ];
    // Mostramos todos los títulos. Y, al original lo escondemos
    document.querySelectorAll("#education li").forEach(function (list) {
        list.setAttribute("style", "display: block!important;");
    });
    origin.setAttribute("style", "display: none!important;");
    // Inicializamos el valor de los inputs con el elemento que se quiere modificar
    textAreas[0].value = originElements[0].innerHTML;
    textAreas[1].value = originElements[1].innerHTML;
    textAreas[2].value = originElements[2].href;
    /* Botón de cerrar */
    editor.querySelector("button:first-child").addEventListener("mouseup", function () {
        origin.setAttribute("style", "display: block!important;");
        editor.setAttribute("style", "display: none!important;");
    });
    /* Botón de salvar (En el Front-End) */
    editor.querySelector("button:last-child").addEventListener("mouseup", function () {
        origin.setAttribute("style", "display: block!important;");
        editor.setAttribute("style", "display: none!important;");
        originElements[0].innerHTML = textAreas[0].value.trim();
        originElements[1].innerHTML = textAreas[1].value.trim();
        originElements[2].href = textAreas[2].value.trim();
    });
}
function editSkills(origin) {
    // Array donde se encuentran los datos a editar
    var data = document.querySelectorAll("#skillsData .progress");
    // Tabla donde vamos a encontrar la plantilla editable de las skills
    var editor = document.querySelector("#skillsEditor");
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
        row.innerHTML = "\n            <td class=\"col-4\">".concat(data[x].children[0].innerHTML, "</td>\n            <td class=\"col-4\"> <input type=\"range\" min=\"0\" max=\"66\"/> </td>\n            <td class=\"col-4 w-100 d-flex justify-content-evenly\">\n                <button class=\"btn btn-primary\" data-id=\"").concat(x, "\">Save</button>\n                <button class=\"btn btn-danger\" data-id=\"").concat(x, "\">Delete</button>\n            </td>");
        fragment.appendChild(row);
    }
    tableBody.appendChild(fragment);
    /* Butón de salvar (Front-End) */
    document.querySelectorAll("#skillsEditor .btn-primary").forEach(function (button) {
        button.addEventListener("mouseup", function () {
            if (button instanceof HTMLElement) {
                var value = button.parentElement.previousElementSibling.children[0];
                value = value.value.trim();
                data[button.dataset["id"]].children[1].setAttribute("style", "width: ".concat(value, "%;"));
            }
        });
    });
    /* Botón de eliminar la skill */
    document.querySelectorAll("#skillsEditor .btn-warning").forEach(function (button) {
        button.addEventListener("mouseup", function () {
            if (button instanceof HTMLElement) {
                data[button.dataset["id"]].remove();
                button.parentElement.parentElement.remove();
            }
        });
    });
}
function editAbilities(origin) {
    // editor es el fromulario que permite modificar partes del carousel, SIN BORRAR NADA. Y carousel es la lista de elementos en el carousel
    var editor = document.querySelector("#proyectsEditor");
    var carousel = document.querySelectorAll(".carousel-item");
    var fragment = document.createDocumentFragment();
    // Mostramos y escondemos todo lo necesario
    origin.setAttribute("style", "display: none;");
    editor.setAttribute("style", "display: block;");
    // Por cada elemento en el carousel
    for (var i in carousel) {
        // Intentamos crear un set de edición para el mismo
        try {
            var div = document.createElement("div");
            div.className = "row";
            div.setAttribute("style", "border-bottom: 1px solid white;");
            // Con los valores de cada item del carousel
            div.innerHTML = "\n                <div class=\"col-8\">\n                    <textarea placeholder=\"NOMBRE DEL PROYECTO\" style=\"resize: none; margin: 10px 0; width: 100%;\">".concat(carousel[i].children[1].children[0].innerHTML, "</textarea>\n                    <textarea placeholder=\"DESCRIPCI\u00D3N DEL PROYECTO\" style=\"resize: none; margin: 10px 0; width: 100%;\">").concat(carousel[i].children[1].children[1].innerHTML, "</textarea>\n                    <textarea placeholder=\"URL DEL PROYECTO\" style=\"resize: none; margin: 10px 0; width: 100%;\">").concat(carousel[i].children[0].href, "</textarea>\n                    <textarea placeholder=\"URL DE LA IM\u00C1GEN\" style=\"resize: none; margin: 10px 0; width: 100%;\">").concat(carousel[i].children[0].children[0].src, "</textarea>\n\n                    <div class=\"projectsEditorButtons\" style=\"margin-bottom: 5px;\">\n                        <button data-id=\"").concat(i, "\" class=\"btn btn-primary w-100\">Save</button>\n                    </div>\n                </div>\n                <div class=\"col-4 d-flex justify-content-center align-items-sm-center\">\n                    <h5>").concat(carousel[i].children[1].children[0].innerHTML, "</h5>\n                </div>");
            fragment.appendChild(div);
        }
        catch (error) { }
    }
    // Al final del formulario, damos la posibilidad de cerrar el editor
    var closeButton = document.createElement("button");
    closeButton.className = "btn btn-warning w-100 mt-4";
    closeButton.innerHTML = "Close";
    // Agregamos todo al documento
    fragment.appendChild(closeButton);
    editor.appendChild(fragment);
    /* Botón para cerrar el editor */
    closeButton.addEventListener("mouseup", function () {
        editor.setAttribute("style", "display: none;");
        origin.setAttribute("style", "display: block;");
        editor.innerHTML = "";
    });
    /* Botón para salvar la edición de 'x' elemento del carousel (Front-End) */
    document.querySelectorAll(".projectsEditorButtons button").forEach(function (button) {
        button.addEventListener("mouseup", function () {
            var index;
            var container = button.parentElement.parentElement;
            if (button instanceof HTMLElement) {
                index = parseInt(button.dataset["id"]);
            }
            carousel[index].children[0].href = container.children[2].trim();
            carousel[index].children[0].children[0].src = container.children[3].trim();
            carousel[index].children[1].children[0].innerHTML = container.children[0].trim();
            carousel[index].children[1].children[1].innerHTML = container.children[1].trim();
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    main();
});
