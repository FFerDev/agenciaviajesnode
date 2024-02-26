import { Testimonial } from "../models/Testimonios.js";

const guardarTestimonial = async (req, res) =>{

    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if (nombre.trim() ==="") {
        errores.push({mensaje: 'el nombre esta vacio'});
    }
    if (correo.trim() ==="") {
        errores.push({mensaje: 'el correo esta vacio'});
    }
    if (mensaje.trim() ==="") {
        errores.push({mensaje: 'el mensaje esta vacio'});
    }
    if (errores.length > 0) {
        // mostrar la vista con errores
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
           pagina: "Testimoniales",
           errores,
           nombre,
           correo,
           mensaje,
           testimoniales
        })
    }else{
        // almacenar la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}