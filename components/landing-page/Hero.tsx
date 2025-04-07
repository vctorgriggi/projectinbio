import ProjectCard from '../commons/ProjectCard';
import TotalVisits from '../commons/TotalVisits';
import UserCard from '../commons/user-card/UserCard';
import CreateNow from '../ui/CreateNow';

export default function Hero() {
  return (
    <div className="flex h-screen">
      <div className="mt-[35vh] flex w-full flex-col gap-2">
        <h1 className="text-5xl leading-[64px] font-bold text-white">
          Seus projetos e redes sociais em um único link
        </h1>
        <h2 className="text-xl leading-6">
          Crie sua própria página de projetos e compartilhe eles com o mundo.
          <br />
          Acompanhe o engajamento com Analytics de cliques
        </h2>
        <CreateNow />
      </div>
      <div className="flex w-full items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          <UserCard />
          <div className="absolute -right-[45%] -bottom-[7%]">
            <TotalVisits totalVisits={1899} />
          </div>
          <div className="absolute top-[20%] -left-[45%] -z-10">
            <ProjectCard
              name="Projeto 1"
              description="Descrição do projeto 1"
              img="project1.jpg"
            />
          </div>
          <div className="absolute -top-[5%] -left-[55%] -z-10">
            <ProjectCard
              name="Projeto 2"
              description="Descrição do projeto 2"
              img="project1.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
