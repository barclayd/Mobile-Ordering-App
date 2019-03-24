/*
    Library of shared functions for DrinKing
      Created by Freddie Chessell
*/

export const rangeScaling = (value, xMin, xMax, yMin, yMax) => {
    const percent = (value - yMin) / (yMax - yMin);
    return percent * (xMax - xMin) + xMin;
};
