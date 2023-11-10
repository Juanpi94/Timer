const boton = document.getElementById('agregar');
const botonesEliminar = document.querySelectorAll('.eliminar');
const contenedor = document.querySelector('.container');

boton.addEventListener('click', () => {
	const nuevoElemento = document.createElement('div');
	nuevoElemento.classList.add('item');
	nuevoElemento.innerHTML = `
		<h2>Elemento ${contenedor.children.length + 1}</h2>
		<p>Contenido del elemento ${contenedor.children.length + 1}</p>
        <button class="eliminar">Eliminar</button>
	`;
	contenedor.appendChild(nuevoElemento);
});

botonesEliminar.forEach(boton => {
	boton.addEventListener('click', () => {
		const elementoAEliminar = boton.parentNode;
		contenedor.removeChild(elementoAEliminar);
	});
});