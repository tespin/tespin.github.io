interface ProjectCardProps {
  className?: string;
  children?: React.ReactNode;
  project: {
    title: string;
    date: string;
    brief: string;
    id: string;
  };
}

const ProjectCard = ({ className, children, project }: ProjectCardProps) => {
  return (
    <li className={className}>
      <h2>{project.title}</h2>
      <p>{project.date}</p>
      <p>{project.brief}</p>
    </li>
  );
};

export default ProjectCard;
