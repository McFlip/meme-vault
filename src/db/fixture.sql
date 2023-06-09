--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: meme_tags; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.meme_tags (meme_url, tag) FROM stdin;
/img/doom_eternal.jpg       fubar
/img/doom_lore.jpg    bohica
/img/doom_unicorn.jpg  fubar
/img/doom_unicorn.jpg  snafu
/img/doom_meow.jpg fubar
/img/doom_meow.jpg snafu
/img/doom_meow.jpg wtf
\.


--
-- PostgreSQL database dump complete
--