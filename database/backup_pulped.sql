--
-- PostgreSQL database dump
--

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

-- Started on 2026-11-05 10:31:54

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
-- TOC entry 472 (class 1255 OID 25399)
-- Name: backup_fasih_data(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.backup_fasih_data() RETURNS TABLE(table_name text, row_data jsonb)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
declare
    tbl record;
    r jsonb;
begin
    for tbl in
        select table_schema, table_name
        from information_schema.tables
        where table_schema = 'public'
          and table_name like 'fasih_%'
          and table_type = 'BASE TABLE'
        order by table_name
    loop
        for r in execute format(
            'select to_jsonb(t) from %I.%I t',
            tbl.table_schema,
            tbl.table_name
        )
        loop
            table_name := tbl.table_name;
            row_data := r;
            return next;
        end loop;
    end loop;
end;
$$;


--
-- TOC entry 428 (class 1255 OID 17982)
-- Name: fasih_set_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.fasih_set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    new.updated_at = now();
    return new;
end;
$$;


--
-- TOC entry 507 (class 1255 OID 18173)
-- Name: fasih_validate_assignment_roles(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.fasih_validate_assignment_roles() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
    v_pencacah_role text;
    v_pengawas_role text;
begin

    -- Pencacah wajib memiliki role pencacah
    select officer_role
    into v_pencacah_role
    from public.fasih_officers
    where id = new.pencacah_id;

    if v_pencacah_role is distinct from 'pencacah' then
        raise exception
        'Petugas pada pencacah_id harus memiliki role pencacah';
    end if;


    -- Pengawas wajib memiliki role pengawas
    if new.pengawas_id is not null then

        select officer_role
        into v_pengawas_role
        from public.fasih_officers
        where id = new.pengawas_id;

        if v_pengawas_role is distinct from 'pengawas' then
            raise exception
            'Petugas pada pengawas_id harus memiliki role pengawas';
        end if;

    end if;

    return new;

end;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 389 (class 1259 OID 17490)
-- Name: announcements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.announcements (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    image character varying(500) DEFAULT NULL::character varying,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 388 (class 1259 OID 17489)
-- Name: announcements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.announcements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4098 (class 0 OID 0)
-- Dependencies: 388
-- Name: announcements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.announcements_id_seq OWNED BY public.announcements.id;


--
-- TOC entry 415 (class 1259 OID 26099)
-- Name: fasih_activity_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasih_activity_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    action text NOT NULL,
    table_name text NOT NULL,
    record_id uuid,
    old_data jsonb,
    new_data jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 411 (class 1259 OID 26007)
-- Name: fasih_assignments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasih_assignments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    region_id uuid NOT NULL,
    pencacah_id uuid NOT NULL,
    pengawas_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 414 (class 1259 OID 26085)
-- Name: fasih_import_errors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasih_import_errors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    import_id uuid NOT NULL,
    row_number integer NOT NULL,
    error_type text NOT NULL,
    error_message text NOT NULL,
    raw_data jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 413 (class 1259 OID 26067)
-- Name: fasih_imports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasih_imports (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    file_name text NOT NULL,
    imported_by uuid,
    total_rows integer DEFAULT 0 NOT NULL,
    success_rows integer DEFAULT 0 NOT NULL,
    failed_rows integer DEFAULT 0 NOT NULL,
    status text NOT NULL,
    error_message text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT fasih_imports_status_check CHECK ((status = ANY (ARRAY['processing'::text, 'completed'::text, 'completed_with_errors'::text, 'failed'::text])))
);


--
-- TOC entry 408 (class 1259 OID 25967)
-- Name: fasih_officers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasih_officers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username text,
    name text NOT NULL,
    officer_role text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT fasih_officers_officer_role_check CHECK ((officer_role = ANY (ARRAY['pencacah'::text, 'pengawas'::text])))
);


--
-- TOC entry 412 (class 1259 OID 26032)
-- Name: fasih_region_status; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasih_region_status (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    assignment_id uuid NOT NULL,
    total_assignments integer DEFAULT 0 NOT NULL,
    approved integer DEFAULT 0 NOT NULL,
    draft integer DEFAULT 0 NOT NULL,
    open integer DEFAULT 0 NOT NULL,
    submitted integer DEFAULT 0 NOT NULL,
    rejected integer DEFAULT 0 NOT NULL,
    edited_admin integer DEFAULT 0 NOT NULL,
    revoked integer DEFAULT 0 NOT NULL,
    submitted_respondent integer DEFAULT 0 NOT NULL,
    edited_supervisor integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT fasih_region_status_approved_check CHECK ((approved >= 0)),
    CONSTRAINT fasih_region_status_draft_check CHECK ((draft >= 0)),
    CONSTRAINT fasih_region_status_edited_admin_check CHECK ((edited_admin >= 0)),
    CONSTRAINT fasih_region_status_edited_supervisor_check CHECK ((edited_supervisor >= 0)),
    CONSTRAINT fasih_region_status_open_check CHECK ((open >= 0)),
    CONSTRAINT fasih_region_status_rejected_check CHECK ((rejected >= 0)),
    CONSTRAINT fasih_region_status_revoked_check CHECK ((revoked >= 0)),
    CONSTRAINT fasih_region_status_submitted_check CHECK ((submitted >= 0)),
    CONSTRAINT fasih_region_status_submitted_respondent_check CHECK ((submitted_respondent >= 0)),
    CONSTRAINT fasih_region_status_total_assignments_check CHECK ((total_assignments >= 0))
);


--
-- TOC entry 410 (class 1259 OID 25997)
-- Name: fasih_regions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasih_regions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    region_code text NOT NULL,
    island_name text NOT NULL,
    region_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 416 (class 1259 OID 26113)
-- Name: fasih_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasih_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    session_token text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 409 (class 1259 OID 25978)
-- Name: fasih_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fasih_users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    officer_id uuid,
    username text NOT NULL,
    password_hash text NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT fasih_users_role_check CHECK ((role = ANY (ARRAY['admin'::text, 'viewer'::text])))
);


--
-- TOC entry 391 (class 1259 OID 17503)
-- Name: footer_config; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_config (
    id integer NOT NULL,
    "companyName" character varying(255) DEFAULT 'BPS Kepulauan Seribu'::character varying NOT NULL,
    "companyAddress" jsonb,
    contacts jsonb,
    links jsonb,
    logo character varying(500) DEFAULT 'uploads/footer/logo.png'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 390 (class 1259 OID 17502)
-- Name: footer_config_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.footer_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4099 (class 0 OID 0)
-- Dependencies: 390
-- Name: footer_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.footer_config_id_seq OWNED BY public.footer_config.id;


--
-- TOC entry 393 (class 1259 OID 17516)
-- Name: headers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.headers (
    id integer NOT NULL,
    title character varying(255) DEFAULT 'PULAU PEDIA'::character varying NOT NULL,
    subtitle character varying(500) DEFAULT 'Portal Informasi dan Layanan Digital BPS Kepulauan Seribu'::character varying NOT NULL,
    "backgroundImage" character varying(500) DEFAULT 'uploads/headers/default.jpg'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 392 (class 1259 OID 17515)
-- Name: headers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.headers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4100 (class 0 OID 0)
-- Dependencies: 392
-- Name: headers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.headers_id_seq OWNED BY public.headers.id;


--
-- TOC entry 395 (class 1259 OID 17530)
-- Name: main_portals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.main_portals (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    icon character varying(50) NOT NULL,
    href character varying(255) NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "iconImage" character varying(500)
);


--
-- TOC entry 394 (class 1259 OID 17529)
-- Name: main_portals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.main_portals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4101 (class 0 OID 0)
-- Dependencies: 394
-- Name: main_portals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.main_portals_id_seq OWNED BY public.main_portals.id;


--
-- TOC entry 397 (class 1259 OID 17543)
-- Name: navbar_config; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.navbar_config (
    id integer NOT NULL,
    logo character varying(500) DEFAULT 'uploads/navbar/logo.png'::character varying NOT NULL,
    "logoAlt" character varying(100) DEFAULT 'Pulau Pedia Logo'::character varying NOT NULL,
    "brandName" character varying(255) DEFAULT 'PULAU PEDIA'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 396 (class 1259 OID 17542)
-- Name: navbar_config_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.navbar_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4102 (class 0 OID 0)
-- Dependencies: 396
-- Name: navbar_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.navbar_config_id_seq OWNED BY public.navbar_config.id;


--
-- TOC entry 399 (class 1259 OID 17557)
-- Name: portal_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.portal_items (
    id integer NOT NULL,
    "portalId" integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    icon character varying(50) NOT NULL,
    link character varying(255) NOT NULL,
    documents jsonb,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 398 (class 1259 OID 17556)
-- Name: portal_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.portal_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4103 (class 0 OID 0)
-- Dependencies: 398
-- Name: portal_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.portal_items_id_seq OWNED BY public.portal_items.id;


--
-- TOC entry 401 (class 1259 OID 17575)
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.services (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    logo character varying(500) NOT NULL,
    link character varying(500) NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    type character varying(50) DEFAULT 'service'::character varying,
    description text,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 400 (class 1259 OID 17574)
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4104 (class 0 OID 0)
-- Dependencies: 400
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- TOC entry 403 (class 1259 OID 17589)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    role character varying(10) DEFAULT 'admin'::character varying,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'user'::character varying])::text[])))
);


--
-- TOC entry 402 (class 1259 OID 17588)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4105 (class 0 OID 0)
-- Dependencies: 402
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3764 (class 2604 OID 17493)
-- Name: announcements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements ALTER COLUMN id SET DEFAULT nextval('public.announcements_id_seq'::regclass);


--
-- TOC entry 3769 (class 2604 OID 17506)
-- Name: footer_config id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_config ALTER COLUMN id SET DEFAULT nextval('public.footer_config_id_seq'::regclass);


--
-- TOC entry 3774 (class 2604 OID 17519)
-- Name: headers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.headers ALTER COLUMN id SET DEFAULT nextval('public.headers_id_seq'::regclass);


--
-- TOC entry 3780 (class 2604 OID 17533)
-- Name: main_portals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.main_portals ALTER COLUMN id SET DEFAULT nextval('public.main_portals_id_seq'::regclass);


--
-- TOC entry 3785 (class 2604 OID 17546)
-- Name: navbar_config id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navbar_config ALTER COLUMN id SET DEFAULT nextval('public.navbar_config_id_seq'::regclass);


--
-- TOC entry 3791 (class 2604 OID 17560)
-- Name: portal_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portal_items ALTER COLUMN id SET DEFAULT nextval('public.portal_items_id_seq'::regclass);


--
-- TOC entry 3796 (class 2604 OID 17578)
-- Name: services id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- TOC entry 3802 (class 2604 OID 17592)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4068 (class 0 OID 17490)
-- Dependencies: 389
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.announcements (id, title, content, image, "isActive", "createdAt", "updatedAt") FROM stdin;
4	PEGAWAI TERBAIK TRIWULAN III TAHUN 2026	🏆 PEGAWAI TERBAIK TRIWULAN III TAHUN 2026 Apresiasi 	https://res.cloudinary.com/necrhfcg/image/upload/v1792554644/pulaupedia/announcements/1792554644203-pegawaiterbaikTriwulanI.webp	t	2026-10-21 03:50:46.207036	2026-10-21 03:51:15.394533
\.


--
-- TOC entry 4090 (class 0 OID 26099)
-- Dependencies: 415
-- Data for Name: fasih_activity_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fasih_activity_logs (id, user_id, action, table_name, record_id, old_data, new_data, created_at) FROM stdin;
dcaeca4c-3732-4c97-996c-6f63272a490c	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-07 02:34:00.4425+00
6b7990a9-ca94-4c71-9a14-dd311f930961	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	IMPORT	fasih_imports	7112d764-6a43-49e6-9a89-b97a74e7b78d	\N	{"status": "completed", "file_name": "fasih_progress_detailed.xlsx", "total_rows": 199, "failed_rows": 0, "success_rows": 199}	2026-10-07 02:37:18.895319+00
28b6c54d-6e65-4c40-9a45-2c1354a65b27	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	IMPORT	fasih_imports	21fd9fe1-5b8c-4f28-b623-cbb446e7db34	\N	{"status": "completed", "file_name": "fasih_progress_detailed.xlsx", "total_rows": 199, "failed_rows": 0, "success_rows": 199}	2026-10-07 02:41:01.976178+00
6723423a-7000-4237-8942-98ca082fef1e	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-08 08:26:37.510565+00
ca40ff74-c647-4b18-8f74-f95c56af1fc8	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-08 08:36:25.502621+00
0b95bfb1-09b1-4237-ab48-bf09e7652416	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-09 02:11:15.782381+00
7c1d175d-fdca-41f2-a370-dfa6c1fcd264	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-09 02:11:44.480463+00
d1d2a02a-f04d-4048-8d06-6347789c4db2	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-09 02:11:51.493494+00
5110d601-128a-480d-85c7-3c35dbd2b59b	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-14 03:56:58.247365+00
00a0e808-604c-4ad9-b740-3682ba29363e	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-18 11:17:19.755615+00
00e4f1cc-0614-4511-b023-a91dbd068c50	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-18 13:41:23.83264+00
c66916b8-ac44-4338-86f1-7dbade02b16e	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-21 07:14:18.693492+00
3509ffc0-f820-4117-9f27-8f873ef8aadf	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	LOGIN	fasih_users	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	{"role": "admin", "username": "admin"}	2026-10-21 07:30:20.901779+00
\.


