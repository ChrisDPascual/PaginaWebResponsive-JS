import { crearTabla,refrescarDiv,elFiltrador,filtrarDebilidades,filtrarMiedos,filtrarTipos} from "./tabla.js";
import { validarNumero,validarTexto,validarTipo,postMonstruo,updateMonstruo,deleteMonstruo,getterTabla } from "./miBiblioteca.js";


const tipos =  ["esqueleto","zombie","vampiro","fantastma","bruja","hombre lobo"]; 
const loader = document.getElementById("gif");
const menuDesplegable = document.getElementById("filtrador");
const btnAbrirMenuDesplegable = document.getElementById("botonAbrirMenu");
const body = document.getElementById("body");
const btnAbrirForm = document.getElementById("btnAbrirForm");
const formulario = document.getElementById("formulario");
const seleccionarTipo = document.getElementById("tipoMonstruo");
const rangeFormMiedo = document.getElementById("formMiedo");
const valorFMiedo = document.getElementById("valorFormMiedo");
const TextBusquedaMiedo = document.getElementById("valorMiedoBusqueda");
const rangeBusquedaMiedo = document.getElementById("filtroMiedo");
const btnCerrarForm = document.getElementById("btnSalirForm");
const nombreForm = document.getElementById("nombreMonstruo");
const aliasForm = document.getElementById("aliasMonstruo");
const tipoForm = document.getElementById("tipoMonstruo");
const debilidadFormPlata = document.getElementById("seleccionDebilidad1");
const debilidadFormEstaca = document.getElementById("seleccionDebilidad2");
const debilidadFormCrucifijo = document.getElementById("seleccionDebilidad3");
const debilidadFormPocion = document.getElementById("seleccionDebilidad4");
const divTabla = document.getElementById("divTabla");
const btnLimpiarBusqueda = document.getElementById("btnLimpiarFiltro");
const filtrarDebilidad =document.getElementById("filtroDebilidad");
const filtroMonstruo = document.getElementById("filtroMonstruo");
const checkNombreAZ = document.getElementById("ordenarNombre1");
const checkNombreZA = document.getElementById("ordenarNombre2");
const checkAliasAZ = document.getElementById("ordenarAlias1");
const checkAliasZA = document.getElementById("ordenarAlias2");
const btnBuscar = document.getElementById("btnBusqueda");
const btnGuardarForm = document.getElementById("btnGuardar");
const btnLimpiarForm = document.getElementById("btnLimpiar");
let valorID;



window.addEventListener("load",()=>{
    crearTabla();
 });

rangeFormMiedo.addEventListener("input",()=>{
    valorFMiedo.textContent= rangeFormMiedo.value.toString();
});

rangeBusquedaMiedo.addEventListener("input",()=>{
    TextBusquedaMiedo.textContent= rangeBusquedaMiedo.value.toString();
});

btnAbrirMenuDesplegable .addEventListener("click",()=>{
    body.classList.toggle("body_activo");

    if(menuDesplegable.style.display === 'inactivo' || menuDesplegable.style.display === ''){
        menuDesplegable.classList.toggle('activo');
    }
    else{
        menuDesplegable.classList.toggle('inactivo');
    }
});

btnAbrirForm.addEventListener("click",()=>{
    formulario.showModal();
    btnGuardarForm.textContent = "guardar";
    btnLimpiarForm.textContent ="limpiar";

    limpiarFormulario()
    tipos.forEach(function(opcion){
        var option = document.createElement("option");
        option.value = opcion;
        option.text = opcion.substring(0, 1).toUpperCase() + opcion.substring(1);
        seleccionarTipo.appendChild(option);
    });
});

btnCerrarForm.addEventListener("click",()=>{
    limpiarFormulario();
    formulario.close();
});

btnLimpiarBusqueda.addEventListener("click",()=>{
    limpiarMenuDesplegable();
    refrescarDiv(divTabla,crearTabla());
});

btnBuscar.addEventListener("click",()=>{
    let fTipo = false;
    let fDebilidad = false;
    let fNombre = false;;
    let fAlias = false;;
    let fMiedo = false;

    if(filtroMonstruo.value != "todos"){
        fTipo = true;
    }

    if(filtrarDebilidad.value != "todas"){
        fDebilidad = true;
    }

    if(rangeBusquedaMiedo.value<10){
        fMiedo = true;
    }

    if(!(checkNombreAZ.checked === false && checkNombreZA.checked === false)){
        fNombre = true;
    }

    if(!(checkAliasAZ.checked === false && checkAliasZA.checked === false)){
        fAlias = true;
    }

    if(fTipo === true || fDebilidad === true || fNombre === true || fAlias === true || fMiedo === true){
       loader.style.display = "block";
       refrescarDiv(divTabla,elFiltrador(fTipo,fDebilidad,fNombre,fAlias,fMiedo));
    }
});

checkNombreAZ.addEventListener('change', function() {
    if (this.checked){
        checkNombreZA.checked = false;
    }
});

checkNombreZA.addEventListener('change', function() {
    if (this.checked){
        checkNombreAZ.checked = false;
    }
});

checkAliasAZ.addEventListener('change', function() {
    if (this.checked){
        checkAliasZA.checked = false;
    }
});

checkAliasZA.addEventListener('change', function() {
    if (this.checked){
        checkAliasAZ.checked = false;
    }
});

