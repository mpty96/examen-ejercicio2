import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleUpload = () => {
        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => console.error('Error al subir archivo:', error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log('Archivo disponible en:', url);
                    alert('Archivo subido exitosamente');
                });
            }
        );
    };

    return (
        <div className="container mt-5">
            <h1>Subir Archivo</h1>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control mb-3"
            />
            <button onClick={handleUpload} className="btn btn-primary">Subir Archivo</button>
            {progress > 0 && <p>Progreso: {progress.toFixed(2)}%</p>}
        </div>
    );
};

export default FileUpload;