--
-- TOC entry 4086 (class 0 OID 26007)
-- Dependencies: 411
-- Data for Name: fasih_assignments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fasih_assignments (id, region_id, pencacah_id, pengawas_id, created_at, updated_at) FROM stdin;
cff9f111-ebca-4608-80ba-104cc05c0a20	5b6f6387-03f5-42e6-846b-b29d5eb3cdf8	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:15.854065+00	2026-10-07 02:37:50.793309+00
a8e4822b-d6c2-4e4c-aef9-494681c18d6e	442aac94-b24c-4682-aa5c-42051077be9c	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:16.677324+00	2026-10-07 02:37:51.604623+00
7f6ad7e9-6f1d-41bd-a4c5-fa2d5b1a6217	f31a3ab4-c8d4-486b-ab5d-daf98a5cfbbb	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:17.493835+00	2026-10-07 02:37:52.432316+00
c94d70b7-2427-49df-b10c-67792f5a54d7	37dd3a5d-72af-48d7-a05a-23ffe720cbc0	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:18.311792+00	2026-10-07 02:37:53.251281+00
6dd4e230-45ae-4234-b8f4-561d040007b9	b1c53b47-2e59-4feb-9795-96582f6167be	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:19.132909+00	2026-10-07 02:37:54.070548+00
c5c7e10f-0a3f-4a18-86a3-a200241c7e4f	736c5a9a-887b-41bb-920c-31ee3b2e0347	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:19.951745+00	2026-10-07 02:37:54.889706+00
2a0d543f-ec7f-4078-9115-1320c6cc758f	dbc4ccd4-ab8a-4bac-8292-95dfbe231217	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:20.769474+00	2026-10-07 02:37:55.708992+00
a17132a8-2830-4035-adf3-e09f1a5ab9c1	d1cfd59a-cf21-4370-acb8-db94796a41dd	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:21.589183+00	2026-10-07 02:37:56.631688+00
251f3e6b-6dfe-48c4-82d0-a061154db00b	94619f7d-3854-4a9a-b913-22d9340d242e	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:22.407875+00	2026-10-07 02:37:57.449152+00
89c1a8c5-78bf-4908-ac44-384070b9f13c	04347d65-e9c7-4dc3-87b7-4f0230443a1d	9cc7ce7d-13b2-43dc-bdec-d984fbbfcc8e	\N	2026-10-07 02:34:23.331043+00	2026-10-07 02:37:58.473653+00
b048282e-7e72-45c3-8515-0260baa7b4b4	f70c8730-28fd-4095-8718-0a3f9ea20dac	9cc7ce7d-13b2-43dc-bdec-d984fbbfcc8e	\N	2026-10-07 02:34:24.149719+00	2026-10-07 02:37:59.292531+00
df05cb9b-2999-434f-8fbc-ff01b5cec332	8481d835-4038-4de9-bc21-e6b34f398905	9cc7ce7d-13b2-43dc-bdec-d984fbbfcc8e	\N	2026-10-07 02:34:24.970011+00	2026-10-07 02:38:00.112632+00
1b46514d-405d-43b9-97dc-0cdbae648d7e	aba4f4fa-10e3-4a98-94e2-1e6e89b87ea9	9cc7ce7d-13b2-43dc-bdec-d984fbbfcc8e	\N	2026-10-07 02:34:25.788601+00	2026-10-07 02:38:00.933565+00
63d4f07d-dece-49a0-88c7-5532d66c6f3a	1c227fbe-92a1-4961-869f-4bb690209d44	9cc7ce7d-13b2-43dc-bdec-d984fbbfcc8e	\N	2026-10-07 02:34:26.608077+00	2026-10-07 02:38:01.853704+00
2c7d4e0f-586c-4138-b11e-174a64ee9be5	b005a45f-6669-4ae1-ae3e-6e3760bf275b	9cc7ce7d-13b2-43dc-bdec-d984fbbfcc8e	\N	2026-10-07 02:34:27.427137+00	2026-10-07 02:38:02.673344+00
4d9e7bdb-366c-4404-91ec-f32e2b2f40ab	33c28cd9-fe2f-4ccb-941f-e543f5c75837	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:28.247119+00	2026-10-07 02:38:03.492133+00
b72a95be-07d9-463b-af06-87b2af52ad25	f7098f16-ba43-4a82-acd7-86f65a73b429	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:29.066013+00	2026-10-07 02:38:04.312348+00
de5265dc-9c1a-4323-8646-58743f2b82af	7175cfdf-3ece-4728-ad68-44ffbde34f88	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:29.884095+00	2026-10-07 02:38:05.129909+00
8ecddc62-aac8-41a1-8c87-94488f1092c1	e7237a01-4050-45da-b9b2-4806ff022d7a	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:31.723791+00	2026-10-07 02:38:06.986683+00
0b708817-c20f-4295-8e42-0d50678780d1	94d4f52c-5c82-48bf-a0d5-873b03b13afe	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:32.650278+00	2026-10-07 02:38:07.895502+00
a682287a-7afd-427c-8dab-1b7025ce90f7	84272dcf-4657-4cfc-ba23-094e41742381	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:33.462632+00	2026-10-07 02:38:08.818357+00
fa2ead25-38c9-4f7e-8205-db5ef14e0dea	f278d779-b2c5-46ae-8a7f-0396f5973d9f	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:34.273463+00	2026-10-07 02:38:09.73786+00
489ae6a2-845e-4c69-934a-0b8205201e5e	0abbc241-8031-43f5-b9b4-b22b0af05c3d	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:35.105964+00	2026-10-07 02:38:10.556409+00
58e4c40b-a2c3-4d86-a5e9-dce58e3c8a8e	a9a5f498-5551-4116-9971-edadcfb53ee0	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:36.026965+00	2026-10-07 02:38:11.375359+00
9aca94d9-6833-4f34-a879-190758888b54	b0cc52a8-37b0-4def-87d0-1565f73abc8b	c268cfb7-e423-4026-9372-f80b956982a8	\N	2026-10-07 02:34:36.846243+00	2026-10-07 02:38:12.916297+00
33f27b13-025a-4439-8ed8-06f6dbffa52c	6287ff5d-f2c0-48ff-94b4-11647f622e60	c268cfb7-e423-4026-9372-f80b956982a8	\N	2026-10-07 02:34:37.767758+00	2026-10-07 02:38:15.001816+00
402507b8-f582-4c9c-bd62-ea6775b9f408	62a4f80b-0dc1-4ebc-85fe-cb31f418420c	c268cfb7-e423-4026-9372-f80b956982a8	\N	2026-10-07 02:34:38.587711+00	2026-10-07 02:38:17.268671+00
cf8629a6-92c7-4677-832e-39f497324fe2	0575b14c-ffaa-41ad-bfeb-65fdc88b857d	c268cfb7-e423-4026-9372-f80b956982a8	\N	2026-10-07 02:34:39.510267+00	2026-10-07 02:38:19.431524+00
94688661-707d-425f-b6f6-8022e6fea12f	8def7cad-5fb0-4369-8610-4d567297b6b8	c268cfb7-e423-4026-9372-f80b956982a8	\N	2026-10-07 02:34:40.431338+00	2026-10-07 02:38:23.05026+00
498d4730-946c-4ad6-b2b2-426c2c5ee87c	65f322d6-7dd3-49f8-bf50-d8990ee3cdfe	af2c2870-334a-434b-b8d4-48192f7f61a7	\N	2026-10-07 02:34:41.249778+00	2026-10-07 02:38:24.076404+00
364fb979-2150-47b1-a038-458bfb984602	92baba82-6f7b-476c-b5e0-ef89704fbfbf	af2c2870-334a-434b-b8d4-48192f7f61a7	\N	2026-10-07 02:34:42.175965+00	2026-10-07 02:38:25.101669+00
c44d7ea4-1980-409d-a6b0-18e1002b3734	ffb73820-3ce1-427a-a821-2e10464125c2	af2c2870-334a-434b-b8d4-48192f7f61a7	\N	2026-10-07 02:34:43.09436+00	2026-10-07 02:38:26.12467+00
b422bb67-f5f5-4641-8640-16961e690721	70d9d4c0-13a7-48f0-b4dd-8ee6052e10a7	af2c2870-334a-434b-b8d4-48192f7f61a7	\N	2026-10-07 02:34:43.913482+00	2026-10-07 02:38:27.147655+00
308c5af0-43de-4774-be79-2d6c6eb6db9b	b8bce449-dd7c-476f-8396-9c6e98c35111	af2c2870-334a-434b-b8d4-48192f7f61a7	\N	2026-10-07 02:34:44.834037+00	2026-10-07 02:38:28.069924+00
2947769e-d149-429c-9e07-cb7572a3c01e	056e051c-a91b-460a-8de4-513aedb8dc85	af2c2870-334a-434b-b8d4-48192f7f61a7	\N	2026-10-07 02:34:45.654291+00	2026-10-07 02:38:28.888476+00
ebeec073-f967-4ed4-b137-8c405ff87354	18d9380e-f90e-44fa-a990-71c6e24b72ce	af2c2870-334a-434b-b8d4-48192f7f61a7	\N	2026-10-07 02:34:46.473386+00	2026-10-07 02:38:29.706945+00
91a836ed-1957-4388-8747-b3eaeac49510	338f7cb8-c9fc-48ab-900a-d663dc5db8f6	af2c2870-334a-434b-b8d4-48192f7f61a7	\N	2026-10-07 02:34:47.294484+00	2026-10-07 02:38:30.730457+00
08d04b40-a735-4883-962b-5031dfc6e77f	ea925a6d-a534-4c8f-97fa-73dbb4b52e75	af2c2870-334a-434b-b8d4-48192f7f61a7	\N	2026-10-07 02:34:48.316469+00	2026-10-07 02:38:31.651952+00
5052857e-21e9-47c0-842f-96b7033ac5b3	cce447d1-01ae-46ca-b125-4b8fc2057fe9	632f2bf5-18cd-4463-874f-8bb69c2f3321	\N	2026-10-07 02:34:49.237484+00	2026-10-07 02:38:32.576017+00
67e1ac99-b08d-4151-8d14-b820324a8724	e9d15ca5-7c4b-49b9-84f7-16a08f7b4183	632f2bf5-18cd-4463-874f-8bb69c2f3321	\N	2026-10-07 02:34:50.057824+00	2026-10-07 02:38:33.494746+00
a1942a0b-0e3e-41d5-97b8-c101b9579cb9	a1b33237-e967-4954-bd55-e104665ad12b	632f2bf5-18cd-4463-874f-8bb69c2f3321	\N	2026-10-07 02:34:51.797534+00	2026-10-07 02:38:35.135601+00
ff8030f0-0dbe-43ea-9345-4a96d2e308b7	e664ca4e-2cc5-4d0c-9b20-4fd26cb6d2c0	632f2bf5-18cd-4463-874f-8bb69c2f3321	\N	2026-10-07 02:34:52.617717+00	2026-10-07 02:38:35.952403+00
76ccf97a-9309-4c10-b2a8-c9f89a689c0d	419dac8e-83e4-4854-aa3f-6dcd7e6b83ee	632f2bf5-18cd-4463-874f-8bb69c2f3321	\N	2026-10-07 02:34:53.435185+00	2026-10-07 02:38:36.875294+00
c558b0bd-c386-4a39-92cb-8d8d3cef93ac	b226c992-9ba1-404f-8e1b-f84932533e9e	632f2bf5-18cd-4463-874f-8bb69c2f3321	\N	2026-10-07 02:34:54.254674+00	2026-10-07 02:38:37.695471+00
8b259906-8555-4712-aba4-1d3b7b21bc09	1a193310-f180-4878-9893-f81495d245d3	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:34:55.06171+00	2026-10-07 02:38:38.513906+00
6cb8c700-2562-4df0-b278-a676a49af9dd	1352c94d-3eec-406f-9e4e-5ebbf041ac7e	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:34:55.894925+00	2026-10-07 02:38:39.430527+00
ddf53b8e-404a-41b8-b8a5-b7fc0ab2df04	2429b396-d64c-48f6-a881-b019e7100dba	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:34:56.713556+00	2026-10-07 02:38:40.25338+00
fc0d7631-3c34-4f94-afa8-f3772c133e69	7c5480d6-195c-4269-9e93-9c0d6c4f7131	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:34:57.634736+00	2026-10-07 02:38:41.176597+00
4da0570c-597e-47ba-bad2-9557b513bf5f	1e6c7c1a-10c0-4d99-bafc-5245cc1fa3e4	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:34:58.454291+00	2026-10-07 02:38:41.994035+00
e788f9a8-70d6-4651-81a8-e2d5da83be8d	eabe6776-c1fc-481a-ae00-0acabe3496d5	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:34:59.270546+00	2026-10-07 02:38:42.916887+00
e079fdd7-47a6-4d37-9039-615b4c36e788	4df8a57d-6bc5-4e66-ae27-2389d6ab8d92	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:35:00.092538+00	2026-10-07 02:38:43.723933+00
e468aec7-8b9f-482e-b778-7e41c7098e5d	fcce704d-3cf4-45c1-9cb9-aa905390d97b	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:35:00.911951+00	2026-10-07 02:38:44.55469+00
e52a74d3-842f-4ad7-a35e-9aed9169eb4e	1cb8f3d1-62d3-4e09-862b-696782b4efbf	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:35:01.731483+00	2026-10-07 02:38:45.373918+00
8613043f-2127-4d88-9df4-982d99dd5c02	c5e4038c-7a1a-486e-b5b3-17f4e860b45c	7e4e895d-fef5-4f01-9f48-c930b57cdb37	\N	2026-10-07 02:35:02.550538+00	2026-10-07 02:38:46.193237+00
8ad02abb-e66d-43f5-b416-3b8c158f7674	60c08bf0-f490-41ce-a825-d251cec822d8	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:03.356206+00	2026-10-07 02:38:47.215717+00
05029bdb-9eb7-48b8-8b04-bb42344adfd0	f188fb47-f8c5-44a1-af21-fe28f0b19387	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:04.189427+00	2026-10-07 02:38:48.034934+00
5f7cdeea-a0d3-4d3b-b15c-43a7f232a669	2e3820cf-30c7-4d91-a01d-c6234f516804	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:05.108811+00	2026-10-07 02:38:48.854521+00
eece7784-1800-4f57-92bf-28e9ef3e5b13	7206af60-f0f2-42de-a93c-bfa21a11169f	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:06.134717+00	2026-10-07 02:38:49.763417+00
3ba3728f-1516-46e3-b0a2-887648988a35	db545b21-dfa3-4cde-9e57-7948d384b2bc	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:06.953933+00	2026-10-07 02:38:50.597391+00
c8316918-0aa5-49f1-98c5-3dfee5d7830d	21d0974f-19a7-499b-9520-2a743fe4b96a	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:07.771367+00	2026-10-07 02:38:51.41666+00
6f37ec65-df90-4b3f-9ff2-888ae690e5c5	141dc746-538b-4a6d-a6ca-91e5dfdef01a	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:08.592357+00	2026-10-07 02:38:52.234982+00
f3046bcc-1a8f-4ebe-ba48-e363f290e286	33d53a85-8379-4175-a2f3-833d58ccf315	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:09.411271+00	2026-10-07 02:38:53.054853+00
483cb1b2-103b-4dbd-939a-635be3573737	aaa2988d-8276-4109-b318-2e4063cd37e7	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:11.049565+00	2026-10-07 02:38:54.692382+00
0bc1cda5-7057-4804-ba2e-a0ad30b2422c	4eed725f-e202-4150-a2d4-35ef5f6fef01	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:11.970251+00	2026-10-07 02:38:55.510529+00
b157abe9-7e05-4f2a-9351-bc5d0eef666f	b77ce157-a48d-40f6-ad4c-b827f7bc7163	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:12.788912+00	2026-10-07 02:38:56.330703+00
a4d36caa-56bd-42df-9d53-ddba41d92357	c40adb65-f563-4fbd-86c2-62dadf4dd2da	93ebf731-9f21-4792-8b21-9b4a733d16d7	\N	2026-10-07 02:35:13.608262+00	2026-10-07 02:38:57.151705+00
975bc6b6-efed-47c5-aaaa-3c2d8af707e8	1f5b8781-9859-4698-bb4c-3698360e349b	93ebf731-9f21-4792-8b21-9b4a733d16d7	\N	2026-10-07 02:35:14.530582+00	2026-10-07 02:38:58.058214+00
d52078e4-3413-4909-b286-fae0782ffdf8	badf3311-95db-42e6-a638-67db9fdcb12e	93ebf731-9f21-4792-8b21-9b4a733d16d7	\N	2026-10-07 02:35:16.171245+00	2026-10-07 02:38:58.889634+00
56ad7a2b-86e7-4ee5-94a3-28c7dda9af5e	78dd765e-d8f2-4b0b-b06c-508d4838d4fa	93ebf731-9f21-4792-8b21-9b4a733d16d7	\N	2026-10-07 02:35:16.990553+00	2026-10-07 02:38:59.811729+00
734dc60e-e336-476a-a0d9-add4e0be3ca7	cf55c7c5-e3ae-4d46-8ec5-2bd76887867e	93ebf731-9f21-4792-8b21-9b4a733d16d7	\N	2026-10-07 02:35:17.909487+00	2026-10-07 02:39:00.632361+00
513dc0a6-aef2-40c4-8c4a-c1575f16fb9c	8ee0f32b-b2f6-4803-ab45-8d9eb40b3ad7	93ebf731-9f21-4792-8b21-9b4a733d16d7	\N	2026-10-07 02:35:18.729462+00	2026-10-07 02:39:01.451503+00
0a953550-0579-44cc-8e7a-623c5c5b4709	d2335286-c1e2-445f-ad27-67b5f6476716	93ebf731-9f21-4792-8b21-9b4a733d16d7	\N	2026-10-07 02:35:19.54867+00	2026-10-07 02:39:02.475206+00
e2c77527-ddf9-41d1-b602-50c29b80f0da	fc62db1f-7a07-4639-9664-d22f177ddd65	93ebf731-9f21-4792-8b21-9b4a733d16d7	\N	2026-10-07 02:35:20.366929+00	2026-10-07 02:39:03.292395+00
aa2551c0-d3a0-4e9a-89c3-6436c06b3b9c	36ef4b89-be9e-4657-b719-02b3219dd07d	01fbea0d-c1c2-45c8-8b18-ab55b80e91c3	\N	2026-10-07 02:35:21.28935+00	2026-10-07 02:39:04.111971+00
55fd9cce-7c1c-41d4-b0ae-35e57b92f7cd	e1c6cdc9-84a1-4ce0-b2ba-1b465f07dc7b	01fbea0d-c1c2-45c8-8b18-ab55b80e91c3	\N	2026-10-07 02:35:22.093386+00	2026-10-07 02:39:04.930975+00
ddd05814-f0c1-45ab-b680-9630ffd19a78	059bd379-73a2-491d-bbd5-3dcfaf751bbd	01fbea0d-c1c2-45c8-8b18-ab55b80e91c3	\N	2026-10-07 02:35:22.927326+00	2026-10-07 02:39:05.75174+00
a3837ef0-f794-4f4c-90c5-98b8472bc231	26482a21-687e-4a98-908b-5ed8ef9a8b97	01fbea0d-c1c2-45c8-8b18-ab55b80e91c3	\N	2026-10-07 02:35:23.849493+00	2026-10-07 02:39:06.672408+00
48fa8d82-a349-4548-a665-8ddd2c51f79f	33eb4f80-a4af-4b7a-aa96-3505360efbef	01fbea0d-c1c2-45c8-8b18-ab55b80e91c3	\N	2026-10-07 02:35:24.670305+00	2026-10-07 02:39:07.49188+00
e4ccebaa-9446-41dc-a1e3-2c68908fc683	8a3d4860-8a1c-41da-868e-d5dadd26eac0	01fbea0d-c1c2-45c8-8b18-ab55b80e91c3	\N	2026-10-07 02:35:25.488854+00	2026-10-07 02:39:08.311658+00
9924f78f-e97b-437f-97df-48f028f11d50	438f0888-3cb1-419f-a96a-7bf9ec3071d0	01fbea0d-c1c2-45c8-8b18-ab55b80e91c3	\N	2026-10-07 02:35:27.331045+00	2026-10-07 02:39:09.23225+00
e21e5d37-426e-4454-af4d-3dfaf66cf6a1	bc50afe3-24e5-4a51-bfe3-7cf7978025cd	219cdcf5-5011-44b1-a53f-85007d54d65d	\N	2026-10-07 02:35:28.150152+00	2026-10-07 02:39:10.051799+00
a7f22e8f-fb3b-444e-956e-96012b4ca80f	b0174370-5f90-4705-844e-5029fa440f49	219cdcf5-5011-44b1-a53f-85007d54d65d	\N	2026-10-07 02:35:28.970939+00	2026-10-07 02:39:10.872127+00
b31094d9-e3cd-434d-a693-db2584d6c0fa	bdfe2a5e-afa8-4dff-a408-4218a82d473d	219cdcf5-5011-44b1-a53f-85007d54d65d	\N	2026-10-07 02:35:29.789618+00	2026-10-07 02:39:11.690464+00
729617e4-3bde-453a-8e27-bce2cc6ceab5	ba6937cc-8d86-41e1-b304-7db641f28fcd	219cdcf5-5011-44b1-a53f-85007d54d65d	\N	2026-10-07 02:35:30.607493+00	2026-10-07 02:39:12.508736+00
61e6b58f-e873-4582-a922-fd71a8b1a96b	8d36464f-34b1-4709-9b04-2999d58768fc	219cdcf5-5011-44b1-a53f-85007d54d65d	\N	2026-10-07 02:35:32.759951+00	2026-10-07 02:39:14.148397+00
531f3054-c593-469b-b2c9-b9989d1cfbc7	32f3c4d9-4a8c-426e-b3dd-4c3a3ea77554	50e592a6-89a8-412a-8d3f-8c722073ad0f	\N	2026-10-07 02:35:33.781722+00	2026-10-07 02:39:15.069362+00
19c19dab-e537-477e-8878-1cddd8387687	8d6d0d68-92c3-4cb0-8463-45cfe2d335b5	50e592a6-89a8-412a-8d3f-8c722073ad0f	\N	2026-10-07 02:35:34.586529+00	2026-10-07 02:39:15.990529+00
cd930460-899c-422a-b2fd-f305e8855de0	fe4c82ec-d4e2-4e21-9ea6-4009d58340cb	50e592a6-89a8-412a-8d3f-8c722073ad0f	\N	2026-10-07 02:35:35.421633+00	2026-10-07 02:39:16.808148+00
60d6fc99-4ced-4782-afc6-c7cf8e316688	2998764b-6bef-401b-a7b7-0d457b1b50f3	50e592a6-89a8-412a-8d3f-8c722073ad0f	\N	2026-10-07 02:35:36.239184+00	2026-10-07 02:39:17.604794+00
7590bebf-c1f1-47ad-a779-0f920e8c7b2c	ad05a8bd-630e-4616-b162-bfd27ed6f180	50e592a6-89a8-412a-8d3f-8c722073ad0f	\N	2026-10-07 02:35:37.05776+00	2026-10-07 02:39:18.698933+00
98c6521c-15a6-4efe-b6ed-63484a3ec0d3	0b89a6e6-5af6-4897-a61a-60092e9f433f	50e592a6-89a8-412a-8d3f-8c722073ad0f	\N	2026-10-07 02:35:37.878059+00	2026-10-07 02:39:20.600488+00
160534ed-0be6-46bc-a32f-9c7aaeab9f32	95ed0786-6460-4d8a-b845-00a64e0b2c37	ce64d6e5-1ce6-4c7d-b243-3deabfeaf4c8	\N	2026-10-07 02:35:38.799744+00	2026-10-07 02:39:21.726129+00
445ae2e4-ab2e-425b-8bfe-670ad2e508c6	a50c5351-184f-4178-a88b-d5a4246cd76a	ce64d6e5-1ce6-4c7d-b243-3deabfeaf4c8	\N	2026-10-07 02:35:39.619379+00	2026-10-07 02:39:22.647517+00
cfec32f8-f787-49a2-b1da-8722e8b83fe5	338a6ea4-7f62-40e0-b804-e946c281f7c6	ce64d6e5-1ce6-4c7d-b243-3deabfeaf4c8	\N	2026-10-07 02:35:40.539984+00	2026-10-07 02:39:24.08286+00
a5e15ed3-eef4-44b8-9ed1-0413863f1b94	c6215f1a-ce01-48ec-bedf-e09db49fb8a9	ce64d6e5-1ce6-4c7d-b243-3deabfeaf4c8	\N	2026-10-07 02:35:41.359617+00	2026-10-07 02:39:25.106064+00
4ea8e816-a16c-447c-a5e1-b8272f525a8c	6ae71c86-ee9d-4478-b86b-d825be94d856	ce64d6e5-1ce6-4c7d-b243-3deabfeaf4c8	\N	2026-10-07 02:35:42.281523+00	2026-10-07 02:39:26.026611+00
b1669d64-f58d-4480-ad02-2ea106abb6e1	fe4cfb4a-c036-453b-a7c2-703f37b78a85	ce64d6e5-1ce6-4c7d-b243-3deabfeaf4c8	\N	2026-10-07 02:35:43.100114+00	2026-10-07 02:39:26.949245+00
e30ccabd-2e84-4961-a6c1-7d65bb0f12bb	48be868f-9c95-4a16-8abb-b5eec31f083b	ce64d6e5-1ce6-4c7d-b243-3deabfeaf4c8	\N	2026-10-07 02:35:43.920101+00	2026-10-07 02:39:27.767534+00
874f953f-bbd9-4678-b05e-b8537813ab75	9229687f-65e3-4f40-a370-82be3a767b75	2a5d96e1-6167-4245-8b94-150e02108a65	\N	2026-10-07 02:35:44.740254+00	2026-10-07 02:39:28.587522+00
7883b3b6-e4c7-42c5-ac68-9d7781233c8d	b7d303b6-e4d9-4448-8920-df7eb106ed18	2a5d96e1-6167-4245-8b94-150e02108a65	\N	2026-10-07 02:35:45.559074+00	2026-10-07 02:39:29.406277+00
a5f3f99f-c053-42c0-8259-872597e4d830	83f6bd30-fdab-49e8-a5c8-49b76d6c71f0	2a5d96e1-6167-4245-8b94-150e02108a65	\N	2026-10-07 02:35:46.377571+00	2026-10-07 02:39:31.23496+00
c8653b1e-c6c0-4d72-b166-2e6a35eb9688	664164ef-9f3c-448b-85a5-e9d477287913	2a5d96e1-6167-4245-8b94-150e02108a65	\N	2026-10-07 02:35:47.19687+00	2026-10-07 02:39:32.172128+00
0e1bbd5e-4e25-48ad-8b70-973a9e63ebc2	5332e121-49f6-4769-98c4-08e7cf6d1aa1	2a5d96e1-6167-4245-8b94-150e02108a65	\N	2026-10-07 02:35:48.835941+00	2026-10-07 02:39:34.218482+00
745cb7d3-db9d-4e18-b14e-574458fdcd22	1f4d30ad-0234-4f8f-89f1-fc24e8faa5e9	2a5d96e1-6167-4245-8b94-150e02108a65	\N	2026-10-07 02:35:49.654739+00	2026-10-07 02:39:35.040621+00
7c3f4c7f-d73a-40b7-a31d-c08d1ae94451	a8b549b9-a57a-497b-b4c3-dd7bbbcc7acc	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:50.575991+00	2026-10-07 02:39:36.266983+00
3838c391-b0e0-42c5-a09c-8fd620252be1	dfe6f5c4-a467-463f-862e-4cead68eba0a	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:51.393754+00	2026-10-07 02:39:37.085717+00
d304385d-448c-4de8-a42a-8cee8e40e050	12721a66-1e6b-4cf8-8739-4527ae1302fc	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:52.214977+00	2026-10-07 02:39:37.907118+00
e6be35f6-a27f-479a-bcf3-fadd7aeef14d	cdddac28-f637-47ba-a484-314ae65572d3	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:53.035346+00	2026-10-07 02:39:38.726761+00
5acf4047-e76a-4ffe-9112-7a825653a926	70c6897d-2421-4294-acb3-cefec9eb37d4	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:53.851475+00	2026-10-07 02:39:39.633199+00
082ac61d-e97f-4cf6-9d43-08c181b77d61	9db9e33d-eb96-4143-bb46-fcc34cdb65e9	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:54.671342+00	2026-10-07 02:39:40.46496+00
70658166-e1b6-4daf-a821-d2d64e737ceb	2a987fda-7b26-4142-ae30-7510489bc8d4	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:55.490659+00	2026-10-07 02:39:41.284221+00
c573ed4d-1c61-482b-a199-db6bc25ae3f4	8e80e1ba-45d3-4d9e-95d4-935b8cc1a0f5	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:56.309484+00	2026-10-07 02:39:42.207343+00
509ac1dd-cc5f-415e-b37c-01f3a7cf80c9	eafef22f-8227-4885-94f3-175841c056b5	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:57.129121+00	2026-10-07 02:39:43.127562+00
d7a02271-3aa6-402f-bc6c-14c48eedb271	18b80260-aba8-47a4-9692-167058eb5bed	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:58.027251+00	2026-10-07 02:39:43.94893+00
5cb16ded-85a7-4eed-809d-419ef6d46561	48cec0b7-7aff-45ac-9ea8-4f8748d1e5b2	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:58.972951+00	2026-10-07 02:39:44.970588+00
2dfbb7da-c791-4fa8-b812-dd8e9b851b07	f8f7b18f-c011-4ab7-8d4d-988e72b81bcf	1a9c17c3-60f6-4035-822f-bb67d7ddb756	\N	2026-10-07 02:35:59.793183+00	2026-10-07 02:39:45.783475+00
fc357b3b-6286-45cf-9b59-e480803d5ecc	890def7d-3e9f-4574-a2df-b06bd4b55965	4198d229-c186-4c29-bc88-ebedb86a6906	\N	2026-10-07 02:36:01.482453+00	2026-10-07 02:39:46.60938+00
d1e1671b-a979-4fa3-82b5-7a8faa80b021	b0c1f56e-d495-4bfe-8e56-0be39630b730	4198d229-c186-4c29-bc88-ebedb86a6906	\N	2026-10-07 02:36:03.766256+00	2026-10-07 02:39:47.428346+00
c5989ce5-14b2-49f5-8ff2-e018ebc06586	3ea2fa0c-e24f-4526-9a11-4c01d64262c9	4198d229-c186-4c29-bc88-ebedb86a6906	\N	2026-10-07 02:36:05.683517+00	2026-10-07 02:39:48.247821+00
b9fe29aa-3087-4ba2-86b6-bad08471f861	719581b5-30cc-4500-894e-d21b66c9ed38	4198d229-c186-4c29-bc88-ebedb86a6906	\N	2026-10-07 02:36:07.927387+00	2026-10-07 02:39:49.067002+00
6d76d22f-d556-494c-9a12-bddd07e714ff	455abb79-0d6d-44e4-bac1-ae0b7645756d	4198d229-c186-4c29-bc88-ebedb86a6906	\N	2026-10-07 02:36:10.285328+00	2026-10-07 02:39:49.88511+00
557729d1-0684-43dd-8246-379584e382b4	45bf29e8-b782-478a-80fe-5b64a327cfe8	4198d229-c186-4c29-bc88-ebedb86a6906	\N	2026-10-07 02:36:11.965716+00	2026-10-07 02:39:50.704046+00
0d42d946-bb46-40fb-9d46-e1fd18c50e9c	f0bd0868-24c1-480d-9021-a4ebd18ccc59	4198d229-c186-4c29-bc88-ebedb86a6906	\N	2026-10-07 02:36:13.209901+00	2026-10-07 02:39:51.525798+00
1b20fff3-17ba-433c-812f-40ea325f53c8	e17b8068-560d-4957-a61d-14a370760c82	f0561bb8-cf35-4645-9347-ea61fbaab893	\N	2026-10-07 02:36:14.335919+00	2026-10-07 02:39:52.343784+00
b999d4ad-01e5-4b29-a754-7fb6b873c86f	326859da-21de-4ff5-b723-dbd52be13bf1	f0561bb8-cf35-4645-9347-ea61fbaab893	\N	2026-10-07 02:36:16.894086+00	2026-10-07 02:39:54.08942+00
06fe6619-7150-41d1-b231-9fd261899dc3	08a72846-e06a-43f7-977e-9edcbe13c6be	f0561bb8-cf35-4645-9347-ea61fbaab893	\N	2026-10-07 02:36:17.714885+00	2026-10-07 02:39:55.10263+00
f20bf177-4eec-4d24-a1a5-9402c325c16e	0fbf7e0f-1c4c-41d7-a05c-20881a9a7d25	f0561bb8-cf35-4645-9347-ea61fbaab893	\N	2026-10-07 02:36:18.531028+00	2026-10-07 02:39:55.924318+00
26a4f47b-29d1-438f-8005-38a1094cf342	df807caf-deac-428d-8533-250f44052714	f0561bb8-cf35-4645-9347-ea61fbaab893	\N	2026-10-07 02:36:19.544469+00	2026-10-07 02:39:56.755423+00
5efb34f7-870e-4dea-b08d-065e987fd760	b4c9f671-3ba4-44d9-b71d-a7fc4e622ae3	f0561bb8-cf35-4645-9347-ea61fbaab893	\N	2026-10-07 02:36:20.370821+00	2026-10-07 02:39:57.574977+00
5de2cc05-1aa0-44e2-917b-91586585aa7d	65d8b112-bde2-46a0-bcbe-a184aec842aa	f0561bb8-cf35-4645-9347-ea61fbaab893	\N	2026-10-07 02:36:21.191786+00	2026-10-07 02:39:58.380793+00
0c44d176-3756-45a2-95e1-61b8eea02656	39f9fdc6-c801-484f-b8fb-dbe0785ba363	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:22.114221+00	2026-10-07 02:39:59.205458+00
a6c8bab8-a8cc-4a77-9d5e-647a19583b30	b2c02e8a-5c86-4945-8629-bd64e0d7ae46	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:23.139128+00	2026-10-07 02:40:00.023396+00
36e2cfc6-f64a-44c4-a265-b493ec99d488	51e8a74f-61b2-4eec-91ef-4ee70f79e359	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:24.060879+00	2026-10-07 02:40:00.843075+00
dc0afd29-9763-4d9f-ac40-1e7b76f732ba	04556c77-99b8-42f5-b14d-c91876179df9	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:24.983117+00	2026-10-07 02:40:01.866681+00
83259979-0eef-48d9-b980-1c4dc06b7a3a	67e8c0ea-5598-477d-ae4e-24a7be23232e	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:26.00516+00	2026-10-07 02:40:02.686678+00
43c5a562-8547-44ab-9c6f-a192c8b9a885	cea411e8-76bb-4384-8c23-f60cf873bdf4	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:27.034712+00	2026-10-07 02:40:03.506483+00
c5e9423d-a537-40ee-9103-8708c340f5c3	8540d121-ade8-4f0a-ba13-9d6906b88475	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:28.049394+00	2026-10-07 02:40:04.323893+00
797d883e-44b9-4c0e-90c8-a3c1fd4fb8ad	dc15a461-3443-4324-9de3-d2a5a1916645	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:28.873968+00	2026-10-07 02:40:05.144107+00
13bc1f74-4417-4f60-bf58-9958ecc1dfb1	25b83e20-be7c-4518-9440-7e7c6296039f	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:29.692534+00	2026-10-07 02:40:05.962991+00
3d0e47f4-fd9b-4b77-9bdb-bcd57b806e04	0fd9f44e-da31-4da8-938a-b0922e802d9c	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:30.714392+00	2026-10-07 02:40:06.884963+00
1fa7d4e8-8488-4591-b87c-93ed429d9022	214bb59a-4a40-49d9-8403-0803274f0e50	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:31.536875+00	2026-10-07 02:40:07.703788+00
3575a4f1-37ca-49ed-9798-e3abf8e046ec	edf83dd8-3887-47be-890b-b962807dc93b	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:32.355887+00	2026-10-07 02:40:08.525155+00
5c07e45e-2051-4d5c-882d-b9f2153666df	cd3c1fb5-43fe-411d-a780-2db6ccb50d88	5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	\N	2026-10-07 02:36:33.175471+00	2026-10-07 02:40:09.344103+00
c91b366b-082c-4767-8bc6-aa388f88aa7d	0d8c7380-82a2-4ed7-86d5-25fefc1bee88	cd106d70-2a20-4e97-8d4a-702def0c17a2	\N	2026-10-07 02:36:34.098305+00	2026-10-07 02:40:10.365881+00
6efd2606-ca79-48aa-a991-9ca19e508321	01397aff-6fe9-44dd-8423-3adc32055661	cd106d70-2a20-4e97-8d4a-702def0c17a2	\N	2026-10-07 02:36:34.914224+00	2026-10-07 02:40:11.186535+00
9ded28c7-fe30-4244-beaa-2cfcde376dd7	abd4d16c-a4a0-4019-8fa9-a510cf250626	cd106d70-2a20-4e97-8d4a-702def0c17a2	\N	2026-10-07 02:36:35.836993+00	2026-10-07 02:40:12.005101+00
074a4d7a-5398-446a-a5d3-ab9eab81cfb5	67ba227f-7dcb-4279-8a38-f1d210473b3d	cd106d70-2a20-4e97-8d4a-702def0c17a2	\N	2026-10-07 02:36:37.478681+00	2026-10-07 02:40:13.849676+00
abe0b6f2-59e5-4db4-8e3f-b26c17e1dbee	cb3cba09-40eb-4012-a152-4820a0d176e9	cd106d70-2a20-4e97-8d4a-702def0c17a2	\N	2026-10-07 02:36:38.395281+00	2026-10-07 02:40:14.666542+00
726e5217-411d-422e-9f64-1c7b2f831d22	4138c1e9-2f88-42e5-8fb3-8ccb6ac279d2	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:39.42221+00	2026-10-07 02:40:15.58849+00
06608bc3-738b-47cd-9d73-401967ec2ca2	aabab0eb-af2f-4af0-b496-380b3afd69c3	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:40.342671+00	2026-10-07 02:40:16.407654+00
af856927-b41a-4e9a-a8af-ca7608f3b483	3467189f-c9c9-4141-97a0-0dc537012247	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:41.265553+00	2026-10-07 02:40:17.227737+00
d4f1968c-5665-4e2e-aa59-e6f594d3fbf1	25c4839c-989e-4853-abfd-867e8ce37af5	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:42.185132+00	2026-10-07 02:40:18.050905+00
9824222c-a2b6-4e81-af8f-440da71ba2cd	bb8cde48-7356-43e5-b0fe-9fa4f881b01e	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:43.206036+00	2026-10-07 02:40:19.174609+00
03b8cf5e-47d9-4f09-9ee7-0a60135a916c	62c0c32e-4966-48ee-aaad-c9aba46da952	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:44.131723+00	2026-10-07 02:40:19.993346+00
a67ba433-c25b-4515-9456-576d9898ce89	589adbe3-05d1-4701-aa89-644cffbd287b	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:45.052794+00	2026-10-07 02:40:20.913817+00
fbae22c5-dcc7-4ff0-bd49-bb6bfcdae147	367e11e5-fc29-40f5-8e5f-ea2ecf7c9742	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:45.874761+00	2026-10-07 02:40:21.835161+00
f535bcc7-284e-463d-88f8-7a7dd9951b00	ff413359-6cf5-4dc4-b6bc-1a30a1264120	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:46.693852+00	2026-10-07 02:40:22.755879+00
dcf894fa-3a6b-49dd-b1dc-db224acba0f2	2e8e44c7-2252-48c8-9552-06f9f7dd8886	4fed3efa-c8b5-412c-b4a8-60e5b926bc57	\N	2026-10-07 02:36:47.507502+00	2026-10-07 02:40:23.577647+00
39010879-53da-45e1-bd16-f8806b82b760	ef5922a3-68e8-4f4e-91bf-6ae40909b3eb	a5ff48ed-9e2b-40b6-9283-10c9511b1436	\N	2026-10-07 02:36:48.328994+00	2026-10-07 02:40:25.700343+00
25e7cceb-0239-4b65-aad7-64abb0743610	a85f0e93-a9b6-4a50-80ec-f39d78302250	a5ff48ed-9e2b-40b6-9283-10c9511b1436	\N	2026-10-07 02:36:49.252549+00	2026-10-07 02:40:28.134402+00
57b17400-2c17-4256-8ac8-736bbf5ff60b	21ba9d75-6f75-4e85-a1c3-bc515ad5bf91	a5ff48ed-9e2b-40b6-9283-10c9511b1436	\N	2026-10-07 02:36:50.070852+00	2026-10-07 02:40:30.48999+00
774a0c56-ded9-4cec-9388-32b182180bbb	ff46b4a9-7446-4c65-90ff-0264f22b8cd4	a5ff48ed-9e2b-40b6-9283-10c9511b1436	\N	2026-10-07 02:36:50.88991+00	2026-10-07 02:40:34.280199+00
a9a6bf6b-1fb1-4298-b4b1-fa0ee5106476	fabf2865-3f59-4fc5-b956-23287b292167	a5ff48ed-9e2b-40b6-9283-10c9511b1436	\N	2026-10-07 02:36:52.018103+00	2026-10-07 02:40:36.379062+00
93fd452e-c171-4879-b9f9-8b50ab57ca2b	7a8d078b-8568-422a-8506-1c8ac2c3bde6	a5ff48ed-9e2b-40b6-9283-10c9511b1436	\N	2026-10-07 02:36:52.938163+00	2026-10-07 02:40:37.60563+00
833692ce-0dba-4992-8e8c-fac8e982a4c5	1932e0c3-69ab-4a04-956b-68a28a100d95	a5ff48ed-9e2b-40b6-9283-10c9511b1436	\N	2026-10-07 02:36:53.757483+00	2026-10-07 02:40:38.527804+00
46e5a90a-67c7-4f58-a34e-8e937f166c7d	fa3d0bf6-8f8e-4459-a136-93d4f1a904e9	c838bb9a-199b-40d9-88a3-2b32bd4b932b	\N	2026-10-07 02:36:54.678509+00	2026-10-07 02:40:39.449333+00
adb4e81e-cc71-4a5d-b54f-09cb1c996fae	9e636973-c2fa-4bae-9065-564d909136b4	c838bb9a-199b-40d9-88a3-2b32bd4b932b	\N	2026-10-07 02:36:55.596287+00	2026-10-07 02:40:40.369692+00
4227248d-3b3e-4b86-b8e6-233b90c29a8c	38905c6d-6996-4574-8ef1-a15bb8067719	c838bb9a-199b-40d9-88a3-2b32bd4b932b	\N	2026-10-07 02:36:56.419246+00	2026-10-07 02:40:41.290879+00
203c2b83-de01-4205-849e-e25d6559d895	029fa6a4-e85e-4f63-bce4-6899fc2c8045	20e109f9-5276-44db-85c8-01e490d63803	\N	2026-10-07 02:34:15.003041+00	2026-10-07 02:37:49.976863+00
d6f9cd3d-138f-4b2e-b390-5e05a56f3f81	88aebf76-1ba1-41ca-bfea-1f42992665df	44831e28-0d75-4522-8444-7a4ae0baed62	\N	2026-10-07 02:34:30.702468+00	2026-10-07 02:38:05.953482+00
43a4b134-b8aa-4f26-bdc6-31a35a53ec21	cf1dcd29-fee7-44c0-b52e-465a8e39dc79	632f2bf5-18cd-4463-874f-8bb69c2f3321	\N	2026-10-07 02:34:50.976569+00	2026-10-07 02:38:34.313123+00
9cf86754-77d7-44ea-bc0d-5954c5410a59	ef56d15d-2d80-40a6-908a-9cf4f3e3606b	182a9153-fd74-4792-b3b6-ba38de34d72f	\N	2026-10-07 02:35:10.230163+00	2026-10-07 02:38:53.868327+00
b460c524-76b2-4ffc-9643-b48068d5bc99	1191790f-9dd6-49df-bc0b-ad33797e38d5	219cdcf5-5011-44b1-a53f-85007d54d65d	\N	2026-10-07 02:35:31.427315+00	2026-10-07 02:39:13.328627+00
fc0f0e01-8afd-4bd9-a8ee-0b02e7ec5a42	14b80405-2fdc-46ab-b164-f67da8c000d1	2a5d96e1-6167-4245-8b94-150e02108a65	\N	2026-10-07 02:35:48.016142+00	2026-10-07 02:39:33.195297+00
b9a08a68-cf18-45e4-aad3-690f9906d790	5ad7a96e-112a-4275-97c1-8dbca5c9716f	f0561bb8-cf35-4645-9347-ea61fbaab893	\N	2026-10-07 02:36:16.07297+00	2026-10-07 02:39:53.263344+00
219ffeee-7189-4528-936f-4a413be30a53	777a3ddc-51a2-4b95-ac3a-2da3cde2af85	cd106d70-2a20-4e97-8d4a-702def0c17a2	\N	2026-10-07 02:36:36.655+00	2026-10-07 02:40:12.820907+00
5a1fbf61-cf30-4de2-995b-e2056a4a5fbd	8a81b0ec-c96f-49ff-b59e-c6565dec45cb	c838bb9a-199b-40d9-88a3-2b32bd4b932b	\N	2026-10-07 02:36:57.237672+00	2026-10-07 02:40:42.212596+00
d82daef0-41d0-46b8-919c-2a7507774d2b	59a6c2fe-75ac-4753-aeef-2fc6d3385caf	c838bb9a-199b-40d9-88a3-2b32bd4b932b	\N	2026-10-07 02:36:58.057402+00	2026-10-07 02:40:43.033746+00
e9944213-cde8-461c-90f0-132d2ab89af0	50717016-37ff-4158-a098-bd95dab6ac11	c838bb9a-199b-40d9-88a3-2b32bd4b932b	\N	2026-10-07 02:36:58.979199+00	2026-10-07 02:40:43.859069+00
2714938b-c13b-4263-b199-d288a72b9a91	e86a726a-fbfc-4dea-8cfb-6993e842ff6d	c838bb9a-199b-40d9-88a3-2b32bd4b932b	\N	2026-10-07 02:36:59.776346+00	2026-10-07 02:40:44.670842+00
5e6703a5-9e8b-4549-b6ee-e67834d8e4c0	b40d3592-cde3-4f04-bc02-dfe2f60c1cc6	07911d95-1fd9-47b1-ad53-365b8450bf94	\N	2026-10-07 02:37:00.822853+00	2026-10-07 02:40:45.592215+00
fe5845e1-cb9a-4118-add8-e3d142a4f08a	4555159d-708e-4c9c-9ef4-3c1fbb9e5479	07911d95-1fd9-47b1-ad53-365b8450bf94	\N	2026-10-07 02:37:01.645497+00	2026-10-07 02:40:46.411159+00
a17bca12-c1b5-4fcb-9f6f-6304c890494e	99f922d1-8574-4078-b667-3d1e6da94c06	07911d95-1fd9-47b1-ad53-365b8450bf94	\N	2026-10-07 02:37:02.564175+00	2026-10-07 02:40:47.232391+00
d543af9f-0a59-4c97-869e-db754a767e8f	17031864-7f6e-4cb0-8077-bea8dd77f9f8	07911d95-1fd9-47b1-ad53-365b8450bf94	\N	2026-10-07 02:37:03.383169+00	2026-10-07 02:40:48.0364+00
c30b8ee3-940b-4c39-9b26-60fec03217fa	d85f1d81-abb6-43b9-a76c-1dcc202e1416	07911d95-1fd9-47b1-ad53-365b8450bf94	\N	2026-10-07 02:37:04.203847+00	2026-10-07 02:40:48.868716+00
5f0be1bd-1ba5-4e07-83b4-b34f5dd16a3e	4e7f2b53-8154-43fd-af44-89c94d69f75a	07911d95-1fd9-47b1-ad53-365b8450bf94	\N	2026-10-07 02:37:05.021484+00	2026-10-07 02:40:49.688119+00
82934f42-6ba3-4f04-97a0-c656328b9d54	2d2ab731-f0bb-432b-b7cf-e18681134f44	07911d95-1fd9-47b1-ad53-365b8450bf94	\N	2026-10-07 02:37:05.929942+00	2026-10-07 02:40:50.507084+00
dd8d8073-cfc2-412c-9cf2-39a2b7f97b8c	c9897f99-b4ba-458f-97ea-2bb52cb2d9cf	50c6506d-9e6d-4abd-8375-63d116d6922c	\N	2026-10-07 02:37:06.762289+00	2026-10-07 02:40:51.429179+00
3846f1ef-1d10-4996-b202-44fdca6900d9	8312aa16-58d0-4c38-9900-865e783716e1	50c6506d-9e6d-4abd-8375-63d116d6922c	\N	2026-10-07 02:37:07.683638+00	2026-10-07 02:40:52.247608+00
9ac6debc-8398-472f-891b-2b077ec04936	596e87ea-e450-4a5b-a619-55f82dc40cb5	50c6506d-9e6d-4abd-8375-63d116d6922c	\N	2026-10-07 02:37:08.502273+00	2026-10-07 02:40:53.134904+00
37b4d56a-ae55-4bbb-b51a-12f03b542cf2	5dd40152-f8b0-4553-b89e-95bedd3775be	50c6506d-9e6d-4abd-8375-63d116d6922c	\N	2026-10-07 02:37:09.528477+00	2026-10-07 02:40:54.09047+00
1d3cc5af-e977-4405-911a-1762fe3627dd	7cc0366d-9aa4-4676-9a30-4c124df4d8c8	50c6506d-9e6d-4abd-8375-63d116d6922c	\N	2026-10-07 02:37:10.450186+00	2026-10-07 02:40:54.91075+00
006b7be2-ce34-4863-bbde-e01a3d2d21bd	92892ea4-d024-461e-9fd7-90a2b2c64a0d	50c6506d-9e6d-4abd-8375-63d116d6922c	\N	2026-10-07 02:37:11.575267+00	2026-10-07 02:40:55.73281+00
85e0b851-be4b-43bc-adcb-20fcfc65da3f	4a8b60f2-8eba-4010-ad01-dba64043317f	50c6506d-9e6d-4abd-8375-63d116d6922c	\N	2026-10-07 02:37:12.496899+00	2026-10-07 02:40:56.54942+00
8b376aa6-1400-430d-b9d8-86ffb00ba187	566b9472-5cd1-4c17-9f4a-b7d0b8f8fbf7	bd78d74e-6fab-4a91-9a60-911b0407f7d3	\N	2026-10-07 02:37:13.315481+00	2026-10-07 02:40:57.368505+00
8df60eed-06d2-4b4b-84a0-56a0523afb1a	dac33278-b4cf-4a17-b0c2-694f5c206597	bd78d74e-6fab-4a91-9a60-911b0407f7d3	\N	2026-10-07 02:37:14.22515+00	2026-10-07 02:40:58.187556+00
64092cc1-a005-4eb7-970e-23f10f9e1040	67d07981-582b-461f-91e4-374fcb3a5328	bd78d74e-6fab-4a91-9a60-911b0407f7d3	\N	2026-10-07 02:37:15.055413+00	2026-10-07 02:40:59.212568+00
87b66e0b-bffd-4495-b76f-6cf3a6b12fc7	131278bd-ebf3-4867-8de8-1cf98dad8279	bd78d74e-6fab-4a91-9a60-911b0407f7d3	\N	2026-10-07 02:37:15.977711+00	2026-10-07 02:41:00.134212+00
5d219c1c-fcc5-4a3c-92ab-88f3fcda68ba	146e22e8-438c-4eb5-8753-a50a73d20570	bd78d74e-6fab-4a91-9a60-911b0407f7d3	\N	2026-10-07 02:37:17.470605+00	2026-10-07 02:41:00.952236+00
\.


