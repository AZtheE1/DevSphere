-- Create quiz schema
CREATE SCHEMA IF NOT EXISTS quiz;

-- Questions table
CREATE TABLE IF NOT EXISTS quiz.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL, -- easy, medium, hard
  question TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  incorrect_answers TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Results table
CREATE TABLE IF NOT EXISTS quiz.results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  category TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE quiz.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz.results ENABLE ROW LEVEL SECURITY;

-- Policies for Questions (Public Read)
CREATE POLICY "Anyone can view quiz questions" ON quiz.questions
  FOR SELECT TO authenticated USING (true);

-- Policies for Results (User isolated)
CREATE POLICY "Users can view their own quiz results" ON quiz.results
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results" ON quiz.results
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Insert some sample questions
INSERT INTO quiz.questions (category, difficulty, question, correct_answer, incorrect_answers)
VALUES 
('Programming', 'easy', 'What does HTML stand for?', 'HyperText Markup Language', ARRAY['HighText Machine Language', 'HyperText and Links Markup', 'HyperTool Multi Language']),
('Programming', 'easy', 'Which language is used for web styling?', 'CSS', ARRAY['HTML', 'Javascript', 'PHP']),
('Programming', 'medium', 'What is the purpose of a "key" in React lists?', 'To identify items uniquely for efficient updates', ARRAY['To encrypt the list data', 'To link to a database', 'To set the style of the list']),
('Programming', 'hard', 'What is a "closure" in JavaScript?', 'A function bundled with its lexical environment', ARRAY['A way to close a database connection', 'A CSS property to hide elements', 'A private class method']);
