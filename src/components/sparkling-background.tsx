// src/components/sparkling-background.tsx
import React, { useEffect, useRef } from 'react';

const SparklingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const trailCanvas = trailCanvasRef.current;
    if (!canvas || !trailCanvas) return;

    const ctx = canvas.getContext('2d');
    const trailCtx = trailCanvas.getContext('2d');
    if (!ctx || !trailCtx) return;

    // Set canvas size to window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
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

    // Crayon particle class - can draw lines or float randomly
    class CrayonParticle {
      x: number;
      y: number;
      lastX: number;
      lastY: number;
      size: number;
      sizeType: 'small' | 'medium' | 'large';
      color: string;
      speedX: number;
      speedY: number;
      baseSpeed: number;
      opacity: number;
      angle: number;
      angleSpeed: number;
      lifetime: number;
      maxLifetime: number;
      behavior: 'draw' | 'float';
      drawingActive: boolean;
      drawingActive: boolean;
      fadeStartTime: number;

      constructor() {
        // Start from random position for variety
        const startFromEdge = Math.random() > 0.3; // 70% chance to start from edge
        
        if (startFromEdge) {
          const side = Math.floor(Math.random() * 4);
          switch(side) {
            case 0: // top
              this.x = Math.random() * canvas.width;
              this.y = 0;
              break;
            case 1: // right
              this.x = canvas.width;
              this.y = Math.random() * canvas.height;
              break;
            case 2: // bottom
              this.x = Math.random() * canvas.width;
              this.y = canvas.height;
              break;
            default: // left
              this.x = 0;
              this.y = Math.random() * canvas.height;
          }
        } else {
          // Start from random position in canvas
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
        
        this.lastX = this.x;
        this.lastY = this.y;
        
        // Three distinct crayon sizes
        const sizeRandom = Math.random();
        if (sizeRandom < 0.33) {
          this.sizeType = 'small';
          this.size = 3;
          this.opacity = Math.random() * 0.15 + 0.1;
        } else if (sizeRandom < 0.67) {
          this.sizeType = 'medium';
          this.size = 6;
          this.opacity = Math.random() * 0.2 + 0.15;
        } else {
          this.sizeType = 'large';
          this.size = 10;
          this.opacity = Math.random() * 0.25 + 0.2;
        }
        
        // Behavior type
        this.behavior = 'draw';
        
        this.color = googleColors[Math.floor(Math.random() * googleColors.length)];
        this.drawingActive = this.behavior === 'draw';
        
        // Random speeds based on size and behavior
        if (this.sizeType === 'small') {
          this.baseSpeed = Math.random() * 1.0 + 0.5;
        } else if (this.sizeType === 'medium') {
          this.baseSpeed = Math.random() * 0.8 + 0.4;
        } else {
          this.baseSpeed = Math.random() * 0.6 + 0.3;
        }
        
        const randomAngle = Math.random() * Math.PI * 2;
        this.speedX = Math.cos(randomAngle) * this.baseSpeed;
        this.speedY = Math.sin(randomAngle) * this.baseSpeed;
        
        this.angle = randomAngle;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
        this.lifetime = 0;
        this.maxLifetime = Math.random() * 600 + 400; // 400-1000 frames
        this.fadeStartTime = this.maxLifetime - 120; // Start fading 2 seconds before death
      }

      update() {
        this.lastX = this.x;
        this.lastY = this.y;
        
        if (this.behavior === 'draw') {
          // Drawing behavior - smooth lines
          this.angle += this.angleSpeed;
          this.angle += (Math.random() - 0.5) * 0.05;
          
          this.speedX = Math.cos(this.angle) * this.baseSpeed;
          this.speedY = Math.sin(this.angle) * this.baseSpeed;
          
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Randomly stop/start drawing
          if (Math.random() < 0.02) {
            this.drawingActive = !this.drawingActive;
          }
        } else if (this.behavior === 'float') {
          // Floating behavior - random movement
          this.speedX += (Math.random() - 0.5) * 0.2;
          this.speedY += (Math.random() - 0.5) * 0.2;
          
          // Limit speed
          this.speedX *= 0.95;
          this.speedY *= 0.95;
          
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Bounce off edges softly
          if (this.x < 50 || this.x > canvas.width - 50) {
            this.speedX *= -0.8;
          }
          if (this.y < 50 || this.y > canvas.height - 50) {
            this.speedY *= -0.8;
          }
        }
        
        this.lifetime++;
        
        // Fade out effect for particles nearing death
        if (this.lifetime > this.fadeStartTime) {
          const fadeProgress = (this.lifetime - this.fadeStartTime) / 120;
          this.opacity *= (1 - fadeProgress * 0.02);
        }
        
        // Check bounds for removal
        if (this.x < -100 || this.x > canvas.width + 100 || 
            this.y < -100 || this.y > canvas.height + 100) {
          this.lifetime = this.maxLifetime + 1;
        }
      }

      draw() {
        if (!ctx || !trailCtx || this.opacity <= 0) return;
        
        // Draw trail if drawing is active
        if (this.behavior === 'draw' && this.drawingActive) {
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
        
        // Draw particle head with fade effect
        if (ctx) {
          ctx.save();
          
          // Calculate head opacity based on lifetime
          let headOpacity = 1.0;
          if (this.lifetime > this.fadeStartTime) {
            const fadeProgress = (this.lifetime - this.fadeStartTime) / 120;
            headOpacity = Math.max(0, 1 - fadeProgress);
          }
          
          ctx.globalAlpha = headOpacity;
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
          
          ctx.beginPath();
          const headSize = this.size * 1.2;
          
          ctx.arc(this.x, this.y, headSize, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }
      }

      isDead() {
        return this.lifetime > this.maxLifetime || this.opacity <= 0;
      }
    }

    // Particle management
    const particles: CrayonParticle[] = [];
    const maxParticles = 10; // Particle intensity
    let particleSpawnTimer = 0;
    const particleSpawnInterval = 100; // Spawn Interval in frames
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Clear trail canvas for redrawing
      trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      
      // Draw trail history with fade out
      const now = Date.now();
      const fadeTime = 20000; // 20 seconds
      
      for (let i = trailHistory.length - 1; i >= 0; i--) {
        const segment = trailHistory[i];
        const age = now - segment.timestamp;
        
        if (age > fadeTime) {
          // Remove old segments
          trailHistory.splice(i, 1);
          continue;
        }
        
        // Calculate fade
        const fadeFactor = age > fadeTime - 3000 ? 
          (fadeTime - age) / 3000 : 1; // Fade during last 3 seconds
        
        trailCtx.save();
        trailCtx.globalAlpha = segment.opacity * fadeFactor * 0.6;
        trailCtx.strokeStyle = segment.color;
        trailCtx.lineWidth = segment.size;
        trailCtx.lineCap = 'round';
        
        trailCtx.beginPath();
        trailCtx.moveTo(segment.x1, segment.y1);
        trailCtx.lineTo(segment.x2, segment.y2);
        trailCtx.stroke();
        
        // Add texture dots occasionally
        if (Math.random() > 0.9) {
          trailCtx.fillStyle = segment.color;
          trailCtx.globalAlpha = segment.opacity * fadeFactor * 0.3;
          trailCtx.beginPath();
          trailCtx.arc(
            segment.x2 + (Math.random() - 0.5) * segment.size * 2,
            segment.y2 + (Math.random() - 0.5) * segment.size * 2,
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
        particles.push(new CrayonParticle());
        particleSpawnTimer = 0;
      }
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();
        
        if (particle.isDead()) {
          particles.splice(i, 1);
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    // Start with 2 particles
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        particles.push(new CrayonParticle());
      }, i * 1000);
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
      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.7 }}
      />
      {/* Main canvas for heads */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 1.0 }}
      />
    </>
  );
};

export default SparklingBackground;