interface FlexContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const FlexContainer = ({ className, children }: FlexContainerProps) => {
  return <div className={`xs:flex ${className}`}>{children}</div>;
};

export default FlexContainer;
