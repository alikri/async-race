const calculateDriveTime = (velocity: number, totalWidth: number) => {
  if (velocity <= 0) {
    throw new Error('Velocity must be greater than zero to calculate time.');
  }
  const timeInSeconds = totalWidth / velocity;
  return parseFloat(timeInSeconds.toFixed(2));
};

export default calculateDriveTime;
