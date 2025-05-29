import React, { useState, useEffect, useCallback } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import AssessmentTitle from '../components/Assessment/AssessmentTitle';
import QuestionList from '../components/Assessment/QuestionList';
import AIQResultDisplay, { AIQLevel } from '../components/Assessment/AIQResultDisplay';
import ScreenerNotes from '../components/Assessment/ScreenerNotes';

// This type should align with the one in QuestionList.tsx if it were exported.
// Defining it here based on its usage and the QuestionList component's internal types.
type QuestionRelevance = 'relevant' | 'non-relevant' | 'none';

interface QuestionRelevances {
  [questionId: string]: QuestionRelevance;
}

// These are the question IDs hardcoded in the provided QuestionList.tsx component.
// This page needs to be aware of them to correctly initialize and manage relevance state.
const ASSESSMENT_QUESTION_IDS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

type AssessmentQuestionId = typeof ASSESSMENT_QUESTION_IDS[number];

const IndexPage: React.FC = () => {
  const [questionRelevances, setQuestionRelevances] = useState<QuestionRelevances>({});
  const [aiqLevel, setAiqLevel] = useState<AIQLevel>(null);
  const [screenerNotes, setScreenerNotes] = useState<string>("");

  // Initialize relevance state for all questions to 'none'.
  // This ensures that the AIQ calculation considers all questions from the start.
  useEffect(() => {
    const initialRelevances: QuestionRelevances = {};
    ASSESSMENT_QUESTION_IDS.forEach(id => {
      initialRelevances[id] = 'none';
    });
    setQuestionRelevances(initialRelevances);
  }, []); // Empty dependency array ensures this runs once on mount.

  // Callback for when a question's relevance is changed in QuestionList.
  const handleRelevanceChange = useCallback((questionId: string, relevance: QuestionRelevance) => {
    setQuestionRelevances(prevRelevances => {
      // Ensure the questionId is one of the known assessment question IDs.
      if (ASSESSMENT_QUESTION_IDS.includes(questionId as AssessmentQuestionId)) {
        return {
          ...prevRelevances,
          [questionId]: relevance,
        };
      }
      // If questionId is not recognized, log a warning and return previous state.
      console.warn(`Attempted to set relevance for unknown questionId: ${questionId}`);
      return prevRelevances;
    });
  }, []);

  // Effect to recalculate AIQLevel whenever questionRelevances change.
  useEffect(() => {
    // Only proceed if questionRelevances has been initialized with all question IDs.
    // This check prevents calculation before initialRelevances are set or if state is inconsistent.
    if (Object.keys(questionRelevances).length !== ASSESSMENT_QUESTION_IDS.length) {
      setAiqLevel(null); 
      return;
    }

    const relevantCount = Object.values(questionRelevances).filter(r => r === 'relevant').length;

    // AIQ Level Calculation Logic:
    // This logic is derived to match the example image where 3 relevant answers result in 'Low' AIQ.
    // - High: 5-6 relevant questions
    // - Medium: 4 relevant questions
    // - Low: 0-3 relevant questions (default if 0 relevant answers after initialization)
    if (relevantCount >= 5) {
      setAiqLevel('High' as const);
    } else if (relevantCount === 4) {
      setAiqLevel('Medium' as const);
    } else {
      setAiqLevel('Low' as const);
    } 
  }, [questionRelevances]);

  // Callback for when screener notes are changed.
  const handleNotesChange = useCallback((notes: string) => {
    setScreenerNotes(notes);
  }, []);

  return (
    <MainAppLayout>
      {/* This div implements mainContent.layout: "flex flex-col gap-6" as per layout requirements */}
      <div className="flex flex-col gap-6">
        <AssessmentTitle />
        <QuestionList 
          onRelevanceChange={handleRelevanceChange}
          // Note: QuestionList component maintains its own UI state for checkboxes.
          // It calls onRelevanceChange, allowing this page to sync and perform calculations.
        />
        <AIQResultDisplay level={aiqLevel} />
        <ScreenerNotes 
          initialNotes={screenerNotes} // ScreenerNotes uses this for its initial internal state.
          onNotesChange={handleNotesChange} 
        />
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
