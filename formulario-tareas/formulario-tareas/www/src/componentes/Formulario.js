import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

const Formulario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        fecha: '',
    });
    const [mensaje, setMensaje] = useState('');
    const validator = useRef(new SimpleReactValidator());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar los campos
        if (validator.current.allValid()) {
            try {
                // Guardar los datos en Firestore
                const docRef = await addDoc(collection(db, 'tareas'), formData);
                setMensaje(`Tarea añadida correctamente con ID: ${docRef.id}`);

                // Limpiar el formulario
                setFormData({
                    nombre: '',
                    fecha: '',
                });
                validator.current.hideMessages();
            } catch (error) {
                setMensaje('Error al guardar la tarea: ' + error.message);
            }
        } else {
            validator.current.showMessages();
            setMensaje('Por favor, corrige los errores antes de enviar.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Formulario de Tareas</h1>

            {mensaje && <div className="alert alert-info">{mensaje}</div>}

            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre de la tarea:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {validator.current.message('nombre', formData.nombre, 'required|alpha_space')}
                </div>

                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha límite:</label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {validator.current.message('fecha', formData.fecha, 'required|date')}
                </div>

                <button type="submit" className="btn btn-primary w-100">Guardar Tarea</button>
            </form>
        </div>
    );
};

export default Formulario;
