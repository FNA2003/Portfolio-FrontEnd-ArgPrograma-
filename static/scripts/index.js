/*

    Hola, lector de mi código, saludos.

   Al modificar la página solo lo hará en el front-end

*/
function main() {
    // Botones y el estado de los mismos para el logeo
    var logIn = document.querySelector("#logIn");
    var logOut = document.querySelector("#logOut");
    var loggedIn = false;
    // El elemento que permite logearse
    var form = document.getElementById("hiddenForm");
    // Primero, el superusario se deberá logear cada vez que entra a la página
    logOut.setAttribute("style", "display:none;");
    /* Agregamos las funciones para cada botón (logicamente cuando se avance en el curso
    se logeara realmente) y, modificamos el estado interno del loggeo */
    logIn.addEventListener("mouseup", function () { loggedIn = showForm(logIn, logOut, form); });
    logOut.addEventListener("mouseup", function () { loggedIn = exitAccount(logIn, logOut); });
    document.querySelector("#closeForm").addEventListener("mouseup", function () { closeForm(form); });
    return 0;
}
function showForm(buttonIn, buttonOut, form) {
    /* Por ahora, "showForm" muestra el formulario y cambia el estado
    de los botones de loggeo */
    form.setAttribute("style", "display: block;");
    buttonIn.setAttribute("style", "display:none;");
    buttonOut.setAttribute("style", "display:block;");
    document.querySelectorAll(".editButton").forEach(function (button) {
        button.setAttribute("style", "display:block;");
        if (button instanceof HTMLElement) {
            switch (button.dataset.meant) {
                case "about":
                    button.addEventListener("mouseup", function () { editAbout(button); });
                    break;
                default:
                    break;
            }
        }
    });
    return true;
}
function closeForm(form) {
    /* Simplemente, esconder el formulario */
    form.setAttribute("style", "display: none;");
}
function exitAccount(buttonIn, buttonOut) {
    /* Por ahora, "exitAccount" cambia de estado los botones */
    buttonIn.setAttribute("style", "display:block;");
    buttonOut.setAttribute("style", "display:none;");
    return false;
}
function editAbout(origin) {
    origin.setAttribute("style", "display:none;");
    var editForm = document.querySelector("#editAbout");
    editForm.setAttribute("style", "display:block");
    var closeEditForm = document.querySelector("#aboutClose");
    var saveEditForm = document.querySelector("#aboutSave");
    closeEditForm.addEventListener("mouseup", function () {
        editForm.setAttribute("style", "display:none");
        origin.setAttribute("style", "display:block;");
    });
    saveEditForm.addEventListener("mouseup", function () {
        var imgSource = document.querySelector("#imageSourceEdit");
        var name = document.querySelector("#portfolioNameEdit");
        var presentacion = document.querySelector("#presentacionEdit");
        imgSource = imgSource.value.trim();
        name = name.value.trim();
        presentacion = presentacion.value.trim();
        document.querySelector("#about-info img").src = imgSource;
        document.querySelector("#about-info figcaption").innerHTML = name;
        document.querySelector("#about-info p").innerHTML = presentacion;
        closeEditForm.click();
    });
}
document.addEventListener("DOMContentLoaded", function () {
    main();
});