--
-- TOC entry 4089 (class 0 OID 26085)
-- Dependencies: 414
-- Data for Name: fasih_import_errors; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fasih_import_errors (id, import_id, row_number, error_type, error_message, raw_data, created_at) FROM stdin;
\.


--
-- TOC entry 4088 (class 0 OID 26067)
-- Dependencies: 413
-- Data for Name: fasih_imports; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fasih_imports (id, file_name, imported_by, total_rows, success_rows, failed_rows, status, error_message, created_at) FROM stdin;
7112d764-6a43-49e6-9a89-b97a74e7b78d	fasih_progress_detailed.xlsx	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	199	199	0	completed	\N	2026-10-07 02:34:14.767582+00
21fd9fe1-5b8c-4f28-b623-cbb446e7db34	fasih_progress_detailed.xlsx	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	199	199	0	completed	\N	2026-10-07 02:37:49.877825+00
\.


--
-- TOC entry 4083 (class 0 OID 25967)
-- Dependencies: 408
-- Data for Name: fasih_officers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fasih_officers (id, username, name, officer_role, created_at, updated_at) FROM stdin;
50e592a6-89a8-412a-8d3f-8c722073ad0f	hilmaacenk@gmail.com	Hilma	pencacah	2026-10-07 02:35:33.781722+00	2026-10-07 02:35:33.781722+00
7e4e895d-fef5-4f01-9f48-c930b57cdb37	mahranienanie9@gmail.com	MAHRANI	pencacah	2026-10-07 02:34:55.06171+00	2026-10-07 02:34:55.06171+00
c838bb9a-199b-40d9-88a3-2b32bd4b932b	yudatongkii@gmail.com	Hasan wirayuda	pencacah	2026-10-07 02:36:54.678509+00	2026-10-07 02:36:54.678509+00
ce64d6e5-1ce6-4c7d-b243-3deabfeaf4c8	uddy2828@gmail.com	Muhammad Shalahuddin	pencacah	2026-10-07 02:35:38.799744+00	2026-10-07 02:35:38.799744+00
07911d95-1fd9-47b1-ad53-365b8450bf94	alr53057@gmail.com	ANJILIRROHMAH	pencacah	2026-10-07 02:37:00.822853+00	2026-10-07 02:37:00.822853+00
44831e28-0d75-4522-8444-7a4ae0baed62	komalasarisiti867@gmail.com	Siti komalasari	pencacah	2026-10-07 02:34:28.247119+00	2026-10-07 02:34:28.247119+00
5d0a8df6-bb4c-4f19-8ff6-3e19adc8dfd7	laiylatulkodria13@gmail.com	Laiylatul Kodria	pencacah	2026-10-07 02:36:22.114221+00	2026-10-07 02:36:22.114221+00
2a5d96e1-6167-4245-8b94-150e02108a65	milasarmila62808@gmail.com	sarmila	pencacah	2026-10-07 02:35:44.740254+00	2026-10-07 02:35:44.740254+00
182a9153-fd74-4792-b3b6-ba38de34d72f	karlinahzakar@gmail.com	Karlinah	pencacah	2026-10-07 02:35:03.356206+00	2026-10-07 02:35:03.356206+00
50c6506d-9e6d-4abd-8375-63d116d6922c	rifkanabillah@gmail.com	Rifka nabila	pencacah	2026-10-07 02:37:06.762289+00	2026-10-07 02:37:06.762289+00
c268cfb7-e423-4026-9372-f80b956982a8	kusumaningsimamik@gmail.com	Mamik kusumaningsih	pencacah	2026-10-07 02:34:36.846243+00	2026-10-07 02:34:36.846243+00
cd106d70-2a20-4e97-8d4a-702def0c17a2	mawadah.skn18@gmail.com	Sakina mawadah	pencacah	2026-10-07 02:36:34.098305+00	2026-10-07 02:36:34.098305+00
bd78d74e-6fab-4a91-9a60-911b0407f7d3	uswatunzema13@gmail.com	Uswatun khasanah	pencacah	2026-10-07 02:37:13.315481+00	2026-10-07 02:37:13.315481+00
93ebf731-9f21-4792-8b21-9b4a733d16d7	srirahayupujiutami303@gmail.com	SRI RAHAYU PUJI UTAMI	pencacah	2026-10-07 02:35:13.608262+00	2026-10-07 02:35:13.608262+00
1a9c17c3-60f6-4035-822f-bb67d7ddb756	asniati377@gmail.com	Asniati	pencacah	2026-10-07 02:35:50.575991+00	2026-10-07 02:35:50.575991+00
af2c2870-334a-434b-b8d4-48192f7f61a7	miminkomala9@gmail.com	Mimin komala	pencacah	2026-10-07 02:34:41.249778+00	2026-10-07 02:34:41.249778+00
4fed3efa-c8b5-412c-b4a8-60e5b926bc57	mafakhirmz05@gmail.com	Muhammad Zainul Mafakhir	pencacah	2026-10-07 02:36:39.42221+00	2026-10-07 02:36:39.42221+00
01fbea0d-c1c2-45c8-8b18-ab55b80e91c3	riamubarok2010@gmail.com	Ria Anggraini	pencacah	2026-10-07 02:35:21.28935+00	2026-10-07 02:35:21.28935+00
632f2bf5-18cd-4463-874f-8bb69c2f3321	alfirdausi89@gmail.com	Nurul Fatihah Al Firdausi	pencacah	2026-10-07 02:34:49.237484+00	2026-10-07 02:34:49.237484+00
4198d229-c186-4c29-bc88-ebedb86a6906	tantridianasari004@gmail.com	Tantri diana sari	pencacah	2026-10-07 02:36:01.482453+00	2026-10-07 02:36:01.482453+00
20e109f9-5276-44db-85c8-01e490d63803	sjuhroh12@gmail.com	Siti Juhroh	pencacah	2026-10-07 02:34:15.003041+00	2026-10-07 02:34:15.003041+00
219cdcf5-5011-44b1-a53f-85007d54d65d	pulo0405@gmail.com	Astri Meilisa Puteri	pencacah	2026-10-07 02:35:28.150152+00	2026-10-07 02:35:28.150152+00
a5ff48ed-9e2b-40b6-9283-10c9511b1436	windipopyg@gmail.com	Windi Popy Guntari	pencacah	2026-10-07 02:36:48.328994+00	2026-10-07 02:36:48.328994+00
9cc7ce7d-13b2-43dc-bdec-d984fbbfcc8e	raynzico1010@gmail.com	Siti Rosilah	pencacah	2026-10-07 02:34:23.331043+00	2026-10-07 02:34:23.331043+00
f0561bb8-cf35-4645-9347-ea61fbaab893	umayy6139@gmail.com	Nur Humairoh	pencacah	2026-10-07 02:36:14.335919+00	2026-10-07 02:36:14.335919+00
\.