btnGuardarForm.addEventListener("click",()=>{

    let id = valorID;
    let n;
    let t;
    let a;
    let m;
    let d;
    let verificacion = true;
    let mensaje = [];
    let alerta;
    let error ="";


    if(validarTexto(nombreForm.value)){
        n = nombreForm.value;
    }
    else{
        alerta = "nombre";
        verificacion = false;
        mensaje.push(alerta);
        
    }

    if(validarTexto(aliasForm.value)){
        a = aliasForm.value;
    }
    else{
        alerta = "alias";
        verificacion = false;
        mensaje.push(alerta);
    }

    if(validarNumero(rangeFormMiedo.value)){
        m = rangeFormMiedo.value;
    }
    else{
        alerta = "miedo";
        verificacion = false;
        mensaje.push(alerta);
    }

    if(validarTipo(tipoForm.value))
    {
        t = tipoForm.value;
    }
    else
    {
        alerta = "tipo";
        verificacion = false;
        mensaje.push(alerta);
    }

    if(debilidadFormCrucifijo.checked == true || debilidadFormEstaca.checked == true ||
        debilidadFormPlata.checked == true || debilidadFormPocion.checked == true) 
    {
        if(debilidadFormCrucifijo.checked == true){
            d = "crucifijo";
        }
        if(debilidadFormEstaca.checked == true){
            d = "estaca";
        }
        if(debilidadFormPlata.checked == true){
            d="plata";
        }
        if(debilidadFormPocion.checked == true){
            d="pocion";
        }
        
    }
    else
    {
        alerta = "debilidad";
        verificacion = false;
        mensaje.push(alerta);
    }

    
    if(verificacion === true)
    {
        if(btnGuardarForm.textContent === "guardar")
        {
            window.alert("monstruo cargado exitosamente");
            formulario.close(); 
            postMonstruo(n,t,d,a,parseInt(m));
            refrescarDiv(divTabla,crearTabla());    
        }
        else
        {
            if(btnGuardarForm.textContent === "modificar"){
                if(mostrarConfirmacion()===true){
                    let id = valorID;
                    window.alert("monstruo modificado exitosamente");
                    formulario.close();   
                    updateMonstruo(id,n,t,d,a,parseInt(m));
                    refrescarDiv(divTabla,crearTabla());
                }
                else{
                    window.alert("modificacion cancelada");
                }
            } 
        }
    }
    else
    {
        console.log(mensaje.length);
        for(let i = 0; i < mensaje.length; i++){
            console.log();
            if( i+1 === mensaje.length)
            {
                error = error+mensaje[i]+".";
            }
            else
            {
                error = error+mensaje[i]+", ";
            }
        };
        window.alert("Error al cargar los datos del formulario.\nRevisar "+error);
    }
    
});


divTabla.addEventListener("click",function(event){
    event.preventDefault();
    const filaClickeada = event.target.closest('tr');
    limpiarFormulario();
    if(filaClickeada)
    {
        let debilidad = filaClickeada.cells[3].innerText;
        tipos.forEach(function(opcion){
            var option = document.createElement("option");
            option.value = opcion;
            option.text = opcion.substring(0, 1).toUpperCase() + opcion.substring(1);
            seleccionarTipo.appendChild(option);
        });
        console.log(debilidad);
        valorID = filaClickeada.cells[0].innerText;
        nombreForm.value = filaClickeada.cells[1].innerText;
        tipoForm.value = filaClickeada.cells[2].innerText;
        aliasForm.value = filaClickeada.cells[4].innerText;
        rangeFormMiedo.value = filaClickeada.cells[5].innerText;
        valorFMiedo.textContent = filaClickeada.cells[5].innerText;

        if(debilidad == "estaca"){
            debilidadFormEstaca.checked = true;
        }

        if(debilidad == "crucifijo"){
            debilidadFormCrucifijo.checked = true;
        }

        if(debilidad == "pocion"){
            debilidadFormPocion.checked = true;
        }

        if(debilidad == "plata"){
            debilidadFormPlata.checked = true;
        }

        btnGuardarForm.textContent = "modificar";
        btnLimpiarForm.textContent ="eliminar";
        formulario.showModal();
    }

});

btnLimpiarForm.addEventListener("click",()=>{

    if(btnLimpiarBusqueda.textContent === "limpiar"){
        limpiarFormulario();
    }
    else{
        if(btnLimpiarForm.textContent === "eliminar"){
            if(mostrarConfirmacion() === true){
                window.alert("monstruo Eliminado exitosamente");
                deleteMonstruo(valorID);
                refrescarDiv(divTabla,crearTabla()); 
            }
            else{
                window.alert("Operacion cancelada");
            }
        }
    }
});

function limpiarFormulario()
{
    nombreForm.value = "";
    aliasForm.value = "";
    while (tipoForm.options.length > 0) {
        tipoForm.remove(0);
    }
    rangeFormMiedo.value = 10;
    valorFMiedo.textContent = "10";
    debilidadFormCrucifijo.checked = false;
    debilidadFormEstaca.checked = false;
    debilidadFormPlata.checked = false;
    debilidadFormPocion.checked = false;
}

function limpiarMenuDesplegable()
{
    filtrarDebilidad.value = "todas";
    filtroMonstruo.value = "todos";
    checkNombreAZ.checked = false;
    checkNombreZA.checked = false;
    checkAliasAZ.checked = false;
    checkAliasZA.cheked = false; 
    TextBusquedaMiedo.textContent= 10; 
    rangeBusquedaMiedo.value = 10;
}

function mostrarConfirmacion(){
    const respuesta = confirm('¿Estás seguro que deseas continuar?');
  
    if (respuesta === true){
      return true;
    } 
    else{
        return false;
    }
}