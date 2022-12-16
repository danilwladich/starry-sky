import React, { useLayoutEffect, useRef } from 'react';
import './App.css';

interface IStar {
  radius: number,
  x: number,
  y: number,
  speedX: number
  speedY: number
  update: () => void
}

function App() {
  const fieldRef = useRef<HTMLCanvasElement>(null)

  useLayoutEffect(() => {

    function star(this: IStar) {
      if (fieldRef.current != null) {
        this.radius = Math.random() * (3 - 1) + 1
        this.x = Math.random() * (fieldRef.current.width - this.radius)
        this.y = Math.random() * (fieldRef.current.height - this.radius)
        if (Math.random() > 0.5) {
          this.speedX = Math.random() * (0.2 - 0.05) + 0.05
        } else {
          this.speedX = -Math.random() * (0.2 - 0.05) + 0.05
        }
        if (Math.random() > 0.5) {
          this.speedY = Math.random() * (0.2 - 0.05) + 0.05
        } else {
          this.speedY = -Math.random() * (0.2 - 0.05) + 0.05
        }
        this.update = () => {
          fieldRef.current?.getContext('2d')?.beginPath()
          fieldRef.current?.getContext('2d')?.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
          fieldRef.current!.getContext('2d')!.fillStyle = '#fff'
          fieldRef.current?.getContext('2d')?.fill()
        }
      }
    }

    function animateStars() {
      requestAnimationFrame(animateStars);
      if (fieldRef.current != null) {
        fieldRef.current.getContext('2d')?.clearRect(0, 0, fieldRef.current.width, fieldRef.current.height)
        for (let i = 0; i < stars.length; i++) {
          stars[i].update()
          stars[i].x += stars[i].speedX
          stars[i].y += stars[i].speedY
          if (stars[i].x + stars[i].radius > fieldRef.current.width || stars[i].x + stars[i].radius < 0) {
            stars.splice(stars.indexOf(stars[i]), 1)
            stars.push(new (star as any)())
          }
          if (stars[i].y + stars[i].radius > fieldRef.current.height || stars[i].y + stars[i].radius < 0) {
            stars.splice(stars.indexOf(stars[i]), 1)
            stars.push(new (star as any)())
          }
          for (let j = 0; j < stars.length; j++) {
            if (i != j) {
              if (Math.sqrt((stars[j].x - stars[i].x) ** 2 + (stars[j].y - stars[i].y) ** 2) <= fieldRef.current.height / 5) {
                fieldRef.current?.getContext('2d')?.beginPath();
                fieldRef.current?.getContext('2d')?.moveTo(stars[i].x, stars[i].y);
                fieldRef.current?.getContext('2d')?.lineTo(stars[j].x, stars[j].y);
                fieldRef.current!.getContext('2d')!.strokeStyle = `rgba(255, 255, 255, 0.57)`
                fieldRef.current?.getContext('2d')?.stroke();
              }
            }
          }
        }
      }
    }

    let stars: IStar[] = []
    for (let i = 0; i < ((window.innerWidth + window.innerHeight) / 20); i++) {
      stars.push(new (star as any)())
    }
    console.log(stars)

    animateStars()

  }, [])
  return (
    <>
      <canvas ref={fieldRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    </>
  );
}

export default App;
