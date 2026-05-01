-- Create calculator schema
CREATE SCHEMA IF NOT EXISTS calculator;

-- Create history table
CREATE TABLE IF NOT EXISTS calculator.history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  expression TEXT NOT NULL,
  result TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE calculator.history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own calculator history"
  ON calculator.history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calculator history"
  ON calculator.history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calculator history"
  ON calculator.history FOR DELETE
  USING (auth.uid() = user_id);
