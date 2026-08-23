CREATE TABLE public.date_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity TEXT NOT NULL,
  note TEXT,
  picked_year INTEGER,
  picked_month INTEGER,
  picked_day INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.date_responses TO anon;
GRANT ALL ON public.date_responses TO service_role;

ALTER TABLE public.date_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a date response" ON public.date_responses FOR INSERT TO anon WITH CHECK (true);