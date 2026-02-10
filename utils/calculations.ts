import { FormSection, IndicatorRow, IPCRForm } from '../types';
import { ADJECTIVAL_RATING } from '../constants';

export const calculateRowAverage = (row: IndicatorRow): number => {
  const ratings = [row.ratingQ, row.ratingE, row.ratingT].filter(r => r !== null && r !== undefined) as number[];
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return parseFloat((sum / ratings.length).toFixed(2));
};

export const calculateSectionStats = (section: FormSection) => {
  if (section.rows.length === 0) {
    return { averageRating: 0, weightedRating: 0 };
  }

  // Guidelines: Average of all indicators in the MFO/Section
  const sumOfAverages = section.rows.reduce((sum, row) => sum + calculateRowAverage(row), 0);
  const averageRating = sumOfAverages / section.rows.length;
  
  // Weighted Rating for this section
  const weightedRating = averageRating * section.weight;

  return { 
    averageRating: parseFloat(averageRating.toFixed(2)), 
    weightedRating: parseFloat(weightedRating.toFixed(2)) 
  };
};

export const calculateFinalRating = (sections: FormSection[]) => {
  const finalScore = sections.reduce((sum, section) => sum + section.weightedRating, 0);
  const roundedFinal = parseFloat(finalScore.toFixed(2));
  return {
    finalRating: roundedFinal,
    adjectivalRating: ADJECTIVAL_RATING(roundedFinal)
  };
};
