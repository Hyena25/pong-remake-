import React, { useState, useEffect, useRef } from 'react';

const PongGame = () => {
  const [paddle1Y, setPaddle1Y] = useState(40);
  const [paddle2Y, setPaddle2Y] = useState(40);
  const [ballX, setBallX] = useState(50);
  const [ballY, setBallY] = useState(50);
  const [ballSpeedX, setBallSpeedX] = useState(1);
  const [ballSpeedY, setBallSpeedY] = useState(1);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = gameRef.current;
    const context = canvas.getContext('2d');

    // Update paddle positions
    const movePaddles = (e) => {
      if (e.code === 'ArrowUp' && paddle2Y > 0) {
        setPaddle2Y(paddle2Y - 5);
      } else if (e.code === 'ArrowDown' && paddle2Y < canvas.height - 80) {
        setPaddle2Y(paddle2Y + 5);
      } else if (e.code === 'KeyW' && paddle1Y > 0) {
        setPaddle1Y(paddle1Y - 5);
      } else if (e.code === 'KeyS' && paddle1Y < canvas.height - 80) {
        setPaddle1Y(paddle1Y + 5);
      }
    };

    // Update ball position
    const moveBall = () => {
      setBallX(ballX + ballSpeedX);
      setBallY(ballY + ballSpeedY);

      if (ballX >= canvas.width - 10 || ballX <= 10) {
        setBallSpeedX(ballSpeedX * -1);
      }

      if (ballY >= canvas.height - 10 || ballY <= 10) {
        setBallSpeedY(ballSpeedY * -1);
      }

      if (
        (ballX >= canvas.width - 20 && ballY >= paddle2Y && ballY <= paddle2Y + 80) ||
        (ballX <= 20 && ballY >= paddle1Y && ballY <= paddle1Y + 80)
      ) {
        setBallSpeedX(ballSpeedX * -1);
      }
    };

    // Animation loop
    const animate = () => {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw paddles
      context.fillStyle = '#ffffff';
      context.fillRect(10, paddle1Y, 10, 80);
      context.fillRect(canvas.width - 20, paddle2Y, 10, 80);

      // Draw ball
      context.beginPath();
      context.arc(ballX, ballY, 10, 0, Math.PI * 2);
      context.fillStyle = '#ffffff';
      context.fill();

      moveBall();

      // Animation loop
      requestAnimationFrame(animate);
    };

    // Event listeners for paddle movement
    window.addEventListener('keydown', movePaddles);

    // Start the animation
    animate();

    // Clean up event listener
    return () => {
      window.removeEventListener('keydown', movePaddles);
    };
  }, []);

  return (
    <canvas
      ref={gameRef}
      className="pong-game"
      width={800}
      height={400}
    />
  );
};

export default PongGame;

