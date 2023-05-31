import ProjectCard from './ProjectCard';

interface ProjectListProps {
  className?: string;
  projects: {
    title: string;
    date: string;
    brief: string;
  }[];
}

const ProjectList = ({ className, projects }: ProjectListProps) => {
  return (
    <ul className={className}>
      {projects.map((item, index) => {
        return <ProjectCard project={item}></ProjectCard>;
      })}
    </ul>
  );
};

export default ProjectList;
