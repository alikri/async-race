const calculateDriveTimeInMilliseconds = (velocity: number, totalWidth: number) => {
  if (velocity <= 0) {
    throw new Error('Velocity must be greater than zero to calculate time.');
  }
  const timeInSeconds = totalWidth / velocity;
  const timeInMilliseconds = timeInSeconds * 1000;
  const adjustedTimeInMilliseconds = timeInMilliseconds * 0.7;
  return Math.floor(adjustedTimeInMilliseconds);
};

export default calculateDriveTimeInMilliseconds;
