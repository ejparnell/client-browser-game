import { games } from './game-data/games'
import { GameCard } from './GameCard'

export function GamesHome() {

    return (
        <div>
            <h1>Games</h1>
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    game={game}
                />
            ))}
        </div>
    )
}