--
-- TOC entry 4087 (class 0 OID 26032)
-- Dependencies: 412
-- Data for Name: fasih_region_status; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fasih_region_status (id, assignment_id, total_assignments, approved, draft, open, submitted, rejected, edited_admin, revoked, submitted_respondent, edited_supervisor, created_at, updated_at) FROM stdin;
1a260d9e-ceab-4f63-a655-60d570b143a6	cff9f111-ebca-4608-80ba-104cc05c0a20	100	85	7	0	0	6	2	0	0	0	2026-10-07 02:34:15.854065+00	2026-10-07 02:37:50.793309+00
bc51badf-839c-4b21-b78c-e4d3875f989f	a8e4822b-d6c2-4e4c-aef9-494681c18d6e	90	64	19	1	3	3	0	0	0	0	2026-10-07 02:34:16.677324+00	2026-10-07 02:37:51.604623+00
4c91b40b-ff46-4722-9bdb-7b1d03d93386	7f6ad7e9-6f1d-41bd-a4c5-fa2d5b1a6217	83	0	0	82	1	0	0	0	0	0	2026-10-07 02:34:17.493835+00	2026-10-07 02:37:52.432316+00
362989a8-d156-45fd-9bf2-454bb1029fb0	c94d70b7-2427-49df-b10c-67792f5a54d7	82	0	1	80	1	0	0	0	0	0	2026-10-07 02:34:18.311792+00	2026-10-07 02:37:53.251281+00
3fc7610b-c2b6-4c6e-890d-fa072bfdd945	6dd4e230-45ae-4234-b8f4-561d040007b9	59	0	0	58	1	0	0	0	0	0	2026-10-07 02:34:19.132909+00	2026-10-07 02:37:54.070548+00
a9399974-a146-47ad-943a-1695bd07bd6e	c5c7e10f-0a3f-4a18-86a3-a200241c7e4f	45	0	0	45	0	0	0	0	0	0	2026-10-07 02:34:19.951745+00	2026-10-07 02:37:54.889706+00
314879ce-3149-4dd4-a922-96a4aea29d25	2a0d543f-ec7f-4078-9115-1320c6cc758f	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:20.769474+00	2026-10-07 02:37:55.708992+00
64a914c8-87b3-45c2-9fbd-d4227460d5fa	a17132a8-2830-4035-adf3-e09f1a5ab9c1	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:21.589183+00	2026-10-07 02:37:56.631688+00
2a46c33a-8463-4c14-bf61-f1c3b8b6df93	251f3e6b-6dfe-48c4-82d0-a061154db00b	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:22.407875+00	2026-10-07 02:37:57.449152+00
d3c1853c-6161-4f99-bf35-efa6c8669432	89c1a8c5-78bf-4908-ac44-384070b9f13c	225	151	0	7	67	0	0	0	0	0	2026-10-07 02:34:23.331043+00	2026-10-07 02:37:58.473653+00
c0ef2bc3-b7c8-47da-91df-b9eeac54bbab	b048282e-7e72-45c3-8515-0260baa7b4b4	116	64	0	4	44	0	3	1	0	0	2026-10-07 02:34:24.149719+00	2026-10-07 02:37:59.292531+00
4fdb2d0d-bad8-4bc6-81ca-a2aeaee4607d	df05cb9b-2999-434f-8fbc-ff01b5cec332	82	78	0	3	1	0	0	0	0	0	2026-10-07 02:34:24.970011+00	2026-10-07 02:38:00.112632+00
fdc4dd35-8b27-4dc4-ad8a-7f1527f01d57	63d4f07d-dece-49a0-88c7-5532d66c6f3a	70	0	0	67	3	0	0	0	0	0	2026-10-07 02:34:26.608077+00	2026-10-07 02:38:01.853704+00
8acee0cd-57b6-4a66-a7c7-e4cedbd04f41	2c7d4e0f-586c-4138-b11e-174a64ee9be5	49	48	0	0	0	0	1	0	0	0	2026-10-07 02:34:27.427137+00	2026-10-07 02:38:02.673344+00
3611ed6a-ca69-43cc-b92d-bbca925644c6	4d9e7bdb-366c-4404-91ec-f32e2b2f40ab	295	244	2	0	49	0	0	0	0	0	2026-10-07 02:34:28.247119+00	2026-10-07 02:38:03.492133+00
be2dd471-7a34-4fd2-90d9-f1d3f3973d02	b72a95be-07d9-463b-af06-87b2af52ad25	178	0	0	178	0	0	0	0	0	0	2026-10-07 02:34:29.066013+00	2026-10-07 02:38:04.312348+00
02b483c0-35ed-401e-bcfd-1585be3a187b	de5265dc-9c1a-4323-8646-58743f2b82af	127	17	2	0	108	0	0	0	0	0	2026-10-07 02:34:29.884095+00	2026-10-07 02:38:05.129909+00
d1beec07-9197-47f8-b215-79d95e424649	d6f9cd3d-138f-4b2e-b390-5e05a56f3f81	121	0	9	31	81	0	0	0	0	0	2026-10-07 02:34:30.702468+00	2026-10-07 02:38:05.953482+00
d4c40399-fe12-4f54-a688-0e335db8947e	8ecddc62-aac8-41a1-8c87-94488f1092c1	112	106	2	2	1	0	0	0	1	0	2026-10-07 02:34:31.723791+00	2026-10-07 02:38:06.986683+00
f5eb470a-a461-4bb4-b4dd-e38ae9f6ec5e	0b708817-c20f-4295-8e42-0d50678780d1	3	0	0	3	0	0	0	0	0	0	2026-10-07 02:34:32.650278+00	2026-10-07 02:38:07.895502+00
3fee345c-174b-4b46-802a-a2b04ecee416	a682287a-7afd-427c-8dab-1b7025ce90f7	1	0	0	0	1	0	0	0	0	0	2026-10-07 02:34:33.462632+00	2026-10-07 02:38:08.818357+00
577ccd62-daad-4597-9f9e-7caae2f55ff1	fa2ead25-38c9-4f7e-8205-db5ef14e0dea	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:34.273463+00	2026-10-07 02:38:09.73786+00
4d0569a2-9076-4514-ae7a-5eb13bc8fd3d	489ae6a2-845e-4c69-934a-0b8205201e5e	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:35.105964+00	2026-10-07 02:38:10.556409+00
48cb6328-0015-42e1-907f-4f14a2d6e392	58e4c40b-a2c3-4d86-a5e9-dce58e3c8a8e	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:36.026965+00	2026-10-07 02:38:11.375359+00
0ead969a-f2a4-41b1-b355-cbd815f4cf8e	9aca94d9-6833-4f34-a879-190758888b54	133	33	0	0	98	1	0	0	0	1	2026-10-07 02:34:36.846243+00	2026-10-07 02:38:12.916297+00
ad8d8b68-35c8-491e-8370-2eb3d840f1ae	33f27b13-025a-4439-8ed8-06f6dbffa52c	122	0	26	6	90	0	0	0	0	0	2026-10-07 02:34:37.767758+00	2026-10-07 02:38:15.001816+00
2927f0cf-6fe5-425d-9596-855fdbe71c27	402507b8-f582-4c9c-bd62-ea6775b9f408	104	0	4	98	1	1	0	0	0	0	2026-10-07 02:34:38.587711+00	2026-10-07 02:38:17.268671+00
0f60379f-709f-4758-87ab-f31607e8e185	cf8629a6-92c7-4677-832e-39f497324fe2	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:39.510267+00	2026-10-07 02:38:19.431524+00
751a9910-e9a4-41cc-828b-fdefcc8fe7a5	94688661-707d-425f-b6f6-8022e6fea12f	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:40.431338+00	2026-10-07 02:38:23.05026+00
8dede347-f174-49e7-8fa9-befafa727557	498d4730-946c-4ad6-b2b2-426c2c5ee87c	235	7	0	56	172	0	0	0	0	0	2026-10-07 02:34:41.249778+00	2026-10-07 02:38:24.076404+00
73437f8a-c7a6-4796-a11c-51ace9e1e8be	364fb979-2150-47b1-a038-458bfb984602	152	36	0	14	102	0	0	0	0	0	2026-10-07 02:34:42.175965+00	2026-10-07 02:38:25.101669+00
1a697cd0-24f4-4f05-8cfa-186f018d62c0	c44d7ea4-1980-409d-a6b0-18e1002b3734	109	0	0	109	0	0	0	0	0	0	2026-10-07 02:34:43.09436+00	2026-10-07 02:38:26.12467+00
ac871f91-8e60-4284-941d-8f42559f6d14	b422bb67-f5f5-4641-8640-16961e690721	100	26	0	5	45	24	0	0	0	0	2026-10-07 02:34:43.913482+00	2026-10-07 02:38:27.147655+00
d6c98990-a9a5-4c3f-80fa-aedaf387b2c3	308c5af0-43de-4774-be79-2d6c6eb6db9b	3	0	0	2	0	0	0	0	1	0	2026-10-07 02:34:44.834037+00	2026-10-07 02:38:28.069924+00
456c1c48-1be9-449b-941d-146acb960692	2947769e-d149-429c-9e07-cb7572a3c01e	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:45.654291+00	2026-10-07 02:38:28.888476+00
bb90acc5-412a-41eb-9eab-66104ffc5d52	ebeec073-f967-4ed4-b137-8c405ff87354	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:46.473386+00	2026-10-07 02:38:29.706945+00
85e9f5cb-7e61-4c42-9e47-d6d541ee6c90	91a836ed-1957-4388-8747-b3eaeac49510	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:47.294484+00	2026-10-07 02:38:30.730457+00
d17ace1d-53cf-4c22-9a39-2bbbfe3c2558	08d04b40-a735-4883-962b-5031dfc6e77f	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:48.316469+00	2026-10-07 02:38:31.651952+00
ec05c50b-1b12-4124-b842-c4613958ed3e	5052857e-21e9-47c0-842f-96b7033ac5b3	183	130	1	0	51	0	1	0	0	0	2026-10-07 02:34:49.237484+00	2026-10-07 02:38:32.576017+00
abc95bfb-e622-4685-a642-7eca227c9ed5	67e1ac99-b08d-4151-8d14-b820324a8724	90	26	11	41	12	0	0	0	0	0	2026-10-07 02:34:50.057824+00	2026-10-07 02:38:33.494746+00
c0234024-92bb-498e-aa43-52701b889c91	a1942a0b-0e3e-41d5-97b8-c101b9579cb9	72	0	0	72	0	0	0	0	0	0	2026-10-07 02:34:51.797534+00	2026-10-07 02:38:35.135601+00
791814e4-f78b-406c-8dbc-6e653e18c5ee	ff8030f0-0dbe-43ea-9345-4a96d2e308b7	66	64	1	0	1	0	0	0	0	0	2026-10-07 02:34:52.617717+00	2026-10-07 02:38:35.952403+00
6a7a9160-b4d1-4d70-9da0-c14293f350d4	76ccf97a-9309-4c10-b2a8-c9f89a689c0d	13	13	0	0	0	0	0	0	0	0	2026-10-07 02:34:53.435185+00	2026-10-07 02:38:36.875294+00
b1ca9d36-d007-4014-ad93-953b3d47a80c	c558b0bd-c386-4a39-92cb-8d8d3cef93ac	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:34:54.254674+00	2026-10-07 02:38:37.695471+00
1c44cfb9-7c65-4ad0-b209-e0582e0c863b	8b259906-8555-4712-aba4-1d3b7b21bc09	169	89	17	1	59	3	0	0	0	0	2026-10-07 02:34:55.06171+00	2026-10-07 02:38:38.513906+00
a90c032f-6681-4e67-8991-cb8996d1695b	6cb8c700-2562-4df0-b278-a676a49af9dd	93	44	19	5	25	0	0	0	0	0	2026-10-07 02:34:55.894925+00	2026-10-07 02:38:39.430527+00
7d69f43a-28fb-41c7-86f1-574c7c4c2233	ddf53b8e-404a-41b8-b8a5-b7fc0ab2df04	84	61	12	0	10	0	0	1	0	0	2026-10-07 02:34:56.713556+00	2026-10-07 02:38:40.25338+00
e076a66d-5f16-4bf1-a095-20586638a5ed	fc0d7631-3c34-4f94-afa8-f3772c133e69	71	0	0	70	1	0	0	0	0	0	2026-10-07 02:34:57.634736+00	2026-10-07 02:38:41.176597+00
bb37a56c-dc42-4555-9571-34c0b0216df8	4da0570c-597e-47ba-bad2-9557b513bf5f	61	60	1	0	0	0	0	0	0	0	2026-10-07 02:34:58.454291+00	2026-10-07 02:38:41.994035+00
cb64178c-fcea-4eb0-961a-dd2d2a23cf56	e788f9a8-70d6-4651-81a8-e2d5da83be8d	52	7	0	41	4	0	0	0	0	0	2026-10-07 02:34:59.270546+00	2026-10-07 02:38:42.916887+00
a572c7b7-5a81-44b4-88f0-f905e5bfa951	e079fdd7-47a6-4d37-9039-615b4c36e788	38	0	0	38	0	0	0	0	0	0	2026-10-07 02:35:00.092538+00	2026-10-07 02:38:43.723933+00
c4b7e081-495d-4003-a694-c507aff3f4d8	e468aec7-8b9f-482e-b778-7e41c7098e5d	16	0	0	16	0	0	0	0	0	0	2026-10-07 02:35:00.911951+00	2026-10-07 02:38:44.55469+00
001dbaa1-de01-447c-9b58-69a867c017ac	e52a74d3-842f-4ad7-a35e-9aed9169eb4e	2	0	0	2	0	0	0	0	0	0	2026-10-07 02:35:01.731483+00	2026-10-07 02:38:45.373918+00
f9126029-cf6e-4ad5-9684-2088188b1304	8613043f-2127-4d88-9df4-982d99dd5c02	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:02.550538+00	2026-10-07 02:38:46.193237+00
e581e7ec-7621-4f81-9074-0ea8c366f334	8ad02abb-e66d-43f5-b416-3b8c158f7674	90	89	0	0	0	0	1	0	0	0	2026-10-07 02:35:03.356206+00	2026-10-07 02:38:47.215717+00
025527cf-0200-4cd7-980d-76990da59dc7	05029bdb-9eb7-48b8-8b04-bb42344adfd0	88	80	5	0	2	1	0	0	0	0	2026-10-07 02:35:04.189427+00	2026-10-07 02:38:48.034934+00
71c1f687-b469-4372-8eef-d18813dfb25b	5f7cdeea-a0d3-4d3b-b15c-43a7f232a669	79	0	0	79	0	0	0	0	0	0	2026-10-07 02:35:05.108811+00	2026-10-07 02:38:48.854521+00
3435d08c-6561-4d75-8b0e-08c8a283472f	eece7784-1800-4f57-92bf-28e9ef3e5b13	78	0	0	78	0	0	0	0	0	0	2026-10-07 02:35:06.134717+00	2026-10-07 02:38:49.763417+00
b6a4e838-8e8d-4d2a-81f4-496e627c5b27	3ba3728f-1516-46e3-b0a2-887648988a35	64	42	19	3	0	0	0	0	0	0	2026-10-07 02:35:06.953933+00	2026-10-07 02:38:50.597391+00
242711db-6460-47db-8120-d3a9579e4d26	c8316918-0aa5-49f1-98c5-3dfee5d7830d	61	12	31	18	0	0	0	0	0	0	2026-10-07 02:35:07.771367+00	2026-10-07 02:38:51.41666+00
edc3a92b-70cb-4565-8221-832e30b12df4	6f37ec65-df90-4b3f-9ff2-888ae690e5c5	1	1	0	0	0	0	0	0	0	0	2026-10-07 02:35:08.592357+00	2026-10-07 02:38:52.234982+00
ffa5c58d-7371-4cca-a39e-8885a475efde	f3046bcc-1a8f-4ebe-ba48-e363f290e286	1	1	0	0	0	0	0	0	0	0	2026-10-07 02:35:09.411271+00	2026-10-07 02:38:53.054853+00
7c19f20b-b77c-487d-be3d-a3f57687b42c	9cf86754-77d7-44ea-bc0d-5954c5410a59	1	1	0	0	0	0	0	0	0	0	2026-10-07 02:35:10.230163+00	2026-10-07 02:38:53.868327+00
f18904ff-da6f-4898-9842-0b4ea7902d79	483cb1b2-103b-4dbd-939a-635be3573737	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:11.049565+00	2026-10-07 02:38:54.692382+00
c64db4e4-6a27-4ec7-a1d2-14c642dfe22c	0bc1cda5-7057-4804-ba2e-a0ad30b2422c	1	1	0	0	0	0	0	0	0	0	2026-10-07 02:35:11.970251+00	2026-10-07 02:38:55.510529+00
feb44ae8-c63f-455a-af3a-5a0d55c9115b	b157abe9-7e05-4f2a-9351-bc5d0eef666f	1	1	0	0	0	0	0	0	0	0	2026-10-07 02:35:12.788912+00	2026-10-07 02:38:56.330703+00
ad0e0d83-dded-4a8d-8a5f-599b91942bc0	a4d36caa-56bd-42df-9d53-ddba41d92357	229	226	2	1	0	0	0	0	0	0	2026-10-07 02:35:13.608262+00	2026-10-07 02:38:57.151705+00
154199bd-1d7d-4ff5-b020-85d8cb1a6d89	d52078e4-3413-4909-b286-fae0782ffdf8	83	0	3	80	0	0	0	0	0	0	2026-10-07 02:35:16.171245+00	2026-10-07 02:38:58.889634+00
7f436e3d-8c48-482b-9ccb-7c3cb60a31a6	56ad7a2b-86e7-4ee5-94a3-28c7dda9af5e	65	11	44	10	0	0	0	0	0	0	2026-10-07 02:35:16.990553+00	2026-10-07 02:38:59.811729+00
125e176d-e4b1-446c-9840-b8facc26ad1d	734dc60e-e336-476a-a0d9-add4e0be3ca7	65	53	0	0	0	0	12	0	0	0	2026-10-07 02:35:17.909487+00	2026-10-07 02:39:00.632361+00
0f45c188-c94c-4297-b5e8-fcf2587136c9	513dc0a6-aef2-40c4-8c4a-c1575f16fb9c	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:18.729462+00	2026-10-07 02:39:01.451503+00
e37f116f-2604-42a6-956f-7433bffcb590	0a953550-0579-44cc-8e7a-623c5c5b4709	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:19.54867+00	2026-10-07 02:39:02.475206+00
b1744014-558f-4a59-b7cc-98f5a01337a5	e2c77527-ddf9-41d1-b602-50c29b80f0da	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:20.366929+00	2026-10-07 02:39:03.292395+00
0cd33249-7428-43d3-ae34-0173c6d0f686	aa2551c0-d3a0-4e9a-89c3-6436c06b3b9c	257	206	1	42	8	0	0	0	0	0	2026-10-07 02:35:21.28935+00	2026-10-07 02:39:04.111971+00
4f2bb4e9-740b-4261-8936-25b5fa84b78d	55fd9cce-7c1c-41d4-b0ae-35e57b92f7cd	132	124	0	3	4	1	0	0	0	0	2026-10-07 02:35:22.093386+00	2026-10-07 02:39:04.930975+00
1df1bc5b-af6c-498a-8186-b23733366bdd	ddd05814-f0c1-45ab-b680-9630ffd19a78	96	95	0	0	1	0	0	0	0	0	2026-10-07 02:35:22.927326+00	2026-10-07 02:39:05.75174+00
934fecad-de79-4b98-8285-aa7de79af012	a3837ef0-f794-4f4c-90c5-98b8472bc231	83	69	0	0	0	0	14	0	0	0	2026-10-07 02:35:23.849493+00	2026-10-07 02:39:06.672408+00
a9b8c312-a2db-4f34-b6e5-4e77155df53c	48fa8d82-a349-4548-a665-8ddd2c51f79f	81	0	0	81	0	0	0	0	0	0	2026-10-07 02:35:24.670305+00	2026-10-07 02:39:07.49188+00
817aa56c-220b-4375-be6b-98a7cce9133d	e4ccebaa-9446-41dc-a1e3-2c68908fc683	57	55	0	0	0	0	2	0	0	0	2026-10-07 02:35:25.488854+00	2026-10-07 02:39:08.311658+00
ff226321-020f-4360-b008-d887308b81af	e21e5d37-426e-4454-af4d-3dfaf66cf6a1	152	63	5	57	27	0	0	0	0	0	2026-10-07 02:35:28.150152+00	2026-10-07 02:39:10.051799+00
c53e4eae-450a-4c08-a200-7898a4192d09	a7f22e8f-fb3b-444e-956e-96012b4ca80f	122	22	0	91	9	0	0	0	0	0	2026-10-07 02:35:28.970939+00	2026-10-07 02:39:10.872127+00
aa7a4ec8-90ea-4fd3-a804-d0c736fbd2f0	b31094d9-e3cd-434d-a693-db2584d6c0fa	112	106	0	0	2	0	4	0	0	0	2026-10-07 02:35:29.789618+00	2026-10-07 02:39:11.690464+00
0b763255-0137-4bcb-aca7-ad971a0727f6	729617e4-3bde-453a-8e27-bce2cc6ceab5	110	103	0	0	7	0	0	0	0	0	2026-10-07 02:35:30.607493+00	2026-10-07 02:39:12.508736+00
66f4cadc-1aee-4422-bf0f-ee29ca6afd23	b460c524-76b2-4ffc-9643-b48068d5bc99	2	0	0	2	0	0	0	0	0	0	2026-10-07 02:35:31.427315+00	2026-10-07 02:39:13.328627+00
bf325643-641f-40d3-a34e-a5f31a04e4eb	61e6b58f-e873-4582-a922-fd71a8b1a96b	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:32.759951+00	2026-10-07 02:39:14.148397+00
ae09c157-a7e2-4ae7-bc22-bc739e6e1580	531f3054-c593-469b-b2c9-b9989d1cfbc7	183	0	33	134	16	0	0	0	0	0	2026-10-07 02:35:33.781722+00	2026-10-07 02:39:15.069362+00
f0abfdb5-91ce-4dc5-bd76-f7f02c323b81	19c19dab-e537-477e-8878-1cddd8387687	115	26	4	3	82	0	0	0	0	0	2026-10-07 02:35:34.586529+00	2026-10-07 02:39:15.990529+00
45c26036-b03f-428e-922e-0b0d27a324d6	cd930460-899c-422a-b2fd-f305e8855de0	83	69	2	2	0	9	1	0	0	0	2026-10-07 02:35:35.421633+00	2026-10-07 02:39:16.808148+00
045dd443-d875-4660-8d33-167281428085	60d6fc99-4ced-4782-afc6-c7cf8e316688	77	46	3	2	26	0	0	0	0	0	2026-10-07 02:35:36.239184+00	2026-10-07 02:39:17.604794+00
87371644-e2b2-45a2-99cf-ae2c2f8b18fe	7590bebf-c1f1-47ad-a779-0f920e8c7b2c	61	38	0	7	16	0	0	0	0	0	2026-10-07 02:35:37.05776+00	2026-10-07 02:39:18.698933+00
05d01552-7685-43be-a793-ef8823c8c737	98c6521c-15a6-4efe-b6ed-63484a3ec0d3	55	40	1	2	12	0	0	0	0	0	2026-10-07 02:35:37.878059+00	2026-10-07 02:39:20.600488+00
8cf7e34f-8f14-46cf-8eaa-a20ef1d70420	160534ed-0be6-46bc-a32f-9c7aaeab9f32	266	123	1	131	11	0	0	0	0	0	2026-10-07 02:35:38.799744+00	2026-10-07 02:39:21.726129+00
f886929c-fb83-4714-b259-354ee8825564	445ae2e4-ab2e-425b-8bfe-670ad2e508c6	243	108	21	43	70	1	0	0	0	0	2026-10-07 02:35:39.619379+00	2026-10-07 02:39:22.647517+00
074b662e-8c28-4473-907e-16804acf0029	cfec32f8-f787-49a2-b1da-8722e8b83fe5	164	0	0	164	0	0	0	0	0	0	2026-10-07 02:35:40.539984+00	2026-10-07 02:39:24.08286+00
05633212-52ae-4c44-8aed-34f3554478c3	a5e15ed3-eef4-44b8-9ed1-0413863f1b94	99	57	3	0	26	13	0	0	0	0	2026-10-07 02:35:41.359617+00	2026-10-07 02:39:25.106064+00
cbb6dfcc-9a02-44b1-a20c-8eaa580a961f	4ea8e816-a16c-447c-a5e1-b8272f525a8c	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:42.281523+00	2026-10-07 02:39:26.026611+00
4f674fb8-8dc7-4b04-8a3a-cb5aaed0b5a3	b1669d64-f58d-4480-ad02-2ea106abb6e1	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:43.100114+00	2026-10-07 02:39:26.949245+00
404b28e5-1a96-4cc5-8706-a7aea8be9724	e30ccabd-2e84-4961-a6c1-7d65bb0f12bb	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:43.920101+00	2026-10-07 02:39:27.767534+00
ff9e2b12-2dcb-4a11-adb8-92191f549f3c	874f953f-bbd9-4678-b05e-b8537813ab75	240	87	0	15	138	0	0	0	0	0	2026-10-07 02:35:44.740254+00	2026-10-07 02:39:28.587522+00
6a5e8605-00ba-44df-a1e0-9e518d42981a	7883b3b6-e4c7-42c5-ac68-9d7781233c8d	92	45	0	0	47	0	0	0	0	0	2026-10-07 02:35:45.559074+00	2026-10-07 02:39:29.406277+00
2b21d9bc-c817-4883-8b79-9036dc196555	a5f3f99f-c053-42c0-8259-872597e4d830	82	0	0	52	30	0	0	0	0	0	2026-10-07 02:35:46.377571+00	2026-10-07 02:39:31.23496+00
fc43f0f4-3751-4eeb-9360-111a2fb1322e	c8653b1e-c6c0-4d72-b166-2e6a35eb9688	82	0	0	82	0	0	0	0	0	0	2026-10-07 02:35:47.19687+00	2026-10-07 02:39:32.172128+00
04776466-6406-4c50-9ecf-2b7481d13a4a	fc0f0e01-8afd-4bd9-a8ee-0b02e7ec5a42	65	65	0	0	0	0	0	0	0	0	2026-10-07 02:35:48.016142+00	2026-10-07 02:39:33.195297+00
9220527d-b699-463c-bbc0-074b281fb674	0e1bbd5e-4e25-48ad-8b70-973a9e63ebc2	2	0	0	2	0	0	0	0	0	0	2026-10-07 02:35:48.835941+00	2026-10-07 02:39:34.218482+00
82e53852-b402-46be-9447-129486ac877d	745cb7d3-db9d-4e18-b14e-574458fdcd22	1	0	1	0	0	0	0	0	0	0	2026-10-07 02:35:49.654739+00	2026-10-07 02:39:35.040621+00
0e232c05-2703-4a0e-b597-e5704303d1e4	7c3f4c7f-d73a-40b7-a31d-c08d1ae94451	197	190	2	3	0	1	1	0	0	0	2026-10-07 02:35:50.575991+00	2026-10-07 02:39:36.266983+00
36a62106-cae4-4f3d-982a-d6d49324b730	3838c391-b0e0-42c5-a09c-8fd620252be1	74	64	0	0	0	0	10	0	0	0	2026-10-07 02:35:51.393754+00	2026-10-07 02:39:37.085717+00
96d637cf-6a56-4c90-8223-f04d7716b3fd	e6be35f6-a27f-479a-bcf3-fadd7aeef14d	38	10	4	22	1	1	0	0	0	0	2026-10-07 02:35:53.035346+00	2026-10-07 02:39:38.726761+00
8b8d9308-ca3d-4cd3-9500-f252557a3896	5acf4047-e76a-4ffe-9112-7a825653a926	3	0	0	3	0	0	0	0	0	0	2026-10-07 02:35:53.851475+00	2026-10-07 02:39:39.633199+00
6f635059-e62a-49f2-8636-792891c040b9	082ac61d-e97f-4cf6-9d43-08c181b77d61	2	0	0	2	0	0	0	0	0	0	2026-10-07 02:35:54.671342+00	2026-10-07 02:39:40.46496+00
45bcc84c-acec-4c1d-a119-9b316caae94c	70658166-e1b6-4daf-a821-d2d64e737ceb	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:55.490659+00	2026-10-07 02:39:41.284221+00
cdf18624-66dc-4e33-86ce-51c5693101b7	c573ed4d-1c61-482b-a199-db6bc25ae3f4	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:56.309484+00	2026-10-07 02:39:42.207343+00
0c7d2e7d-b31a-4303-ada4-348da5cc8f7d	509ac1dd-cc5f-415e-b37c-01f3a7cf80c9	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:57.129121+00	2026-10-07 02:39:43.127562+00
8aef9e31-a486-480d-bdc5-dabec0112655	d7a02271-3aa6-402f-bc6c-14c48eedb271	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:58.027251+00	2026-10-07 02:39:43.94893+00
40826378-c308-4e41-9d52-5367b46c7e26	5cb16ded-85a7-4eed-809d-419ef6d46561	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:58.972951+00	2026-10-07 02:39:44.970588+00
0734b597-23c8-4361-b536-e37ca45ba3a6	2dfbb7da-c791-4fa8-b812-dd8e9b851b07	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:35:59.793183+00	2026-10-07 02:39:45.783475+00
c81e0c2c-3724-45d4-8b5b-d2421e6c1506	fc357b3b-6286-45cf-9b59-e480803d5ecc	183	87	0	2	90	4	0	0	0	0	2026-10-07 02:36:01.482453+00	2026-10-07 02:39:46.60938+00
8f453ee0-5ba5-41f8-95c9-1211e4ede8bc	d1e1671b-a979-4fa3-82b5-7a8faa80b021	144	0	0	83	61	0	0	0	0	0	2026-10-07 02:36:03.766256+00	2026-10-07 02:39:47.428346+00
887d5dd6-2923-4798-ba40-825057c44daa	c5989ce5-14b2-49f5-8ff2-e018ebc06586	95	95	0	0	0	0	0	0	0	0	2026-10-07 02:36:05.683517+00	2026-10-07 02:39:48.247821+00
bbea88f5-90b3-420a-9695-9948e029eb36	b9fe29aa-3087-4ba2-86b6-bad08471f861	54	52	0	0	0	0	2	0	0	0	2026-10-07 02:36:07.927387+00	2026-10-07 02:39:49.067002+00
a3ae80bd-7e83-435d-b1ee-5c43b0821eb9	6d76d22f-d556-494c-9a12-bddd07e714ff	39	0	0	39	0	0	0	0	0	0	2026-10-07 02:36:10.285328+00	2026-10-07 02:39:49.88511+00
aa185916-cc2b-4ca6-a20a-427b2a646b30	557729d1-0684-43dd-8246-379584e382b4	2	0	0	2	0	0	0	0	0	0	2026-10-07 02:36:11.965716+00	2026-10-07 02:39:50.704046+00
14a7d3d2-5fb4-4240-a861-403e3c3136c0	0d42d946-bb46-40fb-9d46-e1fd18c50e9c	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:13.209901+00	2026-10-07 02:39:51.525798+00
10a30f30-23c9-4545-af82-9db5b5dedbe0	1b20fff3-17ba-433c-812f-40ea325f53c8	145	145	0	0	0	0	0	0	0	0	2026-10-07 02:36:14.335919+00	2026-10-07 02:39:52.343784+00
81084dba-f822-44a3-8066-0ab1c2895a55	b9a08a68-cf18-45e4-aad3-690f9906d790	126	119	0	0	0	0	7	0	0	0	2026-10-07 02:36:16.07297+00	2026-10-07 02:39:53.263344+00
711843b3-c317-47d2-a80b-b8c8d55241d5	b999d4ad-01e5-4b29-a754-7fb6b873c86f	110	0	0	110	0	0	0	0	0	0	2026-10-07 02:36:16.894086+00	2026-10-07 02:39:54.08942+00
d6f9fa17-8fd8-41da-b01b-03a3a577b475	06fe6619-7150-41d1-b231-9fd261899dc3	104	104	0	0	0	0	0	0	0	0	2026-10-07 02:36:17.714885+00	2026-10-07 02:39:55.10263+00
ceba59a2-55b0-4ae0-bcde-c34c7cd7b18e	f20bf177-4eec-4d24-a1a5-9402c325c16e	83	56	0	27	0	0	0	0	0	0	2026-10-07 02:36:18.531028+00	2026-10-07 02:39:55.924318+00
0b6fccec-255b-4505-8a6e-15ffb5da3d57	26a4f47b-29d1-438f-8005-38a1094cf342	39	0	0	39	0	0	0	0	0	0	2026-10-07 02:36:19.544469+00	2026-10-07 02:39:56.755423+00
3d109d73-3060-42a5-89bd-cb412a1dbd6a	5efb34f7-870e-4dea-b08d-065e987fd760	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:20.370821+00	2026-10-07 02:39:57.574977+00
ca8e4934-3e0a-462a-826e-968cce96d982	5de2cc05-1aa0-44e2-917b-91586585aa7d	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:21.191786+00	2026-10-07 02:39:58.380793+00
c8472b87-bebb-4edc-a7be-e3529466f8fe	0c44d176-3756-45a2-95e1-61b8eea02656	200	185	10	3	2	0	0	0	0	0	2026-10-07 02:36:22.114221+00	2026-10-07 02:39:59.205458+00
2fe90869-8d90-4ad4-a9ad-8bea9ed19b71	a6c8bab8-a8cc-4a77-9d5e-647a19583b30	110	0	0	109	0	0	0	0	1	0	2026-10-07 02:36:23.139128+00	2026-10-07 02:40:00.023396+00
bc5b321a-64c3-4dfb-8f77-42b72263abba	36e2cfc6-f64a-44c4-a265-b493ec99d488	80	71	0	0	0	0	9	0	0	0	2026-10-07 02:36:24.060879+00	2026-10-07 02:40:00.843075+00
25dd8011-68c2-47e4-a175-af914eef5c4e	203c2b83-de01-4205-849e-e25d6559d895	179	87	52	20	17	3	0	0	0	0	2026-10-07 02:34:15.003041+00	2026-10-07 02:37:49.976863+00
b8916cd9-cd95-4821-a364-4491756b2e3d	1b46514d-405d-43b9-97dc-0cdbae648d7e	80	79	0	0	0	0	1	0	0	0	2026-10-07 02:34:25.788601+00	2026-10-07 02:38:00.933565+00
406a6ab2-42b0-42ca-8679-b7b616b59192	43a4b134-b8aa-4f26-bdc6-31a35a53ec21	83	61	1	0	18	3	0	0	0	0	2026-10-07 02:34:50.976569+00	2026-10-07 02:38:34.313123+00
3e9953fd-4eb1-4766-9572-c551863b39c1	975bc6b6-efed-47c5-aaaa-3c2d8af707e8	109	35	46	26	0	1	0	0	1	0	2026-10-07 02:35:14.530582+00	2026-10-07 02:38:58.058214+00
fb13096f-0e33-460c-bed2-6a342e88fd8c	9924f78f-e97b-437f-97df-48f028f11d50	51	43	0	1	1	4	2	0	0	0	2026-10-07 02:35:27.331045+00	2026-10-07 02:39:09.23225+00
00984d96-f4b1-4501-81b4-54f9dc3c4e48	d304385d-448c-4de8-a42a-8cee8e40e050	49	46	1	2	0	0	0	0	0	0	2026-10-07 02:35:52.214977+00	2026-10-07 02:39:37.907118+00
83a293db-794d-4d6a-8ef1-41954cd99c02	dc0afd29-9763-4d9f-ac40-1e7b76f732ba	66	23	10	26	0	7	0	0	0	0	2026-10-07 02:36:24.983117+00	2026-10-07 02:40:01.866681+00
0ce4b484-7542-43c3-8e89-64be8f12ffe6	83259979-0eef-48d9-b980-1c4dc06b7a3a	60	0	0	60	0	0	0	0	0	0	2026-10-07 02:36:26.00516+00	2026-10-07 02:40:02.686678+00
bf7750a7-892b-4abb-9d8d-27f0893351d0	43c5a562-8547-44ab-9c6f-a192c8b9a885	4	0	0	4	0	0	0	0	0	0	2026-10-07 02:36:27.034712+00	2026-10-07 02:40:03.506483+00
3b95bd5a-2eb3-47fe-8cf0-80a64c7daa83	c5e9423d-a537-40ee-9103-8708c340f5c3	4	0	0	4	0	0	0	0	0	0	2026-10-07 02:36:28.049394+00	2026-10-07 02:40:04.323893+00
4ec82212-9862-4f47-b4c6-ca3f1b3ccb03	797d883e-44b9-4c0e-90c8-a3c1fd4fb8ad	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:28.873968+00	2026-10-07 02:40:05.144107+00
4077f19a-92b8-404a-9725-acbb5e253304	13bc1f74-4417-4f60-bf58-9958ecc1dfb1	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:29.692534+00	2026-10-07 02:40:05.962991+00
de5b19ea-1598-4970-84ed-f563d96800a3	3d0e47f4-fd9b-4b77-9bdb-bcd57b806e04	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:30.714392+00	2026-10-07 02:40:06.884963+00
35e11b39-68e5-4863-a04c-a2d3d9453e16	1fa7d4e8-8488-4591-b87c-93ed429d9022	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:31.536875+00	2026-10-07 02:40:07.703788+00
3b3cd206-e29d-4264-8f4f-695b337b47e4	3575a4f1-37ca-49ed-9798-e3abf8e046ec	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:32.355887+00	2026-10-07 02:40:08.525155+00
dfa10959-fc6e-4849-aa16-bfc8fb96471f	5c07e45e-2051-4d5c-882d-b9f2153666df	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:33.175471+00	2026-10-07 02:40:09.344103+00
7b11ae95-b714-4300-998b-eb42095e3c88	c91b366b-082c-4767-8bc6-aa388f88aa7d	128	118	2	2	0	3	3	0	0	0	2026-10-07 02:36:34.098305+00	2026-10-07 02:40:10.365881+00
f3b98f0e-d9d2-4c67-91b4-7696ca1d8f1e	6efd2606-ca79-48aa-a991-9ca19e508321	99	92	0	2	5	0	0	0	0	0	2026-10-07 02:36:34.914224+00	2026-10-07 02:40:11.186535+00
365ca1cc-4234-4458-8a7e-e483fd20ce0f	9ded28c7-fe30-4244-beaa-2cfcde376dd7	89	28	0	23	38	0	0	0	0	0	2026-10-07 02:36:35.836993+00	2026-10-07 02:40:12.005101+00
b4d1de00-1589-45c8-95cd-b6fc2ff65f6e	219ffeee-7189-4528-936f-4a413be30a53	77	64	0	0	0	13	0	0	0	0	2026-10-07 02:36:36.655+00	2026-10-07 02:40:12.820907+00
51321def-7f1e-408e-b1e9-a9957c0a23e5	074a4d7a-5398-446a-a5d3-ab9eab81cfb5	77	73	0	0	0	4	0	0	0	0	2026-10-07 02:36:37.478681+00	2026-10-07 02:40:13.849676+00
68fe5b7b-18cf-4701-8872-42fb4799d9cb	abe0b6f2-59e5-4db4-8e3f-b26c17e1dbee	74	0	0	74	0	0	0	0	0	0	2026-10-07 02:36:38.395281+00	2026-10-07 02:40:14.666542+00
3f80142b-c391-44f6-8c5d-b586265de21b	726e5217-411d-422e-9f64-1c7b2f831d22	176	53	71	9	39	4	0	0	0	0	2026-10-07 02:36:39.42221+00	2026-10-07 02:40:15.58849+00
5a8f472a-0bac-4fa0-af68-ecfcba169955	06608bc3-738b-47cd-9d73-401967ec2ca2	91	60	7	0	19	3	1	1	0	0	2026-10-07 02:36:40.342671+00	2026-10-07 02:40:16.407654+00
5c61c608-32c3-4f9c-9f29-9f39c89d1cf8	af856927-b41a-4e9a-a8af-ca7608f3b483	77	0	0	76	1	0	0	0	0	0	2026-10-07 02:36:41.265553+00	2026-10-07 02:40:17.227737+00
b5815200-7173-4a22-b3c9-4698d5dabb9a	d4f1968c-5665-4e2e-aa59-e6f594d3fbf1	73	30	23	1	19	0	0	0	0	0	2026-10-07 02:36:42.185132+00	2026-10-07 02:40:18.050905+00
2066a4f0-c53a-4cc0-9ca6-c240439f08ea	9824222c-a2b6-4e81-af8f-440da71ba2cd	68	0	0	68	0	0	0	0	0	0	2026-10-07 02:36:43.206036+00	2026-10-07 02:40:19.174609+00
c6fe8aee-0993-43c3-84c3-7b3667e1e8cb	03b8cf5e-47d9-4f09-9ee7-0a60135a916c	45	0	0	45	0	0	0	0	0	0	2026-10-07 02:36:44.131723+00	2026-10-07 02:40:19.993346+00
b5d8f866-4f34-4bae-89a3-719ca9fdc491	a67ba433-c25b-4515-9456-576d9898ce89	38	0	0	38	0	0	0	0	0	0	2026-10-07 02:36:45.052794+00	2026-10-07 02:40:20.913817+00
0e9b3e04-e06d-4cf8-afc6-a5d4b230c4ff	fbae22c5-dcc7-4ff0-bd49-bb6bfcdae147	8	0	0	8	0	0	0	0	0	0	2026-10-07 02:36:45.874761+00	2026-10-07 02:40:21.835161+00
54c73f3c-2f8c-4cef-a3b8-7873935cfbb3	f535bcc7-284e-463d-88f8-7a7dd9951b00	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:46.693852+00	2026-10-07 02:40:22.755879+00
c198c9fd-cc54-4588-beb1-9fb85e1bdf81	dcf894fa-3a6b-49dd-b1dc-db224acba0f2	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:47.507502+00	2026-10-07 02:40:23.577647+00
b0576e7d-5717-4f04-9f40-bf5f14006275	39010879-53da-45e1-bd16-f8806b82b760	108	99	0	0	0	0	8	1	0	0	2026-10-07 02:36:48.328994+00	2026-10-07 02:40:25.700343+00
174ff6cc-bda4-4ee8-b046-bf2dcc5470dd	25e7cceb-0239-4b65-aad7-64abb0743610	103	36	0	67	0	0	0	0	0	0	2026-10-07 02:36:49.252549+00	2026-10-07 02:40:28.134402+00
d5684219-cb7d-4ce3-b1f6-438008090121	57b17400-2c17-4256-8ac8-736bbf5ff60b	82	80	0	1	0	0	1	0	0	0	2026-10-07 02:36:50.070852+00	2026-10-07 02:40:30.48999+00
88f1b79a-ac13-42ce-b44a-097ab85e1242	774a0c56-ded9-4cec-9388-32b182180bbb	66	0	0	66	0	0	0	0	0	0	2026-10-07 02:36:50.88991+00	2026-10-07 02:40:34.280199+00
71201fed-c049-4186-9053-fd959488335f	a9a6bf6b-1fb1-4298-b4b1-fa0ee5106476	61	61	0	0	0	0	0	0	0	0	2026-10-07 02:36:52.018103+00	2026-10-07 02:40:36.379062+00
59cdb809-6fe2-4f68-8fff-2e12b1d16367	93fd452e-c171-4879-b9f9-8b50ab57ca2b	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:52.938163+00	2026-10-07 02:40:37.60563+00
94c08369-55a4-457f-820e-7de271aec91b	833692ce-0dba-4992-8e8c-fac8e982a4c5	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:53.757483+00	2026-10-07 02:40:38.527804+00
622bb128-b1e6-4b68-92a2-9ecc7b196ec1	46e5a90a-67c7-4f58-a34e-8e937f166c7d	125	25	0	100	0	0	0	0	0	0	2026-10-07 02:36:54.678509+00	2026-10-07 02:40:39.449333+00
3a1b27ba-d78b-4214-bc4d-a80a306dd520	adb4e81e-cc71-4a5d-b54f-09cb1c996fae	102	97	0	0	0	0	5	0	0	0	2026-10-07 02:36:55.596287+00	2026-10-07 02:40:40.369692+00
9e0f5a3f-886b-46aa-807b-70cca39a7662	4227248d-3b3e-4b86-b8e6-233b90c29a8c	94	85	0	0	0	9	0	0	0	0	2026-10-07 02:36:56.419246+00	2026-10-07 02:40:41.290879+00
9c66bb0e-efee-4170-9ef1-fde56a28f64c	5a1fbf61-cf30-4de2-995b-e2056a4a5fbd	86	0	0	86	0	0	0	0	0	0	2026-10-07 02:36:57.237672+00	2026-10-07 02:40:42.212596+00
ba381870-0a44-40c2-9d6e-f6cff250186a	d82daef0-41d0-46b8-919c-2a7507774d2b	86	80	0	0	0	6	0	0	0	0	2026-10-07 02:36:58.057402+00	2026-10-07 02:40:43.033746+00
58a08404-655f-4188-87a2-6c8cf3da7a9f	e9944213-cde8-461c-90f0-132d2ab89af0	2	0	0	2	0	0	0	0	0	0	2026-10-07 02:36:58.979199+00	2026-10-07 02:40:43.859069+00
7cc4b331-06c7-4e06-b05c-a0ae719b2c08	2714938b-c13b-4263-b199-d288a72b9a91	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:36:59.776346+00	2026-10-07 02:40:44.670842+00
9ebf9c2c-5f4c-426a-8a16-0d9408761256	5e6703a5-9e8b-4549-b6ee-e67834d8e4c0	99	96	0	0	0	0	3	0	0	0	2026-10-07 02:37:00.822853+00	2026-10-07 02:40:45.592215+00
545a5863-3dec-49db-b0b9-bbe773654e1d	fe5845e1-cb9a-4118-add8-e3d142a4f08a	88	45	0	43	0	0	0	0	0	0	2026-10-07 02:37:01.645497+00	2026-10-07 02:40:46.411159+00
5aa0679e-f04d-48cd-94be-7a8cc458214f	a17bca12-c1b5-4fcb-9f6f-6304c890494e	86	85	0	0	0	0	1	0	0	0	2026-10-07 02:37:02.564175+00	2026-10-07 02:40:47.232391+00
cc9a7775-e343-45a1-a846-b19585381098	d543af9f-0a59-4c97-869e-db754a767e8f	70	69	0	0	0	0	1	0	0	0	2026-10-07 02:37:03.383169+00	2026-10-07 02:40:48.0364+00
ce522ca5-353f-4ee6-b84c-d3a99b74d609	c30b8ee3-940b-4c39-9b26-60fec03217fa	59	0	0	59	0	0	0	0	0	0	2026-10-07 02:37:04.203847+00	2026-10-07 02:40:48.868716+00
a5b4b354-f4c2-4bdb-92e5-bcbe23a6189f	5f0be1bd-1ba5-4e07-83b4-b34f5dd16a3e	6	0	0	6	0	0	0	0	0	0	2026-10-07 02:37:05.021484+00	2026-10-07 02:40:49.688119+00
6f517d5d-42a4-47ff-9739-e66e8d6f9517	82934f42-6ba3-4f04-97a0-c656328b9d54	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:37:05.929942+00	2026-10-07 02:40:50.507084+00
75809a1a-3942-4295-ba07-b6f434770f7f	dd8d8073-cfc2-412c-9cf2-39a2b7f97b8c	146	145	0	0	0	0	0	1	0	0	2026-10-07 02:37:06.762289+00	2026-10-07 02:40:51.429179+00
cc8fa7f5-2644-490c-b1ee-d2983efd3aa5	3846f1ef-1d10-4996-b202-44fdca6900d9	87	79	0	0	0	0	8	0	0	0	2026-10-07 02:37:07.683638+00	2026-10-07 02:40:52.247608+00
5cc549cd-139b-414e-baec-0ab30c04e3b8	9ac6debc-8398-472f-891b-2b077ec04936	72	0	0	72	0	0	0	0	0	0	2026-10-07 02:37:08.502273+00	2026-10-07 02:40:53.134904+00
8dcf8634-e06f-46bc-a871-c0f05297c017	37b4d56a-ae55-4bbb-b51a-12f03b542cf2	66	24	0	42	0	0	0	0	0	0	2026-10-07 02:37:09.528477+00	2026-10-07 02:40:54.09047+00
fa3add96-7bcc-4497-8388-5a6e77bb484b	1d3cc5af-e977-4405-911a-1762fe3627dd	60	56	0	0	0	0	4	0	0	0	2026-10-07 02:37:10.450186+00	2026-10-07 02:40:54.91075+00
76009b51-b688-4de8-a658-8844a2875a1e	006b7be2-ce34-4863-bbde-e01a3d2d21bd	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:37:11.575267+00	2026-10-07 02:40:55.73281+00
1059490c-3f97-45e5-9c04-3948aa666d13	85e0b851-be4b-43bc-adcb-20fcfc65da3f	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:37:12.496899+00	2026-10-07 02:40:56.54942+00
250058b8-8aa5-441f-960f-80871747a4f2	8b376aa6-1400-430d-b9d8-86ffb00ba187	257	66	11	31	149	0	0	0	0	0	2026-10-07 02:37:13.315481+00	2026-10-07 02:40:57.368505+00
0461658f-e6f7-46e9-8a7e-4bd9e2016416	8df60eed-06d2-4b4b-84a0-56a0523afb1a	101	0	0	24	76	1	0	0	0	0	2026-10-07 02:37:14.22515+00	2026-10-07 02:40:58.187556+00
25815660-e1f4-475c-bda6-1c76eb49b1e8	64092cc1-a005-4eb7-970e-23f10f9e1040	64	0	0	64	0	0	0	0	0	0	2026-10-07 02:37:15.055413+00	2026-10-07 02:40:59.212568+00
3ce681a9-db33-4d60-94b2-a771eca89595	87b66e0b-bffd-4495-b76f-6cf3a6b12fc7	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:37:15.977711+00	2026-10-07 02:41:00.134212+00
4f25bb98-6acb-48fa-a5c4-b604b7a42509	5d219c1c-fcc5-4a3c-92ab-88f3fcda68ba	1	0	0	1	0	0	0	0	0	0	2026-10-07 02:37:17.470605+00	2026-10-07 02:41:00.952236+00
\.


