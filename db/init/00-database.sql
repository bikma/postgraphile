\connect dbbikma;

create table users (
    id serial primary key,
    displayname varchar(255),
    firstname varchar(255),
    middlename varchar(255),
    lastname varchar(255),
    mobile varchar(255),
    email varchar(255) unique,
    gender varchar(1), 
    dob date,
    password text,
    picture varchar(255),
    managerid integer,
    active boolean default true, 
    deleted boolean default false, 
    createdby varchar(255),
    createdon timestamptz not null default now(),
    updatedby varchar(255),
    updatedon timestamptz not null default now()
);

create table threads(
  id serial primary key,
  objecttype varchar(50) not null,  --default as chat
  objectid varchar(26) not null, --used to save the ids of the users that the chat thread is in between
  createdby varchar(255),
  createdon timestamptz not null default now(),
  updatedby varchar(255),
  updatedon timestamptz not null default now()
);

create table comments(
  id serial primary key,
  threadid int not null,
  parentcommentid int,
  comment text not null,
  meta jsonb,
  state varchar(50), 
  log jsonb,
  createdby varchar(255),
  createdon timestamptz not null default now(),
  updatedby varchar(255),
  updatedon timestamptz not null default now()
);

create table chatstate(
  id serial primary key,
  threadid int not null,
  userid int not null,
  lastread int not null
);
