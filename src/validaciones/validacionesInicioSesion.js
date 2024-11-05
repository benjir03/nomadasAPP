

export function validarCorreo(correo) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo) ? '' : 'Ingresa un correo válido.';
  }
  
  export function validarContrasena(contrasena) {
    const erroresContrasena = [];
  
    if (contrasena.length < 8) {
      erroresContrasena.push('La contraseña debe tener al menos 8 caracteres.');
    }
    if (!/[A-Z]/.test(contrasena)) {
      erroresContrasena.push('La contraseña debe incluir al menos una letra mayúscula.');
    }
    if (!/[a-z]/.test(contrasena)) {
      erroresContrasena.push('La contraseña debe incluir al menos una letra minúscula.');
    }
    if (!/[0-9]/.test(contrasena)) {
      erroresContrasena.push('La contraseña debe incluir al menos un número.');
    }
    if (!/[!@#$%^&*]/.test(contrasena)) {
      erroresContrasena.push('La contraseña debe incluir al menos un carácter especial.');
    }
  
    return erroresContrasena.length > 0 ? erroresContrasena : '';
  }
  