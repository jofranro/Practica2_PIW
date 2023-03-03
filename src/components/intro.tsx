import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

//Practica 2. Grid, Css. Tabla, añadir con boton se añade a la tabla, y boton borrar para borrar de la tabla.
//Plus añadir columnas y plus de editar los que hay en la tabla.

type InputProps = {
    error: boolean;
}
const Input = styled.input<InputProps>`
    background-color: ${(props) => (props.error ? "red" : "white")};
    color: ${(props) => (props.error ? "white" : "black")};
`;   

const Intro = () => {

    const [nombre, setNombre] = useState<string>("");
    const [dni, setDni] = useState<string>("");
    const [tabla, setTabla] = useState<string[][]>([]);

    const dniRegex = new RegExp("^[0-9]{8}[A-Z]$");
    const nombreRegex = new RegExp("^[A-Z]{1}[a-z]{1,}$");

    const [dniError, setDniError] = useState<boolean>(false);
    const [nombreError, setNombreError] = useState<boolean>(false);

    return (
        <>
            <h1 className="title">Practica 2 - Jose Francisco Romero Rodríguez</h1>

            <div className="form">
                NOMBRE: {" "}
                <Input error={nombreError}
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)}
                    onBlur={(e) => {
                        if(!nombreRegex.test(nombre)) {
                            setNombreError(true);
                        } else {
                            setNombreError(false);
                        }
                    }}
                />{" "}
                DNI:{" "}
                <Input error={dniError}
                    type="text" 
                    value={dni} 
                    onChange={(e) => setDni(e.target.value)} 
                    onBlur={(e) => {
                        if(!dniRegex.test(dni)) {
                            setDniError(true);
                        } else {
                            setDniError(false);
                        }
                    }}
                />{" "}

                <button onClick={(e) => {
                   
                    if(!nombreRegex.test(nombre)) {
                        alert("Nombre no válido");
                        return;
                    }
                    if(!dniRegex.test(dni)) {
                        alert("DNI no válido");
                        return;
                    }
                    if(nombre === "" || dni === "") {
                        alert("No puedes dejar campos vacios");
                        return;
                    }
                    if(tabla.some((e) => e[1] === dni)) {
                        alert("Dni ya existente");
                        return;
                    }
                    setTabla([...tabla, [nombre, dni]]);
                    setNombre("");
                    setDni("");
                }}>Añadir</button>

            </div>
   
            <div className="grid-container">
                <div className="grid-field">NOMBRE</div>
                <div className="grid-field">DNI</div>
                <div></div>
                <div></div>

                {tabla.map((row) => {
                return (
                    <>
                        <div className="grid-item">{row[0]}</div>
                        <div className="grid-item">{row[1]}</div>
                        <div>{row[2]}
                            <button className="borrar" onClick={() => {
                                setTabla(tabla.filter((e) => e[0] !== row[0]));
                            } }>
                                <img className='foto' src="/borrar.png"></img>
                            </button>
                        </div>
                        <div>{row[3]}
                            <button className="editar" onClick={() => {
                                if(!nombreRegex.test(nombre)) {
                                    alert("Nombre no válido");
                                    return;
                                }
                                if(!dniRegex.test(dni)) {
                                    alert("DNI no válido");
                                    return;
                                }
                                if(nombre === "" || dni === "") {
                                    alert("No puedes dejar campos vacios");
                                    return;
                                }
                                setTabla(tabla.map((e) => {
                                    if(e[0] === row[0]) {
                                        e[0] = nombre;
                                        e[1] = dni;
                                    }
                                    return e;
                                }));
                                setNombre("");
                                setDni("");
                            }}>
                                <img className='foto' src="/editar.png"></img>
                            </button>
                        </div>
                    </>
                )
                })}

                {tabla.length === 0 && (
                    <div className="grid-item">No hay datos</div>
                )}
            </div>      
        </>
    );
}

export default Intro;