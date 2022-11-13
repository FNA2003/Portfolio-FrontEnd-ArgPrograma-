/*

    Hola, lector de mi código, saludos.

   Al modificar la página solo lo hará en el front-end

*/


function main():number {
    // Botones y el estado de los mismos para el logeo
    let logIn:Element = document.querySelector("#logIn");
    let logOut:Element = document.querySelector("#logOut");
    let loggedIn:boolean = false;

    // El elemento que permite logearse
    let form:Element = document.getElementById("hiddenForm");

    // Primero, el superusario se deberá logear cada vez que entra a la página
    logOut.setAttribute("style", "display:none;")
    /* Agregamos las funciones para cada botón (logicamente cuando se avance en el curso
    se logeara realmente) y, modificamos el estado interno del loggeo */
    logIn.addEventListener("mouseup", () => { loggedIn = showForm(logIn, logOut, form) });
    logOut.addEventListener("mouseup", () => { loggedIn = exitAccount(logIn, logOut); })
    document.querySelector("#closeForm").addEventListener("mouseup", () => { closeForm(form); })

    return 0;
}

function showForm(buttonIn:Element, buttonOut:Element, form:Element):boolean {
    /* Por ahora, "showForm" muestra el formulario y cambia el estado
    de los botones de loggeo */
    form.setAttribute("style", "display: block;");  

    buttonIn.setAttribute("style", "display:none;");
    buttonOut.setAttribute("style", "display:block;");

    document.querySelectorAll(".editButton").forEach(button => {
        button.setAttribute("style", "display:block;");
        if (button instanceof HTMLElement) {
            switch(button.dataset.meant){
                case "about":
                    button.addEventListener("mouseup", () => {editAbout(button);} );
                    break;
                default:
                    break;
            }
        }
        
    });

    return true;
}

function closeForm(form:Element):void {
    /* Simplemente, esconder el formulario */
    form.setAttribute("style", "display: none;");
}

function exitAccount(buttonIn:Element, buttonOut:Element):boolean  {
    /* Por ahora, "exitAccount" cambia de estado los botones */    
    buttonIn.setAttribute("style", "display:block;");
    buttonOut.setAttribute("style", "display:none;");

    return false;
}


function editAbout(origin):void {
    origin.setAttribute("style", "display:none;");

    let editForm:Element = document.querySelector("#editAbout");    
    editForm.setAttribute("style", "display:block");

    let closeEditForm:Element = document.querySelector("#aboutClose");
    let saveEditForm:Element = document.querySelector("#aboutSave");

    closeEditForm.addEventListener("mouseup", () => {
        editForm.setAttribute("style", "display:none");
        origin.setAttribute("style", "display:block;");
    });

    saveEditForm.addEventListener("mouseup", () => {
        let imgSource:any = document.querySelector("#imageSourceEdit") as HTMLInputElement;
        let name:any = document.querySelector("#portfolioNameEdit")as HTMLInputElement;
        let presentacion:any = document.querySelector("#presentacionEdit") as HTMLInputElement;

        imgSource = imgSource.value.trim();
        name = name.value.trim();
        presentacion = presentacion.value.trim();

        document.querySelector("#about-info img").src = imgSource;
        document.querySelector("#about-info figcaption").innerHTML = name;
        document.querySelector("#about-info p").innerHTML = presentacion;
    })
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});