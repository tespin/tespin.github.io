import { useState, useEffect } from 'react';
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
  const [data, setData] = useState<
    { title: string; date: string; brief: string; id: string }[]
  >([]);

  const dataWithId = projects.map((item) => {
    return {
      ...item,
      id: crypto.randomUUID(),
    };
  });

  useEffect(() => {
    const newData = dataWithId;
    setData(newData);
  }, []);

  return (
    <ul className={className}>
      {data.map((item, index) => {
        return <ProjectCard project={item} key={item.id}></ProjectCard>;
      })}
    </ul>
  );
};
export default ProjectList;
