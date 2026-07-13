/*
  # Create workout_logs table

  1. New Tables
    - `workout_logs`
      - `id` (uuid, primary key)
      - `date` (timestamptz) - when workout was performed
      - `completed` (boolean) - whether workout was fully completed
      - `duration_seconds` (integer) - actual time spent
      - `exercises_completed` (integer) - how many exercises were done
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `workout_logs` table
    - Add policy for anonymous insert (device-based, no auth required for MVP)
    - Add policy for anonymous select
*/

CREATE TABLE IF NOT EXISTS workout_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date timestamptz NOT NULL DEFAULT now(),
  completed boolean NOT NULL DEFAULT false,
  duration_seconds integer NOT NULL DEFAULT 0,
  exercises_completed integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert workout logs"
  ON workout_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read workout logs"
  ON workout_logs
  FOR SELECT
  TO anon
  USING (true);
