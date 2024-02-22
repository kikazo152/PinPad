Configuración del PIN

Para garantizar el correcto funcionamiento de la aplicación, sigue estos pasos:

1. **Establecer un PIN:**
   - En la primera fase, introduce un PIN de 6 dígitos.
   - El PIN se almacenará en el `localStorage`.

2. **Inicio de sesión automático:**
   - Una vez ingresado el PIN, se crea una cookie para mantener la sesión iniciada durante 10 segundos.

3. **Experiencia sin reingreso del PIN:**
   - Cuando vuelvas a iniciar la página dentro del periodo de la sesión (10 segundos), no será necesario ingresar el PIN nuevamente.

4. **Reinicio después de 10 segundos:**
   - Después de 10 segundos, al refrescar la página, volverás a la segunda fase de la aplicación.