--
-- TOC entry 4085 (class 0 OID 25997)
-- Dependencies: 410
-- Data for Name: fasih_regions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fasih_regions (id, region_code, island_name, region_name, created_at, updated_at) FROM stdin;
5b6f6387-03f5-42e6-846b-b29d5eb3cdf8	3101020001002000	PULAU PANGGANG	RT 006 RW 03	2026-10-07 02:34:15.854065+00	2026-10-07 02:37:50.793309+00
442aac94-b24c-4682-aa5c-42051077be9c	3101020001001500	PULAU PANGGANG	RT 001 RW 03	2026-10-07 02:34:16.677324+00	2026-10-07 02:37:51.604623+00
37dd3a5d-72af-48d7-a05a-23ffe720cbc0	3101020001000100	PULAU PANGGANG	RT 001 RW 01	2026-10-07 02:34:18.311792+00	2026-10-07 02:37:53.251281+00
b1c53b47-2e59-4feb-9795-96582f6167be	3101020001000500	PULAU PANGGANG	RT 005 RW 01	2026-10-07 02:34:19.132909+00	2026-10-07 02:37:54.070548+00
736c5a9a-887b-41bb-920c-31ee3b2e0347	3101020001001900	PULAU PANGGANG	RT 005 RW 03	2026-10-07 02:34:19.951745+00	2026-10-07 02:37:54.889706+00
dbc4ccd4-ab8a-4bac-8292-95dfbe231217	3101020001200200	PULAU PANGGANG	PULAU GOSONG PRAMUKA/NUSA RESTO	2026-10-07 02:34:20.769474+00	2026-10-07 02:37:55.708992+00
d1cfd59a-cf21-4370-acb8-db94796a41dd	3101020001200700	PULAU PANGGANG	PULAU KOTOK KECIL	2026-10-07 02:34:21.589183+00	2026-10-07 02:37:56.631688+00
94619f7d-3854-4a9a-b913-22d9340d242e	3101020001201200	PULAU PANGGANG	PULAU SAMPIT	2026-10-07 02:34:22.407875+00	2026-10-07 02:37:57.449152+00
04347d65-e9c7-4dc3-87b7-4f0230443a1d	3101010001000100	PULAU TIDUNG	RT 001 RW 001	2026-10-07 02:34:23.331043+00	2026-10-07 02:37:58.473653+00
f70c8730-28fd-4095-8718-0a3f9ea20dac	3101010001001100	PULAU TIDUNG	RT 004 RW 002	2026-10-07 02:34:24.149719+00	2026-10-07 02:37:59.292531+00
8481d835-4038-4de9-bc21-e6b34f398905	3101010001000600	PULAU TIDUNG	RT 006 RW 001	2026-10-07 02:34:24.970011+00	2026-10-07 02:38:00.112632+00
aba4f4fa-10e3-4a98-94e2-1e6e89b87ea9	3101010001001300	PULAU TIDUNG	RT 006 RW 002	2026-10-07 02:34:25.788601+00	2026-10-07 02:38:00.933565+00
1c227fbe-92a1-4961-869f-4bb690209d44	3101010001001800	PULAU TIDUNG	RT 004 RW 003	2026-10-07 02:34:26.608077+00	2026-10-07 02:38:01.853704+00
b005a45f-6669-4ae1-ae3e-6e3760bf275b	3101010001002200	PULAU TIDUNG	RT 008 RW 003	2026-10-07 02:34:27.427137+00	2026-10-07 02:38:02.673344+00
33c28cd9-fe2f-4ccb-941f-e543f5c75837	3101010003000500	PULAU UNTUNG JAWA	RT 002 RW 002	2026-10-07 02:34:28.247119+00	2026-10-07 02:38:03.492133+00
f7098f16-ba43-4a82-acd7-86f65a73b429	3101010003000100	PULAU UNTUNG JAWA	RT 001 RW 001	2026-10-07 02:34:29.066013+00	2026-10-07 02:38:04.312348+00
7175cfdf-3ece-4728-ad68-44ffbde34f88	3101010003000700	PULAU UNTUNG JAWA	RT 001 RW 003	2026-10-07 02:34:29.884095+00	2026-10-07 02:38:05.129909+00
88aebf76-1ba1-41ca-bfea-1f42992665df	3101010003000300	PULAU UNTUNG JAWA	RT 003 RW 001	2026-10-07 02:34:30.702468+00	2026-10-07 02:38:05.953482+00
e7237a01-4050-45da-b9b2-4806ff022d7a	3101010003000400	PULAU UNTUNG JAWA	RT 001 RW 002	2026-10-07 02:34:31.723791+00	2026-10-07 02:38:06.986683+00
94d4f52c-5c82-48bf-a0d5-873b03b13afe	3101010003200300	PULAU UNTUNG JAWA	PULAU CIPIR	2026-10-07 02:34:32.650278+00	2026-10-07 02:38:07.895502+00
84272dcf-4657-4cfc-ba23-094e41742381	3101010003200200	PULAU UNTUNG JAWA	PULAU AYER	2026-10-07 02:34:33.462632+00	2026-10-07 02:38:08.818357+00
f278d779-b2c5-46ae-8a7f-0396f5973d9f	3101010003200400	PULAU UNTUNG JAWA	PULAU KELOR	2026-10-07 02:34:34.273463+00	2026-10-07 02:38:09.73786+00
0abbc241-8031-43f5-b9b4-b22b0af05c3d	3101010003200500	PULAU UNTUNG JAWA	PULAU ONRUST	2026-10-07 02:34:35.105964+00	2026-10-07 02:38:10.556409+00
a9a5f498-5551-4116-9971-edadcfb53ee0	3101010003200600	PULAU UNTUNG JAWA	PULAU RAMBUT	2026-10-07 02:34:36.026965+00	2026-10-07 02:38:11.375359+00
b0cc52a8-37b0-4def-87d0-1565f73abc8b	3101010002001400	PULAU PARI	RT 004 RW 004	2026-10-07 02:34:36.846243+00	2026-10-07 02:38:12.916297+00
6287ff5d-f2c0-48ff-94b4-11647f622e60	3101010002001301	PULAU PARI	RT 003 RW 004	2026-10-07 02:34:37.767758+00	2026-10-07 02:38:15.001816+00
62a4f80b-0dc1-4ebc-85fe-cb31f418420c	3101010002001201	PULAU PARI	RT 002 RW 004	2026-10-07 02:34:38.587711+00	2026-10-07 02:38:17.268671+00
0575b14c-ffaa-41ad-bfeb-65fdc88b857d	3101010002300100	PULAU PARI	PULAU TIKUS	2026-10-07 02:34:39.510267+00	2026-10-07 02:38:19.431524+00
65f322d6-7dd3-49f8-bf50-d8990ee3cdfe	3101010003000900	PULAU UNTUNG JAWA	RT 003 RW 003	2026-10-07 02:34:41.249778+00	2026-10-07 02:38:24.076404+00
92baba82-6f7b-476c-b5e0-ef89704fbfbf	3101010003000600	PULAU UNTUNG JAWA	RT 003 RW 002	2026-10-07 02:34:42.175965+00	2026-10-07 02:38:25.101669+00
ffb73820-3ce1-427a-a821-2e10464125c2	3101010003000200	PULAU UNTUNG JAWA	RT 002 RW 001	2026-10-07 02:34:43.09436+00	2026-10-07 02:38:26.12467+00
70d9d4c0-13a7-48f0-b4dd-8ee6052e10a7	3101010003000800	PULAU UNTUNG JAWA	RT 002 RW 003	2026-10-07 02:34:43.913482+00	2026-10-07 02:38:27.147655+00
b8bce449-dd7c-476f-8396-9c6e98c35111	3101010003200100	PULAU UNTUNG JAWA	PULAU BIDADARI	2026-10-07 02:34:44.834037+00	2026-10-07 02:38:28.069924+00
056e051c-a91b-460a-8de4-513aedb8dc85	3101010003200700	PULAU UNTUNG JAWA	PULAU EDAM KECIL	2026-10-07 02:34:45.654291+00	2026-10-07 02:38:28.888476+00
18d9380e-f90e-44fa-a990-71c6e24b72ce	3101010003200800	PULAU UNTUNG JAWA	PULAU ENDAM	2026-10-07 02:34:46.473386+00	2026-10-07 02:38:29.706945+00
338f7cb8-c9fc-48ab-900a-d663dc5db8f6	3101010003200900	PULAU UNTUNG JAWA	PULAU DAPUR	2026-10-07 02:34:47.294484+00	2026-10-07 02:38:30.730457+00
ea925a6d-a534-4c8f-97fa-73dbb4b52e75	3101010003201100	PULAU UNTUNG JAWA	HUTAN MANGROVE	2026-10-07 02:34:48.316469+00	2026-10-07 02:38:31.651952+00
cce447d1-01ae-46ca-b125-4b8fc2057fe9	3101010001000900	PULAU TIDUNG	RT 002 RW 002	2026-10-07 02:34:49.237484+00	2026-10-07 02:38:32.576017+00
e9d15ca5-7c4b-49b9-84f7-16a08f7b4183	3101010001000800	PULAU TIDUNG	RT 001 RW 002	2026-10-07 02:34:50.057824+00	2026-10-07 02:38:33.494746+00
cf1dcd29-fee7-44c0-b52e-465a8e39dc79	3101010001002800	PULAU TIDUNG	RT 005 RW 004	2026-10-07 02:34:50.976569+00	2026-10-07 02:38:34.313123+00
a1b33237-e967-4954-bd55-e104665ad12b	3101010001001900	PULAU TIDUNG	RT 005 RW 003	2026-10-07 02:34:51.797534+00	2026-10-07 02:38:35.135601+00
e664ca4e-2cc5-4d0c-9b20-4fd26cb6d2c0	3101010001002700	PULAU TIDUNG	RT 004 RW 004	2026-10-07 02:34:52.617717+00	2026-10-07 02:38:35.952403+00
419dac8e-83e4-4854-aa3f-6dcd7e6b83ee	3101010001200200	PULAU TIDUNG	PULAU PAYUNG KECIL	2026-10-07 02:34:53.435185+00	2026-10-07 02:38:36.875294+00
b226c992-9ba1-404f-8e1b-f84932533e9e	3101010001200300	PULAU TIDUNG	PULAU KARANG BERAS	2026-10-07 02:34:54.254674+00	2026-10-07 02:38:37.695471+00
1a193310-f180-4878-9893-f81495d245d3	3101020001000300	PULAU PANGGANG	RT 003 RW 01	2026-10-07 02:34:55.06171+00	2026-10-07 02:38:38.513906+00
1352c94d-3eec-406f-9e4e-5ebbf041ac7e	3101020001000400	PULAU PANGGANG	RT 004 RW 01	2026-10-07 02:34:55.894925+00	2026-10-07 02:38:39.430527+00
2429b396-d64c-48f6-a881-b019e7100dba	3101020001001100	PULAU PANGGANG	RT 004 RW 02	2026-10-07 02:34:56.713556+00	2026-10-07 02:38:40.25338+00
7c5480d6-195c-4269-9e93-9c0d6c4f7131	3101020001001400	PULAU PANGGANG	RT 007 RW 02	2026-10-07 02:34:57.634736+00	2026-10-07 02:38:41.176597+00
1e6c7c1a-10c0-4d99-bafc-5245cc1fa3e4	3101020001001800	PULAU PANGGANG	RT 004 RW 03	2026-10-07 02:34:58.454291+00	2026-10-07 02:38:41.994035+00
eabe6776-c1fc-481a-ae00-0acabe3496d5	3101020001000700	PULAU PANGGANG	RT 007 RW 01	2026-10-07 02:34:59.270546+00	2026-10-07 02:38:42.916887+00
4df8a57d-6bc5-4e66-ae27-2389d6ab8d92	3101020001001300	PULAU PANGGANG	RT 006 RW 02	2026-10-07 02:35:00.092538+00	2026-10-07 02:38:43.723933+00
fcce704d-3cf4-45c1-9cb9-aa905390d97b	3101020001200100	PULAU PANGGANG	PULAU KARYA	2026-10-07 02:35:00.911951+00	2026-10-07 02:38:44.55469+00
c5e4038c-7a1a-486e-b5b3-17f4e860b45c	3101020001201100	PULAU PANGGANG	PULAU LAYAR	2026-10-07 02:35:02.550538+00	2026-10-07 02:38:46.193237+00
60c08bf0-f490-41ce-a825-d251cec822d8	3101020003000100	PULAU HARAPAN	RT 001 RW 01	2026-10-07 02:35:03.356206+00	2026-10-07 02:38:47.215717+00
f188fb47-f8c5-44a1-af21-fe28f0b19387	3101020003000700	PULAU HARAPAN	RT 001 RW 02	2026-10-07 02:35:04.189427+00	2026-10-07 02:38:48.034934+00
2e3820cf-30c7-4d91-a01d-c6234f516804	3101020003000500	PULAU HARAPAN	RT 005 RW 01	2026-10-07 02:35:05.108811+00	2026-10-07 02:38:48.854521+00
7206af60-f0f2-42de-a93c-bfa21a11169f	3101020003001000	PULAU HARAPAN	RT 004 RW 02	2026-10-07 02:35:06.134717+00	2026-10-07 02:38:49.763417+00
db545b21-dfa3-4cde-9e57-7948d384b2bc	3101020003000200	PULAU HARAPAN	RT 002 RW 01	2026-10-07 02:35:06.953933+00	2026-10-07 02:38:50.597391+00
21d0974f-19a7-499b-9520-2a743fe4b96a	3101020003000300	PULAU HARAPAN	RT 003 RW 01	2026-10-07 02:35:07.771367+00	2026-10-07 02:38:51.41666+00
141dc746-538b-4a6d-a6ca-91e5dfdef01a	3101020003201600	PULAU HARAPAN	PULAU PENJALIRAN BARAT	2026-10-07 02:35:08.592357+00	2026-10-07 02:38:52.234982+00
33d53a85-8379-4175-a2f3-833d58ccf315	3101020003201700	PULAU HARAPAN	PULAU NYAMPLONG	2026-10-07 02:35:09.411271+00	2026-10-07 02:38:53.054853+00
ef56d15d-2d80-40a6-908a-9cf4f3e3606b	3101020003201800	PULAU HARAPAN	PULAU REGIT	2026-10-07 02:35:10.230163+00	2026-10-07 02:38:53.868327+00
aaa2988d-8276-4109-b318-2e4063cd37e7	3101020003201900	PULAU HARAPAN	PULAU SEBARU BESAR	2026-10-07 02:35:11.049565+00	2026-10-07 02:38:54.692382+00
4eed725f-e202-4150-a2d4-35ef5f6fef01	3101020003202000	PULAU HARAPAN	PULAU GUSUNG LAGA BESAR	2026-10-07 02:35:11.970251+00	2026-10-07 02:38:55.510529+00
b77ce157-a48d-40f6-ad4c-b827f7bc7163	3101020003202100	PULAU HARAPAN	PULAU GUSUNG LAGA KECIL	2026-10-07 02:35:12.788912+00	2026-10-07 02:38:56.330703+00
c40adb65-f563-4fbd-86c2-62dadf4dd2da	3101020002002800	PULAU KELAPA	RT 007 RW 04	2026-10-07 02:35:13.608262+00	2026-10-07 02:38:57.151705+00
1f5b8781-9859-4698-bb4c-3698360e349b	3101020002001800	PULAU KELAPA	RT 005 RW 03	2026-10-07 02:35:14.530582+00	2026-10-07 02:38:58.058214+00
badf3311-95db-42e6-a638-67db9fdcb12e	3101020002003100	PULAU KELAPA	RT 003 RW 05	2026-10-07 02:35:16.171245+00	2026-10-07 02:38:58.889634+00
78dd765e-d8f2-4b0b-b06c-508d4838d4fa	3101020002002900	PULAU KELAPA	RT 001 RW 05	2026-10-07 02:35:16.990553+00	2026-10-07 02:38:59.811729+00
cf55c7c5-e3ae-4d46-8ec5-2bd76887867e	3101020002003000	PULAU KELAPA	RT 002 RW 05	2026-10-07 02:35:17.909487+00	2026-10-07 02:39:00.632361+00
d2335286-c1e2-445f-ad27-67b5f6476716	3101020002200200	PULAU KELAPA	PULAU MELINTANG KECIL	2026-10-07 02:35:19.54867+00	2026-10-07 02:39:02.475206+00
fc62db1f-7a07-4639-9664-d22f177ddd65	3101020002200300	PULAU KELAPA	PULAU MACAN KECIL	2026-10-07 02:35:20.366929+00	2026-10-07 02:39:03.292395+00
36ef4b89-be9e-4657-b719-02b3219dd07d	3101010001200100	PULAU TIDUNG	PULAU TIDUNG KECIL	2026-10-07 02:35:21.28935+00	2026-10-07 02:39:04.111971+00
e1c6cdc9-84a1-4ce0-b2ba-1b465f07dc7b	3101010001001700	PULAU TIDUNG	RT 003 RW 003	2026-10-07 02:35:22.093386+00	2026-10-07 02:39:04.930975+00
059bd379-73a2-491d-bbd5-3dcfaf751bbd	3101010001001200	PULAU TIDUNG	RT 005 RW 002	2026-10-07 02:35:22.927326+00	2026-10-07 02:39:05.75174+00
26482a21-687e-4a98-908b-5ed8ef9a8b97	3101010001000200	PULAU TIDUNG	RT 002 RW 001	2026-10-07 02:35:23.849493+00	2026-10-07 02:39:06.672408+00
33eb4f80-a4af-4b7a-aa96-3505360efbef	3101010001002900	PULAU TIDUNG	RT 006 RW 004	2026-10-07 02:35:24.670305+00	2026-10-07 02:39:07.49188+00
8a3d4860-8a1c-41da-868e-d5dadd26eac0	3101010001000300	PULAU TIDUNG	RT 003 RW 001	2026-10-07 02:35:25.488854+00	2026-10-07 02:39:08.311658+00
438f0888-3cb1-419f-a96a-7bf9ec3071d0	3101010001002100	PULAU TIDUNG	RT 007 RW 003	2026-10-07 02:35:27.331045+00	2026-10-07 02:39:09.23225+00
bc50afe3-24e5-4a51-bfe3-7cf7978025cd	3101020001002800	PULAU PANGGANG	RT 003 RW 05	2026-10-07 02:35:28.150152+00	2026-10-07 02:39:10.051799+00
b0174370-5f90-4705-844e-5029fa440f49	3101020001002600	PULAU PANGGANG	RT 001 RW 05	2026-10-07 02:35:28.970939+00	2026-10-07 02:39:10.872127+00
bdfe2a5e-afa8-4dff-a408-4218a82d473d	3101020001002300	PULAU PANGGANG	RT 002 RW 04	2026-10-07 02:35:29.789618+00	2026-10-07 02:39:11.690464+00
ba6937cc-8d86-41e1-b304-7db641f28fcd	3101020001002400	PULAU PANGGANG	RT 003 RW 04	2026-10-07 02:35:30.607493+00	2026-10-07 02:39:12.508736+00
1191790f-9dd6-49df-bc0b-ad33797e38d5	3101020001200500	PULAU PANGGANG	PULAU SEKATI	2026-10-07 02:35:31.427315+00	2026-10-07 02:39:13.328627+00
8d36464f-34b1-4709-9b04-2999d58768fc	3101020001201000	PULAU PANGGANG	PULAU GOSONG CONGKAK	2026-10-07 02:35:32.759951+00	2026-10-07 02:39:14.148397+00
32f3c4d9-4a8c-426e-b3dd-4c3a3ea77554	3101010001001400	PULAU TIDUNG	RT 007 RW 002	2026-10-07 02:35:33.781722+00	2026-10-07 02:39:15.069362+00
8d6d0d68-92c3-4cb0-8463-45cfe2d335b5	3101010001001600	PULAU TIDUNG	RT 002 RW 003	2026-10-07 02:35:34.586529+00	2026-10-07 02:39:15.990529+00
fe4c82ec-d4e2-4e21-9ea6-4009d58340cb	3101010001000400	PULAU TIDUNG	RT 004 RW 001	2026-10-07 02:35:35.421633+00	2026-10-07 02:39:16.808148+00
2998764b-6bef-401b-a7b7-0d457b1b50f3	3101010001000500	PULAU TIDUNG	RT 005 RW 001	2026-10-07 02:35:36.239184+00	2026-10-07 02:39:17.604794+00
ad05a8bd-630e-4616-b162-bfd27ed6f180	3101010001000700	PULAU TIDUNG	RT 007 RW 001	2026-10-07 02:35:37.05776+00	2026-10-07 02:39:18.698933+00
0b89a6e6-5af6-4897-a61a-60092e9f433f	3101010001002400	PULAU TIDUNG	RT 001 RW 004	2026-10-07 02:35:37.878059+00	2026-10-07 02:39:20.600488+00
95ed0786-6460-4d8a-b845-00a64e0b2c37	3101020001002200	PULAU PANGGANG	RT 001 RW 04	2026-10-07 02:35:38.799744+00	2026-10-07 02:39:21.726129+00
a50c5351-184f-4178-a88b-d5a4246cd76a	3101020001002700	PULAU PANGGANG	RT 002 RW 05	2026-10-07 02:35:39.619379+00	2026-10-07 02:39:22.647517+00
338a6ea4-7f62-40e0-b804-e946c281f7c6	3101020001002900	PULAU PANGGANG	RT 004 RW 05	2026-10-07 02:35:40.539984+00	2026-10-07 02:39:24.08286+00
6ae71c86-ee9d-4478-b86b-d825be94d856	3101020001200400	PULAU PANGGANG	PULAU KARANG BONGKOK	2026-10-07 02:35:42.281523+00	2026-10-07 02:39:26.026611+00
fe4cfb4a-c036-453b-a7c2-703f37b78a85	3101020001200900	PULAU PANGGANG	PULAU SEMAK DAUN	2026-10-07 02:35:43.100114+00	2026-10-07 02:39:26.949245+00
48be868f-9c95-4a16-8abb-b5eec31f083b	3101020001201400	PULAU PANGGANG	PULAU PENIKI	2026-10-07 02:35:43.920101+00	2026-10-07 02:39:27.767534+00
9229687f-65e3-4f40-a370-82be3a767b75	3101010002000900	PULAU PARI	RT 002 RW 003	2026-10-07 02:35:44.740254+00	2026-10-07 02:39:28.587522+00
b7d303b6-e4d9-4448-8920-df7eb106ed18	3101010002000600	PULAU PARI	RT 002 RW 002	2026-10-07 02:35:45.559074+00	2026-10-07 02:39:29.406277+00
83f6bd30-fdab-49e8-a5c8-49b76d6c71f0	3101010002000200	PULAU PARI	RT 002 RW 001	2026-10-07 02:35:46.377571+00	2026-10-07 02:39:31.23496+00
664164ef-9f3c-448b-85a5-e9d477287913	3101010002000800	PULAU PARI	RT 001 RW 003	2026-10-07 02:35:47.19687+00	2026-10-07 02:39:32.172128+00
14b80405-2fdc-46ab-b164-f67da8c000d1	3101010002000400	PULAU PARI	RT 004 RW 001	2026-10-07 02:35:48.016142+00	2026-10-07 02:39:33.195297+00
5332e121-49f6-4769-98c4-08e7cf6d1aa1	3101010002300700	PULAU PARI	PULAU LANCANG KECIL	2026-10-07 02:35:48.835941+00	2026-10-07 02:39:34.218482+00
1f4d30ad-0234-4f8f-89f1-fc24e8faa5e9	3101010002300500	PULAU PARI	PULAU KARANG KUDUS	2026-10-07 02:35:49.654739+00	2026-10-07 02:39:35.040621+00
a8b549b9-a57a-497b-b4c3-dd7bbbcc7acc	3101020003001300	PULAU HARAPAN	RT 002 RW 03	2026-10-07 02:35:50.575991+00	2026-10-07 02:39:36.266983+00
dfe6f5c4-a467-463f-862e-4cead68eba0a	3101020003001200	PULAU HARAPAN	RT 001 RW 03	2026-10-07 02:35:51.393754+00	2026-10-07 02:39:37.085717+00
12721a66-1e6b-4cf8-8739-4527ae1302fc	3101020003001500	PULAU HARAPAN	RT 004 RW 03	2026-10-07 02:35:52.214977+00	2026-10-07 02:39:37.907118+00
cdddac28-f637-47ba-a484-314ae65572d3	3101020003001400	PULAU HARAPAN	RT 003 RW 03	2026-10-07 02:35:53.035346+00	2026-10-07 02:39:38.726761+00
70c6897d-2421-4294-acb3-cefec9eb37d4	3101020003200600	PULAU HARAPAN	PULAU BIRA BESAR	2026-10-07 02:35:53.851475+00	2026-10-07 02:39:39.633199+00
9db9e33d-eb96-4143-bb46-fcc34cdb65e9	3101020003200100	PULAU HARAPAN	PULAU SEPA KECIL	2026-10-07 02:35:54.671342+00	2026-10-07 02:39:40.46496+00
2a987fda-7b26-4142-ae30-7510489bc8d4	3101020003200200	PULAU HARAPAN	PULAU SEPA BESAR	2026-10-07 02:35:55.490659+00	2026-10-07 02:39:41.284221+00
8e80e1ba-45d3-4d9e-95d4-935b8cc1a0f5	3101020003200300	PULAU HARAPAN	PULAU TONDAN TIMUR	2026-10-07 02:35:56.309484+00	2026-10-07 02:39:42.207343+00
eafef22f-8227-4885-94f3-175841c056b5	3101020003200400	PULAU HARAPAN	PULAU TONDAN BARAT	2026-10-07 02:35:57.129121+00	2026-10-07 02:39:43.127562+00
18b80260-aba8-47a4-9692-167058eb5bed	3101020003200500	PULAU HARAPAN	PULAU PUTRI TIMUR	2026-10-07 02:35:58.027251+00	2026-10-07 02:39:43.94893+00
48cec0b7-7aff-45ac-9ea8-4f8748d1e5b2	3101020003200700	PULAU HARAPAN	PULAU BIRA KECIL	2026-10-07 02:35:58.972951+00	2026-10-07 02:39:44.970588+00
f8f7b18f-c011-4ab7-8d4d-988e72b81bcf	3101020003502200	PULAU HARAPAN	PULAU PABELOKAN	2026-10-07 02:35:59.793183+00	2026-10-07 02:39:45.783475+00
890def7d-3e9f-4574-a2df-b06bd4b55965	3101010002001000	PULAU PARI	RT 003 RW 003	2026-10-07 02:36:01.482453+00	2026-10-07 02:39:46.60938+00
b0c1f56e-d495-4bfe-8e56-0be39630b730	3101010002000100	PULAU PARI	RT 001 RW 001	2026-10-07 02:36:03.766256+00	2026-10-07 02:39:47.428346+00
3ea2fa0c-e24f-4526-9a11-4c01d64262c9	3101010002000700	PULAU PARI	RT 003 RW 002	2026-10-07 02:36:05.683517+00	2026-10-07 02:39:48.247821+00
719581b5-30cc-4500-894e-d21b66c9ed38	3101010002000300	PULAU PARI	RT 003 RW 001	2026-10-07 02:36:07.927387+00	2026-10-07 02:39:49.067002+00
45bf29e8-b782-478a-80fe-5b64a327cfe8	3101010002300600	PULAU PARI	PULAU LAKI	2026-10-07 02:36:11.965716+00	2026-10-07 02:39:50.704046+00
f0bd0868-24c1-480d-9021-a4ebd18ccc59	3101010002201200	PULAU PARI	PULAU BOKOR	2026-10-07 02:36:13.209901+00	2026-10-07 02:39:51.525798+00
e17b8068-560d-4957-a61d-14a370760c82	3101020002000100	PULAU KELAPA	RT 001 RW 01	2026-10-07 02:36:14.335919+00	2026-10-07 02:39:52.343784+00
5ad7a96e-112a-4275-97c1-8dbca5c9716f	3101020002002700	PULAU KELAPA	RT 006 RW 04	2026-10-07 02:36:16.07297+00	2026-10-07 02:39:53.263344+00
326859da-21de-4ff5-b723-dbd52be13bf1	3101020002001000	PULAU KELAPA	RT 005 RW 02	2026-10-07 02:36:16.894086+00	2026-10-07 02:39:54.08942+00
08a72846-e06a-43f7-977e-9edcbe13c6be	3101020002002400	PULAU KELAPA	RT 003 RW 04	2026-10-07 02:36:17.714885+00	2026-10-07 02:39:55.10263+00
0fbf7e0f-1c4c-41d7-a05c-20881a9a7d25	3101020002000400	PULAU KELAPA	RT 004 RW 01	2026-10-07 02:36:18.531028+00	2026-10-07 02:39:55.924318+00
df807caf-deac-428d-8533-250f44052714	3101020002000700	PULAU KELAPA	RT 002 RW 02	2026-10-07 02:36:19.544469+00	2026-10-07 02:39:56.755423+00
b4c9f671-3ba4-44d9-b71d-a7fc4e622ae3	3101020002200800	PULAU KELAPA	PULAU KALIAGE KECIL	2026-10-07 02:36:20.370821+00	2026-10-07 02:39:57.574977+00
65d8b112-bde2-46a0-bcbe-a184aec842aa	3101020002200900	PULAU KELAPA	PULAU PANTARA TIMUR	2026-10-07 02:36:21.191786+00	2026-10-07 02:39:58.380793+00
39f9fdc6-c801-484f-b8fb-dbe0785ba363	3101020003001100	PULAU HARAPAN	RT 005 RW 02	2026-10-07 02:36:22.114221+00	2026-10-07 02:39:59.205458+00
b2c02e8a-5c86-4945-8629-bd64e0d7ae46	3101020003000800	PULAU HARAPAN	RT 002 RW 02	2026-10-07 02:36:23.139128+00	2026-10-07 02:40:00.023396+00
51e8a74f-61b2-4eec-91ef-4ee70f79e359	3101020003000600	PULAU HARAPAN	RT 006 RW 01	2026-10-07 02:36:24.060879+00	2026-10-07 02:40:00.843075+00
04556c77-99b8-42f5-b14d-c91876179df9	3101020003000900	PULAU HARAPAN	RT 003 RW 02	2026-10-07 02:36:24.983117+00	2026-10-07 02:40:01.866681+00
67e8c0ea-5598-477d-ae4e-24a7be23232e	3101020003000400	PULAU HARAPAN	RT 004 RW 01	2026-10-07 02:36:26.00516+00	2026-10-07 02:40:02.686678+00
cea411e8-76bb-4384-8c23-f60cf873bdf4	3101020003201000	PULAU HARAPAN	PULAU PEMAGARAN	2026-10-07 02:36:27.034712+00	2026-10-07 02:40:03.506483+00
8540d121-ade8-4f0a-ba13-9d6906b88475	3101020003201200	PULAU HARAPAN	PULAU DUA TIMUR	2026-10-07 02:36:28.049394+00	2026-10-07 02:40:04.323893+00
dc15a461-3443-4324-9de3-d2a5a1916645	3101020003200800	PULAU HARAPAN	PULAU BELANDA	2026-10-07 02:36:28.873968+00	2026-10-07 02:40:05.144107+00
25b83e20-be7c-4518-9440-7e7c6296039f	3101020003200900	PULAU HARAPAN	PULAU KUBURAN CINA/ROSA	2026-10-07 02:36:29.692534+00	2026-10-07 02:40:05.962991+00
0fd9f44e-da31-4da8-938a-b0922e802d9c	3101020003201100	PULAU HARAPAN	PULAU DUA BARAT	2026-10-07 02:36:30.714392+00	2026-10-07 02:40:06.884963+00
214bb59a-4a40-49d9-8403-0803274f0e50	3101020003201300	PULAU HARAPAN	PULAU PETELORAN TIMUR	2026-10-07 02:36:31.536875+00	2026-10-07 02:40:07.703788+00
029fa6a4-e85e-4f63-bce4-6899fc2c8045	3101020001000600	PULAU PANGGANG	RT 006 RW 01	2026-10-07 02:34:15.003041+00	2026-10-07 02:37:49.976863+00
f31a3ab4-c8d4-486b-ab5d-daf98a5cfbbb	3101020001000800	PULAU PANGGANG	RT 001 RW 02	2026-10-07 02:34:17.493835+00	2026-10-07 02:37:52.432316+00
8def7cad-5fb0-4369-8610-4d567297b6b8	3101010002300300	PULAU PARI	PULAU KONGSI	2026-10-07 02:34:40.431338+00	2026-10-07 02:38:23.05026+00
1cb8f3d1-62d3-4e09-862b-696782b4efbf	3101020001200600	PULAU PANGGANG	PULAU KOTOK BESAR	2026-10-07 02:35:01.731483+00	2026-10-07 02:38:45.373918+00
8ee0f32b-b2f6-4803-ab45-8d9eb40b3ad7	3101020002200100	PULAU KELAPA	PULAU JUKUNG	2026-10-07 02:35:18.729462+00	2026-10-07 02:39:01.451503+00
c6215f1a-ce01-48ec-bedf-e09db49fb8a9	3101020001002500	PULAU PANGGANG	RT 004 RW 04	2026-10-07 02:35:41.359617+00	2026-10-07 02:39:25.106064+00
455abb79-0d6d-44e4-bac1-ae0b7645756d	3101010002000500	PULAU PARI	RT 001 RW 002	2026-10-07 02:36:10.285328+00	2026-10-07 02:39:49.88511+00
edf83dd8-3887-47be-890b-b962807dc93b	3101020003201400	PULAU HARAPAN	PULAU PETELORAN BARAT	2026-10-07 02:36:32.355887+00	2026-10-07 02:40:08.525155+00
cd3c1fb5-43fe-411d-a780-2db6ccb50d88	3101020003201500	PULAU HARAPAN	PULAU PENJALIRAN TIMUR	2026-10-07 02:36:33.175471+00	2026-10-07 02:40:09.344103+00
0d8c7380-82a2-4ed7-86d5-25fefc1bee88	3101010001001000	PULAU TIDUNG	RT 003 RW 002	2026-10-07 02:36:34.098305+00	2026-10-07 02:40:10.365881+00
01397aff-6fe9-44dd-8423-3adc32055661	3101010001002500	PULAU TIDUNG	RT 002 RW 004	2026-10-07 02:36:34.914224+00	2026-10-07 02:40:11.186535+00
abd4d16c-a4a0-4019-8fa9-a510cf250626	3101010001002000	PULAU TIDUNG	RT 006 RW 003	2026-10-07 02:36:35.836993+00	2026-10-07 02:40:12.005101+00
777a3ddc-51a2-4b95-ac3a-2da3cde2af85	3101010001002300	PULAU TIDUNG	RT 009 RW 003	2026-10-07 02:36:36.655+00	2026-10-07 02:40:12.820907+00
67ba227f-7dcb-4279-8a38-f1d210473b3d	3101010001002600	PULAU TIDUNG	RT 003 RW 004	2026-10-07 02:36:37.478681+00	2026-10-07 02:40:13.849676+00
cb3cba09-40eb-4012-a152-4820a0d176e9	3101010001001500	PULAU TIDUNG	RT 001 RW 003	2026-10-07 02:36:38.395281+00	2026-10-07 02:40:14.666542+00
4138c1e9-2f88-42e5-8fb3-8ccb6ac279d2	3101020001002100	PULAU PANGGANG	RT 007 RW 03	2026-10-07 02:36:39.42221+00	2026-10-07 02:40:15.58849+00
aabab0eb-af2f-4af0-b496-380b3afd69c3	3101020001001000	PULAU PANGGANG	RT 003 RW 02	2026-10-07 02:36:40.342671+00	2026-10-07 02:40:16.407654+00
3467189f-c9c9-4141-97a0-0dc537012247	3101020001001600	PULAU PANGGANG	RT 002 RW 03	2026-10-07 02:36:41.265553+00	2026-10-07 02:40:17.227737+00
25c4839c-989e-4853-abfd-867e8ce37af5	3101020001000900	PULAU PANGGANG	RT 002 RW 02	2026-10-07 02:36:42.185132+00	2026-10-07 02:40:18.050905+00
bb8cde48-7356-43e5-b0fe-9fa4f881b01e	3101020001001200	PULAU PANGGANG	RT 005 RW 02	2026-10-07 02:36:43.206036+00	2026-10-07 02:40:19.174609+00
62c0c32e-4966-48ee-aaad-c9aba46da952	3101020001001700	PULAU PANGGANG	RT 003 RW 03	2026-10-07 02:36:44.131723+00	2026-10-07 02:40:19.993346+00
589adbe3-05d1-4701-aa89-644cffbd287b	3101020001000200	PULAU PANGGANG	RT 002 RW 01	2026-10-07 02:36:45.052794+00	2026-10-07 02:40:20.913817+00
367e11e5-fc29-40f5-8e5f-ea2ecf7c9742	3101020001200800	PULAU PANGGANG	PULAU GOSONG PANDAN	2026-10-07 02:36:45.874761+00	2026-10-07 02:40:21.835161+00
ff413359-6cf5-4dc4-b6bc-1a30a1264120	3101020001200300	PULAU PANGGANG	PULAU AYER	2026-10-07 02:36:46.693852+00	2026-10-07 02:40:22.755879+00
2e8e44c7-2252-48c8-9552-06f9f7dd8886	3101020001201300	PULAU PANGGANG	PULAU OPAK KECIL	2026-10-07 02:36:47.507502+00	2026-10-07 02:40:23.577647+00
ef5922a3-68e8-4f4e-91bf-6ae40909b3eb	3101020002001700	PULAU KELAPA	RT 004 RW 03	2026-10-07 02:36:48.328994+00	2026-10-07 02:40:25.700343+00
a85f0e93-a9b6-4a50-80ec-f39d78302250	3101020002000800	PULAU KELAPA	RT 003 RW 02	2026-10-07 02:36:49.252549+00	2026-10-07 02:40:28.134402+00
21ba9d75-6f75-4e85-a1c3-bc515ad5bf91	3101020002000600	PULAU KELAPA	RT 001 RW 02	2026-10-07 02:36:50.070852+00	2026-10-07 02:40:30.48999+00
ff46b4a9-7446-4c65-90ff-0264f22b8cd4	3101020002002500	PULAU KELAPA	RT 004 RW 04	2026-10-07 02:36:50.88991+00	2026-10-07 02:40:34.280199+00
fabf2865-3f59-4fc5-b956-23287b292167	3101020002001500	PULAU KELAPA	RT 002 RW 03	2026-10-07 02:36:52.018103+00	2026-10-07 02:40:36.379062+00
7a8d078b-8568-422a-8506-1c8ac2c3bde6	3101020002200400	PULAU KELAPA	PULAU MATAHARI	2026-10-07 02:36:52.938163+00	2026-10-07 02:40:37.60563+00
1932e0c3-69ab-4a04-956b-68a28a100d95	3101020002200500	PULAU KELAPA	PULAU PANJANG KECIL	2026-10-07 02:36:53.757483+00	2026-10-07 02:40:38.527804+00
fa3d0bf6-8f8e-4459-a136-93d4f1a904e9	3101020002000200	PULAU KELAPA	RT 002 RW 01	2026-10-07 02:36:54.678509+00	2026-10-07 02:40:39.449333+00
9e636973-c2fa-4bae-9065-564d909136b4	3101020002001400	PULAU KELAPA	RT 001 RW 03	2026-10-07 02:36:55.596287+00	2026-10-07 02:40:40.369692+00
38905c6d-6996-4574-8ef1-a15bb8067719	3101020002002300	PULAU KELAPA	RT 002 RW 04	2026-10-07 02:36:56.419246+00	2026-10-07 02:40:41.290879+00
8a81b0ec-c96f-49ff-b59e-c6565dec45cb	3101020002001200	PULAU KELAPA	RT 007 RW 02	2026-10-07 02:36:57.237672+00	2026-10-07 02:40:42.212596+00
59a6c2fe-75ac-4753-aeef-2fc6d3385caf	3101020002002200	PULAU KELAPA	RT 001 RW 04	2026-10-07 02:36:58.057402+00	2026-10-07 02:40:43.033746+00
50717016-37ff-4158-a098-bd95dab6ac11	3101020002200600	PULAU KELAPA	PULAU PANJANG BESAR	2026-10-07 02:36:58.979199+00	2026-10-07 02:40:43.859069+00
e86a726a-fbfc-4dea-8cfb-6993e842ff6d	3101020002200700	PULAU KELAPA	PULAU KALIAGE BESAR	2026-10-07 02:36:59.776346+00	2026-10-07 02:40:44.670842+00
b40d3592-cde3-4f04-bc02-dfe2f60c1cc6	3101020002001100	PULAU KELAPA	RT 006 RW 02	2026-10-07 02:37:00.822853+00	2026-10-07 02:40:45.592215+00
4555159d-708e-4c9c-9ef4-3c1fbb9e5479	3101020002002000	PULAU KELAPA	RT 007 RW 03	2026-10-07 02:37:01.645497+00	2026-10-07 02:40:46.411159+00
99f922d1-8574-4078-b667-3d1e6da94c06	3101020002000500	PULAU KELAPA	RT 005 RW 01	2026-10-07 02:37:02.564175+00	2026-10-07 02:40:47.232391+00
17031864-7f6e-4cb0-8077-bea8dd77f9f8	3101020002001300	PULAU KELAPA	RT 008 RW 02	2026-10-07 02:37:03.383169+00	2026-10-07 02:40:48.0364+00
d85f1d81-abb6-43b9-a76c-1dcc202e1416	3101020002001600	PULAU KELAPA	RT 003 RW 03	2026-10-07 02:37:04.203847+00	2026-10-07 02:40:48.868716+00
4e7f2b53-8154-43fd-af44-89c94d69f75a	3101020002201100	PULAU KELAPA	PULAU KELOR BARAT	2026-10-07 02:37:05.021484+00	2026-10-07 02:40:49.688119+00
2d2ab731-f0bb-432b-b7cf-e18681134f44	3101020002201000	PULAU KELAPA	PULAU PANTARA BARAT	2026-10-07 02:37:05.929942+00	2026-10-07 02:40:50.507084+00
c9897f99-b4ba-458f-97ea-2bb52cb2d9cf	3101020002000300	PULAU KELAPA	RT 003 RW 01	2026-10-07 02:37:06.762289+00	2026-10-07 02:40:51.429179+00
8312aa16-58d0-4c38-9900-865e783716e1	3101020002000900	PULAU KELAPA	RT 004 RW 02	2026-10-07 02:37:07.683638+00	2026-10-07 02:40:52.247608+00
596e87ea-e450-4a5b-a619-55f82dc40cb5	3101020002002600	PULAU KELAPA	RT 005 RW 04	2026-10-07 02:37:08.502273+00	2026-10-07 02:40:53.134904+00
5dd40152-f8b0-4553-b89e-95bedd3775be	3101020002002100	PULAU KELAPA	RT 008 RW 03	2026-10-07 02:37:09.528477+00	2026-10-07 02:40:54.09047+00
7cc0366d-9aa4-4676-9a30-4c124df4d8c8	3101020002001900	PULAU KELAPA	RT 006 RW 03	2026-10-07 02:37:10.450186+00	2026-10-07 02:40:54.91075+00
92892ea4-d024-461e-9fd7-90a2b2c64a0d	3101020002201200	PULAU KELAPA	PULAU KELOR TIMUR	2026-10-07 02:37:11.575267+00	2026-10-07 02:40:55.73281+00
4a8b60f2-8eba-4010-ad01-dba64043317f	3101020002201300	PULAU KELAPA	PULAU OPAK BESAR	2026-10-07 02:37:12.496899+00	2026-10-07 02:40:56.54942+00
566b9472-5cd1-4c17-9f4a-b7d0b8f8fbf7	3101010002001100	PULAU PARI	RT 001 RW 004	2026-10-07 02:37:13.315481+00	2026-10-07 02:40:57.368505+00
dac33278-b4cf-4a17-b0c2-694f5c206597	3101010002001302	PULAU PARI	RT 003 RW 004	2026-10-07 02:37:14.22515+00	2026-10-07 02:40:58.187556+00
67d07981-582b-461f-91e4-374fcb3a5328	3101010002001202	PULAU PARI	RT 002 RW 004	2026-10-07 02:37:15.055413+00	2026-10-07 02:40:59.212568+00
131278bd-ebf3-4867-8de8-1cf98dad8279	3101010002300200	PULAU PARI	PULAU TENGAH	2026-10-07 02:37:15.977711+00	2026-10-07 02:41:00.134212+00
146e22e8-438c-4eb5-8753-a50a73d20570	3101010002300400	PULAU PARI	PULAU BURUNG	2026-10-07 02:37:17.470605+00	2026-10-07 02:41:00.952236+00
\.


