/*
  # Fix infinite recursion in user_roles RLS policies

  1. Security Changes
    - Drop existing problematic policies on user_roles table
    - Create simple, non-recursive policies
    - Allow users to view their own roles without circular dependency
    - Allow authenticated users to insert their own roles
*/

-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins can manage roles in their business" ON user_roles;
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;

-- Create simple, non-recursive policies
CREATE POLICY "Users can view their own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own role"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own role"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);