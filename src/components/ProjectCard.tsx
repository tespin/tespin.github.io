import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons';

interface ProjectCardProps {
  className?: string;
  children?: React.ReactNode;
  project: {
    title: string;
    date: string;
    brief: string;
    github?: string;
    live?: string;
    id: string;
  };
}

const ProjectCard = ({ className, children, project }: ProjectCardProps) => {
  return (
    <li className='border border-black mx-4 px-6 py-2 max-w-sm'>
      <h2 className='text-2xl'>{project.title}</h2>
      <p>{project.date}</p>
      <p className='mt-4'>{project.brief}</p>
      {project.github || project.live ? (
        <div className='flex xs:flex-row mt-4 space-x-2'>
          {project.github && (
            <a href={`${project.github}`}>
              <GitHubLogoIcon width={'1.13rem'} height={'1.13rem'} />
            </a>
          )}
          {project.live && (
            <a href={`${project.live}`}>
              <ExternalLinkIcon width={'1.13rem'} height={'1.13rem'} />
            </a>
          )}
        </div>
      ) : null}
    </li>
  );
};

export default ProjectCard;
