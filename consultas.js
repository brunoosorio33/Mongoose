import mongoose from "mongoose";
import dotenv from "dotenv";
import Curso from "./models/curso.js";

// Cargar las variables definidas en el .env, como la uri de conexion a MongoDB.
dotenv.config();


async function ejecutarConsultas() {
    try {
        // Establecer la conexión con la base de datos MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("==== Laboratorio de consultas ====");

        // Consulta 1: Combinar dos condiciones de igualdad.
        // Ambas deben cumplirse.
        const cursosFrontend = await Curso.find({
            categoria: "Frontend",
            publicado: true
        });

        console.log(
            "1.- Cursos de Frontend publicados:",
            cursosFrontend.length
        );

        // Consulta 2: $lte significa "menor o igual que".
        // select() limita los campos que queremos obtener.
        // El prefijo - excluye el campo indicado.
        const cursosEconomicos = await Curso.find({
            precio: { $lte: 50 }
        }).select("codigo titulo precio -_id");

        console.log(
            "\n2.- Cursos de 50 USD o menos (solo código, título y precio):"
        );
        console.table(
            cursosEconomicos.map((c) => c.toObject())
        );

    } catch (error) {
        console.error("Error en las consultas:", error.message);

    } finally {
        await mongoose.disconnect();
        console.log("Se ha desconectado de MongoDB");
    }
}

ejecutarConsultas();


