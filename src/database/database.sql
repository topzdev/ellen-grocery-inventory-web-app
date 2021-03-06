PGDMP     #                     x            ellen-store-db-dev    12.1    12.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24576    ellen-store-db-dev    DATABASE     �   CREATE DATABASE "ellen-store-db-dev" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
 $   DROP DATABASE "ellen-store-db-dev";
                postgres    false            �            1259    32769    brand_table    TABLE     c   CREATE TABLE public.brand_table (
    id integer NOT NULL,
    brand_name character varying(30)
);
    DROP TABLE public.brand_table;
       public         heap    postgres    false            �            1259    24595    product_table    TABLE     �  CREATE TABLE public.product_table (
    id integer NOT NULL,
    barcode character varying,
    product_name character varying,
    quantity integer,
    price real,
    description character varying,
    brand character varying,
    supplier_name character varying,
    category character varying,
    image character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 !   DROP TABLE public.product_table;
       public         heap    postgres    false            �            1259    24593    product-info_id_seq    SEQUENCE     �   CREATE SEQUENCE public."product-info_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."product-info_id_seq";
       public          postgres    false    203                       0    0    product-info_id_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public."product-info_id_seq" OWNED BY public.product_table.id;
          public          postgres    false    202            �            1259    32788    supplier_table    TABLE     _  CREATE TABLE public.supplier_table (
    id integer NOT NULL,
    supplier_name character varying(50) NOT NULL,
    address character varying(200),
    cp_no character varying(20),
    tel_no character varying(20),
    email character varying(50),
    fax character varying(30),
    website character varying(50),
    description character varying
);
 "   DROP TABLE public.supplier_table;
       public         heap    postgres    false                       0    0 !   COLUMN supplier_table.description    COMMENT     >   COMMENT ON COLUMN public.supplier_table.description IS '100';
          public          postgres    false    206            �            1259    32786    supplier_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.supplier_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.supplier_table_id_seq;
       public          postgres    false    206                       0    0    supplier_table_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.supplier_table_id_seq OWNED BY public.supplier_table.id;
          public          postgres    false    205            �
           2604    24598    product_table id    DEFAULT     u   ALTER TABLE ONLY public.product_table ALTER COLUMN id SET DEFAULT nextval('public."product-info_id_seq"'::regclass);
 ?   ALTER TABLE public.product_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �
           2604    32791    supplier_table id    DEFAULT     v   ALTER TABLE ONLY public.supplier_table ALTER COLUMN id SET DEFAULT nextval('public.supplier_table_id_seq'::regclass);
 @   ALTER TABLE public.supplier_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    206    206                      0    32769    brand_table 
   TABLE DATA           5   COPY public.brand_table (id, brand_name) FROM stdin;
    public          postgres    false    204   s                 0    24595    product_table 
   TABLE DATA           �   COPY public.product_table (id, barcode, product_name, quantity, price, description, brand, supplier_name, category, image, created_at) FROM stdin;
    public          postgres    false    203   �                 0    32788    supplier_table 
   TABLE DATA           u   COPY public.supplier_table (id, supplier_name, address, cp_no, tel_no, email, fax, website, description) FROM stdin;
    public          postgres    false    206   k                   0    0    product-info_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."product-info_id_seq"', 69, true);
          public          postgres    false    202            !           0    0    supplier_table_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.supplier_table_id_seq', 10, true);
          public          postgres    false    205            �
           2606    32773    brand_table brand_table_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.brand_table
    ADD CONSTRAINT brand_table_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.brand_table DROP CONSTRAINT brand_table_pkey;
       public            postgres    false    204            �
           2606    24603    product_table product-info_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.product_table
    ADD CONSTRAINT "product-info_pkey" PRIMARY KEY (id);
 K   ALTER TABLE ONLY public.product_table DROP CONSTRAINT "product-info_pkey";
       public            postgres    false    203            �
           2606    32793 "   supplier_table supplier_table_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.supplier_table
    ADD CONSTRAINT supplier_table_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.supplier_table DROP CONSTRAINT supplier_table_pkey;
       public            postgres    false    206                  x������ � �         �  x�}�]o�0��ɯ87���@Hh�i
麭RV�ݧ������}�~�m��f�%��=�y���2��q��<_���a�Xi� b΃,L��� L9(ـ�@�=�Vy�+�r�uc��Cc�sX�o+b��fL{��!|!?Vk:0? ���0��RyRFg[ҡ8*��Կ��VR�ރ�v���#��^(-�A��O��bo�+q��l��M݊�]p�Gw�t�ں.�g�AC�]E�0a)��Z����Y��J�FCǤ5�����V�>Jx��x5J&����+;nֲJi�%;�ai\��cW	O8�	�9ċ�,�J�p9�����A���_yӗ5"½�΄�����4�f
��b7U�)Ḧ́�?"@#ݡ��3mkO����V��?<��w�j����$Vq����ַ[���w],�K?n�j𿪂�{Ά�Gq�}x������l�U7�+         �   x��̱
�0���+�%�M�n;��:�<4�1��V��W�ҭp/w�pJh-�5-�D~{Ma��o�a���3�1����!uYi�U]��T��iM��B3�HNa����$\�s�R),�d�h�b����Q�m��y"�?�c���>0     