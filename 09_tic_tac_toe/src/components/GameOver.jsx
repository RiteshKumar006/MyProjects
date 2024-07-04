

const GameOver = ({onRestart}) =>{
    return (
        <div className="game-over">
                <h3>Game Over</h3>
                <button onClick={onRestart}>Restart Game</button>
        </div>
    )
}

export default GameOver