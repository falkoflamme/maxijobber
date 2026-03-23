-- migration_v6: rename ausbildungsberuf→abschluss, erfahrung_stufe→berufspraxis
ALTER TABLE profiles RENAME COLUMN ausbildungsberuf TO abschluss;
ALTER TABLE profiles RENAME COLUMN erfahrung_stufe TO berufspraxis;
