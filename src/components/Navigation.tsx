import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="bg-dark-lighter py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold text-neon-cyan">
            DarkScore
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="text-white hover:text-neon-cyan transition-colors">
              Previsões
            </Link>
            <Link to="/historical" className="text-white hover:text-neon-cyan transition-colors">
              Histórico
            </Link>
            <Link to="/upcoming" className="text-white hover:text-neon-cyan transition-colors">
              Próximos Jogos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};