--
-- TOC entry 4091 (class 0 OID 26113)
-- Dependencies: 416
-- Data for Name: fasih_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fasih_sessions (id, user_id, session_token, expires_at, created_at) FROM stdin;
80d2d851-9e51-41d5-a18a-763248f0346a	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	b1a4107603c7d248f90066da6f2fcf6ac8295663a2010f5bbba3ce9910c88a07935d858185793330c05dd368af7437a0	2026-10-08 02:33:59.07+00	2026-10-07 02:34:00.334126+00
06daa7f5-61c8-4d87-b9aa-05db001629a3	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	755decaadc3357eedb2f41fceae8bf3da71aedcf559acf015ff8bba306099959a6576ac87f6671d58cf1c3c069e163cc	2026-10-09 08:26:37.182+00	2026-10-08 08:26:37.306291+00
9de634f0-bcc5-4c56-9628-bf3fa6334512	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	dbfc3bf5a1b9ec2c83624de0c69b46360035123f3d9e8fe35d29546e0284e474fd0a7a756bb6c6fbab3f793856bd27ad	2026-10-09 08:36:25.447+00	2026-10-08 08:36:25.321912+00
82edb260-ce5a-47e9-95b0-50091970adf1	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	14a4ccd8826c81a8205a2ff737cba9c0d94f92b36ad8e93fef94f3352cb91aa092a44b972cdeaa0adaa7655fa854b9b0	2026-10-10 02:11:16.623+00	2026-10-09 02:11:15.632221+00
c11898fe-b450-4a87-acb3-24c441949b9b	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	e5b35a3d604a576258dc4f30487a3f8cd122b14b352f3ec85b611a8a564750c694b2b62cebe716fe6b0f036072db6ed5	2026-10-10 02:11:45.346+00	2026-10-09 02:11:44.355318+00
255b1a9c-a250-4e4c-a688-3af0f2dd1da3	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	0d286032de06335b086acfa8d01043a0098b8a9103d7c8dc89481d5f6f794f4fcedd816bb77694b87936c885a84acd6c	2026-10-10 02:11:52.302+00	2026-10-09 02:11:51.31262+00
0fe2f6a6-d2bb-4b8d-b905-c448318e9240	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	9ccdd1a93389b1d08f3114abfeef5725184171429bbef52f2459a173c48b3deaabadf58b462d247be2ce9c1f9aec77e7	2026-10-15 03:57:00.04+00	2026-10-14 03:56:58.084793+00
6174df0e-d0b3-489f-bc87-23ac9459e56e	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	74c1dfec35247ce1e710acdd801b9a5f4ae2b13b583cab83ab8e94c98ecd5a8a1eaeb664b720e009d632bc64d501b690	2026-10-19 11:17:19.418+00	2026-10-18 11:17:19.649027+00
66000915-53ae-4e96-93b5-e769be62bb38	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	4b0d3fef5286d4cfe9091960db4ee416f5ed791ccfce13347420e382f7e0d24ab3b2fc7e1c8ffc75a167d1c516cbe377	2026-10-19 13:41:23.501+00	2026-10-18 13:41:23.611946+00
c7fb39cc-56b9-4812-848d-8772237b2b98	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	5c58278c6619331731ae7b309990219a9c1ff3f4c54e033dcfd40b2e0897ff84b288f53e3a9aa6081efb08665093e6ef	2026-10-22 07:14:18.37+00	2026-10-21 07:14:18.467599+00
f24067bf-98bc-4bc0-af80-8357fc52d680	1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	3d367c153d01eed100b54cf397d80a7be4e3d151f2fdd20d490195843244e022f58ca2200af4f2e53357c15d777ca684	2026-10-22 07:30:18.026+00	2026-10-21 07:30:20.697671+00
\.


