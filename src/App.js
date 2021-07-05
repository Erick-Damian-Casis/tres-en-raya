import './App.css';
import {useState} from "react";
import classNames from "classnames";

//Grado II
const Cuadrados = ({ value, onClick, turno, ganador}) => {

    const handleClick = () => {
        (turno !== null && value === null) && onClick();
    }

    let cuadroClass = classNames({
        square: true,
        [`square--${value}`]: value !== null,
        ganador: ganador,
    });

    return (
        <div className={cuadroClass} onClick={() => handleClick()}>
        </div>
    )
}


//Grado I
const Tabla = ({cuadricula, onClick, turno, cuadrosGanadores }) => {
  
  const createSquares = values => (
      values.map( value => (
          <Cuadrados
              ganador={cuadrosGanadores.includes(value)}
              turno={turno}
              onClick={() => onClick(value)}
              value={cuadricula[value]}
              key={`square_${value}`}
          />
      ))
  );

  return (
      <div className="board">
          <div className="row">
             {createSquares([0,1,2])}
          </div>
          <div className="row">
              {createSquares([3,4,5])}
          </div>
          <div className="row">
              {createSquares([6,7,8])}
          </div>
      </div>
  );
}

//Padre
const App = () => {

  const [turno, setTurno] = useState('X');
  const [cuadricula, setCuadricula] = useState(Array(9).fill(null));
  const [cuadrosGanadores, setCuadrosGanadores] = useState([]);

  const reseteo = () => {
    setTurno('X');
    setCuadricula(Array(9).fill(null));
    setCuadrosGanadores([]);
  }

  const comprobarGanador = nuevosCuadrados => {
    for(let i = 0; i < posicionesGanadoras.length; i++) {
      const [a,b,c] = posicionesGanadoras[i];
      if(nuevosCuadrados[a] && nuevosCuadrados[a] === nuevosCuadrados[b] && nuevosCuadrados[a] === nuevosCuadrados[c]) {
        finDelJuego(nuevosCuadrados[a], posicionesGanadoras[i]);
        return
      }
    }

    if(!nuevosCuadrados.includes(null)) {
      finDelJuego(null, Array.from(Array(10).keys()));
      return
    }
    setTurno(turno === 'X' ? 'O' : 'X');
  }

  const handleClick = cuadro => {
    let nuevoCuadro = [...cuadricula];
    nuevoCuadro.splice(cuadro, 1, turno);
    setCuadricula(nuevoCuadro);
    comprobarGanador(nuevoCuadro);
  }

  const finDelJuego = (posicionesGanadoras) => {
    setTurno(null);
    
    setCuadrosGanadores(posicionesGanadoras);
    setTimeout(reseteo, 5000);
  }

  return (
    <div className="container">
      <Tabla cuadrosGanadores={cuadrosGanadores} turno={turno} cuadricula={cuadricula} onClick={handleClick}/>
    </div>
  );
}



const posicionesGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


export default App;