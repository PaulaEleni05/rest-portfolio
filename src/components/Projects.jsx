import { useState } from 'react';
import projectsJSON from '@/assets/data/projects.json';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Projects() {
  const [projects] = useState(projectsJSON);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const ProjectCard = ({ project }) => (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
          <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">
            {project.date}
          </span>
        </div>
        <CardDescription className="text-base leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-4">
            <img 
              src={project.screenshots[0].url} 
              alt={project.screenshots[0].caption}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 gap-2">
        {project.url && (
          <Button 
            variant="default" 
            size="sm"
            onClick={() => window.open(project.url, '_blank')}
          >
            View Live
          </Button>
        )}
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => setSelectedProject(project)}
        >
          View More
        </Button>
        {project.github && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open(project.github, '_blank')}
          >
            GitHub
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <section id="projects" className="py-20 sm:py-32">
      <div className="space-y-12 sm:space-y-16">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Projects I have worked on.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-background rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-primary transition-colors"
            >
              ×
            </button>
            
            <h3 className="text-2xl font-semibold mb-4">{selectedProject.title}</h3>
            
            {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
              <div className="mb-4">
                <img 
                  src={selectedProject.screenshots[0].url} 
                  alt={selectedProject.screenshots[0].caption}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-md"
                />
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  {selectedProject.screenshots[0].caption}
                </p>
              </div>
            )}
            
            <p className="text-base mb-4">{selectedProject.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              {selectedProject.url && (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => window.open(selectedProject.url, '_blank')}
                >
                  View Live
                </Button>
              )}
              {selectedProject.github && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(selectedProject.github, '_blank')}
                >
                  GitHub
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};