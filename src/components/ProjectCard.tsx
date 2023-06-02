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
    <li className='border border-black px-6 py-2 w-96'>
      <h2 className='text-2xl'>{project.title}</h2>
      <p>{project.date}</p>
      <p className='mt-4'>{project.brief}</p>
    </li>
  );
};

export default ProjectCard;