--
-- TOC entry 4084 (class 0 OID 25978)
-- Dependencies: 409
-- Data for Name: fasih_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fasih_users (id, officer_id, username, password_hash, name, role, is_active, created_at, updated_at) FROM stdin;
1b1f5c38-8bf4-4030-837b-f797d3c7c6c3	\N	admin	$2b$10$thQ.xgnbw6CNWZEThRJJMePV0sadWe21mavPT/qw9Dx43IQdNNcMa	Admin FASIH	admin	t	2026-10-07 02:32:56.917498+00	2026-10-07 02:32:56.917498+00
\.


--
-- TOC entry 4070 (class 0 OID 17503)
-- Dependencies: 391
-- Data for Name: footer_config; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.footer_config (id, "companyName", "companyAddress", contacts, links, logo, "createdAt", "updatedAt") FROM stdin;
1	BPS Kepulauan Seribu	["Jl. Ikan Betok Putih Rt. 004 Rw. 05 Pulau Pramuka Kecamatan Kepulauan Seribu Utara 14530", "Jl. Cempaka Putih Tengah XIV Rt. 008 Rw. 05 No. 10B Kelurahan Cempaka Putih Timur, Kecamatan Cempaka Putih, Jakarta Pusat 10510"]	[{"label": "Telepon", "value": "+62-21-XXXXXX"}, {"label": "Email", "value": "bps3101@bps.go.id"}]	[{"url": "https://kepulauanseribukab.bps.go.id/", "label": "Website"}]	https://res.cloudinary.com/necrhfcg/image/upload/v1789030655/pulaupedia/footer/1789030649837-1787719167764-logo-bps.png	2026-08-26 04:38:48	2026-09-16 07:12:42.121448
\.


--
-- TOC entry 4072 (class 0 OID 17516)
-- Dependencies: 393
-- Data for Name: headers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.headers (id, title, subtitle, "backgroundImage", "createdAt", "updatedAt") FROM stdin;
1	PULAU PEDIA	Portal Informasi dan Layanan Digital BPS Kepulauan Seribu	https://res.cloudinary.com/necrhfcg/image/upload/v1789030691/pulaupedia/headers/1789030685397-1787041408800-PulauYuKepulauanSeribuProvinsiDKIJakarta.jpg	2026-08-18 01:55:38	2026-09-10 08:58:14.626076
\.


--
-- TOC entry 4074 (class 0 OID 17530)
-- Dependencies: 395
-- Data for Name: main_portals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.main_portals (id, name, description, icon, href, "sortOrder", "isActive", "createdAt", "updatedAt", "iconImage") FROM stdin;
2	Brankas Fungsi	Dokumen dan arsip fungsi	Archive	/brankas-fungsi	3	t	2026-08-24 04:25:10	2026-08-24 08:16:07	\N
3	Dokumentasi Kegiatan	Rekam jejak kegiatan kantor	FileText	/dokumentasi-kegiatan	3	t	2026-08-24 04:25:10	2026-08-24 04:25:10	\N
4	SE2026 Archive Hub	Arsip surat edaran 2026	Package	https://www.google.com/url?q=https%3A%2F%2Flicense365bps-my.sharepoint.com%2F%3Af%3A%2Fg%2Fpersonal%2Falfo_license365bps_onmicrosoft_com%2FIgAL1AaIlVlGS5wz3xXY33VLAXrAOVy9ASRDrL4cw65cKxo%3Fe%3DlpYtoy&sa=D&sntz=1&usg=AOvVaw22l6QAhYJS5ymbJVeVYJcY	4	t	2026-08-24 04:25:10	2026-08-26 08:01:16	\N
7	SAKIP 2026	Sistem Akuntabilitas Kinerja	BarChart3	/sakip-2026	7	t	2026-08-24 04:25:10	2026-09-03 07:25:52	\N
8	ZI 2026	Zona Integritas	Award	/zi-2026	2	t	2026-08-24 04:25:10	2026-08-24 08:15:58	\N
1	Portal Umum	Informasi umum dan layanan publik	BookOpen	/portal-umum	1	t	2026-08-24 04:25:10	2026-09-24 08:45:57.090846	https://res.cloudinary.com/necrhfcg/image/upload/v1790239555/pulaupedia/portals/1790239557756-pngtree-summer-island-png-design-png-image_5939582.png
9	Arsiparis	arsip dokumen	Archive	/arsiparis	8	f	2026-08-31 02:57:39	2026-11-04 04:16:56.491328	\N
\.


--
-- TOC entry 4076 (class 0 OID 17543)
-- Dependencies: 397
-- Data for Name: navbar_config; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.navbar_config (id, logo, "logoAlt", "brandName", "createdAt", "updatedAt") FROM stdin;
1	https://res.cloudinary.com/necrhfcg/image/upload/v1789030715/pulaupedia/navbar/1789030709852-1787560503434-logo-bps.png	Pulau Pedia Logo	KABUPATEN KEPULAUAN SERIBU	2026-08-18 02:38:41	2026-09-10 08:58:39.055309
\.


