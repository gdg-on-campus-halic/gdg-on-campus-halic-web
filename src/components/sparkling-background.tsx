// src/components/sparkling-background.tsx
import React, { useEffect, useRef, useState } from 'react';
import { icons } from '@/lib/bg-icons';

// Icon overlay component for rendering actual React icons
const TechIconsOverlay: React.FC = () => {
  const [iconPositions, setIconPositions] = useState<Array<{x: number, y: number, icon: React.ComponentType, key: string, rotation: number}>>([]);
  
  useEffect(() => {
    const generateIconPositions = () => {
      const positions: Array<{x: number, y: number, icon: React.ComponentType, key: string, rotation: number}> = [];
      const iconSize = 32;
      const minDistance = 60;
      const maxAttempts = 1000;
      const maxIcons = Math.min(150, Math.floor((window.innerWidth * window.innerHeight) / (minDistance * minDistance * 2)));
      
      const isOverlapping = (x1: number, y1: number, x2: number, y2: number, minDist: number) => {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy) < minDist;
      };
      
      let attempts = 0;
      
      while (positions.length < maxIcons && attempts < maxAttempts) {
        const x = iconSize + Math.random() * (window.innerWidth - iconSize * 2);
        const y = iconSize + Math.random() * (window.innerHeight - iconSize * 2);
        const rotation = Math.random() * 360;
        
        let overlaps = false;
        for (const pos of positions) {
          if (isOverlapping(x, y, pos.x, pos.y, minDistance)) {
            overlaps = true;
            break;
          }
        }
        
        if (!overlaps) {
          const iconIndex = Math.floor(Math.random() * icons.length);
          positions.push({
            x,
            y,
            icon: icons[iconIndex],
            key: `icon-${positions.length}`,
            rotation
          });
        }
        
        attempts++;
      }
      
      setIconPositions(positions);
    };
    
    generateIconPositions();
    
    const handleResize = () => {
      generateIconPositions();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      {iconPositions.map(({ x, y, icon: Icon, key, rotation }) => (
        <div
          key={key}
          className="absolute text-gray-600 text-3xl opacity-12 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        >
          <Icon />
        </div>
      ))}
    </div>
  );
};

const SparklingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const trailCanvas = trailCanvasRef.current;
    const gridCanvas = gridCanvasRef.current;
    if (!canvas || !trailCanvas || !gridCanvas) return;

    const ctx = canvas.getContext('2d');
    const trailCtx = trailCanvas.getContext('2d');
    const gridCtx = gridCanvas.getContext('2d');
    if (!ctx || !trailCtx || !gridCtx) return;

    // Set canvas size to window size
    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      trailCanvas.width = width;
      trailCanvas.height = height;
      gridCanvas.width = width;
      gridCanvas.height = height;
      
      // Draw the notebook grid on resize
      drawNotebookGrid();
    };

    // Function to draw the notebook grid pattern
    const drawNotebookGrid = () => {
      if (!gridCtx || !gridCanvas) return;
      
      gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
      
      const gridSize = 25;
      const lineWidth = 1;
      
      gridCtx.strokeStyle = '#666666';
      gridCtx.lineWidth = lineWidth;
      gridCtx.globalAlpha = 0.2;
      
      // Draw vertical lines
      for (let x = 0; x <= gridCanvas.width; x += gridSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, gridCanvas.height);
        gridCtx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = 0; y <= gridCanvas.height; y += gridSize) {
        gridCtx.beginPath();
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(gridCanvas.width, y);
        gridCtx.stroke();
      }
      
      gridCtx.globalAlpha = 1;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Google brand colors for the crayon traces
    const googleColors = [
      '#4285F4', // Google Blue
      '#EA4335', // Google Red  
      '#FBBC04', // Google Yellow
      '#34A853', // Google Green
    ];

    // Trail memory for fade out effect
    interface TrailSegment {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
      size: number;
      timestamp: number;
      opacity: number;
    }
    const trailHistory: TrailSegment[] = [];

    // Crayon particle class - simple and performant
    class CrayonParticle {
      x: number;
      y: number;
      lastX: number;
      lastY: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      baseSpeed: number;
      opacity: number;
      angle: number;
      angleSpeed: number;
      lifetime: number;
      maxLifetime: number;
      drawingActive: boolean;
      fadeStartTime: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        // Start from random position
        const startFromEdge = Math.random() > 0.3;
        
        if (startFromEdge) {
          const side = Math.floor(Math.random() * 4);
          switch(side) {
            case 0: // top
              this.x = Math.random() * canvasWidth;
              this.y = 0;
              break;
            case 1: // right
              this.x = canvasWidth;
              this.y = Math.random() * canvasHeight;
              break;
            case 2: // bottom
              this.x = Math.random() * canvasWidth;
              this.y = canvasHeight;
              break;
            default: // left
              this.x = 0;
              this.y = Math.random() * canvasHeight;
          }
        } else {
          this.x = Math.random() * canvasWidth;
          this.y = Math.random() * canvasHeight;
        }
        
        this.lastX = this.x;
        this.lastY = this.y;
        
        // Random size
        this.size = 3 + Math.random() * 7;
        this.opacity = Math.random() * 0.15 + 0.1;
        
        this.color = googleColors[Math.floor(Math.random() * googleColors.length)];
        this.drawingActive = true;
        
        // Random speed - increased for more movement
        this.baseSpeed = Math.random() * 1.2 + 0.5; // Increased from 0.8 + 0.4
        
        const randomAngle = Math.random() * Math.PI * 2;
        this.speedX = Math.cos(randomAngle) * this.baseSpeed;
        this.speedY = Math.sin(randomAngle) * this.baseSpeed;
        
        this.angle = randomAngle;
        this.angleSpeed = (Math.random() - 0.5) * 0.03; // Increased from 0.02
        this.lifetime = 0;
        this.maxLifetime = Math.random() * 600 + 400;
        this.fadeStartTime = this.maxLifetime - 120;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.lastX = this.x;
        this.lastY = this.y;
        
        // More dynamic curved movement
        this.angle += this.angleSpeed;
        this.angle += (Math.random() - 0.5) * 0.08; // Increased from 0.05
        
        // Add occasional direction changes
        if (Math.random() < 0.01) {
          this.angleSpeed = (Math.random() - 0.5) * 0.04; // More variation
        }
        
        // Add sine wave movement for more organic paths
        const waveInfluence = Math.sin(this.lifetime * 0.05) * 0.2;
        
        this.speedX = Math.cos(this.angle + waveInfluence) * this.baseSpeed;
        this.speedY = Math.sin(this.angle + waveInfluence) * this.baseSpeed;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // More frequent stop/start drawing
        if (Math.random() < 0.03) { // Increased from 0.02
          this.drawingActive = !this.drawingActive;
        }
        
        this.lifetime++;
        
        // Fade out effect
        if (this.lifetime > this.fadeStartTime) {
          const fadeProgress = (this.lifetime - this.fadeStartTime) / 120;
          this.opacity *= (1 - fadeProgress * 0.02);
        }
        
        // Check bounds
        if (this.x < -100 || this.x > canvasWidth + 100 || 
            this.y < -100 || this.y > canvasHeight + 100) {
          this.lifetime = this.maxLifetime + 1;
        }
      }

      draw() {
        if (!ctx || !trailCtx || this.opacity <= 0) return;
        
        // Draw trail if drawing is active
        if (this.drawingActive) {
          // Add to trail history
          trailHistory.push({
            x1: this.lastX,
            y1: this.lastY,
            x2: this.x,
            y2: this.y,
            color: this.color,
            size: this.size,
            timestamp: Date.now(),
            opacity: this.opacity
          });
        }
        
        // Draw arrow head with same texture as lines
        if (ctx) {
          ctx.save();
          
          // Calculate head opacity
          let headOpacity = 0.8;
          if (this.lifetime > this.fadeStartTime) {
            const fadeProgress = (this.lifetime - this.fadeStartTime) / 120;
            headOpacity = Math.max(0, 0.8 - fadeProgress);
          }
          
          ctx.globalAlpha = headOpacity * this.opacity;
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.size;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          // Arrow head size matches line radius
          const headSize = this.size;
          const angle = Math.atan2(this.speedY, this.speedX);
          
          // Position arrow head forward of the current position
          const forwardDistance = this.size * 2;
          const headX = this.x + Math.cos(angle) * forwardDistance;
          const headY = this.y + Math.sin(angle) * forwardDistance;
          
          // Draw arrow head with dashed lines for texture
          ctx.setLineDash([this.size * 2, this.size * 0.5]);
          
          ctx.translate(headX, headY);
          ctx.rotate(angle);
          
          // Draw arrow with a single path to avoid overlapping
          ctx.beginPath();
          ctx.moveTo(-headSize * 1.5, -headSize * 0.8);
          ctx.lineTo(0, 0);
          ctx.lineTo(-headSize * 1.5, headSize * 0.8);
          ctx.stroke();
          
          ctx.restore();
        }
      }

      isDead() {
        return this.lifetime > this.maxLifetime || this.opacity <= 0;
      }
    }

    // Particle management
    const particles: CrayonParticle[] = [];
    const maxParticles = 13; // Increased by 25%
    let particleSpawnTimer = 0;
    const particleSpawnInterval = 75; // Decreased by 25% for faster spawning
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Clear trail canvas for redrawing
      trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      
      // Draw trail history with texture
      const now = Date.now();
      const fadeTime = 20000; // 20 seconds
      
      for (let i = trailHistory.length - 1; i >= 0; i--) {
        const segment = trailHistory[i];
        const age = now - segment.timestamp;
        
        if (age > fadeTime) {
          trailHistory.splice(i, 1);
          continue;
        }
        
        // Calculate fade
        const fadeFactor = age > fadeTime - 3000 ? 
          (fadeTime - age) / 3000 : 1;
        
        // Draw line with slight texture
        trailCtx.save();
        trailCtx.globalAlpha = segment.opacity * fadeFactor * 0.6;
        trailCtx.strokeStyle = segment.color;
        trailCtx.lineWidth = segment.size;
        trailCtx.lineCap = 'round';
        
        // Set line dash for texture effect
        trailCtx.setLineDash([segment.size * 2, segment.size * 0.5]);
        
        trailCtx.beginPath();
        trailCtx.moveTo(segment.x1, segment.y1);
        trailCtx.lineTo(segment.x2, segment.y2);
        trailCtx.stroke();
        
        // Add some dots for texture
        if (Math.random() > 0.7) {
          trailCtx.fillStyle = segment.color;
          trailCtx.globalAlpha = segment.opacity * fadeFactor * 0.3;
          trailCtx.beginPath();
          trailCtx.arc(
            segment.x2 + (Math.random() - 0.5) * segment.size,
            segment.y2 + (Math.random() - 0.5) * segment.size,
            Math.random() * 2,
            0,
            Math.PI * 2
          );
          trailCtx.fill();
        }
        
        trailCtx.restore();
      }
      
      // Spawn new particles
      particleSpawnTimer++;
      if (particleSpawnTimer >= particleSpawnInterval && particles.length < maxParticles) {
        particles.push(new CrayonParticle(canvas.width, canvas.height));
        particleSpawnTimer = 0;
      }
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update(canvas.width, canvas.height);
        particle.draw();
        
        if (particle.isDead()) {
          particles.splice(i, 1);
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    // Start with 3 particles
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        particles.push(new CrayonParticle(canvas.width, canvas.height));
      }, i * 800); // Slightly faster initial spawn
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Tech icons overlay */}
      <TechIconsOverlay />
      {/* Grid canvas - notebook background */}
      <canvas
        ref={gridCanvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-100"
      />
      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-70"
      />
      {/* Main canvas for heads */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-100"
      />
    </>
  );
};

export default SparklingBackground;