import FlexContainer from './FlexContainer';
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
    // <li className='border border-black mx-4 px-6 py-2 max-w-sm'>
    <li className='mx-4 px-6 py-2 w-96 border border-black'>
      <h2 className='text-2xl'>{project.title}</h2>
      <p>{project.date}</p>
      <p className='mt-4'>{project.brief}</p>
      {project.github || project.live ? (
        <FlexContainer className='xs:mt-4 xs:space-x-2 '>
          {project.github && (
            <a href={`${project.github}`}>
              <GitHubLogoIcon width={'1.25rem'} height={'1.25rem'} />
            </a>
          )}
          {project.live && (
            <a href={`${project.live}`}>
              <ExternalLinkIcon width={'1.25rem'} height={'1.25rem'} />
            </a>
          )}
        </FlexContainer>
      ) : null}
    </li>
  );
};

export default ProjectCard;
