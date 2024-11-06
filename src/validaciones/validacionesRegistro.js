export function validarCorreo(correo) {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo)) return "El correo no es válido.";
  return null;
}

export function validarContrasena(contrasena) {
  const errores = [];
  if (contrasena.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");
  if (!/[A-Z]/.test(contrasena)) errores.push("La contraseña debe contener al menos una letra mayúscula.");
  if (!/[0-9]/.test(contrasena)) errores.push("La contraseña debe contener al menos un número.");
  return errores;
}

export function confirmarContrasena(contrasena, confirmacion) {
  if (contrasena !== confirmacion) return "Las contraseñas no coinciden.";
  return null;
}

export function validarNombre(nombre) {
  const regexNombre = /^[a-zA-Z\s]+$/;
  if (!nombre) return "El nombre es obligatorio.";
  if (!regexNombre.test(nombre)) return "El nombre solo debe contener letras y espacios.";
  if (nombre.length < 2) return "El nombre debe tener al menos dos caracteres.";
  return null;
}

export function validarFechaNacimiento(fecha) {
  if (!fecha) return "La fecha de nacimiento es obligatoria.";
  
  const fechaNacimiento = new Date(fecha);
  const hoy = new Date();
  
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  const dia = hoy.getDate() - fechaNacimiento.getDate();

  if (edad < 18 || (edad === 18 && (mes < 0 || (mes === 0 && dia < 0)))) {
    return "Debes ser mayor de 18 años.";
  }
  return null;
}

export function validarGenero(genero) {
  if (!genero) return "El género es obligatorio.";
  return null;
}

export function validarTelefono(telefono) {
  const regexTelefono = /^[0-9]{10}$/;
  if (!telefono) return "El teléfono es obligatorio.";
  if (!regexTelefono.test(telefono)) return "El teléfono debe tener 10 dígitos.";
  return null;
}