--
-- TOC entry 4078 (class 0 OID 17557)
-- Dependencies: 399
-- Data for Name: portal_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.portal_items (id, "portalId", name, description, icon, link, documents, "sortOrder", "isActive", "createdAt", "updatedAt") FROM stdin;
2	1	Keuangan	Dokumen dan arsip keuangan	DollarSign	/portal-umum/keuangan	[{"link": "https://docs.google.com/document/d/13iIYdPxVliFH4QpkSZzBklj6fVfSWT0vIfyuPUgYdSg/edit?usp=drive_link", "title": "Kelengkapan Pengajuan Anggaran TA2025"}, {"link": "https://drive.google.com/drive/folders/1XWtoIsFJ71RjWIyEq0bDEPgRcqZigNp1?usp=sharing", "title": "SK"}, {"link": "https://drive.google.com/drive/folders/1ywN3EKvIrD_0WNGZhpWCfb9yD9dOL4Xx?usp=sharing", "title": "KAK"}, {"link": "https://drive.google.com/drive/folders/1mXhUitreD4IkCEJyJYmmM7qqKCM4_J8z?usp=sharing", "title": "Form Permintaan"}, {"link": "https://docs.google.com/document/d/1aFuAOrguDtiIQTyYUQvxUiNiXjuWhC-4/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true", "title": "Kop Surat"}, {"link": "https://docs.google.com/document/d/1lj_S3IWI_XbzKzY6_iij1Ux9Qy1GpquS/edit?usp=sharing&ouid=100656661374328625415&rtpof=true&sd=true", "title": "Draft Notula"}, {"link": "https://sites.google.com/view/bimbingan-sai", "title": "Juknis Akuntansi Laporan Keuangan"}]	2	t	2026-08-24 08:01:22	2026-08-24 08:01:22
3	1	BMN & Persediaan	Barang Milik Negara dan Persediaan	Package	/portal-umum/bmn-persediaan	[{"link": "https://docs.google.com/spreadsheets/d/1SCAEUF2GU7e4x6TIUaJoAzt5ST7qobU06iMzhoRKCCc/edit?usp=sharing", "title": "Identifikasi Kebutuhan ATK 2026"}, {"link": "https://drive.google.com/file/d/1Nalxe48cjtSiBpt26-kI06wi4yyIA0LK/view?usp=sharing", "title": "Lampiran KMK"}, {"link": "https://drive.google.com/file/d/1SDleCEbGFKn1jT_Kz6ngu-9Zb_72PdD0/view?usp=drive_link", "title": "Penetapan Status Penggunaan BMN Bangunan dan Selain Tanah dan-atau Bangunan pada BPS"}, {"link": "https://drive.google.com/file/d/19uOGbjq1NKQQsBuArWzLsNgHKm3aYutF/view?usp=drive_link", "title": "PSP Kendaraan Operasional Roda 4 dan 2_2012"}, {"link": "https://drive.google.com/file/d/1_hTwRvEEfqzIheHkoj8q40JjABcLQvFp/view?usp=drive_link", "title": "PSP Pulau Seribu 2024"}, {"link": "https://drive.google.com/file/d/1DxuAJ0Q5rSSqhNP2kr5W0D6AW4tv2Poq/view?usp=drive_link", "title": "SK PSP No. 338 Tgl.28 Mei'24 di Wilayah Provinsi DKI Jakarta"}]	3	t	2026-08-24 08:01:22	2026-08-24 08:01:22
4	1	SAKIP	Sistem Akuntabilitas Kinerja Instansi Pemerintah	BarChart3	/portal-umum/sakip	[{"link": "https://s.bps.go.id/Dokumen-SAKIP2024", "title": "SAKIP 2024"}, {"link": "https://drive.bps.go.id/s/WG5br3FbGjnd3nn", "title": "SAKIP 2025"}]	4	t	2026-08-24 08:01:22	2026-08-24 08:01:22
5	1	HUMAS	Hubungan Masyarakat dan Komunikasi	Megaphone	/portal-umum/humas	[{"link": "https://www.instagram.com/bpskabupatenkepulauanseribu/", "title": "Instagram"}, {"link": "https://www.youtube.com/@bpskepulauanseribu4158", "title": "YouTube"}, {"link": "https://drive.google.com/drive/folders/1KZCMDx_xr683WppTxLfa4usJpVYTMpgO?usp=sharing", "title": "Foto Kegiatan Tahun 2024"}, {"link": "https://drive.google.com/drive/folders/1B58_QpN4CInHyeH6hPxoUtprBIVklBph?usp=sharing", "title": "Foto Kegiatan Tahun 2025"}]	5	t	2026-08-24 08:01:22	2026-08-24 08:01:22
6	1	Zona Integritas	Dokumen dan arsip Zona Integritas	Award	/portal-umum/zona-integritas	[{"link": "https://drive.google.com/drive/folders/pengungkit-pemenuhan", "title": "A.I. Pengungkit - Pemenuhan"}, {"link": "https://drive.google.com/drive/folders/pengungkit-reform", "title": "A.II. Pengungkit - Reform"}, {"link": "https://drive.google.com/drive/folders/hasil", "title": "B. Hasil"}, {"link": "https://heylink.me/ZI_P1000_2025/", "title": "ZI 2024"}]	6	t	2026-08-24 08:01:22	2026-08-24 08:01:22
8	1	Kepegawaian	Dokumen dan arsip kepegawaian	Users	/portal-umum/kepegawaian	[{"link": "https://docs.google.com/spreadsheets/d/1ka8xRpj1eTGDaO-9DRwMQ0u3WIi2ieDTYRdAAdRtDXg/edit?pli=1&gid=0#gid=0", "title": "Nomor Surat dan Nomor SK"}, {"link": "https://docs.google.com/spreadsheets/d/1GSxAsD7MxE0iMBKMDzDlHQUA5hObz7XR1THVQhAAayE/edit?usp=sharing", "title": "Rekap Perjalanan Dinas"}, {"link": "https://drive.google.com/drive/folders/11h_2tkHKrkMxzfabOsbr6-hXFERvgp6x?usp=sharing", "title": "Laporan FWA Pegawai 24-27 Maret 25"}, {"link": "https://drive.google.com/drive/folders/1RkF3WYZNNMXHQ81yB4W_1mKMSsOzbysU?usp=sharing", "title": "Aturan Kepegawaian"}, {"link": "http://s.bps.go.id/PAK_Pegawai", "title": "Penetapan Angka Kredit (PAK)"}]	8	t	2026-08-24 08:01:22	2026-08-24 08:01:22
9	8	Bukti Dukung Pemenuhan	Bukti Dukung ZI 2026 (Pemenuhan)	FileText	/zi-2026/bukti-dukung-pemenuhan	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	1	t	2026-08-24 08:01:22	2026-08-24 08:01:22
10	8	Bukti Dukung Reform	Bukti Dukung ZI 2026 (Reform)	FileText	/zi-2026/bukti-dukung-reform	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	2	t	2026-08-24 08:01:22	2026-08-24 08:01:22
11	8	LKE ZI 2026	Laporan Ketaatan Etika ZI 2026	FileText	/zi-2026/lke-zi-2026	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "LKE BPS Kepulauan Seribu 2026"}]	3	t	2026-08-24 08:01:22	2026-08-24 08:01:22
1	1	Bigram	Bimbingan dan Pengawasan Umum	FileSpreadsheet	/portal-umum/bigram	[{"link": "https://docs.google.com/spreadsheets/d/1M6rp9hU0CUowVN363sD_zlN_oy1R3JDjC3pEXkwiHOA/edit?usp=sharing", "title": "KK RPD, Revisi dan Matriks Mitra 2025"}, {"link": "https://drive.google.com/drive/folders/1QXFRoIYq4RKRFwonJ99fQuSgURJupK3X", "title": "DIPA dan POK"}, {"link": "https://e-monev.bappenas.go.id/portal/", "title": "E-Monev Bappenas"}, {"link": "https://monev.kemenkeu.go.id/", "title": "Monitoring Evaluasi Kemenkeu"}, {"link": "https://shbj.bps.go.id/masterplan/", "title": "Masterplan"}]	1	t	2026-08-24 08:01:22	2026-11-04 04:55:07.659584
12	8	Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)	Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Pemenuhan)	FileText	/zi-2026/bukti-dukung-jakarta-timur-2025-pemenuhan	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	4	t	2026-08-24 08:01:22	2026-08-24 08:01:22
13	8	Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)	Bukti Dukung ZI BPS Kota Jakarta Timur 2025 (Reform)	FileText	/zi-2026/bukti-dukung-jakarta-timur-2025-reform	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	5	t	2026-08-24 08:01:22	2026-08-24 08:01:22
14	8	LKE ZI BPS Kota Jakarta Timur 2025	LKE ZI BPS Kota Jakarta Timur 2025	FileText	/zi-2026/lke-jakarta-timur-2025	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "LKE BPS Kota Jakarta Timur 2025"}]	6	t	2026-08-24 08:01:22	2026-08-24 08:01:22
15	8	Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)	Bukti Dukung ZI RB BPS RI 2024 (Pemenuhan)	FileText	/zi-2026/zi-rb-bps-ri-2024-pemenuhan	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	7	t	2026-08-24 08:01:22	2026-08-24 08:01:22
16	8	Bukti Dukung ZI RB BPS RI 2024 (Reform)	Bukti Dukung ZI RB BPS RI 2024 (Reform)	FileText	/zi-2026/zi-rb-bps-ri-2024-reform	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	8	t	2026-08-24 08:01:22	2026-08-24 08:01:22
17	8	Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)	Bukti Dukung ZI BPS DKI Jakarta 2025 (Pemenuhan)	FileText	/zi-2026/bukti-dukung-bps-dki-2025-pemenuhan	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	9	t	2026-08-24 08:01:22	2026-08-24 08:01:22
18	8	Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)	Bukti Dukung ZI BPS DKI Jakarta 2025 (Reform)	FileText	/zi-2026/bukti-dukung-bps-dki-2025-reform	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/zi-2026", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	10	t	2026-08-24 08:01:22	2026-08-24 08:01:22
19	8	LKE ZI BPS DKI Jakarta 2025	LKE ZI BPS DKI Jakarta 2025	FileText	/zi-2026/lke-bps-dki-jakarta-2025	[{"link": "https://drive.google.com/drive/folders/zi-2026", "title": "LKE BPS DKI Jakarta 2025"}]	11	t	2026-08-24 08:01:22	2026-08-24 08:01:22
21	2	Distribusi	Dokumen dan arsip fungsi distribusi	TrendingUp	https://drive.google.com/drive/folders/distribusi	[]	2	t	2026-08-24 08:08:42	2026-08-24 08:08:42
22	2	Produksi	Dokumen dan arsip fungsi produksi	Package	https://drive.google.com/drive/folders/produksi	[]	3	t	2026-08-24 08:08:42	2026-08-24 08:08:42
23	2	Nerwilis	Dokumen dan arsip neraca wilayah	FileText	https://drive.google.com/drive/folders/nerwilis	[]	4	t	2026-08-24 08:08:42	2026-08-24 08:08:42
24	2	IPDS	Dokumen dan arsip IPDS	BarChart3	https://drive.google.com/drive/folders/ipds	[]	5	t	2026-08-24 08:08:42	2026-08-24 08:08:42
25	3	Kegiatan 2024	Dokumentasi kegiatan tahun 2024	Calendar	https://drive.google.com/drive/folders/kegiatan-2024	[]	1	t	2026-08-24 08:13:59	2026-08-24 08:13:59
26	3	Kegiatan 2025	Dokumentasi kegiatan tahun 2025	Calendar	https://drive.google.com/drive/folders/kegiatan-2025	[]	2	t	2026-08-24 08:13:59	2026-08-24 08:13:59
27	3	Kegiatan 2026	Dokumentasi kegiatan tahun 2026	Calendar	/dokumentasi-kegiatan/kegiatan-2026	[{"link": "https://drive.google.com/drive/folders/1toEz5kkn5cwXJdBWmBDzXCtO3ftaEZft?usp=sharing", "title": "Januari"}, {"link": "https://drive.google.com/drive/folders/1AsUpP-6FtYUNDZXgD9bfEa4vhtAwtX4_?usp=sharing", "title": "Februari"}]	3	t	2026-08-24 08:13:59	2026-08-26 07:47:27
20	2	Sosial	Dokumen dan arsip fungsi sosial	Users	/brankas-fungsi/sosial	[]	1	t	2026-08-24 08:08:42	2026-09-11 03:12:59.433764
33	8	Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Pemenuhan)	Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Pemenuhan)	FileSpreadsheet	/zi-2026/bukti-dukung-zi-bps-kepulauan-seribu-2025-pemenuhan	[{"link": "https://drive.google.com/drive/folders/1-KnkPHqOKIwlW8XbwlqajMscPuGJ-ojH", "title": "Pilar 1. MANAJEMEN PERUBAHAN"}, {"link": "https://drive.google.com/drive/folders/1_vnF6__NaoRAl_sfEGFEOCLZEl9LFEZR", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/1kHX1SeJvWs-_Nf8hAhm9VKb1EL-qhVuT", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/15z1y4zSvKY77WNkckTZf2UYCLd92KmoM", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/1UUaPIWW2Q8WMqAVsAWKawpaMFccXvpFn", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/1y8EouelLpVECtMlgcs58kyEaunsWDLxF", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	0	t	2026-08-26 06:25:03	2026-08-26 07:40:08
34	8	Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Reform)	Bukti Dukung ZI BPS Kepulauan Seribu 2025 (Reform)	FileSpreadsheet	/zi-2026/bukti-dukung-zi-bps-kepulauan-seribu-2025-reform	[{"link": "https://drive.google.com/drive/folders/122WEZFNT4sTb1YCMv1G9ca2Gz-4bSINP", "title": "Pilar 1. MANAJEMEN PERUBAHAN "}, {"link": "https://drive.google.com/drive/folders/1rPP5sI7wutHcGcTllED14_9FnHXlyRoQ", "title": "Pilar 2. PENATAAN TATALAKSANA"}, {"link": "https://drive.google.com/drive/folders/14mTRoqGBkcFvPIgZMUAykxS8QMUgd3ZL", "title": "Pilar 3. PENATAAN SISTEM MANAJEMEN SDM APARATUR"}, {"link": "https://drive.google.com/drive/folders/18N76IhkIKsT4mDs4QcgCPwmL3BUQFlTK", "title": "Pilar 4. PENGUATAN AKUNTABILITAS"}, {"link": "https://drive.google.com/drive/folders/1Y3d2TkMgLWIfgwkz2bW1J7X1jHspsUhc", "title": "Pilar 5. PENGUATAN PENGAWASAN"}, {"link": "https://drive.google.com/drive/folders/1AHaAWp2uxZ6MD2zjUyMNUBOI882x1inN", "title": "Pilar 6. PENINGKATAN KUALITAS PELAYANAN PUBLIK"}]	0	t	2026-08-26 07:41:38	2026-08-26 07:41:38
35	8	LKE ZI BPS Kepulauan Seribu 2025	LKE ZI BPS Kepulauan Seribu 2025	FileSpreadsheet	/zi-2026/lke-zi-bps-kepulauan-seribu-2025	[{"link": "https://docs.google.com/spreadsheets/d/1qx-uiW9O80zx6hdM0m8htUI6Bg25r2Ef/edit?gid=2022470203#gid=2022470203", "title": "LKE 2025 BPS Kepulauan Seribu 2025"}]	0	t	2026-08-26 07:42:59	2026-08-26 07:42:59
37	7	SAKIP 2026	ASJKDAS	FileSpreadsheet	/sakip-2026/sakip-2026	[]	0	t	2026-09-03 07:26:18	2026-09-03 07:26:18
36	9	Arsip Keuangan	ada	FileSpreadsheet	/arsiparis/arsip-keuangan	[]	0	t	2026-08-31 03:01:52	2026-09-22 03:38:52.500667
7	1	Pengadaan Barang & Jasa	Dokumen pengadaan barang dan jasa	ShoppingCart	/portal-umum/pengadaan-barang-jasa	[{"link": "https://drive.google.com/drive/folders/14fZrahleLeoCrfDQKKLsY-gbnUbPmdNo?usp=drive_link", "title": "Pelatihan Sakernas Agustus 2024"}, {"link": "https://drive.google.com/drive/folders/1ZrYEmhYJPfJu5bUzimOpB8LnMBAU-jr2?usp=drive_link", "title": "Pengadaan Jasa Keamanan dan Kebersihan 2024"}]	7	t	2026-08-24 08:01:22	2026-10-18 11:11:13.269893
\.


--
-- TOC entry 4080 (class 0 OID 17575)
-- Dependencies: 401
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.services (id, title, name, logo, link, "sortOrder", "isActive", type, description, "createdAt", "updatedAt") FROM stdin;
13	BPS Services Web-App	Header	N/A	N/A	0	t	header	Kumpulan layanan dan aplikasi digital untuk mendukung operasional BPS Kepulauan Seribu	2026-08-18 07:18:06	2026-08-18 07:18:12
16	Sistem Informasi Layanan Statistik	SILASTIK	https://res.cloudinary.com/necrhfcg/image/upload/v1789030758/pulaupedia/services/1789030752848-1787038248252-silastik.png	https://silastik.bps.go.id/v3/index.php/site/login/	0	t	service	\N	2026-08-18 07:30:48	2026-09-10 08:59:24.002862
17	Rekomendasi Kegiatan Statistik Online	ROMANTIK	https://res.cloudinary.com/necrhfcg/image/upload/v1789030898/pulaupedia/services/1789030894819-1787038272212-romantik.png	https://romantik.web.bps.go.id/	0	t	service	\N	2026-08-18 07:31:13	2026-09-10 09:01:41.404447
18	Sistem Monitoring Fasih	FASIH	https://res.cloudinary.com/necrhfcg/image/upload/v1792322089/pulaupedia/services/1792322088736-unnamed.png	/fasih/monitoring	0	t	service	\N	2026-10-18 11:14:50.984672	2026-10-18 11:14:50.984672
\.


--
-- TOC entry 4082 (class 0 OID 17589)
-- Dependencies: 403
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, password, name, role, "createdAt", "updatedAt") FROM stdin;
1	admin	$2b$10$YYJ1pRgQjfC.Ixc9cvjP8OBaI9aMZ2t1EMJyk/oIQjozy.WOQw/yC	Administrator	admin	2026-08-26 08:11:00	2026-08-26 08:13:52
\.


--
-- TOC entry 4106 (class 0 OID 0)
-- Dependencies: 388
-- Name: announcements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.announcements_id_seq', 4, true);


--
-- TOC entry 4107 (class 0 OID 0)
-- Dependencies: 390
-- Name: footer_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.footer_config_id_seq', 1, true);


--
-- TOC entry 4108 (class 0 OID 0)
-- Dependencies: 392
-- Name: headers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.headers_id_seq', 1, true);


--
-- TOC entry 4109 (class 0 OID 0)
-- Dependencies: 394
-- Name: main_portals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.main_portals_id_seq', 10, true);


--
-- TOC entry 4110 (class 0 OID 0)
-- Dependencies: 396
-- Name: navbar_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.navbar_config_id_seq', 1, true);


--
-- TOC entry 4111 (class 0 OID 0)
-- Dependencies: 398
-- Name: portal_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.portal_items_id_seq', 38, true);


--
-- TOC entry 4112 (class 0 OID 0)
-- Dependencies: 400
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.services_id_seq', 18, true);


--
-- TOC entry 4113 (class 0 OID 0)
-- Dependencies: 402
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 3858 (class 2606 OID 17501)
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- TOC entry 3901 (class 2606 OID 26107)
-- Name: fasih_activity_logs fasih_activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_activity_logs
    ADD CONSTRAINT fasih_activity_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 3886 (class 2606 OID 26016)
-- Name: fasih_assignments fasih_assignments_pencacah_id_region_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_assignments
    ADD CONSTRAINT fasih_assignments_pencacah_id_region_id_key UNIQUE (pencacah_id, region_id);


--
-- TOC entry 3888 (class 2606 OID 26014)
-- Name: fasih_assignments fasih_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_assignments
    ADD CONSTRAINT fasih_assignments_pkey PRIMARY KEY (id);


--
-- TOC entry 3899 (class 2606 OID 26093)
-- Name: fasih_import_errors fasih_import_errors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_import_errors
    ADD CONSTRAINT fasih_import_errors_pkey PRIMARY KEY (id);


--
-- TOC entry 3897 (class 2606 OID 26079)
-- Name: fasih_imports fasih_imports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_imports
    ADD CONSTRAINT fasih_imports_pkey PRIMARY KEY (id);


--
-- TOC entry 3876 (class 2606 OID 25977)
-- Name: fasih_officers fasih_officers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_officers
    ADD CONSTRAINT fasih_officers_pkey PRIMARY KEY (id);


--
-- TOC entry 3892 (class 2606 OID 26061)
-- Name: fasih_region_status fasih_region_status_assignment_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_region_status
    ADD CONSTRAINT fasih_region_status_assignment_id_key UNIQUE (assignment_id);


--
-- TOC entry 3894 (class 2606 OID 26059)
-- Name: fasih_region_status fasih_region_status_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_region_status
    ADD CONSTRAINT fasih_region_status_pkey PRIMARY KEY (id);


--
-- TOC entry 3882 (class 2606 OID 26006)
-- Name: fasih_regions fasih_regions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_regions
    ADD CONSTRAINT fasih_regions_pkey PRIMARY KEY (id);


--
-- TOC entry 3903 (class 2606 OID 26121)
-- Name: fasih_sessions fasih_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_sessions
    ADD CONSTRAINT fasih_sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3905 (class 2606 OID 26123)
-- Name: fasih_sessions fasih_sessions_session_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_sessions
    ADD CONSTRAINT fasih_sessions_session_token_key UNIQUE (session_token);


--
-- TOC entry 3878 (class 2606 OID 25989)
-- Name: fasih_users fasih_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_users
    ADD CONSTRAINT fasih_users_pkey PRIMARY KEY (id);


--
-- TOC entry 3880 (class 2606 OID 25991)
-- Name: fasih_users fasih_users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_users
    ADD CONSTRAINT fasih_users_username_key UNIQUE (username);


--
-- TOC entry 3860 (class 2606 OID 17514)
-- Name: footer_config footer_config_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_config
    ADD CONSTRAINT footer_config_pkey PRIMARY KEY (id);


--
-- TOC entry 3862 (class 2606 OID 17528)
-- Name: headers headers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.headers
    ADD CONSTRAINT headers_pkey PRIMARY KEY (id);


--
-- TOC entry 3864 (class 2606 OID 17541)
-- Name: main_portals main_portals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.main_portals
    ADD CONSTRAINT main_portals_pkey PRIMARY KEY (id);


--
-- TOC entry 3866 (class 2606 OID 17555)
-- Name: navbar_config navbar_config_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navbar_config
    ADD CONSTRAINT navbar_config_pkey PRIMARY KEY (id);


--
-- TOC entry 3868 (class 2606 OID 17568)
-- Name: portal_items portal_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portal_items
    ADD CONSTRAINT portal_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3870 (class 2606 OID 17587)
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- TOC entry 3872 (class 2606 OID 17600)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3874 (class 2606 OID 17602)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3889 (class 1259 OID 26131)
-- Name: idx_fasih_assignments_pencacah; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fasih_assignments_pencacah ON public.fasih_assignments USING btree (pencacah_id);


--
-- TOC entry 3890 (class 1259 OID 26132)
-- Name: idx_fasih_assignments_pengawas; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fasih_assignments_pengawas ON public.fasih_assignments USING btree (pengawas_id);


--
-- TOC entry 3883 (class 1259 OID 26130)
-- Name: idx_fasih_regions_island_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fasih_regions_island_name ON public.fasih_regions USING btree (island_name);


--
-- TOC entry 3884 (class 1259 OID 26129)
-- Name: idx_fasih_regions_region_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fasih_regions_region_code ON public.fasih_regions USING btree (region_code);


--
-- TOC entry 3906 (class 1259 OID 26134)
-- Name: idx_fasih_sessions_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fasih_sessions_token ON public.fasih_sessions USING btree (session_token);


--
-- TOC entry 3907 (class 1259 OID 26135)
-- Name: idx_fasih_sessions_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fasih_sessions_user ON public.fasih_sessions USING btree (user_id);


--
-- TOC entry 3895 (class 1259 OID 26133)
-- Name: idx_fasih_status_assignment; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_fasih_status_assignment ON public.fasih_region_status USING btree (assignment_id);


--
-- TOC entry 3916 (class 2606 OID 26108)
-- Name: fasih_activity_logs fasih_activity_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_activity_logs
    ADD CONSTRAINT fasih_activity_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.fasih_users(id) ON DELETE SET NULL;


--
-- TOC entry 3910 (class 2606 OID 26022)
-- Name: fasih_assignments fasih_assignments_pencacah_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_assignments
    ADD CONSTRAINT fasih_assignments_pencacah_id_fkey FOREIGN KEY (pencacah_id) REFERENCES public.fasih_officers(id) ON DELETE RESTRICT;


--
-- TOC entry 3911 (class 2606 OID 26027)
-- Name: fasih_assignments fasih_assignments_pengawas_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_assignments
    ADD CONSTRAINT fasih_assignments_pengawas_id_fkey FOREIGN KEY (pengawas_id) REFERENCES public.fasih_officers(id) ON DELETE SET NULL;


--
-- TOC entry 3912 (class 2606 OID 26017)
-- Name: fasih_assignments fasih_assignments_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_assignments
    ADD CONSTRAINT fasih_assignments_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.fasih_regions(id) ON DELETE RESTRICT;


--
-- TOC entry 3915 (class 2606 OID 26094)
-- Name: fasih_import_errors fasih_import_errors_import_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_import_errors
    ADD CONSTRAINT fasih_import_errors_import_id_fkey FOREIGN KEY (import_id) REFERENCES public.fasih_imports(id) ON DELETE CASCADE;


--
-- TOC entry 3914 (class 2606 OID 26080)
-- Name: fasih_imports fasih_imports_imported_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_imports
    ADD CONSTRAINT fasih_imports_imported_by_fkey FOREIGN KEY (imported_by) REFERENCES public.fasih_users(id) ON DELETE SET NULL;


--
-- TOC entry 3913 (class 2606 OID 26062)
-- Name: fasih_region_status fasih_region_status_assignment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_region_status
    ADD CONSTRAINT fasih_region_status_assignment_id_fkey FOREIGN KEY (assignment_id) REFERENCES public.fasih_assignments(id) ON DELETE CASCADE;


--
-- TOC entry 3917 (class 2606 OID 26124)
-- Name: fasih_sessions fasih_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_sessions
    ADD CONSTRAINT fasih_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.fasih_users(id) ON DELETE CASCADE;


--
-- TOC entry 3909 (class 2606 OID 25992)
-- Name: fasih_users fasih_users_officer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fasih_users
    ADD CONSTRAINT fasih_users_officer_id_fkey FOREIGN KEY (officer_id) REFERENCES public.fasih_officers(id) ON DELETE SET NULL;


--
-- TOC entry 3908 (class 2606 OID 17569)
-- Name: portal_items portal_items_portalid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portal_items
    ADD CONSTRAINT portal_items_portalid_fkey FOREIGN KEY ("portalId") REFERENCES public.main_portals(id) ON DELETE CASCADE;


-- Completed on 2026-11-05 10:32:13

--
-- PostgreSQL database dump complete
--

